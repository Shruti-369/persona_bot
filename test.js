import { callLLM } from "./llm.js";

const result = await callLLM("Write a witty dev bio for a Tinder-style profile");
console.log(result);
console.log("Key loaded:", process.env.GROQ_API_KEY);