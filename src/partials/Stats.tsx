import { Section } from 'astro-boilerplate-components';

// const StatItem = ({ number, label }: { number: string; label: string }) => (
//   <div className="flex flex-col items-center">
//     <span className="text-4xl font-bold text-white">{number}</span>
//     <span className="mt-2 text-sm text-gray-400">{label}</span>
//   </div>
// );

const Stats = () => {
  return (
    <Section>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {/* TODO: Add stats */}
        {/* <StatItem number="100+" label="Being awesome" /> */}
      </div>
    </Section>
  );
};

export { Stats };
