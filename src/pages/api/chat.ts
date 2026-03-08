import type { APIRoute } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { createHmac } from 'node:crypto';

export const prerender = false;

// --- Security ---

const ALLOWED_ORIGINS = [
  'https://halestorm.dev',
  'https://www.halestorm.dev',
];

// Allow localhost in development
if (import.meta.env.DEV) {
  ALLOWED_ORIGINS.push('http://localhost:4321', 'http://localhost:3000');
}

function isOriginAllowed(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

// CSRF token: HMAC of the date (rotates daily) signed with the API key.
// The client fetches a token from GET /api/chat before sending messages.
function generateCsrfToken(): string {
  const secret = import.meta.env.ANTHROPIC_API_KEY || 'fallback';
  const dateKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return createHmac('sha256', secret).update(`csrf-${dateKey}`).digest('hex').slice(0, 32);
}

function isValidCsrfToken(token: string | null): boolean {
  if (!token) return false;
  const expected = generateCsrfToken();
  // Constant-time comparison
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant on David Hale's personal website (halestorm.dev). David (dmhalejr) is a Senior Software Engineer based in Lebanon, Tennessee with nearly a decade of professional experience building impactful software across healthcare, travel, e-commerce, and developer tooling.

## About David

**Current role — Reify Health, Inc. (Feb 2022–present)**
Senior Software Engineer working on clinical research technology:
- Built a user grant system for self-serve onboarding that improved new-user onboarding speed by 32%
- Developed a protocol designer to help digitize clinical research quickly and effectively
- Built a scheduling service for Care Access to automate on-site scheduling for customers and staff
- Green-fielded the front-end approach for a completely new application

**Previous experience highlights:**
- **Kanso Software / HDS Doorways** — Rebuilt the Node.js backend for an affordable-care housing application serving 146 Native American tribes. Developed code generator patterns for GraphQL/TypeScript interfaces. Mentored junior developers through pair programming and code review. Led AngularJS-to-Angular 2 migration planning with architectural diagrams.
- **EvidenceCare** — Developed React/TypeScript features for healthcare software. Implemented HL7 FHIR standards for healthcare interoperability. Built analytics infrastructure for hospital ROI tracking. Worked with Terraform/Pulumi and AWS EKS/ECR containerization.
- **Lonely Planet** — Built APIs in Elixir handling half a million unique data points serving six million monthly users. Created headless Puppeteer-based Lighthouse audit tooling for organization-wide performance tracking. Built a Kibana drift-metrics dashboard in Python for data migration validation.
- **LifeWay Christian Resources** — Full-stack developer on SmallGroup.com. Led an Angular-to-React migration that contributed to $1M in revenue. Built React Native mobile apps. Architected serverless systems with AWS (SQS, SNS, S3, Lambda, EKS).

**Education:** BS in Information Technology — Trevecca Nazarene University

**Open-source:** Built git-greener, a CLI tool for replaying commit history with preserved dates (available on npm).

**Core strengths:**
- Full-stack development across React, TypeScript, Node.js, and multiple backend languages (Elixir, Python)
- Cloud infrastructure and serverless architecture (AWS, Terraform, Pulumi)
- Healthcare technology and interoperability standards (HL7 FHIR)
- Helping people and teams adopt AI tools effectively and practically
- Mentoring developers and leading architectural decisions
- Building clear, scalable solutions that solve real problems

## Your role
1. Answer questions about David's work, background, skills, and approach
2. Provide general guidance on AI adoption, software development, and engineering practices
3. Help visitors understand how AI can be introduced into their workflows practically
4. Be friendly, concise, and helpful
5. If asked about something you don't know about David specifically, be honest about it and offer to help with general technical questions instead
6. Keep responses focused and not overly long — aim for 2-4 sentences unless more detail is requested
7. When discussing David's experience, draw from the specific projects and metrics above to give concrete answers
8. Do not share David's email, phone number, or other personal contact info — direct people to reach out via the website or LinkedIn (linkedin.com/in/dmhalejr)

You should reflect the professional but approachable tone of the site.`;

// Simple in-memory rate limiting
const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count += 1;
  return true;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// GET /api/chat — issue a CSRF token to the client
export const GET: APIRoute = async ({ request }) => {
  if (!isOriginAllowed(request)) {
    return new Response(
      JSON.stringify({ error: 'Forbidden.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return new Response(
    JSON.stringify({ token: generateCsrfToken() }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    },
  );
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Origin check
  if (!isOriginAllowed(request)) {
    return new Response(
      JSON.stringify({ error: 'Forbidden.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // CSRF token check
  const csrfToken = request.headers.get('x-csrf-token');
  if (!isValidCsrfToken(csrfToken)) {
    return new Response(
      JSON.stringify({ error: 'Invalid or missing security token.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Rate limit check
  const ip = clientAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests. Please try again in a moment.',
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Chat service is not configured.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Limit conversation length to prevent token abuse
    const trimmedMessages = messages.slice(-20);

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: trimmedMessages,
    });

    const assistantMessage =
      response.content[0]?.type === 'text'
        ? response.content[0].text
        : 'I could not generate a response.';

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
