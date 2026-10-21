import { test, expect } from '@playwright/test';

test('deve validar a página Example Domain', async ({ page }) => {
    await page.goto("https://example.com");

    await expect(page).toHaveTitle("Example Domain");
});

test('deve interagir com o link Get started', async ({ page }) => {
    await page.goto("https://playwright.dev/");

    await expect(page.getByRole('heading', { name: 'Playwright enables reliable web automation for testing, scripting, and AI agents.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(page).toHaveURL(/docs\//);
});

test('deve navegar da página inicial para a documentação', async ({ page }) => {
    await page.goto("https://playwright.dev");

    await expect(page.getByRole('heading', { name: 'Playwright enables reliable web automation for testing, scripting, and AI agents.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();

    await expect(page).toHaveURL(/docs\//);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});