import {test, expect} from '@playwright/test';
import LoginPage from '../Page_locator/LoginPage';
import HomePage from '../Page_locator/HomePage';
import CheckOutPage from '../Page_locator/CheckOutPage';

let loginPage: LoginPage;
let homePage: HomePage;
let checkOutPage: CheckOutPage;


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    loginPage = new LoginPage(page); 
    homePage = new HomePage(page);
    checkOutPage = new CheckOutPage(page); 
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyPageUrl('https://www.saucedemo.com/inventory.html');
    await homePage.addProductToCart('Sauce Labs Backpack');
    await checkOutPage.verifyProductLabel('Sauce Labs Backpack'); 

});

test.describe('Complete Order successfully', () => {
    test('Complete order and navigate back to home page', async ({ page }) => {
        await checkOutPage.clickCheckOutBtn();
        await checkOutPage.navigateInformationPage();
        await checkOutPage.fillCredential('testing', 'password', '12345'); 
        await checkOutPage.clickContinueBtn();
        await checkOutPage.navigateCheckOutOverviewPage();
        await checkOutPage.clickFinishOrderBtn();
        await checkOutPage.completedOrderTitle();
        await checkOutPage.clickBackToHomePage();
        await loginPage.verifyPageUrl('https://www.saucedemo.com/inventory.html');

    });
    test.describe('Complete Order unsuccessfully', () => {
        test('Cannot completing order when leaving credentials empty ', async ({ page }) => {
            await checkOutPage.clickCheckOutBtn();
            await checkOutPage.fillCredential('', '', ''); 
            await checkOutPage.clickContinueBtn();
            await checkOutPage.MsgMissingCredentials();


            
        });
        
});

});
