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

    expect(screen.getByText("WPM")).toBeInTheDocument();
    expect(screen.getByText("52")).toBeInTheDocument();

    expect(screen.getByText("Accuracy")).toBeInTheDocument();
    expect(screen.getByText("96%")).toBeInTheDocument();

    expect(screen.getByText("Correct characters")).toBeInTheDocument();
    expect(screen.getByText("130")).toBeInTheDocument();

    expect(screen.getByText("Incorrect characters")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    expect(screen.getByText("Total characters")).toBeInTheDocument();
    expect(screen.getByText("135")).toBeInTheDocument();
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

  it("releases focus after restarting", () => {
    render(<ResultModal isOpen stats={stats} onRestart={() => undefined} />);

    const tryAgainButton = screen.getByRole("button", {
      name: /try again/i,
    });

    tryAgainButton.focus();

    expect(tryAgainButton).toHaveFocus();

    fireEvent.click(tryAgainButton);

    expect(tryAgainButton).not.toHaveFocus();
  });
});
