import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Users } from "lucide-react";

import { ambilSesiAdmin } from "../../../src/lib/supabase-server";

const WARNA_STATUS: Record<string, string> = {
  terbit: "bg-[#EAF6F0] text-[#1F7A4D] border-[#C3E4D4]",
  draft: "bg-[#FFF7E6] text-[#9A6700] border-[#F2E0B5]",
  arsip: "bg-[#F1F3F5] text-[#5B6470] border-[#DDE5E1]"
};

export default async function DaftarLokerAdmin() {
  const sesi = await ambilSesiAdmin();
  if (!sesi) redirect("/admin/login");

  // Admin melihat semua status, bukan cuma 'terbit' (lihat policy di admin.sql).
  const { data: daftar, error } = await sesi.supabase
    .from("loker")
    .select("id, slug, posisi, deskripsi, status, gambar_url, lamaran(count)")
    .order("dibuat_pada", { ascending: false });

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-[#17202A]">Lowongan Kerja</h1>
          <p className="text-sm text-[#5B6470]">Kelola lowongan yang tampil di website.</p>
        </div>

        <Link
          href="/admin/loker/baru"
          className="flex items-center gap-2 rounded-lg bg-[#0F4C81] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0b3b64]"
        >
          <Plus className="h-4 w-4" />
          <span>Lowongan Baru</span>
        </Link>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Gagal memuat data: {error.message}
        </p>
      )}

      {!error && (!daftar || daftar.length === 0) && (
        <div className="rounded-xl border border-dashed border-[#DDE5E1] bg-white px-6 py-14 text-center">
          <p className="font-bold text-[#17202A]">Belum ada lowongan</p>
          <p className="mt-1 text-sm text-[#5B6470]">
            Klik &ldquo;Lowongan Baru&rdquo; untuk memposting yang pertama.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {(daftar ?? []).map((loker) => {
          const jumlahPelamar = Array.isArray(loker.lamaran)
            ? (loker.lamaran[0]?.count ?? 0)
            : 0;

          return (
            <div
              key={loker.id}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-[#DDE5E1] bg-white p-4"
            >
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[#EAF6F0]">
                {loker.gambar_url && (
                  <img src={loker.gambar_url} alt="" className="h-full w-full object-cover" />
                )}
              </div>

              <div className="min-w-[180px] flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-[#17202A]">{loker.posisi}</h2>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      WARNA_STATUS[loker.status] ?? WARNA_STATUS.arsip
                    }`}
                  >
                    {loker.status}
                  </span>
                </div>
                {loker.deskripsi && (
                  <p className="line-clamp-1 text-sm text-[#5B6470]">{loker.deskripsi}</p>
                )}
              </div>

              <Link
                href={`/admin/lamaran?loker=${loker.id}`}
                className="flex items-center gap-1.5 rounded-lg border border-[#DDE5E1] px-3 py-2 text-xs font-bold text-[#0F4C81] transition-colors hover:bg-[#EAF7FB]"
              >
                <Users className="h-3.5 w-3.5" />
                <span>{jumlahPelamar} pelamar</span>
              </Link>

              <Link
                href={`/admin/loker/${loker.id}`}
                className="rounded-lg bg-[#EAF7FB] px-4 py-2 text-xs font-bold text-[#0F4C81] transition-colors hover:bg-[#d8eef7]"
              >
                Ubah
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
