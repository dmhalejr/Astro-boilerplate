import type { MarkdownInstance } from 'astro';
import type { IFrontmatter } from 'astro-boilerplate-components';
import { format } from 'date-fns';

type IPostListProps = {
  postList: MarkdownInstance<IFrontmatter>[];
  // Heading level for post titles, so rows nest under the page's own heading.
  headingLevel: 'h2' | 'h3';
};

const PostList = (props: IPostListProps) => {
  const Heading = props.headingLevel;

  return (
    <ul className="divide-y divide-storm-800 border-y border-storm-800">
      {props.postList.map((post, i) => (
        <li
          key={post.url}
          data-reveal
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <a
            href={post.url}
            className="group grid gap-1 py-5 transition-[padding] duration-300 hover:pl-2 sm:grid-cols-[8rem_1fr] sm:gap-6"
          >
            <time
              dateTime={new Date(post.frontmatter.pubDate).toISOString()}
              className="pt-1 text-sm tabular-nums text-mist"
            >
              {format(new Date(post.frontmatter.pubDate), 'LLL d, yyyy')}
            </time>
            <div>
              <Heading className="text-lg font-semibold tracking-tight transition-colors group-hover:text-bolt">
                {post.frontmatter.title}
              </Heading>
              <p className="mt-1 text-mist">{post.frontmatter.description}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export { PostList };
