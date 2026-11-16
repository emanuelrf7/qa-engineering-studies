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