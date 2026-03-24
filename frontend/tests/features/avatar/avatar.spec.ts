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

const avatarTestID = '[data-testid="avatar"]';
const avatarTestID_sm = '[data-testid="avatar-sm"]'
const avatarTestID_md = '[data-testid="avatar-md"]'
const avatarTestID_lg = '[data-testid="avatar-lg"]'
const avatarTestID_xl = '[data-testid="avatar-xl"]'

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
    const avatar = page.locator(avatarTestID_sm);
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, avatarTestID_sm);
    expect(styles?.width).toBe(TOKENS.avatar.sizes.sm.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.sm.height);
  });

  test('Avatar medium renderiza com tamanho correto', async ({ page }) => {
    const avatar = page.locator(avatarTestID_md);
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, avatarTestID_md);
    expect(styles?.width).toBe(TOKENS.avatar.sizes.md.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.md.height);
  });

  test('Avatar large renderiza com tamanho correto', async ({ page }) => {
    const avatar = page.locator(avatarTestID_lg);
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, avatarTestID_lg);
    expect(styles?.width).toBe(TOKENS.avatar.sizes.lg.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.lg.height);
  });

  test('Avatar extra-large renderiza com tamanho correto', async ({ page }) => {
    const avatar = page.locator(avatarTestID_xl);
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, avatarTestID_xl);
    expect(styles?.width).toBe(TOKENS.avatar.sizes.xl.width);
    expect(styles?.height).toBe(TOKENS.avatar.sizes.xl.height);
  });

  test('Texto centralizado verticalmente', async ({ page }) => {
    const avatar = page.locator(avatarTestID);
    await expect(avatar).toBeVisible();
    const styles = await getComputedStyles(page, avatarTestID);
    expect(styles?.alignItems).toBe('center');
  });

  test.skip('Texto centralizado horizontalmente', async ({ page }) => {
    // TODO: Implementar verificação de centralização horizontal
  });

  test.skip('Avatar aceita cor de fundo customizada', async ({ page }) => {
    // TODO: Implementar teste com backgroundColor="#FF0000"
  });

  test.skip('Avatar aceita cor do texto customizada', async ({ page }) => {
    // TODO: Implementar teste com textColor="#FFFFFF"
  });

  test.skip('Avatar renderiza com aria-label quando fornecido', async ({ page }) => {
    // TODO: Implementar teste de aria-label
  });

  test.skip('Avatar usa role="img" para acessibilidade', async ({ page }) => {
    // TODO: Implementar teste de role="img"
  });
});
