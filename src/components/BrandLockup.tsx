type BrandLockupProps = {
  variant?: "header" | "section";
  showNumber?: boolean;
};

export default function BrandLockup({ variant = "section", showNumber = true }: BrandLockupProps) {
  const isHeader = variant === "header";

  return (
    <div
      className={
        isHeader
          ? "flex items-center gap-2"
          : "mx-auto mb-4 flex w-full max-w-[420px] items-center justify-center gap-5 sm:max-w-none sm:gap-8 md:gap-10"
      }
    >
      <img
        src={isHeader ? "/assets/content/images/cibening_logo.webp" : "/assets/content/images/cibening_logo_blue.webp"}
        alt="Logo Desa Cibening"
        className={isHeader ? "h-9 w-auto object-contain" : "h-10 w-auto select-none sm:h-14 md:h-16"}
        loading={isHeader ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
      {showNumber && (
        <img
          src="/assets/content/images/no.2.png"
          alt="Nomor 2"
          className={isHeader ? "h-8 w-auto object-contain" : "h-16 w-auto select-none sm:h-24 md:h-28"}
          loading={isHeader ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      )}
      <img
        src="/assets/content/images/gaskeun.PNG"
        alt="Gaskeun"
        className={isHeader ? "h-7 w-auto object-contain" : "h-8 w-auto select-none sm:h-11 md:h-12"}
        loading={isHeader ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
