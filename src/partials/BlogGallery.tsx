import type { MarkdownInstance } from 'astro';
import type { IFrontmatter } from 'astro-boilerplate-components';
import { format } from 'date-fns';

type IBlogGalleryProps = {
  postList: MarkdownInstance<IFrontmatter>[];
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {props.postList.map((elt, i) => <a key={i} href={elt.url}>
    <div className="overflow-hidden rounded-md bg-slate-800">
      <h2 className="text-xl font-semibold">{elt.frontmatter.title}</h2>
      <div className="mt-1 text-xs text-gray-400">
              {format(new Date(elt.frontmatter.pubDate), 'LLL d, yyyy')}
            </div>

            <div className="mt-2 text-sm">{elt.frontmatter.description}</div>
    </div>
    </a>)}
  </div>
);

export { BlogGallery };
