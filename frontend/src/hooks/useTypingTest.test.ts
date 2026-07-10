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

  it("ignores empty strings and multi-character input", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hello", "world"],
      }),
    );

    act(() => {
      result.current.typeCharacter("");
      result.current.typeCharacter("ab");
    });

    expect(result.current.state.typedText).toBe("");
    expect(result.current.state.currentCharacterIndex).toBe(0);
    expect(result.current.state.status).toBe("idle");
  });

  it("does not increment mistakes for a correct character", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hello", "world"],
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
    });

    expect(result.current.state.mistakes).toBe(0);
  });

  it("increments mistakes for an incorrect character", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hello", "world"],
      }),
    );

    act(() => {
      result.current.typeCharacter("x");
    });

    expect(result.current.state.mistakes).toBe(1);
  });

  it("validates each character against the expected text", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hello", "world"],
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
      result.current.typeCharacter("x");
      result.current.typeCharacter("l");
    });

    expect(result.current.state.typedText).toBe("hxl");
    expect(result.current.state.currentCharacterIndex).toBe(3);
    expect(result.current.state.mistakes).toBe(1);
  });

  it("ignores input after all target characters are typed", () => {
    const { result } = renderHook(() =>
      useTypingTest({
        words: ["hi"],
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
      result.current.typeCharacter("i");
      result.current.typeCharacter("x");
    });

    expect(result.current.state.typedText).toBe("hi");
    expect(result.current.state.currentCharacterIndex).toBe(2);
    expect(result.current.state.mistakes).toBe(0);
  });
});
