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

test('deve criar um post pela API', async ({ request }) => {
    const newPost = {
        title: 'Estudando API Testing',
        body: 'Praticando requisições POST com Playwright',
        userId: 1,
    };

    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
            data: newPost,
        }
    );

    expect(response.status()).toBe(201);

    const createdPost = await response.json();

    expect(createdPost).toMatchObject({
        id: expect.any(Number),
        ...newPost,
    });
});

test('deve atualizar um post pela API', async ({ request }) => {
    const updatedPost = {
        id: 1,
        title: 'Playwright API Testing',
        body: 'Praticando requisições PUT com Playwright',
        userId: 1,
    };

    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
            data: updatedPost,
        }
    );

    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post).toMatchObject(updatedPost);
});

test('deve remover um post pela API', async ({ request }) => {
    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/posts/1'
    );

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});