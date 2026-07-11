import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTypingSession } from "./useTypingSession";

describe("useTypingSession", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("starts the timer when the first character is typed", () => {
    const { result } = renderHook(() =>
      useTypingSession({
        words: ["hello"],
        duration: 30,
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
    });

    expect(result.current.state.status).toBe("running");
    expect(result.current.isTimerRunning).toBe(true);
  });

  it("finishes the test when the timer reaches zero", async () => {
    const { result } = renderHook(() =>
      useTypingSession({
        words: ["hello"],
        duration: 2,
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.state.status).toBe("finished");
  });

  it("resets both the typing state and timer", async () => {
    const { result } = renderHook(() =>
      useTypingSession({
        words: ["hello"],
        duration: 30,
      }),
    );

    act(() => {
      result.current.typeCharacter("x");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.state.status).toBe("idle");
    expect(result.current.state.typedText).toBe("");
    expect(result.current.state.mistakes).toBe(0);
    expect(result.current.timeRemaining).toBe(30);
    expect(result.current.isTimerRunning).toBe(false);
  });

  it("ignores input after the test finishes", async () => {
    const { result } = renderHook(() =>
      useTypingSession({
        words: ["hello"],
        duration: 1,
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.state.status).toBe("finished");

    act(() => {
      result.current.typeCharacter("e");
    });

    expect(result.current.state.typedText).toBe("h");
  });

  it("exposes live typing statistics", async () => {
    const { result } = renderHook(() =>
      useTypingSession({
        words: ["hello"],
        duration: 60,
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
      result.current.typeCharacter("x");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.stats.correctCharacters).toBe(1);
    expect(result.current.stats.incorrectCharacters).toBe(1);
    expect(result.current.stats.accuracy).toBe(50);
  });

  it("finishes early and stops the timer when all text is typed", async () => {
    const { result } = renderHook(() =>
      useTypingSession({
        words: ["hi"],
        duration: 60,
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(20_000);
    });

    expect(result.current.timeRemaining).toBe(40);

    act(() => {
      result.current.typeCharacter("i");
    });

    expect(result.current.state.status).toBe("finished");
    expect(result.current.isTimerRunning).toBe(false);
    expect(result.current.timeRemaining).toBe(40);
  });

  it("keeps final statistics frozen after finishing the text early", async () => {
    const { result } = renderHook(() =>
      useTypingSession({
        words: ["hi"],
        duration: 60,
      }),
    );

    act(() => {
      result.current.typeCharacter("h");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(20_000);
    });

    act(() => {
      result.current.typeCharacter("i");
    });

    const finalWpm = result.current.stats.wpm;
    const finalTimeRemaining = result.current.timeRemaining;

    expect(result.current.state.status).toBe("finished");
    expect(result.current.isTimerRunning).toBe(false);
    expect(finalTimeRemaining).toBe(40);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });

    expect(result.current.timeRemaining).toBe(finalTimeRemaining);
    expect(result.current.stats.wpm).toBe(finalWpm);
  });
});
