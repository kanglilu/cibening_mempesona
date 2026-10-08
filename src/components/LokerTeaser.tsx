import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

/**
 * Banner tipis tepat di bawah hero yang mengarah ke halaman /loker.
 *
 * Sengaja dibuat ramping dan berwarna hijau, berbeda dari CTA Program Kerja
 * yang biru, supaya terbaca sebagai layanan terpisah dan tidak menyaingi hero.
 */
export default function LokerTeaser() {
  return (
    <Link
      href="/loker"
      className="group flex items-center gap-3 border-b border-[#DDE5E1]/60 bg-[#EAF6F0] px-4 py-3.5 transition-colors hover:bg-[#dcefe4] md:gap-4 md:px-8 md:py-4"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1F7A4D] text-white md:h-10 md:w-10">
        <BriefcaseBusiness className="h-4 w-4 md:h-5 md:w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1F7A4D]">
          Info Loker Warga
        </p>
        <p className="text-[13px] font-bold leading-snug text-[#17202A] md:text-[15px]">
          Lowongan kerja untuk warga Desa Cibening
        </p>
      </div>

      <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#0F4C81] md:text-sm">
        <span className="hidden sm:inline">Lihat lowongan</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
