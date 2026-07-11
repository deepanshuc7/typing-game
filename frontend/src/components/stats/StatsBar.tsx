interface StatsBarProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeRemaining: number;
}

export function StatsBar({ wpm, accuracy, mistakes, timeRemaining }: StatsBarProps) {
  return (
    <section aria-label="Typing statistics">
      <p>Time: {timeRemaining}</p>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Mistakes: {mistakes}</p>
    </section>
  );
}
