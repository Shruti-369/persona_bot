import express from "express";
import cors from "cors";
import { callLLM } from "./llm.js";

const app = express();
app.use(cors());
app.use(express.json());

const memory = {
    firstMessages: [],
    recentMessages: [],
    summary: ""
};

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "message is required" });
        }

        if (memory.firstMessages.length < 10) {
            memory.firstMessages.push({
                role: "user",
                content: message,
            });
        } else {
            memory.recentMessages.push({
                role: "user",
                content: message,
            });
        }

        // history should be an array of { role: "user"|"assistant", content: string }
        const safeHistory = Array.isArray(history) ? history.slice(-20) : [];

        const history = [
            ...memory.firstMessages,
            ...memory.recentMessages,
        ];

        const reply = await callLLM(message, history);

        if (memory.firstMessages.length <= 10) {
            memory.firstMessages.push({
                role: "assistant",
                content: reply,
            });
        } else {
            memory.recentMessages.push({
                role: "assistant",
                content: reply,
            });
        }

        if (memory.recentMessages.length > 20) {
            memory.recentMessages.shift();
        }

        const aiMessage = {
            role: "assistant",
            content: reply,
        };

        if (memory.firstMessages.length < 10) {
            memory.firstMessages.push(aiMessage);
        } else {
            memory.recentMessages.push(aiMessage);
        }

        if (memory.recentMessages.length > 20) {
            memory.recentMessages.shift();
        }

        res.json({ reply });
    } catch (err) {
        console.error("Chat error:", err.message);
        res.status(500).json({ error: "Something went wrong. Try again." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bf_bot server running on http://localhost:${PORT}`);
});