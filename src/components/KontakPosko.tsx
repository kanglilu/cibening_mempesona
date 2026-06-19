import { MessageSquareCode, MapPinned, Clock, Phone, ExternalLink } from "lucide-react";

export default function KontakPosko() {
  const contactBlocks = [
    {
      id: 1,
      label: "WhatsApp Tim Sukses",
      value: "0812-3456-7890",
      description: "Tanyakan info kampanye atau jadwalkan kehadiran",
      icon: (className: string) => <Phone className={`${className} text-[#1F7A4D]`} />,
      actionLabel: "Chat WhatsApp",
      actionUrl: "https://wa.me/6281234567890?text=Halo%20Tim%20Pemenangan%20Anton%20Suryana%2C%20saya%20ingin%20bertanya%20mengenai%20jadwal%20sosialisasi."
    },
    {
      id: 2,
      label: "Posko Kampanye",
      value: "Desa Cibening, Kec. Setu",
      description: "Kec. Setu, Kab. Bekasi, Jawa Barat",
      icon: (className: string) => <MapPinned className={`${className} text-[#0F4C81]`} />,
      actionLabel: "Lihat Lokasi Maps",
      actionUrl: "https://maps.google.com/?q=Desa+Cibening+Setu+Bekasi"
    },
    {
      id: 3,
      label: "Jam Silaturahmi",
      value: "Senin–Sabtu, 08.00–17.00 WIB",
      description: "Pintu posko selalu terbuka untuk berdiskusi langsung",
      icon: (className: string) => <Clock className={`${className} text-[#1E88A8]`} />,
      actionLabel: "Hubungi Penjaga",
      actionUrl: "https://wa.me/6281234567890?text=Halo%20saya%20berencana%20hadir%20ke%20Posko%20Silahturahmi"
    }
  ];

  return (
    <div id="kontak" className="relative overflow-hidden space-y-6">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/assets/content/images/ornament_2.webp"
          alt=""
          className="absolute -right-24 top-0 w-72 rotate-[-16deg] opacity-15 select-none md:w-80"
          draggable={false}
        />
        <img
          src="/assets/content/images/ornament_4.webp"
          alt=""
          className="absolute -left-24 bottom-[-3rem] w-80 rotate-[18deg] opacity-15 select-none md:w-96"
          draggable={false}
        />
      </div>

      <div className="relative z-10 text-center md:text-left">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F4C81]">LAYANAN INFORMASI</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#17202A] mt-1">Kontak &amp; Posko Silaturahmi</h3>
        <p className="text-[#5B6470] text-sm md:text-base mt-2 max-w-2xl">
          Tertarik berkontribusi atau berdiskusi langsung dengan kandidat? Silakan kunjungi Posko Pemenangan kami atau hubungi nomor di bawah.
        </p>
      </div>

      {/* Grid: 2 columns in mobile (and 3rd stretches), 3 columns in desktop */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {contactBlocks.map((block) => (
          <div
            key={block.id}
            className="bg-white border border-[#DDE5E1] p-3.5 sm:p-6 rounded-xl hover:shadow-md transition-all flex flex-col justify-between odd:last:col-span-2 md:odd:last:col-span-1"
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Icon Container */}
              <div className="p-1.5 sm:p-3 bg-[#EAF6F0] w-fit rounded-lg border border-[#C3E4D4]">
                {block.icon("w-4.5 h-4.5 sm:w-6 sm:h-6")}
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5B6470]">
                  {block.label}
                </span>
                <h4 className="text-xs sm:text-base md:text-lg font-bold text-[#17202A] mt-0.5 sm:mt-1 break-words leading-tight">
                  {block.value}
                </h4>
                <p className="text-[10px] sm:text-xs text-[#5B6470] mt-1 leading-relaxed">
                  {block.description}
                </p>
              </div>
            </div>

            {/* CTA action link */}
            <div className="mt-4 sm:mt-6 pt-2 sm:pt-4 border-t border-[#DDE5E1]/60">
              <a
                href={block.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#0F4C81] hover:text-[#1E88A8] transition-colors group"
              >
                <span>{block.actionLabel}</span>
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
