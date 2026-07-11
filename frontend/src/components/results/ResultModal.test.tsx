import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResultModal } from "./ResultModal";

const stats = {
  wpm: 52,
  accuracy: 96,
  correctCharacters: 130,
  incorrectCharacters: 5,
  totalCharacters: 135,
};

describe("ResultModal", () => {
  it("does not render when closed", () => {
    render(<ResultModal isOpen={false} stats={stats} onRestart={() => undefined} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("displays typing results when open", () => {
    render(<ResultModal isOpen stats={stats} onRestart={() => undefined} />);

    expect(
      screen.getByRole("heading", {
        name: /typing results/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("WPM: 52")).toBeInTheDocument();
    expect(screen.getByText("Accuracy: 96%")).toBeInTheDocument();
    expect(screen.getByText("Correct characters: 130")).toBeInTheDocument();
  });

  it("calls onRestart when try again is clicked", () => {
    const onRestart = vi.fn();

    render(<ResultModal isOpen stats={stats} onRestart={onRestart} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /try again/i,
      }),
    );

    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});
