import Link from "next/link";
import { redirect } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { ambilSesiAdmin } from "../../../../src/lib/supabase-server";
import { ubahStatusLamaran } from "../../../../src/lib/admin-actions";

const STATUS = ["baru", "diproses", "selesai", "batal"];

const WARNA_STATUS: Record<string, string> = {
  baru: "bg-[#EAF7FB] text-[#0F4C81] border-[#CBE5F0]",
  diproses: "bg-[#FFF7E6] text-[#9A6700] border-[#F2E0B5]",
  selesai: "bg-[#EAF6F0] text-[#1F7A4D] border-[#C3E4D4]",
  batal: "bg-[#F1F3F5] text-[#5B6470] border-[#DDE5E1]"
};

/** 081234567890 -> 6281234567890, untuk tautan wa.me. */
function keWhatsApp(nomor: string) {
  const angka = nomor.replace(/\D/g, "");
  if (angka.startsWith("62")) return angka;
  if (angka.startsWith("0")) return `62${angka.slice(1)}`;
  return `62${angka}`;
}

function formatWaktu(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default async function DaftarLamaran({
  searchParams
}: {
  searchParams: Promise<{ loker?: string }>;
}) {
  const { loker: filterLoker } = await searchParams;

  const sesi = await ambilSesiAdmin();
  if (!sesi) redirect("/admin/login");

  let query = sesi.supabase
    .from("lamaran")
    .select("id, nama, wilayah, whatsapp, pengalaman, status, dibuat_pada, loker(id, posisi)")
    .order("dibuat_pada", { ascending: false });

  if (filterLoker) query = query.eq("loker_id", filterLoker);

  const { data: daftar, error } = await query;

  const kembaliKe = filterLoker ? `/admin/lamaran?loker=${filterLoker}` : "/admin/lamaran";

  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-extrabold text-[#17202A]">Pelamar</h1>
        <p className="text-sm text-[#5B6470]">
          {filterLoker ? "Pelamar untuk satu lowongan." : "Semua warga yang mendaftar, terbaru di atas."}{" "}
          Tindak lanjut lewat tombol WhatsApp.
        </p>
        {filterLoker && (
          <Link href="/admin/lamaran" className="mt-2 inline-block text-xs font-bold text-[#0F4C81] hover:underline">
            Tampilkan semua pelamar
          </Link>
        )}
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Gagal memuat data: {error.message}
        </p>
      )}

      {!error && (!daftar || daftar.length === 0) && (
        <div className="rounded-xl border border-dashed border-[#DDE5E1] bg-white px-6 py-14 text-center">
          <p className="font-bold text-[#17202A]">Belum ada pelamar</p>
          <p className="mt-1 text-sm text-[#5B6470]">
            Pendaftaran dari warga akan muncul di sini secara otomatis.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {(daftar ?? []).map((lamaran) => {
          const loker = Array.isArray(lamaran.loker) ? lamaran.loker[0] : lamaran.loker;

          return (
            <div key={lamaran.id} className="rounded-xl border border-[#DDE5E1] bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-[180px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-[#17202A]">{lamaran.nama}</h2>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        WARNA_STATUS[lamaran.status] ?? WARNA_STATUS.batal
                      }`}
                    >
                      {lamaran.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-[#5B6470]">
                    {lamaran.wilayah} &bull; {lamaran.whatsapp}
                  </p>
                  {lamaran.pengalaman && (
                    <p className="mt-1.5 whitespace-pre-line rounded-lg bg-[#EAF6F0] px-3 py-2 text-xs leading-relaxed text-[#334155]">
                      {lamaran.pengalaman}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-[#A0AEC0]">
                    Melamar <strong className="text-[#5B6470]">{loker?.posisi ?? "-"}</strong>
                    {" "}&bull;{" "}
                    {formatWaktu(lamaran.dibuat_pada)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${keWhatsApp(lamaran.whatsapp)}?text=${encodeURIComponent(
                      `Halo ${lamaran.nama}, terima kasih sudah mendaftar untuk posisi ${loker?.posisi ?? ""} lewat website Desa Cibening.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-[#1F7A4D] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#19633e]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <form action={ubahStatusLamaran} className="flex items-center gap-1.5">
                    <input type="hidden" name="id" value={lamaran.id} />
                    <input type="hidden" name="kembali_ke" value={kembaliKe} />
                    <select
                      name="status"
                      defaultValue={lamaran.status}
                      className="rounded-lg border border-[#DDE5E1] bg-white px-2 py-2 text-xs text-[#17202A]"
                    >
                      {STATUS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-lg border border-[#DDE5E1] px-3 py-2 text-xs font-bold text-[#0F4C81] transition-colors hover:bg-[#EAF7FB]"
                    >
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
