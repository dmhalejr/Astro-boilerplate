import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <>
        Recent <GradientText>Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-6">
      <Project
        name="git-greener"
        description="A CLI tool to bring your GitHub contribution graph with you.
        Replay commit history with preserved dates across repositories.
        Metadata-only transfers keep things clean and safe."
        link="https://github.com/dmhalejr/greener"
        img={{
          src: '/assets/images/git-greener-cover.png',
          alt: 'git-greener CLI tool',
        }}
        category={
          <>
            <Tags color={ColorTags.EMERALD}>Node.js</Tags>
            <Tags color={ColorTags.ROSE}>TypeScript</Tags>
            <Tags color={ColorTags.SKY}>CLI</Tags>
            <Tags color={ColorTags.VIOLET}>Open Source</Tags>
          </>
        }
      />
    </div>
  </Section>
);

export { ProjectList };
