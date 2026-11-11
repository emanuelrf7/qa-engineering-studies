import { test, expect } from '@playwright/test';

test('Depuração utilizando Playwright Inspector', async ({ page }) => {
    await page.setContent(`
        <h1>Área de testes</h1>

        <button type="button">Continuar</button>

        <p id="status">Aguardando</p>

        <script>
            document.querySelector('button').addEventListener('click', () => {
                document.querySelector('#status').textContent = 'Concluído';
            });
        </script>
    `);

    await page.getByRole('button', { name: 'Continuar' }).click();

    await expect(page.locator('#status')).toHaveText('Concluído');
});

test('Investigação de falha no UI Mode', async ({ page }) => {
    await page.setContent(`
        <h1>Pedidos</h1>

        <button type="button">Atualizar status</button>

        <p id="status">Pendente</p>

        <script>
            document.querySelector('button').addEventListener('click', () => {
                document.querySelector('#status').textContent = 'Atualizado';
            });
        </script>
    `);

    await page.getByRole('button', { name: 'Atualizar status' }).click();

    await expect(page.locator('#status')).toHaveText('Atualizado');
});

test('Investigação com Trace Viewer', async ({ page }) => {
    await page.setContent(`
        <h1>Painel de pedidos</h1>

        <button type="button">Atualizar status</button>

        <p id="status">Pendente</p>

        <script>
            document.querySelector('button').addEventListener('click', () => {
                document.querySelector('#status').textContent = 'Atualizado';
            });
        </script>
    `);

    await expect(page.locator('#status')).toHaveText('Pendente');

    await page.getByRole('button', { name: 'Atualizar status' }).click();

    await expect(page.locator('#status')).toHaveText('Atualizado');
});