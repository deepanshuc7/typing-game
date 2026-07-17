export type TestStatus = "idle" | "running" | "finished";

export interface TypingState {
  status: TestStatus;

  words: string[];

  typedText: string;

  currentWordIndex: number;

  currentCharacterIndex: number;

  mistakes: number;
}

export interface TypingStats {
  wpm: number;

  accuracy: number;

  correctCharacters: number;

  incorrectCharacters: number;

  totalCharacters: number;
}

export interface TypingSample {
  second: number;

  wpm: number;

  rawWpm: number;

  accuracy: number;

  mistakes: number;
}
