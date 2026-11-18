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