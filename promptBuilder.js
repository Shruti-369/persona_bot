import { BF_PERSONA } from "./persona.js";

export function buildPrompt(memory, userMessage) {

    const messages = [];

    // System Prompt
    messages.push({
        role: "system",
        content: BF_PERSONA,
    });

    // Summary
    if (memory.summary) {
        messages.push({
            role: "system",
            content: `Conversation Summary:\n${memory.summary}`,
        });
    }

    // First Turns
    memory.firstTurns.forEach(turn => {

        messages.push({
            role: "user",
            content: turn.user,
        });

        messages.push({
            role: "assistant",
            content: turn.assistant,
        });

    });

    // Recent Turns
    memory.recentTurns.forEach(turn => {

        messages.push({
            role: "user",
            content: turn.user,
        });

        messages.push({
            role: "assistant",
            content: turn.assistant,
        });

    });

    // Current User Message
    messages.push({
        role: "user",
        content: userMessage,
    });

    return messages;
}