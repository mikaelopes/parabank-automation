import { expect, type Locator, type Page } from '@playwright/test';

export class AccountsPage {
  readonly page: Page;
  readonly accountsTable: Locator;
  readonly accountLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsTable = page.locator('#accountTable');
    this.accountLinks = page.locator('#accountTable a');
  }

  async goto() {
    await this.page.goto('overview.htm');
  }

  async clickAccount(accountId: string) {
    await this.page.getByRole('link', { name: accountId }).click();
  }

  async getFirstAccountId(): Promise<string> {
    return (await this.accountLinks.first().textContent()) ?? '';
  }

  async expectAccountsVisible() {
    await expect(this.accountsTable).toBeVisible();
  }

  async expectNavigatedToAccount() {
    await expect(this.page).toHaveURL(/activity/);
  }
}
