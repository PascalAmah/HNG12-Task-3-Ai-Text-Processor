/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";

const MessagesContainer = ({ messages, onSummarize, onTranslate, loading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea
      className="flex-1 px-4 py-4"
      role="log"
      aria-label="Message history"
    >
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg">No messages yet</p>
            <p className="text-sm mt-2">Type something to get started</p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onSummarize={onSummarize}
              onTranslate={onTranslate}
              loading={loading}
            />
          ))
        )}
        <div ref={messagesEndRef} tabIndex={-1} />
      </div>
    </ScrollArea>
  );
};

export default MessagesContainer;
