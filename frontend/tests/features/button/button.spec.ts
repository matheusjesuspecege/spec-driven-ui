import { test, expect, Page, Locator } from '@playwright/test';

/**
 * Button Component - Playwright E2E Tests
 * 
 * Generated from: specs/features/button/plan.md
 * TDD Strategy: Red-Green-Refactor with incremental test activation
 * Complexity: medium (16 RFs)
 * 
 * Variants: primary, secondary, ghost, destructive, inverse
 * Sizes: sm (32px), md (40px), lg (48px)
 * States: default, hover, active, disabled, loading, focus
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const FEATURE_NAME = 'Button';
const TEST_URL = '/test-button';

// Design Tokens (from plan.md)
const TOKENS = {
  primary: '#FF5C00',
  primaryHover: '#FF7A33',
  error: '#EF4444',
  border: '#2A2A2E',
  bgMuted: '#1A1A1D',
  textPrimary: '#FFFFFF',
  textSubtle: '#8B8B90',
  borderFocus: '#3B82F6',
} as const;

// Sizes configuration (height, paddingY, paddingX, fontSize, gap, iconSize, borderRadius)
const SIZES = {
  sm: { height: 32, paddingY: 6, paddingX: 12, fontSize: 12, gap: 6, iconSize: 14, borderRadius: 6 },
  md: { height: 40, paddingY: 10, paddingX: 16, fontSize: 13, gap: 8, iconSize: 16, borderRadius: 8 },
  lg: { height: 48, paddingY: 12, paddingX: 20, fontSize: 14, gap: 10, iconSize: 18, borderRadius: 8 },
} as const;

const VARIANTS = ['primary', 'secondary', 'ghost', 'destructive', 'inverse'] as const;
type Variant = (typeof VARIANTS)[number];
type Size = 'sm' | 'md' | 'lg';

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Creates HTML for Button component with specified props
 */
function createButtonHTML(overrides: {
  variant?: Variant;
  size?: Size;
  iconPosition?: 'left' | 'right' | 'icon-only';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'data-testid'?: string;
  'aria-label'?: string;
} = {}): string {
  const {
    variant = 'primary',
    size = 'md',
    iconPosition = 'left',
    loading = false,
    disabled = false,
    fullWidth = false,
    children = 'Button',
    type = 'button',
    className = '',
    'data-testid': testId = 'button',
    'aria-label': ariaLabel,
  } = overrides;

  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading && 'btn-loading',
    disabled && 'btn-disabled',
    fullWidth && 'btn-full-width',
    iconPosition === 'icon-only' && 'btn-icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const disabledAttr = disabled || loading ? 'disabled' : '';
  const ariaDisabledAttr = loading ? 'aria-disabled="true"' : '';
  const ariaBusyAttr = loading ? 'aria-busy="true"' : '';
  const ariaLabelAttr = ariaLabel ? `aria-label="${ariaLabel}"` : '';
  const typeAttr = type !== 'button' ? `type="${type}"` : '';

  const iconHtml =
    iconPosition !== 'icon-only'
      ? `<span class="btn-icon btn-icon-${iconPosition}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg></span>`
      : '';

  const textHtml = iconPosition !== 'icon-only' ? `<span class="btn-text">${children}</span>` : '';

  const spinnerHtml = loading
    ? `<span class="btn-spinner"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="32" stroke-linecap="round"/></svg></span>`
    : '';

  return `<button class="${classes}" ${typeAttr} ${disabledAttr} ${ariaDisabledAttr} ${ariaBusyAttr} ${ariaLabelAttr} data-testid="${testId}">${spinnerHtml}${iconPosition === 'left' ? iconHtml : ''}${textHtml}${iconPosition === 'right' ? iconHtml : ''}</button>`;
}

/**
 * Gets computed styles from element
 */
async function getComputedStyles(page: Page, selector: string): Promise<CSSStyleDeclaration> {
  return page.evaluate(
    (sel) => {
      const el = document.querySelector(sel) as HTMLElement;
      return window.getComputedStyle(el);
    },
    selector,
  );
}

