import type { Message , ChatApiResponse } from "../types/chat";

export const sendChatMessage = async (
  message: string
): Promise<Message> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ message }),
  });

  const data: ChatApiResponse =
    await response.json();

  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content: data.message,
    createdAt: new Date(),
  };
};