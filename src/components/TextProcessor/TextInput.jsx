/* eslint-disable react/prop-types */
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useEffect } from "react";

const TextInput = ({ value, onChange, onSend, loading, disabled }) => {
  const textareaRef = useRef(null);

  // Auto-resize function
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "80px";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 300)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className="flex flex-row gap-2 rounded-lg overflow-hidden border bg-card text-card-foreground shadow-sm">
      <Textarea
        ref={textareaRef}
        className="min-h-[80px] max-h-[300px] flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 overflow-auto"
        value={value}
        onChange={(e) => {
          onChange(e);
          adjustHeight();
        }}
        placeholder="Type your text here..."
        aria-label="Text input"
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.shiftKey) {
              return;
            }
            e.preventDefault();
            onSend();
          }
        }}
        aria-describedby="input-instructions"
      />
      <div className="flex items-end p-2">
        <Button
          onClick={onSend}
          disabled={loading || disabled}
          aria-label={loading ? "Sending message..." : "Send message"}
          className="rounded-full h-12 w-12"
          size="icon"
          title="Send message (Enter)"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
      <span id="input-instructions" className="sr-only">
        Press Enter to send message, Shift+Enter for new line
      </span>
    </div>
  );
};

export default TextInput;
