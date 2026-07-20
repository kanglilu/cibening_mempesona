"use client";

import { useState, useEffect } from "react";
import { VISI_IMAGES, VISI_TAGLINES } from "../data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function VisiSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [currentImageIndex, isHovered]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev === VISI_TAGLINES.length - 1 ? 0 : prev + 1));
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? VISI_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === VISI_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const currentImage = VISI_IMAGES[currentImageIndex];

  return (
    <div
      id="visi"
      className="relative z-[2] w-full h-[380px] md:h-[420px] rounded-xl overflow-hidden shadow-md group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Animated Slides */}
      <div className="absolute inset-0 w-full h-full bg-[#0a1a3a]">
        {VISI_IMAGES.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.theme}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[76%] bg-gradient-to-t from-[#061226]/90 via-[#061226]/45 to-transparent" />
      </div>

      {/* Floating Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 text-white z-10">
        
        {/* Top Eyebrow Category */}
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-8 bg-[#5DCAA5]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5DCAA5]">
            Visi Utama Desa Cibening &bull; {currentImage.theme}
          </span>
        </div>

        {/* Big Vision Statement Quote & Content */}
        <div className="max-w-3xl mt-auto mb-3 md:mb-4">
          <Quote className="w-7 h-7 md:w-8 md:h-8 text-[#5DCAA5] opacity-70 mb-2" />
          <div className="relative min-h-[118px] sm:min-h-[96px] md:min-h-[128px]">
            {VISI_TAGLINES.map((tagline, index) => (
              <h2
                key={tagline.id}
                className={`absolute inset-x-0 bottom-0 text-xl md:text-3xl font-extrabold leading-relaxed tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-all duration-700 ease-out ${
                  index === currentTaglineIndex
                    ? "translate-y-0 opacity-100 blur-0"
                    : "translate-y-2 opacity-0 blur-[2px]"
                }`}
                dangerouslySetInnerHTML={{ __html: tagline.text }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Bar: Manual Dots & Nav Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          
          {/* Dot Selectors */}
          <div className="flex items-center gap-1.5">
            {VISI_IMAGES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentImageIndex === idx ? "w-6 bg-[#5DCAA5]" : "w-2 bg-white/45"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Manual Arrows (Slight responsive scaling) */}
          <div className="flex gap-1.5">
            <button
              onClick={handlePrev}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Slide Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5DCAA5] hover:bg-[#5DCAA5]/90 text-[#0a1a3a] transition-all"
              title="Slide Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
