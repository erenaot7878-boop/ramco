import { MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '../config/site';

export function MobileActionBar() {
  const primaryPhone = siteConfig.phones[0];
  const whatsappUrl = buildWhatsAppUrl(siteConfig.hero.whatsappPrefill);

  return (
    <div
      aria-label="Quick contact actions"
      className="fixed bottom-3 left-3 right-3 z-30 md:hidden pointer-events-none"
    >
      <div
        className="pointer-events-auto mx-auto grid max-w-[420px] grid-cols-2 gap-2 rounded-full border border-[#FFFFFF]/90 p-1.5 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--color-glass-nav)',
          boxShadow: 'var(--shadow-nav)',
        }}
      >
        <a
          href={`tel:${primaryPhone.e164}`}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#FFFFFF]/80 text-sm font-medium text-[#122318] hover:bg-[#FFFFFF] transition-colors duration-200 whitespace-nowrap"
        >
          <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary-pill inline-flex min-h-[44px] items-center justify-center gap-2 text-sm font-medium whitespace-nowrap"
        >
          <MessageCircle size={15} strokeWidth={1.6} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
