import "./TestControls.css";

interface TestControlsProps {
  selectedDuration: number;
  onChangeDuration: (duration: number) => void;
  disabled: boolean;
}

const durations = [15, 30, 60];

export function TestControls({ selectedDuration, onChangeDuration, disabled }: TestControlsProps) {
  return (
    <section className="test-controls" aria-label="Typing test controls">
      <span className="test-controls__label">Time</span>

      <div className="test-controls__options">
        {durations.map((duration) => (
          <button
            key={duration}
            className="test-controls__button"
            type="button"
            disabled={disabled}
            aria-pressed={selectedDuration === duration}
            onClick={() => onChangeDuration(duration)}
          >
            {duration}s
          </button>
        ))}
      </div>
    </section>
  );
}
