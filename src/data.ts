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

export interface VisiTaglineItem {
  id: number;
  text: string;
}

export interface VisiImageItem {
  id: number;
  image: string;
  theme: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  comment: string;
}

export const VISI_TAGLINES: VisiTaglineItem[] = [
  {
    id: 1,
    text: "Membangun desa melalui <span class='text-[#5DCAA5] font-extrabold'>pelayanan yang solutif</span> berlandaskan nasionalis dan agamis."
  },
  {
    id: 2,
    text: "Tata kelola yang <span class='text-[#5DCAA5] font-extrabold'>terbuka dan akuntabel</span> untuk seluruh warga Cibening."
  },
  {
    id: 3,
    text: "Ekonomi desa yang <span class='text-[#5DCAA5] font-extrabold'>kuat dan mandiri</span> bagi setiap warga Cibening."
  }
];

export const VISI_IMAGES: VisiImageItem[] = [
  {
    id: 1,
    image: "/assets/content/images/visislide3.webp",
    theme: "Kebun / ekonomi lokal"
  },
  {
    id: 2,
    image: "/assets/content/images/visislide4.webp",
    theme: "Kegiatan masyarakat"
  },
  {
    id: 3,
    image: "/assets/content/images/visislide5.webp",
    theme: "Silaturahmi warga"
  },
  {
    id: 4,
    image: "/assets/content/images/visislide6.webp",
    theme: "Pelayanan masyarakat"
  },
  {
    id: 5,
    image: "/assets/content/images/visislide7.webp",
    theme: "Kebersamaan warga"
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
    title: "BAGEUR (Bantuan Gerobak Usaha Rakyat)",
    description: "Pengembangan usaha lokal warga Cibening serta bantuan gerobak usaha rakyat sebagai modal awal warga yang membutuhkan.",
    iconName: "Store"
  },
  {
    id: 2,
    title: "Aspirasi Warga",
    description: "Kanal aspirasi online dan offline untuk menerima masukan masyarakat.",
    iconName: "MessageSquare"
  },
  {
    id: 3,
    title: "Balai Edukasi Centre",
    description: "Sarana kegiatan pelatihan masyarakat untuk peningkatan kapasitas warga.",
    iconName: "Users"
  },
  {
    id: 4,
    title: "SPBS",
    description: "Stasiun pembuangan dan biogradasi sampah untuk tata kelola lingkungan yang lebih bersih.",
    iconName: "Leaf"
  },
  {
    id: 5,
    title: "Fasilitas Olahraga Desa",
    description: "Penataan lapangan sepak bola dan fasilitas olahraga desa sebagai ruang kegiatan warga.",
    iconName: "Construction"
  },
  {
    id: 6,
    title: "LIBAS (Layanan Informasi Bantuan Sosial)",
    description: "Melayani dengan informasi, membantu dengan kepedulian agar bansos tepat sasaran.",
    iconName: "MessageSquare"
  },
  {
    id: 7,
    title: "BUMDes Maju Berkarya",
    description: "Program penguatan kelembagaan dan pengembangan unit usaha BUMDes untuk mendorong pemberdayaan masyarakat serta meningkatkan Pendapatan Asli Desa (PADes).",
    iconName: "Store"
  },
  {
    id: 8,
    title: "Siaga Sehat Desa",
    description: "Jaringan relawan kesehatan desa yang bekerja sama dengan PKK, Posyandu, Puskesmas, dan lembaga terkait untuk memberikan edukasi, pendampingan, serta mempermudah akses pelayanan dan administrasi kesehatan bagi masyarakat.",
    iconName: "HeartPulse"
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
