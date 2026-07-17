import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { TypingSample } from "@/types/typing";
import { PerformanceChart } from "./PerformanceChart";

const samples: TypingSample[] = [
  { second: 1, wpm: 36, rawWpm: 48, accuracy: 75, mistakes: 1 },
  { second: 2, wpm: 54, rawWpm: 60, accuracy: 90, mistakes: 1 },
  { second: 3, wpm: 48, rawWpm: 60, accuracy: 80, mistakes: 2 },
];

describe("PerformanceChart", () => {
  it("provides an accessible performance summary", () => {
    render(<PerformanceChart samples={samples} />);

    expect(screen.getByText("Performance over time")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAccessibleName(
      "WPM ranged from 36 to 54 and finished at 48.",
    );
  });

  it("handles a test without performance samples", () => {
    render(<PerformanceChart samples={[]} />);

    expect(screen.getByText("Not enough data to draw the graph.")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
