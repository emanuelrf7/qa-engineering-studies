import { test, expect } from '@playwright/test';

test('deve criar múltiplas tarefas', async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/");

    const input = page.getByPlaceholder('What needs to be done?');

    await input.fill('Estudar Playwright');
    await expect(input).toHaveValue('Estudar Playwright');
    await input.press('Enter');
    await expect(input).toBeEmpty();

    await input.fill('Estudar API');
    await expect(input).toHaveValue('Estudar API');
    await input.press('Enter');
    await expect(input).toBeEmpty();

    await input.fill('Estudar SQL');
    await expect(input).toHaveValue('Estudar SQL');
    await input.press('Enter');
    await expect(input).toBeEmpty();

    const todos = page.getByRole('listitem');
    const tasks = todos.getByRole('checkbox', { name: 'Toggle Todo' });
    await expect(tasks).toHaveCount(3);

    await expect(todos.getByText('Estudar Playwright')).toBeVisible();
    await expect(todos.getByText('Estudar API')).toBeVisible();
    await expect(todos.getByText('Estudar SQL')).toBeVisible();
});