import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import FormLoker from "../../../../../src/components/admin/FormLoker";

export default function LokerBaru() {
  return (
    <>
      <Link
        href="/admin"
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] hover:text-[#1E88A8]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Semua Lowongan</span>
      </Link>

      <h1 className="mb-5 text-xl font-extrabold text-[#17202A]">Lowongan Baru</h1>

      <FormLoker />
    </>
  );
}
