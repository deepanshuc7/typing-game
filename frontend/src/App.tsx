import { Header } from "@/components/layout/Header";
import { TestControls } from "@/components/controls/TestControls";
import { TypingArea } from "@/components/typing/TypingArea";
import { StatsBar } from "@/components/stats/StatsBar";
import { Footer } from "@/components/layout/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      
      <main>
        <TestControls />
        <StatsBar />
        <TypingArea />
      </main>

      <Footer />
    </div>
  );
}

export default App;
