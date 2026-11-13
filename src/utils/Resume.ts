// Single source of truth for the /resume page. Keep this in step with
// public/David_Hale_Resume.pdf.
//
// Contact details are intentionally not listed here: people are pointed to
// LinkedIn instead of an email address or phone number.

export type ResumeRole = {
  company: string;
  title: string;
  start: string;
  end: string;
  bullets: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const resume = {
  name: 'David Hale',
  headline: 'Senior Software Engineer',
  focus: 'Agentic AI & Backend Systems',
  location: 'Lebanon, TN (Remote)',
  pdf: '/David_Hale_Resume.pdf',
  // The only public way to reach me. No email address or phone number.
  linkedin: 'https://linkedin.com/in/dmhalejr',
  summary:
    'Senior engineer with 10+ years building production software, including healthcare SaaS and clinical data platforms. Builds agentic workflows with Strands Agents and Amazon Bedrock, using retrieval-augmented generation (RAG) to ground model responses in healthcare data. Leads architecture, integrations, and delivery across distributed teams.',
  skills: [
    {
      label: 'Agentic AI',
      items: [
        'Strands Agents',
        'Amazon Bedrock (model invocation, Knowledge Bases)',
        'RAG',
        'Prompt engineering',
        'Claude',
        'Gemini',
        'Ollama',
        'Open-source LLMs',
      ],
    },
    {
      label: 'AI-assisted development',
      items: ['Codex', 'Cursor', 'GitHub Copilot'],
    },
    {
      label: 'Backend and cloud',
      items: [
        'Node.js',
        'TypeScript',
        'Clojure',
        'GraphQL',
        'REST',
        'PostgreSQL',
        'ETL',
        'AWS Lambda',
        'S3',
        'EKS',
        'ECS',
        'Docker',
        'Terraform',
        'CI/CD',
      ],
    },
    {
      label: 'Clinical integrations and frontend',
      items: [
        'FHIR',
        'HL7',
        'CDS Hooks',
        'Enterprise APIs',
        'React',
        'Remix',
        'Angular',
      ],
    },
  ] satisfies SkillGroup[],
  experience: [
    {
      company: 'Aeroflow Health',
      title: 'Senior Backend Engineer',
      start: 'Feb 2026',
      end: 'Present',
      bullets: [
        'Build and orchestrate healthcare agents with Strands Agents and Amazon Bedrock. Use Bedrock Knowledge Bases for retrieval over structured healthcare data.',
        'Design prompts to surface actionable information from unstructured clinical data and integrate the workflows into operational backend services.',
      ],
    },
    {
      company: 'Care Access',
      title: 'Senior Software Engineer',
      start: 'Aug 2024',
      end: 'Feb 2026',
      bullets: [
        'Led 6+ engineers and contractors across Care Console, Member Portal, and Member Services Portal. Owned release schedules and delivery from design through production.',
        'Improved release cadence by roughly 25-50% by standardizing team routines and reducing rework through shorter feedback loops.',
      ],
    },
    {
      company: 'OneStudyTeam (Reify Health)',
      title: 'Senior Software Engineer',
      start: 'Feb 2022',
      end: 'Aug 2024',
      bullets: [
        'Shipped self-service user provisioning that increased site onboarding speed by 32%. Built a protocol designer for clinical research workflows and contributed to the launch of Site Financials.',
        'Developed TypeScript GraphQL code generation patterns adopted across multiple squads and mentored junior engineers.',
      ],
    },
    {
      company: 'Kanso Software (HDS Doorways)',
      title: 'Senior Software Engineer',
      start: 'Aug 2021',
      end: 'Feb 2022',
      bullets: [
        'Secured leadership support for an AngularJS-to-Angular migration and led the frontend team through implementation.',
      ],
    },
    {
      company: 'EvidenceCare',
      title: 'Senior SDE / SDE II',
      start: 'Feb 2020',
      end: 'Aug 2021',
      bullets: [
        'Designed HL7 FHIR and CDS Hooks integrations across 7-10 hospital systems. Built analytics to measure client ROI and feature flags to support staged enterprise rollouts.',
      ],
    },
    {
      company: 'Lonely Planet',
      title: 'Software Developer in Test',
      start: 'Feb 2019',
      end: 'Feb 2020',
      bullets: [
        'Built a shared test automation monorepo, a Python and Kibana migration dashboard, and Puppeteer and Lighthouse audit tooling.',
      ],
    },
  ] satisfies ResumeRole[],
  education: {
    school: 'Trevecca Nazarene University',
    degree: 'BS, Information Technology',
    years: '2006 – 2011',
  },
};
