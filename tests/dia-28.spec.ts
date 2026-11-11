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