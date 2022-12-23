import { test, expect } from "@playwright/test";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("Create user", async ({ page }) => {
  await page.goto("http://frontend:3000/register");
  await page.waitForLoadState("networkidle");
  await delay(2000);

  await page.getByPlaceholder("email").fill("playwright1@gmail.com");
  await page.getByPlaceholder("password").fill("testtesttest");
  await page.getByRole("button").click();

  await page.waitForLoadState("networkidle");

  await delay(2000);

  await page.getByPlaceholder("email").fill("playwright1@gmail.com");
  await page.getByPlaceholder("password").fill("testtesttest");
  await page.getByRole("button").click();

  await page.waitForLoadState("networkidle");

  await delay(2000);

  await expect(page.locator("h1")).toHaveText("Wilders Book");
});
