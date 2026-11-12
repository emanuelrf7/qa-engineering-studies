import { test, expect } from '@playwright/test';

test('Validação do título principal', async ({ page }) => {
    await page.setContent('<h1>Dashboard</h1>');

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
});

test('Validação do estado do pedido', async ({ page }) => {
    await page.setContent('<p id="status">Pendente</p>');

    await expect(page.locator('#status')).toHaveText('Pendente');
});

test('Validação do botão de confirmação', async ({ page }) => {
    await page.setContent('<button type="button">Confirmar</button>');

    await expect(
        page.getByRole('button', { name: 'Confirmar' })
    ).toBeEnabled();
});