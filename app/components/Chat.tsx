"use client";

import { useState } from "react";
import type { Message } from "../types/chat";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! How can I help you?",
      createdAt: new Date(),
      avatar: "/avatar.png",

    },
  ]);

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

  const [chatState, setChatState] = useState<ChatState>({
    status: "idle",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");

  const fakeAIResponse = async (
      message: string
    ): Promise<string> => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

       if (message.toLowerCase().includes("error")) {
            throw new Error("AI request failed");
          }

      return `${message}`;
   };

  const handleSend = async () => {
    if (!input.trim()) return;

     setChatState({
        status: "loading",
      });

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    setMessages((currentMessages) => [
          ...currentMessages,
          newMessage,
        ]);

     setInput("");
     
     try {
       
        const response = await fakeAIResponse(
          newMessage.content
        );
    

      const aiResponse: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        createdAt: new Date(),
      };

        setMessages((currentMessages) => [
          ...currentMessages,
          aiResponse,
        ]);

        setChatState({
          status: "success",
        });

     }catch (error) {
        setChatState({
          status: "error",
          message: "Failed to get AI response.",
        });
      }
  
  };

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 p-4">
        <h1 className="text-lg font-semibold">
          AI Assistant
        </h1>

        <p className="text-sm text-zinc-400">
          Ask me anything
        </p>
      </header>

     
      <MessageList messages={messages} />

        {chatState.status === "loading" && (
          <div className="px-6 pb-4 text-sm text-zinc-400">
            AI is thinking...
          </div>
        )}


      <footer className="border-t border-zinc-800 p-4">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
        />
      </footer>
    </main>
  );
}