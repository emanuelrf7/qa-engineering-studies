import { test, expect } from './fixtures/todo.fixture';

test.beforeEach(async ({ page }) => {
    console.log('beforeEach global');
    await page.goto("https://example.com");
});

test.describe('Página Example', () => {
    test.beforeEach(() => {
        console.log('beforeEach do grupo');
    });

    test('deve exibir uma mensagem simples', async ({ page }) => {
        console.log('Mensagem teste 1');
        await expect(page).toHaveTitle(/Example/);
    });

    test('deve exibir uma mensagem simples 2', async ({ page }) => {
        console.log('Mensagem teste 2');
        await expect(page).toHaveURL('https://example.com/');
    });
});

test('teste fora do grupo', async ({ page }) => {
    await expect(page).toHaveTitle(/Example/);
});