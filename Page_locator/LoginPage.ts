import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';


export class LoginPage extends BasePage {
  username: Locator;
  password: Locator;
  loginButton: Locator;
  errorMsg: Locator;
  errorMsg2: Locator; 

  constructor(page: Page) {
    super(page);

    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMsg = page.locator('//h3[@data-test="error" and text()="Epic sadface: Username and password do not match any user in this service"]');
    this.errorMsg2 = page.locator('//h3[@data-test="error" and text()="Epic sadface: Username is required"]');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async invalidNameAndPassMsg() {
    await expect(this.errorMsg).toBeVisible();
  }

  async missingUsernameMsg() {
    await expect(this.errorMsg2).toBeVisible();
  }
  async verifyPageUrl(expectedUrl: string) {
    const currentUrl = await this.page.url();
    await expect(currentUrl).toBe(expectedUrl);
  }
  
}

export default LoginPage;
