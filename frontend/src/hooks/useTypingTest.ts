import { useState, useCallback } from "react";
import type { TypingState } from "@/types/typing";
import { getTargetText, isCorrectCharacter } from "@/utils/typing";

interface UseTypingTestOptions {
  words: string[];
}

interface UseTypingTestResult {
  state: TypingState;
  start: () => void;
  finish: () => void;
  typeCharacter: (character: string) => void;
  reset: () => void;
}

function createInitialState(words: string[]): TypingState {
  return {
    status: "idle",
    words,
    typedText: "",
    currentWordIndex: 0,
    currentCharacterIndex: 0,
    mistakes: 0,
  };
}

export function useTypingTest({ words }: UseTypingTestOptions): UseTypingTestResult {
  const [state, setState] = useState<TypingState>(() => createInitialState(words));

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

      const isMistake = !isCorrectCharacter(expectedCharacter, character);

      const completedSeparator = expectedCharacter === " " && character === expectedCharacter;

      return {
        ...currentState,
        status: currentState.status === "idle" ? "running" : currentState.status,
        typedText: currentState.typedText + character,
        currentWordIndex: currentState.currentWordIndex + (completedSeparator ? 1 : 0),
        currentCharacterIndex: currentState.currentCharacterIndex + 1,
        mistakes: currentState.mistakes + (isMistake ? 1 : 0),
      };
    });
  }

  const finish = useCallback(() => {
    setState((currentState) => {
      if (currentState.status === "finished") {
        return currentState;
      }

      return {
        ...currentState,
        status: "finished",
      };
    });
  }, []);

  function reset() {
    setState(createInitialState(words));
  }

  return {
    state,
    start,
    finish,
    typeCharacter,
    reset,
  };
}
