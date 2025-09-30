import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';

test('checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');

  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addProductsToCart();
  await productsPage.goToCart();
  await cartPage.checkout();
  await checkoutPage.fillInformation('Nhung', 'Nguyen', '10000');
  await checkoutPage.finishCheckout();

    await expect(page.locator('.inventory_list')).toBeVisible();
});
