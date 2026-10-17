import { expect, test } from '@playwright/test';

const routes = ['/', '/direction/', '/profile/', '/work/', '/work/bbva-business-banking/',
  '/work/coca-cola-ai-workspace/', '/work/caixabank-manager-tool/',
  '/work/movelia-brand-and-booking/', '/work/zip-water-interface/',
  '/focus/product-leadership/', '/focus/product-and-ai/', '/focus/staff-and-principal/'];

test('every public route and its internal links work without browser errors', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const links = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('h1'), route).toHaveCount(1);
    await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', /\S/);
    const hrefs = await page.locator('a[href]').evaluateAll(elements => elements.map(element => element.getAttribute('href')!));
    for (const href of hrefs) {
      if (href.startsWith('/')) {
        const url = new URL(href, 'http://127.0.0.1:4322');
        links.add(url.pathname);
        if (url.pathname === route && url.hash) {
          expect(await page.locator(url.hash).count(), `${route}${url.hash}`).toBe(1);
        }
      } else if (href.startsWith('#')) {
        expect(await page.locator(href).count(), `${route}${href}`).toBe(1);
      }
    }
  }
  for (const path of links) expect((await request.get(path)).status(), path).toBe(200);
  expect(errors).toEqual([]);
});

test('work filters show the relevant cases and preserve keyboard access', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.locator('.project-filter-item:visible')).toHaveCount(5);
  await page.getByRole('button', { name: 'Product & AI', exact: true }).click();
  await expect(page.locator('.project-filter-item:visible')).toHaveCount(3);
  await expect(page.locator('.project-filter-item:visible')).toContainText(['Coca-Cola', 'CaixaBank', 'Zip Water']);
  await expect(page.getByRole('button', { name: 'Product & AI', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const all = page.getByRole('button', { name: /All work/ });
  await all.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('.project-filter-item:visible')).toHaveCount(5);
});

test('mobile navigation opens, follows a link and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Profile', exact: true }).click();
  await expect(page).toHaveURL(/\/profile\/$/);
  await expect(page.locator('h1')).toContainText('A human perspective.');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
});

test('focused selections can be shared and contain their intended cases', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/focus/product-and-ai/');
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.locator('.project-card')).toContainText(['Coca-Cola', 'CaixaBank', 'Zip Water']);
  await page.getByRole('button', { name: 'Copy selection link' }).click();
  await expect(page.getByRole('status')).toHaveText('Link copied.');
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toBe('http://127.0.0.1:4322/focus/product-and-ai/');
});

test('cases retain attribution, project status and evidence boundaries', async ({ page, request }) => {
  await page.goto('/work/bbva-business-banking/');
  await expect(page.locator('#outcome')).toContainText('shared account result');
  await page.goto('/work/caixabank-manager-tool/');
  await expect(page.locator('#outcome')).toContainText('commercial team outcome');
  await expect(page.locator('#outcome')).toContainText('Production deployment');
  await page.goto('/work/zip-water-interface/');
  await expect(page.locator('#outcome')).toContainText('AI supported the design process');
  const cv = await request.get('/alexandra-mena-cv.pdf');
  expect(cv.status()).toBe(200);
  expect((await cv.body()).subarray(0, 5).toString()).toBe('%PDF-');
  const evidence = await (await request.get('/portfolio.json')).json();
  expect(evidence.projects).toHaveLength(5);
  expect(evidence.selections).toHaveLength(3);
  expect(evidence.evidenceAsOf).toBe('2026-09');
});

test('pages remain readable at narrow and wide widths', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/direction/', '/work/', '/profile/', '/work/bbva-business-banking/', '/focus/product-and-ai/']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route} at ${width}px`).toBe(true);
      await expect(page.locator('h1')).toBeVisible();
      const undersizedText = await page.evaluate(() => {
        const violations: string[] = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          const element = node.parentElement;
          if (!node.textContent?.trim() || !element || ['SCRIPT', 'STYLE'].includes(element.tagName)) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          const rect = range.getBoundingClientRect();
          const style = getComputedStyle(element);
          if (rect.width && rect.height && style.visibility !== 'hidden' && parseFloat(style.fontSize) < 16) {
            violations.push(`${node.textContent.trim().slice(0, 60)}: ${style.fontSize}`);
          }
        }
        return violations;
      });
      expect(undersizedText, `${route} at ${width}px: text must be at least 16px`).toEqual([]);
    }
  }
});

test('project covers respond to pointer and keyboard access', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const card = page.locator('.work-section .project-card').first();
  await card.scrollIntoViewIfNeeded();
  await card.hover({ position: { x: 45, y: 60 } });
  await expect(card.locator('.art-hover-label')).toHaveCSS('opacity', '1');
  const moved = await card.locator('.project-art').evaluate(element => element.style.getPropertyValue('--art-x'));
  expect(moved).not.toBe('');
  expect(moved).not.toBe('0px');
  await page.mouse.move(0, 0);
  await card.focus();
  await expect(card.locator('.art-hover-label')).toHaveCSS('opacity', '1');
});

test('automatic movement can be paused and respects reduced motion', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Pause animation' }).click();
  await expect(page.locator('.ticker-track')).toHaveCSS('animation-play-state', 'paused');
  await expect(page.locator('.hero-star')).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Resume animation' }).click();
  await expect(page.locator('.ticker-track')).toHaveCSS('animation-play-state', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.ticker-track')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.hero-star')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.ticker-pause')).toBeHidden();
  const card = page.locator('.work-section .project-card').first();
  await card.hover({ position: { x: 45, y: 60 } });
  const still = await card.locator('.art-scene').evaluate(element => {
    const style = getComputedStyle(element);
    const matrix = style.transform === 'none' ? new DOMMatrixReadOnly() : new DOMMatrixReadOnly(style.transform);
    return matrix.isIdentity && ['none', '1', '1 1'].includes(style.scale);
  });
  expect(still).toBe(true);
});
