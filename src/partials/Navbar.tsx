const linkClass =
  'rounded px-1.5 py-2 text-sm font-medium text-mist transition-colors hover:text-ink sm:px-3';

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b border-storm-800 bg-storm-950/90 backdrop-blur-sm">
    <nav
      aria-label="Main"
      className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
    >
      <a
        href="/"
        className="text-sm font-black uppercase tracking-wider text-ink sm:text-base sm:tracking-widest"
      >
        Halestorm
      </a>

      <div className="flex items-center gap-1 sm:gap-2">
        <a href="/projects" className={linkClass}>
          Work
        </a>
        <a href="/blog" className={linkClass}>
          Blog
        </a>
        <a
          href="https://github.com/dmhalejr"
          className="ml-1 rounded-full bg-bolt px-3 py-1.5 sm:px-4 text-sm font-semibold text-storm-950 transition-colors hover:bg-ink"
        >
          GitHub
        </a>
      </div>
    </nav>
  </header>
);

export { Navbar };
