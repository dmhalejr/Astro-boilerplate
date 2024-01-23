import type { MarkdownInstance } from 'astro';
import type { IFrontmatter } from 'astro-boilerplate-components';
import { format } from 'date-fns';

type IBlogGalleryProps = {
  postList: MarkdownInstance<IFrontmatter>[];
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {props.postList.map((elt) => (
      <a className="hover:translate-y-1" href={elt.url}>
        <div className="overflow-hidden rounded-md bg-slate-800">
          {elt.frontmatter.imgSrc && (
            <div className="aspect-h-2 aspect-w-3">
              <img
                className="h-full w-full object-cover object-center"
                src={elt.frontmatter.imgSrc}
                alt={elt.frontmatter.imgAlt}
                loading="lazy"
              />
            </div>
          )}

          <div className="px-3 pb-6 pt-4 text-center">
            <h2 className="text-xl font-semibold">{elt.frontmatter.title}</h2>

            <div className="mt-1 text-xs text-gray-400">
              {format(new Date(elt.frontmatter.pubDate), 'LLL d, yyyy')}
            </div>

            <div className="mt-2 text-sm">{elt.frontmatter.description}</div>
          </div>
        </div>
      </a>
    ))}
  </div>
);

export { BlogGallery };
