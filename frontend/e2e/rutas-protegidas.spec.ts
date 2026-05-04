import { test, expect } from '@playwright/test';

test('acceder a /admin sin sesión redirige al login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/login$/);
});
