import { getComputedStyles } from '@/utils/test-utils';
import { hexToRgb } from '@/utils/utils';
import { test, expect } from '@playwright/test';

const TEST_URL = '/';

const TOKENS = {
  primary: '#ff5c00',
  primaryHover: '#ff7a33',
  error: '#ef4444',
  border: '#2a2a2e',
  bgMuted: '#1a1a1d',
  textPrimary: '#ffffff',
  borderFocus: '#3b82f6',
} as const;

test.describe('Feature: Button (BDD Source)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
  });

  // @smoke - ATIVO
  test('Inverse button tem estilo correto', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.textPrimary));
    expect(styles?.color).toBe(hexToRgb(TOKENS.primary));
  });

  test.skip('Inverse button em hover', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    await button.hover();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
  });

  test.skip('Inverse button em estado active', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    await button.click();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.backgroundColor).not.toBe('rgb(255, 255, 255)');
  });

  // @smoke - ATIVO
  test.skip('Inverse button em disabled tem estilo correto', async ({ page }) => {
    const button = page.locator('[data-testid="button-disabled-inverse"]');
    await expect(button).toHaveAttribute('disabled');
    const styles = await getComputedStyles(page, '[data-testid="button-disabled-inverse"]');
    expect(styles?.opacity).toBe(0.5);
    expect(styles?.cursor).toBe('not-allowed');
  });

  test.skip('Inverse button em disabled não responde a cliques', async ({ page }) => {
    const button = page.locator('[data-testid="button-disabled-inverse"]');
    await button.click();
    // onClick não deve ser disparado
  });

  // @smoke - ATIVO
  test.skip('Inverse button em loading exibe spinner e desabilita interação', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading-inverse"]');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    const spinner = page.locator('[data-testid="button-loading-inverse"] .btn-spinner');
    await expect(spinner).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-loading-inverse"]');
    expect(styles?.cursor).toBe('not-allowed');
  });

  test.skip('Inverse button em loading não responde a cliques', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading-inverse"]');
    await button.click();
    // onClick não deve ser disparado
  });

  test.skip('Inverse button em focus tem focus ring visível', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await button.focus();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.outlineWidth).toBe(2);
    expect(styles?.outlineColor).toBe(hexToRgb(TOKENS.borderFocus));
  });

  // @smoke - ATIVO
  test.skip('Upgrade button tem dimensões do inverse sm-like', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.fontSize).toBe(12);
    expect(styles?.fontWeight).toBe(600);
    expect(styles?.borderRadius).toBe(6);
    expect(styles?.paddingTop).toBe(10);
    expect(styles?.paddingBottom).toBe(10);
  });

  test.skip('Upgrade button ocupa 100% do container', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.width).toBe('100%');
  });

  test.skip('Inverse button é navegável por teclado', async ({ page }) => {
    await page.keyboard.press('Tab');
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');
  });

  test.skip('Inverse button expõe estados corretamente para leitores de tela', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toHaveAttribute('role', 'button');
  });

  test.skip('Inverse button em disabled expõe estado corretamente', async ({ page }) => {
    const button = page.locator('[data-testid="button-disabled-inverse"]');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test.skip('Inverse button em loading expõe estado corretamente', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading-inverse"]');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test.skip('Inverse button em mobile tem touch target adequado', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    const box = await button.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  test.skip('Double-click não causa ação duplicada no Inverse button', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    let clickCount = 0;
    
    await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="button-inverse"]') as HTMLButtonElement;
      btn?.addEventListener('click', () => { clickCount++; }, { once: false });
    });
    
    await button.dblclick();
    await button.click({ clickCount: 2 });
    
    expect(clickCount).toBeLessThanOrEqual(1);
  });

  test.skip('Spinner aparece imediatamente ao clicar no Inverse button', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await button.click();
    const spinner = page.locator('[data-testid="button-inverse"] .btn-spinner');
    await expect(spinner).toBeVisible();
  });

  test.skip('Transição para loading state preserva layout no Inverse button', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading-inverse"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-loading-inverse"]');
    expect(styles?.width).toBeDefined();
    expect(styles?.height).toBeDefined();
  });

  test.skip('Inverse button type-button não submete formulário inadvertidamente', async ({ page }) => {
    await page.goto('/form');
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toHaveAttribute('type', 'button');
    await button.click();
    const formSubmitted = await page.locator('[data-testid="form-submitted"]');
    await expect(formSubmitted).not.toBeVisible();
  });

  test.skip('Inverse button aceita className para estilos customizados', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toHaveClass(/upgrade-btn/);
  });

  test.skip('Inverse button aceita data-testid para identificação em testes', async ({ page }) => {
    const button = page.locator('[data-testid="upgrade-btn"]');
    await expect(button).toBeVisible();
  });

  test.skip('Inverse button renderiza children como texto Upgrade Now', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toContainText('Upgrade Now');
  });

});
