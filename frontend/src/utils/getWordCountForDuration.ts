export function getWordCountForDuration(duration: number): number {
  const wordsPerSecondBuffer = 3.5;

  return Math.ceil(duration * wordsPerSecondBuffer);
}
