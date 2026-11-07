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

test('Demonstração de action timeout', async ({ page }) => {
    const html = `
        <script>
            setTimeout(() => {
                const button = document.createElement('button');
                button.textContent = 'Enviar';
                
                button.addEventListener('click', () => {
                    button.textContent = 'Enviado';
                });
                
                document.body.appendChild(button);
            }, 1200);
        </script>
    `;
    
    await page.setContent(html);

    await page.getByRole('button', { name: 'Enviar' }).click();
    await expect(page.locator('button')).toHaveText('Enviado');
});

test('Demonstração de navigation timeout', async ({ page }) => {
    await page.route('**/slow', async (route) => {
        await new Promise<void>((resolve) => setTimeout(resolve, 1_200));

        await route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: '<h1>Carregado</h1>',
        });
    });

    await page.goto('/slow');

    await expect(page.locator('h1')).toHaveText('Carregado');
});