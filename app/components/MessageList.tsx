import type {Message} from "../types/chat";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({
  messages,
}: MessageListProps) {
  return (
    <section className="flex-1 space-y-4 overflow-y-auto p-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}
    </section>
  );
}