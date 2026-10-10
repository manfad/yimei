import { createElement, useRef } from 'react';
import { fields } from '@keystatic/core';

type NameArgs = Parameters<typeof fields.slug>[0]['name'];

const slugify = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * A slug field that only shows the title box. New entries get their filename/URL slug from the
 * title automatically; existing entries keep their slug when the title is edited, so URLs and
 * links don't break. Storage, parsing and uniqueness checks are Keystatic's own slug field.
 */
export function titleField(name: NameArgs) {
  const base = fields.slug({ name });
  const titleBox = fields.text({ label: name.label, description: name.description });
  return {
    ...base,
    Input(props: Parameters<typeof base.Input>[0]) {
      const isNew = useRef(props.value.slug === '').current;
      return createElement(titleBox.Input as any, {
        autoFocus: props.autoFocus,
        forceValidation: props.forceValidation,
        value: props.value.name,
        onChange: (next: string) => props.onChange({ name: next, slug: isNew ? slugify(next) : props.value.slug }),
      });
    },
  } as typeof base;
}
