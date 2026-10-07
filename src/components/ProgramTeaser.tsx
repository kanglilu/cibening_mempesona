import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROGRAM_KERJA } from "../data";

/**
 * Ringkasan di beranda yang mengarah ke halaman /program.
 * Daftar lengkapnya ada di ProgramKerjaList supaya beranda tidak terlalu padat.
 */
export default function ProgramTeaser() {
  return (
    <div
      id="program"
      className="relative overflow-hidden rounded-xl border border-[#DDE5E1] bg-white p-6 md:p-8"
    >
      {/*
        Dekorasi dibungkus wadah overflow-hidden sendiri. Tanpa ini, lingkaran yang
        menjorok ke kanan menambah lebar scroll kartu, sehingga browser bisa menggeser
        isi kartu ke kiri saat men-scroll tombol di dalamnya ke tampilan.
      */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-[#EAF6F0] blur-3xl" />
        <div className="absolute -left-24 -bottom-20 h-56 w-56 rounded-full bg-[#EAF7FB] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F4C81]">
            {PROGRAM_KERJA.length} PROGRAM UNGGULAN
          </span>
          <h3 className="mt-1 text-2xl font-extrabold leading-tight text-[#17202A] md:text-3xl">
            Program Kerja Nyata untuk Cibening
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#5B6470] md:text-base">
            Fokus utama untuk kemajuan seluruh dimensi kehidupan warga Desa Cibening,
            diwujudkan secara transparan, akuntabel, dan kolaboratif.
          </p>
        </div>

        <Link
          href="/program"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0F4C81] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0b3b64]"
        >
          <span>Lihat {PROGRAM_KERJA.length} Program</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
