export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const kv = context.env.MY_STORE; // Name deiner KV-Binding
  const current = (await kv.get("yesCount")) || 0;
  const updated = parseInt(current) + 1;
  await kv.set("yesCount", updated);

  return new Response(JSON.stringify({ success: true, count: updated }), {
    headers: { "Content-Type": "application/json" },
  });
};

