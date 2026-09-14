"use client";

import { useState } from "react";
import type { Message } from "../types/chat";

type ChatState =
  | {
      status: "idle";
    }
  | {
      status: "loading";
    }
  | {
      status: "success";
    }
  | {
      status: "error";
      message: string;
    };

const fakeAIResponse = async (
  message: string
): Promise<string> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  if (message.toLowerCase().includes("error")) {
    throw new Error("AI request failed");
  }

  return `You said: ${message}`;
};

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! How can I help you?",
      createdAt: new Date(),
    },
  ]);

  const [chatState, setChatState] = useState<ChatState>({
    status: "idle",
  });

  const sendMessage = async (
    content: string
  ): Promise<void> => {
    if (!content.trim()) return;

    setChatState({
      status: "loading",
    });

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    try {
      const response = await fakeAIResponse(content);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        createdAt: new Date(),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        aiMessage,
      ]);

      setChatState({
        status: "success",
      });
    } catch {
      setChatState({
        status: "error",
        message: "Failed to get AI response",
      });
    }
  };

  return {
    messages,
    chatState,
    sendMessage,
  };
}