import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Menyegarkan token sesi admin.
 *
 * Server Component tidak boleh menulis cookie, jadi tanpa middleware ini
 * token yang kedaluwarsa tidak pernah tersimpan kembali dan admin akan
 * terlempar keluar di tengah jalan. Di sini cookie baru ditulis ke response.
 *
 * Hanya berjalan di /admin supaya halaman publik tidak kena beban tambahan.
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(daftarCookie) {
        for (const { name, value, options } of daftarCookie) {
          response.cookies.set(name, value, options);
        }
      }
    }
  });

  // Memanggil getUser() di sini yang memicu penyegaran token bila perlu.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/admin/:path*"]
};
