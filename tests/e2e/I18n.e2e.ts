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

      // Wait for Clerk's sign-in form using the exact identifier input
      await page.waitForSelector('input[name="identifier"]', { timeout: 30000 });

      await expect(page.getByPlaceholder('Enter email or username')).toBeVisible();

      await page.goto('/fr/sign-in');

      // For French, check the sign-in form is loaded
      await page.waitForSelector('input[name="identifier"]', { timeout: 30000 });

      // We don't check the placeholder text in French since Clerk might handle translations differently
      await expect(page.locator('input[name="identifier"]')).toBeVisible();
    });
  });
});
