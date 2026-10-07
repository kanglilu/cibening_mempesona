import type { ReactNode } from "react";

import HeaderNavbar from "./HeaderNavbar";
import FooterSection from "./FooterSection";
import StickyBottomCTA from "./StickyBottomCTA";
import BackgroundOrnaments from "./BackgroundOrnaments";
import ScrollToTopOnLoad from "./ScrollToTopOnLoad";

/**
 * Kerangka halaman yang dipakai bersama oleh semua route:
 * header sticky, ornamen latar, footer, dan CTA bawah khusus mobile.
 */
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell relative flex flex-col min-h-screen pt-16">
      <ScrollToTopOnLoad />
      <BackgroundOrnaments />

      <div className="relative flex flex-col min-h-screen">
        <HeaderNavbar />

        <main className="flex-1">{children}</main>

        <FooterSection />
        <StickyBottomCTA />
      </div>
    </div>
  );
}
