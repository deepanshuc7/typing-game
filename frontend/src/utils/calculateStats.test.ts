import { describe, expect, it } from "vitest";
import {
  calculateAccuracy,
  calculateCorrectCharacters,
  calculateIncorrectCharacters,
  calculateWpm,
} from "./calculateStats";

describe("calculateCorrectCharacters", () => {
  it("counts matching characters", () => {
    expect(calculateCorrectCharacters("hello", "hezlo")).toBe(4);
  });

  it("returns zero when nothing has been typed", () => {
    expect(calculateCorrectCharacters("hello", "")).toBe(0);
  });
});

describe("calculateIncorrectCharacters", () => {
  it("counts mismatched characters", () => {
    expect(calculateIncorrectCharacters("hello", "hezlo")).toBe(1);
  });

  it("counts extra typed characters as incorrect", () => {
    expect(calculateIncorrectCharacters("hi", "hix")).toBe(1);
  });
});

describe("calculateAccuracy", () => {
  it("returns 100 when no characters have been typed", () => {
    expect(calculateAccuracy(0, 0)).toBe(100);
  });

  it("calculates typing accuracy", () => {
    expect(calculateAccuracy(8, 2)).toBe(80);
  });
});

describe("calculateWpm", () => {
  it("calculates words per minute using correct characters", () => {
    expect(calculateWpm(250, 60)).toBe(50);
  });

  it("normalizes shorter durations to one minute", () => {
    expect(calculateWpm(125, 30)).toBe(50);
  });

  it("returns zero when elapsed time is zero", () => {
    expect(calculateWpm(100, 0)).toBe(0);
  });
});