import type { TypingStats } from "@/types/typing";

interface ResultModalProps {
  isOpen: boolean;
  stats: TypingStats;
  onRestart: () => void;
}

export function ResultModal({ isOpen, stats, onRestart }: ResultModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <section role="dialog" aria-modal="true" aria-labelledby="results-title">
      <h2 id="results-title">Typing Results</h2>

      <p>WPM: {stats.wpm}</p>
      <p>Accuracy: {stats.accuracy}%</p>
      <p>Correct characters: {stats.correctCharacters}</p>
      <p>Incorrect characters: {stats.incorrectCharacters}</p>
      <p>Total characters: {stats.totalCharacters}</p>

      <button type="button" onClick={onRestart}>
        Try Again
      </button>
    </section>
  );
}
