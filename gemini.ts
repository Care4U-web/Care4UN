
import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Care4U AI Assistant", a virtual extension of the University Medical Center. 
Your goal is to provide supportive, professional, and clear health guidance to students who are feeling unwell, primarily with common colds and flu.

Guidelines:
1. Always maintain a calm, trustworthy, and caring tone (consistent with Teal Green/White visual identity of the Care4U keychain).
2. Help students recognize symptoms of cold vs. flu based on university health protocols.
3. Provide evidence-based self-care advice: emphasize hydration (2-3L water), rest (8-10h sleep), and soft nutrition (ginger-based soups, citrus fruits).
4. CRITICAL EMERGENCY PROTOCOL: If a student mentions severe symptoms (high fever over 103F/39.5C, chest pain, confusion, persistent vomiting, difficulty breathing, bluish lips), immediately output a prominent warning to contact university emergency services or go to the nearest ER.
5. Remind users you are an AI assistant and they must consult university medical staff for formal clinical diagnoses.
6. Keep responses formatted with bullet points for readability on mobile devices.
`;

export class GeminiService {
  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private async getChatSession(): Promise<Chat> {
    if (!this.chatSession) {
      this.chatSession = this.ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    }
    return this.chatSession;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const chat = await this.getChatSession();
      const result = await chat.sendMessage({ message });
      return result.text || "I'm sorry, I'm having trouble processing that right now. Please try again or visit the campus clinic.";
    } catch (error) {
      console.error("Care4U AI Error:", error);
      return "Connection to University Health Cloud interrupted. For urgent matters, please visit the medical center directly.";
    }
  }
}

export const geminiService = new GeminiService();
