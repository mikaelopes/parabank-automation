import { test } from '@playwright/test';
import { BILL_PAY, USERS } from '../../fixtures/users';
import { BillPayPage } from '../../pages/BillPayPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Bill Payment', () => {
  let billPayPage: BillPayPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.valid.username, USERS.valid.password);
    await loginPage.expectLoggedIn();

    billPayPage = new BillPayPage(page);
    await billPayPage.goto();
  });

  test('bill pay page renders all required fields', async () => {
    await billPayPage.expectPageLoaded();
  });

  test('successfully submits bill payment', async () => {
    await billPayPage.fillPayeeDetails(BILL_PAY.payee);
    await billPayPage.sendPayment(BILL_PAY.amount);
    await billPayPage.expectPaymentSuccess();
  });

  test('success confirmation includes the payee name', async () => {
    await billPayPage.fillPayeeDetails(BILL_PAY.payee);
    await billPayPage.sendPayment(BILL_PAY.amount);
    await billPayPage.expectSuccessContainerContains(BILL_PAY.payee.name);
  });

  test('shows validation error when payee name is missing', async () => {
    await billPayPage.sendPayment(BILL_PAY.amount);
    await billPayPage.expectNameError();
  });
});
