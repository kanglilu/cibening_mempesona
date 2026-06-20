import { PROGRAM_KERJA, ProgramItem } from "../data";
import { Zap, Eye, Construction, Store, Users, Leaf, MessageSquare, HelpCircle } from "lucide-react";

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
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F4C81]">10 PROGRAM UNGGULAN</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#17202A] mt-1">
          Program Kerja Nyata untuk Cibening
        </h3>
        <p className="text-[#5B6470] mt-2 max-w-2xl text-sm md:text-base">
          Fokus utama untuk kemajuan seluruh dimensi kehidupan warga Desa Cibening, diwujudkan secara transparan, akuntabel, dan kolaboratif.
        </p>
      </div>

      {/* Grid: 2 kolom di mobile, 3 kolom di desktop */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {PROGRAM_KERJA.map((prog, index) => {
          // Alternative top border colors (Alternating hijau/biru)
          // index % 2 === 0: Hijau (#1F7A4D), index % 2 === 1: Biru (#0F4C81)
          const isGreen = index % 2 === 0;
          const borderColor = isGreen ? "#1F7A4D" : "#0F4C81";
          const bgColor = isGreen ? "bg-[#EAF6F0]/40 hover:bg-[#EAF6F0]/80" : "bg-[#EAF7FB]/40 hover:bg-[#EAF7FB]/80";

          return (
            <div
              key={prog.id}
              className={`flex flex-col p-3 sm:p-5 border border-[#DDE5E1] transition-all shadow-sm group ${bgColor}`}
              style={{
                borderTopWidth: "3.5px",
                borderTopColor: borderColor,
                borderRadius: "0 0 10px 10px"
              }}
            >
              {/* Badge Number and Icon layout */}
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-1.5 sm:p-2.5 bg-white rounded-lg border border-[#DDE5E1] shadow-inner">
                  {getIcon(prog.iconName, "w-4.5 h-4.5 sm:w-6 sm:h-6")}
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#5B6470]">
                  #{prog.id.toString().padStart(2, "0")}
                </span>
              </div>

              {/* Program title & details */}
              <h4 className="text-xs sm:text-[16px] font-bold text-[#17202A] leading-tight mb-1.5 sm:mb-2 group-hover:text-[#0F4C81] transition-colors">
                {prog.title}
              </h4>
              <p className="text-[#5B6470] text-[10px] sm:text-sm leading-relaxed flex-grow">
                {prog.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
