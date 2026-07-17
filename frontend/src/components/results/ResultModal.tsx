import { PerformanceChart } from "@/components/results/PerformanceChart";
import type { TypingSample, TypingStats } from "@/types/typing";
import "./ResultModal.css";

interface ResultModalProps {
  isOpen: boolean;
  stats: TypingStats;
  samples: TypingSample[];
  onRestart: () => void;
}

export function ResultModal({ isOpen, stats, samples, onRestart }: ResultModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="result-modal__backdrop">
      <section
        className="result-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-title"
      >
        <div className="result-modal__header">
          <p className="result-modal__eyebrow">Test complete</p>
          <h2 id="results-title">Typing Results</h2>
        </div>

        <div className="result-modal__highlight">
          <div>
            <span className="result-modal__value">{stats.wpm}</span>
            <span className="result-modal__metric">WPM</span>
          </div>

          <div>
            <span className="result-modal__value">{stats.accuracy}%</span>
            <span className="result-modal__metric">Accuracy</span>
          </div>
        </div>

        <PerformanceChart samples={samples} />

        <div className="result-modal__details">
          <div>
            <span>Correct characters</span>
            <strong>{stats.correctCharacters}</strong>
          </div>

          <div>
            <span>Incorrect characters</span>
            <strong>{stats.incorrectCharacters}</strong>
          </div>

          <div>
            <span>Total characters</span>
            <strong>{stats.totalCharacters}</strong>
          </div>
        </div>

        <button className="result-modal__button" type="button" onClick={onRestart}>
          Try again
        </button>
      </section>
    </div>
  );
}
