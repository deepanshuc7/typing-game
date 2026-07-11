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
  return (
    <section
      className="typing-area"
      aria-label="Typing area"
      aria-describedby={describedBy}
    >
      <p className="typing-area__text">
        {targetText.split("").map((character, index) => {
          const typedCharacter = typedText[index];

          let className = "character";

          if (typedCharacter !== undefined) {
            className =
              typedCharacter === character
                ? "character character--correct"
                : "character character--incorrect";
          }

          return (
            <span
              key={`${character}-${index}`}
              className={className}
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