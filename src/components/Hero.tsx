import { type MouseEvent, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Mountain,
  Tag,
  Wifi,
} from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '../config/site';
import { Link } from '../lib/router';
import { HandNote } from './HandNote';

const HERO_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1742286087572-937f08b947b8?auto=format&fit=crop&w=1920&q=82',
  'https://images.unsplash.com/photo-1677125062182-f23d2c231ba4?auto=format&fit=crop&w=1920&q=82',
  'https://images.pexels.com/photos/13691355/pexels-photo-13691355.jpeg',
];

const TRUST_MARKERS = [
  'Family-run',
  'Free parking',
  'Free Wi-Fi',
  'Campfire',
] as const;

export function Hero() {
  const { hero } = siteConfig;
  const whatsappHref = buildWhatsAppUrl(hero.whatsappPrefill);

  const imageCandidates = Array.from(
    new Set([hero.image.src, ...HERO_FALLBACK_IMAGES].filter(Boolean)),
  );
  const [imageIndex, setImageIndex] = useState(0);
  const activeSrc = imageCandidates[imageIndex] ?? '';

  const handleScrollDown = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('overview');
    if (!target) return;
    event.preventDefault();
    const navOffset = window.innerWidth >= 768 ? 96 : 80;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-x-clip pt-24 pb-8 sm:pt-32 lg:pt-36"
      style={{
        background:
          'linear-gradient(180deg, rgba(226, 241, 230, 0.72) 0%, rgba(243, 249, 244, 0.25) 68%, rgba(243, 249, 244, 0) 100%)',
      }}
    >
      {/* Large soft blurred green radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-[6%] h-[460px] w-[min(90vw,640px)] rounded-full blur-[120px] opacity-80"
        style={{ background: 'var(--color-glow-green)' }}
      />

      {/* Main hero grid */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1160px] flex-1 flex-col justify-center px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column: Status fact chip, relaxed serif headline, intro, pill actions */}
          <div className="lg:col-span-6">
            <div
              className="hero-fade-up mb-6 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '0ms' }}
            >
              <span className="glass-chip inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#122318]">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#14341F]"
                />
                <span>Family-run · {hero.eyebrow}</span>
              </span>
            </div>

            <h1
              id="hero-heading"
              className="hero-fade-up text-[clamp(2.75rem,5.4vw,4.75rem)] leading-[1.02] tracking-[-0.02em] text-[#122318] mb-5"
              style={{ animationDelay: '90ms' }}
            >
              Samco Residency, <em className="italic font-medium">Munnar</em>
            </h1>

            <p
              className="hero-fade-up max-w-[48ch] text-base sm:text-[17px] leading-[1.65] text-[#4A5D50] mb-8"
              style={{ animationDelay: '180ms' }}
            >
              {hero.intro}
            </p>

            <div
              className="hero-fade-up flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
              style={{ animationDelay: '270ms' }}
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-pill inline-flex min-h-[50px] items-center justify-center gap-2 px-7 py-3 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
              >
                <MessageCircle size={18} strokeWidth={1.6} aria-hidden="true" />
                <span>{hero.secondaryCtaLabel}</span>
              </a>

              <Link
                to="/pricing"
                className="btn-ghost-pill inline-flex min-h-[50px] items-center justify-center gap-2 px-7 py-3 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
              >
                <span>{hero.primaryCtaLabel}</span>
                <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right column: Rounded retreat image panel + floating frosted-glass chips */}
          <div
            className="hero-fade-up lg:col-span-6 relative"
            style={{ animationDelay: '340ms' }}
          >
            {/* Sparing handwritten annotation #1 */}
            <div className="hidden sm:flex justify-end mb-2 pr-6">
              <HandNote text="quiet backside viewpoint" direction="right" />
            </div>

            <div className="retreat-card p-3 sm:p-4 relative">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden rounded-[24px] pastel-sage">
                {activeSrc ? (
                  <img
                    src={activeSrc}
                    alt={hero.image.alt}
                    width={hero.image.width}
                    height={hero.image.height}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    onError={() => setImageIndex((prev) => prev + 1)}
                    style={{
                      objectPosition: hero.image.focalPoint ?? '50% 45%',
                    }}
                    className="hero-ken-burns h-full w-full object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="h-full w-full pastel-sage"
                  />
                )}

                {/* Gentle bottom soft veil strictly for chip legibility */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#122318]/20 to-transparent"
                />
              </div>

              {/* Floating frosted-glass chips (desktop / tablet overlay) */}
              <div className="hidden sm:block pointer-events-none">
                <div className="float-drift absolute -top-3 -left-3 -rotate-2">
                  <span className="glass-chip inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#122318] tabular-nums">
                    <Tag
                      size={14}
                      strokeWidth={1.6}
                      className="text-[#14341F]"
                      aria-hidden="true"
                    />
                    <span>From ₹999</span>
                  </span>
                </div>

                <div className="float-drift-delayed absolute top-1/2 -right-3 rotate-2">
                  <span className="glass-chip inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#122318]">
                    <Wifi
                      size={14}
                      strokeWidth={1.6}
                      className="text-[#14341F]"
                      aria-hidden="true"
                    />
                    <span>Free Wi-Fi &amp; parking</span>
                  </span>
                </div>

                <div className="float-drift-late absolute -bottom-3 left-8 -rotate-1">
                  <span className="glass-chip inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#122318]">
                    <Mountain
                      size={14}
                      strokeWidth={1.6}
                      className="text-[#14341F]"
                      aria-hidden="true"
                    />
                    <span>Quiet viewpoint</span>
                  </span>
                </div>
              </div>

              {/* Mobile compact glass chips row below photo */}
              <div className="sm:hidden mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#122318] tabular-nums">
                  <Tag size={13} strokeWidth={1.6} aria-hidden="true" />
                  <span>From ₹999</span>
                </span>
                <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#122318]">
                  <Wifi size={13} strokeWidth={1.6} aria-hidden="true" />
                  <span>Free Wi-Fi &amp; parking</span>
                </span>
                <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#122318]">
                  <Mountain size={13} strokeWidth={1.6} aria-hidden="true" />
                  <span>Quiet viewpoint</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip: confirmed trust markers + subtle scroll cue */}
      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-4 pt-10 pb-8 sm:px-8 md:pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-t border-[#14341F]/8 pt-5">
          <ul
            aria-label="Property essentials"
            className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-xs font-medium text-[#4A5D50]"
          >
            {TRUST_MARKERS.map((marker, idx) => (
              <li key={marker} className="inline-flex items-center gap-3">
                {idx > 0 && (
                  <span aria-hidden="true" className="text-[#14341F]/25">
                    ·
                  </span>
                )}
                <span>{marker}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <a
              href="#overview"
              onClick={handleScrollDown}
              aria-label="Scroll to overview section"
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 px-4 text-xs font-medium uppercase tracking-[0.18em] text-[#4A5D50] hover:text-[#122318] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
            >
              <span>Scroll</span>
              <ChevronDown size={14} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>

          <div className="hidden md:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
