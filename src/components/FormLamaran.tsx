"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, CheckCircle2, Send, ShieldCheck } from "lucide-react";

import {
  AREAS,
  NAMA_MAX_LENGTH,
  PENGALAMAN_MAX_LENGTH,
  WHATSAPP_PATTERN,
  type LamaranFormData
} from "../lamaran";

export default function FormLamaran({ slug, posisi }: { slug: string; posisi: string }) {
  const [sedangKirim, setSedangKirim] = useState(false);
  const [status, setStatus] = useState<"idle" | "sukses" | "gagal">("idle");
  const [pesan, setPesan] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LamaranFormData>({
    defaultValues: { nama: "", wilayah: "", whatsapp: "", pengalaman: "", website: "" }
  });

  const kirim = async (data: LamaranFormData) => {
    setSedangKirim(true);
    setStatus("idle");
    setPesan("");

    try {
      const res = await fetch("/api/lamaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slug })
      });

      const hasil = await res.json().catch(() => null);

      if (!res.ok || hasil?.status === "error") {
        throw new Error(hasil?.message || "Pendaftaran gagal dikirim.");
      }

      setStatus("sukses");
      reset();
    } catch (err) {
      setStatus("gagal");
      setPesan(
        err instanceof Error && err.message
          ? err.message
          : "Mohon cek koneksi internet lalu coba lagi."
      );
    } finally {
      setSedangKirim(false);
    }
  };

  if (status === "sukses") {
    return (
      <div className="rounded-xl border border-[#C3E4D4] bg-[#EAF6F0] p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#1F7A4D]" />
          <div>
            <h3 className="text-base font-bold text-[#1F7A4D]">Pendaftaran Terkirim!</h3>
            <p className="mt-1 text-sm text-[#5B6470]">
              Data Anda untuk posisi <strong>{posisi}</strong> sudah kami terima. Tim Desa
              Cibening akan menghubungi Anda melalui WhatsApp untuk langkah berikutnya.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const kelasInput = (adaError: boolean) =>
    `w-full rounded-lg border px-4 text-[#17202A] transition-all ${
      adaError ? "border-red-500" : "border-[#DDE5E1]"
    } bg-white`;

  return (
    <div id="daftar" className="rounded-xl border border-[#DDE5E1] bg-[#EAF6F0] p-5 md:p-6">
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#0F4C81]">
        Daftar Lowongan Ini
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[#5B6470]">
        Isi tiga data singkat berikut. Tim Desa Cibening akan menindaklanjuti lewat WhatsApp
        yang Anda cantumkan.
      </p>

      {status === "gagal" && (
        <div className="mt-4 flex items-start gap-2.5 rounded-lg border-l-4 border-red-500 bg-white p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <div>
            <h3 className="text-sm font-bold text-red-600">Pendaftaran belum terkirim</h3>
            <p className="mt-0.5 text-xs text-[#5B6470]">{pesan}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(kirim)} className="mt-4 space-y-3.5">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="lamaran-website">Website</label>
          <input id="lamaran-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-[#17202A]" htmlFor="lamaran-nama">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            id="lamaran-nama"
            type="text"
            placeholder="Contoh: Budi Santoso"
            style={{ minHeight: "48px" }}
            className={kelasInput(Boolean(errors.nama))}
            {...register("nama", {
              required: "Nama lengkap wajib diisi",
              maxLength: { value: NAMA_MAX_LENGTH, message: `Maksimal ${NAMA_MAX_LENGTH} karakter` }
            })}
          />
          {errors.nama && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.nama.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-[#17202A]" htmlFor="lamaran-wilayah">
            Wilayah / Kampung <span className="text-red-500">*</span>
          </label>
          <select
            id="lamaran-wilayah"
            style={{ minHeight: "48px" }}
            className={kelasInput(Boolean(errors.wilayah))}
            {...register("wilayah", { required: "Silakan pilih wilayah/kampung" })}
          >
            <option value="">-- Pilih Wilayah / Kampung --</option>
            {AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.wilayah && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.wilayah.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-[#17202A]" htmlFor="lamaran-whatsapp">
            Nomor WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            id="lamaran-whatsapp"
            type="tel"
            placeholder="Contoh: 08123456789"
            style={{ minHeight: "48px" }}
            className={kelasInput(Boolean(errors.whatsapp))}
            {...register("whatsapp", {
              required: "Nomor WhatsApp wajib diisi",
              pattern: {
                value: WHATSAPP_PATTERN,
                message: "Format nomor salah (wajib diawali 08xxx, 10-13 digit)"
              }
            })}
          />
          {errors.whatsapp && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.whatsapp.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-[#17202A]" htmlFor="lamaran-pengalaman">
            Pengalaman Kerja <span className="font-medium text-[#5B6470]">(opsional)</span>
          </label>
          <textarea
            id="lamaran-pengalaman"
            rows={3}
            placeholder="Contoh: 2 tahun operator produksi, punya SIM B1. Boleh dikosongkan."
            className={`${kelasInput(Boolean(errors.pengalaman))} py-3`}
            {...register("pengalaman", {
              maxLength: {
                value: PENGALAMAN_MAX_LENGTH,
                message: `Maksimal ${PENGALAMAN_MAX_LENGTH} karakter`
              }
            })}
          />
          {errors.pengalaman && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.pengalaman.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={sedangKirim}
          style={{ minHeight: "48px" }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F7A4D] text-sm font-bold text-white transition-colors hover:bg-[#19633e] disabled:cursor-wait disabled:opacity-75"
        >
          {sedangKirim ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Sedang Mengirim...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Daftar Sekarang</span>
            </>
          )}
        </button>
      </form>

      <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-[#5B6470]">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1F7A4D]" />
        <span>
          Data Anda hanya dipakai pemerintah Desa Cibening untuk menindaklanjuti pendaftaran
          ini, dan tidak ditampilkan di website.
        </span>
      </p>
    </div>
  );
}
