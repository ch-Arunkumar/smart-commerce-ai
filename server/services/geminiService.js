import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIInsight = async (data) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
You are a smart business analyst AI.

Analyze this ecommerce data:

${JSON.stringify(data)}

Give:
1. Sales insight
2. Inventory insight
3. 3 business suggestions
Keep it short and professional.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
};