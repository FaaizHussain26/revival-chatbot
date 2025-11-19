"use client";

import { ChatOption, INITIAL_MESSAGE } from "@/lib/chat-constants";

import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SendIcon } from "../ui/send-icon";
import InitialOptions from "./initial-options";
import TypingIndicator from "./typing-indicator";
import { CategoryType, chatAPI } from "@/utils/chat-api";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  category?: CategoryType;
  options?: ChatOption[];
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGE);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping || !chatId || !currentCategory) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      category: currentCategory,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setIsTyping(true);

    try {
      const response = await chatAPI.sendMessage(
        chatId,
        input.trim(),
        currentCategory
      );

      setIsTyping(false);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          response?.data?.content ||
          "Thank you for your message. How can I assist you further?",
        category: currentCategory,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        category: currentCategory,
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleOptionClick = async (option: ChatOption) => {
    if (isTyping) return;

    const category = option.value as CategoryType;
    setCurrentCategory(category);

    // Add user message showing the selected option
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: option.text,
      category: category,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Send null message with only category
      const response = await chatAPI.sendMessage(chatId, null, category);

      setIsTyping(false);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          response?.message ||
          `You selected: ${option.text}. I'm here to help you with that.`,
        category: category,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error selecting option:", error);
      setIsTyping(false);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        category: category,
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = "Today";

  const isInputEmpty = !input.trim();

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-4 py-3 border-b border-border text-sm text-muted-foreground flex justify-between items-center">
        {currentCategory && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            You selected{" "}
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </span>
        )}

        <span>
          {dateStr}, {timeStr}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "assistant" ? (
              <div className="flex gap-3 items-start animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center flex-shrink-0 shadow-none">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="border border-border rounded-3xl px-4 py-3 text-foreground whitespace-pre-line text-sm leading-relaxed max-w-lg">
                    {message.content}
                  </div>
                  {message.options && (
                    <InitialOptions
                      options={message.options}
                      onOptionClick={handleOptionClick}
                      isDisabled={isTyping}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="bg-primary rounded-3xl px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-white whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-background">
        <div className="flex items-center gap-2 bg-background border border-border rounded-2xl px-4 py-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your message here..."
            className="flex-1 border-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 resize-none overflow-hidden text-sm focus:outline-none"
            rows={1}
            style={{ minHeight: "24px", maxHeight: "120px" }}
            disabled={isTyping || !currentCategory}
          />

          <button
            onClick={handleSend}
            disabled={isInputEmpty || isTyping || !currentCategory}
            className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
              isInputEmpty || isTyping || !currentCategory
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 cursor-pointer"
            }`}
          >
            <SendIcon className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}
