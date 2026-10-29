import { test, expect } from './fixtures/todo.fixture';

test('deve criar uma tarefa utilizando fixture customizada com POM', async ({ todoPage }) => {
    await todoPage.createTodo('Estudar Fixture customizada com POM');

    await expect(todoPage.taskLocator('Estudar Fixture customizada com POM')).toBeVisible();
});