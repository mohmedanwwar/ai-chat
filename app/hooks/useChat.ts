"use client";

import { useState } from "react";
import type { Message } from "../types/chat";
import { sendChatMessage } from "../services/chatApi";

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
      const aiMessage = await sendChatMessage(content);

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