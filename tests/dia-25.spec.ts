import { test, expect } from '@playwright/test';


test.describe('Grupo de testes com retry personalizado', () => {
    test.describe.configure({ retries: 1 });

    test.beforeEach(async ({}, testInfo) => {
        if (testInfo.retry > 0) {
            console.log('Preparação adicional antes do retry');
        }
    });

    test('Demonstração de retry', async ({}, testInfo) => {
        console.log(`Tentativa: ${testInfo.retry}`);

        expect(testInfo.retry).toBe(1);
    });
});