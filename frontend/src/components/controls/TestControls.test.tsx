import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TestControls } from "./TestControls";

describe("TestControls", () => {
  it("marks the selected duration as active", () => {
    render(
      <TestControls selectedDuration={30} onChangeDuration={() => undefined} disabled={false} />,
    );

    expect(screen.getByRole("button", { name: "30" })).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onChangeDuration when a duration is selected", () => {
    const onChangeDuration = vi.fn();

    render(
      <TestControls selectedDuration={30} onChangeDuration={onChangeDuration} disabled={false} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "60" }));

    expect(onChangeDuration).toHaveBeenCalledWith(60);
  });

  it("disables duration controls when requested", () => {
    render(<TestControls selectedDuration={30} onChangeDuration={() => undefined} disabled />);

    expect(screen.getByRole("button", { name: "15" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "30" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "60" })).toBeDisabled();
  });
});
