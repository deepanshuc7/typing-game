import { useEffect, useMemo, useState } from "react";
import { TestControls } from "@/components/controls/TestControls";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StatsBar } from "@/components/stats/StatsBar";
import { TypingArea } from "@/components/typing/TypingArea";
import { words } from "@/data/words";
import { useTypingSession } from "@/hooks/useTypingSession";
import { generateWords } from "@/utils/generateWords";
import { getTargetText } from "./utils/typing";

function App() {
  const [duration, setDuration] = useState(30);

  const generatedWords = useMemo(() => generateWords(words, 30), []);

  const { state, stats, timeRemaining, typeCharacter, deleteCharacter, reset } = useTypingSession({
    words: generatedWords,
    duration,
  });

  const targetText = getTargetText(state.words);

  function handleDurationChange(nextDuration: number) {
    if (state.status !== "idle") {
      return;
    }

    setDuration(nextDuration);
    reset(nextDuration);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        deleteCharacter();
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      typeCharacter(event.key);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typeCharacter, deleteCharacter]);

  return (
    <div className="app">
      <Header />

      <main>
        <TestControls
          selectedDuration={duration}
          onChangeDuration={handleDurationChange}
          disabled={state.status !== "idle"}
        />

        <StatsBar
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          mistakes={state.mistakes}
          timeRemaining={timeRemaining}
        />

        <TypingArea targetText={targetText} typedText={state.typedText} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
