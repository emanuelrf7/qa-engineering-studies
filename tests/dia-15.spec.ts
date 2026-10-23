import { test, expect } from '@playwright/test';

test('deve criar uma nova tarefa', async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/");

    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill('Estudar Playwright');

    await expect(input).toHaveValue('Estudar Playwright');

    await input.press('Enter');

    const task = page.getByText('Estudar Playwright');
    await expect(task).toBeVisible();

    await expect(input).toBeEmpty();
});