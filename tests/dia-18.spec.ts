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
        await expect(todoPage.newTodoInput).toBeVisible();
    });
});

test.describe('TodoMVC - fixture e helper', () => {
    test('deve criar e concluir uma tarefa', async ({ todoPage }) => {
        await todoPage.createTodo('Estudar Playwright');

        const task = todoPage.taskLocator('Estudar Playwright');
        const taskCheckbox = task.getByRole('checkbox', { name: 'Toggle Todo' });

        await expect(taskCheckbox).not.toBeChecked();
        await taskCheckbox.check();
        await expect(taskCheckbox).toBeChecked();
    });

    test('deve criar duas tarefas independentes', async ({ todoPage }) => {
        await todoPage.createTodo('Estudar API');
        await todoPage.createTodo('Estudar SQL');

        const studyApiTask = todoPage.taskLocator('Estudar API');
        const studySqlTask = todoPage.taskLocator('Estudar SQL');

        await expect(studyApiTask).toBeVisible();
        await expect(studySqlTask).toBeVisible();

        const checkboxes = todoPage.allListItems.getByRole('checkbox', {
            name: 'Toggle Todo',
        });

        await expect(checkboxes).toHaveCount(2);
    });
});