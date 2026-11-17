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