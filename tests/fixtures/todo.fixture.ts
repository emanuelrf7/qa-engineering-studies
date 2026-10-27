import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

type TodoFixtures = {
    todoPage: Page
};

const test = base.extend<TodoFixtures>({
    todoPage: async ({ page }, use) => {
        await page.goto('https://demo.playwright.dev/todomvc/');

        await use(page);
    }
});

export {
    test, expect
};