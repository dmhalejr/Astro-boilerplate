import {
  GradientText,
  HeroAvatar,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => {
  return (
    <Section>
      <HeroAvatar
        title={
          <>
            Hi there, I'm <GradientText>Halestorm</GradientText> 👋
          </>
        }
        description={
          <>
            Day to day you'll find me working at{' '}
            <a href="https://careaccess.com/" target="_blank">
              <GradientText>Care Access</GradientText>
            </a>{' '}
            as a Full-Stack Senior Software Engineer. This site is leveraged as
            portfolio, blog, and more. Thanks for stopping by!
          </>
        }
        avatar={<div className="h-80 w-64" />}
        socialButtons={<></>}
      />
    </Section>
  );
};

export { Hero };
