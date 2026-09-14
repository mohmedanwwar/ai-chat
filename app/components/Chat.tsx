"use client";

import { useState } from "react";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

import useChat from "../hooks/useChat";

export default function Chat() {
  const {
    messages,
    chatState,
    sendMessage,
  } = useChat();

  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    await sendMessage(input);
    setInput("");
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

      {chatState.status === "error" && (
        <div className="px-6 pb-4 text-sm text-red-400">
          {chatState.message}
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