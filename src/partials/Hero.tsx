import { GradientText, Section } from 'astro-boilerplate-components';

// const profilePhoto = "/images/profile_photo.jpeg"; // adjust path to your uploaded photo

const Hero = () => {
  return (
    <Section>
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
        {/* Left column - Image placeholder */}
        <div className="order-2 flex items-center justify-center md:order-1 md:w-1/2">
          {/* <div className="h-64 w-64 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 md:h-96 md:w-96"> */}
            {/* Replace this div with your image */}
            <img src="https://media.licdn.com/dms/image/v2/C4D03AQE4e6X5uifAfw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516871558333?e=1752105600&v=beta&t=F-JX4GEjqEnxmM74FnnhiG0mzasDjS3eRAoEkZLOHPU" alt="David Hale" className="h-64 w-64 rounded-full object-cover" />
          {/* </div> */}
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
