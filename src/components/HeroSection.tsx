import { MapPin, ArrowRight, NotebookPen, Check, ChevronDown, Instagram, Facebook, Heart } from "lucide-react";

export default function HeroSection() {
  const sidebarData = [
    {
      id: "tentang",
      title: "PROFIL SINGKAT",
      desc: "Sosok muda progresif, dekat dengan masyarakat, membawa visi transparansi dan keadilan sosial bagi seluruh warga Desa Cibening."
    },
    {
      id: "program",
      title: "10 PROGRAM UNGGULAN",
      desc: "Mulai dari pelayanan cepat, infrastruktur, edukasi warga, pengelolaan sampah, olahraga desa, hingga penguatan UMKM lokal."
    },
    {
      id: "kontak-sosmed",
      title: "MEDIA SOSIAL",
      desc: "Ikuti rekam jejak, transparansi kegiatan sosialisasi harian, serta ruang diskusi terbuka bersama tim Anton Suryana."
    }
  ];

  return (
    <section id="home" className="relative bg-white pt-6 pb-0 px-4 md:px-8 border-b border-[#DDE5E1]/70 overflow-hidden">
      {/* 
        Hero Layout with unified Main Hero Unit:
        - Image behaves like an integrated container asset on the right (w-[42%])
        - Text is containerized on the left (w-[58%] to w-[60%])
        - They are always aligned side-by-side ("sejajar") even on small 360px screens
        - No frames, no borders, no overlapping
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* MAIN HERO UNIT (Left & Center columns merged into a 9-column container on desktop, full-width on mobile) */}
        <div className="lg:col-span-9 relative flex items-stretch min-h-[412px] md:min-h-[560px] pb-6 lg:pb-0 mb-0 w-full mx-auto lg:mx-0">

          {/* Left Text and CTA column: positioned above the background portrait (z-10) with generous readable space */}
          <div className="w-[200px] sm:w-[70%] md:w-[60%] lg:w-[55%] flex flex-col justify-center pr-[3px] sm:pr-3 z-10 space-y-3.5 animate-fadeIn md:h-auto min-h-[412px] relative">

            {/* Design Mockup Accent Line */}
            <div className="w-12 h-1 bg-[#0F4C81] rounded-full" />

            <div className="space-y-1.5">
              <span className="font-extrabold uppercase tracking-widest text-[#0F4C81] select-none block text-[8px] leading-[15.5px] sm:text-[11px] h-auto">
                Calon Kepala Desa Cibening
              </span>

              {/* Responsive main headline: avoids text-wrapping on short mobile width */}
              <h1 className="text-[26px] min-[400px]:text-[32px] sm:text-[42px] md:text-[54px] font-[800] leading-[1.08] text-[#17202A] tracking-tighter">
                Anton Suryana
              </h1>

              <h2 className="text-[#0F4C81] text-[11px] sm:text-sm md:text-base font-bold leading-snug max-w-[170px] min-[400px]:max-w-[190px] sm:max-w-sm">
                Menuju Era Baru Cibening yang Maju, Bersih, dan Melayani.
              </h2>
            </div>

            <p className="text-[#5B6470] text-[9.5px] sm:text-xs md:text-sm leading-relaxed max-w-[160px] min-[400px]:max-w-[180px] sm:max-w-sm font-medium [text-shadow:0_1px_8px_rgba(255,255,255,0.95),0_0_2px_rgba(255,255,255,0.9)]">
              Mendedikasikan diri untuk melayani kebutuhan nyata warga Desa Cibening, Kec. Setu dengan sistem tata kelola pemerintahan yang terbuka dan profesional.
            </p>

            {/* Location badge */}
            <div className="flex items-center gap-1.5 font-bold text-[#1F7A4D] bg-[#EAF6F0] w-fit px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#C3E4D4]/50 text-[8px] sm:text-xs">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#1F7A4D] shrink-0" />
              <span className="truncate">Cibening, Setu, Kab.Bekasi</span>
            </div>

            {/* Compact side-by-side/stacked responsive CTAs */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href="#program"
                className="text-center bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-bold rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all text-[11px] sm:text-xs w-[140px] sm:w-[150px] h-[36.5px] leading-[14.5px]"
              >
                <span>Program Kerja</span>
                <ArrowRight className="w-3 h-3" />
              </a>

              <a
                href="#aspirasi"
                className="text-center bg-white hover:bg-[#EAF6F0]/40 text-[#1F7A4D] border border-[#1F7A4D] font-bold rounded-lg flex items-center justify-center gap-1 transition-all text-[11px] sm:text-xs w-[140px] sm:w-[150px] h-[36.5px] leading-[14.5px]"
              >
                <NotebookPen className="w-3 h-3" />
                <span>Kirim Aspirasi</span>
              </a>
            </div>

            {/* Scroll Indicator Circle Button (Mock style) */}
            <div className="pt-2">
              <a
                href="#profil"
                className="w-10 h-10 rounded-full bg-[#0F4C81] hover:bg-[#1E88A8] text-white flex items-center justify-center shadow-md transition-all custom-scroll-indicator active:scale-95"
                title="Pelajari Lebih Lanjut"
              >
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Portrait Column: clean bottom-aligned portrait behaving as background edge (increased width on mobile to 62%) */}
          <div className="absolute right-0 bottom-0 top-0 w-[82%] sm:w-[50%] md:w-[45%] lg:w-[40%] flex items-stretch justify-end pointer-events-none select-none z-[2]">
            <div
              className="h-full w-full"
              style={{
                maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
              }}
            >
              <img
                src="/assets/content/images/Anton_potrait.webp"
                alt="Anton Suryana"
                className="hero-portrait-fade-in h-full w-full object-cover object-[calc(50%+40px)_top] filter contrast-[1.03]"
                fetchPriority="high"
                decoding="async"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.06) 8%, rgba(0,0,0,0.22) 18%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.78) 42%, black 54%, black 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.06) 8%, rgba(0,0,0,0.22) 18%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.78) 42%, black 54%, black 100%)"
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar info blocks according to mockup right col ("ABOUT ME", "FOLLOW ME") */}
        <div className="lg:col-span-3 pt-6 lg:pt-0 pb-8 space-y-6 lg:border-l border-[#DDE5E1]/60 lg:pl-6 flex flex-col justify-self-stretch justify-center">
          <div className="space-y-5">
            {sidebarData.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <h4 className="text-[11px] font-extrabold tracking-widest text-[#0F4C81] uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5DCAA5]" />
                  {item.title}
                </h4>
                <p className="text-[12px] text-[#5B6470] leading-relaxed">
                  {item.desc}
                </p>
                {item.id === "kontak-sosmed" && (
                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href="https://www.instagram.com/anton.suryana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#EAF7FB] hover:bg-[#0F4C81] text-[#0F4C81] hover:text-white rounded transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.facebook.com/anton.suryana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#EAF7FB] hover:bg-[#0F4C81] text-[#0F4C81] hover:text-white rounded transition-colors"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@anton.suryana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#EAF7FB] hover:bg-[#0F4C81] text-[#0F4C81] hover:text-white rounded transition-colors flex items-center justify-center"
                      title="TikTok"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 11.14-4.02v-6.9a8.16 8.16 0 0 0 4.65 1.5v-3.5a4.83 4.83 0 0 1-1.2-.49z" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#DDE5E1]/60">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-[10px] text-[#5B6470] font-bold uppercase tracking-wider">
                TIM PEMENANGAN ANTON SURYANA
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
