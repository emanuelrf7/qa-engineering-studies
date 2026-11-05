import { test, expect } from '@playwright/test';


test.describe('Grupo de testes com retry personalizado', () => {
    test.describe.configure({ retries: 1 });
    
    test('Demonstração de retry', async ({}, testInfo) => {
        console.log(`Tentativa: ${testInfo.retry}`);

        expect(testInfo.retry).toBe(1);
    });
});