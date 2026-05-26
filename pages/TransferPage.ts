import { expect, type Locator, type Page } from '@playwright/test';

export class TransferPage {
  readonly page: Page;
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly transferButton: Locator;
  readonly successMessage: Locator;
  readonly successContainer: Locator;
  readonly amountError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferButton = page.locator('input[value="Transfer"]');
    this.successMessage = page.locator('#showResult h1');
    this.successContainer = page.locator('#showResult');
    // ParaBank returns a server-side error when amount is empty (no client-side validation)
    this.amountError = page
      .locator('p.error')
      .filter({ hasText: 'internal error' });
  }

  async goto() {
    await this.page.goto('transfer.htm');
  }

  async transfer(amount: string, fromIndex = 0, toIndex = 1) {
    await this.amountInput.fill(amount);
    await this.fromAccountSelect.selectOption({ index: fromIndex });
    await this.toAccountSelect.selectOption({ index: toIndex });
    await this.transferButton.click();
  }

  async expectPageLoaded() {
    await expect(this.amountInput).toBeVisible();
    await expect(this.fromAccountSelect).toBeVisible();
    await expect(this.toAccountSelect).toBeVisible();
    await expect(this.transferButton).toBeVisible();
  }

  async expectTransferSuccess() {
    await expect(this.successMessage).toHaveText('Transfer Complete!');
  }

  async expectSuccessContainerContains(text: string) {
    await expect(this.successContainer).toContainText(text);
  }

  async expectAmountError() {
    await expect(this.amountError).toBeVisible();
  }
}
