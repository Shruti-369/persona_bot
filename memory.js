import fs from "fs";

const FILE = "./memory.json";

export function loadMemory() {

    if (!fs.existsSync(FILE)) {

        return {
            summary: "",
            firstConversations: [],
            recentConversations: [],
        };

    }

    return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

export function saveMemory(memory) {

    fs.writeFileSync(
        FILE,
        JSON.stringify(memory, null, 4)
    );

}