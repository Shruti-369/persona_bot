import fs from "fs";

const MEMORY_FILE = "./memory.json";

// Default Memory Structure
const DEFAULT_MEMORY = {
    summary: "",

    firstTurns: [],

    recentTurns: [],

    userProfile: {
        name: "",
        nickname: "",
        relationship: "",
        mood: "",
        likes: [],
        dislikes: [],
        hobbies: [],
        goals: [],
        importantFacts: [],
        promises: []
    }
};

// Load Memory
export function loadMemory() {

    try {

        if (!fs.existsSync(MEMORY_FILE)) {

            fs.writeFileSync(
                MEMORY_FILE,
                JSON.stringify(DEFAULT_MEMORY, null, 2)
            );

            return structuredClone(DEFAULT_MEMORY);
        }

        const data = fs.readFileSync(
            MEMORY_FILE,
            "utf-8"
        );

        return JSON.parse(data);

    }

    catch (err) {

        console.error("Error Loading Memory:", err);

        return structuredClone(DEFAULT_MEMORY);

    }

}

// Save Memory
export function saveMemory(memory) {

    try {

        fs.writeFileSync(

            MEMORY_FILE,

            JSON.stringify(memory, null, 2)

        );

    }

    catch (err) {

        console.error("Error Saving Memory:", err);

    }

}

// Reset Memory (Useful for testing)
export function resetMemory() {

    saveMemory(structuredClone(DEFAULT_MEMORY));

}

// Print Memory (Debugging)
export function printMemory() {

    console.log(

        JSON.stringify(loadMemory(), null, 2)

    );

}