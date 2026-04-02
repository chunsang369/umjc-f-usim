import { defineRouting } from 'next-intl/routing';

export const locales = ['ko', 'en', 'zh', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
});
