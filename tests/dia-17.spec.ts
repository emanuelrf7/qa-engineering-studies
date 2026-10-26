import { test, expect } from "@playwright/test";

test.describe('TodoMVC', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://demo.playwright.dev/todomvc/");
    });
    
    test.describe('Criação de tarefas', () => {
        test('deve criar a tarefa Estudar Playwright', async ({ page }) => {
            const input = page.getByPlaceholder('What needs to be done?');

            await input.fill('Estudar Playwright');
            await expect(input).toHaveValue('Estudar Playwright');
            await input.press('Enter');
            await expect(input).toBeEmpty();

            const task = page.getByText('Estudar Playwright');
            await expect(task).toBeVisible();
        });

        test('deve criar a tarefa Estudar API', async ({ page }) => {
            const input = page.getByPlaceholder('What needs to be done?');

            await input.fill('Estudar API');
            await expect(input).toHaveValue('Estudar API');
            await input.press('Enter');
            await expect(input).toBeEmpty();

            const task = page.getByText('Estudar API');
            await expect(task).toBeVisible();
        });
    });

    test.describe('Conclusão de tarefas', () => {
        test('deve concluir uma tarefa', async ({ page }) => {
            const input = page.getByPlaceholder('What needs to be done?');

            await input.fill('Estudar API');
            await expect(input).toHaveValue('Estudar API');
            await input.press('Enter');
            await expect(input).toBeEmpty();

            const allListItem = page.getByRole('listitem');
            const task = allListItem.getByRole('checkbox', { name: 'Toggle Todo' });

            await expect(task).not.toBeChecked();
            await task.check();
            await expect(task).toBeChecked();
        });
    });
});