import { useEffect, useMemo } from "react";
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
  const generatedWords = useMemo(() => generateWords(words, 30), []);

  const { state, stats, timeRemaining, typeCharacter } = useTypingSession({
    words: generatedWords,
    duration: 30,
  });

  const targetText = getTargetText(state.words);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
        return;
      }

      typeCharacter(event.key);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typeCharacter]);

  return (
    <div className="app">
      <Header />

      <main>
        <TestControls />

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
