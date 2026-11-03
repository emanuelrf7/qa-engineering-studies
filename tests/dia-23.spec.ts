import { test, expect } from './fixtures/todo.fixture';

test('deve acessar a página inicial', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveTitle(/Example/);
});

test('deve validar a URL da página', { tag: '@regression' }, async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveURL('https://example.com');
});

test('deve validar o conteúdo da página', async ({ page }) => {
    await page.goto('https://example.com');

    const learnMoreBtn = page.getByRole('link', { name: 'Learn more' });

    await expect(learnMoreBtn).toBeVisible();
});

test('skip', async ({ page }) => {
    test.skip(true, 'Teste não deve ser executado para o projeto Chromium');

    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
});

test('fixme', async ({ page}) => {
    test.fixme(true, 'Teste com defeito, precisa ser corrigido');

    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
});

test('fail', async ({ page, browserName }) => {
    test.fail(browserName === 'chromium', 'Teste quebra nesse navegador');

    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/TituloInexistente/);
});

test('slow', async ({ page, browserName }) => {
    test.slow(browserName === 'chromium');

    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
});