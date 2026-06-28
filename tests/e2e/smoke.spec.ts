import { expect, test } from "@playwright/test";

test("desktop renders the Dark Archive workspace", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Make screenshots answer back." })).toBeVisible();
  await expect(page.getByText("Synthetic demo mode")).toBeVisible();
  await expect(page.getByText("Screenshot receipt")).toBeVisible();
  await expect(page.getByText(/Local OCR and classification can be wrong/i)).toBeVisible();
});

test("mobile renders without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});
