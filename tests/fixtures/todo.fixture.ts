import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';
import { expect } from '@playwright/test';

type TodoFixtures = {
    todoPage: TodoPage,
    testResource: {
        testId: string;
    };
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
            console.log('Worker setup');

            const resource = {
                workerIndex: workerInfo.workerIndex
            };

            await use(resource);

            console.log('Worker teardown');
        },
        { scope: 'worker' }
    ],

    testResource: [
        async ({}, use, testInfo) => {
            console.log('Test Setup');

            const resource = {
                testId: testInfo.testId
            };

            await use(resource);

            console.log('Test Teardown');
        },
        { scope: 'test' }
    ]
});

export {
    test, expect
};