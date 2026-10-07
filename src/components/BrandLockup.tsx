type BrandLockupProps = {
  variant?: "header" | "section";
};

export default function BrandLockup({ variant = "section" }: BrandLockupProps) {
  const isHeader = variant === "header";

  return (
    <div
      className={
        isHeader
          ? "flex items-center gap-2"
          : "mb-4 flex w-full items-center justify-center md:justify-start"
      }
    >
      <img
        src={isHeader ? "/assets/content/images/cibening_logo.webp" : "/assets/content/images/cibening_logo_blue.webp"}
        alt="Logo Desa Cibening"
        className={isHeader ? "h-9 w-auto object-contain" : "h-14 w-auto select-none sm:h-16 md:h-20"}
        loading={isHeader ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
