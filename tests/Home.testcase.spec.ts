import { test, expect } from '@playwright/test';
import HomePage from '../Page_locator/HomePage'; // Ensure the path and file name are correct
import LoginPage from '../Page_locator/LoginPage'; 
import CheckOutPage from '../Page_locator/CheckOutPage'; // Corrected the import to match the class name

let homePage: HomePage;
let loginPage: LoginPage;
let checkOutPage: CheckOutPage;

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  loginPage = new LoginPage(page); 
  homePage = new HomePage(page);
  checkOutPage = new CheckOutPage(page); 
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifyPageUrl('https://www.saucedemo.com/inventory.html');
});

test.describe('Add product to cart successfully', () => {
  test('Add product to cart and verify if it is added', async () => {
    await homePage.addProductToCart('Sauce Labs Backpack');
    await checkOutPage.verifyProductLabel('Sauce Labs Backpack'); 
    await checkOutPage.removeProductInCheckOutPage();
    await checkOutPage.verifyProductIsRemoved('Sauce Labs Backpack');
    await checkOutPage.clickContinueShopping();
    await loginPage.verifyPageUrl('https://www.saucedemo.com/inventory.html');
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
