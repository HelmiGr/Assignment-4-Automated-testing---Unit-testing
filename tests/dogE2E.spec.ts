import { test, expect } from '@playwright/test';

test.describe('Successful Dog Image Retrieval', () => {
    test('should retrieve dog image successfully when page is loaded', async ({ page }) => {
        // Navigate to the app
        await page.goto('/');

        // Wait for the API response to complete
        const responsePromise = page.waitForResponse('**/api/dogs/random');

        // Wait for the API call to finish
        await responsePromise;

        // Expect that image has source value
        // Expect that source value starts with https://
        const dogImage = page.getByAltText('Random dog');
        await expect(dogImage).toHaveAttribute('src', /^https:\/\//)
    });

    test('should retrieve dog image successfully when button is clicked', async ({ page }) => {
        // Navigate to the app
        await page.goto('/');

        // Wait for the API response to complete
        const responsePromise = page.waitForResponse('**/api/dogs/random');

        // Click button
        await page.getByRole('button', { name: 'Get Another Dog' }).click();

        // Wait for the API call to finish
        await responsePromise;

        // Expect that image has source value
        // Expect that source value starts with https://
        const dogImage = page.getByAltText('Random dog');
        await expect(dogImage).toHaveAttribute('src', /^https:\/\//)
    });
});

test.describe('Error Handling', () => {
    test('should show error when API call fails', async ({ page }) => {
        // Set route to abort on call
        await page.route('**/api/dogs/random', async (route) => {
            await route.abort();
        });

        // Navigate to the app
        await page.goto('/');

        // Expect that page has an element containing the word error
        // Use regular expression
        const errorText = page.getByText(/error/i)
        await expect(errorText).toBeVisible();
    });
})