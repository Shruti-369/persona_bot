export function buildPrompt(memory, userMessage) {
    const messages = [];

    messages.push({
        role: "system",
        content: BF_PERSONA
    });

}