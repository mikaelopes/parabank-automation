import { test } from '@playwright/test';
import { TRANSFER, USERS } from '../fixtures/users';
import { LoginPage } from '../pages/LoginPage';
import { TransferPage } from '../pages/TransferPage';

test.describe('Fund Transfer', () => {
  let transferPage: TransferPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.valid.username, USERS.valid.password);
    await loginPage.expectLoggedIn();

    transferPage = new TransferPage(page);
    await transferPage.goto();
  });

  test('page renders required elements', async () => {
    await transferPage.expectPageLoaded();
  });

  test('successful fund transfer between accounts', async () => {
    await transferPage.transfer(TRANSFER.amount, 0, 1);
    await transferPage.expectTransferSuccess();
  });

  test('success confirmation includes the transferred amount', async () => {
    await transferPage.transfer(TRANSFER.amount, 0, 1);
    await transferPage.expectSuccessContainerContains(TRANSFER.amount);
  });

  test('error shown when amount field is empty', async () => {
    await transferPage.transferButton.click();
    await transferPage.expectAmountError();
  });
});
