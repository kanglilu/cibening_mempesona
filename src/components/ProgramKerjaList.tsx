import { PROGRAM_KERJA } from "../data";
import { Zap, Eye, Construction, Store, Users, Leaf, MessageSquare, HeartPulse, HelpCircle } from "lucide-react";

export default function ProgramKerjaList() {
  const getIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case "Zap":
        return <Zap className={`${className} text-[#1F7A4D]`} />;
      case "Eye":
        return <Eye className={`${className} text-[#0F4C81]`} />;
      case "Construction":
        return <Construction className={`${className} text-[#1F7A4D]`} />;
      case "Store":
        return <Store className={`${className} text-[#0F4C81]`} />;
      case "Users":
        return <Users className={`${className} text-[#1F7A4D]`} />;
      case "Leaf":
        return <Leaf className={`${className} text-[#0F4C81]`} />;
      case "MessageSquare":
        return <MessageSquare className={`${className} text-[#1F7A4D]`} />;
      case "HeartPulse":
        return <HeartPulse className={`${className} text-[#0F4C81]`} />;
      default:
        return <HelpCircle className={`${className} text-[#5B6470]`} />;
    }
  };

  return (
    <div id="program" className="relative overflow-hidden space-y-6">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/assets/content/images/ornament_1.webp"
          alt=""
          className="absolute -right-24 top-2 w-72 rotate-[14deg] opacity-15 select-none md:w-80"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <img
          src="/assets/content/images/ornament_3.webp"
          alt=""
          className="absolute -left-24 bottom-[-3rem] w-80 rotate-[-18deg] opacity-15 select-none md:w-96"
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
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F4C81]">8 PROGRAM UNGGULAN</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#17202A] mt-1">
          Program Kerja Nyata untuk Cibening
        </h3>
        <p className="text-[#5B6470] mt-2 max-w-2xl text-sm md:text-base">
          Fokus utama untuk kemajuan seluruh dimensi kehidupan warga Desa Cibening, diwujudkan secara transparan, akuntabel, dan kolaboratif.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {PROGRAM_KERJA.map((prog, index) => {
          const isGreen = index % 2 === 0;
          const accentClass = isGreen ? "bg-[#1F7A4D]" : "bg-[#0F4C81]";
          const iconWrapClass = isGreen
            ? "border-[#BFE0CF] bg-[#F4FBF7]"
            : "border-[#BDD7EA] bg-[#F5FAFD]";
          const numberClass = isGreen ? "text-[#1F7A4D]" : "text-[#0F4C81]";

          return (
            <div
              key={prog.id}
              className="group relative min-h-[172px] overflow-hidden rounded-lg border border-[#D7E8DD] bg-[#F1FAF6] p-3.5 shadow-[0_1px_0_rgba(23,32,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B9D7C5] hover:bg-[#ECF8F2] hover:shadow-[0_14px_34px_rgba(31,122,77,0.10)] sm:min-h-[196px] sm:p-5"
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${accentClass}`} />

              <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
                <div className={`flex h-9 w-9 items-center justify-center rounded-md border ${iconWrapClass} transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10`}>
                  {getIcon(prog.iconName, "w-4.5 h-4.5 sm:w-5 sm:h-5")}
                </div>
                <span className={`mt-1 font-mono text-[10px] font-bold sm:text-xs ${numberClass}`}>
                  #{prog.id.toString().padStart(2, "0")}
                </span>
              </div>

              <h4 className="mb-2 text-[13px] font-extrabold leading-snug text-[#17202A] transition-colors group-hover:text-[#0F4C81] sm:text-base">
                {prog.title}
              </h4>
              <p className="text-[10.5px] leading-relaxed text-[#53606A] sm:text-[13px]">
                {prog.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
