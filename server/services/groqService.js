import Groq from "groq-sdk";

export const getAIInsight = async (data) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const products = data.products || [];
  const orders = data.orders || [];

  const summary = {
    totalProducts: products.length,
    totalOrders: orders.length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock < 5).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    categories: [...new Set(products.map((p) => p.category))],
    totalRevenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
  };

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You are an elite ecommerce business intelligence AI.

Rules:
- Be precise and data-driven
- Avoid guessing
- Use structured insights
- Keep output short and dashboard-ready
        `,
      },
      {
        role: "user",
        content: `
Analyze this business data:

${JSON.stringify(summary, null, 2)}

Return:
1. Key insights (3 bullets)
2. Risks (2 bullets)
3. Growth suggestions (3 bullets)
        `,
      },
    ],
  });

  return completion.choices[0]?.message?.content || "";
};