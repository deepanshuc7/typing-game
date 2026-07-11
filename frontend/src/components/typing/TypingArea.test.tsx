import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypingArea } from "./TypingArea";

describe("TypingArea", () => {
  it("renders the target text", () => {
    render(<TypingArea targetText="hello" typedText="" />);

    expect(screen.getByRole("region", { name: /typing area/i })).toHaveTextContent("hello");
  });

  it("marks correctly typed characters", () => {
    render(<TypingArea targetText="hello" typedText="he" />);

    expect(screen.getByTestId("character-0")).toHaveClass("character--correct");

    expect(screen.getByTestId("character-1")).toHaveClass("character--correct");
  });

  it("marks incorrectly typed characters", () => {
    render(<TypingArea targetText="hello" typedText="hx" />);

    expect(screen.getByTestId("character-0")).toHaveClass("character--correct");

    expect(screen.getByTestId("character-1")).toHaveClass("character--incorrect");
  });

  it("references the typing instructions", () => {
  render(
    <>
      <p id="typing-instructions">
        Start typing to begin the test.
      </p>

      <TypingArea
        targetText="hello"
        typedText=""
        describedBy="typing-instructions"
      />
    </>,
  );

  expect(
    screen.getByRole("region", {
      name: /typing area/i,
    }),
  ).toHaveAttribute(
    "aria-describedby",
    "typing-instructions",
  );
});
});
