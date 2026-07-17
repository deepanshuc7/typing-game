import { useEffect } from "react";

interface UseTypingKeyboardOptions {
  onTypeCharacter: (character: string) => void;
  onDeleteCharacter: () => void;
}

export function useTypingKeyboard({
  onTypeCharacter,
  onDeleteCharacter,
}: UseTypingKeyboardOptions) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        onDeleteCharacter();
        return;
      }

      if (event.key.length === 1) {
        onTypeCharacter(event.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDeleteCharacter, onTypeCharacter]);
}
