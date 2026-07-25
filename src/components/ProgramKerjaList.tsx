"use client";

import { useState } from "react";
import { PROGRAM_KERJA } from "../data";
import { ExternalLink, PlayCircle, X } from "lucide-react";

export default function ProgramKerjaList() {
  const [activeProgram, setActiveProgram] = useState<(typeof PROGRAM_KERJA)[number] | null>(null);

  return (
    <div id="program" className="relative overflow-hidden space-y-6">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/assets/content/images/ornament_1.webp"
          alt=""
          className="absolute -right-24 top-2 w-72 rotate-[14deg] opacity-15 select-none md:w-80"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <img
          src="/assets/content/images/ornament_3.webp"
          alt=""
          className="absolute -left-24 bottom-[-3rem] w-80 rotate-[-18deg] opacity-15 select-none md:w-96"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="relative z-10 text-center md:text-left">
        <img
          src="/assets/content/images/cibening_logo_blue.webp"
          alt="Logo Desa Cibening"
          className="mx-auto mb-4 h-20 w-auto select-none md:h-24"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F4C81]">8 PROGRAM UNGGULAN</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#17202A] mt-1">
          Program Kerja Nyata untuk Cibening
        </h3>
        <p className="text-[#5B6470] mt-2 max-w-2xl text-sm md:text-base">
          Fokus utama untuk kemajuan seluruh dimensi kehidupan warga Desa Cibening, diwujudkan secara transparan, akuntabel, dan kolaboratif.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {PROGRAM_KERJA.map((prog, index) => {
          const isGreen = index % 2 === 0;
          const accentClass = isGreen ? "bg-[#1F7A4D]" : "bg-[#0F4C81]";

          return (
            <button
              key={prog.id}
              type="button"
              onClick={() => setActiveProgram(prog)}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D6E5DC] bg-white p-2.5 text-left shadow-[0_14px_38px_rgba(23,32,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B9D7C5] hover:shadow-[0_18px_46px_rgba(15,76,129,0.13)]"
            >
              <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-[#EAF6F0]">
                <img
                  src={prog.thumbnail}
                  alt={prog.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                <PlayCircle className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 text-white opacity-90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-110" />
              </div>

              <div className="flex flex-1 flex-col px-2 pb-3 pt-4 sm:px-3">
                <div className={`mb-2 h-1 w-10 rounded-full ${accentClass}`} />
                <h4 className="text-base font-extrabold leading-snug text-[#17202A] transition-colors group-hover:text-[#0F4C81] sm:text-lg">
                  {prog.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#53606A]">
                  {prog.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {activeProgram && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0a1a3a]/80 px-4 py-6 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/20 bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-[#DDE5E1] px-4 py-3">
              <div className="min-w-0">
                <h4 className="truncate text-sm font-extrabold text-[#17202A]">{activeProgram.title}</h4>
                <p className="truncate text-xs text-[#5B6470]">{activeProgram.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProgram(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE5E1] text-[#17202A] hover:bg-[#EAF6F0]"
                aria-label="Tutup video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="aspect-video bg-black">
              <iframe
                key={activeProgram.youtubeId}
                src={`https://www.youtube.com/embed/${activeProgram.youtubeId}?autoplay=1&rel=0`}
                title={activeProgram.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <a
              href={activeProgram.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-[#0F4C81] hover:bg-[#EAF7FB]"
            >
              <span>Buka di YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
