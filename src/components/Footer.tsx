import { ExternalLink } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '../config/site';
import { Link } from '../lib/router';

export function Footer() {
  const { brand, channels, footer, navLinks, phones } = siteConfig;
  const currentYear = new Date().getFullYear();

  const activeChannels = [
    { label: 'WhatsApp Catalogue', url: channels.whatsappCatalogueUrl },
    { label: 'Instagram', url: channels.instagramUrl },
    { label: 'Facebook', url: channels.facebookUrl },
    { label: 'Google Maps', url: channels.googleMapsUrl },
  ].filter((c) => Boolean(c.url));

  return (
    <footer className="mt-12 border-t border-[#14341F]/8 bg-[#E9F3EC]/65 text-[#4A5D50] pb-24 md:pb-8">
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#14341F]/8">
          {/* Brand & Phones */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-[#122318] mb-2"
            >
              {brand.name}
            </Link>
            <p className="text-sm text-[#4A5D50] mb-5">{footer.locationLine}</p>

            <div className="space-y-2 text-sm">
              {phones.map((phone, idx) => (
                <div key={phone.e164} className="flex items-center gap-4">
                  <a
                    href={`tel:${phone.e164}`}
                    className="inline-flex min-h-[36px] items-center font-medium text-[#122318] hover:text-[#14341F] hover:underline underline-offset-4 tabular-nums"
                  >
                    +91 {phone.display}
                  </a>
                  <a
                    href={buildWhatsAppUrl(siteConfig.hero.whatsappPrefill, idx)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[36px] items-center text-[#4A5D50] hover:text-[#14341F] underline underline-offset-4"
                  >
                    WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#122318] mb-3">
              Pages
            </p>
            <ul className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-sm">
              {[{ label: 'Home', href: '/' }, ...navLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-flex min-h-[36px] items-center text-[#4A5D50] hover:text-[#122318] underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Channels */}
          <div className="md:col-span-3">
            {activeChannels.length > 0 && (
              <>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#122318] mb-3">
                  Channels
                </p>
                <ul className="space-y-1.5 text-sm">
                  {activeChannels.map((channel) => (
                    <li key={channel.label}>
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] items-center gap-1.5 text-[#4A5D50] hover:text-[#122318] underline-offset-4 hover:underline"
                      >
                        <span>{channel.label}</span>
                        <ExternalLink
                          size={13}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#4A5D50]">
          <p>
            &copy; {currentYear} {footer.copyrightHolder}. {footer.locationLine}.
          </p>
          <p>{siteConfig.guestInfo.replyHours}</p>
        </div>
      </div>
    </footer>
  );
}
