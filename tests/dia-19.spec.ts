import { test, expect } from '@playwright/test';
import { TodoPage } from './pages/todo.page';

test('deve acessar e criar tarefa no TodoMVC com Page Object Model', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();

    await todoPage.createTodo('Estudar Page Object Model');
    
    await expect(todoPage.taskLocator('Estudar Page Object Model')).toBeVisible();
});