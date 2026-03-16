import { test, expect } from "@playwright/test";

test.describe("Home page CTA cards", () => {
    test.beforeEach(async({page}) => {
        await page.goto("http://localhost:5173/");
    })

  test("For Employers card is visible", async ({ page }) => {
    const card = page.locator("article").filter({
      has: page.getByRole("heading", { name: "For Employers" }),
    });

    await expect(card).toBeVisible();

    await expect(
      card.getByRole("link", { name: "Add Job: For Employers" })
    ).toBeVisible();
  });

  test("should redirect to form add job page on click", async({page}) => {
    const card = page.locator("article").filter({
      has: page.getByRole("heading", { name: "For Employers" }),
    });

    const link = card.getByRole("link", {name: "Add Job: For employers"});
    await link.click();
    await expect(page).toHaveURL("http://localhost:5173/add-job");
  });

  test("For Developers card is visible", async ({ page }) => {
    const card = page.locator("article").filter({
      has: page.getByRole("heading", { name: "For Developers" }),
    });

    await expect(card).toBeVisible();

    await expect(
      card.getByRole("link", { name: "Browse Jobs: For Developers" })
    ).toBeVisible();
  });
});