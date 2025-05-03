import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  message?: string;
}

export function Loader({
  className,
  size = 24,
  message,
  ...props
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-6",
        className
      )}
      {...props}
    >
      <Loader2
        className="animate-spin text-muted-foreground"
        style={{ width: size, height: size }}
      />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}
