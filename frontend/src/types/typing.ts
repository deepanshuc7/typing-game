export type TestStatus = "idle" | "running" | "finished";

export interface TypingState {
  status: TestStatus;

  words: string[];

  typedText: string;

  currentWordIndex: number;

  currentCharacterIndex: number;

  mistakes: number;
}
