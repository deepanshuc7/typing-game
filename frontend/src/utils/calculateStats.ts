import type { TypingStats } from "@/types/typing";

export function calculateCorrectCharacters(targetText: string, typedText: string): number {
  return typedText.split("").reduce((total, character, index) => {
    return total + (character === targetText[index] ? 1 : 0);
  }, 0);
}

export function calculateIncorrectCharacters(targetText: string, typedText: string): number {
  return typedText.length - calculateCorrectCharacters(targetText, typedText);
}

export function calculateAccuracy(correctCharacters: number, incorrectCharacters: number): number {
  const totalCharacters = correctCharacters + incorrectCharacters;

  if (totalCharacters === 0) {
    return 100;
  }

  return Math.round((correctCharacters / totalCharacters) * 100);
}

export function calculateWpm(correctCharacters: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0) {
    return 0;
  }

  const standardWords = correctCharacters / 5;
  const elapsedMinutes = elapsedSeconds / 60;

  return Math.round(standardWords / elapsedMinutes);
}

export function calculateTypingStats(
  targetText: string,
  typedText: string,
  elapsedSeconds: number,
): TypingStats {
  const correctCharacters = calculateCorrectCharacters(targetText, typedText);

  const incorrectCharacters = calculateIncorrectCharacters(targetText, typedText);

  return {
    wpm: calculateWpm(correctCharacters, elapsedSeconds),
    accuracy: calculateAccuracy(correctCharacters, incorrectCharacters),
    correctCharacters,
    incorrectCharacters,
    totalCharacters: typedText.length,
  };
}
