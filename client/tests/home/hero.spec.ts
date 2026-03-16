import { test, expect } from '@playwright/test';

test.describe("Hero Page", () => {
  test("should have correct elements", async({page}) => {
    await page.goto("http://localhost:5173/");

    await expect(page.getByRole("heading", { name: "Become a React Dev",})).toBeVisible();
  });
});