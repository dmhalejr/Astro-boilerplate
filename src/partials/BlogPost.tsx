import type { IFrontmatter } from 'astro-boilerplate-components';
import { PostHeader, Section } from 'astro-boilerplate-components';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IBlogPostProps = {
  frontmatter: IFrontmatter;
  children: ReactNode;
};

const BlogPost = (props: IBlogPostProps) => (
  <Section>
    <PostHeader content={props.frontmatter} author={AppConfig.author} />
    <div className="mx-auto mt-5 max-w-prose">
      {props.frontmatter.imgSrc && (
        <div className="aspect-h-2 aspect-w-3">
          <img
            className="h-full w-full rounded-lg object-cover object-center"
            src={props.frontmatter.imgSrc}
            alt={props.frontmatter.imgAlt}
            loading="lazy"
          />
        </div>
      )}

      <div className="prose prose-invert mt-8 prose-img:rounded-lg">
        {props.children}
      </div>
    </div>
  </Section>
);

export { BlogPost };
