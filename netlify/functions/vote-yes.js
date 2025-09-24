import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "netlify/functions/counter.json");

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let count = 0;

  try {
    const data = fs.readFileSync(filePath, "utf8");
    count = JSON.parse(data).yesCount || 0;
  } catch (e) {
    count = 0;
  }

  count += 1;

  fs.writeFileSync(filePath, JSON.stringify({ yesCount: count }), "utf8");

  return new Response(JSON.stringify({ success: true, count }), {
    headers: { "Content-Type": "application/json" },
  });
};
