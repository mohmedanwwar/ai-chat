import { useEffect, useRef, useState } from "react";

import type {Message} from "../types/chat";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
}

const NEAR_BOTTOM_THRESHOLD = 100;

export default function MessageList({
  messages,
}: MessageListProps) {
  const containerRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  // Tracks whether the user is stuck to the bottom, based only on their own
  // scroll actions. Recomputing this from live scrollHeight on every new
  // message would race with the scroll-into-view animation: a burst of fast
  // messages grows the content before the animation catches up, making a
  // still-anchored user look "scrolled away" and stranding the button on.
  const isStuckToBottomRef = useRef(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const isNearBottom = () => {
    const container = containerRef.current;
    if (!container) return true;

    return (
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      NEAR_BOTTOM_THRESHOLD
    );
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isStuckToBottomRef.current) {
      scrollToBottom("instant");
      setShowScrollButton(false);
    } else {
      setShowScrollButton(true);
    }
  }, [messages]);

  const handleScroll = () => {
    isStuckToBottomRef.current = isNearBottom();
    setShowScrollButton(!isStuckToBottomRef.current);
  };

  return (
    <section
      ref={containerRef}
      onScroll={handleScroll}
      className="relative flex-1 space-y-4 overflow-y-auto p-6"
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      <div ref={bottomRef} />

      {showScrollButton && (
        <button
          type="button"
          aria-label="Scroll to bottom"
          onClick={() => {
            isStuckToBottomRef.current = true;
            setShowScrollButton(false);
            scrollToBottom();
          }}
          className="fixed bottom-24 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg hover:bg-zinc-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </button>
      )}
    </section>
  );
}