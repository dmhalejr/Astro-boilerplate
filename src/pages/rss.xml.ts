import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import type { IFrontmatter } from 'astro-boilerplate-components';

import { AppConfig } from '@/utils/AppConfig';

export async function GET(context: APIContext) {
  const posts = import.meta.glob<{ frontmatter: IFrontmatter; url: string }>(
    './blog/**/*.md',
    { eager: true },
  );

  const items = Object.values(posts)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.pubDate).valueOf() -
        new Date(a.frontmatter.pubDate).valueOf(),
    )
    .map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.pubDate),
      description: post.frontmatter.description ?? '',
      link: post.url ?? '',
    }));

  return rss({
    title: AppConfig.title,
    description: AppConfig.description,
    site: context.site?.toString() ?? import.meta.env.SITE,
    items,
    customData: `<language>en-us</language>`,
  });
}
