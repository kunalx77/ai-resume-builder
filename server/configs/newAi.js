import OpenAI from "openai";

// Warn instead of crashing if env is missing
if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠️ OPENAI_API_KEY not configured. AI features disabled.");
}

const newAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default newAi;
