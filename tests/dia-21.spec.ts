import { test, expect } from './fixtures/todo.fixture';

test('deve ser maior ou igual a zero', async ({ workerResource, testResource }) => {
    expect(workerResource.workerIndex).toBeGreaterThanOrEqual(0);
    expect(testResource.testId).toBeTruthy();
});

test('deve ser maior ou igual a zero 2', async ({ workerResource, testResource }) => {
    expect(workerResource.workerIndex).toBeGreaterThanOrEqual(0);
    expect(testResource.testId).toBeTruthy();
});