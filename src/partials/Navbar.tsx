const linkClass =
  'rounded px-1.5 py-2 text-sm font-medium text-mist transition-colors hover:text-ink sm:px-3';

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b border-storm-800 bg-storm-950/90 backdrop-blur-sm print:hidden">
    <nav
      aria-label="Main"
      className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
    >
      <a
        href="/"
        className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-ink sm:text-base sm:tracking-widest"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-bolt">
          <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
        </svg>
        David Hale
      </a>

      <div className="flex items-center gap-1 sm:gap-2">
        <a href="/about" className={linkClass}>
          About
        </a>
        <a href="/projects" className={linkClass}>
          Work
        </a>
        <a href="/blog" className={linkClass}>
          Blog
        </a>
        <a
          href="/resume"
          className="ml-1 rounded-full bg-bolt px-3 py-1.5 text-sm font-semibold text-storm-950 transition-colors hover:bg-ink sm:px-4"
        >
          Resume
        </a>
      </div>
    </nav>
  </header>
);

export { Navbar };
