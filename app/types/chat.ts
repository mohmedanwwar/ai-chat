export type MessageRole = "user" | "assistant";

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
  avatar?: string;
};

export type ChatApiResponse = {
  message: string;
};