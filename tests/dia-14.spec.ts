import { test, expect } from '@playwright/test';

test('deve validar a página Example Domain', async ({ page }) => {
    await page.goto("https://example.com");

    await expect(page).toHaveTitle("Example Domain");
});