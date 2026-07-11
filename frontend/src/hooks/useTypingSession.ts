import { useCallback, useMemo } from "react";
import { useTimer } from "@/hooks/useTimer";
import { useTypingTest } from "@/hooks/useTypingTest";
import { calculateTypingStats } from "@/utils/calculateStats";
import { getTargetText } from "@/utils/typing";

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

  const targetText = getTargetText(state.words);
  const elapsedSeconds = duration - timer.timeRemaining;

  const stats = useMemo(
    () => calculateTypingStats(targetText, state.typedText, elapsedSeconds),
    [elapsedSeconds, state.typedText, targetText],
  );

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
    stats,
    timeRemaining: timer.timeRemaining,
    isTimerRunning: timer.isRunning,
    typeCharacter,
    reset,
  };
}
