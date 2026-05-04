import { defineConfig, devices } from '@playwright/test';

/**
 * Pruebas e2e simples para TechSecure (login, registro, navegación).
 * Levanta `ng serve` automáticamente; el backend Django no es obligatorio
 * para los tests actuales, pero se recomienda tenerlo para pruebas reales.
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4200',
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx ng serve --host 127.0.0.1 --port 4200',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
