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

test('deve concluir apenas a tarefa Estudar API', async({ page }) => {
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
    const studyApiTask = todos.filter({ hasText: 'Estudar API' });
    const checkboxStudyApiTask = studyApiTask.getByRole('checkbox', { name: 'Toggle Todo' });

    await expect(checkboxStudyApiTask).not.toBeChecked();
    await checkboxStudyApiTask.check();
    await expect(checkboxStudyApiTask).toBeChecked();
});

test('deve concluir somente Estudar API', async ({ page }) => {
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

    const allListItems = page.getByRole('listitem');

    const studyApiTask = allListItems.filter({ hasText: 'Estudar API' });
    const studyApiTaskCheckbox = studyApiTask.getByRole('checkbox', { name: 'Toggle Todo' });

    const studyPlaywrightTask = allListItems.filter({ hasText: 'Estudar Playwright' });
    const studyPlaywrightTaskCheckbox = studyPlaywrightTask.getByRole('checkbox', { name: 'Toggle Todo' });

    const studySqlTask = allListItems.filter({ hasText: 'Estudar SQL' });
    const studySqlTaskCheckbox = studySqlTask.getByRole('checkbox', { name: 'Toggle Todo' });

    await expect(studyApiTaskCheckbox).not.toBeChecked();
    await expect(studyPlaywrightTaskCheckbox).not.toBeChecked();
    await expect(studySqlTaskCheckbox).not.toBeChecked();

    await studyApiTaskCheckbox.check();

    await expect(studyApiTaskCheckbox).toBeChecked();
    await expect(studyPlaywrightTaskCheckbox).not.toBeChecked();
    await expect(studySqlTaskCheckbox).not.toBeChecked();
});