import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const productCategoryIds = [
  'air-floating-equipment',
  'lamella-clarifier',
  'screw-dehydrator',
  'waste-water-treatment-equipment',
] as const;

// Edited through Keystatic (keystatic.config.ts); the field names here must match it.
const imagePath = z.string().startsWith('/images/');

const products = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    category: z.enum(productCategoryIds),
    summary: z.string(),
    images: z.array(imagePath).default([]),
    featuredImage: imagePath.or(z.literal('')).optional(),
    bullets: z.array(z.string()).default([]),
    specs: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

// Event entries are Markdown files; the story (text and inline photos) is the body,
// rendered with render(). Without a featuredImage the first story photo is the cover.
const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().default(''),
    excerpt: z.string().default(''),
    featuredImage: imagePath.or(z.literal('')).optional(),
    videos: z.array(imagePath).default([]),
    feature: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = { products, events };
