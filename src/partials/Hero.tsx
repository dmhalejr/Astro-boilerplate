import { GradientText, Section } from 'astro-boilerplate-components';

const Hero = () => {
  return (
    <Section>
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
        {/* Left column - Profile photo */}
        <div className="order-2 flex items-center justify-center md:order-1 md:w-1/2">
          <img src="/images/profile_pic.jpeg" alt="David Hale" className="h-64 w-64 rounded-full object-cover" />
        </div>

        {/* Right column - Content */}
        <div className="order-1 flex flex-col items-center justify-center text-center md:order-2 md:w-1/2 md:items-start md:text-left">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            <span className="block">
              <GradientText>Developer.</GradientText>
            </span>
            <span className="block">
              <GradientText>Father.</GradientText>
            </span>
            <span className="block">
              <GradientText>Husband.</GradientText>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            Building scalable systems that solve real problems — and help real people.
            Let’s create something together.
          </p>
        </div>
      </div>
    </Section>
  );
};

export { Hero };
