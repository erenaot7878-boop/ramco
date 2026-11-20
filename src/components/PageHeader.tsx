interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
}

export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative pt-28 pb-10 sm:pt-36 sm:pb-14 overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-[360px] w-[min(90vw,720px)] rounded-full blur-[110px] opacity-70"
        style={{ background: 'var(--color-glow-green)' }}
      />
      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-8">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#4A5D50] mb-3">
            {eyebrow}
          </p>
        ) : null}
        <h1
          id="page-heading"
          className="text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.08] tracking-[-0.015em] text-[#122318] max-w-[20ch]"
        >
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 max-w-[60ch] text-base sm:text-lg leading-[1.65] text-[#4A5D50]">
            {lead}
          </p>
        ) : null}
      </div>
    </section>
  );
}
