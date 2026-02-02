import OpenAI from "openai";

export const AI_MODEL = process.env.OPENAI_MODEL;

const newAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export default newAi;
