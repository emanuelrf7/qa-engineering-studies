import { test, expect } from '@playwright/test';

test('Validação do título', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Example/);
});

test('Validação da URL', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('https://example.com');
});