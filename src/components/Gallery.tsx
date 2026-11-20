import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryItem } from '../config/site';
import { MediaSlot } from './MediaSlot';

interface GalleryProps {
  items: GalleryItem[];
  placeholderNote: string;
}

export function Gallery({ items, placeholderNote }: GalleryProps) {
  const suppliedItems = useMemo(
    () => items.filter((item) => Boolean(item.image.src)),
    [items],
  );

  const activeCategories = useMemo(
    () => Array.from(new Set(suppliedItems.map((i) => i.category))),
    [suppliedItems],
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleSupplied = useMemo(() => {
    if (selectedCategory === 'All') return suppliedItems;
    return suppliedItems.filter((item) => item.category === selectedCategory);
  }, [suppliedItems, selectedCategory]);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || visibleSupplied.length === 0) return null;
      return (prev - 1 + visibleSupplied.length) % visibleSupplied.length;
    });
  }, [visibleSupplied.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || visibleSupplied.length === 0) return null;
      return (prev + 1) % visibleSupplied.length;
    });
  }, [visibleSupplied.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      } else if (event.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled])',
        );
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
      triggerRef.current?.focus();
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  if (suppliedItems.length === 0) {
    return (
      <div>
        <p className="text-sm text-[#4A5D50] mb-6 max-w-[60ch]">
          {placeholderNote}
        </p>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => (
            <figure
              key={item.id}
              className="retreat-card break-inside-avoid p-3"
            >
              <MediaSlot asset={item.image} />
              {item.caption && (
                <figcaption className="mt-3 px-2 pb-1 text-sm font-medium text-[#4A5D50]">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    );
  }

  const activeItem =
    lightboxIndex !== null ? visibleSupplied[lightboxIndex] : null;

  return (
    <div>
      {activeCategories.length > 1 && (
        <div
          role="group"
          aria-label="Filter gallery by category"
          className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#FFFFFF]/90 bg-[#FBFDFB]/85 p-1.5 shadow-[var(--shadow-glass)] backdrop-blur-md mb-10"
        >
          {['All', ...activeCategories].map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(null);
                }}
                aria-pressed={isActive}
                className={`min-h-[44px] px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F] ${
                  isActive
                    ? 'bg-[#14341F] text-[#FFFFFF]'
                    : 'bg-transparent text-[#4A5D50] hover:text-[#122318]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {visibleSupplied.map((item, idx) => (
          <figure
            key={item.id}
            className="retreat-card-interactive break-inside-avoid p-3"
          >
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setLightboxIndex(idx);
              }}
              aria-label={`View larger image: ${item.image.alt}`}
              className="block w-full text-left rounded-[24px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14341F]"
            >
              <MediaSlot asset={item.image} />
              {item.caption && (
                <figcaption className="mt-3 px-2 pb-1 text-sm font-medium text-[#4A5D50]">
                  {item.caption}
                </figcaption>
              )}
            </button>
          </figure>
        ))}
      </div>

      {activeItem && lightboxIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.image.alt}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
            const delta = endX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) > 48) {
              if (delta > 0) showPrev();
              else showNext();
            }
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#122318]/80 backdrop-blur-md p-4 sm:p-8 text-[#FFFFFF]"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-[#FFFFFF]/12 px-4 py-1.5 text-xs font-medium tabular-nums text-[#F3F9F4]">
              {lightboxIndex + 1} / {visibleSupplied.length}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-[#FFFFFF]/12 text-[#FFFFFF] hover:bg-[#FFFFFF]/22 transition-colors duration-200 focus-visible:outline-[#FFFFFF]"
            >
              <X size={20} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>

          <div className="relative my-auto flex items-center justify-center gap-4 max-h-[78vh]">
            {visibleSupplied.length > 1 && (
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous image"
                className="hidden sm:inline-flex min-w-[46px] min-h-[46px] items-center justify-center rounded-full bg-[#FFFFFF]/12 text-[#FFFFFF] hover:bg-[#FFFFFF]/22 transition-colors duration-200 focus-visible:outline-[#FFFFFF]"
              >
                <ChevronLeft size={22} strokeWidth={1.6} aria-hidden="true" />
              </button>
            )}

            <div className="max-w-[960px] max-h-[75vh] overflow-hidden rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <img
                src={activeItem.image.src}
                alt={activeItem.image.alt}
                width={activeItem.image.width}
                height={activeItem.image.height}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto block"
              />
            </div>

            {visibleSupplied.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="hidden sm:inline-flex min-w-[46px] min-h-[46px] items-center justify-center rounded-full bg-[#FFFFFF]/12 text-[#FFFFFF] hover:bg-[#FFFFFF]/22 transition-colors duration-200 focus-visible:outline-[#FFFFFF]"
              >
                <ChevronRight size={22} strokeWidth={1.6} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pt-3">
            <p className="text-sm font-medium text-[#F3F9F4]">
              {activeItem.caption ?? activeItem.image.alt}
            </p>
            {visibleSupplied.length > 1 && (
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-[#FFFFFF]/15 text-[#FFFFFF]"
                >
                  <ChevronLeft size={20} strokeWidth={1.6} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-[#FFFFFF]/15 text-[#FFFFFF]"
                >
                  <ChevronRight
                    size={20}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
