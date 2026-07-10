import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTypingTest } from "./useTypingTest";

describe("useTypingTest", () => {
  it("starts with the expected initial state", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hello", "world"],
      }),
    );

    expect(result.current.state).toEqual({
      status: "idle",
      words: ["hello", "world"],
      typedText: "",
      currentWordIndex: 0,
      currentCharacterIndex: 0,
      mistakes: 0,
    });
  });
});