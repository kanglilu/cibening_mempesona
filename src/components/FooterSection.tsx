"use client";

import { ArrowUp, Facebook, Instagram, MapPin } from "lucide-react";

export default function FooterSection() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0a1a3a] text-white overflow-hidden py-10 px-6 md:py-14">
      {/* 
        Motif etnik outline opacity < 5% sebagai dekorasi sangat tipis.
        We embed an beautiful decorative SVG background reflecting traditional Bekasi heritage geometry.
      */}
      <div className="absolute inset-0 pointer-events-none opacity-3 z-0 flex items-center justify-center select-none">
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          className="text-white fill-none stroke-current stroke-[0.3]"
        >
          <polygon points="50,5 95,50 50,95 5,50" />
          <polygon points="50,15 85,50 50,85 15,50" />
          <circle cx="50" cy="50" r="10" />
          <circle cx="50" cy="50" r="22" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="15" y1="15" x2="85" y2="85" />
          <line x1="85" y1="15" x2="15" y2="85" strokeDasharray="1,1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-10">

        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Logo & Slogan info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-md shadow-md overflow-hidden">
                <img
                  src="/assets/content/images/cibening_logo.webp"
                  alt="Logo Desa Cibening"
                  className="w-full h-full object-contain p-0.5"
                  draggable={false}
                />
              </div>
              <div>
                <h4 className="font-extrabold text-lg leading-tight uppercase tracking-wide">
                  Anton Suryana
                </h4>
                <p className="text-[10px] text-[#5DCAA5] font-bold uppercase tracking-widest mt-0.5">
                  Calon Kepala Desa Cibening 01
                </p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Membangun Desa Cibening yang Maju, Bersih, transparan, dan berkeadilan melalui pengabdian tulus dan kerja nyata.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="bg-white/10 text-[#5DCAA5] px-2.5 py-1 rounded text-xs font-bold font-mono">
                #cibeningmempesona
              </span>
              <span className="bg-white/10 text-white/80 px-2.5 py-1 rounded text-xs font-bold font-mono">
                #antonsuryana
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/anton.suryana/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 text-[#5DCAA5] hover:text-white rounded flex items-center justify-center transition-colors"
                title="Instagram Anton Suryana"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/anton.suryana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 text-[#5DCAA5] hover:text-white rounded flex items-center justify-center transition-colors"
                title="Facebook Anton Suryana"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@anton.suryana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 text-[#5DCAA5] hover:text-white rounded flex items-center justify-center transition-colors"
                title="TikTok Anton Suryana"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 11.14-4.02v-6.9a8.16 8.16 0 0 0 4.65 1.5v-3.5a4.83 4.83 0 0 1-1.2-.49z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Combined Quick Nav + Posko columns side-by-side on mobile, standard layout on desktop */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-6 items-start">
            {/* Quick Nav links */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="text-[#5DCAA5] text-xs font-bold uppercase tracking-wider">NAVIGASI CAMPAIGN</h5>
              <ul className="space-y-2 text-sm text-white/75">
                <li>
                  <a href="#profil" className="hover:text-white transition-colors flex items-center gap-1.5">
                    &rsaquo; Profil Singkat
                  </a>
                </li>
                <li>
                  <a href="#visi" className="hover:text-white transition-colors flex items-center gap-1.5">
                    &rsaquo; Visi Misi Desa
                  </a>
                </li>
                <li>
                  <a href="#program" className="hover:text-white transition-colors flex items-center gap-1.5">
                    &rsaquo; 10 Program Kerja
                  </a>
                </li>
                <li>
                  <a href="#aspirasi" className="hover:text-white transition-colors flex items-center gap-1.5">
                    &rsaquo; Kirim Aspirasi Warga
                  </a>
                </li>
              </ul>
            </div>

            {/* Alamat Sekretariat & Kontak */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="text-[#5DCAA5] text-xs font-bold uppercase tracking-wider">POSKO PEMENANGAN</h5>
              <div className="space-y-2 text-sm text-white/75">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#5DCAA5] shrink-0 mt-0.5" />
                  <span>Desa Cibening, Kec. Setu, Kab. Bekasi - Jawa Barat</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>
            &copy; 2026 Kampanye Anton Suryana. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>

          <button
            onClick={scrollUp}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 transition-all text-white/85"
            title="Kembali ke atas"
            type="button"
          >
            <span>Atas</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
