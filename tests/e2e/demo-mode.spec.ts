import { expect, test } from "@playwright/test";

test("filters demo records and exposes receipt evidence", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Filter code/error" }).click();

  await expect(page.getByRole("heading", { level: 2, name: "Beacon Logs render trace" })).toBeVisible();
  await expect(page.getByText("code/error: error token")).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy as note" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Export Markdown" })).toBeVisible();
});
