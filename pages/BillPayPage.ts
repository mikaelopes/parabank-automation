import { expect, type Locator, type Page } from '@playwright/test';

export class BillPayPage {
  readonly page: Page;
  readonly payeeNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly accountInput: Locator;
  readonly verifyAccountInput: Locator;
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly sendButton: Locator;
  readonly successMessage: Locator;
  readonly successContainer: Locator;
  readonly nameError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.addressInput = page.locator('input[name="payee.address.street"]');
    this.cityInput = page.locator('input[name="payee.address.city"]');
    this.stateInput = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.phoneInput = page.locator('input[name="payee.phoneNumber"]');
    this.accountInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.sendButton = page.locator('input[value="Send Payment"]');
    this.successMessage = page.locator('#billpayResult h1');
    this.successContainer = page.locator('#billpayResult');
    this.nameError = page.locator('#validationModel-name');
  }

  async goto() {
    await this.page.goto('billpay.htm');
  }

  async fillPayeeDetails(payee: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    accountNumber: string;
  }) {
    await this.payeeNameInput.fill(payee.name);
    await this.addressInput.fill(payee.address);
    await this.cityInput.fill(payee.city);
    await this.stateInput.fill(payee.state);
    await this.zipCodeInput.fill(payee.zipCode);
    await this.phoneInput.fill(payee.phone);
    await this.accountInput.fill(payee.accountNumber);
    await this.verifyAccountInput.fill(payee.accountNumber);
  }

  async sendPayment(amount: string) {
    await this.amountInput.fill(amount);
    await this.sendButton.click();
  }

  async expectPageLoaded() {
    await expect(this.payeeNameInput).toBeVisible();
    await expect(this.addressInput).toBeVisible();
    await expect(this.amountInput).toBeVisible();
    await expect(this.sendButton).toBeVisible();
  }

  async expectPaymentSuccess() {
    await expect(this.successMessage).toContainText('Bill Payment Complete');
  }

  async expectSuccessContainerContains(text: string) {
    await expect(this.successContainer).toContainText(text);
  }

  async expectNameError() {
    await expect(this.nameError).toBeVisible();
  }
}
