import { ArrowRight } from 'lucide-react';
import { FacilityList } from '../components/FacilityList';
import { HandNote } from '../components/HandNote';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { StayCard, StayFallback } from '../components/StayCard';
import { siteConfig } from '../config/site';
import { Link } from '../lib/router';

export function StayPage() {
  const { facilitiesSection, staySection } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="Stay"
        title="Rooms and facilities"
        lead="Non-AC, AC Deluxe, and Two-Bedroom Family Suite options in Munnar with free parking, Wi-Fi, and a backside viewpoint."
      />

      {/* Rooms */}
      <Section id="rooms" labelledBy="rooms-heading" surface="white">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="max-w-[60ch]">
            <h2
              id="rooms-heading"
              className="text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12] text-[#122318]"
            >
              {staySection.heading}
            </h2>
          </div>

          {/* Sparing handwritten annotation #3 */}
          <HandNote text="from ₹999 a night" direction="left" />
        </div>

        {staySection.rooms.length > 0 ? (
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-4 md:mx-0 md:px-0 md:pb-0">
            {staySection.rooms.map((room, index) => (
              <div
                key={room.id}
                className="w-[86vw] max-w-[350px] md:w-auto md:max-w-none shrink-0 snap-center"
              >
                <StayCard room={room} index={index} className="h-full" />
              </div>
            ))}
          </div>
        ) : (
          <StayFallback />
        )}
      </Section>

      {/* Facilities */}
      <Section
        id="facilities"
        labelledBy="facilities-heading"
        surface="subtle"
        glow
      >
        <div className="max-w-[60ch] mb-10">
          <h2
            id="facilities-heading"
            className="text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12] text-[#122318]"
          >
            {facilitiesSection.heading}
          </h2>
        </div>

        <FacilityList items={facilitiesSection.items} />

        <div className="mt-10 flex flex-wrap items-center gap-3.5">
          <Link
            to="/pricing"
            className="btn-primary-pill inline-flex min-h-[48px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap"
          >
            <span>Compare rates &amp; estimate stay</span>
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Link>

          <Link
            to="/contact"
            className="btn-ghost-pill inline-flex min-h-[48px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap"
          >
            <span>Go to Contact page</span>
          </Link>
        </div>
      </Section>
    </>
  );
}
