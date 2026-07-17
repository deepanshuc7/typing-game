import { useCallback, useEffect, useRef } from "react";

export function useTypingAreaFocus() {
  const typingAreaRef = useRef<HTMLElement>(null);

  const focusTypingArea = useCallback(() => {
    typingAreaRef.current?.focus();
  }, []);

  useEffect(() => {
    focusTypingArea();
  }, [focusTypingArea]);

  return { typingAreaRef, focusTypingArea };
}
