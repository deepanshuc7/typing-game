import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTimer } from "./useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
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

  it("counts down while running", async () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 30,
      }),
    );

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.timeRemaining).toBe(29);
    expect(result.current.isRunning).toBe(true);
  });

  it("stops counting down after stop is called", async () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 30,
      }),
    );

    act(() => {
      result.current.start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.timeRemaining).toBe(29);

    act(() => {
      result.current.stop();
    });

    expect(result.current.isRunning).toBe(false);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(result.current.timeRemaining).toBe(29);
    expect(result.current.isRunning).toBe(false);
  });

  it("resets to the original duration", async () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 30,
      }),
    );

    act(() => {
      result.current.start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(result.current.timeRemaining).toBe(25);

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeRemaining).toBe(30);
    expect(result.current.isRunning).toBe(false);
  });

  it("stops at zero", async () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 2,
      }),
    );

    act(() => {
      result.current.start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it("calls onComplete when the timer reaches zero", async () => {
    const onComplete = vi.fn();

    const { result } = renderHook(() =>
      useTimer({
        duration: 2,
        onComplete,
      }),
    );

    act(() => {
      result.current.start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("does not call onComplete before the timer reaches zero", async () => {
    const onComplete = vi.fn();

    const { result } = renderHook(() =>
      useTimer({
        duration: 5,
        onComplete,
      }),
    );

    act(() => {
      result.current.start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(result.current.timeRemaining).toBe(2);
    expect(result.current.isRunning).toBe(true);
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("does not start when the duration is zero", () => {
    const onComplete = vi.fn();

    const { result } = renderHook(() =>
      useTimer({
        duration: 0,
        onComplete,
      }),
    );

    act(() => {
      result.current.start();
    });

    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("ignores repeated start calls while already running", async () => {
    const { result } = renderHook(() =>
      useTimer({
        duration: 5,
      }),
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      result.current.start();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current.timeRemaining).toBe(4);
    expect(result.current.isRunning).toBe(true);
  });
});
