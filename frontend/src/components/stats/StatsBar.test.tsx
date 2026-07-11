import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatsBar } from "./StatsBar";

describe("StatsBar", () => {
  it("displays typing statistics", () => {
    render(<StatsBar wpm={42} accuracy={95} mistakes={3} timeRemaining={27} />);

    expect(screen.getByText("Time: 27")).toBeInTheDocument();
    expect(screen.getByText("WPM: 42")).toBeInTheDocument();
    expect(screen.getByText("Accuracy: 95%")).toBeInTheDocument();
    expect(screen.getByText("Mistakes: 3")).toBeInTheDocument();
  });
});
