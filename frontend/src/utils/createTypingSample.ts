import type { TypingSample } from "@/types/typing";
import { calculateTypingStats, calculateWpm } from "@/utils/calculateStats";

export function createTypingSample(
  targetText: string,
  typedText: string,
  elapsedSeconds: number,
  mistakes: number,
): TypingSample {
  const stats = calculateTypingStats(targetText, typedText, elapsedSeconds);

  return {
    second: elapsedSeconds,
    wpm: stats.wpm,
    rawWpm: calculateWpm(stats.totalCharacters, elapsedSeconds),
    accuracy: stats.accuracy,
    mistakes,
  };
}
