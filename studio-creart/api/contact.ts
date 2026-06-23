import { IncomingMessage } from "http";

function parseJson(req: IncomingMessage) {
  return new Promise<any>((resolve, reject) => {
    let s = "";
    req.on("data", (chunk: any) => (s += chunk));
    req.on("end", () => {
      try {
        resolve(s ? JSON.parse(s) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
    return;
  }

  try {
    const body = (req.body && Object.keys(req.body).length) ? req.body : await parseJson(req);

    const type = body.type || (body.review ? "feedback" : "reserve");
    let subject = "Nouvelle soumission";
    let text = JSON.stringify(body, null, 2);

    if (type === "reserve") {
      subject = `Nouvelle réservation - ${body.firstName ?? ""} ${body.lastName ?? ""}`;
      text = `Réservation:\nName: ${body.firstName} ${body.lastName}\nPhone: ${body.phone}\nEmail: ${body.email}\nAge: ${body.age}\nNotes: ${body.notes}`;
    } else if (type === "feedback") {
      subject = `Nouveau feedback - ${body.name ?? "anonyme"} (${body.rating ?? "?"}/5)`;
      text = `Feedback:\nName: ${body.name}\nRating: ${body.rating}\nReview: ${body.review}`;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "RESEND_API_KEY not configured" }));
      return;
    }

    const from = process.env.RESEND_FROM ?? `onboarding@resend.dev`;
    const to = process.env.EMAIL_TO ?? "chrayah.sc@gmail.com";

    const r = await fetch("https://api.resend.com/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
    });

    if (!r.ok) {
      const bodyText = await r.text();
      console.error("Resend error", r.status, bodyText);
      res.statusCode = 502;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Resend API error" }));
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true }));
  } catch (err: any) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: String(err) }));
  }
}
