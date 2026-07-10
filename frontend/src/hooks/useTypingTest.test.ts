import { act, renderHook } from "@testing-library/react";
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

  it("starts the typing test", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hello", "world"],
      }),
    );

    act(() => {
      result.current.start();
    });

    expect(result.current.state.status).toBe("running");
  });

  it("starts automatically when the first character is typed", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hello", "world"],
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
    });

    expect(result.current.state.status).toBe("running");
  });

  it("stores the typed character and advances the character index", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hello", "world"],
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
    });

    expect(result.current.state.typedText).toBe("h");
    expect(result.current.state.currentCharacterIndex).toBe(1);
  });
});