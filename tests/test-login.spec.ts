import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

function loadLoginData() {
  const filePath = path.join(__dirname, '..', 'test_data', 'login_data.csv');
  const content = fs.readFileSync(filePath, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true });
  return records.map((row: any) => ({
    username: row.username,
    password: row.password,
    expectedSuccess: row.expected_success.toLowerCase() === 'true'
  }));
}

const loginData = loadLoginData();

test.describe('Login tests (data-driven)', () => {
  for (const { username, password, expectedSuccess } of loginData) {
    test(`login with ${username} / ${password} → success: ${expectedSuccess}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(username, password);

      if (expectedSuccess) {
        await expect(page).toHaveURL(/.*inventory/);
      } else {
        await expect(page.locator('[data-test="error"]')).toBeVisible();
      }
    });
  }
});
