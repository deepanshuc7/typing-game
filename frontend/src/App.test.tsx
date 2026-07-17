import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders the main typing interface", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /Type Type/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: /typing test controls/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: /typing statistics/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: /typing area/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /restart test/i,
      }),
    ).toBeInTheDocument();
  });

  it("captures keyboard input", () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: "a",
    });

    expect(screen.getByTestId("character-0")).toHaveClass(/character--(correct|incorrect)/);
  });

  it("allows the user to remove typed input with Backspace", () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: "a",
    });

    expect(screen.getByTestId("character-0")).toHaveClass(/character--(correct|incorrect)/);

    fireEvent.keyDown(window, {
      key: "Backspace",
    });

    expect(screen.getByTestId("character-0")).not.toHaveClass("character--correct");

    expect(screen.getByTestId("character-0")).not.toHaveClass("character--incorrect");
  });

  it("allows the user to change the test duration before typing starts", () => {
    render(<App />);

    const controls = screen.getByRole("region", {
      name: /typing test controls/i,
    });

    const sixtySecondsButton = within(controls).getByRole("button", {
      name: "60s",
    });

    fireEvent.click(sixtySecondsButton);

    expect(sixtySecondsButton).toHaveAttribute("aria-pressed", "true");

    const stats = screen.getByRole("region", {
      name: /typing statistics/i,
    });

    expect(within(stats).getByText("60s")).toBeInTheDocument();
  });

  it("disables duration controls after typing starts", () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: "a",
    });

    expect(screen.getByRole("button", { name: "15s" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "30s" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "60s" })).toBeDisabled();
  });

  it("restarts the typing session", () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: "a",
    });

    expect(screen.getByTestId("character-0")).toHaveClass(/character--(correct|incorrect)/);

    fireEvent.click(
      screen.getByRole("button", {
        name: /restart test/i,
      }),
    );

    expect(screen.getByTestId("character-0")).not.toHaveClass("character--correct");

    expect(screen.getByTestId("character-0")).not.toHaveClass("character--incorrect");

    const stats = screen.getByRole("region", {
      name: /typing statistics/i,
    });

    expect(within(stats).getByText("30s")).toBeInTheDocument();
  });

  it("shows the results dialog when the timer finishes", async () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: "a",
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(30_000);
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /typing results/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /try again/i,
      }),
    ).toBeInTheDocument();
  });

  it("references the typing instructions from the typing area", () => {
    render(<App />);

    expect(
      screen.getByRole("region", {
        name: /typing area/i,
      }),
    ).toHaveAttribute("aria-describedby", "typing-instructions");
  });

  it("allows Space input after restarting with the focused restart button", () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: "a",
    });

    const restartButton = screen.getByRole("button", {
      name: /restart test/i,
    });

    restartButton.focus();
    fireEvent.keyDown(restartButton, {
      key: "Enter",
    });

    fireEvent.click(restartButton);

    expect(restartButton).not.toHaveFocus();

    fireEvent.keyDown(window, {
      key: " ",
    });

    expect(screen.getByTestId("character-0")).toHaveClass(
      /character--correct|character--incorrect/,
    );
  });
});
