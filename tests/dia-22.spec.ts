import { test, expect } from './fixtures/todo.fixture';

test.beforeEach(async ({ page }) => {
    console.log('beforeEach global');
    await page.goto("https://example.com");
});

test.beforeAll(() => {
    console.log('beforeAll global');
});

test.afterAll(() => {
    console.log('afterAll global');
});

test.describe('Página Example', () => {
    test.beforeEach(() => {
        console.log('beforeEach do grupo');
    });

    test.beforeAll(() => {
        console.log('beforeAll do grupo');
    });

    test.afterEach(() => {
        console.log('afterEach do grupo Página Example');
    });

    test.afterAll(() => {
        console.log('afterAll do grupo');
    });

    test.describe('Validação de título', () => {
        test.beforeAll(() => {
            console.log('beforeAll do subgrupo');
        });

        test.beforeEach(() => {
            console.log('beforeEach do subgrupo');
        });

        test.afterEach(() => {
            console.log('afterEach do subgrupo');
        });

        test.afterAll(() => {
            console.log('afterAll do subgrupo');
        });

        test('deve exibir uma mensagem simples', async ({ page }) => {
            console.log('Mensagem teste 1');
            await expect(page).toHaveTitle(/Example/);
        });
    });

    test('deve exibir uma mensagem simples 2', async ({ page }) => {
        console.log('Mensagem teste 2');
        await expect(page).toHaveURL('https://example.com/');
    });
});

test('teste fora do grupo', async ({ page }) => {
    console.log('Teste fora do grupo');
    await expect(page).toHaveTitle(/Example/);
});