import { test, expect } from '@playwright/test';
import LoginPage from '../Page_locator/LoginPage'; 
import HomePage from '../Page_locator/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  loginPage = new LoginPage(page); // Initialize the LoginPage instance before each test case
});

test.describe('Login to Saucedemo', () => {

  test('Login to page successfully', async () => {
    await test.step('Input valid username and password', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
      await loginPage.verifyPageUrl('https://www.saucedemo.com/inventory.html');
    });
  });

  test('Login unsuccessfully with invalid credentials', async () => {
    await test.step('Input invalid username and password and click login button', async () => {
      await loginPage.login('invalid_user', 'wrong_password');
      await loginPage.invalidNameAndPassMsg(); // Ensure this method is defined in LoginPage
    });
  });

  test('Leave username and password empty', async () => {
    await test.step('Leave username and password empty and click login button', async () => {
      await loginPage.login('', '');
      await loginPage.missingUsernameMsg(); // Ensure this method is defined in LoginPage
    });
  });

  test('Input valid username and invalid password', async () => {
    await test.step('Input valid username and invalid password and click login button', async () => {
      await loginPage.login('standard_user', 'test');
      await loginPage.invalidNameAndPassMsg(); // Ensure this method is defined in LoginPage
    });
  });

  test('Input invalid username and valid password', async () => {
    await test.step('Input invalid username and valid password and click login button', async () => {
      await loginPage.login('test', 'secret_sauce');
      await loginPage.invalidNameAndPassMsg(); // Ensure this method is defined in LoginPage
    });
  });

  test('Logout the account', async ({ page }) => {
    await test.step('Login then logout the account', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
      await loginPage.verifyPageUrl('https://www.saucedemo.com/inventory.html');
      await homePage.clickHamburgerBtn();
      
    })
    
    
  })
  

});

test.afterEach(async ({ page }) => {
  await page.close();
});
