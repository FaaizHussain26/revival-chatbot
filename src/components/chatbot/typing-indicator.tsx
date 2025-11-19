import { Sparkles } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center flex-shrink-0 shadow-none mr-3">
        <Sparkles className="w-4 h-4 text-primary" />
      </div>
      <div className="flex items-center justify-center gap-1 bg-muted rounded-2xl px-4 py-3">
        <div
          className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: "0ms", animationDuration: "1s" }}
        />
        <div
          className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: "150ms", animationDuration: "1s" }}
        />
        <div
          className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: "300ms", animationDuration: "1s" }}
        />
      </div>
    </div>
  );
}
