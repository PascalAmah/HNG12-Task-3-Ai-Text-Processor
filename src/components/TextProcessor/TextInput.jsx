/* eslint-disable react/prop-types */
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const TextInput = ({ value, onChange, onSend, loading, disabled }) => (
  <div className="flex flex-row gap-2 rounded-lg overflow-hidden border bg-card text-card-foreground shadow-sm">
    <Textarea
      className="min-h-[80px] flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      value={value}
      onChange={onChange}
      placeholder="Type your text here..."
      aria-label="Text input"
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.ctrlKey) {
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
        title="Send message (Ctrl + Enter)"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </div>
    <span id="input-instructions" className="sr-only">
      Press Ctrl + Enter to send message
    </span>
  </div>
);

export default TextInput;
