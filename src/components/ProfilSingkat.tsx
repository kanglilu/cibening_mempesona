"use client";

import { useEffect, useState } from "react";
import { BookOpenText, ChevronDown, ChevronUp } from "lucide-react";

const PROFILE_IMAGES = [
  "/assets/content/images/profilsingkat1.webp",
  "/assets/content/images/profilsingkat2.webp",
  "/assets/content/images/profilsingkat3.webp",
  "/assets/content/images/profilsingkat4.webp",
  "/assets/content/images/profilsingkat5.webp"
];

const introParagraphs = [
  "Di tengah dinamika pembangunan dan kehidupan masyarakat Desa Cibening, Anton Suryana, S.Kom dikenal sebagai sosok yang aktif, dekat dengan warga, serta memiliki pengalaman panjang dalam organisasi, pendidikan, dan pengabdian sosial.",
  "Selama mengemban amanah sebagai Ketua BPD Desa Cibening periode 2018-2026, Anton hadir dalam berbagai ruang pengabdian: mendampingi kebutuhan warga, memperkuat komunikasi dengan pemerintah desa, menyelesaikan persoalan masyarakat, dan menjaga suasana lingkungan tetap kondusif."
];

const detailParagraphs = [
  "Gaya kepemimpinannya dikenal sejuk dan merangkul, namun tetap tegas saat mengambil keputusan. Ia dipercaya mampu menjaga keseimbangan antara kepentingan masyarakat, arah pembangunan desa, dan nilai-nilai kebersamaan yang selama ini menjadi kekuatan Cibening.",
  "Rekam jejak Anton juga tumbuh dari dunia organisasi kepemudaan. Ia pernah menjabat sebagai Sekretaris Jenderal Karang Taruna tingkat Kecamatan selama 10 tahun, lalu dipercaya menjadi Bendahara Umum Karang Taruna Kabupaten Bekasi. Pengalaman ini membentuk ketelitian dalam tata kelola organisasi, administrasi, transparansi anggaran, dan kolaborasi lintas pihak.",
  "Di bidang pendidikan, Anton memiliki pengalaman sebagai pendidik di salah satu Madrasah Aliyah di Kabupaten Bekasi. Dari sana, ia memahami bahwa pembangunan desa tidak cukup hanya berbicara tentang infrastruktur, tetapi juga tentang karakter, pengetahuan, dan kualitas generasi muda.",
  "Dengan latar belakang pendidikan komputer, Anton turut menaruh perhatian pada teknologi dan inovasi. Baginya, teknologi dapat menjadi sarana untuk mempercepat pelayanan publik, memperkuat transparansi, dan membantu masyarakat menghadapi tantangan zaman.",
  "Kini, menjelang Pemilihan Kepala Desa Cibening Tahun 2026, Anton Suryana hadir sebagai figur yang berpengalaman, dekat dengan warga, memahami kebutuhan desa, dan membawa komitmen untuk pelayanan yang lebih baik, pembangunan berkelanjutan, serta kehidupan masyarakat yang harmonis."
];

export default function ProfilSingkat() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleParagraphs = isExpanded ? [...introParagraphs, ...detailParagraphs] : introParagraphs;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((current) => (current + 1) % PROFILE_IMAGES.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div id="profil" className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
      {/* Photo Frame Column */}
      <div className="md:col-span-5 bg-[#EAF6F0]/20 border border-[#DDE5E1] rounded-xl relative overflow-hidden aspect-[3/4] md:aspect-auto md:min-h-[500px]">
        
        {/* Full photo slideshow */}
        <div className="absolute inset-0 bg-[#EAF6F0]">
          {PROFILE_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt="Anton Suryana Portrait"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out filter contrast-105 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ))}

          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        </div>

        {/* Floating title */}
        <div className="absolute left-5 right-4 bottom-5 text-left">
          <h4 className="text-lg font-bold text-white drop-shadow-md">Anton Suryana</h4>
          <p className="text-xs text-white/90 font-medium mt-0.5 drop-shadow-md">Calon Kepala Desa Cibening, Kec. Setu</p>
        </div>
      </div>

      {/* Narrative Card Column */}
      <div className="md:col-span-7 flex flex-col justify-between bg-white border border-[#DDE5E1] p-6 md:p-8 rounded-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#EAF7FB] blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-[#EAF6F0] blur-3xl" />

        <div className="space-y-4">
          <div className="relative z-10 flex items-center gap-2">
            <BookOpenText className="w-5 h-5 text-[#0F4C81]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F4C81]">Selayang Pandang</span>
          </div>

          <h3 className="relative z-10 text-2xl md:text-3xl font-extrabold text-[#17202A] leading-tight">
            Pengabdian yang Tumbuh Bersama Warga
          </h3>

          <div className="relative z-10 rounded-lg border-l-4 border-[#1F7A4D] bg-[#EAF6F0]/70 px-4 py-4">
            <blockquote className="text-[15px] md:text-base font-medium italic leading-relaxed text-[#1f3b33]">
              "Membangun desa bukan hanya tentang hari ini, tetapi tentang menyiapkan masa depan yang lebih baik bagi seluruh masyarakat."
            </blockquote>
            <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0F4C81]">
              Anton Suryana
            </p>
          </div>

          <div className="relative z-10 space-y-4 text-sm md:text-[15px] leading-relaxed text-[#334155]">
            {visibleParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          className="relative z-10 mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-[#0F4C81] px-4 py-2 text-sm font-bold text-[#0F4C81] transition-colors hover:bg-[#EAF7FB]"
        >
          <span>{isExpanded ? "Tampilkan Ringkas" : "Baca Selengkapnya"}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

      </div>
    </div>
  );
}
