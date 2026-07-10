import type { TypingState } from "@/types/typing";
import { useState } from "react";

interface UseTypingTestOptions {
  words: string[];
}

interface UseTypingTestResult {
  state: TypingState;
  start: () => void;
  typeCharacter: (character: string) => void;
}

export function useTypingTest({ words }: UseTypingTestOptions): UseTypingTestResult {
  const [state, setState] = useState<TypingState>({
    status: "idle",
    words,
    typedText: "",
    currentWordIndex: 0,
    currentCharacterIndex: 0,
    mistakes: 0,
  });

  function start() {
    setState((currentState) => {
      if (currentState.status !== "idle") {
        return currentState;
      }

      return {
        ...currentState,
        status: "running",
      };
    });
  }

  function typeCharacter(character: string) {
    if (character.length !== 1) {
      return;
    }

    setState((currentState) => {
      if (currentState.status === "finished") {
        return currentState;
      }

      return {
        ...currentState,
        status: currentState.status === "idle" ? "running" : currentState.status,
        typedText: currentState.typedText + character,
        currentCharacterIndex: currentState.currentCharacterIndex + 1,
      };
    });
  }

  return {
    state,
    start,
    typeCharacter,
  };
}
