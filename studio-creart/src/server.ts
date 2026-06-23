import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // Simple API endpoints for reservation and feedback submissions.
      // If SMTP env vars are configured, messages will be sent using nodemailer.
      // Otherwise submissions are appended to `submissions.log` for manual review.
      const url = new URL(request.url);

      if (url.pathname === "/api/reserve" && request.method === "POST") {
        try {
          const body = await request.json();
          const subject = `Nouvelle réservation - ${body.firstName ?? ""} ${body.lastName ?? ""}`;
          const text = `Réservation:\nName: ${body.firstName} ${body.lastName}\nPhone: ${body.phone}\nEmail: ${body.email}\nAge: ${body.age}\nNotes: ${body.notes}`;
          await sendOrLogEmail({ subject, text });
          return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
        } catch (err) {
          console.error(err);
          return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: { "content-type": "application/json" } });
        }
      }

      if (url.pathname === "/api/feedback" && request.method === "POST") {
        try {
          const body = await request.json();
          const subject = `Nouveau feedback - ${body.name ?? "anonyme"} (${body.rating}/5)`;
          const text = `Feedback:\nName: ${body.name}\nRating: ${body.rating}\nReview: ${body.review}`;
          await sendOrLogEmail({ subject, text });
          return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
        } catch (err) {
          console.error(err);
          return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 500, headers: { "content-type": "application/json" } });
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

async function sendOrLogEmail({ subject, text }: { subject: string; text: string }) {
  // Prefer to send using SMTP if configured via env vars, otherwise append to a local log.
  const to = process.env.EMAIL_TO ?? "chrayah.sc@gmail.com";

  try {
    // First preference: Resend (recommended for Vercel)
    if (process.env.RESEND_API_KEY) {
      const resendFrom = process.env.RESEND_FROM ?? `Studio Creart <no-reply@studio-creart.com>`;
      await fetch("https://api.resend.com/email", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to,
          subject,
          text,
        }),
      });
      return;
    }

    // If RESEND_API_KEY was not set earlier, nodemailer is intentionally not used.
    // We prefer Resend for Vercel. If no Resend key, continue to logging fallback below.
  } catch (err) {
    console.error("SMTP send failed, falling back to log:", err);
  }

  // Fallback: append to submissions.log in project root
  try {
    const fs = await import("fs/promises");
    const entry = { date: new Date().toISOString(), to, subject, text };
    await fs.appendFile("submissions.log", JSON.stringify(entry) + "\n");
  } catch (err) {
    console.error("Failed to write submissions.log:", err);
  }
}
