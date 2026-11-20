import { Facebook, Instagram, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { Reveal } from '../components/Reveal';
import { buildWhatsAppUrl, siteConfig } from '../config/site';

export function ContactPage() {
  const { channels, contactSection, phones } = siteConfig;

  return (
    <div className="relative pt-28 pb-24 sm:pt-36 overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-[380px] w-[min(92vw,760px)] rounded-full blur-[110px] opacity-70"
        style={{ background: 'var(--color-glow-green)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-8">
        {/*
          Mobile (< lg): flex-col stacks Block A -> Block B (form) -> Block C (map & social)
          Desktop (>= lg): 12-col grid places Block A + Block C in left 5 cols (~40%) and Block B in right 7 cols (~60%)
        */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-8 lg:items-start">
          {/* Block A: Eyebrow, Heading, Subtext, Calm WhatsApp + Tap-to-call Card */}
          <Reveal className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
            <div className="retreat-card p-7 sm:p-9 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#4A5D50]">
                  {contactSection.eyebrow}
                </p>
                <h1 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] text-[#122318]">
                  {contactSection.heading}
                </h1>
                <p className="text-base font-normal text-[#4A5D50] leading-[1.65]">
                  {contactSection.subtext}
                </p>
              </div>

              <div className="space-y-2.5">
                <a
                  href={buildWhatsAppUrl(undefined, 0)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-pill inline-flex w-full min-h-[50px] items-center justify-center gap-2 px-6 py-3 text-base font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
                >
                  <MessageCircle
                    size={18}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span>{contactSection.whatsappLabel}</span>
                </a>
                <p className="text-sm font-normal text-[#4A5D50]">
                  {contactSection.whatsappSubtext}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-1">
                {phones.map((phone) => (
                  <a
                    key={phone.e164}
                    href={`tel:${phone.e164}`}
                    className="btn-ghost-pill inline-flex min-h-[46px] items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
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
              </div>
            </div>
          </Reveal>

          {/* Block B: Enquiry form card (60% desktop right; between phones and map on mobile) */}
          <Reveal
            delayMs={90}
            className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2 lg:self-start"
          >
            <div className="retreat-card p-7 sm:p-9 lg:p-10">
              <ContactForm />
            </div>
          </Reveal>

          {/* Block C: Address, 4:3 Rounded Map Embed, Map link, Social pills, Closing line */}
          <Reveal
            delayMs={150}
            className="lg:col-span-5 lg:col-start-1 lg:row-start-2"
          >
            <div className="retreat-card p-6 sm:p-8 space-y-5">
              <p className="text-base font-medium text-[#122318] leading-[1.6]">
                {contactSection.address}
              </p>

              <div className="aspect-[4/3] w-full overflow-hidden rounded-[24px] pastel-sage">
                <iframe
                  src={channels.googleMapsEmbedUrl}
                  title="Map showing SAMCO RESIDENCY in Munnar, Idukki, Kerala, India"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 block filter saturate-[0.55] contrast-[0.95] brightness-[1.02]"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <a
                  href={channels.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center text-sm font-medium text-[#14341F] underline underline-offset-4 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
                >
                  {contactSection.mapLinkLabel}
                </a>

                <div className="flex flex-wrap items-center gap-2.5">
                  {channels.instagramUrl && (
                    <a
                      href={channels.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-pill inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
                    >
                      <Instagram
                        size={15}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span>Instagram</span>
                    </a>
                  )}
                  {channels.facebookUrl && (
                    <a
                      href={channels.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-pill inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
                    >
                      <Facebook
                        size={15}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm font-normal text-[#4A5D50] leading-[1.6] pt-2 border-t border-[#14341F]/8">
                {contactSection.closingLine}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
