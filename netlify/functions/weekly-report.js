import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const filePath = path.join(process.cwd(), "netlify/functions/counter.json");

export default async (req, context) => {
  // Zähler aus JSON lesen
  let count = 0;
  try {
    const data = fs.readFileSync(filePath, "utf8");
    count = JSON.parse(data).yesCount || 0;
  } catch (e) {
    count = 0;
  }

  // Mail senden via SendGrid
  const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${context.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: "ulrich.matthias@icloud.com" }] }],
      from: { email: "sparwitzmacher@msn.com" },
      subject: "Wöchentlicher Umfrage-Report",
      content: [
        {
          type: "text/plain",
          value: `Die Umfrage wurde bisher ${count}x mit "Ja" beantwortet.`,
        },
      ],
    }),
  });

  return new Response("Weekly mail sent");
};
