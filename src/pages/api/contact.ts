import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Here you can handle the data: send an email, save to DB, etc.
  // For now, just return a success response.
  return new Response(
    JSON.stringify({ success: true, name, email, message }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}; 