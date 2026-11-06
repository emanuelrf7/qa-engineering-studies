import { test, expect } from '@playwright/test';

test('Teste A', async ({ page }, testInfo) => {
    console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

    const html = `
        <h1>${testInfo.title}</h1>
    `;
    await page.setContent(html);

    await expect(page.locator('h1')).toHaveText(testInfo.title);
});

test('Teste B', async ({ page }, testInfo) => {
    console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

    const html = `
        <h1>${testInfo.title}</h1>
    `;
    await page.setContent(html);

    await expect(page.locator('h1')).toHaveText(testInfo.title);
});

test('Teste C', async ({ page }, testInfo) => {
    console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

    const html = `
        <h1>${testInfo.title}</h1>
    `;
    await page.setContent(html);

    await expect(page.locator('h1')).toHaveText(testInfo.title);
});

test('Teste D', async ({ page }, testInfo) => {
    console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

    const html = `
        <h1>${testInfo.title}</h1>
    `;
    await page.setContent(html);

    await expect(page.locator('h1')).toHaveText(testInfo.title);
});