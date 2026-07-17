import { useCallback, useState } from "react";
import { words } from "@/data/words";
import { useTypingSession } from "@/hooks/useTypingSession";
import { generateWords } from "@/utils/generateWords";
import { getWordCountForDuration } from "@/utils/getWordCountForDuration";
import { getTargetText } from "@/utils/typing";

const DEFAULT_DURATION = 30;

function createWords(duration: number) {
  return generateWords(words, getWordCountForDuration(duration));
}

export function useTypingGame() {
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [generatedWords, setGeneratedWords] = useState(() => createWords(DEFAULT_DURATION));

  const session = useTypingSession({ words: generatedWords, duration });
  const { state, reset } = session;

  const changeDuration = useCallback(
    (nextDuration: number) => {
      if (state.status !== "idle") {
        return;
      }

      setDuration(nextDuration);
      setGeneratedWords(createWords(nextDuration));
      reset(nextDuration);
    },
    [reset, state.status],
  );

  const restart = useCallback(() => {
    setGeneratedWords(createWords(duration));
    reset();
  }, [duration, reset]);

  return {
    duration,
    targetText: getTargetText(state.words),
    changeDuration,
    restart,
    ...session,
  };
}
