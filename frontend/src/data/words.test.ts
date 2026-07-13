import { describe, expect, it } from "vitest";
import { words } from "./words";

describe("words", () => {
  it("contains enough words for varied typing tests", () => {
    expect(words.length).toBeGreaterThanOrEqual(500);
  });

  it("contains only lowercase alphabetic words", () => {
    expect(words.every((word) => /^[a-z]+$/.test(word))).toBe(true);
  });

  it("does not contain duplicate words", () => {
    const uniqueWords = new Set(words);

    expect(uniqueWords.size).toBe(words.length);
  });

  it("does not contain empty words", () => {
    expect(words.every((word) => word.length > 0)).toBe(true);
  });
});
