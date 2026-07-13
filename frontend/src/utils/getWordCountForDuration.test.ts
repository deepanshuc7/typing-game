import { describe, expect, it } from "vitest";
import { getWordCountForDuration } from "./getWordCountForDuration";

describe("getWordCountForDuration", () => {
  it("generates more words for longer tests", () => {
    const fifteenSeconds = getWordCountForDuration(15);

    const thirtySeconds = getWordCountForDuration(30);

    const sixtySeconds = getWordCountForDuration(60);

    expect(thirtySeconds).toBeGreaterThan(fifteenSeconds);

    expect(sixtySeconds).toBeGreaterThan(thirtySeconds);
  });

  it("provides enough words for a 60 second test", () => {
    expect(getWordCountForDuration(60)).toBeGreaterThanOrEqual(200);
  });
});
