import type { CollectionEntry } from 'astro:content';

export type ProductEntry = CollectionEntry<'products'>;
export type EventEntry = CollectionEntry<'events'>;

const VIDEO_RE = /\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i;

export function isVideoSrc(src: string): boolean {
  return VIDEO_RE.test(src);
}

export type Product = {
  id: string;
  cat: string;
  name: string;
  tag: string;
  bullets: string[];
  specs: [string, string][];
  images: string[];
  featuredImage: string;
  order: number;
};

export type Event = {
  id: string;
  date: string;
  location: string;
  title: string;
  excerpt: string;
  /** Cover for cards, the page header and share image: the one set in Keystatic, else the story's first photo. */
  featuredImage: string;
  /** True when featuredImage is the story's first photo, so the page shouldn't show it twice. */
  coverFromBody: boolean;
  feature: boolean;
  order: number;
};

export type Category = {
  id: string;
  no: string;
  name: string;
  desc: string;
};

export const categories: Category[] = [
  {
    id: 'air-floating-equipment',
    no: '01',
    name: 'Air Floating Equipment',
    desc: 'Dissolved air flotation and solid-liquid separation equipment for wastewater treatment.',
  },
  {
    id: 'lamella-clarifier',
    no: '02',
    name: 'Lamella Clarifier',
    desc: 'Compact inclined-plate clarification systems for sedimentation and suspended solids removal.',
  },
  {
    id: 'screw-dehydrator',
    no: '03',
    name: 'Screw Dehydrator',
    desc: 'Screw press and volute dehydrator equipment for sludge dewatering applications.',
  },
  {
    id: 'waste-water-treatment-equipment',
    no: '04',
    name: 'Waste Water Treatment Equipment',
    desc: 'Packaged treatment systems, dosing units, screens, flotation units, and supporting equipment.',
  },
];

export function categoryName(id: string): string {
  return categories.find((category) => category.id === id)?.name ?? id;
}

export function toProduct(entry: ProductEntry): Product {
  const featuredImage = entry.data.featuredImage || entry.data.images[0] || '';
  return {
    id: entry.data.id || entry.id,
    cat: entry.data.category,
    name: entry.data.title,
    tag: entry.data.summary,
    bullets: entry.data.bullets,
    specs: entry.data.specs.map((spec) => [spec.label, spec.value]),
    images: entry.data.images,
    featuredImage,
    order: entry.data.order,
  };
}

// Events show month and year only, e.g. "Nov 2025".
export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/** First image in a story's Markdown body, e.g. `![](/images/events/x/photo.jpg)`. */
export function firstBodyImage(body: string | undefined): string | undefined {
  return body?.match(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/)?.[1];
}

export function toEvent(entry: EventEntry): Event {
  const bodyImage = entry.data.featuredImage ? undefined : firstBodyImage(entry.body);
  return {
    id: entry.data.id || entry.id,
    date: formatEventDate(entry.data.date),
    location: entry.data.location,
    title: entry.data.title,
    excerpt: entry.data.excerpt,
    featuredImage: entry.data.featuredImage || bodyImage || '',
    coverFromBody: Boolean(bodyImage),
    feature: entry.data.feature,
    order: entry.data.order,
  };
}

export function byOrderThenName<T extends { order: number; name?: string; title?: string }>(a: T, b: T) {
  if (a.order !== b.order) return a.order - b.order;
  return (a.name ?? a.title ?? '').localeCompare(b.name ?? b.title ?? '');
}
