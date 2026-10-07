import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Sengaja TIDAK memakai prefix NEXT_PUBLIC_.
 *
 * Seluruh query loker dijalankan dari server component, tidak ada satu pun
 * yang berjalan di browser. Jadi:
 *   - key tidak perlu ikut dikirim ke pengunjung,
 *   - nilainya dibaca saat runtime, bukan di-inline saat build, sehingga
 *     mengubahnya di Vercel tidak mengharuskan rebuild.
 *
 * Kalau nanti backoffice butuh Supabase di sisi browser (misalnya untuk login),
 * baru tambahkan variabel NEXT_PUBLIC_ terpisah khusus untuk itu.
 */
const url = process.env.SUPABASE_URL?.trim();
const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

function urlLayak(nilai: string | undefined): nilai is string {
  if (!nilai) return false;
  try {
    new URL(nilai);
    return true;
  } catch {
    return false;
  }
}

/** true kalau kedua environment variable terisi dan URL-nya valid. */
export const supabaseTerkonfigurasi = urlLayak(url) && Boolean(anonKey);

let client: SupabaseClient | null = null;
let gagalInisialisasi = false;

/**
 * Mengembalikan client Supabase, atau null bila belum/salah dikonfigurasi.
 * Pemanggil wajib menangani null supaya salah ketik pada URL tidak membuat
 * halaman publik error 500 — cukup tampil kosong dengan peringatan di log.
 */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseTerkonfigurasi || gagalInisialisasi) return null;

  if (!client) {
    try {
      client = createClient(url as string, anonKey as string, {
        auth: { persistSession: false }
      });
    } catch (error) {
      gagalInisialisasi = true;
      console.error(
        "Gagal membuat client Supabase. Periksa SUPABASE_URL dan SUPABASE_ANON_KEY.",
        error
      );
      return null;
    }
  }

  return client;
}
