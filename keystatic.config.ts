import { collection, config, fields } from '@keystatic/core';

const productCategoryOptions = [
  { label: 'Air Floating Equipment', value: 'air-floating-equipment' },
  { label: 'Lamella Clarifier', value: 'lamella-clarifier' },
  { label: 'Screw Dehydrator', value: 'screw-dehydrator' },
  { label: 'Waste Water Treatment Equipment', value: 'waste-water-treatment-equipment' },
];

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    products: collection({
      label: 'Products',
      path: 'src/content/products/*',
      slugField: 'title',
      format: { data: 'json' },
      columns: ['title', 'category', 'draft'],
      schema: {
        id: fields.text({
          label: 'URL ID',
          description: 'Short id used in the page URL (/products/<id>). Keep it unique; leave existing values unchanged.',
        }),
        title: fields.slug({ name: { label: 'Product name' } }),
        category: fields.select({
          label: 'Category',
          options: productCategoryOptions,
          defaultValue: 'waste-water-treatment-equipment',
        }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        featuredImage: fields.text({ label: 'Featured image path' }),
        images: fields.array(fields.text({ label: 'Image path' }), {
          label: 'Images',
          itemLabel: (props) => props.value || 'Image',
        }),
        bullets: fields.array(fields.text({ label: 'Bullet' }), {
          label: 'Bullets',
          itemLabel: (props) => props.value || 'Bullet',
        }),
        specs: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            value: fields.text({ label: 'Value' }),
          }),
          {
            label: 'Specs',
            itemLabel: (props) => props.fields.label.value || 'Spec',
          },
        ),
        featured: fields.checkbox({ label: 'Featured product', defaultValue: false }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        order: fields.integer({ label: 'Sort order', defaultValue: 999 }),
      },
    }),
    events: collection({
      label: 'Events',
      path: 'src/content/events/*',
      slugField: 'title',
      format: { data: 'json' },
      columns: ['title', 'date', 'draft'],
      schema: {
        id: fields.text({
          label: 'URL ID',
          description: 'Short id used in the page URL (/events/<id>). Keep it unique; leave existing values unchanged.',
        }),
        title: fields.slug({ name: { label: 'Event title' } }),
        date: fields.text({ label: 'Date' }),
        location: fields.text({ label: 'Location' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        body: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Body',
          itemLabel: (props) => props.value?.slice(0, 40) || 'Paragraph',
        }),
        featuredImage: fields.text({ label: 'Featured image path' }),
        images: fields.array(fields.text({ label: 'Image path' }), {
          label: 'Images',
          itemLabel: (props) => props.value || 'Image',
        }),
        feature: fields.checkbox({ label: 'Feature on events page', defaultValue: false }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        order: fields.integer({ label: 'Sort order', defaultValue: 999 }),
      },
    }),
  },
});
