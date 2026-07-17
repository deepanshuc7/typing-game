import type { MouseEvent } from "react";
import "./RestartButton.css";

interface RestartButtonProps {
  onRestart: () => void;
}

export function RestartButton({ onRestart }: RestartButtonProps) {
  function handleRestart(event: MouseEvent<HTMLButtonElement>) {
    onRestart();
    event.currentTarget.blur();
  }

  return (
    <button className="restart-button" type="button" onClick={handleRestart}>
      Restart test
    </button>
  );
}
