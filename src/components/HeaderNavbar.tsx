"use client";

import { useState } from "react";
import { Instagram, Menu, X } from "lucide-react";

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

  const instagramDmUrl = "https://ig.me/m/anton.suryana";

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

        {/* Right Side: Instagram DM CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0F4C81] hover:bg-[#0b3b64] text-white border border-white text-[13px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <Instagram className="w-4 h-4" />
            <span>DM Instagram</span>
          </a>
        </div>

        {/* Mobile Hamburger menu toggle button */}
        <div className="flex items-center md:hidden gap-2">
          {/* Direct Instagram DM Button in Mobile next to toggle for efficiency */}
          <a
            href={instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0F4C81] text-white border border-white p-2 rounded-lg flex items-center justify-center"
            title="DM Instagram"
          >
            <Instagram className="w-4 h-4" />
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
              href={instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0F4C81] hover:bg-[#0b3b64] text-white border border-white text-center py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>DM Instagram Anton</span>
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
