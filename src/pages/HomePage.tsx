import { ArrowRight, Phone } from 'lucide-react';
import { FacilityList } from '../components/FacilityList';
import { HandNote } from '../components/HandNote';
import { Hero } from '../components/Hero';
import { MediaSlot } from '../components/MediaSlot';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { StayCard } from '../components/StayCard';
import { siteConfig } from '../config/site';
import { Link } from '../lib/router';

export function HomePage() {
  const { facilitiesSection, introSection, phones, staySection } = siteConfig;
  const primaryPhone = phones[0];

  // Three representative rooms showcasing each pastel family: Non-AC (Sage), AC (Butter), Family (Sky)
  const featuredRooms = [
    staySection.rooms.find((r) => r.id === 'non-ac-double'),
    staySection.rooms.find((r) => r.id === 'ac-deluxe'),
    staySection.rooms.find((r) => r.id === 'two-bedroom-family-suite'),
  ].filter((room): room is NonNullable<typeof room> => Boolean(room));

  return (
    <>
      <Hero />

      {/* About the stay */}
      <Section id="overview" labelledBy="intro-heading" surface="white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <Reveal className="lg:col-span-5">
            {/* Sparing handwritten annotation #2 */}
            <div className="mb-2">
              <HandNote text="family-run" direction="right" />
            </div>

            <h2
              id="intro-heading"
              className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] text-[#122318] mb-5"
            >
              {introSection.heading}
            </h2>

            <div className="space-y-4 text-[#4A5D50] leading-[1.65] max-w-[50ch] mb-8">
              {introSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Link
              to="/stay"
              className="btn-ghost-pill inline-flex min-h-[48px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
            >
              <span>See rooms and facilities</span>
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delayMs={120} className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-end">
              <div className="sm:col-span-7">
                <div className="retreat-card p-3 relative">
                  <MediaSlot
                    asset={introSection.primaryImage}
                    aspectClass="aspect-[4/5]"
                  />
                  <span className="glass-chip float-drift absolute bottom-6 left-6 px-3.5 py-1.5 text-xs font-medium text-[#122318]">
                    Backside viewpoint
                  </span>
                </div>
              </div>

              <div className="sm:col-span-5 sm:pb-8">
                <div className="retreat-card p-3 relative">
                  <MediaSlot
                    asset={introSection.secondaryImage}
                    aspectClass="aspect-[4/3]"
                  />
                  <span className="glass-chip float-drift-delayed absolute -top-3 right-4 px-3.5 py-1.5 text-xs font-medium text-[#122318]">
                    Free parking
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Featured Pastel Rooms Showcase (fanned on desktop, horizontal snap carousel on mobile) */}
      <Section id="rates-summary" labelledBy="rates-heading" surface="subtle" glow>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-[54ch]">
            <h2
              id="rates-heading"
              className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] text-[#122318] mb-3"
            >
              Rooms from ₹999 per night
            </h2>
            <p className="text-[#4A5D50] leading-[1.65]">
              Six room categories covering Non-AC, AC Deluxe, and a Two-Bedroom
              Family Suite. Extra bed and bedding is available at ₹300 per
              night.
            </p>
          </div>

          <Link
            to="/pricing"
            className="btn-primary-pill inline-flex self-start md:self-auto min-h-[48px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
          >
            <span>View full tariff &amp; estimator</span>
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile: horizontal snap carousel; Desktop: slightly fanned overlapping trio */}
        <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-4 lg:gap-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-6 md:mx-0 md:px-0 md:pb-8">
          {featuredRooms.map((room, index) => {
            const fanPositionClass =
              index === 0
                ? 'lg:-mr-3 lg:translate-y-4 lg:-rotate-[1deg] lg:z-10 lg:hover:z-30'
                : index === 1
                  ? 'lg:z-20 lg:hover:z-30'
                  : 'lg:-ml-3 lg:translate-y-4 lg:rotate-[1deg] lg:z-10 lg:hover:z-30';

            return (
              <div
                key={room.id}
                className={`w-[85vw] max-w-[340px] md:w-auto md:max-w-none shrink-0 snap-center transition-transform duration-300 ${fanPositionClass}`}
              >
                <StayCard room={room} index={index} className="h-full" />
              </div>
            );
          })}
        </div>

        {/* Quiet full-rate glance card */}
        <Reveal className="mt-4">
          <div className="retreat-card p-6 sm:p-8">
            <ul className="divide-y divide-[#14341F]/8">
              {staySection.rooms.map((room) => (
                <li
                  key={room.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex flex-wrap items-baseline justify-between gap-4"
                >
                  <div>
                    <p className="text-base font-medium text-[#122318]">
                      {room.name}
                    </p>
                    <p className="text-xs sm:text-sm text-[#4A5D50]">
                      {room.shortSummary}
                    </p>
                  </div>
                  <p className="text-base font-semibold text-[#122318] tabular-nums whitespace-nowrap">
                    ₹{room.priceNumber.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-[#4A5D50]">
                      / night
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* Facilities & Calm Direct Contact Callout */}
      <Section id="facilities-summary" labelledBy="fac-heading" surface="white">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <h2
            id="fac-heading"
            className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] text-[#122318]"
          >
            {facilitiesSection.heading}
          </h2>
          <Link
            to="/experiences"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[#14341F] underline underline-offset-4 hover:opacity-80 whitespace-nowrap"
          >
            <span>See local experiences &amp; outings</span>
            <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>

        <FacilityList items={facilitiesSection.items} />

        <Reveal className="mt-12">
          <div className="retreat-card pastel-sage p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[#122318] mb-1.5">
                Questions about dates or directions?
              </h3>
              <p className="text-sm sm:text-base text-[#4A5D50]">
                {siteConfig.guestInfo.replyHours}.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="btn-primary-pill inline-flex min-h-[48px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap"
              >
                <span>Contact &amp; Enquiry</span>
              </Link>
              <a
                href={`tel:${primaryPhone.e164}`}
                className="btn-ghost-pill inline-flex min-h-[48px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap tabular-nums"
              >
                <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                <span>Call {primaryPhone.display}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
