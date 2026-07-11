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
});
