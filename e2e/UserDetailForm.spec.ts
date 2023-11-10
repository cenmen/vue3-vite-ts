import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/user/detail');
  await page.waitForTimeout(1000);
  await page.getByLabel('Activity name').click();
  await page.getByLabel('Activity name').fill('name');
  await page.waitForTimeout(1000);
  await page.getByLabel('Activity zone').click();
  await page.getByText('Zone one').click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Pick a date').click();
  await page.getByTitle('2023-11-17').getByText('17').click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByLabel('Instant delivery').click();
  await page.waitForTimeout(1000);
  await page.getByLabel('Online').check();
  await page.getByLabel('Offline').check();
  await page.waitForTimeout(1000);
  await page.getByLabel('Venue').check();
  await page.waitForTimeout(1000);
  await page.getByLabel('Activity form').click();
  await page.getByLabel('Activity form').fill('textarea');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByText('操作成功')).toBeVisible()
});