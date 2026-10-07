/**
 * Konstanta form aspirasi warga.
 * Dipakai bersama oleh form di browser dan validasi di API route,
 * supaya pilihan yang tampil di UI selalu sama dengan yang diterima server.
 */

export const CATEGORIES = [
  "Jalan",
  "Drainase",
  "Sampah",
  "Pelayanan desa",
  "UMKM",
  "Pemuda",
  "Keamanan",
  "Pendidikan",
  "Kesehatan",
  "Lainnya"
];

export const AREAS = [
  "Cikedokan",
  "Telaga Asih",
  "Rawa Belut",
  "Cigebang",
  "Tonggong Landak",
  "Rawa atug Kiray",
  "Perum Wisma Asri",
  "Perum Cibening Indah",
  "Rawa Atug Tegal Pentas",
  "Cigebang Tonggong Londok",
  "Cigebang Bonlap",
  "Cigebang KUD",
  "Setu Asri",
  "Cikedokan Bungur",
  "Cigebang Tegal Benteng",
  "Cluster Tera Kirana",
  "Cluster Adelia",
  "Cluster Ganda Arum",
  "Cluster Casa Five",
  "Cluster Alodia Residence",
  "Vila Asri Cibening",
  "Cibening Residence",
  "Cluster Amirta Residence",
  "Cluster Bumi Samudra Setu"
];

export const WHATSAPP_PATTERN = /^08[0-9]{8,11}$/;

export const NAMA_MIN_LENGTH = 2;
export const NAMA_MAX_LENGTH = 100;
export const ASPIRASI_MIN_LENGTH = 20;
export const ASPIRASI_MAX_LENGTH = 2000;

// Key JSON-nya tetap "campaign" supaya kolom Google Sheets yang sudah ada tidak berubah.
export const SOURCE_LABEL = "website antonsuryana.web.id";
