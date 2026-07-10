import fs from "fs";

const FILE = "./memory.json";

export function loadMemory() {
    if (!fs.existsSync(FILE)) {
        return {
            summary: "",
            firstMessages: [],
            recentMessages: [],
        };
    }

    return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

export function saveMemory(memory) {
    fs.writeFileSync(FILE, JSON.stringify(memory, null, 2));
}