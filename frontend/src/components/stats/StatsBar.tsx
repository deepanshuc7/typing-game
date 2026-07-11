import "./StatsBar.css";

interface StatsBarProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeRemaining: number;
}

export function StatsBar({ wpm, accuracy, mistakes, timeRemaining }: StatsBarProps) {
  return (
    <section className="stats-bar" aria-label="Typing statistics">
      <div className="stats-bar__item stats-bar__item--primary">
        <span className="stats-bar__label">Time</span>
        <strong>{timeRemaining}s</strong>
      </div>

      <div className="stats-bar__item">
        <span className="stats-bar__label">WPM</span>
        <strong>{wpm}</strong>
      </div>

      <div className="stats-bar__item">
        <span className="stats-bar__label">Accuracy</span>
        <strong>{accuracy}%</strong>
      </div>

      <div className="stats-bar__item">
        <span className="stats-bar__label">Mistakes</span>
        <strong>{mistakes}</strong>
      </div>
    </section>
  );
}
