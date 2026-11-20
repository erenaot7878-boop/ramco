import { type MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '../config/site';
import { Link, useRouter } from '../lib/router';

interface NavProps {
  isScrolled?: boolean;
}

const HOME_SCROLLSPY_SECTIONS: ReadonlyArray<{ id: string; href: string }> = [
  { id: 'overview', href: '/stay' },
  { id: 'rates-summary', href: '/pricing' },
  { id: 'facilities-summary', href: '/experiences' },
];

function scrollToTopSmooth() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: 0,
    behavior: prefersReduced ? 'auto' : 'smooth',
  });
}

function scrollToTargetWithOffset(element: HTMLElement) {
  const navOffset = window.innerWidth >= 768 ? 96 : 80;
  const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReduced ? 'auto' : 'smooth',
  });
}

export function Nav({ isScrolled: _isScrolled }: NavProps) {
  const { path } = useRouter();
  const isHome = path === '/';

  const [isHidden, setIsHidden] = useState(false);
  const [spyHref, setSpyHref] = useState<string | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const lastScrollY = useRef(0);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openMenu = useCallback(() => {
    setIsHidden(false);
    setMenuOpen(true);
    setMenuMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMenuVisible(true);
      });
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMenuVisible(false);
  }, []);

  useEffect(() => {
    if (menuOpen || !menuMounted) return;
    const timer = window.setTimeout(() => {
      setMenuMounted(false);
    }, 280);
    return () => window.clearTimeout(timer);
  }, [menuOpen, menuMounted]);

  useEffect(() => {
    setIsHidden(false);
    setSpyHref(null);
    lastScrollY.current = window.scrollY;
  }, [path]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (menuOpen || currentY < 48) {
        setIsHidden(false);
        lastScrollY.current = currentY;
        return;
      }

      const delta = currentY - lastScrollY.current;
      if (delta > 8 && currentY > 100) {
        setIsHidden(true);
      } else if (delta < -6) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) {
      setSpyHref(null);
      return;
    }

    const updateActiveSection = () => {
      if (window.scrollY < 200) {
        setSpyHref(null);
        return;
      }

      const navOffset = window.innerWidth >= 768 ? 112 : 96;
      let matched: string | null = null;

      for (const section of HOME_SCROLLSPY_SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= navOffset + 140 && rect.bottom > navOffset) {
          matched = section.href;
        }
      }

      setSpyHref(matched);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        toggleBtnRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && overlayRef.current) {
        const panelFocusables = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])',
          ),
        );
        const focusables = toggleBtnRef.current
          ? [toggleBtnRef.current, ...panelFocusables]
          : panelFocusables;

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, closeMenu]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (menuOpen) closeMenu();
    if (isHome) {
      event.preventDefault();
      scrollToTopSmooth();
    }
  };

  const handleNavLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (menuOpen) closeMenu();

    if (href.startsWith('#')) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        event.preventDefault();
        scrollToTargetWithOffset(target);
      }
      return;
    }

    if (path === href) {
      event.preventDefault();
      scrollToTopSmooth();
    }
  };

  const whatsappHref = buildWhatsAppUrl(siteConfig.hero.whatsappPrefill);

  return (
    <>
      {/* Floating pill-shaped frosted glass navbar */}
      <header
        onFocusCapture={() => setIsHidden(false)}
        className={`fixed top-3 left-3 right-3 sm:top-4 sm:left-6 sm:right-6 z-50 transition-transform duration-300 ease-out pointer-events-none ${
          isHidden && !menuOpen ? '-translate-y-24' : 'translate-y-0'
        }`}
      >
        <div
          className="pointer-events-auto mx-auto flex h-14 md:h-16 max-w-[1120px] items-center justify-between gap-4 rounded-full border border-[#FFFFFF]/90 px-4 sm:px-6 backdrop-blur-md"
          style={{
            backgroundColor: menuOpen
              ? 'var(--color-card)'
              : 'var(--color-glass-nav)',
            boxShadow: 'var(--shadow-nav)',
          }}
        >
          {/* Refined light wide-tracked uppercase wordmark */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="inline-flex min-h-[44px] items-center text-xs sm:text-[13px] font-normal uppercase tracking-[0.22em] text-[#122318] whitespace-nowrap shrink-0 transition-opacity duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14341F]"
          >
            {siteConfig.brand.name}
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-5 lg:gap-7"
          >
            {siteConfig.navLinks.map((link) => {
              const isActive = isHome
                ? spyHref === link.href
                : path === link.href;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  className={`group relative inline-flex min-h-[44px] items-center text-[13px] font-medium tracking-[0.01em] whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14341F] ${
                    isActive
                      ? 'text-[#14341F]'
                      : 'text-[#4A5D50] hover:text-[#122318]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 right-0 bottom-2.5 h-px bg-[#14341F] origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Single deep green WhatsApp pill (desktop) + 2-line toggle (mobile) */}
          <div className="flex items-center shrink-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-pill hidden md:inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-[13px] font-medium whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
            >
              <MessageCircle size={15} strokeWidth={1.6} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => (menuOpen ? closeMenu() : openMenu())}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-overlay"
              aria-label={
                menuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="md:hidden relative inline-flex min-w-[44px] min-h-[44px] items-center justify-center -mr-1 rounded-full text-[#122318] transition-colors duration-200 hover:bg-[#14341F]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
            >
              <span className="relative flex h-4 w-5 items-center justify-center">
                <span
                  aria-hidden="true"
                  className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-200 ease-out ${
                    menuOpen
                      ? 'translate-y-0 rotate-45'
                      : '-translate-y-[3.5px] rotate-0'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-200 ease-out ${
                    menuOpen
                      ? 'translate-y-0 -rotate-45'
                      : 'translate-y-[3.5px] rotate-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Soft Overlay */}
      {menuMounted && (
        <div className="fixed inset-0 z-40 md:hidden" aria-hidden={!menuOpen}>
          <div
            onClick={closeMenu}
            className={`absolute inset-0 bg-[#122318]/20 backdrop-blur-sm transition-opacity duration-300 ease-out ${
              menuVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            ref={overlayRef}
            id="mobile-navigation-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={`absolute inset-0 flex flex-col justify-between bg-[#F3F9F4]/98 backdrop-blur-md text-[#122318] pt-24 px-6 pb-8 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              menuVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-6 opacity-0'
            }`}
          >
            <nav
              aria-label="Mobile navigation links"
              className="flex-1 flex flex-col justify-center py-4"
            >
              <ul className="space-y-2">
                {[{ label: 'Home', href: '/' }, ...siteConfig.navLinks].map(
                  (link) => {
                    const isActive = path === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          onClick={(e) => handleNavLinkClick(e, link.href)}
                          className={`flex min-h-[52px] items-center rounded-2xl px-4 text-2xl font-display tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F] ${
                            isActive
                              ? 'bg-[#FBFDFB] text-[#14341F] shadow-[0_8px_24px_rgba(20,52,31,0.06)]'
                              : 'text-[#4A5D50] hover:text-[#122318]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  },
                )}
              </ul>
            </nav>

            <div className="pt-6 border-t border-[#14341F]/10">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="btn-primary-pill inline-flex w-full min-h-[50px] items-center justify-center gap-2 px-6 py-3 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
              >
                <MessageCircle size={18} strokeWidth={1.6} aria-hidden="true" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
