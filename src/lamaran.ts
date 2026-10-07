/**
 * Konstanta form lamaran kerja.
 *
 * AREAS dan WHATSAPP_PATTERN sengaja diambil ulang dari modul aspirasi, bukan
 * disalin, supaya daftar wilayah dan aturan nomor WhatsApp tetap satu sumber.
 */
import {
  AREAS,
  NAMA_MAX_LENGTH,
  NAMA_MIN_LENGTH,
  WHATSAPP_PATTERN
} from "./aspirasi";

export { AREAS, NAMA_MAX_LENGTH, NAMA_MIN_LENGTH, WHATSAPP_PATTERN };

export const PENGALAMAN_MAX_LENGTH = 1000;

export type LamaranFormData = {
  nama: string;
  wilayah: string;
  whatsapp: string;
  pengalaman?: string; // opsional
  website?: string; // honeypot, harus tetap kosong
};
