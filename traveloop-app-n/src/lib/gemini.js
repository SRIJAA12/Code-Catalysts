import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY
);

export async function askGemini(prompt) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const result = await model.generateContent(prompt);

        return result.response.text();
    } catch (error) {
        console.error(error);
        return "Something went wrong.";
    }
}