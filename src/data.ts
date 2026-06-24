/**
 * Data Campaign Anton Suryana - Calon Kepala Desa Cibening 2025
 */

import { Zap, Eye, Construction, Store, Users, Leaf, MessageSquare } from "lucide-react";

export interface ProgramItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface MisiItem {
  id: number;
  text: string;
}

export interface SlideItem {
  id: number;
  text: string;
  image: string;
  theme: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  comment: string;
}

export const VISI_SLIDES: SlideItem[] = [
  {
    id: 1,
    text: "Membangun desa melalui <span class='text-[#5DCAA5] font-extrabold'>pelayanan yang solutif</span> berlandaskan nasionalis dan agamis.",
    image: "/assets/content/images/visislide2.webp",
    theme: "Suasana desa / alam"
  },
  {
    id: 2,
    text: "Tata kelola yang <span class='text-[#5DCAA5] font-extrabold'>terbuka dan akuntabel</span> untuk seluruh warga Cibening.",
    image: "/assets/content/images/visislide1.webp",
    theme: "Balai desa / pelayanan"
  },
  {
    id: 3,
    text: "Ekonomi desa yang <span class='text-[#5DCAA5] font-extrabold'>kuat dan mandiri</span> bagi setiap warga Cibening.",
    image: "/assets/content/images/visislide3.webp",
    theme: "Kebun / ekonomi lokal"
  }
];

export const MISI_LIST: MisiItem[] = [
  {
    id: 1,
    text: "Mewujudkan pembangunan desa yang berkelanjutan, merata, dan berorientasi pada kebutuhan generasi masa kini serta masa depan."
  },
  {
    id: 2,
    text: "Meningkatkan tata kelola pemerintahan desa yang profesional, transparan, akuntabel, dan mudah diakses oleh masyarakat."
  },
  {
    id: 3,
    text: "Menata lingkungan, infrastruktur, dan kawasan permukiman desa yang bersih, nyaman, aman, dan tertib."
  },
  {
    id: 4,
    text: "Mengembangkan pelayanan publik yang cepat, mudah, inovatif, dan berbasis teknologi digital."
  },
  {
    id: 5,
    text: "Meningkatkan kualitas sumber daya manusia melalui pendidikan, kesehatan, keagamaan, dan pemberdayaan masyarakat."
  },
  {
    id: 6,
    text: "Mengembangkan potensi ekonomi desa, UMKM, pertanian, perdagangan, dan usaha masyarakat untuk meningkatkan kesejahteraan warga."
  },
  {
    id: 7,
    text: "Melestarikan budaya, nilai-nilai gotong royong, serta kearifan lokal sebagai identitas dan kekuatan Desa Cibening."
  },
  {
    id: 8,
    text: "Mendorong partisipasi masyarakat dalam pembangunan melalui kolaborasi antara pemerintah desa, lembaga desa, pemuda, perempuan, dan seluruh elemen masyarakat."
  }
];

export const PROGRAM_KERJA: ProgramItem[] = [
  {
    id: 1,
    title: "Pelayanan Desa Cepat",
    description: "Administrasi warga lebih mudah, jelas, dan tidak berbelit.",
    iconName: "Zap"
  },
  {
    id: 2,
    title: "Transparansi Desa",
    description: "Informasi program dan kegiatan desa disampaikan secara terbuka.",
    iconName: "Eye"
  },
  {
    id: 3,
    title: "Infrastruktur Merata",
    description: "Perbaikan jalan, drainase, penerangan, dan fasilitas umum sesuai prioritas warga.",
    iconName: "Construction"
  },
  {
    id: 4,
    title: "BAGEUR (Bantuan Gerobak Usaha Rakyat)",
    description: "Pengembangan usaha lokal warga Cibening serta bantuan gerobak usaha rakyat sebagai modal awal warga yang membutuhkan.",
    iconName: "Store"
  },
  {
    id: 5,
    title: "Pemuda Produktif",
    description: "Ruang kegiatan positif: olahraga, kreativitas, dan kewirausahaan.",
    iconName: "Users"
  },
  {
    id: 6,
    title: "Lingkungan Bersih",
    description: "Gotong royong, pengelolaan sampah, drainase, dan penghijauan.",
    iconName: "Leaf"
  },
  {
    id: 7,
    title: "Aspirasi Warga",
    description: "Kanal aspirasi online dan offline untuk menerima masukan masyarakat.",
    iconName: "MessageSquare"
  },
  {
    id: 8,
    title: "Balai Edukasi Centre",
    description: "Sarana kegiatan pelatihan masyarakat untuk peningkatan kapasitas warga.",
    iconName: "Users"
  },
  {
    id: 9,
    title: "SPBS",
    description: "Stasiun pembuangan dan biogradasi sampah untuk tata kelola lingkungan yang lebih bersih.",
    iconName: "Leaf"
  },
  {
    id: 10,
    title: "Fasilitas Olahraga Desa",
    description: "Penataan lapangan sepak bola dan fasilitas olahraga desa sebagai ruang kegiatan warga.",
    iconName: "Construction"
  }
];

export interface TikTokGalleryItem {
  id: number;
  title: string;
  description: string;
  tag: string;
  thumbnail: string;
  videoId: string;
  url: string;
}

export const GALLERY_TIKTOK: TikTokGalleryItem[] = [
  {
    id: 1,
    title: "Perbaikan Infrastruktur",
    description: "Memperbaiki drainase yang rusak",
    tag: "Infrastruktur",
    thumbnail: "/assets/content/images/tiktok_infrastruktur.webp",
    videoId: "7639020253464497415",
    url: "https://www.tiktok.com/@anton.suryana/video/7639020253464497415"
  },
  {
    id: 2,
    title: "Budaya dan Agama",
    description: "Berziarah ke makam Mbah Raden",
    tag: "Budaya",
    thumbnail: "/assets/content/images/tiktok_cagar_budaya.webp",
    videoId: "7644955568418966792",
    url: "https://www.tiktok.com/@anton.suryana/video/7644955568418966792"
  },
  {
    id: 3,
    title: "Gotong Royong",
    description: "Kerja bakti desa",
    tag: "Gotong Royong",
    thumbnail: "/assets/content/images/tiktok_gotong_royong.webp",
    videoId: "7637434045349072146",
    url: "https://www.tiktok.com/@anton.suryana/video/7637434045349072146"
  },
  {
    id: 4,
    title: "Musyawarah Desa",
    description: "Pelatihan masyarakat",
    tag: "Musyawarah",
    thumbnail: "/assets/content/images/tiktok_musyawarah.webp",
    videoId: "7626069519647182098",
    url: "https://www.tiktok.com/@anton.suryana/video/7626069519647182098"
  },
  {
    id: 5,
    title: "Festival Tahunan",
    description: "Desa selalu mengadakan acara publik setiap tahun",
    tag: "Festival",
    thumbnail: "/assets/content/images/tiktok_festival.webp",
    videoId: "7638486723000913170",
    url: "https://www.tiktok.com/@anton.suryana/video/7638486723000913170"
  }
];

export const PROFILE_PILLS = [
  { id: "users", text: "Dekat dengan warga" },
  { id: "eye", text: "Transparan" },
  { id: "hand", text: "Siap melayani" },
  { id: "wrench", text: "Kerja nyata" }
];
