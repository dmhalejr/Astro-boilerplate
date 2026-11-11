const Hero = () => (
  <section className="relative isolate overflow-hidden">
    {/* Animated hail and lightning; drawn by the script in pages/index.astro. */}
    <canvas
      id="storm-canvas"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 size-full [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    />

    <div className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
      <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="rise mb-5 text-sm font-semibold uppercase tracking-widest text-bolt">
            AI agent engineering
          </p>
          <h1 className="text-6xl font-black leading-none tracking-tighter sm:text-7xl lg:text-8xl">
            <span className="rise block">Developer.</span>
            <span className="rise block [--d:120ms]">Father.</span>
            <span className="rise strike block text-bolt [--d:240ms]">
              Husband.
            </span>
          </h1>

          <p className="rise mt-8 max-w-xl text-lg leading-relaxed text-mist [--d:420ms]">
            I build AI agent systems and the guardrails around them: software
            where agents do the work and people keep the final say.
          </p>

          <div className="rise mt-8 flex flex-wrap gap-3 [--d:540ms]">
            <a
              href="/projects"
              className="rounded-full bg-bolt px-5 py-2.5 text-sm font-semibold text-storm-950 transition hover:-translate-y-0.5 hover:bg-ink"
            >
              See the work
            </a>
            <a
              href="/blog"
              className="rounded-full border border-storm-700 px-5 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-bolt hover:text-bolt"
            >
              Read the blog
            </a>
          </div>
        </div>

        <div className="photo-ring rise relative size-36 shrink-0 rounded-full p-1.5 [--d:300ms] md:size-56">
          <img
            src="/images/profile_pic.jpeg"
            alt="David Hale"
            width={224}
            height={224}
            className="relative size-full rounded-full object-cover ring-[3px] ring-storm-950"
          />
        </div>
      </div>
    </div>
  </section>
);

export { Hero };
