import type { IFrontmatter } from 'astro-boilerplate-components';
import { format } from 'date-fns';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IBlogPostProps = {
  frontmatter: IFrontmatter;
  children: ReactNode;
};

const BlogPost = (props: IBlogPostProps) => (
  <article className="mx-auto max-w-prose px-4 pt-12 sm:px-6 sm:pt-16">
    <header>
      <p className="text-sm text-mist">
        <time dateTime={new Date(props.frontmatter.pubDate).toISOString()}>
          {format(new Date(props.frontmatter.pubDate), 'LLL d, yyyy')}
        </time>{' '}
        · {AppConfig.author}
      </p>
      <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
        {props.frontmatter.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-mist">
        {props.frontmatter.description}
      </p>
    </header>

    {props.frontmatter.imgSrc && (
      <img
        className="mt-8 aspect-[3/2] w-full rounded-lg border border-storm-800 object-cover"
        src={props.frontmatter.imgSrc}
        alt={props.frontmatter.imgAlt}
      />
    )}

    <div className="prose prose-invert mt-10 prose-headings:tracking-tight prose-a:text-bolt prose-a:underline-offset-4 prose-code:text-ink prose-pre:border prose-pre:border-storm-800 prose-img:rounded-lg">
      {props.children}
    </div>
  </article>
);

export { BlogPost };
