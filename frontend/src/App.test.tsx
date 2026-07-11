import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the main typing interface", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /typing game/i })).toBeInTheDocument();

    expect(screen.getByRole("region", { name: /typing area/i })).toBeInTheDocument();

    expect(screen.getByRole("region", { name: /typing statistics/i })).toBeInTheDocument();
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

  it("allows the user to change the test duration before typing starts", async () => {
    render(<App />);

    const sixtySeconds = screen.getByRole("button", {
      name: "60",
    });

    fireEvent.click(sixtySeconds);

    expect(sixtySeconds).toHaveAttribute("aria-pressed", "true");

    expect(await screen.findByText("Time: 60")).toBeInTheDocument();
  });

  it("disables duration controls after typing starts", () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: "a",
    });

    expect(screen.getByRole("button", { name: "15" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "30" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "60" })).toBeDisabled();
  });

  it("restarts the typing session", () => {
    render(<App />);

    fireEvent.keyDown(window, {
      key: "a",
    });

    expect(screen.getByTestId("character-0")).toHaveClass(/character--(correct|incorrect)/);

    fireEvent.click(
      screen.getByRole("button", {
        name: /restart/i,
      }),
    );

    expect(screen.getByTestId("character-0")).not.toHaveClass("character--correct");

    expect(screen.getByTestId("character-0")).not.toHaveClass("character--incorrect");

    expect(screen.getByText(/Time: 30/i)).toBeInTheDocument();
  });
});
