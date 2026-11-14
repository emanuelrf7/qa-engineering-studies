import { test, expect } from '@playwright/test';

test.use({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

test('deve consultar um post pela API', async ({ request }) => {
    const response = await request.get('/posts/1');

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

    const response = await request.post('/posts', {
        data: newPost,
    });

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

    const response = await request.put('/posts/1', {
        data: updatedPost,   
    });

    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post).toMatchObject(updatedPost);
});

test('deve remover um post pela API', async ({ request }) => {
    const response = await request.delete('/posts/1');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test('deve filtrar posts por usuário', async ({ request }) => {
    const response = await request.get('/posts', {
        params: {
            userId: 1,
        },
    });

    expect(response.status()).toBe(200);

    const posts: Array<{ userId: number }> = await response.json();

    expect(posts.length).toBeGreaterThan(0);

    expect(
        posts.every((post) => post.userId === 1)
    ).toBeTruthy();
});