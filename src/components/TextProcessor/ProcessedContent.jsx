/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

const ProcessedContent = ({ content, type }) => (
  <div
    className={cn(
      "mt-2 p-3 rounded-lg text-sm",
      type === "summary"
        ? "bg-blue-50 text-blue-800 border border-blue-100"
        : "bg-green-50 text-green-800 border border-green-100"
    )}
    role="region"
    aria-label={`${type === "summary" ? "Summary" : "Translation"} result`}
  >
    {content}
  </div>
);

export default ProcessedContent;
