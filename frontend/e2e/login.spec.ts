import { test, expect } from '@playwright/test';

test.describe('Login (smoke)', () => {
  test('la raíz redirige a /login y muestra el formulario', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login$/);

    await expect(page.getByText(/Inicio de sesión/i).first()).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'Usuario' })).toBeVisible();
    await expect(page.locator('input[formcontrolname="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /Ingresar/i })).toBeVisible();
  });

  test('el botón "Ingresar" no envía si los campos están vacíos', async ({
    page,
  }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /Ingresar/i }).click();

    // El formulario marca campos requeridos pero no navega fuera de /login.
    await expect(page).toHaveURL(/\/login$/);
  });
});
