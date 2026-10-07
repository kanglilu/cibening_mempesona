import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import type { Loker } from "../lib/loker";

export default function LokerCard({ loker }: { loker: Loker }) {
  return (
    <Link
      href={`/loker/${loker.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D6E5DC] bg-white shadow-[0_14px_38px_rgba(23,32,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B9D7C5] hover:shadow-[0_18px_46px_rgba(15,76,129,0.13)]"
    >
      <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#EAF6F0]">
        {loker.gambar_url ? (
          <img
            src={loker.gambar_url}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Megaphone className="h-8 w-8 text-[#A7C9B6]" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="text-base font-extrabold leading-snug text-[#17202A] transition-colors group-hover:text-[#0F4C81]">
          {loker.posisi}
        </h2>

        {loker.deskripsi && (
          <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-[#53606A]">
            {loker.deskripsi}
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 border-t border-[#DDE5E1]/70 pt-3 text-xs font-bold text-[#0F4C81]">
          <span>Lihat detail</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
