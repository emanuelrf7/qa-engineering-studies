import { test, expect } from './fixtures/todo.fixture';

test('deve ser maior ou igual a zero', async ({ workerResource }) => {
    expect(workerResource.workerIndex).toBeGreaterThanOrEqual(0);
});

test('deve ser maior ou igual a zero 2', async ({ workerResource }) => {
    expect(workerResource.workerIndex).toBeGreaterThanOrEqual(0);
});