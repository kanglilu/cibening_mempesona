import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BriefcaseBusiness, ExternalLink, LogOut, Users } from "lucide-react";

import { ambilSesiAdmin } from "../../../src/lib/supabase-server";
import { keluar } from "../../../src/lib/admin-actions";

export const metadata: Metadata = {
  title: "Backoffice | Desa Cibening",
  robots: { index: false, follow: false }
};

// Data backoffice harus selalu segar, jangan sampai kena cache halaman.
export const dynamic = "force-dynamic";

export default async function LayoutPanel({ children }: { children: ReactNode }) {
  // Penjaga pertama. Penjaga sebenarnya tetap RLS di database:
  // kalaupun halaman ini lolos, query tidak akan mengembalikan apa pun
  // untuk pengguna yang tidak terdaftar di tabel admin.
  const sesi = await ambilSesiAdmin();
  if (!sesi) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#EEF6F3]">
      <header className="border-b border-[#DDE5E1] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/content/images/cibening_logo_blue.webp"
              alt=""
              className="h-8 w-auto"
            />
            <div>
              <p className="text-sm font-extrabold leading-tight text-[#17202A]">Backoffice</p>
              <p className="text-[11px] text-[#5B6470]">{sesi.email}</p>
            </div>
          </div>

          <nav className="flex items-center gap-1.5">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-[#0F4C81] transition-colors hover:bg-[#EAF7FB]"
            >
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              <span>Lowongan</span>
            </Link>
            <Link
              href="/admin/lamaran"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-[#0F4C81] transition-colors hover:bg-[#EAF7FB]"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Pelamar</span>
            </Link>
            <Link
              href="/loker"
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-[#5B6470] transition-colors hover:bg-[#EAF6F0]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Lihat Situs</span>
            </Link>

            <form action={keluar}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg border border-[#DDE5E1] px-3 py-2 text-xs font-bold text-[#5B6470] transition-colors hover:bg-[#EAF6F0]"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Keluar</span>
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
