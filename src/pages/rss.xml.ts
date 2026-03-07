import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import type { APIContext } from 'astro';

import { AppConfig } from '@/utils/AppConfig';

export async function GET(context: APIContext) {
  return rss({
    title: AppConfig.title,
    description: AppConfig.description,
    site: context.site?.toString() ?? import.meta.env.SITE,
    items: await pagesGlobToRssItems(import.meta.glob('./blog/**/*.md')),
    customData: `<language>en-us</language>`,
  });
}
