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