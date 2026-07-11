interface RestartButtonProps {
  onRestart: () => void;
}

export function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <button type="button" onClick={onRestart}>
      Restart
    </button>
  );
}
