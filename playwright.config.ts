import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }]
  ],
  workers: 1,
  use: {
    headless: true,
    trace: 'on-first-retry',
  },
});
