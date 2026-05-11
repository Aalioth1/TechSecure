import { test, expect } from '@playwright/test';

test.describe('Registro (smoke)', () => {
  test('navegación login -> registro y campos visibles', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /Registrarse/i }).click();

    await expect(page).toHaveURL(/\/registro$/);
    await expect(page.getByText(/Crear cuenta TechSecure/i)).toBeVisible();

    for (const name of [
      'Usuario',
      'Correo electrónico',
      'Nombre',
      'Apellido',
      'Teléfono',
      'Fecha de nacimiento',
    ]) {
      await expect(
        page.getByRole('textbox', { name }),
      ).toBeVisible();
    }
    await expect(
      page.locator('input[formcontrolname="password"]'),
    ).toBeVisible();
  });

  test('el botón "Cancelar" vuelve a /login', async ({ page }) => {
    await page.goto('/registro');
    await page.getByRole('link', { name: /Cancelar/i }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
