import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase yang membawa sesi login admin lewat cookie.
 *
 * Tetap memakai anon key, bukan service_role. Yang menentukan boleh-tidaknya
 * adalah JWT milik admin yang ikut di cookie, lalu dicek oleh RLS
 * (lihat supabase/admin.sql). Jadi tidak ada satu kunci sakti yang kalau
 * bocor membuka seluruh database.
 */
export async function buatSupabaseServer(): Promise<SupabaseClient | null> {
  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    console.error("SUPABASE_URL / SUPABASE_ANON_KEY belum diisi, backoffice tidak bisa jalan.");
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(daftarCookie) {
        try {
          for (const { name, value, options } of daftarCookie) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Component tidak boleh menulis cookie. Aman diabaikan:
          // penyegaran token ditangani middleware sebelum request sampai sini.
        }
      }
    }
  });
}

export type AdminSession = {
  supabase: SupabaseClient;
  email: string;
};

/**
 * Mengembalikan sesi admin yang sudah terverifikasi, atau null.
 *
 * Memakai getUser() (bukan getSession()) karena getUser() memverifikasi token
 * ke server Supabase, sedangkan getSession() hanya membaca cookie yang bisa
 * dipalsukan di sisi klien.
 */
export async function ambilSesiAdmin(): Promise<AdminSession | null> {
  const supabase = await buatSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  // Login saja belum cukup: harus terdaftar di tabel admin.
  const { data: admin, error: errAdmin } = await supabase
    .from("admin")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (errAdmin) {
    console.error("Gagal memeriksa status admin.", errAdmin.message);
    return null;
  }

  if (!admin) return null;

  return { supabase, email: data.user.email ?? "" };
}
