// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  // Public site origin — used for canonical URLs, Open Graph tags and the
  // sitemap. Update this if the production domain changes.
  site: 'https://yimei.my',
  integrations: [react(), markdoc(), ...(isDev ? [keystatic()] : [])],
  // Pages stay static; only routes with `export const prerender = false`
  // (e.g. /api/contact) become serverless functions. The adapter is REQUIRED
  // for those — without it the production build fails. That was the hibsf bug.
  output: 'static',
  adapter: vercel(),
});
