import { BF_PERSONA } from "./persona.js";
import { searchMemory } from "./memorySearch.js";
import { personalities } from "./personalities.js";

export function buildPrompt(memory, userMessage) {

    const randomPersonality =

        personalities[
        Math.floor(
            Math.random() * personalities.length
        )
        ];

    const messages = [];

    // =============================
    // Persona
    // =============================

    messages.push({

        role: "system",

        content: PERSONALITIES[
            memory.currentPersonality
        ]

    });

    // =============================
    // Conversation Summary
    // =============================

    if (memory.summary.trim() !== "") {

        messages.push({

            role: "system",

            content:
                `Conversation Summary:\n${memory.summary}`

        });

    }

    // =============================
    // User Profile
    // =============================

    messages.push({

        role: "system",

        content:
            `User Profile:\n${JSON.stringify(memory.userProfile, null, 2)}`

    });

    // =============================
    // Relevant Memories
    // =============================

    const relevantTurns = searchMemory(
        memory,
        userMessage
    );

    if (relevantTurns.length > 0) {

        let relevantText = "";

        relevantTurns.forEach(turn => {

            relevantText +=

                `User: ${turn.user}\n`;

            relevantText +=

                `Assistant: ${turn.assistant}\n\n`;

        });

        messages.push({

            role: "system",

            content:
                `Relevant Past Conversations:\n\n${relevantText}`

        });

    }

    // =============================
    // Recent Conversation
    // =============================

    memory.recentTurns.forEach(turn => {

        messages.push({

            role: "user",

            content: turn.user

        });

        messages.push({

            role: "assistant",

            content: turn.assistant

        });

    });

    // =============================
    // Current User Message
    // =============================

    messages.push({

        role: "user",

        content: userMessage

    });

    return messages;

}