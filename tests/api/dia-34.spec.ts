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

test('deve rejeitar um objeto sem propriedade obrigatória', () => {
    const invalidPost: unknown = {
        userId: 1,
        id: 1,
        title: 'Example',
    };

    const isValid = validatePost(invalidPost);
    const validationErrors = validatePost.errors;

    expect(isValid).toBe(false);

    expect(
        validationErrors?.some((error) => error.keyword === 'required')
    ).toBe(true);
});

test('deve rejeitar um objeto com tipo incorreto', () => {
    const incorrectTypePost: unknown = {
        userId: 1,
        id: 1,
        title: 123,
        body: 'Exemplo',
    };

    const isValid = validatePost(incorrectTypePost);
    const validationErrors = validatePost.errors;

    expect(isValid).toBe(false);

    expect(
        validationErrors?.some((error) => error.keyword === 'type')
    ).toBe(true);
});

test('deve rejeitar um objeto com propriedade adicional inválida', () => {
    const invalidAdditionalPropertyPost: unknown = {
        userId: 1,
        id: 1,
        title: 'Título exemplo',
        body: 'Exemplo',
        createdAt: '2026-11-18',
    };

    const isValid = validatePost(invalidAdditionalPropertyPost);
    const validationErrors = validatePost.errors;

    expect(isValid).toBe(false);

    expect(
        validationErrors?.some((error) => error.keyword === 'additionalProperties')
    ).toBe(true);
});

test('deve rejeitar um objeto com vários problemas simultaneamente', () => {
    const invalidPostWithMultipleErrors: unknown = {
        userId: '1',
        id: 1,
        title: 123,
        createdAt: '2026-11-18',
    };

    const isValid = validatePost(invalidPostWithMultipleErrors);
    const validationErrors = validatePost.errors;

    expect(isValid).toBe(false);

    expect(validationErrors).toHaveLength(4);

    expect(
        validationErrors?.filter((error) => error.keyword === 'type')
    ).toHaveLength(2);

    expect(
        validationErrors?.some((error) => error.keyword === 'required')
    ).toBe(true);

    expect(
        validationErrors?.some((error) => error.keyword === 'additionalProperties')
    ).toBe(true);
});

const postsSchema: JSONSchemaType<Post[]> = {
    type: 'array',
    items: postSchema,
    minItems: 1,
};

const validatePosts = ajv.compile(postsSchema);

test('deve validar o schema de uma coleção de posts', async ({ request }) => {
    const response = await request.get('/posts');

    expect(response.status()).toBe(200);

    const postsData: unknown = await response.json();
    const isValid = validatePosts(postsData);
    const validationErrors = validatePosts.errors;

    expect(
        isValid,
        `Falha na validação do schema:\n${JSON.stringify(validationErrors, null, 2)}`
    ).toBe(true);
});

test('deve rejeitar uma coleção com um post inválido', () => {
    const postsWithInvalidItem: unknown = [
        {
            userId: 1,
            id: 1,
            title: 'Post válido',
            body: 'Conteúdo válido',
        },
        {
            userId: 2,
            id: 2,
            title: 123,
            body: 'Conteúdo válido',
        },
    ];

    const isValid = validatePosts(postsWithInvalidItem);
    const validationErrors = validatePosts.errors;

    expect(isValid).toBe(false);

    expect(
        validationErrors?.some((error) => error.keyword === 'type')
    ).toBe(true);

    expect(
        validationErrors?.some((error) => error.instancePath === '/1/title')
    ).toBe(true);
});

test('deve rejeitar uma coleção vazia pela regra minItems', () => {
    const emptyPosts: unknown = [];

    const isValid = validatePosts(emptyPosts);
    const validationErrors = validatePosts.errors;

    expect(isValid).toBe(false);

    expect(
        validationErrors?.some((error) => error.keyword === 'minItems')
    ).toBe(true);
});