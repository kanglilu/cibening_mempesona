import { getSupabase, supabaseTerkonfigurasi } from "./supabase";

/**
 * Lowongan di sini sengaja hanya judul, deskripsi, dan gambar.
 *
 * Materi lowongan sudah dibuat perusahaan, desa tinggal menempelkan dan
 * menyebarkan. Memecahnya jadi kolom terstruktur (gaji, syarat, tipe) justru
 * membuat banyak pengumuman tidak bisa dimuat karena datanya memang tidak ada.
 *
 * Kolom lama masih tersimpan di database, hanya tidak dipakai lagi.
 */
export type Loker = {
  id: string;
  slug: string;
  posisi: string;
  deskripsi: string | null;
  gambar_url: string | null;
  dibuat_pada: string;
};

const KOLOM = "id, slug, posisi, deskripsi, gambar_url, dibuat_pada";

/**
 * Tanggal hari ini menurut waktu Indonesia Barat.
 *
 * toISOString() memakai UTC yang tertinggal 7 jam dari WIB, sehingga lowongan
 * yang sudah lewat tanggal tutup masih sempat tampil beberapa jam.
 * en-CA dipakai karena formatnya memang YYYY-MM-DD.
 */
function hariIni() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function peringatkanBelumTerkonfigurasi() {
  if (!supabaseTerkonfigurasi) {
    console.warn(
      "SUPABASE_URL / SUPABASE_ANON_KEY belum diisi atau URL-nya tidak valid. Halaman loker akan tampil kosong."
    );
  }
}

/**
 * Daftar lowongan yang tampil ke publik.
 *
 * Status 'terbit' sudah dijamin RLS di database. Filter tanggal dipertahankan
 * untuk baris lama yang sempat punya tanggal tutup; baris baru selalu null
 * sehingga tidak pernah tersaring. Kolomnya tidak ikut diambil karena tidak
 * ditampilkan, dan PostgREST tetap bisa memfilter kolom yang tidak di-select.
 */
export async function ambilDaftarLoker(): Promise<Loker[]> {
  const supabase = getSupabase();

  if (!supabase) {
    peringatkanBelumTerkonfigurasi();
    return [];
  }

  const { data, error } = await supabase
    .from("loker")
    .select(KOLOM)
    .or(`tanggal_tutup.is.null,tanggal_tutup.gte.${hariIni()}`)
    .order("dibuat_pada", { ascending: false });

  if (error) {
    console.error("Gagal mengambil daftar loker dari Supabase.", error.message);
    return [];
  }

  return (data ?? []) as Loker[];
}

/** Satu lowongan berdasarkan slug, atau null bila tidak ada / sudah tidak terbit. */
export async function ambilLokerBySlug(slug: string): Promise<Loker | null> {
  const supabase = getSupabase();

  if (!supabase) {
    peringatkanBelumTerkonfigurasi();
    return null;
  }

  const { data, error } = await supabase
    .from("loker")
    .select(KOLOM)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Gagal mengambil detail loker dari Supabase.", error.message);
    return null;
  }

  return (data as Loker | null) ?? null;
}
