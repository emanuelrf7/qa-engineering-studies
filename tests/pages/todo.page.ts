import { type Locator, type Page } from '@playwright/test';

export class TodoPage {
    page: Page;
    readonly newTodoInput: Locator;
    allListItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTodoInput = page.getByPlaceholder('What needs to be done?');
        this.allListItems = page.getByRole('listitem');
    }

    async goto() {
        await this.page.goto("https://demo.playwright.dev/todomvc/#/");
    }

    async createTodo(title: string) {
        await this.newTodoInput.fill(title);
        await this.newTodoInput.press('Enter');
    }

    taskLocator(title: string): Locator {
        return this.allListItems.filter({
            has: this.page.getByText(title, { exact: true }),
        });
    }
}