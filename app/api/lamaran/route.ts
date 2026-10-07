import { NextResponse } from "next/server";

import {
  AREAS,
  NAMA_MAX_LENGTH,
  NAMA_MIN_LENGTH,
  PENGALAMAN_MAX_LENGTH,
  WHATSAPP_PATTERN
} from "../../../src/lamaran";
import { getSupabase } from "../../../src/lib/supabase";
import { ambilIpKlien, buatRateLimit } from "../../../src/lib/rate-limit";

// Lebih longgar dari form pelayanan: satu warga wajar melamar beberapa
// lowongan sekaligus dalam satu sesi.
const lewatBatas = buatRateLimit({
  windowMs: 60 * 60 * 1000,
  maxPerWindow: 8
});

function teksRapi(nilai: unknown) {
  return typeof nilai === "string" ? nilai.trim() : "";
}

function gagal(pesan: string, status: number) {
  return NextResponse.json({ status: "error", message: pesan }, { status });
}

export async function POST(request: Request) {
  const supabase = getSupabase();

  if (!supabase) {
    console.error("Supabase belum dikonfigurasi, lamaran tidak bisa disimpan.");
    return gagal("Pendaftaran sedang tidak tersedia. Mohon hubungi admin desa.", 503);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return gagal("Data tidak dapat dibaca.", 400);
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return gagal("Data tidak dapat dibaca.", 400);
  }

  const data = payload as Record<string, unknown>;

  // Honeypot: field tersembunyi di form, hanya bot yang mengisinya.
  if (teksRapi(data.website)) {
    return gagal("Pendaftaran tidak dapat diproses.", 400);
  }

  const slug = teksRapi(data.slug);
  const nama = teksRapi(data.nama);
  const wilayah = teksRapi(data.wilayah);
  const whatsapp = teksRapi(data.whatsapp);
  const pengalaman = teksRapi(data.pengalaman);

  if (!slug) {
    return gagal("Lowongan tidak dikenali.", 400);
  }
  if (nama.length < NAMA_MIN_LENGTH || nama.length > NAMA_MAX_LENGTH) {
    return gagal("Nama lengkap tidak valid.", 400);
  }
  if (!AREAS.includes(wilayah)) {
    return gagal("Wilayah/kampung tidak dikenali.", 400);
  }
  if (!WHATSAPP_PATTERN.test(whatsapp)) {
    return gagal("Nomor WhatsApp tidak valid.", 400);
  }
  if (pengalaman.length > PENGALAMAN_MAX_LENGTH) {
    return gagal(`Pengalaman kerja maksimal ${PENGALAMAN_MAX_LENGTH} karakter.`, 400);
  }

  if (lewatBatas(ambilIpKlien(request))) {
    return gagal(
      "Terlalu banyak pendaftaran dari jaringan ini. Mohon coba lagi beberapa saat lagi.",
      429
    );
  }

  // RLS hanya mengizinkan baris 'terbit' terbaca, jadi lowongan draft/arsip
  // otomatis tidak ketemu di sini.
  const { data: loker, error: errLoker } = await supabase
    .from("loker")
    .select("id, posisi")
    .eq("slug", slug)
    .maybeSingle();

  if (errLoker) {
    console.error("Gagal mencari lowongan saat memproses lamaran.", errLoker.message);
    return gagal("Pendaftaran gagal diproses. Mohon coba lagi.", 502);
  }

  if (!loker) {
    return gagal("Lowongan ini sudah tidak tersedia.", 404);
  }

  const { error: errInsert } = await supabase
    .from("lamaran")
    .insert({ loker_id: loker.id, nama, wilayah, whatsapp, pengalaman: pengalaman || null });

  if (errInsert) {
    // 23505 = unique violation, berarti nomor ini sudah mendaftar di lowongan yang sama.
    if (errInsert.code === "23505") {
      return gagal("Nomor WhatsApp ini sudah terdaftar untuk lowongan tersebut.", 409);
    }

    console.error("Gagal menyimpan lamaran.", errInsert.message);
    return gagal("Pendaftaran gagal disimpan. Mohon coba lagi.", 502);
  }

  return NextResponse.json({ status: "ok", posisi: loker.posisi });
}
