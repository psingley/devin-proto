import assert from 'node:assert';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Counter', () => {
  test.describe('Increment operation', () => {
    test('should display error message when incrementing with negative number', async ({
      page,
    }) => {
      await page.goto('/counter');

      // Wait for the counter to be visible and stable
      await expect(page.getByText('Count:', { exact: false })).toBeVisible({ timeout: 10000 });

      const count = page.getByText('Count:', { exact: false });
      const countText = await count.textContent();

      assert(countText !== null, 'Count should not be null');

      await page.getByLabel('Increment by').fill('-1');
      await page.getByRole('button', { name: 'Increment' }).click();

      await expect(page.getByText('Number must be greater than or equal to 1')).toBeVisible();
      await expect(page.getByText('Count:', { exact: false })).toHaveText(countText);
    });

    test('should increment the counter and validate the count', async ({
      page,
    }) => {
      const e2eRandomId = faker.number.int({ max: 1000000 });
      await page.setExtraHTTPHeaders({
        'x-e2e-random-id': e2eRandomId.toString(),
      });
      await page.goto('/counter');

      // Wait for the counter to be visible and stable
      await expect(page.getByText('Count:', { exact: false })).toBeVisible({ timeout: 10000 });

      const count = page.getByText('Count:', { exact: false });
      const countText = await count.textContent();

      assert(countText !== null, 'Count should not be null');
      const countNumber = Number(countText?.replace('Count: ', '') || 0);

      await page.getByLabel('Increment by').fill('2');
      await page.getByRole('button', { name: 'Increment' }).click();

      // Wait for and verify the updated count
      await expect(page.getByText(`Count: ${countNumber + 2}`)).toBeVisible({ timeout: 5000 });

      await page.getByLabel('Increment by').fill('3');
      await page.getByRole('button', { name: 'Increment' }).click();

      // Wait for and verify the updated count
      await expect(page.getByText(`Count: ${countNumber + 5}`)).toBeVisible({ timeout: 5000 });
    });
  });
});
