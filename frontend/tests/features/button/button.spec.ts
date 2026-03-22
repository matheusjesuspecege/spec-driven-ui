import { getComputedStyles } from '@/utils/test-utils';
import { hexToRgb } from '@/utils/utils';
import { test, expect } from '@playwright/test';

/**
 * Button Component - Playwright E2E Tests
 * 
 * Generated from: specs/features/button/plan.md
 * TDD Strategy: Red-Green-Refactor with incremental test activation
 * Complexity: medium
 * 
 * @see button.spec.docs.md for implementation documentation
 */

const TEST_URL = '/';

const TOKENS = {
  primary: '#ff5c00',
  primaryHover: '#ff7a33',
  error: '#ef4444',
  border: '#2a2a2e',
  bgMuted: '#1a1a1d',
  textPrimary: '#ffffff',
  textSubtle: '#8b8b90',
  borderFocus: '#ff5c00',
} as const;

test.describe('Feature: Button', () => {
  test.beforeEach(async ({ page }) => await page.goto(TEST_URL));

  test('RF-01 - deve renderizar botão primary visível', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toBeVisible();
  });

  test('RF-01 - deve ter background primary (orange)', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.primary));
  });

  test('RF-01 - deve ter texto branco', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.color).toBe(hexToRgb(TOKENS.textPrimary));
  });

  test('RF-01 - deve aplicar hover com cor mais clara', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await button.hover();
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.primaryHover));
  });

  // ==========================================================================
  // RF-02: Renderizar botão com variant "secondary"
  // ==========================================================================
  
  test('RF-02 - deve renderizar botão secondary com border', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button-secondary"]');
    expect(styles?.border).toBe(`1px solid ${hexToRgb('#2a2a2e')}`)
  });

  test.skip('RF-02 - deve ter border com cor border (#2a2a2e)', async ({ page }) => {
    const borderColor = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="button"]') as HTMLElement;
      const style = window.getComputedStyle(el);
      return style.borderColor;
    });
    expect(borderColor).toBe(TOKENS.border);
  });

  test.skip('RF-02 - deve aplicar hover com bg-muted', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await button.hover();
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
  });

  // ==========================================================================
  // RF-03: Renderizar botão com variant "ghost"
  // ==========================================================================
  
  test.skip('RF-03 - deve renderizar botão ghost com background transparente', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  test.skip('RF-03 - deve aplicar hover com bg-muted', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await button.hover();
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
  });

  // ==========================================================================
  // RF-04: Renderizar botão com variant "destructive"
  // ==========================================================================
  
  test.skip('RF-04 - deve renderizar botão destructive com background error', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.error));
  });

  test.skip('RF-04 - deve ter texto branco', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.color).toBe(hexToRgb(TOKENS.textPrimary));
  });

  // ==========================================================================
  // RF-05: Renderizar botão com variant "inverse"
  // ==========================================================================
  
  test.skip('RF-05 - deve renderizar botão inverse com background branco', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.backgroundColor).toBe('rgb(255, 255, 255)');
  });

  test.skip('RF-05 - deve ter texto com cor primary', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.color).toBe(hexToRgb(TOKENS.primary));
  });

  test.skip('RF-05 - deve ter border-radius 6px (radius-md)', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.borderRadius).toBe(6);
  });

  test.skip('RF-05 - deve ter font-size 12px (text-xs) e font-weight 600', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.fontSize).toBe(12);
    expect(styles?.fontWeight).toBe(600);
  });

  // ==========================================================================
  // RF-06: Renderizar botão em tamanho "sm"
  // ==========================================================================
  
  test.skip('RF-06 - deve ter altura de 32px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.height).toBe(32);
  });

  test.skip('RF-06 - deve ter padding vertical 6px e horizontal 12px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.paddingTop).toBe(6);
    expect(styles?.paddingBottom).toBe(6);
    expect(styles?.paddingLeft).toBe(12);
    expect(styles?.paddingRight).toBe(12);
  });

  test.skip('RF-06 - deve ter font-size 12px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.fontSize).toBe(12);
  });

  test.skip('RF-06 - deve ter border-radius 6px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.borderRadius).toBe(6);
  });

  // ==========================================================================
  // RF-07: Renderizar botão em tamanho "md" (DEFAULT)
  // ==========================================================================
  
  test.skip('RF-07 - deve ter altura de 40px (default)', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.height).toBe(40);
  });

  test.skip('RF-07 - deve ter padding vertical 10px e horizontal 16px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.paddingTop).toBe(10);
    expect(styles?.paddingBottom).toBe(10);
    expect(styles?.paddingLeft).toBe(16);
    expect(styles?.paddingRight).toBe(16);
  });

  test.skip('RF-07 - deve ter font-size 13px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.fontSize).toBe(13);
  });

  test.skip('RF-07 - deve ter border-radius 8px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.borderRadius).toBe(8);
  });

  // ==========================================================================
  // RF-08: Renderizar botão em tamanho "lg"
  // ==========================================================================
  
  test.skip('RF-08 - deve ter altura de 48px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.height).toBe(48);
  });

  test.skip('RF-08 - deve ter padding vertical 12px e horizontal 20px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.paddingTop).toBe(12);
    expect(styles?.paddingBottom).toBe(12);
    expect(styles?.paddingLeft).toBe(20);
    expect(styles?.paddingRight).toBe(20);
  });

  test.skip('RF-08 - deve ter font-size 14px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.fontSize).toBe(14);
  });

  test.skip('RF-08 - deve ter border-radius 8px', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.borderRadius).toBe(8);
  });

  // ==========================================================================
  // RF-09: Ícone na posição esquerda
  // ==========================================================================
  
  test.skip('RF-09 - deve renderizar ícone à esquerda do texto', async ({ page }) => {
    const icon = page.locator('[data-testid="button"] .btn-icon-left');
    await expect(icon).toBeVisible();
  });

  test.skip('RF-09 - deve ter gap de 8px (md), 6px (sm) ou 10px (lg) entre ícone e texto', async ({ page }) => {
    const marginRight = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="button"] .btn-icon-left') as HTMLElement;
      return window.getComputedStyle(el).marginRight;
    });
    expect(marginRight).toBe('8px');
  });

  // ==========================================================================
  // RF-10: Ícone na posição direita
  // ==========================================================================
  
  test.skip('RF-10 - deve renderizar ícone à direita do texto', async ({ page }) => {
    const icon = page.locator('[data-testid="button"] .btn-icon-right');
    await expect(icon).toBeVisible();
  });

  test.skip('RF-10 - deve ter margin-left entre ícone e texto', async ({ page }) => {
    const marginLeft = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="button"] .btn-icon-right') as HTMLElement;
      return window.getComputedStyle(el).marginLeft;
    });
    expect(marginLeft).toBe('8px');
  });

  // ==========================================================================
  // RF-11: Icon-only
  // ==========================================================================
  
  test.skip('RF-11 - deve renderizar como icon-only (quadrado)', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveClass(/btn-icon-only/);
  });

  test.skip('RF-11 - deve ter padding quadrado (padding igual em todos os lados)', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.paddingTop).toBe(styles?.paddingLeft);
    expect(styles?.paddingTop).toBe(10);
  });

  test.skip('RF-11 - deve ter aria-label obrigatório', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('aria-label', 'Add new item');
  });

  test.skip('RF-11 - deve ter área de toque mínima 44x44px', async ({ page }) => {
    const box = await page.locator('[data-testid="button"]').boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  // ==========================================================================
  // RF-12: Estado loading
  // ==========================================================================
  
  test.skip('RF-12 - deve ter atributo aria-busy="true"', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('aria-busy', 'true');
  });

  test.skip('RF-12 - deve ter atributo aria-disabled="true"', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test.skip('RF-12 - deve exibir spinner', async ({ page }) => {
    const spinner = page.locator('[data-testid="button"] .btn-spinner');
    await expect(spinner).toBeVisible();
  });

  test.skip('RF-12 - deve ter cursor not-allowed', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.cursor).toBe('not-allowed');
  });

  test.skip('RF-12 - deve ter opacity 50%', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.opacity).toBe(0.5);
  });

  // ==========================================================================
  // RF-13: Estado disabled
  // ==========================================================================
  
  test.skip('RF-13 - deve ter atributo disabled', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('disabled');
  });

  test.skip('RF-13 - deve ter opacity 50%', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.opacity).toBe(0.5);
  });

  test.skip('RF-13 - deve ter cursor not-allowed', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.cursor).toBe('not-allowed');
  });

  test.skip('RF-13 - não deve responder a cliques', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await button.click();
    // In a real scenario with onClick handler, we would verify it wasn't called
    
    // For now, verify the button has disabled attribute
    await expect(button).toHaveAttribute('disabled');
  });

  // ==========================================================================
  // RF-14: Focus ring
  // ==========================================================================
  
  test.skip('RF-14 - deve ter focus ring quando em foco', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    
    await button.focus();
    
    const outlineWidth = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="button"]') as HTMLElement;
      return window.getComputedStyle(el).outlineWidth;
    });
    expect(parseInt(outlineWidth)).toBeGreaterThan(0);
  });

  test.skip('RF-14 - deve ter outline de 2px com cor border-focus', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    
    await button.focus();
    
    const styles = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="button"]') as HTMLElement;
      const style = window.getComputedStyle(el);
      return {
        outlineWidth: parseInt(style.outlineWidth),
        outlineColor: style.outlineColor,
      };
    });
    expect(styles.outlineWidth).toBe(2);
    expect(styles.outlineColor).toBe(hexToRgb(TOKENS.borderFocus));
  });

  test.skip('RF-14 - deve ser navegável por Tab', async ({ page }) => {
    
    await page.keyboard.press('Tab');
    
    const button = page.locator('[data-testid="button"]');
    await expect(button).toBeFocused();
  });

  test.skip('RF-14 - deve responder a Enter quando em foco', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    
    await button.focus();
    await page.keyboard.press('Enter');
    
    // Button should have processed the Enter key
    // In a real implementation with onClick, we would verify it was called
  });

  test.skip('RF-14 - deve responder a Space quando em foco', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    
    await button.focus();
    await page.keyboard.press(' ');
    
    // Button should have processed the Space key
  });

  // ==========================================================================
  // RF-15: Prop fullWidth
  // ==========================================================================
  
  test.skip('RF-15 - deve ocupar 100% da largura com fullWidth=true', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.width).toBe('100%');
  });

  test.skip('RF-15 - deve ter padding horizontal 0 com fullWidth=true', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.paddingLeft).toBe(0);
    expect(styles?.paddingRight).toBe(0);
  });

  // ==========================================================================
  // RF-16: Acessibilidade
  // ==========================================================================
  
  test.skip('RF-16 - deve ter role="button"', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('role', 'button');
  });

  test.skip('RF-16 - deve ter type="button" por padrão', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('type', 'button');
  });

  test.skip('RF-16 - deve aceitar type="submit"', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('type', 'submit');
  });

  test.skip('RF-16 - deve aceitar type="reset"', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('type', 'reset');
  });

  test.skip('RF-16 - deve aceitar className customizado', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveClass(/custom-class/);
  });

  test.skip('RF-16 - deve aceitar data-testid customizado', async ({ page }) => {
    const button = page.locator('[data-testid="custom-button"]');
    await expect(button).toBeVisible();
  });

  test.skip('RF-16 - deve renderizar children como texto', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toContainText('Click me');
  });

});

