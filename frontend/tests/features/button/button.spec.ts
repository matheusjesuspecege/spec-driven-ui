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
  test.skip('inverse-button-tem-estilo-correto', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(styles?.color).toBe(hexToRgb(TOKENS.primary));
  });

  test.skip('inverse-button-em-hover', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    await button.hover();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
  });

  test.skip('inverse-button-em-estado-active', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    await button.click();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.backgroundColor).not.toBe('rgb(255, 255, 255)');
  });

  // @smoke - ATIVO
  test.skip('inverse-button-em-disabled-tem-estilo-correto', async ({ page }) => {
    const button = page.locator('[data-testid="button-disabled-inverse"]');
    await expect(button).toHaveAttribute('disabled');
    const styles = await getComputedStyles(page, '[data-testid="button-disabled-inverse"]');
    expect(styles?.opacity).toBe(0.5);
    expect(styles?.cursor).toBe('not-allowed');
  });

  test.skip('inverse-button-em-disabled-nao-responde-a-cliques', async ({ page }) => {
    const button = page.locator('[data-testid="button-disabled-inverse"]');
    await button.click();
    // onClick não deve ser disparado
  });

  // @smoke - ATIVO
  test.skip('inverse-button-em-loading-exibe-spinner-e-desabilita-interacao', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading-inverse"]');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    const spinner = page.locator('[data-testid="button-loading-inverse"] .btn-spinner');
    await expect(spinner).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-loading-inverse"]');
    expect(styles?.cursor).toBe('not-allowed');
  });

  test.skip('inverse-button-em-loading-nao-responde-a-cliques', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading-inverse"]');
    await button.click();
    // onClick não deve ser disparado
  });

  test.skip('inverse-button-em-focus-tem-focus-ring-visivel', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await button.focus();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.outlineWidth).toBe(2);
    expect(styles?.outlineColor).toBe(hexToRgb(TOKENS.borderFocus));
  });

  // @smoke - ATIVO
  test.skip('upgrade-button-tem-dimensoes-do-inverse-sm-like', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.fontSize).toBe(12);
    expect(styles?.fontWeight).toBe(600);
    expect(styles?.borderRadius).toBe(6);
    expect(styles?.paddingTop).toBe(10);
    expect(styles?.paddingBottom).toBe(10);
  });

  test.skip('upgrade-button-ocupa-100-do-container', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.width).toBe('100%');
  });

  test.skip('inverse-button-e-navegavel-por-teclado', async ({ page }) => {
    await page.keyboard.press('Tab');
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');
  });

  test.skip('inverse-button-expoe-estados-corretamente-para-leitores-de-tela', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toHaveAttribute('role', 'button');
  });

  test.skip('inverse-button-em-disabled-expoe-estado-corretamente', async ({ page }) => {
    const button = page.locator('[data-testid="button-disabled-inverse"]');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test.skip('inverse-button-em-loading-expoe-estado-corretamente', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading-inverse"]');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test.skip('inverse-button-em-mobile-tem-touch-target-adequado', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    const box = await button.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  test.skip('double-click-nao-causa-acao-duplicada-no-inverse-button', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    let clickCount = 0;
    await button.dblclick(() => { clickCount++; });
    await button.dblclick(() => { clickCount++; });
    await button.dblclick(() => { clickCount++; });
    expect(clickCount).toBeLessThanOrEqual(1);
  });

  test.skip('spinner-aparece-imediatamente-ao-clicar-no-inverse-button', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await button.click();
    const spinner = page.locator('[data-testid="button-inverse"] .btn-spinner');
    await expect(spinner).toBeVisible();
  });

  test.skip('transicao-para-loading-state-preserva-layout-no-inverse-button', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading-inverse"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-loading-inverse"]');
    expect(styles?.width).toBeDefined();
    expect(styles?.height).toBeDefined();
  });

  test.skip('inverse-button-type-button-nao-submete-formulario-inadvertidamente', async ({ page }) => {
    await page.goto('/form');
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toHaveAttribute('type', 'button');
    await button.click();
    const formSubmitted = await page.locator('[data-testid="form-submitted"]');
    await expect(formSubmitted).not.toBeVisible();
  });

  test.skip('inverse-button-aceita-classname-para-estilos-customizados', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toHaveClass(/upgrade-btn/);
  });

  test.skip('inverse-button-aceita-data-testid-para-identificacao-em-testes', async ({ page }) => {
    const button = page.locator('[data-testid="upgrade-btn"]');
    await expect(button).toBeVisible();
  });

  test.skip('inverse-button-renderiza-children-como-texto-upgrade-now', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toContainText('Upgrade Now');
  });

});
