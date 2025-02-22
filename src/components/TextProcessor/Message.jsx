/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import MessageActions from "./MessageActions";
import ProcessedContent from "./ProcessedContent";
import { LANGUAGES } from "@/constants/language";

const Message = ({ message, onSummarize, onTranslate, loading }) => (
  <Card className="group overflow-hidden hover:shadow-md transition-shadow duration-200">
    <CardContent className="p-4 space-y-2">
      <p className="text-lg leading-relaxed">{message.text}</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          Detected Language:{" "}
          <span className="font-medium">
            {LANGUAGES.find((l) => l.code === message.language)?.name ||
              message.language}
          </span>
        </span>
      </div>

      <MessageActions
        message={message}
        onSummarize={() => onSummarize(message.id)}
        onTranslate={(lang) => onTranslate(message.id, lang)}
        loading={loading}
      />

      {message.processed.map((proc, idx) => (
        <ProcessedContent key={idx} content={proc.content} type={proc.type} />
      ))}
    </CardContent>
  </Card>
);

export default Message;
