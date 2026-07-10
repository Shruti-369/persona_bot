import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function generateSummary(memory) {

    let conversation = "";

    memory.recentTurns.forEach((turn) => {

        conversation += `User: ${turn.user}\n`;
        conversation += `Assistant: ${turn.assistant}\n\n`;

    });

    const prompt = `
Previous Summary:

${memory.summary}

--------------------------------

Summarize the new conversation.

Rules:

- Keep important information only.
- Remove greetings.
- Remember promises.
- Remember relationship details.
- Remember user preferences.
- Remember plans.
- Maximum 200 words.

Conversation:

${conversation}
`;

    const response = await client.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: "system",
                content: "You are a memory summarizer."
            },
            {
                role: "user",
                content: prompt
            }
        ],

        max_tokens: 250

    });

    return response.choices[0].message.content;

}