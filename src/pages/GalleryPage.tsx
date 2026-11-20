import { Gallery } from '../components/Gallery';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { siteConfig } from '../config/site';

export function GalleryPage() {
  const { gallerySection } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={gallerySection.heading}
        lead="Photographs from SAMCO RESIDENCY, guest rooms, the backside viewpoint, and evenings around the campfire."
      />

      <Section id="gallery-grid" surface="white" glow>
        <Gallery
          items={gallerySection.items}
          placeholderNote={gallerySection.placeholderNote}
        />
      </Section>
    </>
  );
}
