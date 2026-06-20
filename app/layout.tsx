import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../src/index.css";

const siteUrl = "https://antonsuryana.web.id";
const ogImageUrl = `${siteUrl}/assets/content/images/Anton_potrait.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anton Suryana untuk Desa Cibening | Kec. Setu, Kab. Bekasi",
  description:
    "Website kampanye Anton Suryana calon Kepala Desa Cibening, Kecamatan Setu, Kabupaten Bekasi. Lihat profil, visi misi, program kerja, dan sampaikan aspirasi warga.",
  icons: {
    icon: "/assets/content/images/pavicon.webp",
    shortcut: "/assets/content/images/pavicon.webp",
    apple: "/assets/content/images/pavicon.webp"
  },
  openGraph: {
    title: "Anton Suryana untuk Desa Cibening",
    description:
      "Bersama membangun Desa Cibening yang maju, bersih, transparan, dan melayani.",
    images: [
      {
        url: ogImageUrl,
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
    images: [ogImageUrl]
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
