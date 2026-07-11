import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatsBar } from "./StatsBar";

describe("StatsBar", () => {
  it("displays typing statistics", () => {
    render(<StatsBar wpm={42} accuracy={95} mistakes={3} timeRemaining={27} />);

    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("27s")).toBeInTheDocument();

    expect(screen.getByText("WPM")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();

    expect(screen.getByText("Accuracy")).toBeInTheDocument();
    expect(screen.getByText("95%")).toBeInTheDocument();

    expect(screen.getByText("Mistakes")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
