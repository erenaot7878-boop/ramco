/**
 * ============================================================================
 * SAMCO RESIDENCY — SINGLE CONTENT & CONFIGURATION FILE
 * ============================================================================
 * Edit this file to update phone numbers, social/map URLs, rooms, experiences,
 * facilities, gallery photos, or the enquiry form endpoint.
 * No component files need to be modified for routine content updates.
 */

export type FacilityIconName =
  | 'car'
  | 'wifi'
  | 'flame'
  | 'mountain'
  | 'utensils'
  | 'wind';

export interface ImageAsset {
  /** Unique key matching the assets manifest */
  id: string;
  /** Primary image path (e.g. "/images/hero.webp"). Leave "" to show neutral tonal placeholder. */
  src: string;
  /** Optional responsive AVIF srcset (e.g. "/images/hero-800.avif 800w, /images/hero-1600.avif 1600w") */
  avifSrcSet?: string;
  /** Optional responsive WebP srcset (e.g. "/images/hero-800.webp 800w, /images/hero-1600.webp 1600w") */
  webpSrcSet?: string;
  /** Responsive sizes attribute */
  sizes?: string;
  /** Intrinsic width in px (required to prevent Cumulative Layout Shift) */
  width: number;
  /** Intrinsic height in px (required to prevent Cumulative Layout Shift) */
  height: number;
  /** Descriptive alt text for accessibility and SEO */
  alt: string;
  /** CSS object-position value (e.g. "50% 40%") */
  focalPoint?: string;
  /** Placeholder caption shown when src is empty */
  placeholderCaption?: string;
}

export interface RoomConfig {
  id: string;
  name: string;
  category: 'non-ac' | 'ac-family';
  rateGroup: 'non-ac' | 'ac' | 'family';
  description: string;
  shortSummary: string;
  images: ImageAsset[];
  facilities: string[];
  capacity?: string;
  price?: string;
  priceNumber: number;
  // TODO: Clarify whether originalPriceNumber represents a peak season rate or rack rate.
  originalPriceNumber?: number;
  // TODO: Populate peakPriceNumber only if peak season rates differ and peakSeasonDates is set.
  peakPriceNumber?: number;
  whatsappMessage?: string;
}

export interface PricingAddOnConfig {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: 'per_night';
  capacity?: number;
  includes: string[];
}

export interface ExperienceConfig {
  id: string;
  title: string;
  description: string;
  whatsappMessage: string;
  image: ImageAsset;
  /** Editorial layout prominence */
  featured?: boolean;
}

export interface FacilityConfig {
  id: string;
  name: string;
  detail: string;
  icon: FacilityIconName;
}

export interface GalleryItem {
  id: string;
  category: 'Property' | 'Rooms' | 'Viewpoint' | 'Experiences' | 'Campfire';
  image: ImageAsset;
  caption?: string;
}

export interface PhoneEntry {
  display: string;
  e164: string;
  waNumber: string;
  label: string;
}

export interface AssetManifestEntry {
  id: string;
  suggestedFilename: string;
  section: string;
  recommendedSize: string;
  aspectRatio: string;
  focalPoint: string;
  altGuidance: string;
}

