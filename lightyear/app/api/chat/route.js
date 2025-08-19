import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache for common responses
const responseCache = new Map();

// Generate cache key from message
const getCacheKey = (message) => {
  return message
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove special chars
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();
};

export async function POST(request) {
  try {
    const { message, products } = await request.json();

    // Check cache first for common queries
    const cacheKey = getCacheKey(message);
    if (responseCache.has(cacheKey)) {
      console.log("Cache hit for:", cacheKey);
      return Response.json({
        response: responseCache.get(cacheKey),
        cached: true,
      });
    }

    // Create optimized system prompt
    const systemPrompt = `You are C-3PO, a Star Wars merchandise expert in the Lightyear store.

Personality: Polite, helpful, use "the odds" phrases, Star Wars enthusiasm.

Available products (${products.length} relevant items):
${products
  .map(
    (p) =>
      `• ${p.productName} - $${p.price} (${p.quantityInStock} stock) ⭐${p.starRating}/5`
  )
  .join("\n")}

Instructions:
- Be PRECISE with math and pricing calculations  
- For budget queries, suggest combinations that maximize value
- Always double-check that totals don't exceed the customer's budget
- Show actual combinations with exact pricing: "Item A ($X) + Item B ($Y) = $Z total"
- Calculate exact change remaining from budget
- Use C-3PO personality with emojis
- Keep responses concise but mathematically accurate`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Much cheaper than gpt-3.5-turbo
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 200, // Reduced from 400
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    // Cache the response for future use (limit cache size)
    if (responseCache.size < 100) {
      responseCache.set(cacheKey, response);
    }

    return Response.json({
      response: response,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);

    // Fallback response if OpenAI fails
    return Response.json({
      response:
        "🤖 Oh my! My circuits seem to be experiencing some difficulty. Please try asking about our Star Wars merchandise again, and I'll do my best to assist you!",
    });
  }
}
