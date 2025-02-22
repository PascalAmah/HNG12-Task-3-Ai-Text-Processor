/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/constants/language";

const MessageActions = ({ message, onSummarize, onTranslate, loading }) => (
  <div
    className="flex flex-wrap items-center gap-2 mt-2"
    role="group"
    aria-label="Message actions"
  >
    {message.text.length > 150 && message.language === "en" && (
      <Button
        onClick={onSummarize}
        disabled={loading}
        aria-label="Summarize text"
        variant="secondary"
        size="sm"
        className="rounded-full"
      >
        Summarize
      </Button>
    )}

    <Select onValueChange={onTranslate} disabled={loading}>
      <SelectTrigger
        className="w-32 rounded-full"
        aria-label="Select translation language"
      >
        <SelectValue placeholder="Translate" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            aria-label={`Translate to ${lang.name}`}
          >
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default MessageActions;
