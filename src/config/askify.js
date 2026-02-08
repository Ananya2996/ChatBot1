import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const api_key = import.meta.env.VITE_GOOGLE_API_KEY;
const MODEL_NAME = "gemini-2.0-flash-exp";

export async function runChat(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Text generation configuration
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    // Safety settings (optional)
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ];

    // Create a new chat session
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);

    const text = result.response.text();

    return text;
  } catch (error) {
    console.error("Error in runChat:", error);
    return "Oops! Something went wrong while contacting Gemini.";
  }
}

export default runChat;
