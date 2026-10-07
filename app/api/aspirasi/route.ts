import { NextResponse } from "next/server";
import {
  AREAS,
  ASPIRASI_MAX_LENGTH,
  ASPIRASI_MIN_LENGTH,
  CATEGORIES,
  NAMA_MAX_LENGTH,
  NAMA_MIN_LENGTH,
  SOURCE_LABEL,
  WHATSAPP_PATTERN
} from "../../../src/aspirasi";
import { ambilIpKlien, buatRateLimit } from "../../../src/lib/rate-limit";

const WEBHOOK_URL = process.env.ASPIRASI_WEBHOOK_URL;
const WEBHOOK_TIMEOUT_MS = 15_000;

const lewatBatas = buatRateLimit({
  windowMs: 60 * 60 * 1000,
  maxPerWindow: 3
});

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

type ValidatedAspirasi = {
  nama: string;
  rtRw: string;
  whatsapp: string;
  kategori: string;
  isipikiran: string;
};

function validate(payload: Record<string, unknown>): { data: ValidatedAspirasi } | { error: string } {
  const nama = asTrimmedString(payload.nama);
  const rtRw = asTrimmedString(payload.rtRw);
  const whatsapp = asTrimmedString(payload.whatsapp);
  const kategori = asTrimmedString(payload.kategori);
  const isipikiran = asTrimmedString(payload.isipikiran);

  if (nama.length < NAMA_MIN_LENGTH || nama.length > NAMA_MAX_LENGTH) {
    return { error: "Nama lengkap tidak valid." };
  }
  if (!AREAS.includes(rtRw)) {
    return { error: "Wilayah/kampung tidak dikenali." };
  }
  if (!WHATSAPP_PATTERN.test(whatsapp)) {
    return { error: "Nomor WhatsApp tidak valid." };
  }
  if (!CATEGORIES.includes(kategori)) {
    return { error: "Kategori aspirasi tidak dikenali." };
  }
  if (isipikiran.length < ASPIRASI_MIN_LENGTH || isipikiran.length > ASPIRASI_MAX_LENGTH) {
    return { error: "Isi aspirasi harus antara 20 sampai 2000 karakter." };
  }

  return { data: { nama, rtRw, whatsapp, kategori, isipikiran } };
}

export async function POST(request: Request) {
  if (!WEBHOOK_URL) {
    console.error("ASPIRASI_WEBHOOK_URL belum diset. Aspirasi tidak diteruskan ke Google Sheets.");
    return NextResponse.json(
      {
        status: "error",
        message: "Layanan aspirasi belum dikonfigurasi. Mohon hubungi admin website."
      },
      { status: 503 }
    );
  }

  try {
    const payload = await request.json();

    if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
      return NextResponse.json(
        { status: "error", message: "Aspirasi tidak dapat diproses." },
        { status: 400 }
      );
    }

    // Honeypot: field ini tersembunyi di form, hanya bot yang mengisinya.
    if (asTrimmedString((payload as Record<string, unknown>).website)) {
      return NextResponse.json(
        { status: "error", message: "Aspirasi tidak dapat diproses." },
        { status: 400 }
      );
    }

    const validated = validate(payload as Record<string, unknown>);
    if ("error" in validated) {
      return NextResponse.json({ status: "error", message: validated.error }, { status: 400 });
    }

    if (lewatBatas(ambilIpKlien(request))) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "Terlalu banyak aspirasi dikirim dari jaringan ini. Mohon coba lagi dalam beberapa saat."
        },
        { status: 429 }
      );
    }

    // Hanya field yang lolos validasi yang diteruskan; metadata dibuat di server.
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        ...validated.data,
        submittedAt: new Date().toISOString(),
        campaign: SOURCE_LABEL
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS)
    });

    const text = await response.text();
    let result: unknown = null;

    try {
      result = JSON.parse(text);
    } catch {
      result = { status: response.ok ? "ok" : "error", raw: text };
    }

    if (!response.ok) {
      console.error("Google Apps Script menolak aspirasi.", response.status, text.slice(0, 500));
      return NextResponse.json(
        {
          status: "error",
          message: "Aspirasi belum tersimpan. Mohon coba kirim ulang."
        },
        { status: 502 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Gagal meneruskan aspirasi.", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Gagal mengirim aspirasi. Mohon coba kirim ulang."
      },
      { status: 500 }
    );
  }
}
