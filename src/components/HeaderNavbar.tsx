"use client";

import { useState } from "react";
import { MessageCircle, Menu, X, Landmark, ExternalLink } from "lucide-react";

export default function HeaderNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Profil", href: "#profil" },
    { name: "Visi", href: "#visi" },
    { name: "Misi", href: "#misi" },
    { name: "Program", href: "#program" },
    { name: "Aspirasi", href: "#aspirasi" },
    { name: "Hubungi", href: "#kontak" }
  ];

  const handleWAUrl = "https://wa.me/628120000000?text=Halo%20Tim%20Pemenangan%20Anton%20Suryana%2C%20saya%20ingin%20bersilaturahmi%20dan%20mendukung%20nomor%2001.";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-white border-b border-[#DDE5E1] transition-all">
      <div className="flex items-center justify-between h-full px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* Left Side: Village Logo */}
        <a href="#profil" className="flex items-center gap-3 group">
          <img
            src="/assets/content/images/cibening_logo.webp"
            alt="Logo Desa Cibening"
            className="h-9 w-auto object-contain"
            draggable={false}
          />
        </a>

        {/* Center: Desktop Nav Links (hidden < 768px) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold text-[#5B6470] hover:text-[#0F4C81] transition-colors relative py-2"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side: WA Blue-Green CTA (Contact Us) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={handleWAUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1F7A4D] hover:bg-[#165a38] text-white text-[13px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi Kami</span>
          </a>
        </div>

        {/* Mobile Hamburger menu toggle button */}
        <div className="flex items-center md:hidden gap-2">
          {/* Direct WA Button in Mobile next to toggle for efficiency */}
          <a
            href={handleWAUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1F7A4D] text-white p-2 rounded-lg flex items-center justify-center"
            title="Chat WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border border-[#DDE5E1] rounded-lg text-[#17202A] hover:bg-[#EAF6F0]"
            aria-label="Toggle Menu"
            type="button"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Expandable Mobile Panel */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-[#DDE5E1] px-4 py-5 space-y-4 shadow-lg animate-fadeIn md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-[#17202A] hover:text-[#0F4C81] py-2 border-b border-[#DDE5E1]/40 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={handleWAUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#1F7A4D] text-white text-center py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tim Kampanye WhatsApp</span>
            </a>
            <div className="text-center text-[10px] text-[#5B6470] mt-1">
              Desa Cibening yang Maju, Bersih, dan Melayani
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
