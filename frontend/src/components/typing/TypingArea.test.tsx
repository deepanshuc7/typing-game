import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypingArea } from "./TypingArea";

describe("TypingArea", () => {
  it("renders generated typing text", () => {
    render(<TypingArea />);

    const typingArea = screen.getByRole("region", {
      name: /typing area/i,
    });

    expect(typingArea).toBeInTheDocument();
    expect(typingArea).not.toHaveTextContent(/^$/);
  });
});
