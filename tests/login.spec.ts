import { test } from '@playwright/test';
import { USERS } from '../../fixtures/users';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('successful login with valid credentials', async () => {
    await loginPage.login(USERS.valid.username, USERS.valid.password);
    await loginPage.expectLoggedIn();
  });

  test('error shown when invalid credentials', async () => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await loginPage.expectLoginError();
  });

  test('error shown when username is empty', async () => {
    await loginPage.login('', USERS.valid.password);
    await loginPage.expectLoginError();
  });

  test('error shown when password is empty', async () => {
    await loginPage.login(USERS.valid.username, '');
    await loginPage.expectLoginError();
  });

  test('register link is visible on login page', async () => {
    await loginPage.expectRegisterLinkVisible();
  });
});
