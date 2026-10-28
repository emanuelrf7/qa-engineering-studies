import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/todo.page';

test('deve acessar e criar tarefa no TodoMVC com Page Object Model', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();

    await todoPage.createTodo('Estudar Page Object Model');
    
    await expect(todoPage.taskLocator('Estudar Page Object Model')).toBeVisible();
});

test('deve cadastrar duas tarefas com títulos semelhantes utilizando POM', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();

    await todoPage.createTodo('Estudar Playwright');
    await todoPage.createTodo('Estudar Playwright avançado');

    await expect(todoPage.taskLocator('Estudar Playwright')).toBeVisible();
    await expect(todoPage.taskLocator('Estudar Playwright avançado')).toBeVisible();
});