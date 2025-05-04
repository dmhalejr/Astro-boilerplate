import { Section } from 'astro-boilerplate-components';

const ValueProp = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-lg bg-slate-800 p-6">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-2 text-gray-400">{description}</p>
  </div>
);

const ValueProps = () => {
  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-3">
        <ValueProp
          title="Clear, Scalable Solutions"
          description="I thrive on turning complex technical challenges into simple, scalable solutions that make life easier for both teams and users."
        />
        <ValueProp
          title="Practical + Thoughtful Engineering"
          description="I don’t just build to spec — I bring clarity, structure, and thoughtful design to ensure what we create is reliable, maintainable, and impactful."
        />
        <ValueProp
          title="Collaboration First"
          description="Great software is built together. I work side-by-side with stakeholders and teams to ensure the process feels collaborative and the outcome exceeds expectations."
        />
      </div>
    </Section>
  );
};

export { ValueProps };
