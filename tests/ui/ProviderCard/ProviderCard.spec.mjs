import { strict as assert } from 'node:assert';
import { chromium } from 'playwright';
import { createViteTestServer } from '../../helpers/create-vite-test-server.mjs';

const { server, baseUrl } = await createViteTestServer();
const browser = await chromium.launch();

try {
  const page = await browser.newPage();

  await page.goto(`${baseUrl}/tests/ui/ProviderCard/ProviderCard.fixture.html`);

  await page.getByRole('button', { name: 'Open' }).click();

  await assert.equal(await page.evaluate(() => document.body.dataset.openedUrl), 'https://klingai.com');
} finally {
  await browser.close();
  await server.close();
}
