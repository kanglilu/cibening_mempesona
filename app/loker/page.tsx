import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Info } from "lucide-react";

import SiteShell from "../../src/components/SiteShell";
import LokerCard from "../../src/components/LokerCard";
import { ambilDaftarLoker } from "../../src/lib/loker";

// Data berasal dari database, jadi halaman di-generate ulang berkala
// supaya lowongan baru muncul tanpa perlu deploy.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Info Lowongan Kerja | Desa Cibening",
  description:
    "Informasi lowongan kerja untuk warga Desa Cibening, Kecamatan Setu, Kabupaten Bekasi. Dikumpulkan dan diperbarui oleh pemerintah desa.",
  alternates: {
    canonical: "/loker"
  },
  openGraph: {
    title: "Info Lowongan Kerja | Desa Cibening",
    description: "Informasi lowongan kerja untuk warga Desa Cibening, Kec. Setu, Kab. Bekasi.",
    url: "/loker",
    type: "website",
    locale: "id_ID"
  }
};

export default async function LokerPage() {
  const daftar = await ambilDaftarLoker();

  return (
    <SiteShell>
      <div className="px-4 py-8 md:px-8 md:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] transition-colors hover:text-[#1E88A8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F4C81]">
            INFO LOKER WARGA
          </span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#17202A] md:text-4xl">
            Lowongan Kerja untuk Warga Cibening
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#5B6470] md:text-base">
            Informasi lowongan yang dikumpulkan pemerintah Desa Cibening. Lamaran dikirim
            langsung ke kontak yang tercantum pada setiap lowongan.
          </p>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-lg border border-[#C3E4D4] bg-[#EAF6F0] px-4 py-3 text-xs leading-relaxed text-[#1f3b33]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A4D]" />
          <span>
            Desa Cibening hanya meneruskan informasi. Seluruh proses rekrutmen dilakukan oleh
            perusahaan terkait. <strong>Jangan pernah membayar biaya apa pun</strong> untuk
            melamar pekerjaan.
          </span>
        </div>

        {daftar.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-xl border border-dashed border-[#DDE5E1] bg-white px-6 py-14 text-center">
            <BriefcaseBusiness className="h-8 w-8 text-[#A0AEC0]" />
            <h2 className="mt-3 text-base font-bold text-[#17202A]">Belum ada lowongan aktif</h2>
            <p className="mt-1 max-w-sm text-sm text-[#5B6470]">
              Saat ini belum ada informasi lowongan yang dibuka. Silakan cek kembali secara
              berkala atau ikuti media sosial Desa Cibening.
            </p>
          </div>
        ) : (
          <>
            <p className="mt-8 text-xs font-bold uppercase tracking-wider text-[#5B6470]">
              {daftar.length} lowongan aktif
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {daftar.map((loker) => (
                <LokerCard key={loker.id} loker={loker} />
              ))}
            </div>
          </>
        )}
      </div>
    </SiteShell>
  );
}
