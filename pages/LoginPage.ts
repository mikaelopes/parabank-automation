import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly registerLink: Locator;
  readonly accountTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.errorMessage = page.locator('p.error');
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.accountTable = page.locator('#accountTable');
  }

  async goto() {
    await this.page.goto('index.htm');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL(/overview/);
    await expect(this.accountTable).toBeVisible();
  }

  async expectRegisterLinkVisible() {
    await expect(this.registerLink).toBeVisible();
  }
}
