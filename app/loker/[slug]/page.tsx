import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";

import SiteShell from "../../../src/components/SiteShell";
import FormLamaran from "../../../src/components/FormLamaran";
import { ambilLokerBySlug } from "../../../src/lib/loker";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loker = await ambilLokerBySlug(slug);

  if (!loker) {
    return { title: "Lowongan tidak ditemukan | Desa Cibening" };
  }

  const judul = `${loker.posisi} | Loker Desa Cibening`;
  const ringkas =
    loker.deskripsi?.replace(/\s+/g, " ").trim().slice(0, 180) ||
    `Informasi lowongan ${loker.posisi} untuk warga Desa Cibening.`;

  return {
    title: judul,
    description: ringkas,
    alternates: { canonical: `/loker/${loker.slug}` },
    openGraph: {
      title: judul,
      description: ringkas,
      url: `/loker/${loker.slug}`,
      type: "article",
      locale: "id_ID",
      // Poster lowongan jadi gambar saat tautan dibagikan ke grup WhatsApp.
      ...(loker.gambar_url ? { images: [{ url: loker.gambar_url }] } : {})
    }
  };
}

export default async function LokerDetailPage({ params }: Props) {
  const { slug } = await params;
  const loker = await ambilLokerBySlug(slug);

  if (!loker) notFound();

  return (
    <SiteShell>
      <div className="px-4 py-8 md:px-8 md:py-12">
        <Link
          href="/loker"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] transition-colors hover:text-[#1E88A8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Semua Lowongan</span>
        </Link>

        <h1 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-[#17202A] md:text-4xl">
          {loker.posisi}
        </h1>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {loker.gambar_url && (
              <div className="overflow-hidden rounded-xl border border-[#DDE5E1] bg-[#EAF6F0]">
                <img
                  src={loker.gambar_url}
                  alt={`Pengumuman lowongan ${loker.posisi}`}
                  className="h-auto w-full object-cover"
                  decoding="async"
                />
              </div>
            )}

            {loker.deskripsi ? (
              <section className="rounded-xl border border-[#DDE5E1] bg-white p-5 md:p-6">
                {/* whitespace-pre-line menjaga baris dan paragraf pengumuman asli
                    tetap sama seperti saat disalin dari perusahaan. */}
                <p className="whitespace-pre-line text-sm leading-relaxed text-[#334155] md:text-[15px]">
                  {loker.deskripsi}
                </p>
              </section>
            ) : (
              !loker.gambar_url && (
                <section className="rounded-xl border border-dashed border-[#DDE5E1] bg-white p-5 text-sm text-[#5B6470] md:p-6">
                  Rincian pekerjaan belum disertakan pada pengumuman ini. Silakan daftar di
                  samping, nanti ditanyakan lebih lanjut saat ditindaklanjuti.
                </section>
              )
            )}
          </div>

          <aside className="space-y-4 lg:col-span-1">
            <FormLamaran slug={loker.slug} posisi={loker.posisi} />

            <div className="flex items-start gap-2 rounded-lg border border-[#C3E4D4] bg-white px-4 py-3 text-xs leading-relaxed text-[#1f3b33]">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1F7A4D]" />
              <span>
                Desa Cibening hanya meneruskan informasi. Rekrutmen sepenuhnya dilakukan
                perusahaan terkait. <strong>Jangan membayar biaya apa pun</strong> untuk melamar.
              </span>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
