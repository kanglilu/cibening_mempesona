"use client";

import { useEffect, useState } from "react";
import { MessageCircle, HeartHandshake } from "lucide-react";

export default function StickyBottomCTA() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // Detect focused input elements
    const handleFocusIn = () => {
      setIsKeyboardVisible(true);
    };

    const handleFocusOut = () => {
      // Small timeout to guard fast moves between fields
      setTimeout(() => {
        const activeEl = document.activeElement;
        const isInputActive =
          activeEl &&
          (activeEl.tagName === "INPUT" ||
            activeEl.tagName === "TEXTAREA" ||
            activeEl.hasAttribute("contenteditable"));
        if (!isInputActive) {
          setIsKeyboardVisible(false);
        }
      }, 50);
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    // Dynamic viewport resize measurement for physical mobile keyboards
    let initialHeight = window.innerHeight;
    const handleResize = () => {
      if (window.innerHeight < initialHeight * 0.8) {
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Strict visual check: Hide on desktop (>=768px via tailwind md:hidden)
  // Hide if mobile keyboard is visible
  if (isKeyboardVisible) return null;

  const handleWAUrl = "https://wa.me/628120000000?text=Halo%20Tim%20Pemenangan%20Anton%20Suryana%2C%20saya%20ingin%20bersilaturahmi%20dan%20mendukung%20nomor%2001.";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#DDE5E1] px-4 py-2.5 flex items-center justify-between gap-3 z-40 md:hidden animate-slideUp"
      style={{
        boxShadow: "0 -4px 12px -2px rgba(10, 26, 60, 0.08)"
      }}
    >
      {/* Kiri: tombol "WhatsApp" hijau #1F7A4D */}
      <a
        href={handleWAUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-[#1F7A4D] hover:bg-[#165a38] text-white h-full px-3 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
        style={{ borderRadius: "8px" }}
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span className="truncate">WhatsApp Tim</span>
      </a>

      {/* Kanan: tombol "Aspirasi" biru #0F4C81 */}
      <a
        href="#aspirasi"
        className="flex-1 bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white h-full px-3 text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
        style={{ borderRadius: "8px" }}
      >
        <HeartHandshake className="w-4 h-4 shrink-0" />
        <span className="truncate">Kirim Aspirasi</span>
      </a>
    </div>
  );
}
