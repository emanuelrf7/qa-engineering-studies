import { test, expect } from '@playwright/test';

test('Validação de conteúdo carregado', async ({ page }) => {
    const html = `
        <h1>Carregando...</h1>

        <script>
            setTimeout(() => {
                document.querySelector('h1').textContent = 'Concluído';
            }, 1200);
        </script>
    `;

    await page.setContent(html);

    await expect(page.locator('h1')).toHaveText('Concluído', {
        timeout: 2_000,
    });
});

test('Demonstração de test timeout', async () => {
    test.setTimeout(2_000);

    console.log('Iniciando operação');

    await new Promise<void>((resolve) => setTimeout(resolve, 1_200));

    console.log('Operação concluída');
});