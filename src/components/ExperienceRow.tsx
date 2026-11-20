import { ArrowUpRight } from 'lucide-react';
import { buildWhatsAppUrl, ExperienceConfig } from '../config/site';
import { MediaSlot } from './MediaSlot';
import { Reveal } from './Reveal';

interface ExperienceRowProps {
  experience: ExperienceConfig;
  index: number;
}

const PASTEL_WASHES = ['pastel-sage', 'pastel-butter', 'pastel-sky'] as const;

export function ExperienceRow({ experience, index }: ExperienceRowProps) {
  const whatsappUrl = buildWhatsAppUrl(experience.whatsappMessage);
  const pastelClass = PASTEL_WASHES[index % PASTEL_WASHES.length];

  return (
    <Reveal delayMs={(index % 3) * 70} className="h-full">
      <article className="retreat-card-interactive flex h-full flex-col overflow-hidden p-3">
        <div className={`${pastelClass} rounded-[26px] p-2.5`}>
          <MediaSlot asset={experience.image} aspectClass="aspect-[4/3]" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#122318] mb-2">
              {experience.title}
            </h3>
            <p className="text-sm text-[#4A5D50] leading-[1.65]">
              {experience.description}
            </p>
          </div>

          <div className="mt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-pill inline-flex min-h-[44px] items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
            >
              <span>Enquire on WhatsApp</span>
              <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
