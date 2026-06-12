import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toProduct, toEvent } from '../lib/catalog';
import { SITE } from '../lib/seo';

// Dependency-free sitemap. Lists the static pages plus every published product
// and event so search engines can discover the full catalogue. Regenerated on
// each build via the static endpoint.
export const GET: APIRoute = async () => {
  const origin = (SITE.url).replace(/\/$/, '');

  const staticPaths = ['/', '/about', '/products', '/events', '/contact'];

  const products = (await getCollection('products', ({ data }) => !data.draft)).map(toProduct);
  const events = (await getCollection('events')).map(toEvent);

  const urls = [
    ...staticPaths.map((path) => ({ loc: `${origin}${path}`, priority: path === '/' ? '1.0' : '0.8' })),
    ...products.map((p) => ({ loc: `${origin}/products/${p.id}`, priority: '0.7' })),
    ...events.map((e) => ({ loc: `${origin}/events/${e.id}`, priority: '0.6' })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
