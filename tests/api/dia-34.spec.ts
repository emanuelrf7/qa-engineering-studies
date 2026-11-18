import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import type { JSONSchemaType } from 'ajv';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const postSchema: JSONSchemaType<Post> = {
    type: 'object',

    properties: {
        userId: {
            type: 'number',
        },
        id: {
            type: 'number',
        },
        title: {
            type: 'string',
        },
        body: {
            type: 'string',
        },
    },

    required: [
        'userId',
        'id',
        'title',
        'body',
    ],

    additionalProperties: false,
};

const ajv = new Ajv({
    allErrors: true,
});

const validatePost = ajv.compile(postSchema);

test.use({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

test('deve validar a response com Ajv', async ({ request }) => {
    const response = await request.get('/posts/1');

    expect(response.status()).toBe(200);

    const postData: unknown = await response.json();

    const isValid = validatePost(postData);

    expect(
        isValid,
        `Falha na validação do schema:\n${JSON.stringify(validatePost.errors, null, 2)}`
    ).toBe(true);
});