export const siteConfig = {
  brand: {
    name: 'SAMCO RESIDENCY',
    locationLabel: 'Munnar, Kerala',
    locality: 'Munnar',
    region: 'Kerala',
    country: 'India',
    tagline: 'Family-run stay in Munnar, Kerala.',
    // TODO: Add full street address and nearby landmark
    streetAddress: '',
    // TODO: Add Munnar PIN code (e.g. "685612")
    pinCode: '',
    // Legacy combined string kept for Location page until streetAddress/pinCode are filled
    fullAddress: 'Anaviratty (near Munnar), Idukki, Kerala, India',
  },

  /**
   * Guest arrival & reply details.
   * Empty strings are hidden on the Contact page until filled in.
   */
  guestInfo: {
    // TODO: Confirm exact check-in time (e.g. "12:00 PM")
    checkInTime: '',
    // TODO: Confirm exact check-out time (e.g. "11:00 AM")
    checkOutTime: '',
    // TODO: Verify actual reply window
    replyHours: 'We usually reply within 1 hour, 8am to 9pm',
    // TODO: Add booking email address if available (leave "" to hide)
    email: '',
  },

  /**
   * Confirmed phone numbers.
   * First entry is treated as the primary WhatsApp & call destination.
   */
  phones: [
    {
      display: '70121 85757',
      e164: '+917012185757',
      waNumber: '917012185757',
      label: 'Primary phone & WhatsApp',
    },
    {
      display: '97782 05757',
      e164: '+919778205757',
      waNumber: '919778205757',
      label: 'Secondary phone & WhatsApp',
    },
  ] as PhoneEntry[],

  /**
   * External channel URLs.
   * Leave as "" until confirmed — empty URLs are automatically hidden from the UI
   * so visitors never encounter dead links or "#" placeholders.
   */
  channels: {
    whatsappCatalogueUrl: '', // Example: 'https://wa.me/c/917012185757'
    instagramUrl: 'https://www.instagram.com/samcoroom',
    facebookUrl: 'https://www.facebook.com/share/1CUNwf5HA8/',
    googleMapsUrl: 'https://www.google.com/maps?q=10.0169899,76.995527',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=10.0169899,76.995527&output=embed',
  },

  /**
   * Optional enquiry form endpoint (e.g. Formspree, Web3Forms, or serverless function).
   * Leave "" to rely solely on WhatsApp pre-filled submission + inline confirmation.
   */
  form: {
    endpointUrl: '',
    honeypotFieldName: 'website_url',
  },

  navLinks: [
    { label: 'Stay', href: '/stay' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Location', href: '/location' },
    { label: 'Contact', href: '/contact' },
  ],

  pageMeta: {
    '/': {
      title: 'SAMCO RESIDENCY — Munnar, Kerala',
      description:
        'Family-run lodging in Munnar, Kerala. Non-AC, AC, and two-bedroom rooms from ₹999 per night with free parking, Wi-Fi, and campfire evenings.',
    },
    '/stay': {
      title: 'Stay & Facilities — SAMCO RESIDENCY, Munnar',
      description:
        'Non-AC, AC Deluxe, and Two-Bedroom Family Suite rooms with free parking, free Wi-Fi, campfire, backside viewpoint, and food delivery in Munnar.',
    },
    '/pricing': {
      title: 'Room Rates & Pricing — SAMCO RESIDENCY, Munnar',
      description:
        'Per-night room tariffs in INR starting from ₹999, extra bed add-on at ₹300/night, and instant WhatsApp stay estimate for SAMCO RESIDENCY Munnar.',
    },
    '/experiences': {
      title: 'Experiences — SAMCO RESIDENCY, Munnar',
      description:
        'Off-road jeep safari, biking, elephant sightseeing, spice plantation visits, tour packages, campfire with music, and local road guidance in Munnar.',
    },
    '/gallery': {
      title: 'Gallery — SAMCO RESIDENCY, Munnar',
      description:
        'Photographs of SAMCO RESIDENCY, guest rooms, the backside viewpoint, campfire area, and surroundings in Munnar, Kerala.',
    },
    '/location': {
      title: 'Location & Directions — SAMCO RESIDENCY, Munnar',
      description:
        'Find SAMCO RESIDENCY in Munnar, Kerala. Free on-site parking and direct local road guidance from the hosts.',
    },
    '/contact': {
      title: 'Contact & Booking Enquiry — SAMCO RESIDENCY, Munnar',
      description:
        'Call +91 70121 85757 or +91 97782 05757, or message SAMCO RESIDENCY on WhatsApp to enquire about rooms in Munnar, Kerala.',
    },
  } as Record<string, { title: string; description: string }>,

  hero: {
    eyebrow: 'Munnar, Kerala',
    headline: 'Samco Residency, Munnar',
    intro:
      'Family-run lodging in Munnar with Non-AC, AC, and two-bedroom rooms from ₹999 per night, free parking, Wi-Fi, and a quiet backside viewpoint.',
    primaryCtaLabel: 'See rooms & rates',
    secondaryCtaLabel: 'Message on WhatsApp',
    whatsappPrefill:
      'Hello SAMCO RESIDENCY, I would like to enquire about rooms in Munnar.',
    image: {
      id: 'hero-main',
      src: 'https://images.unsplash.com/photo-1742286087572-937f08b947b8?auto=format&fit=crop&w=1920&q=82',
      avifSrcSet: '',
      webpSrcSet: '',
      sizes: '100vw',
      width: 1920,
      height: 1080,
      alt: 'Misty tea gardens and rolling hills of Munnar, Kerala',
      focalPoint: '50% 45%',
      placeholderCaption: 'SAMCO RESIDENCY, Munnar',
    } as ImageAsset,
  },

  introSection: {
    eyebrow: 'About the stay',
    heading: 'Plain comfort and local help when you need it.',
    paragraphs: [
      'SAMCO RESIDENCY is a small, family-run stay in Munnar, Kerala. Guests stay here for clean rooms, free parking, and direct help with local travel plans.',
      'Behind the property is a quiet hillside viewpoint. In the evening, we set up a campfire on request, and local food delivery is available to your room.',
      'Reach us directly by phone or WhatsApp before your drive for road updates and directions.',
    ],
    primaryImage: {
      id: 'intro-viewpoint',
      src: 'https://images.pexels.com/photos/13691355/pexels-photo-13691355.jpeg',
      width: 960,
      height: 1200,
      sizes: '(min-width: 1024px) 38vw, 92vw',
      alt: 'View from the backside viewpoint behind SAMCO RESIDENCY in Munnar',
      focalPoint: '50% 50%',
      placeholderCaption: 'Backside viewpoint',
    } as ImageAsset,
    secondaryImage: {
      id: 'intro-courtyard',
      src: 'https://images.pexels.com/photos/14844302/pexels-photo-14844302.jpeg',
      width: 960,
      height: 720,
      sizes: '(min-width: 1024px) 28vw, 92vw',
      alt: 'Parking area and entrance at SAMCO RESIDENCY',
      focalPoint: '50% 50%',
      placeholderCaption: 'Property entrance and parking',
    } as ImageAsset,
  },

  staySection: {
    eyebrow: 'ACCOMMODATION',
    heading: 'Rooms and stay options.',
    fallbackTitle: 'Room details and rates on request.',
    fallbackBody:
      'Room details and rates on request. Message us on WhatsApp.',
    fallbackHint:
      'Share your preferred dates and group size on WhatsApp or call us directly for current room options.',
    rooms: [
      {
        id: 'non-ac-double',
        name: 'Non-AC Double Bed Room',
        category: 'non-ac',
        rateGroup: 'non-ac',
        // TODO: Add confirmed guest capacity (e.g. "Sleeps 2") once verified by owner.
        description:
          'Non-AC room with spacious windows, seating area, attached bathroom, ceiling fan, free Wi-Fi, and parking.',
        shortSummary:
          'Double bed, spacious windows, seating area, ceiling fan.',
        price: '₹999 / night',
        priceNumber: 999,
        originalPriceNumber: 1200,
        facilities: [
          'Ceiling Fan',
          'Spacious Windows',
          'Seating Area',
          'Attached Bathroom',
          'Free Wi-Fi',
          'Parking',
        ],
        images: [
          {
            id: 'room-non-ac-double',
            src: 'https://github.com/erenaot7878-boop/samco-files/blob/main/WhatsApp%20Image%202026-11-19%20at%2012.09.02%20AM.jpeg?raw=true',
            width: 1200,
            height: 900,
            sizes: '(min-width: 1024px) 48vw, 92vw',
            alt: 'Non-AC Double Bed Room at SAMCO RESIDENCY in Munnar',
            placeholderCaption: 'Non-AC Double Bed Room',
          },
        ],
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like to enquire about the Non-AC Double Bed Room (₹999/night).',
      },
      {
        id: 'non-ac-standard',
        name: 'Non-AC Standard Room',
        category: 'non-ac',
        rateGroup: 'non-ac',
        // TODO: Add confirmed guest capacity (e.g. "Sleeps 2") once verified by owner.
        description:
          'Standard room with a double bed, ceiling fan, TV, attached bathroom, free Wi-Fi, and parking.',
        shortSummary: 'Double bed, TV, ceiling fan.',
        price: '₹1,500 / night',
        priceNumber: 1500,
        originalPriceNumber: 1800,
        facilities: [
          'Double Bed',
          'Ceiling Fan',
          'TV',
          'Attached Bathroom',
          'Free Wi-Fi',
          'Parking',
        ],
        images: [
          {
            id: 'room-non-ac-standard',
            src: 'https://github.com/erenaot7878-boop/samco-files/blob/main/WhatsApp%20Image%202026-11-19%20at%2012.09.02%20AM.jpeg?raw=true',
            width: 1200,
            height: 900,
            sizes: '(min-width: 1024px) 48vw, 92vw',
            alt: 'Non-AC Standard Room at SAMCO RESIDENCY in Munnar',
            placeholderCaption: 'Non-AC Standard Room',
          },
        ],
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like to enquire about the Non-AC Standard Room (₹1,500/night).',
      },
      {
        id: 'non-ac-deluxe',
        name: 'Non-AC Deluxe Room',
        category: 'non-ac',
        rateGroup: 'non-ac',
        // TODO: Add confirmed guest capacity (e.g. "Sleeps 2") once verified by owner.
        description:
          'Deluxe Non-AC room with greenery view, double bed, spacious windows, seating area, attached bathroom, free Wi-Fi, and parking.',
        shortSummary:
          'Double bed, greenery view, spacious windows, seating area, ceiling fan.',
        price: '₹2,000 / night',
        priceNumber: 2000,
        originalPriceNumber: 2500,
        facilities: [
          'Greenery View',
          'Double Bed',
          'Ceiling Fan',
          'Spacious Windows',
          'Seating Area',
          'Attached Bathroom',
          'Free Wi-Fi',
          'Parking',
        ],
        images: [
          {
            id: 'room-non-ac-deluxe',
            src: 'https://github.com/erenaot7878-boop/samco-files/blob/main/WhatsApp%20Image%202026-11-19%20at%2012.09.02%20AM.jpeg?raw=true',
            width: 1200,
            height: 900,
            sizes: '(min-width: 1024px) 48vw, 92vw',
            alt: 'Non-AC Deluxe Room with greenery view at SAMCO RESIDENCY',
            placeholderCaption: 'Non-AC Deluxe Room',
          },
        ],
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like to enquire about the Non-AC Deluxe Room (₹2,000/night).',
      },
      {
        id: 'ac-deluxe',
        name: 'AC Deluxe Room',
        category: 'ac-family',
        rateGroup: 'ac',
        // TODO: Add confirmed guest capacity (e.g. "Sleeps 2") once verified by owner.
        description:
          'Air-conditioned room with a double bed, TV, attached bathroom, free Wi-Fi, and parking.',
        shortSummary: 'Double bed, air conditioning, TV.',
        price: '₹3,000 / night',
        priceNumber: 3000,
        originalPriceNumber: 3500,
        facilities: [
          'Air Conditioning',
          'Double Bed',
          'TV',
          'Attached Bathroom',
          'Free Wi-Fi',
          'Parking',
        ],
        images: [
          {
            id: 'room-ac-deluxe',
            src: 'https://github.com/erenaot7878-boop/samco-files/blob/main/WhatsApp%20Image%202026-11-19%20at%2012.09.02%20AM.jpeg?raw=true',
            width: 1200,
            height: 900,
            sizes: '(min-width: 1024px) 48vw, 92vw',
            alt: 'AC Deluxe Room at SAMCO RESIDENCY in Munnar',
            placeholderCaption: 'AC Deluxe Room',
          },
        ],
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like to enquire about the AC Deluxe Room (₹3,000/night).',
      },
      {
        id: 'two-bedroom-family-suite',
        name: 'Two-Bedroom Family Suite',
        category: 'ac-family',
        rateGroup: 'family',
        // TODO: Add bed types inside the two bedrooms and confirmed guest capacity.
        description:
          'Family suite with two separate bedrooms, attached bathroom, ceiling fan, TV, free Wi-Fi, and parking.',
        shortSummary: 'Two separate bedrooms, TV, ceiling fan.',
        price: '₹3,000 / night',
        priceNumber: 3000,
        originalPriceNumber: 3500,
        facilities: [
          'Two Separate Bedrooms',
          'Attached Bathroom',
          'Ceiling Fan',
          'TV',
          'Free Wi-Fi',
          'Parking',
        ],
        images: [
          {
            id: 'room-family-suite',
            src: 'https://github.com/erenaot7878-boop/samco-files/blob/main/WhatsApp%20Image%202026-11-19%20at%2012.09.02%20AM.jpeg?raw=true',
            width: 1200,
            height: 900,
            sizes: '(min-width: 1024px) 48vw, 92vw',
            alt: 'Two-Bedroom Family Suite at SAMCO RESIDENCY in Munnar',
            placeholderCaption: 'Two-Bedroom Family Suite',
          },
        ],
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like to enquire about the Two-Bedroom Family Suite (₹3,000/night).',
      },
      {
        id: 'non-ac-twin-bed',
        name: 'Non-AC Twin Bed Room',
        category: 'non-ac',
        rateGroup: 'non-ac',
        // TODO: Confirm guest capacity and double-check ₹4,000 rate (currently higher than AC Deluxe ₹3,000).
        description:
          'Room with two separate single beds, ceiling fan, TV, attached bathroom, free Wi-Fi, and parking.',
        shortSummary: 'Two separate single beds, TV, ceiling fan.',
        price: '₹4,000 / night',
        priceNumber: 4000,
        originalPriceNumber: 4500,
        facilities: [
          'Two Separate Single Beds',
          'Ceiling Fan',
          'TV',
          'Attached Bathroom',
          'Free Wi-Fi',
          'Parking',
        ],
        images: [
          {
            id: 'room-twin-bed',
            src: 'https://github.com/erenaot7878-boop/samco-files/blob/main/WhatsApp%20Image%202026-11-19%20at%2012.09.02%20AM.jpeg?raw=true',
            width: 1200,
            height: 900,
            sizes: '(min-width: 1024px) 48vw, 92vw',
            alt: 'Non-AC Twin Bed Room at SAMCO RESIDENCY in Munnar',
            placeholderCaption: 'Non-AC Twin Bed Room',
          },
        ],
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like to enquire about the Non-AC Twin Bed Room (₹4,000/night).',
      },
    ] as RoomConfig[],
  },

  pricingSection: {
    heading: 'Room rates',
    lead: 'All rates are per room, per night, and include the standard room stay.',
    includedEveryRoom:
      'Every room has an attached bathroom, free Wi-Fi and free parking.',
    currency: 'INR',
    pricingUnit: 'per_night',
    // TODO: Confirm extra person charge without an extra bed (currently only ₹300 Extra Bed & Bedding is confirmed).
    extraPersonNote: '',
    // TODO: Confirm child policy (e.g. age up to which children stay free without extra bed).
    childPolicy: '',
    // TODO: Confirm whether GST/taxes are included in the room rate or charged extra.
    taxNote: '',
    // TODO: Confirm peak season dates if seasonal rates apply.
    peakSeasonDates: '',
    addOns: [
      {
        id: 'extra-bed',
        name: 'Extra Bed & Bedding',
        price: 300,
        originalPrice: 500,
        unit: 'per_night',
        capacity: 1,
        includes: ['1 Extra Bed', '1 Extra Pillow', '1 Extra Blanket'],
      },
    ] as PricingAddOnConfig[],
  },

  experiencesSection: {
    eyebrow: 'EXPERIENCES',
    heading: 'Out and about from the stay.',
    intro:
      'Speak with us at the property or message on WhatsApp to coordinate local outings and evening campfires.',
    items: [
      {
        id: 'off-road-jeep-safari',
        title: 'Off-road jeep safari',
        description:
          'Local jeep routes across hillside tracks and high ridges arranged on request.',
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like details about the off-road jeep safari.',
        featured: true,
        image: {
          id: 'exp-jeep',
          src: 'https://images.pexels.com/photos/15585651/pexels-photo-15585651.jpeg',
          width: 1200,
          height: 800,
          sizes: '(min-width: 1024px) 48vw, 92vw',
          alt: 'Off-road jeep safari track in the hills around Munnar',
          focalPoint: '50% 50%',
          placeholderCaption: 'Off-road jeep safari',
        },
      },
      {
        id: 'biking',
        title: 'Biking',
        description:
          'Ride along Munnar hill roads and quiet estate stretches at your own pace.',
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like details about biking routes and rentals.',
        image: {
          id: 'exp-biking',
          src: 'https://images.pexels.com/photos/20027515/pexels-photo-20027515.jpeg',
          width: 900,
          height: 1125,
          sizes: '(min-width: 1024px) 34vw, 92vw',
          alt: 'Hill road biking route near Munnar',
          focalPoint: '50% 50%',
          placeholderCaption: 'Biking',
        },
      },
      {
        id: 'elephant-sightseeing',
        title: 'Elephant sightseeing',
        description:
          'Visits to designated sightseeing points in the Munnar region where elephants can be observed.',
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like details about elephant sightseeing spots.',
        image: {
          id: 'exp-elephant',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYi-WU7ApJ5IW9SGD9B3kZu6MgLFZ_cO4tpO1CuJa65l5bsq4gXB_luy6&s=10',
          width: 1000,
          height: 750,
          sizes: '(min-width: 1024px) 34vw, 92vw',
          alt: 'Designated elephant sightseeing area in Munnar',
          focalPoint: '50% 50%',
          placeholderCaption: 'Elephant sightseeing',
        },
      },
      {
        id: 'spice-plantation-visits',
        title: 'Spice plantation visits',
        description:
          'Guided walks through nearby plantations growing cardamom, pepper, and regional spices.',
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like details about spice plantation visits.',
        image: {
          id: 'exp-spice',
          src: 'https://images.pexels.com/photos/7299699/pexels-photo-7299699.jpeg',
          width: 1000,
          height: 750,
          sizes: '(min-width: 1024px) 34vw, 92vw',
          alt: 'Spice plantation plants and foliage near Munnar',
          focalPoint: '50% 50%',
          placeholderCaption: 'Spice plantation visits',
        },
      },
      {
        id: 'tour-packages',
        title: 'Tour packages',
        description:
          'Practical local itineraries tailored to your dates, transport, and sightseeing preferences.',
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like details about local tour packages.',
        image: {
          id: 'exp-tours',
          src: 'https://images.pexels.com/photos/3337152/pexels-photo-3337152.jpeg',
          width: 1000,
          height: 750,
          sizes: '(min-width: 1024px) 34vw, 92vw',
          alt: 'Munnar sightseeing route and valley landscape',
          focalPoint: '50% 50%',
          placeholderCaption: 'Tour packages',
        },
      },
      {
        id: 'campfire-with-music',
        title: 'Campfire with music',
        description:
          'Evening campfires at the stay with music arranged for your group.',
        whatsappMessage:
          'Hello SAMCO RESIDENCY, I would like to enquire about campfire with music.',
        featured: true,
        image: {
          id: 'exp-campfire',
          src: 'https://images.pexels.com/photos/33411954/pexels-photo-33411954.jpeg',
          width: 1200,
          height: 800,
          sizes: '(min-width: 1024px) 48vw, 92vw',
          alt: 'Evening campfire area at SAMCO RESIDENCY',
          focalPoint: '50% 50%',
          placeholderCaption: 'Campfire with music',
        },
      },
      {
        id: 'local-road-guidance',
        title: 'Local road guidance',
        description:
          'Direct route advice, road condition updates, and local driving tips from the hosts.',
        whatsappMessage:
          'Hello SAMCO RESIDENCY, could you share local road guidance for reaching the stay?',
        image: {
          id: 'exp-roads',
          src: 'https://i.pinimg.com/736x/71/a0/67/71a067d91017cba75f1a511399e4d291.jpg',
          width: 900,
          height: 1125,
          sizes: '(min-width: 1024px) 34vw, 92vw',
          alt: 'Winding hillside road in Munnar, Kerala',
          focalPoint: '50% 50%',
          placeholderCaption: 'Local road guidance',
        },
      },
    ] as ExperienceConfig[],
  },

  facilitiesSection: {
    eyebrow: 'FACILITIES',
    heading: 'Practical comforts on site.',
    items: [
      {
        id: 'free-parking',
        name: 'Free parking',
        detail: 'Dedicated on-site vehicle parking included with your stay.',
        icon: 'car',
      },
      {
        id: 'free-wifi',
        name: 'Free Wi-Fi',
        detail: 'Wireless internet access available at no additional cost.',
        icon: 'wifi',
      },
      {
        id: 'campfire',
        name: 'Campfire',
        detail: 'Evening campfire space on the grounds.',
        icon: 'flame',
      },
      {
        id: 'backside-viewpoint',
        name: 'Backside viewpoint',
        detail: 'Open hillside viewpoint directly behind the property.',
        icon: 'mountain',
      },
      {
        id: 'food-delivery',
        name: 'Food delivery available',
        detail: 'Meals can be delivered directly to the property.',
        icon: 'utensils',
      },
      {
        id: 'air-conditioning',
        name: 'Air conditioning',
        detail: 'Air-conditioned rooms for warm afternoons.',
        icon: 'wind',
      },
    ] as FacilityConfig[],
  },

  gallerySection: {
    eyebrow: 'GALLERY',
    heading: 'Around SAMCO RESIDENCY.',
    placeholderNote:
      'Photographs of SAMCO RESIDENCY and surroundings in Munnar.',
    /**
     * OWNER: Replace or expand with real Property & Rooms photos when available.
     * Categories are shown as filter buttons automatically for categories that have at least one image with a `src`.
     */
    items: [
      {
        id: 'gal-1',
        category: 'Experiences',
        caption: 'Off-road jeep safari',
        image: {
          id: 'gal-exp-jeep',
          src: 'https://images.pexels.com/photos/15585651/pexels-photo-15585651.jpeg',
          width: 1200,
          height: 800,
          sizes: '(min-width: 1024px) 32vw, 92vw',
          alt: 'Off-road jeep safari track in the hills around Munnar',
        },
      },
      {
        id: 'gal-2',
        category: 'Campfire',
        caption: 'Campfire with music',
        image: {
          id: 'gal-campfire-1',
          src: 'https://images.pexels.com/photos/33411954/pexels-photo-33411954.jpeg',
          width: 1200,
          height: 1500,
          sizes: '(min-width: 1024px) 32vw, 92vw',
          alt: 'Evening campfire setup at SAMCO RESIDENCY',
        },
      },
      {
        id: 'gal-3',
        category: 'Experiences',
        caption: 'Biking',
        image: {
          id: 'gal-exp-biking',
          src: 'https://images.pexels.com/photos/20027515/pexels-photo-20027515.jpeg',
          width: 900,
          height: 1125,
          sizes: '(min-width: 1024px) 32vw, 92vw',
          alt: 'Hill road biking route near Munnar',
        },
      },
      {
        id: 'gal-4',
        category: 'Experiences',
        caption: 'Spice plantation visits',
        image: {
          id: 'gal-exp-spice',
          src: 'https://images.pexels.com/photos/7299699/pexels-photo-7299699.jpeg',
          width: 1200,
          height: 900,
          sizes: '(min-width: 1024px) 32vw, 92vw',
          alt: 'Spice plantation plants and foliage near Munnar',
        },
      },
      {
        id: 'gal-5',
        category: 'Viewpoint',
        caption: 'Tour packages',
        image: {
          id: 'gal-exp-tours',
          src: 'https://images.pexels.com/photos/3337152/pexels-photo-3337152.jpeg',
          width: 1200,
          height: 900,
          sizes: '(min-width: 1024px) 32vw, 92vw',
          alt: 'Munnar sightseeing route and valley landscape',
        },
      },
      {
        id: 'gal-6',
        category: 'Experiences',
        caption: 'Elephant sightseeing',
        image: {
          id: 'gal-exp-elephant',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYi-WU7ApJ5IW9SGD9B3kZu6MgLFZ_cO4tpO1CuJa65l5bsq4gXB_luy6&s=10',
          width: 1200,
          height: 900,
          sizes: '(min-width: 1024px) 32vw, 92vw',
          alt: 'Designated elephant sightseeing area in Munnar',
        },
      },
      {
        id: 'gal-7',
        category: 'Viewpoint',
        caption: 'Local road guidance',
        image: {
          id: 'gal-exp-roads',
          src: 'https://i.pinimg.com/736x/71/a0/67/71a067d91017cba75f1a511399e4d291.jpg',
          width: 900,
          height: 1125,
          sizes: '(min-width: 1024px) 32vw, 92vw',
          alt: 'Winding hillside road in Munnar, Kerala',
        },
      },
    ] as GalleryItem[],
  },

  locationSection: {
    eyebrow: 'Location',
    heading: 'Reaching Samco Residency in Munnar',
    description:
      'Located at Anaviratty near Munnar, Kerala, with free on-site parking. Call or message us on WhatsApp before starting your hill drive for road updates.',
    directionsCta: 'Get directions',
    pendingMapNote:
      'Map preview unavailable. Use the directions link or message us on WhatsApp for our live location.',
    travelDistances: [
      {
        label: 'Nearest town',
        value:
          'Anaviratty — approx. 20–24 km (approx. 35–45 min drive) from Munnar Town along NH 85',
      },
      {
        label: 'Nearest railway station',
        value:
          'Aluva Railway Station — approx. 90–95 km (approx. 2.5–3 hrs drive)',
      },
      {
        label: 'Nearest airport',
        value:
          'Cochin International Airport (COK) — approx. 85–90 km (approx. 2.5–3 hrs drive)',
      },
    ],
    routeDirections: [
      {
        from: 'From Aluva Railway Station',
        steps:
          'Drive via Perumbavoor and Kothamangalam to join NH 85 (Kochi–Munnar Highway) through Neriamangalam and Adimali toward Munnar. Continue uphill to Anaviratty and look for Anaviratty Brethren Church near the final turn; call us as you approach for live guidance.',
      },
      {
        from: 'From Cochin International Airport (COK)',
        steps:
          'Head east toward Perumbavoor and Kothamangalam to join NH 85 (Kochi–Munnar Highway), then follow the ghat road through Neriamangalam and Adimali to Anaviratty. Watch for Anaviratty Brethren Church as your landmark near the last turn, or call us for live guidance.',
      },
    ],
  },

  contactSection: {
    eyebrow: 'Contact',
    heading: 'Plan your stay in Munnar',
    subtext:
      "Tell us your dates and we'll reply the same day. Questions about rooms, facilities or local experiences are welcome.",
    address: 'SAMCO RESIDENCY, Munnar, Idukki, Kerala, India',
    whatsappLabel: 'Message on WhatsApp',
    whatsappSubtext: 'View our room catalogue and ask about availability.',
    mapLinkLabel: 'Open in Google Maps',
    closingLine: 'We look forward to welcoming you to Samco Residency.',
    formNotice: 'This opens WhatsApp with your details filled in.',
  },

  footer: {
    copyrightHolder: 'SAMCO RESIDENCY',
    locationLine: 'Munnar, Kerala, India',
  },
};

/**
 * Helper to generate a clean WhatsApp wa.me link using the primary WhatsApp number.
 */
export function buildWhatsAppUrl(message?: string, phoneIndex = 0): string {
  const phone = siteConfig.phones[phoneIndex] ?? siteConfig.phones[0];
  const base = `https://wa.me/${phone.waNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Assets Manifest for the owner / content editor.
 * Documents recommended export filenames, dimensions, focal points, and alt text guidance.
 */
export const assetsManifest: AssetManifestEntry[] = [
  {
    id: 'hero-main',
    suggestedFilename: 'hero-samco-residency.webp / .avif',
    section: 'Hero',
    recommendedSize: '1920 × 1080 (landscape)',
    aspectRatio: '16:9',
    focalPoint: '50% 45%',
    altGuidance: 'Wide exterior photograph of SAMCO RESIDENCY with Munnar hills in the background.',
  },
  {
    id: 'intro-viewpoint',
    suggestedFilename: 'intro-backside-viewpoint.webp',
    section: 'Introduction (Left tall image)',
    recommendedSize: '960 × 1200 (portrait)',
    aspectRatio: '4:5',
    focalPoint: '50% 50%',
    altGuidance: 'Morning light viewed from the backside viewpoint behind SAMCO RESIDENCY.',
  },
  {
    id: 'intro-courtyard',
    suggestedFilename: 'intro-property-entrance.webp',
    section: 'Introduction (Right secondary image)',
    recommendedSize: '960 × 720 (landscape)',
    aspectRatio: '4:3',
    focalPoint: '50% 50%',
    altGuidance: 'Approach road, entrance, or seating area at SAMCO RESIDENCY.',
  },
  {
    id: 'room-photos',
    suggestedFilename: 'room-<room-slug>-01.webp',
    section: 'Stay (Alternating room rows)',
    recommendedSize: '1200 × 900 (landscape)',
    aspectRatio: '4:3',
    focalPoint: '50% 50%',
    altGuidance: 'Natural-light interior shot showing bed, windows, and air-conditioning unit.',
  },
  {
    id: 'exp-jeep',
    suggestedFilename: 'exp-off-road-jeep.webp',
    section: 'Experiences — Off-road jeep safari',
    recommendedSize: '1200 × 800 (landscape)',
    aspectRatio: '3:2',
    focalPoint: '50% 50%',
    altGuidance: 'Jeep on a hillside dirt track in Munnar.',
  },
  {
    id: 'exp-biking',
    suggestedFilename: 'exp-biking.webp',
    section: 'Experiences — Biking',
    recommendedSize: '900 × 1125 (portrait)',
    aspectRatio: '4:5',
    focalPoint: '50% 50%',
    altGuidance: 'Bicycle or rider along a quiet Munnar estate road.',
  },
  {
    id: 'exp-elephant',
    suggestedFilename: 'exp-elephant-sightseeing.webp',
    section: 'Experiences — Elephant sightseeing',
    recommendedSize: '1000 × 750 (landscape)',
    aspectRatio: '4:3',
    focalPoint: '50% 50%',
    altGuidance: 'Elephants seen from a designated roadside or valley viewing area in Munnar.',
  },
  {
    id: 'exp-spice',
    suggestedFilename: 'exp-spice-plantation.webp',
    section: 'Experiences — Spice plantation visits',
    recommendedSize: '1000 × 750 (landscape)',
    aspectRatio: '4:3',
    focalPoint: '50% 50%',
    altGuidance: 'Cardamom or pepper plants inside a Munnar spice plantation.',
  },
  {
    id: 'exp-tours',
    suggestedFilename: 'exp-tour-packages.webp',
    section: 'Experiences — Tour packages',
    recommendedSize: '1000 × 750 (landscape)',
    aspectRatio: '4:3',
    focalPoint: '50% 50%',
    altGuidance: 'Tea slopes and hill road along a Munnar sightseeing route.',
  },
  {
    id: 'exp-campfire',
    suggestedFilename: 'exp-campfire-music.webp',
    section: 'Experiences — Campfire with music',
    recommendedSize: '1200 × 800 (landscape)',
    aspectRatio: '3:2',
    focalPoint: '50% 50%',
    altGuidance: 'Lit evening campfire seating area at SAMCO RESIDENCY.',
  },
  {
    id: 'exp-roads',
    suggestedFilename: 'exp-local-roads.webp',
    section: 'Experiences — Local road guidance',
    recommendedSize: '900 × 1125 (portrait)',
    aspectRatio: '4:5',
    focalPoint: '50% 50%',
    altGuidance: 'Clear hill road bend in Munnar leading toward the stay.',
  },
  {
    id: 'gallery-set',
    suggestedFilename: 'gallery-<category>-<number>.webp',
    section: 'Gallery (Masonry)',
    recommendedSize: '1200 × 900 or 900 × 1200',
    aspectRatio: '4:3 or 3:4',
    focalPoint: '50% 50%',
    altGuidance: 'Authentic unedited photos of rooms, viewpoint, parking, and campfire.',
  },
];
