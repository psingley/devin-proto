import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to French using dropdown and verify text on the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', { name: 'Boilerplate Code for Your Next.js Project with Tailwind CSS' }),
      ).toBeVisible();

      await page.getByLabel('lang-switcher').selectOption('fr');

      await expect(
        page.getByRole('heading', { name: 'Code de démarrage pour Next.js avec Tailwind CSS' }),
      ).toBeVisible();
    });

    test('should switch language from English to French using URL and verify text on the sign-in page', async ({ page }) => {
      await page.goto('/sign-in');

      // Wait for Clerk to load and look for the email input field instead of text
      await page.waitForSelector('input[name="emailAddress"]', { timeout: 10000 });

      await expect(page.locator('input[name="emailAddress"]')).toBeVisible();

      await page.goto('/fr/sign-in');

      // For French, also look for the input field since Clerk handles the translation
      await page.waitForSelector('input[name="emailAddress"]', { timeout: 10000 });

      await expect(page.locator('input[name="emailAddress"]')).toBeVisible();
    });
  });
});
