# Avatar - Documentação de Testes

## Metodologia

Este arquivo documenta a transformação de cenários BDD em testes Playwright seguindo o padrão **1 RF = 1 TESTE** com múltiplas assertions unificadas.

### Sync Rules (BDD → TDD)
- `@render` → Testes de renderização inicial
- `@state` → Testes de estados e variações
- `@interaction` → Testes de props interativas
- `@a11y` → Testes de acessibilidade
- Primeiro teste: **ATIVO** (código completo)
- Demais: **SKIP** com código ou placeholders

---

## Testes por Categoria

### Renderização (@render)

```typescript
test('Avatar renderiza círculo com border-radius 50%', async ({ page }) => {
  await page.goto('/test-avatar');
  const avatar = page.locator('[data-testid="avatar"]');
  await expect(avatar).toBeVisible();
  const styles = await avatar.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return {
      borderRadius: computed.borderRadius,
      width: el.clientWidth,
      height: el.clientHeight,
    };
  });
  expect(styles.borderRadius).toBe(`${styles.width / 2}px`);
});

test('Avatar exibe as iniciais fornecidas', async ({ page }) => {
  await page.goto('/test-avatar');
  const avatarText = page.locator('[data-testid="avatar-text"]');
  await expect(avatarText).toBeVisible();
  await expect(avatarText).toHaveText('MR');
});

test('Avatar usa tamanho padrão quando não especificado', async ({ page }) => {
  await page.goto('/test-avatar');
  const avatar = page.locator('[data-testid="avatar"]');
  const styles = await avatar.evaluate((el) => ({
    width: el.clientWidth,
    height: el.clientHeight,
  }));
  expect(styles.width).toBe(TOKENS.avatar.sizes.md.width);
  expect(styles.height).toBe(TOKENS.avatar.sizes.md.height);
});

test('Avatar usa cores padrão quando não especificadas', async ({ page }) => {
  await page.goto('/test-avatar');
  const avatar = page.locator('[data-testid="avatar"]');
  const avatarText = page.locator('[data-testid="avatar-text"]');
  const bgStyles = await avatar.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  const textStyles = await avatarText.evaluate((el) => window.getComputedStyle(el).color);
  expect(bgStyles).toBe(TOKENS.avatar.default.backgroundColor);
  expect(textStyles).toBe(TOKENS.avatar.default.textColor);
});
```

### Estados (@state)

```typescript
test('Avatar small renderiza com tamanho correto', async ({ page }) => {
  await page.goto('/test-avatar?size=sm');
  const avatar = page.locator('[data-testid="avatar"]');
  const styles = await avatar.evaluate((el) => ({
    width: el.clientWidth,
    height: el.clientHeight,
  }));
  expect(styles.width).toBe(TOKENS.avatar.sizes.sm.width);
  expect(styles.height).toBe(TOKENS.avatar.sizes.sm.height);
});

test('Avatar medium renderiza com tamanho correto', async ({ page }) => {
  await page.goto('/test-avatar?size=md');
  const avatar = page.locator('[data-testid="avatar"]');
  const styles = await avatar.evaluate((el) => ({
    width: el.clientWidth,
    height: el.clientHeight,
  }));
  expect(styles.width).toBe(TOKENS.avatar.sizes.md.width);
  expect(styles.height).toBe(TOKENS.avatar.sizes.md.height);
});

test('Avatar large renderiza com tamanho correto', async ({ page }) => {
  await page.goto('/test-avatar?size=lg');
  const avatar = page.locator('[data-testid="avatar"]');
  const styles = await avatar.evaluate((el) => ({
    width: el.clientWidth,
    height: el.clientHeight,
  }));
  expect(styles.width).toBe(TOKENS.avatar.sizes.lg.width);
  expect(styles.height).toBe(TOKENS.avatar.sizes.lg.height);
});

test('Avatar extra-large renderiza com tamanho correto', async ({ page }) => {
  await page.goto('/test-avatar?size=xl');
  const avatar = page.locator('[data-testid="avatar"]');
  const styles = await avatar.evaluate((el) => ({
    width: el.clientWidth,
    height: el.clientHeight,
  }));
  expect(styles.width).toBe(TOKENS.avatar.sizes.xl.width);
  expect(styles.height).toBe(TOKENS.avatar.sizes.xl.height);
});

test('Texto centralizado verticalmente', async ({ page }) => {
  await page.goto('/test-avatar');
  const avatar = page.locator('[data-testid="avatar"]');
  const avatarText = page.locator('[data-testid="avatar-text"]');
  const avatarRect = await avatar.boundingBox();
  const textRect = await avatarText.boundingBox();
  const verticalCenter = avatarRect.y + avatarRect.height / 2;
  const textCenter = textRect.y + textRect.height / 2;
  expect(Math.abs(verticalCenter - textCenter)).toBeLessThan(2);
});

test('Texto centralizado horizontalmente', async ({ page }) => {
  await page.goto('/test-avatar');
  const avatar = page.locator('[data-testid="avatar"]');
  const avatarText = page.locator('[data-testid="avatar-text"]');
  const avatarRect = await avatar.boundingBox();
  const textRect = await avatarText.boundingBox();
  const horizontalCenter = avatarRect.x + avatarRect.width / 2;
  const textCenter = textRect.x + textRect.width / 2;
  expect(Math.abs(horizontalCenter - textCenter)).toBeLessThan(2);
});
```

