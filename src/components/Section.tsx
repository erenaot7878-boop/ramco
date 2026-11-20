import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  labelledBy?: string;
  surface?: 'white' | 'subtle' | 'dark';
  glow?: boolean;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  labelledBy,
  surface = 'white',
  glow = false,
  className = '',
  children,
}: SectionProps) {
  const showGlow = glow || surface === 'subtle';

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-16 sm:py-24 lg:py-28 scroll-mt-24 overflow-x-clip ${className}`}
    >
      {showGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[min(92vw,860px)] rounded-full blur-[110px] opacity-65"
          style={{ background: 'var(--color-glow-green)' }}
        />
      )}
      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-8">
        {children}
      </div>
    </section>
  );
}
