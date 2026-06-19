"use client";

import { useEffect, useState } from "react";
import { Eye, Users, HeartHandshake, Hammer, Award } from "lucide-react";

const PROFILE_IMAGES = [
  "/assets/content/images/profilsingkat1.webp",
  "/assets/content/images/profilsingkat2.webp",
  "/assets/content/images/profilsingkat3.webp",
  "/assets/content/images/profilsingkat4.webp",
  "/assets/content/images/profilsingkat5.webp"
];

export default function ProfilSingkat() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((current) => (current + 1) % PROFILE_IMAGES.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const compPills = [
    { id: "users", text: "Dekat dengan warga", icon: <Users className="w-4 h-4 text-[#1F7A4D]" /> },
    { id: "eye", text: "Transparan", icon: <Eye className="w-4 h-4 text-[#0F4C81]" /> },
    { id: "hand", text: "Siap melayani", icon: <HeartHandshake className="w-4 h-4 text-[#1E88A8]" /> },
    { id: "hammer", text: "Kerja nyata", icon: <Hammer className="w-4 h-4 text-[#1F7A4D]" /> }
  ];

  return (
    <div id="profil" className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
      {/* Photo Frame Column */}
      <div className="md:col-span-5 bg-[#EAF6F0]/20 border border-[#DDE5E1] rounded-xl relative overflow-hidden aspect-[3/4] md:aspect-auto md:min-h-[500px]">
        
        {/* Full photo slideshow */}
        <div className="absolute inset-0 bg-[#EAF6F0]">
          {PROFILE_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt="Anton Suryana Portrait"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out filter contrast-105 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
              referrerPolicy="no-referrer"
            />
          ))}

          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        </div>

        {/* Floating title */}
        <div className="absolute left-5 right-4 bottom-5 text-left">
          <h4 className="text-lg font-bold text-white drop-shadow-md">Anton Suryana</h4>
          <p className="text-xs text-white/90 font-medium mt-0.5 drop-shadow-md">Calon Kepala Desa Cibening, Kec. Setu</p>
        </div>
      </div>

      {/* Narrative Card Column */}
      <div className="md:col-span-7 flex flex-col justify-between bg-white border border-[#DDE5E1] p-6 md:p-8 rounded-xl relative">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0F4C81]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F4C81]">YANG MUDA, YANG MELAYANI</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-[#17202A] leading-tight">
            Pelayan Masyarakat Yang Handal &amp; Terbuka
          </h3>

          <p className="text-[#5B6470] text-[15px] md:text-base leading-[1.7]">
            Anton Suryana hadir dengan semangat pelayanan, keterbukaan, dan kerja nyata untuk masyarakat Desa Cibening. Dengan mengutamakan musyawarah dan kebutuhan warga, Anton Suryana berkomitmen membangun desa yang lebih tertata, mandiri, dan sejahtera.
          </p>
        </div>

        {/* Komitmen Pills: ti-users, ti-eye, ti-hand-stop (heart-handshake), ti-hammer */}
        <div className="mt-6 pt-6 border-t border-[#DDE5E1]">
          <span className="block text-[11px] font-extrabold text-[#17202A] mb-3 uppercase tracking-widest">
            Komitmen Kepemimpinan:
          </span>
          
          <div className="flex flex-wrap gap-2.5">
            {compPills.map((pill) => (
              <div
                key={pill.id}
                className="flex items-center gap-2 bg-[#EAF6F0] border border-[#C3E4D4]/80 text-[#17202A] px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:translate-y-[-1px] hover:shadow-sm"
              >
                {pill.icon}
                <span>{pill.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
