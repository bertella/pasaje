interface BrandLogoProps {
  compact?: boolean;
}

export function BrandLogo({compact = false}: BrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-3 select-none">
      <svg
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className={compact ? 'h-8 w-8 shrink-0' : 'h-9 w-9 shrink-0'}
      >
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="5"
          fill="#181B20"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.25"
        />
        <rect x="6" y="17" width="6" height="10" fill="#D5D8DF" />
        <rect x="14" y="9" width="8" height="18" fill="#FFFFFF" />
        <rect x="14" y="6" width="8" height="2" fill="#C2451F" />
        <rect x="24" y="13" width="6" height="14" fill="#D5D8DF" />
        <rect x="6" y="28.5" width="24" height="2" fill="#C2451F" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-[0.12em] text-white ${
            compact ? 'text-sm' : 'text-base sm:text-[17px]'
          }`}
        >
          GMAJ
        </span>
        <span
          className={`mt-1 font-semibold uppercase text-[#E28A6B] ${
            compact
              ? 'text-[8px] tracking-[0.26em]'
              : 'text-[9px] tracking-[0.28em]'
          }`}
        >
          DESARROLLOS
        </span>
      </span>
    </span>
  );
}
