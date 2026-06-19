const ORNAMENTS = [
  {
    src: "/assets/content/images/ornament_1.webp",
    className: "top-[6rem] -right-24 w-80 rotate-[-12deg] lg:top-[7rem] lg:right-[15rem] lg:w-96"
  },
  {
    src: "/assets/content/images/ornament_2.webp",
    className: "top-[27rem] -left-16 w-60 rotate-[18deg]"
  }
];

export default function BackgroundOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {ORNAMENTS.map((ornament, index) => (
        <img
          key={`${ornament.src}-${index}`}
          src={ornament.src}
          alt=""
          className={`absolute select-none opacity-15 ${ornament.className}`}
          draggable={false}
        />
      ))}
    </div>
  );
}
