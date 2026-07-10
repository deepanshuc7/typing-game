import { describe, expect, it } from "vitest";
import { generateWords } from "./generateWords";

describe("generateWords", () => {
  it("returns the requested number of words", () => {
    const result = generateWords(["one", "two", "three"], 5);

    expect(result).toHaveLength(5);
  });

  it("returns only words from the provided word list", () => {
    const source = ["one", "two", "three"];

    const result = generateWords(source, 10);

    expect(result.every((word) => source.includes(word))).toBe(true);
  });

  it("returns an empty array when the requested count is zero", () => {
    expect(generateWords(["one", "two"], 0)).toEqual([]);
  });

  it("throws an error when the word list is empty", () => {
    expect(() => generateWords([], 5)).toThrow(
      "Cannot generate words from an empty word list",
    );
  });

  it("throws an error when the requested count is negative", () => {
    expect(() => generateWords(["one", "two"], -1)).toThrow(
      "Word count cannot be negative",
    );
  });
});