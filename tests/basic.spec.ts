import { test, expect } from '@playwright/test';

// Group tests related to initial page structure and appearance
test.describe('Initial Page Load', () => {
  // Run before each test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Ensure all network requests are settled
  });

  test('renders essential elements', async ({ page }) => {
    // Check Search Form Inputs
    await expect(page.locator('input[placeholder="曲名"]')).toBeVisible();
    await expect(page.locator('input[placeholder="アーティスト"]')).toBeVisible();
  });

  test('any error messages are not visible', async ({ page }) => {
    // Check for any error messages
    await expect(page.locator('.chakra-alert__root')).not.toBeVisible();
  });

  test('initial page load snapshot', async ({ page }) => {
    // Snapshot is taken after beforeEach hook ensures page is loaded and settled
    await expect(page).toHaveScreenshot('initial-load.png');
  });
});

// Group tests related to user interactions
test.describe('Search Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle'); // Ensure all network requests are settled
  });

  test('search form is enabled', async ({ page }) => {
    // Check if the search form is enabled
    await expect(page.locator('input[placeholder="曲名"]')).toBeEnabled();
    await expect(page.locator('input[placeholder="アーティスト"]')).toBeEnabled();
  });

  test('finds song by title', async ({ page }) => {
    const titleInput = page.locator('input[placeholder="曲名"]');
    const searchQuery = '夢の中へ';

    // Type into the title input field
    await titleInput.fill(searchQuery);

    // Find the first song card
    const firstSongCard = page.getByRole('listitem').first();
    await expect(firstSongCard).toBeVisible();
    await expect(firstSongCard.locator('text=夢の中へ')).toBeVisible();
    await expect(firstSongCard.locator('text=井上陽水')).toBeVisible();
  });

  test('finds song by artist', async ({ page }) => {
    const artistInput = page.locator('input[placeholder="アーティスト"]');
    const searchQuery = '井上陽水';

    // Type into the artist input field
    await artistInput.fill(searchQuery);

    // Find the first song card
    const firstSongCard = page.getByRole('listitem').first();
    await expect(firstSongCard).toBeVisible();
    await expect(firstSongCard.locator('text=井上陽水')).toBeVisible();
  });

  test('finds song by both title and artist', async ({ page }) => {
    const titleInput = page.locator('input[placeholder="曲名"]');
    const artistInput = page.locator('input[placeholder="アーティスト"]');
    const titleQuery = '01';
    const artistQuery = '女王蜂';

    // Type into both input fields
    await titleInput.fill(titleQuery);
    await artistInput.fill(artistQuery);

    // Find the first song card
    const firstSongCard = page.getByRole('listitem').first();
    await expect(firstSongCard).toBeVisible();
    await expect(firstSongCard.locator('text=01')).toBeVisible();
    await expect(firstSongCard.locator('text=女王蜂')).toBeVisible();

    await expect(page).toHaveScreenshot('search-result.png');
  });
  
  test('finds songs by incremental input', async ({ page }) => {
    const titleInput = page.locator('input[placeholder="曲名"]');

    // Start by typing the first character into the title input field
    await titleInput.fill('あ');

    // Verify that the first song card is visible and contains the expected text
    const firstSongCard = page.getByRole('listitem').first();
    await expect(firstSongCard).toBeVisible();
    await expect(firstSongCard.locator('text=あ')).toBeVisible();
    await expect(firstSongCard.locator('text=クリープハイプ')).toBeVisible();

    // Check the total number of results displayed in the toolbar
    const resultsCount = page.getByRole('toolbar').getByTitle('総件数');
    await expect(resultsCount).toHaveText(/件ヒット/);
    const resultsCountNum1 = parseInt(await resultsCount.innerText());

    // Add another character to the input field and verify the updated results
    await titleInput.fill('ああ');
    const songCards = page.getByRole('listitem');

    // Ensure the first song card is still visible but does not contain the previous text
    await expect(songCards.first()).toBeVisible();
    await expect(songCards.first()).not.toHaveText(/クリープハイプ/);

    // Verify the total number of results has decreased
    await expect(resultsCount).toHaveText(/件ヒット/);
    const resultsCountNum2 = parseInt(await resultsCount.innerText());
    expect(resultsCountNum2).toBeLessThan(resultsCountNum1);

    // Confirm that a specific song matching the new input is visible
    await expect(songCards.locator('text=ああ情熱のバンバラヤー')).toBeVisible();
  });

  test('clicking artist search icon fills artist query and clears title query', async ({ page }) => {
    const titleInput = page.locator('input[placeholder="曲名"]');
    const artistInput = page.locator('input[placeholder="アーティスト"]');

    // First search for a song by title to get some results
    await titleInput.fill('夢の中へ');

    // Verify the search result appears
    const firstSongCard = page.getByRole('listitem').first();
    await expect(firstSongCard).toBeVisible();
    await expect(firstSongCard.locator('text=井上陽水')).toBeVisible();

    // Click the search icon next to the artist name
    const artistSearchButton = firstSongCard.getByRole('button', { name: /井上陽水で検索/ });
    await expect(artistSearchButton).toBeVisible();
    await artistSearchButton.click();

    // Verify the artist query is now filled with the artist name
    await expect(artistInput).toHaveValue('井上陽水');

    // Verify the title query has been cleared
    await expect(titleInput).toHaveValue('');

    // Verify the search results now show songs by this artist
    const songCards = page.getByRole('listitem');
    await expect(songCards.first()).toBeVisible();
    await expect(songCards.first().locator('text=井上陽水')).toBeVisible();
  });
});
