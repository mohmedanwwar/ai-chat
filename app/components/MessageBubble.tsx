import type { Message } from "../types/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-white text-black"
            : "bg-zinc-800 text-white"
        }`}
      >
        <span className="mb-1 block text-xs text-zinc-400">
          {isUser ? "You" : "AI"}
        </span>
        
        <p>{message.content}</p>
      </div>
    </div>
  );
}