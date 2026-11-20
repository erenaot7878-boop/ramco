interface HandNoteProps {
  text: string;
  direction?: 'right' | 'left';
  className?: string;
}

export function HandNote({
  text,
  direction = 'right',
  className = '',
}: HandNoteProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-hand text-[21px] leading-none text-[#14341F]/80 select-none ${className}`}
    >
      {direction === 'left' && (
        <svg
          width="26"
          height="16"
          viewBox="0 0 26 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-[#14341F]/65"
        >
          <path
            d="M24 3C17 2 10 5 4 11M4 11L9.5 11.2M4 11L4.8 5.8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span>{text}</span>
      {direction === 'right' && (
        <svg
          width="26"
          height="16"
          viewBox="0 0 26 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-[#14341F]/65"
        >
          <path
            d="M2 3C9 2 16 5 22 11M22 11L16.5 11.2M22 11L21.2 5.8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
