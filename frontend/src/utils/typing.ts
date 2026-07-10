export function getTargetText(words: readonly string[]): string {
  return words.join(" ");
}

export function isCorrectCharacter(expected: string, typed: string): boolean {
  return expected === typed;
}
