import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';
import { expect } from '@playwright/test';

type TodoFixtures = {
    todoPage: TodoPage
};

const test = base.extend<TodoFixtures>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);

        await use(todoPage);
    }
});

export {
    test, expect
};