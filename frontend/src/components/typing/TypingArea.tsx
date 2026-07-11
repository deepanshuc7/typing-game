interface TypingAreaProps {
  targetText: string;
  typedText: string;
}

export function TypingArea({ targetText, typedText }: TypingAreaProps) {
  return (
    <section aria-label="Typing area">
      <p>
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
