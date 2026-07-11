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
    deleteCharacter: deleteTestCharacter,
    reset: resetTypingTest,
  } = useTypingTest({ words });

  const handleTimerComplete = useCallback(() => {
    finish();
  }, [finish]);

  const {
    timeRemaining,
    isRunning: isTimerRunning,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  } = useTimer({
    duration,
    onComplete: handleTimerComplete,
  });

  const targetText = useMemo(() => getTargetText(state.words), [state.words]);

  const elapsedSeconds = duration - timeRemaining;

  const stats = useMemo(
    () => calculateTypingStats(targetText, state.typedText, elapsedSeconds),
    [elapsedSeconds, state.typedText, targetText],
  );

  const typeCharacter = useCallback(
    (character: string) => {
      if (state.status === "finished") {
        return;
      }

      if (state.status === "idle") {
        startTimer();
      }

      const isFinalCharacter = state.currentCharacterIndex === targetText.length - 1;

      if (isFinalCharacter) {
        stopTimer();
      }

      typeTestCharacter(character);
    },
    [
      startTimer,
      state.currentCharacterIndex,
      state.status,
      stopTimer,
      targetText.length,
      typeTestCharacter,
    ],
  );

  const deleteCharacter = useCallback(() => {
    if (state.status === "finished") {
      return;
    }

    deleteTestCharacter();
  }, [deleteTestCharacter, state.status]);

  const reset = useCallback(
    (nextDuration?: number) => {
      stopTimer();
      resetTypingTest();
      resetTimer(nextDuration);
    },
    [resetTimer, resetTypingTest, stopTimer],
  );

  return {
    state,
    stats,
    timeRemaining,
    isTimerRunning,
    typeCharacter,
    deleteCharacter,
    reset,
  };
}
