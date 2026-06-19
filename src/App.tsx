/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import HeaderNavbar from "./components/HeaderNavbar";
import HeroSection from "./components/HeroSection";
import MarqueePhotos from "./components/MarqueePhotos";
import ProfilSingkat from "./components/ProfilSingkat";
import VisiSlideshow from "./components/VisiSlideshow";
import MisiList from "./components/MisiList";
import ProgramKerjaList from "./components/ProgramKerjaList";
import FormAspirasi from "./components/FormAspirasi";
import KontakPosko from "./components/KontakPosko";
import FooterSection from "./components/FooterSection";
import StickyBottomCTA from "./components/StickyBottomCTA";
import BackgroundOrnaments from "./components/BackgroundOrnaments";

export default function App() {
  return (
    <div className="site-shell relative flex flex-col min-h-screen pt-16">
      <BackgroundOrnaments />

      <div className="relative flex flex-col min-h-screen">
        {/* 1. Sticky Navigation Header */}
        <HeaderNavbar />

        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Slideshow Visi Section */}
        <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60 bg-[#EAF7FB]/20">
          <VisiSlideshow />
        </div>

        {/* 4. Misi (8 Poin) Section */}
        <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60">
          <MisiList />
        </div>

        {/* 5. Program Kerja (7 Program) Section */}
        <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60 bg-[#EAF6F0]/20">
          <ProgramKerjaList />
        </div>

        {/* 6. Infinite TikTok Gallery Slider */}
        <MarqueePhotos />

        {/* 7. Profil Singkat Section (Pelayan Masyarakat Yang Handal & Terbuka) */}
        <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60">
          <ProfilSingkat />
        </div>

        {/* 8. Form Aspirasi Warga Section */}
        <div className="px-4 md:px-8 py-10 md:py-14 border-b border-[#DDE5E1]/60">
          <FormAspirasi />
        </div>

        {/* 9. Kontak & Posko Section */}
        <div className="px-4 md:px-8 py-10 md:py-14 bg-white">
          <KontakPosko />
        </div>

        {/* 10. Footer Section */}
        <FooterSection />

        {/* 11. Sticky Bottom CTA (Mobile Screen Overlay Only) */}
        <StickyBottomCTA />
      </div>
    </div>
  );
}
