import { strict as assert } from 'node:assert';
import { chromium } from 'playwright';
import { createViteTestServer } from '../../helpers/create-vite-test-server.mjs';

const { server, baseUrl } = await createViteTestServer();
const browser = await chromium.launch();

try {
  const page = await browser.newPage();

  await page.goto(`${baseUrl}/tests/ui/Button/Button.fixture.html`);

  const iconButton = page.getByRole('button', { name: 'Icon action' });
  await assert.equal(await iconButton.locator('svg').count(), 1);
  await assert.equal(await iconButton.getAttribute('data-tooltip'), 'Icon action');

  await page.getByRole('button', { name: 'Clickable action' }).click();
  await assert.equal(await page.evaluate(() => document.body.dataset.enabledClicks), '1');

  await page.getByRole('button', { name: 'Disabled action' }).click({ force: true });
  await assert.equal(await page.evaluate(() => document.body.dataset.disabledClicks), undefined);
} finally {
  await browser.close();
  await server.close();
}
