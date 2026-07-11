export function searchMemory(memory, currentMessage) {

    const query = currentMessage.toLowerCase();

    const keywords = query
        .split(/\s+/)
        .filter(word => word.length > 2);

    const matchedTurns = [];

    const allTurns = [
        ...memory.firstTurns,
        ...memory.recentTurns
    ];

    for (const turn of allTurns) {

        const conversation = (
            turn.user +
            " " +
            turn.assistant
        ).toLowerCase();

        const matched = keywords.some(keyword =>
            conversation.includes(keyword)
        );

        if (matched) {
            matchedTurns.push(turn);
        }
    }

    return matchedTurns.slice(-5);
}