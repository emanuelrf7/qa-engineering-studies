import { test, expect } from '@playwright/test';

test('Teste E', async ({ page }, testInfo) => {
    console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

    const html = `
        <h1>${testInfo.title}</h1>
    `;
    await page.setContent(html);

    await expect(page.locator('h1')).toHaveText(testInfo.title);
});

test('Teste F', async ({ page }, testInfo) => {
    console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

    const html = `
        <h1>${testInfo.title}</h1>
    `;
    await page.setContent(html);

    await expect(page.locator('h1')).toHaveText(testInfo.title);
});