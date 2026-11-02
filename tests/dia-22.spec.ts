import { test, expect } from './fixtures/todo.fixture';

test.beforeAll(async () => {
    console.log('beforeAll');
});

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`beforeEach: ${testInfo.title}`);
    await page.goto("https://example.com");
});

test.afterEach(async ({}, testInfo) => {
    console.log(`afterEach: ${testInfo.title}`);
});

test.afterAll(async () => {
    console.log('afterAll');
});

test('deve exibir uma mensagem simples', async ({ page }) => {
    console.log('Mensagem teste 1');
    await expect(page).toHaveTitle(/Example/);
});

test('deve exibir uma mensagem simples 2', async ({ page }) => {
    console.log('Mensagem teste 2');
    await expect(page).toHaveURL('https://example.com/');
});