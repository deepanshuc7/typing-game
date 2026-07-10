import { describe, expect, it } from "vitest";
import { getTargetText, isCorrectCharacter } from "./typing";

describe("getTargetText", () => {
  it("joins words with spaces", () => {
    expect(getTargetText(["hello", "world"])).toBe("hello world");
  });

  it("returns an empty string for an empty list", () => {
    expect(getTargetText([])).toBe("");
  });
});

describe("isCorrectCharacter", () => {
  it("returns true for matching characters", () => {
    expect(isCorrectCharacter("a", "a")).toBe(true);
  });

  it("returns false for different characters", () => {
    expect(isCorrectCharacter("a", "b")).toBe(false);
  });
});