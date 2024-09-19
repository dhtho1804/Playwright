import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common methods for all pages can go here
  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}
