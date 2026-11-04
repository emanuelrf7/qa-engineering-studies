import { test, expect } from '@playwright/test';

test('Validação do título', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Example/);
});

test('Validação da URL', async ({ page }, testInfo) => {
    const projectBaseUrl = testInfo.project.use.baseURL;

    if (typeof projectBaseUrl !== 'string') {
        throw new Error('baseURL não configurado para o projeto.');
    }

    await page.goto('/');

    await expect(page).toHaveURL(projectBaseUrl);
});