"use client";

import ErrorReporter from "@/components/ErrorReporter";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return <ErrorReporter error={error} reset={reset} />;
}
