import fetch from "node-fetch";

export default async (req, context) => {
  const kv = context.env.MY_STORE;
  const yesCount = (await kv.get("yesCount")) || 0;

  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${context.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: "ulrich.matthias@icloud.com" }] }],
      from: { email: "noreply@deine-domain.com" },
      subject: "Wöchentlicher Umfrage-Report",
      content: [
        { type: "text/plain", value: `Die Umfrage wurde bisher ${yesCount}x mit "Ja" beantwortet.` }
      ]
    }),
  });

  return new Response("Weekly mail sent");
};

