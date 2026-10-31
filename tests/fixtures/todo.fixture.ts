import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';
import { expect } from '@playwright/test';

type TodoFixtures = {
    todoPage: TodoPage
};

type WorkerFixtures = {
    workerResource: {
        workerIndex: number;
    };
};

const test = base.extend<TodoFixtures, WorkerFixtures>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);

        await todoPage.goto();

        await use(todoPage);
    },

    workerResource: [
        async ({}, use, workerInfo) => {
            console.log('Setup');

            const resource = {
                workerIndex: workerInfo.workerIndex
            };

            await use(resource);

            console.log('Teardown');
        },
        { scope: 'worker' }
    ]
});

export {
    test, expect
};