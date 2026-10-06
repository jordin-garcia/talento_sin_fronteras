import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4321' },
  webServer: { command: 'npx astro preview --port 4321', port: 4321, reuseExistingServer: true },
  projects: [
    { name: 'movil', use: { ...devices['Pixel 7'], browserName: 'chromium' } },
    { name: 'escritorio', use: { viewport: { width: 1280, height: 800 }, browserName: 'chromium' } },
  ],
});
