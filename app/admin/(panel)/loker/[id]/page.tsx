import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Trash2, Users } from "lucide-react";

import { ambilSesiAdmin } from "../../../../../src/lib/supabase-server";
import { hapusLoker } from "../../../../../src/lib/admin-actions";
import FormLoker from "../../../../../src/components/admin/FormLoker";

export default async function UbahLoker({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const sesi = await ambilSesiAdmin();
  if (!sesi) redirect("/admin/login");

  const { data: loker, error } = await sesi.supabase
    .from("loker")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Gagal memuat lowongan: {error.message}
      </p>
    );
  }

  if (!loker) notFound();

  return (
    <>
      <Link
        href="/admin"
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] hover:text-[#1E88A8]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Semua Lowongan</span>
      </Link>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold text-[#17202A]">Ubah: {loker.posisi}</h1>

        <Link
          href={`/admin/lamaran?loker=${loker.id}`}
          className="flex items-center gap-1.5 rounded-lg border border-[#DDE5E1] bg-white px-3 py-2 text-xs font-bold text-[#0F4C81] transition-colors hover:bg-[#EAF7FB]"
        >
          <Users className="h-3.5 w-3.5" />
          <span>Lihat pelamar</span>
        </Link>
      </div>

      <FormLoker awal={loker} />

      <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
        <h2 className="text-sm font-bold text-red-700">Hapus lowongan</h2>
        <p className="mt-1 text-xs text-red-700/80">
          Lowongan dan seluruh data pelamarnya akan ikut terhapus permanen. Kalau hanya ingin
          menyembunyikan dari website, ubah statusnya jadi <strong>Arsip</strong> saja.
        </p>

        <form action={hapusLoker} className="mt-3">
          <input type="hidden" name="id" value={loker.id} />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-4 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Hapus permanen</span>
          </button>
        </form>
      </div>
    </>
  );
}
