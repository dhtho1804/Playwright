import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import HomePage from './HomePage'; 

export class CheckOutPage extends BasePage {
  RemoveBtn: Locator;
  ContinueShoppingbtn: Locator;
  FirstName: Locator;
  LastName: Locator;
  PostalCode: Locator;
  CheckOutBtn: Locator;
  ContinuetBtn: Locator;
  CancelBtn: Locator;
  FinishBtn: Locator;
  CheckOutOverviewPage: Locator;
  CheckOutInformPage: Locator;
  CompleteOrdTitle: Locator;
  LeaveFieldsEmptyErr: Locator;
  BackHomeBtn: Locator; // Fixed the syntax for BackHomeBtn
  
  constructor(page: Page) {
    super(page);

    this.RemoveBtn = page.locator('//button[@class="btn btn_secondary btn_small cart_button"]');
    this.ContinueShoppingbtn = page.locator('#continue-shopping');
    this.FirstName = page.locator('#first-name');
    this.LastName = page.locator('#last-name');
    this.PostalCode = page.locator('#postal-code');
    this.CheckOutBtn = page.locator('#checkout');
    this.ContinuetBtn = page.locator('#continue');
    this.CancelBtn = page.locator('#cancel');
    this.LeaveFieldsEmptyErr = page.locator('//h3[@data-test="error" and text()="Error: First Name is required"]');
    this.FinishBtn = page.locator('#finish');
    this.CheckOutOverviewPage = page.locator('//span[@class="title" and text()="Checkout: Overview"]');
    this.CheckOutInformPage = page.locator('//span[@class="title" and text()="Checkout: Your Information"]');
    this.CompleteOrdTitle = page.locator('//h2[@class="complete-header" and text()="Thank you for your order!"]');
    this.BackHomeBtn = page.locator('//button[@id="back-to-products"]'); // Adjusted the locator for BackHomeBtn
  }

  setProductLabelLocator(productName: string): Locator {
    return this.page.locator(`//*[@class="cart_desc_label" and text()="Description"]/following-sibling::div//div[@class="inventory_item_name" and text()="${productName}"]`);
  }

  async verifyProductLabel(productName: string) {
    const productLabel = this.setProductLabelLocator(productName);
    await expect(productLabel).toBeVisible();
  }

  async removeProductInCheckOutPage() {
    await this.RemoveBtn.click();
  }

  async verifyProductIsRemoved(productName: string) {
    const productLabel = this.setProductLabelLocator(productName);
    await expect(productLabel).not.toBeVisible();
  }

  async clickContinueShopping() {
    await this.ContinueShoppingbtn.click();
  }

  async fillCredential(firstName: string, lastName: string, postalCode: string) {
    await this.FirstName.fill(firstName);
    await this.LastName.fill(lastName);
    await this.PostalCode.fill(postalCode);
  }

  async clickCheckOutBtn() {
    await this.CheckOutBtn.click();
  }
  
  async clickCancelCheckout() {
    await this.CancelBtn.click();
  }

  async navigateInformationPage() {
    await expect(this.CheckOutInformPage).toBeVisible();
  }

  async navigateCheckOutOverviewPage() {
    await expect(this.CheckOutOverviewPage).toBeVisible();
  }

  async clickFinishOrderBtn() {
    await this.FinishBtn.click();
  }

  async completedOrderTitle() {
    await expect(this.CompleteOrdTitle).toBeVisible();
  }

  async clickContinueBtn() {
    await this.ContinuetBtn.click();
  }
  async clickBackToHomePage() {
    await this.BackHomeBtn.click();
  }
  async MsgMissingCredentials() {
    await expect(this.LeaveFieldsEmptyErr).toBeVisible();
  }
}

export default CheckOutPage;
