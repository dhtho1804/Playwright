import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  AddToCartIcon: Locator;
  DropdownBtn: Locator;
  HamburgerBtn: Locator;
  AllItems: Locator;
  LogOut:Locator;

  constructor(page: Page) {
    super(page);

    this.AddToCartIcon = page.locator('//div[@id="shopping_cart_container"]');
    this.DropdownBtn = page.locator('//*[@id="inventory_filter_container"]/select');
    this.HamburgerBtn = page.locator('//div[@class="bm-burger-button"]');
    this.AllItems = page.locator('//a[@id="inventory_sidebar_link" and text()="All Items"]');
    this.LogOut = page.locator('//a[@id="logout_sidebar_link" and text()="Logout"]');

  }


  setProductLocators(productName: string) {
    const addToCartBtn = this.page.locator(`//div[text()="${productName}"]/ancestor::div[contains(@class, "inventory_item")]//button[contains(@class, "btn_inventory")]`);
    const removeBtn = this.page.locator(`//div[text()="${productName}"]/ancestor::div[contains(@class, "inventory_item")]//button[contains(@class, "btn_secondary")]`);
    return { addToCartBtn, removeBtn };
  }

  async addProductToCart(productName: string) {
    const { addToCartBtn, removeBtn } = this.setProductLocators(productName);

    await addToCartBtn.click(); 
    await expect(removeBtn).toBeVisible(); 
    await this.AddToCartIcon.click(); 
  }

  async navigateToCheckOutPage() {
    await this.AddToCartIcon.click();
  }

  async verifyAddToCartBtnIsVisible(productName: string) {
    const { addToCartBtn } = this.setProductLocators(productName);

    await expect(addToCartBtn).toBeVisible();
  }
  async clickHamburgerBtn() {
    await this.HamburgerBtn.click();
  }
  async navigateToHomePage() {
    await this.AllItems.click();
  }
  async LogOutaccount() {
    await this.LogOut.click();
  }
}

export default HomePage;
