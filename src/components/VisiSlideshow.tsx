"use client";

import { useState, useEffect } from "react";
import { VISI_SLIDES } from "../data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function VisiSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? VISI_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === VISI_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      id="visi"
      className="relative z-[2] w-full h-[380px] md:h-[420px] rounded-xl overflow-hidden shadow-md group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Animated Slides */}
      <div className="absolute inset-0 w-full h-full bg-[#0a1a3a]">
        {VISI_SLIDES.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.theme}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ))}

        {/* Solid Campaign Color Overlay (rgba(10, 26, 60, 0.62)) */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(10, 26, 60, 0.62)" }}
        />
      </div>

      {/* Floating Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 text-white z-10">
        
        {/* Top Eyebrow Category */}
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-8 bg-[#5DCAA5]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5DCAA5]">
            Visi Utama Desa Cibening &bull; {VISI_SLIDES[currentIndex].theme}
          </span>
        </div>

        {/* Big Vision Statement Quote & Content */}
        <div className="max-w-3xl my-auto">
          <Quote className="w-8 h-8 text-[#5DCAA5] opacity-60 mb-2" />
          <h2
            className="text-xl md:text-3xl font-extrabold leading-relaxed tracking-tight"
            dangerouslySetInnerHTML={{ __html: VISI_SLIDES[currentIndex].text }}
          />
        </div>

        {/* Bottom Bar: Manual Dots & Nav Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          
          {/* Dot Selectors */}
          <div className="flex items-center gap-2">
            {VISI_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-[#5DCAA5]" : "w-2.5 bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Manual Arrows (Slight responsive scaling) */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              type="button"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Slide Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="p-2 rounded-full bg-[#5DCAA5] hover:bg-[#5DCAA5]/90 text-[#0a1a3a] transition-all"
              title="Slide Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
