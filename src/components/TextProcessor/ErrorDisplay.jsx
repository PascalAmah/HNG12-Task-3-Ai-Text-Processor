/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const ErrorDisplay = ({ error, onDismiss }) =>
  error ? (
    <Alert
      variant="destructive"
      className="mx-auto max-w-3xl mb-4 animate-in fade-in slide-in-from-top-5 duration-300"
      role="alert"
    >
      <AlertDescription className="flex items-center justify-between">
        <span>{error}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="h-4 w-4 hover:bg-red-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  ) : null;

export default ErrorDisplay;
