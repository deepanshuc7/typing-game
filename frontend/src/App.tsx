import { TestControls } from "@/components/controls/TestControls";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StatsBar } from "@/components/stats/StatsBar";
import { TypingArea } from "@/components/typing/TypingArea";
import { RestartButton } from "@/components/controls/RestartButton";
import { ResultModal } from "@/components/results/ResultModal";
import { useTypingAreaFocus } from "@/hooks/useTypingAreaFocus";
import { useTypingGame } from "@/hooks/useTypingGame";
import { useTypingKeyboard } from "@/hooks/useTypingKeyboard";
import "@/styles/app.css";

function App() {
  const { typingAreaRef, focusTypingArea } = useTypingAreaFocus();
  const game = useTypingGame();

  useTypingKeyboard({
    onTypeCharacter: game.typeCharacter,
    onDeleteCharacter: game.deleteCharacter,
  });

  function handleRestart() {
    game.restart();
    focusTypingArea();
  }

  return (
    <div className="app">
      <Header />

      <main>
        <TestControls
          selectedDuration={game.duration}
          onChangeDuration={game.changeDuration}
          disabled={game.state.status !== "idle"}
        />

        <StatsBar
          wpm={game.stats.wpm}
          accuracy={game.stats.accuracy}
          mistakes={game.state.mistakes}
          timeRemaining={game.timeRemaining}
        />

        <p id="typing-instructions">
          Start typing to begin the test. Use Backspace to correct mistakes.
        </p>

        <TypingArea
          ref={typingAreaRef}
          targetText={game.targetText}
          typedText={game.state.typedText}
          describedBy="typing-instructions"
        />

        <RestartButton onRestart={handleRestart} />
        <ResultModal
          isOpen={game.state.status === "finished"}
          stats={game.stats}
          samples={game.samples}
          onRestart={handleRestart}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
