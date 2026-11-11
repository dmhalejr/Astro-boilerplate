const principles = [
  {
    title: 'Agents do the work. People merge.',
    body: 'Every run ends in a pull request for a human to review. The agent never merges its own change.',
  },
  {
    title: 'Deny by default.',
    body: 'Agents get an allowlist of tools, an isolated worktree, and none of the secrets. Anything not granted is refused.',
  },
  {
    title: 'Evidence over confidence.',
    body: 'A review finding has to quote the line it is about. If the quote is not in the diff, the finding is dropped.',
  },
];

const Principles = () => (
  <ol className="grid gap-x-8 gap-y-10 md:grid-cols-3">
    {principles.map((principle, i) => (
      <li
        key={principle.title}
        data-reveal
        style={{ transitionDelay: `${i * 100}ms` }}
        className="border-t border-storm-700 pt-5"
      >
        <p aria-hidden="true" className="text-sm tabular-nums text-bolt">
          0{i + 1}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          {principle.title}
        </h3>
        <p className="mt-2 leading-relaxed text-mist">{principle.body}</p>
      </li>
    ))}
  </ol>
);

export { Principles };
