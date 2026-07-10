import type { TypingState } from "@/types/typing";
import { useState } from "react";

interface UseTypingTestOptions {
  words: string[];
}

interface UseTypingTestResult {
  state: TypingState;
}

export function useTypingTest({ words }: UseTypingTestOptions): UseTypingTestResult {
  const [state] = useState<TypingState>({
    status: "idle",
    words,
    typedText: "",
    currentWordIndex: 0,
    currentCharacterIndex: 0,
    mistakes: 0,
  });

  return {
    state,
  };
}
