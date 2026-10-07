/**
 * Rate limit sederhana per IP, disimpan di memori proses.
 *
 * Konsekuensinya: hitungan ikut hilang setiap instance serverless didaur ulang
 * dan tidak dibagi antar instance. Ini pertahanan lapis pertama untuk menahan
 * banjir kiriman dari satu sumber, bukan jaminan kuota yang ketat. Kalau suatu
 * saat butuh kuota sungguhan, ganti isinya dengan penyimpanan bersama
 * (Vercel KV / Upstash) tanpa mengubah pemanggilnya.
 */

type Opsi = {
  /** Panjang jendela waktu dalam milidetik. */
  windowMs: number;
  /** Maksimal kiriman per IP dalam satu jendela. */
  maxPerWindow: number;
  /** Batas jumlah IP yang dilacak, supaya memori tidak membengkak. */
  maxEntries?: number;
};

export function buatRateLimit({ windowMs, maxPerWindow, maxEntries = 5000 }: Opsi) {
  const log = new Map<string, number[]>();

  /** true kalau IP ini sudah melewati batas. Kalau false, kiriman ikut dicatat. */
  return function lewatBatas(ip: string): boolean {
    const now = Date.now();
    const awalJendela = now - windowMs;

    for (const [key, waktu] of log) {
      const masihBerlaku = waktu.filter((t) => t > awalJendela);
      if (masihBerlaku.length === 0) {
        log.delete(key);
      } else {
        log.set(key, masihBerlaku);
      }
    }

    const terakhir = log.get(ip) ?? [];
    if (terakhir.length >= maxPerWindow) return true;

    // Peta sudah penuh dan IP ini belum tercatat: tolak daripada membiarkan
    // memori tumbuh tanpa batas.
    if (!log.has(ip) && log.size >= maxEntries) return true;

    log.set(ip, [...terakhir, now]);
    return false;
  };
}

export function ambilIpKlien(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
