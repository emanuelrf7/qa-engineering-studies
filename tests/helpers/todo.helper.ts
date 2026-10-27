import type { Page } from '@playwright/test';

async function createTodo(page: Page, title: string) {
    const input = page.getByPlaceholder('What needs to be done?');

    await input.fill(title);
    await input.press('Enter');
};

export {
    createTodo
};