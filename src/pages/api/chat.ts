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

const SYSTEM_PROMPT = `You are a helpful AI assistant on David Hale's personal website (halestorm.dev). David (dmhalejr) is a software developer and engineering leader who:

- Helps people and teams adopt AI tools effectively and practically
- Builds clear, scalable solutions that solve real problems
- Values collaboration, working side-by-side with stakeholders and teams
- Brings practical, thoughtful engineering to every project
- Creates reliable, maintainable, and impactful software
- Built git-greener, a CLI tool for replaying commit history with preserved dates

Your role is to:
1. Answer questions about David's work, background, and approach
2. Provide general guidance on AI adoption, software development, and engineering practices
3. Help visitors understand how AI can be introduced into their workflows practically
4. Be friendly, concise, and helpful
5. If asked about something you don't know about David specifically, be honest about it and offer to help with general technical questions instead
6. Keep responses focused and not overly long

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
