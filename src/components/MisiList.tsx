import { MISI_LIST } from "../data";

export default function MisiList() {
  return (
    <div id="misi" className="relative overflow-hidden space-y-6">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/assets/content/images/ornament_4.webp"
          alt=""
          className="absolute -right-24 top-0 w-72 rotate-[-12deg] opacity-15 select-none md:w-80"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <img
          src="/assets/content/images/ornament_5.webp"
          alt=""
          className="absolute -left-24 bottom-[-2rem] w-80 rotate-[16deg] opacity-15 select-none md:w-96"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="relative z-10 text-center md:text-left">
        <img
          src="/assets/content/images/cibening_logo_blue.webp"
          alt="Logo Desa Cibening"
          className="mx-auto mb-4 h-20 w-auto select-none md:h-24"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F4C81]">8 MISI UTAMA</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#17202A] mt-1">Langkah Nyata Membangun Desa</h3>
        <p className="text-[#5B6470] mt-2 max-w-2xl text-sm md:text-base">
          Delapan pilar utama yang menjadi jangkar arah kebijakan pembangunan Desa Cibening yang berkeadilan, inklusif, dan transparan.
        </p>
      </div>

      {/* Grid: 2 kolom di semua screen (mobile hingga desktop) */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-4">
        {MISI_LIST.map((misi) => (
          <div
            key={misi.id}
            className="flex flex-col sm:flex-row items-start bg-[#EAF7FB]/40 hover:bg-[#EAF7FB]/85 border border-[#DDE5E1] transition-all p-3 sm:p-5 shadow-sm"
            style={{
              borderLeftWidth: "3px",
              borderLeftColor: "#1E88A8",
              borderRadius: "0 8px 8px 0"
            }}
          >
            {/* Box #0F4C81 badge nomor */}
            <div className="shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-[#0F4C81] text-white font-bold text-xs sm:text-sm rounded mb-2 sm:mb-0 sm:mr-4">
              {misi.id.toString().padStart(2, "0")}
            </div>

            {/* Misi text with custom line-height 1.7 */}
            <div className="flex-1">
              <p className="text-[#17202A] text-xs sm:text-[15px] leading-snug sm:leading-[1.7] font-medium">
                {misi.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
