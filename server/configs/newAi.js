import OpenAI from "openai";

const newAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default newAi;
