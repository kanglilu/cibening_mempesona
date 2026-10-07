import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import SiteShell from "../../src/components/SiteShell";
import ProgramKerjaList from "../../src/components/ProgramKerjaList";

export const metadata: Metadata = {
  title: "Program Kerja | Anton Suryana, Kepala Desa Cibening",
  description:
    "Delapan program unggulan Anton Suryana untuk Desa Cibening, Kecamatan Setu, Kabupaten Bekasi: BAGEUR, LIBAS, BUMDes Maju Berkarya, Balai Edukasi Centre, SPBS, Siaga Sehat Desa, dan lainnya.",
  alternates: {
    canonical: "/program"
  },
  openGraph: {
    title: "Program Kerja | Anton Suryana, Kepala Desa Cibening",
    description:
      "Delapan program unggulan untuk Desa Cibening, diwujudkan secara transparan, akuntabel, dan kolaboratif.",
    url: "/program",
    type: "article",
    locale: "id_ID"
  }
};

export default function ProgramPage() {
  return (
    <SiteShell>
      <div className="px-4 md:px-8 py-8 md:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] transition-colors hover:text-[#1E88A8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <ProgramKerjaList />
      </div>
    </SiteShell>
  );
}
