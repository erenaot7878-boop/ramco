import { type KeyboardEvent, useState } from 'react';
import {
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  TrainFront,
} from 'lucide-react';
import { HandNote } from '../components/HandNote';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { buildWhatsAppUrl, siteConfig } from '../config/site';

type DirectionTabId = 'aluva' | 'cok';

interface DistanceCardData {
  id: string;
  label: string;
  sublabel: string;
  distance: string;
  duration: string;
  pastelClass: string;
  icon: typeof MapPin;
}

interface TimelineStep {
  title: string;
  detail: string;
}

const DISTANCE_CARDS: ReadonlyArray<DistanceCardData> = [
  {
    id: 'nearest-town',
    label: 'Nearest town',
    sublabel: 'Munnar Town via NH 85',
    distance: 'approx. 20–24 km',
    duration: 'approx. 35–45 min drive',
    pastelClass: 'pastel-sage',
    icon: MapPin,
  },
  {
    id: 'railway-station',
    label: 'Railway station',
    sublabel: 'Aluva Railway Station',
    distance: 'approx. 90–95 km',
    duration: 'approx. 2.5–3 hrs drive',
    pastelClass: 'pastel-butter',
    icon: TrainFront,
  },
  {
    id: 'airport',
    label: 'Airport',
    sublabel: 'Cochin International (COK)',
    distance: 'approx. 85–90 km',
    duration: 'approx. 2.5–3 hrs drive',
    pastelClass: 'pastel-sky',
    icon: Plane,
  },
];

const DIRECTION_TABS: ReadonlyArray<{
  id: DirectionTabId;
  label: string;
  steps: ReadonlyArray<TimelineStep>;
}> = [
  {
    id: 'aluva',
    label: 'From Aluva Railway Station',
    steps: [
      {
        title: 'Perumbavoor & Kothamangalam',
        detail: 'Drive east from Aluva Railway Station toward Kothamangalam.',
      },
      {
        title: 'NH 85 (Kochi–Munnar Highway)',
        detail: 'Join NH 85 heading uphill toward Munnar.',
      },
      {
        title: 'Neriamangalam & Adimali',
        detail: 'Continue through Neriamangalam and Adimali along the highway.',
      },
      {
        title: 'Anaviratty',
        detail: 'Continue uphill past Adimali into Anaviratty.',
      },
      {
        title: 'Anaviratty Brethren Church (final turn)',
        detail: 'Look for Anaviratty Brethren Church near the final turn.',
      },
    ],
  },
  {
    id: 'cok',
    label: 'From Cochin Airport (COK)',
    steps: [
      {
        title: 'Perumbavoor & Kothamangalam',
        detail: 'Head east from the airport toward Perumbavoor and Kothamangalam.',
      },
      {
        title: 'NH 85 (Kochi–Munnar Highway)',
        detail: 'Join NH 85 heading up toward Munnar.',
      },
      {
        title: 'Neriamangalam & Adimali',
        detail: 'Follow the ghat road through Neriamangalam and Adimali.',
      },
      {
        title: 'Anaviratty',
        detail: 'Continue uphill along NH 85 into Anaviratty.',
      },
      {
        title: 'Anaviratty Brethren Church (final turn)',
        detail:
          'Watch for Anaviratty Brethren Church as your landmark near the last turn.',
      },
    ],
  },
];

