"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

export interface AspirasiFormData {
  nama: string;
  rtRw: string;
  whatsapp: string;
  kategori: string;
  isipikiran: string;
  website?: string;
}

const SUBMIT_LOCK_KEY = "cibening_aspirasi_submitted_at";
const SUBMIT_LOCK_DURATION = 24 * 60 * 60 * 1000;

const CATEGORIES = [
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

const AREAS = [
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

export default function FormAspirasi() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "limited">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [successData, setSuccessData] = useState<AspirasiFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AspirasiFormData>({
    defaultValues: {
      nama: "",
      rtRw: "",
      whatsapp: "",
      kategori: "",
      isipikiran: "",
      website: ""
    }
  });

  const onSubmitForm = async (data: AspirasiFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const previousSubmit = Number(window.localStorage.getItem(SUBMIT_LOCK_KEY) ?? 0);
      const nextAllowedAt = previousSubmit + SUBMIT_LOCK_DURATION;

      if (previousSubmit && Date.now() < nextAllowedAt) {
        const hoursLeft = Math.max(1, Math.ceil((nextAllowedAt - Date.now()) / (60 * 60 * 1000)));
        setSubmitStatus("limited");
        setSubmitMessage(
          `Agar setiap masukan dapat ditelaah dengan baik, pengiriman dari perangkat yang sama dapat dilakukan kembali dalam sekitar ${hoursLeft} jam.`
        );
        return;
      }

      if (data.website) {
        setSubmitStatus("error");
        setSubmitMessage("Aspirasi belum dapat diproses. Mohon muat ulang halaman lalu coba kembali.");
        return;
      }

      const payload = {
        ...data,
        submittedAt: new Date().toISOString(),
        campaign: "cibening mempesona 2026"
      };

      const response = await fetch("/api/aspirasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || result.status === "error" || result.success === false) {
        throw new Error(result.message || "Aspirasi gagal dikirim.");
      }

      setSubmitStatus("success");
      setSuccessData(data);
      window.localStorage.setItem(SUBMIT_LOCK_KEY, String(Date.now()));
      reset();
    } catch (err) {
      console.error("Gagal mengirim aspirasi ke Google Sheets.", err);
      setSubmitStatus("error");
      setSubmitMessage("Mohon cek koneksi internet lalu coba kirim ulang.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="aspirasi" className="bg-[#EAF6F0] rounded-xl p-6 md:p-8 border border-[#DDE5E1] transition-all relative">
      <div className="mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F4C81]">SUARA WARGA CIBENING</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#17202A] mt-1">Sampaikan Aspirasi Anda</h3>
        <p className="text-[#5B6470] text-sm md:text-base mt-2">
          Komitment Anton Suryana adalah mendengar. Setiap saran dan aspirasi Anda akan tercatat langsung ke Google Sheet tim kerja pemenangan.
        </p>
      </div>

      {submitStatus === "success" && successData && (
        <div className="mb-6 p-5 bg-white text-[#17202A] rounded-lg border-l-4 border-[#1F7A4D] animate-fadeIn space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#1F7A4D] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#1F7A4D] text-base">Aspirasi Terkirim Sukses!</h4>
              <p className="text-sm text-[#5B6470] mt-1">
                Terima kasih, Bapak/Ibu <strong>{successData.nama}</strong> dari <strong>{successData.rtRw}</strong>. Aspirasi Anda mengenai <strong>kategori {successData.kategori}</strong> telah diteruskan ke tim sukses Anton Suryana untuk dicatat dan ditelaah.
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-[#DDE5E1] flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-[#A0AEC0]">Tercatat ke Google Sheets</span>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="text-xs text-[#0F4C81] hover:underline font-bold"
            >
              Kirim Aspirasi Baru
            </button>
          </div>
        </div>
      )}

      {submitStatus === "limited" && (
        <div className="mb-6 p-4 bg-white text-[#17202A] rounded-lg border-l-4 border-[#0F4C81] animate-fadeIn flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#0F4C81] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#0F4C81] text-sm">Terima kasih, Anda sudah mengirim aspirasi sebelumnya</h4>
            <p className="text-xs text-[#5B6470] mt-1">
              {submitMessage}
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-white text-[#17202A] rounded-lg border-l-4 border-red-500 animate-fadeIn flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-600 text-sm">Aspirasi belum terkirim</h4>
            <p className="text-xs text-[#5B6470] mt-1">
              {submitMessage || "Mohon cek koneksi internet lalu coba kirim ulang."}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-xs font-bold text-[#17202A] mb-1.5" htmlFor="nama">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Contoh: Budi Santoso"
            style={{ minHeight: "48px" }}
            className={`w-full px-4 rounded-lg border ${errors.nama ? "border-red-500" : "border-[#DDE5E1]"
              } bg-white text-[#17202A] transition-all`}
            {...register("nama", { required: "Nama lengkap wajib diisi" })}
          />
          {errors.nama && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.nama.message}
            </p>
          )}
        </div>

        {/* Area and Whatsapp in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#17202A] mb-1.5" htmlFor="rtRw">
              Wilayah / Kampung <span className="text-red-500">*</span>
            </label>
            <select
              id="rtRw"
              style={{ minHeight: "48px" }}
              className={`w-full px-4 rounded-lg border ${errors.rtRw ? "border-red-500" : "border-[#DDE5E1]"
                } bg-white text-[#17202A] transition-all`}
              {...register("rtRw", { required: "Silakan pilih wilayah/kampung" })}
            >
              <option value="">-- Pilih Wilayah / Kampung --</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            {errors.rtRw && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.rtRw.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17202A] mb-1.5" htmlFor="whatsapp">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="whatsapp"
              type="tel"
              placeholder="Contoh: 08123456789"
              style={{ minHeight: "48px" }}
              className={`w-full px-4 rounded-lg border ${errors.whatsapp ? "border-red-500" : "border-[#DDE5E1]"
                } bg-white text-[#17202A] transition-all`}
              {...register("whatsapp", {
                required: "Nomor WhatsApp wajib diisi",
                pattern: {
                  value: /^08[0-9]{8,11}$/,
                  message: "Format nomor salah (Wajib dimulai 08xxx, min 10-13 digit)"
                }
              })}
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.whatsapp.message}
              </p>
            )}
          </div>
        </div>

        {/* Category select */}
        <div>
          <label className="block text-xs font-bold text-[#17202A] mb-1.5" htmlFor="kategori">
            Kategori Aspirasi <span className="text-red-500">*</span>
          </label>
          <select
            id="kategori"
            style={{ minHeight: "48px" }}
            className={`w-full px-4 rounded-lg border ${errors.kategori ? "border-red-500" : "border-[#DDE5E1]"
              } bg-white text-[#17202A] transition-all`}
            {...register("kategori", { required: "Silakan pilih kategori aspirasi" })}
          >
            <option value="">-- Pilih Kategori Aspirasi --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.kategori && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.kategori.message}
            </p>
          )}
        </div>

        {/* Isi Aspirasi */}
        <div>
          <label className="block text-xs font-bold text-[#17202A] mb-1.5" htmlFor="isipikiran">
            Isi Aspirasi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="isipikiran"
            placeholder="Tuliskan aspirasi, keluhan, harapan, atau saran pembangunan untuk Desa Cibening di sini..."
            style={{ minHeight: "120px" }}
            className={`w-full p-4 rounded-lg border ${errors.isipikiran ? "border-red-500" : "border-[#DDE5E1]"
              } bg-white text-[#17202A] transition-all`}
            {...register("isipikiran", {
              required: "Aspirasi wajib diisi",
              minLength: {
                value: 20,
                message: "Tuliskan minimal 20 karakter agar aspirasi dapat ditelaah dengan baik"
              }
            })}
          />
          {errors.isipikiran && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.isipikiran.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ minHeight: "48px" }}
          className="w-full bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 rounded-lg text-sm md:text-base font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-75 disabled:cursor-wait"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sedang Mengirim Aspirasi...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Kirim Aspirasi Sekarang</span>
            </>
          )}
        </button>
      </form>

      {/* Integration info box */}
      <div className="mt-4 pt-4 border-t border-[#DDE5E1] flex items-center gap-2 text-[11px] text-[#5B6470]">
        <HelpCircle className="w-3.5 h-3.5 text-[#1F7A4D] shrink-0" />
        <span>Data di atas dikirim langsung secara digital dan rahasia demi kemajuan bersama Desa Cibening.</span>
      </div>
    </div>
  );
}