// ============================================================================
// INTEGRATION TESTS (end-to-end with Next.js app)
// ============================================================================

test.describe('Feature: Button - Integration', () => {

  test.skip('deve renderizar botão primary na página de teste', async ({ page }) => {
    await page.goto(`${TEST_URL}?variant=primary`);
    
    const button = page.locator('[data-testid="button"]');
    await expect(button).toBeVisible();
    await expect(button).toContainText('Button');
  });

  test.skip('deve renderizar todos os variants side-by-side', async ({ page }) => {
    await page.goto(`${TEST_URL}?view=all`);
    
    const primary = page.locator('[data-testid="button-primary"]');
    const secondary = page.locator('[data-testid="button-secondary"]');
    const ghost = page.locator('[data-testid="button-ghost"]');
    const destructive = page.locator('[data-testid="button-destructive"]');
    const inverse = page.locator('[data-testid="button-inverse"]');
    
    await expect(primary).toBeVisible();
    await expect(secondary).toBeVisible();
    await expect(ghost).toBeVisible();
    await expect(destructive).toBeVisible();
    await expect(inverse).toBeVisible();
  });

  test.skip('deve renderizar todos os tamanhos side-by-side', async ({ page }) => {
    await page.goto(`${TEST_URL}?view=sizes`);
    
    const sm = page.locator('[data-testid="button-sm"]');
    const md = page.locator('[data-testid="button-md"]');
    const lg = page.locator('[data-testid="button-lg"]');
    
    await expect(sm).toBeVisible();
    await expect(md).toBeVisible();
    await expect(lg).toBeVisible();
    
    const smBox = await sm.boundingBox();
    const mdBox = await md.boundingBox();
    const lgBox = await lg.boundingBox();
    
    expect(smBox?.height).toBeLessThan(mdBox?.height ?? 0);
    expect(mdBox?.height).toBeLessThan(lgBox?.height ?? 0);
  });

});
