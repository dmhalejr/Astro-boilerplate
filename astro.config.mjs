import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://halestorm.dev/',
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      theme: 'monokai',
    },
  },
  integrations: [
    react(),
    tailwind({}),
    sitemap(),
    robotsTxt(),
  ],
});
