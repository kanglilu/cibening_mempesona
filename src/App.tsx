/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SiteShell from "./components/SiteShell";
import HeroSection from "./components/HeroSection";
import MarqueePhotos from "./components/MarqueePhotos";
import ProfilSingkat from "./components/ProfilSingkat";
import VisiSlideshow from "./components/VisiSlideshow";
import MisiList from "./components/MisiList";
import ProgramTeaser from "./components/ProgramTeaser";
import FormAspirasi from "./components/FormAspirasi";
import KontakPosko from "./components/KontakPosko";

export default function App() {
  return (
    <SiteShell>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Profil Singkat Section */}
      <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60">
        <ProfilSingkat />
      </div>

      {/* 3. Slideshow Visi Section */}
      <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60 bg-[#EAF7FB]/20">
        <VisiSlideshow />
      </div>

      {/* 4. Misi (8 Poin) Section */}
      <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60">
        <MisiList />
      </div>

      {/* 5. Ringkasan Program Kerja, daftar lengkapnya di /program */}
      <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60 bg-[#EAF6F0]/20">
        <ProgramTeaser />
      </div>

      {/* 6. Infinite TikTok Gallery Slider */}
      <MarqueePhotos />

      {/* 7. Formulir Pelayanan Warga */}
      <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60">
        <FormAspirasi />
      </div>

      {/* 8. Kontak & Layanan Section */}
      <div className="px-4 md:px-8 py-10 md:py-14 bg-white">
        <KontakPosko />
      </div>
    </SiteShell>
  );
}
