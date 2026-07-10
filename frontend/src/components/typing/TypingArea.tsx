import { useMemo } from "react";
import { words } from "@/data/words";
import { generateWords } from "@/utils/generateWords";

export function TypingArea() {
  const generatedWords = useMemo(() => generateWords(words, 30), []);
  return (
    <section aria-label="Typing area">
      <p>{generatedWords.join(" ")}</p>
    </section>
  );
}
