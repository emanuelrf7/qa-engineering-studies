import { test, expect } from '@playwright/test';

test('Validação do título principal', async ({ page }) => {
    await page.setContent('<h1>Dashboard</h1>');

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
});

test('Validação do estado do pedido', async ({ page }) => {
    await page.setContent('<p id="status">Pendente</p>');

    await expect(page.locator('#status')).toHaveText('Pendente');
});

test('Validação do botão de confirmação', async ({ page }) => {
    await page.setContent('<button type="button">Confirmar</button>');

    await expect(
        page.getByRole('button', { name: 'Confirmar' })
    ).toBeEnabled();
});

test('Fluxo de atualização no relatório HTML', async ({ page }) => {
    await test.step('Carregar painel', async () => {
        await page.setContent(`
            <h1>Pedidos</h1>

            <button type="button">Concluir pedido</button>

            <p id="status">Pendente</p>

            <script>
                document.querySelector('button').addEventListener('click', () => {
                    document.querySelector('#status').textContent = 'Concluído';
                });
            </script>
        `);
    });

    await test.step('Atualizar status', async () => {
        await page.getByRole('button', { name: 'Concluir pedido' }).click();
    });

    await test.step('Validar status atualizado', async () => {
        await expect(page.locator('#status')).toHaveText('Concluído');
    });
});