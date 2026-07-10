import { useState } from "react";
import type { TypingState } from "@/types/typing";

interface UseTypingTestOptions {
  words: string[];
}

interface UseTypingTestResult {
  state: TypingState;
  start: () => void;
  typeCharacter: (character: string) => void;
}

function getTargetText(words: string[]): string {
  return words.join(" ");
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

      const targetText = getTargetText(currentState.words);

      if (currentState.currentCharacterIndex >= targetText.length) {
        return currentState;
      }

      const expectedCharacter = targetText[currentState.currentCharacterIndex];

      const isMistake = character !== expectedCharacter;

      return {
        ...currentState,
        status: currentState.status === "idle" ? "running" : currentState.status,
        typedText: currentState.typedText + character,
        currentCharacterIndex: currentState.currentCharacterIndex + 1,
        mistakes: currentState.mistakes + (isMistake ? 1 : 0),
      };
    });
  }

  return {
    state,
    start,
    typeCharacter,
  };
}
