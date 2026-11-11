type ISectionHeadingProps = {
  title: string;
  link?: { label: string; href: string };
};

const SectionHeading = (props: ISectionHeadingProps) => (
  <div className="mb-6 flex items-baseline justify-between gap-4">
    <h2 className="text-2xl font-bold tracking-tight">{props.title}</h2>
    {props.link && (
      <a
        href={props.link.href}
        className="group text-sm font-medium text-mist transition-colors hover:text-bolt"
      >
        {props.link.label} <span
          aria-hidden="true"
          className="inline-block transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    )}
  </div>
);

export { SectionHeading };
