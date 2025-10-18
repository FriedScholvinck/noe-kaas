import { test, expect } from '@playwright/test'

test('portaal shows filters and products without login', async ({ page }) => {
  await page.goto('/portaal')
  
  await expect(page.getByRole('heading', { name: 'Ons assortiment' })).toBeVisible()
  
  await expect(page.getByRole('heading', { name: 'Filters' })).toBeVisible()
  
  await expect(page.getByText('Login om te bestellen', { exact: false })).toBeVisible()
  
  const addButtons = page.getByRole('button', { name: /toevoegen/i })
  await expect(addButtons.first()).not.toBeVisible()
})

test('admin redirect to login when not authenticated', async ({ page }) => {
  await page.goto('/admin')
  
  await expect(page).toHaveURL(/\/login/)
})

test('contact form can be submitted', async ({ page }) => {
  await page.goto('/contact')
  
  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'Dit is een test bericht voor Noë Kaas')
  
  await page.click('button[type="submit"]')
  
  await expect(page.getByText('Bedankt voor uw bericht', { exact: false })).toBeVisible()
})

