import { test, expect } from '@playwright/test';

test('Demonstração de retry', async ({}, testInfo) => {
    console.log(`Tentativa: ${testInfo.retry}`);

    expect(testInfo.retry).toBe(1);
});