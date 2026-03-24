import { getComputedStyles } from '@/utils/test-utils';
import { hexToRgb } from '@/utils/utils';
import { test, expect } from '@playwright/test';

const TOKENS = {
  avatar: {
    sizes: {
      sm: { width: 24, height: 24, fontSize: 10 },
      md: { width: 36, height: 36, fontSize: 12 },
      lg: { width: 48, height: 48, fontSize: 16 },
      xl: { width: 64, height: 64, fontSize: 20 },
    },
    default: {
      backgroundColor: '#2A2A2E',
      textColor: '#8B8B90',
      fontFamily: 'Inter',
      fontWeight: '600',
    },
  },
};

const avatarTestID = '[data-testid="avatar"]'

test.describe('Avatar', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/test-ds');
  })

  test('Avatar renderiza círculo com border-radius 50%', async ({ page }) => {
    const avatar = page.locator(avatarTestID);
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, avatarTestID);
    expect(styles?.borderRadius).toBe(50)

  });

  test('Avatar exibe as iniciais fornecidas', async ({ page }) => {
    const avatarText = page.locator(avatarTestID);
    await expect(avatarText).toBeVisible();
    await expect(avatarText).toHaveText('MR');
  });

  test('Avatar usa tamanho padrão quando não especificado', async ({ page }) => {
    const avatar = page.locator(avatarTestID);
    expect(avatar).toBeVisible()
    const styles = await getComputedStyles(page, avatarTestID)
    expect(styles?.width).toBe(TOKENS.avatar.sizes.md.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.md.height);
  });

  test('Avatar usa cores padrão quando não especificadas', async ({ page }) => {
    const avatar = page.locator(avatarTestID)
    expect(avatar).toBeVisible()
    const styles = await getComputedStyles(page, avatarTestID)
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.avatar.default.backgroundColor));
    expect(styles?.color).toBe(hexToRgb(TOKENS.avatar.default.textColor));
  });

  test('Avatar small renderiza com tamanho correto', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-sm"]');
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="avatar-sm"]');
    expect(styles?.width).toBe(TOKENS.avatar.sizes.sm.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.sm.height);
  });

  test('Avatar medium renderiza com tamanho correto', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-custom"]');
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="avatar-custom"]');
    expect(styles?.width).toBe(TOKENS.avatar.sizes.md.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.md.height);
  });

  test('Avatar large renderiza com tamanho correto', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-lg"]');
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="avatar-lg"]');
    expect(styles?.width).toBe(TOKENS.avatar.sizes.lg.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.lg.height);
  });

  test('Avatar extra-large renderiza com tamanho correto', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-xl"]');
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="avatar-xl"]');
    expect(styles?.width).toBe(TOKENS.avatar.sizes.xl.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.xl.height);
  });

  test('Texto centralizado verticalmente', async ({ page }) => {
    const avatar = page.locator(avatarTestID);
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, avatarTestID);
    expect(styles?.display).toBe('flex');
    expect(styles?.alignItems).toBe('center');
  });

  test('Texto centralizado horizontalmente', async ({ page }) => {
    const avatar = page.locator(avatarTestID);
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, avatarTestID);
    expect(styles?.display).toBe('flex');
    expect(styles?.justifyContent).toBe('center');
  });

  test('Avatar aceita cor de fundo customizada', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-custom"]');
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="avatar-custom"]');
    expect(styles?.backgroundColor).toBe(hexToRgb('#FF0000'));
  });

  test('Avatar aceita cor do texto customizada', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-custom"]');
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="avatar-custom"]');
    expect(styles?.color).toBe(hexToRgb('#FFFFFF'));
  });

  test('Avatar renderiza com aria-label quando fornecido', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-aria"]');
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('aria-label', 'Foto de João Silva');
  });

  test('Avatar usa role="img" para acessibilidade', async ({ page }) => {
    const avatar = page.locator(avatarTestID);
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('role', 'img');
  });
});
