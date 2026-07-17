import { expect, test } from "@playwright/test";

test.describe("Typing Game", () => {
  test("starts a typing test and disables duration controls", async ({ page }) => {
    await page.goto("/");

    const typingArea = page.getByRole("region", {
      name: "Typing area",
    });

    await expect(typingArea).toBeVisible();

    await page.keyboard.type("a");

    await expect(
      page.getByRole("button", {
        name: "15s",
      }),
    ).toBeDisabled();

    await expect(
      page.getByRole("button", {
        name: "30s",
      }),
    ).toBeDisabled();

    await expect(
      page.getByRole("button", {
        name: "60s",
      }),
    ).toBeDisabled();
  });

  test("restarts an active typing session", async ({ page }) => {
    await page.goto("/");

    const firstCharacter = page.getByTestId("character-0");

    await page.keyboard.type("a");

    await expect(firstCharacter).toHaveClass(/character--correct|character--incorrect/);

    await page
      .getByRole("button", {
        name: /restart test/i,
      })
      .click();

    await expect(firstCharacter).not.toHaveClass(/character--correct|character--incorrect/);

    await expect(
      page.getByRole("button", {
        name: "30s",
      }),
    ).toBeEnabled();
  });

  test("changes the test duration before the test starts", async ({ page }) => {
    await page.goto("/");

    const sixtySeconds = page.getByRole("button", {
      name: "60s",
    });

    await sixtySeconds.click();

    await expect(sixtySeconds).toHaveAttribute("aria-pressed", "true");

    const stats = page.getByRole("region", {
      name: "Typing statistics",
    });

    await expect(stats).toContainText("60s");
  });

  test("releases restart button focus so Space can be typed", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.type("a");

    const restartButton = page.getByRole("button", {
      name: /restart test/i,
    });

    await restartButton.focus();
    await page.keyboard.press("Enter");

    await expect(restartButton).not.toBeFocused();

    await page.keyboard.press("Space");

    await expect(page.getByTestId("character-0")).toHaveClass(
      /character--correct|character--incorrect/,
    );
  });
});
