/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const ErrorDisplay = ({ error, onDismiss }) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, onDismiss]);

  if (!error) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-4 px-4">
      <Alert
        variant="destructive"
        className="mx-auto max-w-3xl animate-in fade-in slide-in-from-top-5 duration-300"
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
    </div>
  );
};

export default ErrorDisplay;