export function LocationPage() {
  const { brand, channels, locationSection, phones } = siteConfig;
  const primaryPhone = phones[0];
  const whatsappPinUrl = buildWhatsAppUrl(
    'Hello SAMCO RESIDENCY, please share your Google Maps pin and local road guidance.',
  );

  const [activeTab, setActiveTab] = useState<DirectionTabId>('aluva');

  const currentTab =
    DIRECTION_TABS.find((tab) => tab.id === activeTab) ?? DIRECTION_TABS[0];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      setActiveTab((prev) => (prev === 'aluva' ? 'cok' : 'aluva'));
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Location"
        title={locationSection.heading}
        lead={locationSection.description}
      />

      <Section id="map-and-arrival" surface="white" glow>
        <div className="space-y-14 sm:space-y-16">
          {/* 1. Rounded 32px Map Card with muted green map + floating glass chip */}
          <Reveal>
            <div className="retreat-card p-3 sm:p-4">
              <div className="relative overflow-hidden rounded-[24px] pastel-sage">
                {channels.googleMapsEmbedUrl ? (
                  <div className="relative h-[320px] sm:h-[420px] lg:h-[480px] w-full overflow-hidden">
                    <iframe
                      src={channels.googleMapsEmbedUrl}
                      title="Map showing SAMCO RESIDENCY in Anaviratty, Munnar, Kerala"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0 block filter saturate-[0.55] contrast-[0.95] brightness-[1.02] hue-rotate-[-6deg]"
                      allowFullScreen
                    />

                    {/* Custom pulsing deep forest green pin */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                    >
                      <span className="location-pin-pulse absolute h-7 w-7 rounded-full bg-[#14341F]" />
                      <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#FFFFFF] bg-[#14341F] shadow-[0_2px_8px_rgba(20,52,31,0.3)]" />
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[300px] sm:min-h-[360px] flex-col justify-between p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#122318]">
                      <MapPin size={18} strokeWidth={1.6} aria-hidden="true" />
                      <span>{brand.fullAddress}</span>
                    </div>
                    <p className="text-sm text-[#4A5D50] max-w-[48ch] leading-[1.6]">
                      {locationSection.pendingMapNote}
                    </p>
                  </div>
                )}

                {/* Desktop Floating Frosted-Glass Info Card */}
                <div
                  className="hidden md:block absolute top-5 left-5 z-20 w-[290px] rounded-[24px] border border-[#FFFFFF]/90 p-5 backdrop-blur-md"
                  style={{
                    backgroundColor: 'var(--color-glass-nav)',
                    boxShadow: 'var(--shadow-glass)',
                  }}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#4A5D50]">
                    {brand.name}
                  </p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.015em] text-[#122318]">
                    Anaviratty, Munnar
                  </p>
                  <div className="mt-4">
                    <a
                      href={channels.googleMapsUrl || whatsappPinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-pill inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap"
                    >
                      <span>{locationSection.directionsCta}</span>
                      <ExternalLink
                        size={14}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile Info Card below map */}
              <div className="md:hidden mt-3 rounded-[24px] pastel-sage p-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#4A5D50]">
                  {brand.name}
                </p>
                <p className="mt-1 text-lg font-semibold tracking-[-0.015em] text-[#122318]">
                  Anaviratty, Munnar
                </p>
                <div className="mt-4">
                  <a
                    href={channels.googleMapsUrl || whatsappPinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-pill inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap"
                  >
                    <span>{locationSection.directionsCta}</span>
                    <ExternalLink
                      size={14}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2. Three Distance Cards in Matching Pastel Tints */}
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-[#122318] mb-6">
              Distances &amp; travel times
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DISTANCE_CARDS.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Reveal key={card.id} delayMs={index * 70} className="h-full">
                    <article className="retreat-card-interactive h-full p-3">
                      <div
                        className={`${card.pastelClass} rounded-[24px] p-6 h-full flex flex-col justify-between`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#4A5D50]">
                            {card.label}
                          </span>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF]/75 text-[#14341F]">
                            <Icon
                              size={17}
                              strokeWidth={1.6}
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div>
                          <p className="text-2xl sm:text-[26px] font-semibold tracking-[-0.02em] text-[#122318] tabular-nums leading-[1.2]">
                            {card.distance}
                          </p>
                          <p className="mt-1.5 text-sm font-medium text-[#14341F] tabular-nums">
                            {card.duration}
                          </p>
                          <p className="mt-2 text-xs text-[#4A5D50]">
                            {card.sublabel}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* 3. Tabbed Vertical Step Timeline + Calm Call Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <Reveal className="lg:col-span-7">
              <div className="retreat-card p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <h2 className="text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.15] text-[#122318]">
                    Route directions
                  </h2>
                  {/* Sparing handwritten annotation #4 */}
                  <HandNote text="final turn near the church" direction="left" />
                </div>

                <div
                  role="tablist"
                  aria-label="Choose starting point"
                  className="inline-flex flex-wrap gap-2 rounded-full bg-[#F3F9F4] p-1.5 mb-8"
                >
                  {DIRECTION_TABS.map((tab) => {
                    const selected = tab.id === activeTab;
                    return (
                      <button
                        key={tab.id}
                        id={`tab-${tab.id}`}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls={`panel-${tab.id}`}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActiveTab(tab.id)}
                        onKeyDown={handleTabKeyDown}
                        className={`min-h-[44px] rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F] ${
                          selected
                            ? 'bg-[#14341F] text-[#FFFFFF]'
                            : 'text-[#4A5D50] hover:text-[#122318]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  key={currentTab.id}
                  id={`panel-${currentTab.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${currentTab.id}`}
                  className="location-tab-in"
                >
                  <ol className="relative space-y-6 pl-7 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-8 before:w-px before:bg-[#14341F]/15">
                    {currentTab.steps.map((step) => (
                      <li key={step.title} className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute -left-7 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#14341F] bg-[#FBFDFB]"
                        />
                        <p className="text-base font-semibold tracking-[-0.015em] text-[#122318]">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm text-[#4A5D50] leading-[1.6]">
                          {step.detail}
                        </p>
                      </li>
                    ))}

                    <li className="relative pt-1">
                      <span
                        aria-hidden="true"
                        className="absolute -left-7 top-5 h-3.5 w-3.5 rounded-full bg-[#14341F] ring-4 ring-[#E2F1E6]"
                      />
                      <div className="pastel-sage rounded-[24px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold text-[#122318]">
                            Call us as you approach for live guidance
                          </p>
                          <p className="mt-0.5 text-sm text-[#4A5D50]">
                            We&apos;ll guide you right to the property entrance.
                          </p>
                        </div>
                        {primaryPhone && (
                          <a
                            href={`tel:${primaryPhone.e164}`}
                            className="btn-primary-pill inline-flex min-h-[44px] items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap shrink-0 tabular-nums"
                          >
                            <Phone
                              size={15}
                              strokeWidth={1.6}
                              aria-hidden="true"
                            />
                            <span>+91 {primaryPhone.display}</span>
                          </a>
                        )}
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={100} className="lg:col-span-5">
              <aside
                aria-labelledby="road-guidance-heading"
                className="retreat-card p-7 sm:p-9 space-y-6"
              >
                <div>
                  <h2
                    id="road-guidance-heading"
                    className="text-2xl sm:text-[28px] leading-[1.15] text-[#122318]"
                  >
                    Call for local road guidance
                  </h2>
                  <p className="mt-2.5 text-sm sm:text-base text-[#4A5D50] leading-[1.6]">
                    Reach us before starting your hill drive for road updates or
                    a live WhatsApp location pin.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {phones.map((phone) => (
                    <a
                      key={phone.e164}
                      href={`tel:${phone.e164}`}
                      className="btn-ghost-pill inline-flex min-h-[48px] items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap tabular-nums"
                    >
                      <Phone
                        size={15}
                        strokeWidth={1.6}
                        className="text-[#14341F]"
                        aria-hidden="true"
                      />
                      <span>+91 {phone.display}</span>
                    </a>
                  ))}

                  <a
                    href={whatsappPinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-pill inline-flex min-h-[48px] items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap"
                  >
                    <MessageCircle
                      size={16}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
