import "./RestartButton.css";

interface RestartButtonProps {
  onRestart: () => void;
}

export function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <button className="restart-button" type="button" onClick={onRestart}>
      Restart test
    </button>
  );
}
