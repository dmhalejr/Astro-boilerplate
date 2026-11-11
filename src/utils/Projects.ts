export type ProjectItem = {
  name: string;
  description: string;
  tags: string[];
  // Omit for work that has no public link yet.
  href?: string;
  // Shown as a highlighted label, e.g. for unreleased work.
  status?: string;
  img?: { src: string; alt: string };
};

export const projects: ProjectItem[] = [
  {
    name: 'Halestorm Factory',
    description:
      'An issue-to-PR agent factory. A labeled GitHub issue goes to headless Claude Code in an isolated git worktree and comes back as a pull request for a human to merge. A second line reviews pull requests with read-only agents whose findings must cite the exact line they are about.',
    status: 'In development',
    tags: ['AI agents', 'Claude Code', 'TypeScript', 'Postgres'],
  },
  {
    name: 'Timberclove',
    description:
      'Registration software for homeschool co-ops. Families get a fair turn in line, seats are held while they pay, and waitlists, monthly payment plans and direct teacher payouts through Stripe run in one place.',
    href: 'https://timberclove.com',
    status: 'Live',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
  },
  {
    name: 'More Than Words',
    description:
      'An AI-powered AAC board generator for printable and digital communication boards. Communication is a human right, not a premium feature.',
    status: 'In development',
    tags: ['AI', 'AAC', 'Accessibility'],
  },
  {
    name: 'git-greener',
    description:
      'A CLI tool to bring your GitHub contribution graph with you. Replays commit history with preserved dates across repositories, transferring metadata only.',
    href: 'https://github.com/dmhalejr/greener',
    tags: ['Node.js', 'TypeScript', 'CLI', 'Open source'],
    img: {
      src: '/assets/images/git-greener-cover.png',
      alt: 'git-greener CLI tool',
    },
  },
  {
    name: 'health-types',
    description:
      'TypeScript types for HL7 FHIR (STU3, R4, R4B, R5), generated from HL7’s official definitions.',
    href: 'https://github.com/dmhalejr/health-types',
    tags: ['TypeScript', 'FHIR', 'Healthcare', 'Open source'],
  },
];
