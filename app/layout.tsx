import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../src/index.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Anton Suryana untuk Desa Cibening | Kec. Setu, Kab. Bekasi",
  description:
    "Website kampanye Anton Suryana calon Kepala Desa Cibening, Kecamatan Setu, Kabupaten Bekasi. Lihat profil, visi misi, program kerja, dan sampaikan aspirasi warga.",
  icons: {
    icon: "/assets/content/images/cibening_logo.webp",
    shortcut: "/assets/content/images/cibening_logo.webp",
    apple: "/assets/content/images/cibening_logo.webp"
  },
  openGraph: {
    title: "Anton Suryana untuk Desa Cibening",
    description:
      "Bersama membangun Desa Cibening yang maju, bersih, transparan, dan melayani.",
    images: [
      {
        url: "/assets/content/images/Anton_potrait.webp",
        width: 1200,
        height: 630,
        alt: "Anton Suryana"
      }
    ],
    type: "website",
    locale: "id_ID"
  },
  twitter: {
    card: "summary_large_image",
    title: "Anton Suryana untuk Desa Cibening",
    description:
      "Bersama membangun Desa Cibening yang maju, bersih, transparan, dan melayani.",
    images: ["/assets/content/images/Anton_potrait.webp"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#EEF6F3"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id" style={{ colorScheme: "light" }}>
      <body className="bg-[#EEF6F3]">{children}</body>
    </html>
  );
}
