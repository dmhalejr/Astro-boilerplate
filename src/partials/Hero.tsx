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
            Developer working in Nashville, Tennessee, USA with a focus in
            creating seamless user experiences and enhancing velocity on
            cross-skilled teams
          </>
        }
        avatar={<div className="h-80 w-64" />}
        socialButtons={<></>}
      />
    </Section>
  );
};

export { Hero };
