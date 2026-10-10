import { collection, config, fields } from '@keystatic/core';

// Local mode: edit at http://127.0.0.1:4321/keystatic while `pnpm dev` runs, then commit.
// Field names must match the schemas in src/content.config.ts.
// Uploads are stored under public/images/<collection>/<entry>/.

const productCategoryOptions = [
  { label: 'Air Floating Equipment', value: 'air-floating-equipment' },
  { label: 'Lamella Clarifier', value: 'lamella-clarifier' },
  { label: 'Screw Dehydrator', value: 'screw-dehydrator' },
  { label: 'Waste Water Treatment Equipment', value: 'waste-water-treatment-equipment' },
];

const productImages = { directory: 'public/images/products', publicPath: '/images/products/' };
const eventImages = { directory: 'public/images/events', publicPath: '/images/events/' };

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'Yimei' },
    navigation: {
      Catalogue: ['products'],
      Stories: ['events'],
    },
  },
  collections: {
    products: collection({
      label: 'Products',
      path: 'src/content/products/*',
      slugField: 'title',
      format: { data: 'json' },
      columns: ['title', 'category', 'order', 'draft'],
      schema: {
        id: fields.text({
          label: 'URL ID',
          description: 'Short id used in the page URL (/products/<id>). Keep it unique; leave existing values unchanged.',
        }),
        title: fields.slug({ name: { label: 'Product name', validation: { isRequired: true } } }),
        category: fields.select({
          label: 'Category',
          description: 'Which product range this appears under on the Products page.',
          options: productCategoryOptions,
          defaultValue: 'waste-water-treatment-equipment',
        }),
        summary: fields.text({
          label: 'Summary',
          description: 'One or two sentences. Shown on the product card and page, and as the search/share description.',
          multiline: true,
        }),
        featuredImage: fields.image({
          label: 'Card image',
          description: 'Optional. Shown on the product card and when the link is shared. Leave empty to use the first gallery photo.',
          ...productImages,
        }),
        images: fields.array(fields.image({ label: 'Photo', ...productImages }), {
          label: 'Gallery',
          description: 'Photos on the product page, in order. The first one is also the card image unless one is set above.',
          itemLabel: (props) => props.value?.filename ?? 'Photo',
        }),
        bullets: fields.array(fields.text({ label: 'Key point' }), {
          label: 'Key points',
          description: 'Short feature bullets listed on the product page.',
          itemLabel: (props) => props.value || 'Key point',
        }),
        specs: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', description: 'e.g. Application, Material.' }),
            value: fields.text({ label: 'Value' }),
          }),
          {
            label: 'Specs',
            description: 'Rows in the specification table on the product page.',
            itemLabel: (props) => props.fields.label.value || 'Spec',
          },
        ),
        featured: fields.checkbox({
          label: 'Featured product',
          description: 'Marks the product as featured. Not used by the current page design.',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are hidden from the live site.',
          defaultValue: false,
        }),
        order: fields.integer({
          label: 'Sort order',
          description: 'Lower numbers appear first.',
          defaultValue: 999,
        }),
      },
    }),
    events: collection({
      label: 'Events',
      path: 'src/content/events/*',
      slugField: 'title',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'date', 'draft'],
      schema: {
        id: fields.text({
          label: 'URL ID',
          description: 'Short id used in the page URL (/events/<id>). Leave empty to use the file name; once set, keep it unchanged.',
        }),
        title: fields.slug({ name: { label: 'Event title', validation: { isRequired: true } } }),
        date: fields.date({
          label: 'Date',
          description: 'Shown on the site as month and year, e.g. "Nov 2025".',
          validation: { isRequired: true },
          defaultValue: { kind: 'today' },
        }),
        location: fields.text({ label: 'Location', description: 'e.g. Kuala Lumpur.' }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'One or two sentences. Shown on the event card, as the lead on the event page and as the search/share description.',
          multiline: true,
        }),
        featuredImage: fields.image({
          label: 'Card image',
          description: 'Optional. Shown on the event card and when the link is shared. Leave empty to use the first gallery item.',
          ...eventImages,
        }),
        images: fields.array(
          fields.file({
            label: 'Photo or video',
            description: 'An image, or a short video (mp4/webm).',
            ...eventImages,
          }),
          {
            label: 'Gallery',
            description: 'Photos and videos on the event page, in order.',
            itemLabel: (props) => props.value?.filename ?? 'Photo or video',
          },
        ),
        feature: fields.checkbox({
          label: 'Feature on events page',
          description: 'Marks the event as featured. Not used by the current page design.',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Drafts are hidden from the live site.',
          defaultValue: false,
        }),
        order: fields.integer({
          label: 'Sort order',
          description: 'Lower numbers appear first.',
          defaultValue: 999,
        }),
        body: fields.markdoc({
          label: 'Story',
          extension: 'md',
          options: {
            image: eventImages,
            codeBlock: false,
            table: false,
          },
        }),
      },
    }),
  },
});
