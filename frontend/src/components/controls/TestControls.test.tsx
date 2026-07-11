import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TestControls } from "./TestControls";

describe("TestControls", () => {
  it("renders all supported durations", () => {
    render(
      <TestControls selectedDuration={30} onChangeDuration={() => undefined} disabled={false} />,
    );

    expect(screen.getByRole("button", { name: "15s" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "30s" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "60s" })).toBeInTheDocument();
  });

  it("marks the selected duration as active", () => {
    render(
      <TestControls selectedDuration={30} onChangeDuration={() => undefined} disabled={false} />,
    );

    expect(screen.getByRole("button", { name: "30s" })).toHaveAttribute("aria-pressed", "true");

    expect(screen.getByRole("button", { name: "15s" })).toHaveAttribute("aria-pressed", "false");

    expect(screen.getByRole("button", { name: "60s" })).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onChangeDuration with the selected duration", () => {
    const onChangeDuration = vi.fn();

    render(
      <TestControls selectedDuration={30} onChangeDuration={onChangeDuration} disabled={false} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "60s" }));

    expect(onChangeDuration).toHaveBeenCalledTimes(1);
    expect(onChangeDuration).toHaveBeenCalledWith(60);
  });

  it("disables all duration controls when disabled", () => {
    render(<TestControls selectedDuration={30} onChangeDuration={() => undefined} disabled />);

    expect(screen.getByRole("button", { name: "15s" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "30s" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "60s" })).toBeDisabled();
  });
});
