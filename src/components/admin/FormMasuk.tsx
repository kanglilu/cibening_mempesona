"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, LogIn } from "lucide-react";

import { masuk } from "../../lib/admin-actions";

function TombolMasuk() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{ minHeight: "48px" }}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F4C81] text-sm font-bold text-white transition-colors hover:bg-[#0b3b64] disabled:cursor-wait disabled:opacity-75"
    >
      {pending ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Memeriksa...</span>
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          <span>Masuk</span>
        </>
      )}
    </button>
  );
}

export default function FormMasuk() {
  const [pesanError, kirim] = useActionState(masuk, null);

  return (
    <form action={kirim} className="space-y-4 rounded-xl border border-[#DDE5E1] bg-white p-6">
      {pesanError && (
        <div className="flex items-start gap-2.5 rounded-lg border-l-4 border-red-500 bg-red-50 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-xs font-medium text-red-700">{pesanError}</p>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-bold text-[#17202A]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          style={{ minHeight: "48px" }}
          className="w-full rounded-lg border border-[#DDE5E1] bg-white px-4 text-[#17202A]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold text-[#17202A]" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          style={{ minHeight: "48px" }}
          className="w-full rounded-lg border border-[#DDE5E1] bg-white px-4 text-[#17202A]"
        />
      </div>

      <TombolMasuk />
    </form>
  );
}
