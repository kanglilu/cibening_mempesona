"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ambilSesiAdmin, buatSupabaseServer } from "./supabase-server";

const STATUS_LOKER_VALID = ["draft", "terbit", "arsip"];
const STATUS_LAMARAN_VALID = ["baru", "diproses", "selesai", "batal"];

const UKURAN_GAMBAR_MAKS = 4 * 1024 * 1024; // 4 MB
const TIPE_GAMBAR_DIIZINKAN = ["image/jpeg", "image/png", "image/webp"];

function teks(formData: FormData, nama: string) {
  const nilai = formData.get(nama);
  return typeof nilai === "string" ? nilai.trim() : "";
}

/** "Operator Produksi" -> "operator-produksi" */
async function buatSlug(sumber: string) {
  return sumber
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ----------------------------------------------------------------
// Login & logout
// ----------------------------------------------------------------

export async function masuk(_sebelumnya: string | null, formData: FormData): Promise<string | null> {
  const email = teks(formData, "email");
  const password = teks(formData, "password");

  if (!email || !password) return "Email dan password wajib diisi.";

  const supabase = await buatSupabaseServer();
  if (!supabase) return "Layanan login belum dikonfigurasi.";

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  // Pesan ke browser sengaja disamakan untuk email salah maupun password salah,
  // supaya halaman login tidak bisa dipakai menebak-nebak email mana yang
  // terdaftar. Alasan sebenarnya dicatat di log server, yang hanya terlihat
  // pengurus, supaya tetap bisa didiagnosa saat setup.
  if (error || !data.user) {
    console.error(
      `[login gagal] ${email} -> ${error?.message ?? "pengguna tidak dikembalikan Supabase"}`
    );
    return "Email atau password salah.";
  }

  const { data: admin, error: errAdmin } = await supabase
    .from("admin")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (errAdmin) {
    console.error(`[login gagal] gagal membaca tabel admin: ${errAdmin.message}`);
    await supabase.auth.signOut();
    return "Gagal memeriksa akses. Coba lagi beberapa saat.";
  }

  if (!admin) {
    console.error(
      `[login gagal] ${email} (user_id ${data.user.id}) lolos autentikasi tetapi ` +
        "tidak ada di tabel public.admin. Jalankan bagian MENDAFTARKAN ADMIN di supabase/admin.sql."
    );
    await supabase.auth.signOut();
    return "Akun ini tidak punya akses backoffice.";
  }

  redirect("/admin");
}

export async function keluar() {
  const supabase = await buatSupabaseServer();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

// ----------------------------------------------------------------
// Lowongan
// ----------------------------------------------------------------

export async function simpanLoker(
  _sebelumnya: string | null,
  formData: FormData
): Promise<string | null> {
  const sesi = await ambilSesiAdmin();
  if (!sesi) redirect("/admin/login");

  const { supabase } = sesi;

  const id = teks(formData, "id");
  const posisi = teks(formData, "posisi");
  const deskripsi = teks(formData, "deskripsi");
  const status = teks(formData, "status");
  const gambarUrlLama = teks(formData, "gambar_url");

  // Papan pengumuman, bukan sistem lowongan. Materinya sudah dibuat perusahaan,
  // desa tinggal menempelkan, jadi hanya judul yang wajib.
  if (posisi.length < 2) return "Judul wajib diisi.";
  if (!STATUS_LOKER_VALID.includes(status)) return "Status tidak dikenali.";

  // Slug lama dipertahankan saat mengubah, supaya tautan yang sudah tersebar
  // di grup WhatsApp tidak mati hanya karena judulnya diperbaiki.
  const slugLama = teks(formData, "slug");
  let slug = slugLama || (await buatSlug(posisi));

  if (!slug) return "Judul harus memuat huruf atau angka.";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return "Slug hanya boleh huruf kecil, angka, dan tanda hubung.";
  }

  // Judul lowongan sangat mungkin kembar ("Driver", "Operator Produksi"),
  // jadi untuk slug otomatis cari akhiran angka yang masih kosong daripada
  // menolak kiriman admin.
  if (!slugLama) {
    const dasar = slug;
    for (let n = 2; n <= 50; n++) {
      const { data: bentrok } = await supabase
        .from("loker")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (!bentrok || bentrok.id === id) break;
      slug = `${dasar}-${n}`;
    }
  }

  // --- unggah gambar bila ada berkas baru ---
  let gambarUrl = gambarUrlLama || null;
  const berkas = formData.get("gambar");

  if (berkas instanceof File && berkas.size > 0) {
    if (!TIPE_GAMBAR_DIIZINKAN.includes(berkas.type)) {
      return "Gambar harus JPG, PNG, atau WebP.";
    }
    if (berkas.size > UKURAN_GAMBAR_MAKS) {
      return "Ukuran gambar maksimal 4 MB.";
    }

    const ekstensi = berkas.type === "image/png" ? "png" : berkas.type === "image/webp" ? "webp" : "jpg";
    const namaBerkas = `${slug}-${Date.now()}.${ekstensi}`;

    const { error: errUnggah } = await supabase.storage
      .from("loker")
      .upload(namaBerkas, berkas, { contentType: berkas.type, upsert: true });

    if (errUnggah) {
      console.error("Gagal mengunggah gambar lowongan.", errUnggah.message);
      return `Gambar gagal diunggah: ${errUnggah.message}`;
    }

    const { data: publik } = supabase.storage.from("loker").getPublicUrl(namaBerkas);
    gambarUrl = publik.publicUrl;
  }

  // Kolom lama (perusahaan, lokasi, gaji, syarat, dll) sengaja tidak disentuh:
  // tidak dipakai lagi, tapi datanya dibiarkan utuh di database.
  const baris = {
    slug,
    posisi,
    deskripsi: deskripsi || null,
    gambar_url: gambarUrl,
    status
  };

  const { error } = id
    ? await supabase.from("loker").update(baris).eq("id", id)
    : await supabase.from("loker").insert(baris);

  if (error) {
    if (error.code === "23505") return "Slug ini sudah dipakai lowongan lain.";
    console.error("Gagal menyimpan lowongan.", error.message);
    return `Gagal menyimpan: ${error.message}`;
  }

  revalidatePath("/loker");
  revalidatePath(`/loker/${slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function hapusLoker(formData: FormData) {
  const sesi = await ambilSesiAdmin();
  if (!sesi) redirect("/admin/login");

  const id = teks(formData, "id");
  if (!id) return;

  const { error } = await sesi.supabase.from("loker").delete().eq("id", id);
  if (error) console.error("Gagal menghapus lowongan.", error.message);

  revalidatePath("/loker");
  revalidatePath("/admin");
  redirect("/admin");
}

// ----------------------------------------------------------------
// Lamaran
// ----------------------------------------------------------------

export async function ubahStatusLamaran(formData: FormData) {
  const sesi = await ambilSesiAdmin();
  if (!sesi) redirect("/admin/login");

  const id = teks(formData, "id");
  const status = teks(formData, "status");
  const kembaliKe = teks(formData, "kembali_ke") || "/admin/lamaran";

  if (!id || !STATUS_LAMARAN_VALID.includes(status)) return;

  const { error } = await sesi.supabase.from("lamaran").update({ status }).eq("id", id);
  if (error) console.error("Gagal mengubah status lamaran.", error.message);

  revalidatePath(kembaliKe);
  redirect(kembaliKe);
}

