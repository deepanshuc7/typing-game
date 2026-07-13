import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./TypingArea.css";

interface TypingAreaProps {
  targetText: string;
  typedText: string;
  describedBy?: string;
}

interface CaretPosition {
  x: number;
  y: number;
  height: number;
}

export function TypingArea({
  targetText,
  typedText,
  describedBy,
}: TypingAreaProps) {
  const currentCharacterIndex = typedText.length;

  const containerRef =
    useRef<HTMLParagraphElement>(null);

  const characterRefs =
    useRef<Array<HTMLSpanElement | null>>([]);

  const movementTimeoutRef =
    useRef<number | null>(null);

  const [caretPosition, setCaretPosition] =
    useState<CaretPosition>({
      x: 0,
      y: 0,
      height: 0,
    });

  const [isCaretMoving, setIsCaretMoving] =
    useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;

    const currentCharacter =
      characterRefs.current[currentCharacterIndex];

    if (!container || !currentCharacter) {
      return;
    }

    const containerRect =
      container.getBoundingClientRect();

    const characterRect =
      currentCharacter.getBoundingClientRect();

    setIsCaretMoving(true);

    setCaretPosition({
      x: characterRect.left - containerRect.left,
      y: characterRect.top - containerRect.top,
      height: characterRect.height,
    });

    if (movementTimeoutRef.current !== null) {
      window.clearTimeout(
        movementTimeoutRef.current,
      );
    }

    movementTimeoutRef.current =
      window.setTimeout(() => {
        setIsCaretMoving(false);
      }, 100);

    return () => {
      if (movementTimeoutRef.current !== null) {
        window.clearTimeout(
          movementTimeoutRef.current,
        );
      }
    };
  }, [currentCharacterIndex, targetText]);

  const caretClassName = [
    "typing-caret",
    isCaretMoving
      ? "typing-caret--moving"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className="typing-area"
      aria-label="Typing area"
      aria-describedby={describedBy}
    >
      <p
        ref={containerRef}
        className="typing-area__text"
      >
        <span
          data-testid="typing-caret"
          className={caretClassName}
          aria-hidden="true"
          style={{
            height: `${caretPosition.height}px`,
            transform: `translate(${caretPosition.x}px, ${caretPosition.y}px)`,
          }}
        />

        {targetText
          .split("")
          .map((character, index) => {
            const hasBeenTyped =
              index < typedText.length;

            const isCorrect =
              hasBeenTyped &&
              typedText[index] === character;

            const isIncorrect =
              hasBeenTyped &&
              typedText[index] !== character;

            const classNames = ["character"];

            if (isCorrect) {
              classNames.push(
                "character--correct",
              );
            }

            if (isIncorrect) {
              classNames.push(
                "character--incorrect",
              );
            }

            return (
              <span
                key={`${character}-${index}`}
                ref={(element) => {
                  characterRefs.current[index] =
                    element;
                }}
                className={classNames.join(" ")}
                data-testid={`character-${index}`}
              >
                {character}
              </span>
            );
          })}
      </p>
    </section>
  );
}