import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTimer } from "./useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with the provided duration", () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 30,
      }),
    );

    expect(result.current.timeRemaining).toBe(30);
    expect(result.current.isRunning).toBe(false);
  });

  it("counts down while running", () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 30,
      }),
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeRemaining).toBe(29);
  });
});