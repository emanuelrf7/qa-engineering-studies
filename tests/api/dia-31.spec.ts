import { test, expect } from '@playwright/test';

test('deve consultar um post pela API', async ({ request }) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const post = await response.json();

    expect(post).toMatchObject({
        userId: 1,
        id: 1,
        title: expect.any(String),
        body: expect.any(String),
    });
});