### Interação (@interaction)

```typescript
test('Avatar aceita cor de fundo customizada', async ({ page }) => {
  await page.goto('/test-avatar?backgroundColor=%23FF0000');
  const avatar = page.locator('[data-testid="avatar"]');
  const styles = await avatar.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  expect(styles).toBe('rgb(255, 0, 0)');
});

test('Avatar aceita cor do texto customizada', async ({ page }) => {
  await page.goto('/test-avatar?textColor=%23FFFFFF');
  const avatarText = page.locator('[data-testid="avatar-text"]');
  const styles = await avatarText.evaluate((el) => window.getComputedStyle(el).color);
  expect(styles).toBe('rgb(255, 255, 255)');
});
```

### Acessibilidade (@a11y)

```typescript
test('Avatar renderiza com aria-label quando fornecido', async ({ page }) => {
  await page.goto('/test-avatar?aria-label=Foto%20de%20Jo%C3%A3o%20Silva');
  const avatar = page.locator('[data-testid="avatar"]');
  await expect(avatar).toHaveAttribute('aria-label', 'Foto de João Silva');
});

test('Avatar usa role="img" para acessibilidade', async ({ page }) => {
  await page.goto('/test-avatar');
  const avatar = page.locator('[data-testid="avatar"]');
  await expect(avatar).toHaveAttribute('role', 'img');
});
```

---

## Resumo

| Categoria | Total |
|-----------|-------|
| @render | 4 |
| @state | 6 |
| @interaction | 2 |
| @a11y | 2 |
| **TOTAL** | **14** |

---

## Design Tokens

```typescript
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
```

---

## Comandos Úteis

```bash
# Executar todos os testes de avatar
npx playwright test frontend/tests/features/avatar/avatar.spec.ts

# Executar apenas o primeiro teste (ativo)
npx playwright test frontend/tests/features/avatar/avatar.spec.ts --grep "Avatar renderiza círculo"

# Executar testes com debug
npx playwright test frontend/tests/features/avatar/avatar.spec.ts --debug

# Executar testes em headed mode
npx playwright test frontend/tests/features/avatar/avatar.spec.ts --headed
```

---

## Referências

### Playwright API
- [test](https://playwright.dev/docs/api/class-test)
- [expect](https://playwright.dev/docs/api/class-expect)
- [Locator](https://playwright.dev/docs/api/class-locator)

### Utils
- [getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)
- [boundingBox](https://playwright.dev/docs/api/class-locator#locator-bounding-box)

### WAI-ARIA
- [aria-label](https://www.w3.org/TR/wai-aria/#aria-label)
- [role="img"](https://www.w3.org/TR/wai-aria/#img)

---

## Dicas de Design Patterns

1. **Seletores**: Sempre usar `data-testid` para elementos testáveis
2. **Assertions unificadas**: Agrupar verificações relacionadas em um único teste
3. **Tokens centralizados**: Manter valores em constante `TOKENS` para fácil manutenção
4. **Testes isolados**: Cada teste deve funcionar independentemente
5. **Nomenclatura descritiva**: Nome do teste deve refletir exatamente o cenário BDD
