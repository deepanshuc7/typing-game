import { describe, expect, it } from "vitest";
import { createTypingSample } from "./createTypingSample";

describe("createTypingSample", () => {
  it("captures performance at an elapsed second", () => {
    expect(createTypingSample("hello world", "hello xorld", 60, 1)).toEqual({
      second: 60,
      wpm: 2,
      rawWpm: 2,
      accuracy: 91,
      mistakes: 1,
    });
  });

  it("includes incorrect characters in raw WPM", () => {
    const sample = createTypingSample("abcdefghij", "abcdeXXXXX", 60, 5);

    expect(sample.wpm).toBe(1);
    expect(sample.rawWpm).toBe(2);
  });

  it("returns zero speeds when no time has elapsed", () => {
    const sample = createTypingSample("hello", "hello", 0, 0);

    expect(sample.wpm).toBe(0);
    expect(sample.rawWpm).toBe(0);
  });
});
