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

test.describe('TodoMVC - fixture e helper', () => {
    test('deve criar e concluir uma tarefa', async ({ todoPage }) => {
        await createTodo(todoPage, 'Estudar Playwright');

        const allListItems = todoPage.getByRole('listitem');
        const task = allListItems.filter({ hasText: 'Estudar Playwright' });
        const taskCheckbox = task.getByRole('checkbox', { name: 'Toggle Todo' });

        await expect(taskCheckbox).not.toBeChecked();
        await taskCheckbox.check();
        await expect(taskCheckbox).toBeChecked();
    });

    test('deve criar duas tarefas independentes', async ({ todoPage }) => {
        await createTodo(todoPage, 'Estudar API');
        await createTodo(todoPage, 'Estudar SQL');

        const allListItems = todoPage.getByRole('listitem');
        const studyApiTask = allListItems.filter({ hasText: 'Estudar API' });
        const studySqlTask = allListItems.filter({ hasText: 'Estudar SQL' });

        await expect(studyApiTask).toBeVisible();
        await expect(studySqlTask).toBeVisible();

        const checkboxes = allListItems.getByRole('checkbox', { name: 'Toggle Todo' });
        await expect(checkboxes).toHaveCount(2);
    });
});