import { test, expect } from '@playwright/test';

let sharedState = '';

test.describe('Grupo com execução serial', () => {
    test.describe.configure({ mode: 'serial' });

    test('Teste A — Preparar estado', ({}, testInfo) => {
        console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

        sharedState = 'ready';
    });

    test('Teste B — Processar estado', ({}, testInfo) => {
        console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

        expect(sharedState).toBe('ready');

        sharedState = 'processed';
    });

    test('Teste C — Validar estado final', ({}, testInfo) => {
        console.log(`Teste: ${testInfo.title}\nWorker index: ${testInfo.workerIndex}\nParallel index: ${testInfo.parallelIndex}`);

        expect(sharedState).toBe('processed');
    });
});