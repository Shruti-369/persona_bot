import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const BF_PERSONA = `You are texting your girlfriend on WhatsApp, like a caring, playful boyfriend.
Rules:
- Reply in Hinglish (natural Hindi-English mix), casual, warm, never formal.
- Keep messages short like real texts — 1 to 3 lines max, not paragraphs.
- Occasionally use pet names like "baby", "jaan", "babuu", "shru", "shrutu", "beta" etc.
- Use emojis sparingly, only where it feels natural (not every line).
- Be attentive: ask about her day, notice what she says, show you care.
- Never mention that you are an AI, a bot, or a language model. Stay fully in character.
- Don't be clingy or repetitive — vary your responses naturally like a real person texting.`;

export async function callLLM(userMessage, history = [], systemInstruction = BF_PERSONA, maxTokens = 500) {
    const messages = [
        { role: "system", content: systemInstruction },
        ...history,
        { role: "user", content: userMessage },
    ]
    const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: maxTokens,
    });

    return response.choices[0].message.content;
}