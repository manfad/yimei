import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// This route must run on-demand (it sends email). With output:'static' this is
// allowed ONLY because a server adapter is configured in astro.config.mjs.
// If the adapter is missing, the build fails — that was the hibsf deploy bug.
export const prerender = false;

// Where enquiries land. Falls back to the address shown on the contact page.
const FALLBACK_NOTIFY_TO = 'sync.dyna@gmail.com';
// Resend lets you send from this sandbox address with ZERO domain setup, so the
// form works on the very first deploy. Swap RESEND_FROM to a verified domain later.
const FALLBACK_FROM = 'Yimei Website <onboarding@resend.dev>';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const message = String(payload.message ?? '').trim();
  const honeypot = String(payload._gotcha ?? '').trim();

  // Bot filled the hidden field — pretend success, send nothing.
  if (honeypot) return json({ ok: true });

  if (!name || !email || !message) {
    return json({ error: 'Name, email and message are required.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Please provide a valid email address.' }, 400);
  }

  // Use process.env (runtime) rather than import.meta.env so the secret is read
  // from Vercel's runtime environment instead of being inlined at build time.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured.');
    return json({ error: 'Email service is not configured yet. Please email us directly.' }, 503);
  }

  const fromAddress = process.env.RESEND_FROM || FALLBACK_FROM;
  const notifyTo = process.env.CONTACT_NOTIFY_TO || FALLBACK_NOTIFY_TO;

  const resend = new Resend(apiKey);
  const safeMessage = escape(message).replace(/\n/g, '<br />');

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: notifyTo,
      replyTo: email,
      subject: `New contact enquiry — ${name}`,
      html: `
        <div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#1a1a1a;">
          <p><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p>
          <hr />
          <p>${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return json({ error: 'Could not send your message. Please try again later.' }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return json({ error: 'Something went wrong. Please try again later.' }, 500);
  }
};
