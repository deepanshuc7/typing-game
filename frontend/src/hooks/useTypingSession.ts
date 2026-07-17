import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTimer } from "@/hooks/useTimer";
import { useTypingTest } from "@/hooks/useTypingTest";
import type { TypingSample } from "@/types/typing";
import { calculateTypingStats } from "@/utils/calculateStats";
import { createTypingSample } from "@/utils/createTypingSample";
import { getTargetText } from "@/utils/typing";

interface UseTypingSessionOptions {
  words: string[];
  duration: number;
}

export function useTypingSession({ words, duration }: UseTypingSessionOptions) {
  const [samples, setSamples] = useState<TypingSample[]>([]);

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

  const sampleContextRef = useRef({ targetText: "", typedText: "", mistakes: 0 });

  const handleTimerTick = useCallback(
    (nextTimeRemaining: number) => {
      const elapsedSeconds = duration - nextTimeRemaining;
      const { targetText, typedText, mistakes } = sampleContextRef.current;
      const sample = createTypingSample(targetText, typedText, elapsedSeconds, mistakes);

      setSamples((currentSamples) => [...currentSamples, sample]);
    },
    [duration],
  );

  const {
    timeRemaining,
    isRunning: isTimerRunning,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  } = useTimer({
    duration,
    onComplete: handleTimerComplete,
    onTick: handleTimerTick,
  });

  const targetText = useMemo(() => getTargetText(state.words), [state.words]);

  useEffect(() => {
    sampleContextRef.current = {
      targetText,
      typedText: state.typedText,
      mistakes: state.mistakes,
    };
  }, [state.mistakes, state.typedText, targetText]);

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

        const finalSample = createTypingSample(
          targetText,
          state.typedText + character,
          elapsedSeconds,
          state.mistakes + (character === targetText[state.currentCharacterIndex] ? 0 : 1),
        );

        setSamples((currentSamples) => {
          const lastSample = currentSamples.at(-1);

          return lastSample?.second === elapsedSeconds
            ? [...currentSamples.slice(0, -1), finalSample]
            : [...currentSamples, finalSample];
        });
      }

      typeTestCharacter(character);
    },
    [
      startTimer,
      elapsedSeconds,
      state.mistakes,
      state.currentCharacterIndex,
      state.typedText,
      state.status,
      stopTimer,
      targetText,
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
      setSamples([]);
    },
    [resetTimer, resetTypingTest, stopTimer],
  );

  return {
    state,
    stats,
    samples,
    timeRemaining,
    isTimerRunning,
    typeCharacter,
    deleteCharacter,
    reset,
  };
}
