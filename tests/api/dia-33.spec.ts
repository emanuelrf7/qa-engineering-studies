import { test, expect } from '@playwright/test';

test.use({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

test('deve consultar o autor relacionado a um post', async ({ request }) => {
    const postResponse = await request.get('/posts/1');

    expect(postResponse.status()).toBe(200);

    const post = await postResponse.json() as {
        id: number;
        userId: number;
        title: string;
    };

    expect(post.id).toBe(1);

    const userResponse = await request.get(`/users/${post.userId}`);

    expect(userResponse.status()).toBe(200);

    const user = await userResponse.json() as {
        id: number;
        name: string;
        email: string;
    };

    expect(user.id).toBe(post.userId);
    expect(user.name).toEqual(expect.any(String));
    expect(user.email).toContain('@');
});

test('deve consultar comentários de um post utilizando nested resources', async ({ request }) => {
    const postId = 1;

    const firstCommentsIds = await test.step('Consultar comentários pela rota aninhada', async () => {
        const response = await request.get(`/posts/${postId}/comments`);

        expect(response.status()).toBe(200);

        const comments = await response.json() as Array<{
            id: number;
            postId: number;
            name: string;
            email: string;
            body: string;
        }>;

        expect(comments.length).toBeGreaterThan(0);

        expect(
            comments.every((comment) => comment.postId === postId)
        ).toBeTruthy();

        const firstResultIds = comments.map((comment) => comment.id).sort((a, b) => a -  b);

        return firstResultIds;
    });

    const secondCommentsIds = await test.step('Consultar comentários pela rota de filtragem', async () => {
        const response = await request.get('/comments', {
            params: {
                postId,
            },
        });

        expect(response.status()).toBe(200);

        const comments = await response.json() as Array<{
            id: number;
            postId: number;
            name: string;
            email: string;
            body: string;
        }>;

        expect(comments.length).toBeGreaterThan(0);

        expect(
            comments.every((comment) => comment.postId === postId)
        ).toBeTruthy();

        const secondResultIds = comments.map((comment) => comment.id).sort((a, b) => a -  b);

        return secondResultIds;
    });

    expect(firstCommentsIds).toEqual(secondCommentsIds);
});

test('deve identificar uma resposta HTTP 404', async ({ request }) => {
    const response = await request.get('https://httpbin.org/status/404');

    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();
});

test('deve identificar uma resposta HTTP 400', async ({ request }) => {
    const response = await request.get('https://httpbin.org/status/400');

    expect(response.status()).toBe(400);
    expect(response.ok()).toBeFalsy();
});