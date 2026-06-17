// Central SEO config — site-wide metadata, default keywords and the
// structured-data (JSON-LD) payload. BaseLayout pulls from here so every page
// shares one source of truth. Pass page-specific overrides via BaseLayout props.

export const SITE = {
  name: 'Yimei Environment Protection',
  legalName: 'Yimei Environment Protection Technology Sdn. Bhd.',
  url: 'https://yimei.my',
  // Social-share / Open Graph fallback image (lives in /public).
  ogImage: '/sketch2.png',
  locale: 'en_MY',
  twitter: '', // add @handle if a Twitter/X account exists
  email: 'sync.dyna@gmail.com',
  phone: '+60186655655',
  address: {
    street: 'Lot 17 & 18 Block C, 1st Floor, Yun Fook Light Industrial Complex, ½ Miles, Keningau-Nabawan Road, P.O. Box 1733',
    city: 'Keningau',
    region: 'Sabah',
    postalCode: '89008',
    country: 'MY',
  },
} as const;

// Default keywords applied to every page. Page-level keywords (passed to
// BaseLayout) are merged in front of these, so the most specific terms lead.
export const DEFAULT_KEYWORDS: string[] = [
  'Yimei',
  'Yimei Environment Protection',
  'Yimei Environment Protection Technology',
  'Qingdao Yimei',
  'Qingdao Yimei Environment Project',
  'environment protection',
  'environmental protection technology',
  'water treatment',
  'wastewater treatment',
  'waste water treatment',
  'industrial wastewater treatment',
  'sewage treatment',
  'effluent treatment plant',
  'water recovery',
  'water recycling',
  'dissolved air flotation',
  'DAF machine',
  'lamella clarifier',
  'screw dehydrator',
  'sludge dewatering',
  'sludge dewatering screw press',
  'MBR MBBR package plant',
  'water treatment Malaysia',
  'wastewater treatment Malaysia',
  'Malaysia',
  'Sabah',
  'Keningau',
  'Keningau Sabah',
  'Kota Kinabalu',
  'water treatment Sabah',
  'water treatment Keningau',
  'environmental equipment supplier',
];

// Merge page keywords ahead of the defaults and de-duplicate (case-insensitive).
export function buildKeywords(pageKeywords: string[] = []): string {
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const kw of [...pageKeywords, ...DEFAULT_KEYWORDS]) {
    const key = kw.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(kw.trim());
  }
  return merged.join(', ');
}

// Organization + LocalBusiness structured data. Search engines use this for
// rich results and the knowledge panel (logo, address, service area, parent co).
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: 'Yimei',
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    email: SITE.email,
    telephone: SITE.phone,
    description:
      'Yimei Environment Protection Technology Sdn. Bhd. supplies industrial water and wastewater treatment systems across Malaysia — turning effluent and industrial waste into clean, reusable water.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Sabah' },
      { '@type': 'City', name: 'Kota Kinabalu' },
      { '@type': 'City', name: 'Keningau' },
      { '@type': 'Country', name: 'Malaysia' },
    ],
    knowsAbout: [
      'Water treatment',
      'Wastewater treatment',
      'Dissolved air flotation',
      'Lamella clarifier',
      'Sludge dewatering',
      'Environmental protection technology',
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'Qingdao Yimei Environment Project Co., Ltd.',
      url: 'https://www.ccyimei.com',
    },
  };
}
