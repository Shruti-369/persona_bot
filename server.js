import express from "express";
import cors from "cors";

import { callLLM } from "./llm.js";
import { loadMemory, saveMemory } from "./memory.js";

const app = express();

app.use(cors());
app.use(express.json());

const memory = loadMemory();

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message || typeof message !== "string") {

            return res.status(400).json({
                error: "message is required"
            });

        }

        //--------------------------------------------------
        // Convert conversations into OpenAI history format
        //--------------------------------------------------

        const history = [];

        for (const convo of memory.firstConversations) {

            history.push({
                role: "user",
                content: convo.user
            });

            history.push({
                role: "assistant",
                content: convo.assistant
            });

        }

        for (const convo of memory.recentConversations) {

            history.push({
                role: "user",
                content: convo.user
            });

            history.push({
                role: "assistant",
                content: convo.assistant
            });

        }

        //--------------------------------------------------

        const reply = await callLLM(message, history);

        const conversation = {

            user: message,

            assistant: reply

        };

        //--------------------------------------------------

        if (memory.firstConversations.length < 10) {

            memory.firstConversations.push(conversation);

        }

        else {

            memory.recentConversations.push(conversation);

        }

        while (memory.recentConversations.length > 20) {

            memory.recentConversations.shift();

        }

        saveMemory(memory);

        //--------------------------------------------------

        res.json({

            reply

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            error: "Something went wrong"

        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on ${PORT}`);

});