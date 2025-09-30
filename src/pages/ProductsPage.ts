import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly backpackAdd: Locator;
  readonly tshirtAdd: Locator;
  readonly bikeLightAdd: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackAdd = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.tshirtAdd = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.bikeLightAdd = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addProductsToCart() {
    await this.backpackAdd.click();
    await this.tshirtAdd.click();
    await this.bikeLightAdd.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
