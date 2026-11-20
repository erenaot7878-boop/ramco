import { useState } from 'react';
import {
  BedDouble,
  Car,
  Check,
  DoorOpen,
  Fan,
  MessageCircle,
  Phone,
  Share2,
  Trees,
  Tv,
  Wifi,
  Wind,
} from 'lucide-react';
import { buildWhatsAppUrl, RoomConfig, siteConfig } from '../config/site';
import { MediaSlot } from './MediaSlot';

interface StayCardProps {
  room: RoomConfig;
  index?: number;
  className?: string;
}

export function getRoomPastelClass(rateGroup: RoomConfig['rateGroup']): string {
  if (rateGroup === 'ac') return 'pastel-butter';
  if (rateGroup === 'family') return 'pastel-sky';
  return 'pastel-sage';
}

function getAmenityIcon(facility: string) {
  const lower = facility.toLowerCase();
  const props = {
    size: 13,
    strokeWidth: 1.6,
    className: 'text-[#14341F] shrink-0',
    'aria-hidden': true as const,
  };

  if (lower.includes('air conditioning')) return <Wind {...props} />;
  if (lower.includes('fan')) return <Fan {...props} />;
  if (lower.includes('tv')) return <Tv {...props} />;
  if (lower.includes('wi-fi')) return <Wifi {...props} />;
  if (lower.includes('parking')) return <Car {...props} />;
  if (lower.includes('greenery') || lower.includes('window'))
    return <Trees {...props} />;
  if (lower.includes('bedroom')) return <DoorOpen {...props} />;
  return <BedDouble {...props} />;
}

export function StayCard({ room, className = '' }: StayCardProps) {
  const [shared, setShared] = useState(false);
  const leadImage = room.images[0];
  const pastelClass = getRoomPastelClass(room.rateGroup);
  const whatsappMessage =
    room.whatsappMessage ??
    `Hello SAMCO RESIDENCY, I would like to enquire about ${room.name}.`;

  // Pick up to 4 most distinctive amenity chips to keep cards calm and uncluttered
  const highlightChips = room.facilities.slice(0, 4);

  const handleShare = async () => {
    const shareText = `${room.name} (${room.price ?? `₹${room.priceNumber}/night`}) at ${siteConfig.brand.name}, Munnar`;
    const shareUrl = `${window.location.origin}/pricing`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: room.name,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled native share; ignore silently
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(`${shareText} — ${shareUrl}`);
        setShared(true);
        window.setTimeout(() => setShared(false), 1800);
      } catch {
        // Ignore clipboard denial
      }
    }
  };

  return (
    <article
      className={`retreat-card-interactive flex flex-col overflow-hidden p-3 ${className}`}
    >
      {/* Pastel wash header containing the 24px rounded room photo */}
      <div className={`${pastelClass} relative rounded-[26px] p-2.5`}>
        {leadImage ? (
          <MediaSlot asset={leadImage} aspectClass="aspect-[4/3]" />
        ) : null}

        {/* Corner frosted share button */}
        <button
          type="button"
          onClick={handleShare}
          aria-label={`Share ${room.name}`}
          className="glass-chip absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center text-[#122318] transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
        >
          {shared ? (
            <Check size={16} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Share2 size={16} strokeWidth={1.6} aria-hidden="true" />
          )}
        </button>

        {/* Floating price glass chip */}
        <span className="glass-chip absolute bottom-5 left-5 inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-[#122318] tabular-nums">
          ₹{room.priceNumber.toLocaleString('en-IN')} / night
        </span>
      </div>

      {/* Calm card body with generous padding */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#122318]">
            {room.name}
          </h3>
          <p className="mt-1.5 text-sm leading-[1.6] text-[#4A5D50] line-clamp-2">
            {room.shortSummary}
          </p>

          {/* Compact amenity pills with line icons */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {highlightChips.map((facility) => (
              <li
                key={facility}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F9F4] px-3 py-1 text-xs font-medium text-[#4A5D50]"
              >
                {getAmenityIcon(facility)}
                <span>{facility}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-[#14341F]/8 flex items-center justify-between gap-3">
          <div className="tabular-nums">
            <span className="text-lg font-semibold text-[#122318]">
              ₹{room.priceNumber.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#4A5D50]"> / night</span>
          </div>

          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-pill inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
          >
            <MessageCircle size={15} strokeWidth={1.6} aria-hidden="true" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export function StayFallback() {
  const { staySection, phones } = siteConfig;
  const primaryPhone = phones[0];

  return (
    <div className="retreat-card p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-6">
        <p className="text-xl font-semibold text-[#122318] mb-2">
          {staySection.fallbackBody}
        </p>
        <p className="text-[#4A5D50] leading-[1.65] max-w-[46ch]">
          {staySection.fallbackHint}
        </p>
      </div>

      <div className="lg:col-span-6 flex flex-wrap items-center gap-3">
        <a
          href={buildWhatsAppUrl(
            'Hello SAMCO RESIDENCY, could you please share room details and rates?',
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-pill inline-flex min-h-[46px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap"
        >
          <MessageCircle size={17} strokeWidth={1.6} aria-hidden="true" />
          <span>Message on WhatsApp</span>
        </a>

        <a
          href={`tel:${primaryPhone.e164}`}
          className="btn-ghost-pill inline-flex min-h-[46px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap tabular-nums"
        >
          <Phone size={16} strokeWidth={1.6} aria-hidden="true" />
          <span>Call {primaryPhone.display}</span>
        </a>
      </div>
    </div>
  );
}
