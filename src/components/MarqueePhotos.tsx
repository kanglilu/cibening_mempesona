"use client";

import React, { useRef, useEffect, useState } from "react";
import { ExternalLink, PlayCircle, X } from "lucide-react";
import { GALLERY_TIKTOK, TikTokGalleryItem } from "../data";

export default function MarqueePhotos() {
  const [activeVideo, setActiveVideo] = useState<TikTokGalleryItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPendingInteraction = useRef(false);
  const interactionTimeout = useRef<any>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const autoScrollLeftRef = useRef(0);

  // Triple the array to ensure high capacity endless scrolling
  const tripledVideos = [...GALLERY_TIKTOK, ...GALLERY_TIKTOK, ...GALLERY_TIKTOK];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    // Gentle steady slow auto-scroll speed.
    const speed = 0.35;

    const setInitialOffset = () => {
      const segmentWidth = container.scrollWidth / 3;
      container.scrollLeft = segmentWidth;
      autoScrollLeftRef.current = segmentWidth;
    };

    setInitialOffset();

    const step = () => {
      if (!isPendingInteraction.current && !isDraggingRef.current) {
        autoScrollLeftRef.current += speed;
        container.scrollLeft = autoScrollLeftRef.current;

        // Seamless loop wrap-around
        const segmentWidth = container.scrollWidth / 3;
        if (autoScrollLeftRef.current >= segmentWidth * 2) {
          autoScrollLeftRef.current -= segmentWidth;
          container.scrollLeft = autoScrollLeftRef.current;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationId);
      if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    };
  }, []);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const segmentWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= segmentWidth * 2) {
      container.scrollLeft -= segmentWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += segmentWidth;
    }

    autoScrollLeftRef.current = container.scrollLeft;
  };

  // Mouse drag-to-scroll support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    isPendingInteraction.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
    resumeAutoScrollWithDelay();
  };

  const resumeAutoScrollWithDelay = () => {
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      isPendingInteraction.current = false;
    }, 1200); // Resume shortly after user interaction.
  };

  const handleTouchStart = () => {
    isPendingInteraction.current = true;
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
  };

  const handleTouchEnd = () => {
    resumeAutoScrollWithDelay();
  };

  return (
    <div className="w-full bg-[#EAF7FB]/40 border-b border-[#DDE5E1]/60 py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F4C81]">Galeri</span>
        <h4 className="text-xs sm:text-sm font-bold text-[#17202A]">Video Kegiatan &amp; Kunjungan Lapangan</h4>
      </div>
      
      {/* Scrollable Container without side shades */}
      <div className="relative w-full flex items-center">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-4 overflow-x-auto scrollbar-none select-none active:cursor-grabbing cursor-grab py-2 px-4 w-full"
          style={{ scrollBehavior: "auto" }}
        >
          {tripledVideos.map((video, index) => (
            <button
              key={`${video.id}-${index}`}
              type="button"
              onClick={() => {
                if (hasDraggedRef.current) {
                  hasDraggedRef.current = false;
                  return;
                }
                setActiveVideo(video);
              }}
              className="relative basis-[calc((100%_-_1rem)/2)] sm:basis-44 aspect-[3/4] rounded-[10px] overflow-hidden shadow-sm border border-[#DDE5E1] bg-white group shrink-0"
              style={{ borderRadius: "10px" }}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ borderRadius: "10px" }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <PlayCircle className="absolute left-1/2 top-1/2 z-10 w-10 h-10 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md transition-transform group-hover:scale-110" />
              {/* Overlaid Details */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-left"
                style={{ borderRadius: "10px" }}
              >
                <span className="text-[8px] sm:text-[9px] text-[#5DCAA5] font-extrabold uppercase tracking-wide">
                  {video.tag}
                </span>
                <span className="text-[9px] sm:text-xs font-bold text-white leading-tight mt-0.5 sm:mt-1 truncate">
                  {video.title}
                </span>
                <span className="text-[8px] sm:text-[10px] text-white/75 leading-snug mt-1 line-clamp-2">
                  {video.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[80] bg-[#0a1a3a]/80 backdrop-blur-sm px-4 py-6 flex items-center justify-center">
          <div className="relative w-full max-w-[380px] bg-white rounded-xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#DDE5E1]">
              <div className="min-w-0">
                <h4 className="text-sm font-extrabold text-[#17202A] truncate">{activeVideo.title}</h4>
                <p className="text-xs text-[#5B6470] truncate">{activeVideo.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="shrink-0 w-9 h-9 rounded-lg border border-[#DDE5E1] flex items-center justify-center text-[#17202A] hover:bg-[#EAF6F0]"
                aria-label="Tutup video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-black aspect-[9/16]">
              <iframe
                key={activeVideo.videoId}
                src={`https://www.tiktok.com/embed/v2/${activeVideo.videoId}`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            <a
              href={activeVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-[#0F4C81] hover:bg-[#EAF7FB]"
            >
              <span>Buka di TikTok</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
