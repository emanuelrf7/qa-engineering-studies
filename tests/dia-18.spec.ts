// import { test, expect } from '@playwright/test';
import { test, expect } from './fixtures/todo.fixture';
import { createTodo } from './helpers/todo.helper';

test.describe('TodoMVC - helpers', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
    });

    test('deve criar a tarefa Estudar Playwright', async ({ page }) => {
        await createTodo(page, 'Estudar Playwright');

        const task = page.getByText('Estudar Playwright');
        await expect(task).toBeVisible();
    });

    test('deve criar a tarefa Estudar API', async ({ page }) => {
        await createTodo(page, 'Estudar API');

        const task = page.getByText('Estudar API');
        await expect(task).toBeVisible();
    });
});

test.describe('TodoMVC - fixtures', () => {
    test('deve acessar o TodoMVC através da fixture', async ({ todoPage }) => {
        const input = todoPage.getByPlaceholder('What needs to be done?');
        await expect(input).toBeVisible();
    });
});