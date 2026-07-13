import "./TypingArea.css";

interface TypingAreaProps {
  targetText: string;
  typedText: string;
  describedBy?: string;
}

export function TypingArea({
  targetText,
  typedText,
  describedBy,
}: TypingAreaProps) {
  const currentCharacterIndex = typedText.length;

  return (
    <section
      className="typing-area"
      aria-label="Typing area"
      aria-describedby={describedBy}
    >
      <p className="typing-area__text">
        {targetText.split("").map((character, index) => {
          const hasBeenTyped = index < typedText.length;
          const isCurrentCharacter = index === currentCharacterIndex;

          const isCorrect =
            hasBeenTyped &&
            typedText[index] === character;

          const isIncorrect =
            hasBeenTyped &&
            typedText[index] !== character;

          const classNames = ["character"];

          if (isCorrect) {
            classNames.push("character--correct");
          }

          if (isIncorrect) {
            classNames.push("character--incorrect");
          }

          if (isCurrentCharacter) {
            classNames.push("character--current");
          }

          return (
            <span
              key={`${character}-${index}`}
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