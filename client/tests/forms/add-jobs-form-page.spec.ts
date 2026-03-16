import { test, expect } from '@playwright/test';

test.describe("Add Job Form Page", () => {
    test.beforeEach(async({page}) => {
        await page.goto("http://localhost:5173/add-job");
    })

  test("add job form renders correctly", async({page}) => {
    await expect(page.getByRole("heading", { name: "Add Job",})).toBeVisible();
    await expect(page.getByRole("heading", { name: "Company Info",})).toBeVisible();

    await expect(page.getByRole("combobox", { name: "Job Type (required)" })).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Salary (required)" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Description (required)" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Location (required)" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Company Name (required)" })).toBeVisible();

    await expect(page.getByRole("button", { name: "Add Job",})).toBeVisible();

  });
});