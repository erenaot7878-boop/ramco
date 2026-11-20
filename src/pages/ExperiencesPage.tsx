import { ArrowRight } from 'lucide-react';
import { ExperienceRow } from '../components/ExperienceRow';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { siteConfig } from '../config/site';
import { Link } from '../lib/router';

export function ExperiencesPage() {
  const { experiencesSection } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="Experiences"
        title={experiencesSection.heading}
        lead={experiencesSection.intro}
      />

      <Section id="experiences-list" surface="white" glow>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {experiencesSection.items.map((experience, index) => (
            <ExperienceRow
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="retreat-card pastel-sage p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-base text-[#122318] max-w-[52ch] leading-[1.6]">
              Want to combine your stay with local outings? Send your dates on
              our enquiry page.
            </p>
            <Link
              to="/contact"
              className="btn-primary-pill inline-flex min-h-[48px] items-center gap-2 px-6 py-2.5 text-sm font-medium whitespace-nowrap shrink-0"
            >
              <span>Contact &amp; Enquiry</span>
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
