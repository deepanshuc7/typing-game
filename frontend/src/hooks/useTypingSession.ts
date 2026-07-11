import { useCallback } from "react";
import { useTimer } from "@/hooks/useTimer";
import { useTypingTest } from "@/hooks/useTypingTest";

interface UseTypingSessionOptions {
  words: string[];
  duration: number;
}

export function useTypingSession({ words, duration }: UseTypingSessionOptions) {
  const {
    state,
    finish,
    typeCharacter: typeTestCharacter,
    reset: resetTypingTest,
  } = useTypingTest({ words });

  const handleTimerComplete = useCallback(() => {
    finish();
  }, [finish]);

  const timer = useTimer({
    duration,
    onComplete: handleTimerComplete,
  });

  function typeCharacter(character: string) {
    if (state.status === "finished") {
      return;
    }

    if (state.status === "idle") {
      timer.start();
    }

    typeTestCharacter(character);
  }

  function reset() {
    resetTypingTest();
    timer.reset();
  }

  return {
    state,
    timeRemaining: timer.timeRemaining,
    isTimerRunning: timer.isRunning,
    typeCharacter,
    reset,
  };
}
