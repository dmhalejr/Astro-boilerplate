import { projects } from '@/utils/Projects';

type IProjectListProps = {
  // Heading level for project names, so cards nest under the page's own heading.
  headingLevel: 'h2' | 'h3';
  // Show only the first N projects.
  limit?: number;
};

// Rows alternate wide/narrow then narrow/wide.
const isWide = (i: number) => i % 4 === 0 || i % 4 === 3;

const ProjectList = (props: IProjectListProps) => {
  const Heading = props.headingLevel;
  const shown = projects.slice(0, props.limit);
  // An odd card left on its own row takes the full width.
  const spanClass = (i: number) => {
    if (i === shown.length - 1 && i % 2 === 0) return 'md:col-span-5';
    return isWide(i) ? 'md:col-span-3' : 'md:col-span-2';
  };

  return (
    <ul className="grid gap-6 md:grid-cols-5">
      {shown.map((project, i) => (
        <li
          key={project.name}
          data-reveal
          style={{ transitionDelay: `${(i % 2) * 100}ms` }}
          className={spanClass(i)}
        >
          <article
            className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-storm-800 bg-storm-900 transition duration-300 ${
              project.href ? 'hover:-translate-y-1 hover:border-bolt' : ''
            }`}
          >
            {project.img && (
              <img
                src={project.img.src}
                alt={project.img.alt}
                width={1536}
                height={1024}
                loading="lazy"
                className="aspect-[2/1] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            <div className="flex flex-1 flex-col p-6">
              {project.status && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bolt">
                  {project.status}
                </p>
              )}

              <Heading className="text-xl font-bold tracking-tight">
                {project.href ? (
                  <a
                    href={project.href}
                    className="after:absolute after:inset-0 group-hover:text-bolt"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </Heading>

              <p className="mt-2 leading-relaxed text-mist">
                {project.description}
              </p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-storm-700 px-2.5 py-1 text-xs text-mist"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export { ProjectList };