/**
 * Gets computed dimensions from element
 */
async function getBoundingBox(page: Page, selector: string): Promise<DOMRect | null> {
  const box = await page.locator(selector).boundingBox();
  return page.evaluate((sel) => document.querySelector(sel)?.getBoundingClientRect()?.toJSON() ?? null, selector);
}

/**
 * Converts hex to RGB for comparison
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Compares two colors with tolerance
 */
function colorsMatch(color1: string, color2: string, tolerance = 5): boolean {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1 === color2;
  return (
    Math.abs(rgb1.r - rgb2.r) <= tolerance &&
    Math.abs(rgb1.g - rgb2.g) <= tolerance &&
    Math.abs(rgb1.b - rgb2.b) <= tolerance
  );
}

// ============================================================================
// TEST SUITE
// ============================================================================

test.describe('Feature: Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
  });

  // ==========================================================================
  // RF-01: Primary Variant
  // ==========================================================================

  test('RF-01 - deve renderizar botão primary visível', async ({ page }) => {
    // Arrange
    await page.setContent(createButtonHTML({ variant: 'primary' }));

    // Act
    const button = page.locator('[data-testid="button"]');

    // Assert
    await expect(button).toBeVisible();
  });

  test.skip('RF-01 - deve ter background primary e texto branco', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'primary' }));
    const styles = await getComputedStyles(page, '[data-testid="button"]');

    expect(colorsMatch(styles.backgroundColor, TOKENS.primary)).toBe(true);
    expect(colorsMatch(styles.color, TOKENS.textPrimary)).toBe(true);
    expect(styles.border).toBe('none');
  });

  // ==========================================================================
  // RF-02: Secondary Variant
  // ==========================================================================

  test.skip('RF-02 - deve renderizar botão secondary com borda e bg transparente', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'secondary' }));
    const styles = await getComputedStyles(page, '[data-testid="button"]');

    expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(styles.border).toContain(TOKENS.border);
    expect(colorsMatch(styles.color, TOKENS.textPrimary)).toBe(true);
  });

  test.skip('RF-02 - secondary em hover deve ter bg-muted', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'secondary' }));
    const button = page.locator('[data-testid="button"]');

    await button.hover();
    await page.waitForTimeout(100); // Wait for CSS transition

    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(colorsMatch(styles.backgroundColor, TOKENS.bgMuted)).toBe(true);
  });

  // ==========================================================================
  // RF-03: Ghost Variant
  // ==========================================================================

  test.skip('RF-03 - deve renderizar botão ghost com bg transparente e sem borda', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'ghost' }));
    const styles = await getComputedStyles(page, '[data-testid="button"]');

    expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(styles.border).toBe('none');
    expect(colorsMatch(styles.color, TOKENS.textPrimary)).toBe(true);
  });

  test.skip('RF-03 - ghost em hover deve ter bg-muted', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'ghost' }));
    const button = page.locator('[data-testid="button"]');

    await button.hover();
    await page.waitForTimeout(100);

    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(colorsMatch(styles.backgroundColor, TOKENS.bgMuted)).toBe(true);
  });

  // ==========================================================================
  // RF-04: Destructive Variant
  // ==========================================================================

  test.skip('RF-04 - deve renderizar botão destructive com bg error', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'destructive' }));
    const styles = await getComputedStyles(page, '[data-testid="button"]');

    expect(colorsMatch(styles.backgroundColor, TOKENS.error)).toBe(true);
    expect(colorsMatch(styles.color, TOKENS.textPrimary)).toBe(true);
    expect(styles.border).toBe('none');
  });

  test.skip('RF-04 - destructive em hover deve escurecer 10%', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'destructive' }));
    const button = page.locator('[data-testid="button"]');

    await button.hover();
    await page.waitForTimeout(100);

    // Error color darken 10% calculation
    const errorRgb = hexToRgb(TOKENS.error)!;
    const expectedR = Math.round(errorRgb.r * 0.9);
    const expectedG = Math.round(errorRgb.g * 0.9);
    const expectedB = Math.round(errorRgb.b * 0.9);

    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles.backgroundColor).toBe(`rgb(${expectedR}, ${expectedG}, ${expectedB})`);
  });

  test.skip('RF-04 - destructive em active deve escurecer 15%', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'destructive' }));
    const button = page.locator('[data-testid="button"]');

    await button.click();
    await page.waitForTimeout(50);

    const errorRgb = hexToRgb(TOKENS.error)!;
    const expectedR = Math.round(errorRgb.r * 0.85);
    const expectedG = Math.round(errorRgb.g * 0.85);
    const expectedB = Math.round(errorRgb.b * 0.85);

    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles.backgroundColor).toBe(`rgb(${expectedR}, ${expectedG}, ${expectedB})`);
  });

  // ==========================================================================
  // RF-05: Inverse Variant
  // ==========================================================================

  test.skip('RF-05 - deve renderizar botão inverse com bg branco e texto primary', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'inverse' }));
    const styles = await getComputedStyles(page, '[data-testid="button"]');

    // White background
    expect(colorsMatch(styles.backgroundColor, '#FFFFFF')).toBe(true);
    expect(colorsMatch(styles.color, TOKENS.primary)).toBe(true);
    expect(styles.border).toBe('none');
  });

  // ==========================================================================
  // RF-06: Size Small
  // ==========================================================================

  test.skip('RF-06 - botão sm deve ter dimensões corretas', async ({ page }) => {
    await page.setContent(createButtonHTML({ size: 'sm' }));
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    const box = await getBoundingBox(page, '[data-testid="button"]');

    expect(box?.height).toBeCloseTo(SIZES.sm.height, 2);
    expect(parseInt(styles.paddingTop)).toBe(SIZES.sm.paddingY);
    expect(parseInt(styles.paddingRight)).toBe(SIZES.sm.paddingX);
    expect(parseInt(styles.fontSize)).toBe(SIZES.sm.fontSize);
    expect(parseInt(styles.borderRadius)).toBe(SIZES.sm.borderRadius);
  });

  // ==========================================================================
  // RF-07: Size Medium (Default)
  // ==========================================================================

  test.skip('RF-07 - botão md deve ter dimensões corretas', async ({ page }) => {
    await page.setContent(createButtonHTML({ size: 'md' }));
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    const box = await getBoundingBox(page, '[data-testid="button"]');

    expect(box?.height).toBeCloseTo(SIZES.md.height, 2);
    expect(parseInt(styles.paddingTop)).toBe(SIZES.md.paddingY);
    expect(parseInt(styles.paddingRight)).toBe(SIZES.md.paddingX);
    expect(parseInt(styles.fontSize)).toBe(SIZES.md.fontSize);
    expect(parseInt(styles.borderRadius)).toBe(SIZES.md.borderRadius);
  });

  test.skip('RF-07 - botão sem size deve usar md como default', async ({ page }) => {
    await page.setContent(createButtonHTML({}));
    const button = page.locator('[data-testid="button"]');

    await expect(button).toHaveClass(/btn-md/);
  });

  // ==========================================================================
  // RF-08: Size Large
  // ==========================================================================

  test.skip('RF-08 - botão lg deve ter dimensões corretas', async ({ page }) => {
    await page.setContent(createButtonHTML({ size: 'lg' }));
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    const box = await getBoundingBox(page, '[data-testid="button"]');

    expect(box?.height).toBeCloseTo(SIZES.lg.height, 2);
    expect(parseInt(styles.paddingTop)).toBe(SIZES.lg.paddingY);
    expect(parseInt(styles.paddingRight)).toBe(SIZES.lg.paddingX);
    expect(parseInt(styles.fontSize)).toBe(SIZES.lg.fontSize);
    expect(parseInt(styles.borderRadius)).toBe(SIZES.lg.borderRadius);
  });

  // ==========================================================================
  // RF-09: Icon Left Position
  // ==========================================================================

  test.skip('RF-09 - ícone deve aparecer antes do texto', async ({ page }) => {
    await page.setContent(createButtonHTML({ iconPosition: 'left' }));

    const iconLeft = page.locator('.btn-icon-left');
    const text = page.locator('.btn-text');

    await expect(iconLeft).toBeVisible();
    await expect(text).toBeVisible();

    // Check DOM order: icon before text
    const iconBox = await iconLeft.boundingBox();
    const textBox = await text.boundingBox();
    expect(iconBox && textBox && iconBox.x < textBox.x).toBe(true);
  });

  // ==========================================================================
  // RF-10: Icon Right Position
  // ==========================================================================

  test.skip('RF-10 - ícone deve aparecer depois do texto', async ({ page }) => {
    await page.setContent(createButtonHTML({ iconPosition: 'right' }));

    const iconRight = page.locator('.btn-icon-right');
    const text = page.locator('.btn-text');

    await expect(iconRight).toBeVisible();
    await expect(text).toBeVisible();

    // Check DOM order: text before icon
    const iconBox = await iconRight.boundingBox();
    const textBox = await text.boundingBox();
    expect(iconBox && textBox && textBox.x < iconBox.x).toBe(true);
  });

  // ==========================================================================
  // RF-11: Icon Only
  // ==========================================================================

  test.skip('RF-11 - icon-only deve ter padding simétrico', async ({ page }) => {
    await page.setContent(createButtonHTML({ iconPosition: 'icon-only', 'aria-label': 'Add' }));

    const styles = await getComputedStyles(page, '[data-testid="button"]');

    // Square padding for icon-only: [10, 10]
    expect(parseInt(styles.paddingTop)).toBe(10);
    expect(parseInt(styles.paddingRight)).toBe(10);
    expect(parseInt(styles.paddingBottom)).toBe(10);
    expect(parseInt(styles.paddingLeft)).toBe(10);
  });

  test.skip('RF-11 - icon-only deve ter touch target mínimo 44x44px', async ({ page }) => {
    await page.setContent(createButtonHTML({ iconPosition: 'icon-only', 'aria-label': 'Add' }));

    const box = await page.locator('[data-testid="button"]').boundingBox();

    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  test.skip('RF-11 - icon-only deve ter aria-label', async ({ page }) => {
    await page.setContent(createButtonHTML({ iconPosition: 'icon-only', 'aria-label': 'Add new item' }));

    const button = page.locator('[data-testid="button"]');

    await expect(button).toHaveAttribute('aria-label', 'Add new item');
  });

  // ==========================================================================
  // RF-12: Loading State
  // ==========================================================================

  test.skip('RF-12 - loading deve exibir spinner e desabilitar', async ({ page }) => {
    await page.setContent(createButtonHTML({ loading: true }));

    const button = page.locator('[data-testid="button"]');

    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await expect(button).toHaveAttribute('disabled', '');
    await expect(button.locator('.btn-spinner')).toBeVisible();
  });

  test.skip('RF-12 - loading não deve responder a cliques', async ({ page }) => {
    let clickCount = 0;
    await page.setContent(createButtonHTML({ loading: true }));

    // Add click listener
    await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="button"]');
      btn?.addEventListener('click', () => {
        (window as unknown as { clickCount: number }).clickCount++;
      });
    });

    await page.locator('[data-testid="button"]').click();
    await page.locator('[data-testid="button"]').click();

    expect((page.context() as unknown as { clickCount?: number }).clickCount ?? 0).toBe(0);
  });

  // ==========================================================================
  // RF-13: Disabled State
  // ==========================================================================

  test.skip('RF-13 - disabled deve ter opacity 50% e cursor not-allowed', async ({ page }) => {
    await page.setContent(createButtonHTML({ disabled: true }));

    const styles = await getComputedStyles(page, '[data-testid="button"]');

    expect(parseFloat(styles.opacity)).toBe(0.5);
    expect(styles.cursor).toBe('not-allowed');
    await expect(page.locator('[data-testid="button"]')).toHaveAttribute('disabled', '');
  });

  test.skip('RF-13 - disabled não deve responder a cliques', async ({ page }) => {
    await page.setContent(createButtonHTML({ disabled: true }));

    const button = page.locator('[data-testid="button"]');

    // Click should not throw but button should remain disabled
    await button.click({ force: true });

    // Button should still have disabled attribute
    await expect(button).toHaveAttribute('disabled', '');
  });

  // ==========================================================================
  // RF-14: Focus Ring
  // ==========================================================================

  test.skip('RF-14 - focus deve exibir focus ring azul', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'primary' }));
    await page.locator('[data-testid="button"]').focus();

    const styles = await getComputedStyles(page, '[data-testid="button"]');

    expect(styles.outlineColor).toBe(TOKENS.borderFocus);
    expect(styles.outlineWidth).toBe('2px');
  });

  // ==========================================================================
  // RF-15: Full Width
  // ==========================================================================

  test.skip('RF-15 - fullWidth deve ocupar 100% do container', async ({ page }) => {
    await page.setContent(`
      <div style="width: 500px;">
        ${createButtonHTML({ fullWidth: true })}
      </div>
    `);

    const button = page.locator('[data-testid="button"]');
    const box = await button.boundingBox();

    // Button should be close to container width
    expect(box?.width).toBeGreaterThanOrEqual(490);
  });

  test.skip('RF-15 - sem fullWidth deve respeitar conteúdo', async ({ page }) => {
    await page.setContent(createButtonHTML({ fullWidth: false }));

    const box = await page.locator('[data-testid="button"]').boundingBox();

    // Button should not be full width (less than 200px)
    expect(box?.width).toBeLessThan(200);
  });

  // ==========================================================================
  // RF-16: Accessibility
  // ==========================================================================

  test.skip('RF-16 - botão deve ser navegável por teclado (Tab + Enter)', async ({ page }) => {
    await page.setContent(`
      <div>
        <input id="before" data-testid="before" />
        ${createButtonHTML({ variant: 'primary', children: 'Click me' })}
        <input id="after" data-testid="after" />
      </div>
    `);

    await page.locator('[data-testid="before"]').focus();
    await page.keyboard.press('Tab');

    const buttonFocused = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    expect(buttonFocused).toBe('button');

    // Enter should activate button
    let clicked = false;
    await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="button"]') as HTMLButtonElement;
      btn.addEventListener('click', () => {
        clicked = true;
      });
    });

    await page.keyboard.press('Enter');
    expect(clicked).toBe(true);
  });

  test.skip('RF-16 - botão deve ser navegável por teclado (Space)', async ({ page }) => {
    await page.setContent(createButtonHTML({ variant: 'primary' }));

    await page.locator('[data-testid="button"]').focus();
    await page.keyboard.press('Space');

    // Space should not cause any error
    await expect(page.locator('[data-testid="button"]')).toBeFocused();
  });

  test.skip('RF-16 - botão deve expor role="button"', async ({ page }) => {
    await page.setContent(createButtonHTML({}));

    await expect(page.locator('[data-testid="button"]')).toHaveAttribute('role', 'button');
  });

  test.skip('RF-16 - disabled deve ter aria-disabled="true"', async ({ page }) => {
    await page.setContent(createButtonHTML({ disabled: true }));

    await expect(page.locator('[data-testid="button"]')).toHaveAttribute('aria-disabled', 'true');
  });

  test.skip('RF-16 - loading deve ter aria-busy="true" e aria-disabled="true"', async ({ page }) => {
    await page.setContent(createButtonHTML({ loading: true }));

    await expect(page.locator('[data-testid="button"]')).toHaveAttribute('aria-busy', 'true');
    await expect(page.locator('[data-testid="button"]')).toHaveAttribute('aria-disabled', 'true');
  });

  test.skip('RF-16 - touch target deve ser mínimo 44x44px', async ({ page }) => {
    await page.setContent(createButtonHTML({ size: 'sm' }));

    const box = await page.locator('[data-testid="button"]').boundingBox();

    // Even small buttons should have minimum touch target
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  // ==========================================================================
  // DEFENSIVE TESTS - Murphy's Law
  // ==========================================================================

  test.skip('DEFENSIVE - double-click não deve causar ação duplicada', async ({ page }) => {
    let clickCount = 0;

    await page.setContent(createButtonHTML({}));

    await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="button"]') as HTMLButtonElement;
      btn.addEventListener('click', () => {
        clickCount++;
      });
    });

    // Simulate rapid clicks
    await page.locator('[data-testid="button"]').dblclick();
    await page.locator('[data-testid="button"]').click({ clickCount: 2 });

    // Should only count as one click due to debounce/protection
    expect(clickCount).toBeLessThanOrEqual(1);
  });

  test.skip('DEFENSIVE - type="button" não deve submeter formulário', async ({ page }) => {
    let formSubmitted = false;

    await page.setContent(`
      <form data-testid="form">
        <input name="test" value="value" />
        ${createButtonHTML({ type: 'button' })}
      </form>
    `);

    await page.evaluate(() => {
      const form = document.querySelector('[data-testid="form"]') as HTMLFormElement;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        formSubmitted = true;
      });
    });

    await page.locator('[data-testid="button"]').click();

    expect(formSubmitted).toBe(false);
  });

  test.skip('DEFENSIVE - type="submit" deve submeter formulário', async ({ page }) => {
    let formSubmitted = false;

    await page.setContent(`
      <form data-testid="form">
        <input name="test" value="value" />
        ${createButtonHTML({ type: 'submit' })}
      </form>
    `);

    await page.evaluate(() => {
      const form = document.querySelector('[data-testid="form"]') as HTMLFormElement;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        formSubmitted = true;
      });
    });

    await page.locator('[data-testid="button"]').click();

    expect(formSubmitted).toBe(true);
  });

  test.skip('DEFENSIVE - type="reset" deve limpar formulário', async ({ page }) => {
    await page.setContent(`
      <form data-testid="form">
        <input name="test" value="original" data-testid="input" />
        ${createButtonHTML({ type: 'reset' })}
      </form>
    `);

    // Change input value
    await page.locator('[data-testid="input"]').fill('changed');
    await expect(page.locator('[data-testid="input"]')).toHaveValue('changed');

    // Reset
    await page.locator('[data-testid="button"]').click();

    await expect(page.locator('[data-testid="input"]')).toHaveValue('original');
  });

  // ==========================================================================
  // COMBINATION TESTS
  // ==========================================================================

  test.skip('COMBO - todas combinações variant + size funcionam', async ({ page }) => {
    for (const variant of VARIANTS) {
      for (const size of ['sm', 'md', 'lg'] as Size[]) {
        await page.setContent(createButtonHTML({ variant, size }));

        const button = page.locator('[data-testid="button"]');
        await expect(button).toBeVisible();
        await expect(button).toHaveClass(new RegExp(`btn-${variant}`));
        await expect(button).toHaveClass(new RegExp(`btn-${size}`));
      }
    }
  });

  // ==========================================================================
  // CLASSNAME AND TESTID
  // ==========================================================================

  test.skip('CLASSNAME - deve aceitar e aplicar className customizado', async ({ page }) => {
    await page.setContent(createButtonHTML({ className: 'custom-class' }));

    await expect(page.locator('[data-testid="button"]')).toHaveClass(/custom-class/);
    await expect(page.locator('[data-testid="button"]')).toHaveClass(/btn/);
  });

  test.skip('TESTID - deve aceitar data-testid customizado', async ({ page }) => {
    const customTestId = 'submit-btn';
    await page.setContent(createButtonHTML({ 'data-testid': customTestId }));

    await expect(page.locator(`[data-testid="${customTestId}"]`)).toBeVisible();
  });

  test.skip('CHILDREN - deve renderizar children como texto', async ({ page }) => {
    await page.setContent(createButtonHTML({ children: 'Save Changes' }));

    await expect(page.locator('.btn-text')).toHaveText('Save Changes');
  });
});
