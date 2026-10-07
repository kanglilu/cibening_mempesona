import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ambilSesiAdmin } from "../../../src/lib/supabase-server";
import FormMasuk from "../../../src/components/admin/FormMasuk";

export const metadata: Metadata = {
  title: "Masuk Backoffice | Desa Cibening",
  robots: { index: false, follow: false }
};

export default async function HalamanLogin() {
  // Sudah login? langsung ke dashboard.
  const sesi = await ambilSesiAdmin();
  if (sesi) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EEF6F3] px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <img
            src="/assets/content/images/cibening_logo_blue.webp"
            alt="Logo Desa Cibening"
            className="mx-auto h-14 w-auto"
          />
          <h1 className="mt-4 text-xl font-extrabold text-[#17202A]">Backoffice Desa Cibening</h1>
          <p className="mt-1 text-sm text-[#5B6470]">Khusus pengurus. Silakan masuk.</p>
        </div>

        <FormMasuk />
      </div>
    </main>
  );
}
