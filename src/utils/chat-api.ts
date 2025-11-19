import axios from "axios";
import type { ChatOption } from "@/lib/chat-constants";

// Read from Vite environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://revival-chatbot-backend-production.up.railway.app/";

export type ChatResponse = {
  message?: string;
  data?: {
    id: string;
    role: "assistant" | "user";
    content: string;
    chatId: string;
  };
  options?: ChatOption[];
};

export type CategoryType = "sponsor" | "patient" | "physician" | "others";

export const chatAPI = {
  // Send a chat message with category (message can be null for initial category selection)
  sendMessage: async (
    chatId: string,
    message: string | null,
    category: CategoryType
  ): Promise<ChatResponse> => {
    try {
      if (!API_BASE_URL) {
        throw new Error(
          "VITE_API_URL is not defined. Set VITE_API_URL in your .env file."
        );
      }

      // POST to /api/chat/ directly (no extra /chat/)
      const response = await axios.post(API_BASE_URL, {
        messages: message,
        category: category,
        chatId: chatId,
      });

      return response.data as ChatResponse;
    } catch (error) {
      console.error("Error sending message:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
      throw error;
    }
  },

  // Get chat history
  getChatHistory: async (chatId: string): Promise<ChatResponse[]> => {
    try {
      if (!API_BASE_URL) {
        throw new Error(
          "VITE_API_URL is not defined. Set VITE_API_URL in your .env file."
        );
      }

      // GET from /api/chat/history/{chatId}
      const response = await axios.get(`${API_BASE_URL}/history/${chatId}`);

      return response.data as ChatResponse[];
    } catch (error) {
      console.error("Error fetching chat history:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      }
      throw error;
    }
  },
};
