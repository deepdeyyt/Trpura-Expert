import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { TRIPURA_EXPERT_SYSTEM_PROMPT } from "../constants";

let chatSession: Chat | null = null;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async () => {
  try {
    const ai = getClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: TRIPURA_EXPERT_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return false;
  }
};

export const sendMessageToGemini = async (messageText: string, imageBase64?: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    throw new Error("Chat session could not be initialized.");
  }

  try {
    let response;
    
    if (imageBase64) {
      // Extract mimeType and base64 data
      // format: data:image/png;base64,iVBOR...
      const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
      let mimeType = 'image/jpeg';
      let data = imageBase64;

      if (matches && matches.length === 3) {
        mimeType = matches[1];
        data = matches[2];
      }

      // Construct multipart message
      const parts = [
        { text: messageText },
        {
          inlineData: {
            mimeType: mimeType,
            data: data
          }
        }
      ];
      
      response = await chatSession.sendMessage({ message: parts });
    } else {
      response = await chatSession.sendMessage({ message: messageText });
    }

    return response.text || "I apologize, but I could not generate a response.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};