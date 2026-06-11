import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const productCategoryIds = [
  'air-floating-equipment',
  'lamella-clarifier',
  'screw-dehydrator',
  'waste-water-treatment-equipment',
] as const;

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

const events = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/events' }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    date: z.string(),
    location: z.string(),
    excerpt: z.string(),
    body: z.array(z.string()).default([]),
    images: z.array(imagePath).default([]),
    featuredImage: imagePath.or(z.literal('')).optional(),
    feature: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = { products, events };
