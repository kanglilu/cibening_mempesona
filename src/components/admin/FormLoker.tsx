"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ImagePlus, Save } from "lucide-react";

import { simpanLoker } from "../../lib/admin-actions";

export type LokerAwal = {
  id?: string;
  slug?: string;
  posisi?: string;
  deskripsi?: string | null;
  gambar_url?: string | null;
  status?: string;
};

const STATUS = [
  { nilai: "draft", label: "Draft (belum tampil)" },
  { nilai: "terbit", label: "Terbit (tampil di website)" },
  { nilai: "arsip", label: "Arsip (disimpan, tidak tampil)" }
];

const kelasInput =
  "w-full rounded-lg border border-[#DDE5E1] bg-white px-4 py-2.5 text-sm text-[#17202A]";
const kelasLabel = "mb-1.5 block text-xs font-bold text-[#17202A]";

function TombolSimpan() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{ minHeight: "48px" }}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F7A4D] text-sm font-bold text-white transition-colors hover:bg-[#19633e] disabled:cursor-wait disabled:opacity-75 sm:w-auto sm:px-8"
    >
      {pending ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Menyimpan...</span>
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          <span>Simpan Lowongan</span>
        </>
      )}
    </button>
  );
}

export default function FormLoker({ awal = {} }: { awal?: LokerAwal }) {
  const [pesanError, kirim] = useActionState(simpanLoker, null);
  const [pratinjau, setPratinjau] = useState<string | null>(awal.gambar_url ?? null);

  return (
    <form action={kirim} className="space-y-5">
      <input type="hidden" name="id" defaultValue={awal.id ?? ""} />
      <input type="hidden" name="gambar_url" defaultValue={awal.gambar_url ?? ""} />
      <input type="hidden" name="slug" defaultValue={awal.slug ?? ""} />

      {pesanError && (
        <div className="flex items-start gap-2.5 rounded-lg border-l-4 border-red-500 bg-red-50 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-xs font-medium text-red-700">{pesanError}</p>
        </div>
      )}

      <section className="rounded-xl border border-[#DDE5E1] bg-white p-5">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#0F4C81]">Gambar</h2>
        <p className="mt-1 text-xs text-[#5B6470]">
          Poster dari perusahaan. JPG, PNG, atau WebP, maksimal 4 MB. Boleh dikosongkan.
        </p>

        <div className="mt-4 flex flex-wrap items-start gap-4">
          <div className="h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-[#DDE5E1] bg-[#EAF6F0]">
            {pratinjau ? (
              <img src={pratinjau} alt="Pratinjau" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[#A0AEC0]">
                <ImagePlus className="h-6 w-6" />
              </div>
            )}
          </div>

          <input
            type="file"
            name="gambar"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const berkas = e.target.files?.[0];
              setPratinjau(berkas ? URL.createObjectURL(berkas) : (awal.gambar_url ?? null));
            }}
            className="text-sm text-[#5B6470] file:mr-3 file:rounded-lg file:border-0 file:bg-[#EAF7FB] file:px-4 file:py-2 file:text-xs file:font-bold file:text-[#0F4C81]"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-[#DDE5E1] bg-white p-5">
        <div>
          <label className={kelasLabel} htmlFor="posisi">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            id="posisi"
            name="posisi"
            required
            defaultValue={awal.posisi ?? ""}
            className={kelasInput}
            placeholder="DRIVER BOX PENDINGIN"
          />
        </div>

        <div>
          <label className={kelasLabel} htmlFor="deskripsi">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={14}
            defaultValue={awal.deskripsi ?? ""}
            className={`${kelasInput} leading-relaxed`}
            placeholder={"Tempel apa adanya dari pengumuman perusahaan.\nBaris baru dan jarak antar paragraf akan tampil sama persis di website."}
          />
          <p className="mt-1 text-[11px] text-[#5B6470]">
            Boleh langsung salin-tempel. Format barisnya dipertahankan.
          </p>
        </div>

        <div className="sm:max-w-xs">
          <label className={kelasLabel} htmlFor="status">
            Status <span className="text-red-500">*</span>
          </label>
          <select id="status" name="status" defaultValue={awal.status ?? "draft"} className={kelasInput}>
            {STATUS.map((s) => (
              <option key={s.nilai} value={s.nilai}>{s.label}</option>
            ))}
          </select>
        </div>
      </section>

      <TombolSimpan />
    </form>
  );
}
