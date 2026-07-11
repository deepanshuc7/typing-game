interface TestControlsProps {
  selectedDuration: number;
  onChangeDuration: (duration: number) => void;
  disabled: boolean;
}

const durations = [15, 30, 60];

export function TestControls({ selectedDuration, onChangeDuration, disabled }: TestControlsProps) {
  return (
    <section aria-label="Typing test controls">
      {durations.map((duration) => (
        <button
          key={duration}
          type="button"
          disabled={disabled}
          aria-pressed={selectedDuration === duration}
          onClick={() => onChangeDuration(duration)}
        >
          {duration}
        </button>
      ))}
    </section>
  );
}
