import { test, expect } from '@playwright/test';

test.use({
    baseURL: 'https://postman-echo.com',
});

test('deve enviar e validar HTTP headers', async ({ request }) => {
    const response = await request.get('/headers', {
        headers: {
            'x-qa-course': 'playwright-api-day-32',
        },
    });

    expect(response.status()).toBe(200);

    const responseHeaders = response.headers();

    expect(responseHeaders['content-type']).toContain('application/json');

    const body = await response.json() as {
        headers: Record<string, string>;
    };

    expect(body.headers['x-qa-course']).toBe('playwright-api-day-32');
});

test('deve reutilizar APIRequestContext com headers padrão', async ({ playwright }) => {
    const apiContext = await playwright.request.newContext({
        baseURL: 'https://postman-echo.com',

        extraHTTPHeaders: {
            'x-qa-course': 'playwright-api-day-32',
            'accept': 'application/json',
        },
    });

    try {
        await test.step('Validar headers padrão', async () => {
            const response = await apiContext.get('/headers');

            expect(response.status()).toBe(200);

            const body = await response.json() as {
                headers: Record<string, string>;
            };

            expect(body.headers['x-qa-course']).toBe('playwright-api-day-32');
            expect(body.headers['accept']).toBe('application/json');
        });

        await test.step('Reutilizar contexto com query parameters', async () => {
            const response = await apiContext.get('/get', {
                params: {
                    source: 'api-context',
                },
            });

            expect(response.status()).toBe(200);

            const body = await response.json() as {
                args: Record<string, string>;
                headers: Record<string, string>;
            };

            expect(body.args['source']).toBe('api-context');
            expect(body.headers['x-qa-course']).toBe('playwright-api-day-32');
            expect(body.headers['accept']).toBe('application/json');
        });
    } finally {
        await apiContext.dispose();
    }
});