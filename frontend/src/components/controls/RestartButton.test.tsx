import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RestartButton } from "./RestartButton";

describe("RestartButton", () => {
  it("calls onRestart when clicked", () => {
    const onRestart = vi.fn();

    render(<RestartButton onRestart={onRestart} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /restart test/i,
      }),
    );

    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it("releases focus after restarting", () => {
    render(<RestartButton onRestart={() => undefined} />);

    const restartButton = screen.getByRole("button", {
      name: /restart test/i,
    });

    restartButton.focus();

    expect(restartButton).toHaveFocus();

    fireEvent.click(restartButton);

    expect(restartButton).not.toHaveFocus();
  });
});
