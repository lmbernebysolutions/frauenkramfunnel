import { defineConfig, devices } from "@playwright/test";

const port = process.env.REVIEW_PORT ?? "3000";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: "./tests/reviews",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "clients/frauenkram/reviews/playwright-report" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  ...(process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? {}
    : {
        webServer: {
          command: `npm run build && npx next start -p ${port}`,
          url: baseURL,
          reuseExistingServer: true,
          timeout: 180_000,
        },
      }),
});
