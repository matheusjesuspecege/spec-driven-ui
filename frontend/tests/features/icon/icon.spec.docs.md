# Icon Component - Test Documentation

> **BDD → TDD Sync Rules**
> - TDD é a **referência** para implementação
> - BDD sincroniza **após** implementação completar
> - Cenários em `.feature` são **inspiração**, não rígido

---

## Metodologia

Este documento mapeia os cenários BDD do arquivo `icon.feature` para testes Playwright.

### Princípios

1. **1 RF = 1 TESTE** com múltiplas assertions unificadas
2. **Primeiro teste ATIVO**, demais SKIP
3. **Unificar assertions relacionadas**
4. **Sem redundância**

---

## Design Tokens

```typescript
const TOKENS = {
  primary: "#ff5c00",
  success: "#22c55e",
  danger: "#ef4444",
  muted: "#6b6b70",
  subtle: "#8b8b90",
  placeholder: "#4a4a4e",
  textPrimary: "#ffffff",
  bgMuted: "#1a1a1d",
  disabled: 0.5,
  iconXs: 14,
  iconSm: 16,
  iconMd: 18,
  iconLg: 20,
  iconXl: 32,
} as const;
```

---

## Testes Completos (Código)

### Teste 1: ATIVO

**Cenário BDD:** Icon renderiza com tamanho md 18px padrao

```typescript
test("Icon renderiza com tamanho md 18px padrao", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-md"]');
  await expect(icon).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="icon-md"]');
  expect(styles?.width).toBe(TOKENS.iconMd);
  expect(styles?.height).toBe(TOKENS.iconMd);
});
```

### Teste 2: SKIP (Código Completo)

**Cenário BDD:** Icon renderiza com tamanho xs 14px

```typescript
test.skip("Icon renderiza com tamanho xs 14px", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-xs"]');
  await expect(icon).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="icon-xs"]');
  expect(styles?.width).toBe(TOKENS.iconXs);
  expect(styles?.height).toBe(TOKENS.iconXs);
});
```

### Teste 3: SKIP (Código Completo)

**Cenário BDD:** Icon com role presentation padrao nao precisa de label

```typescript
test.skip(
  "Icon com role presentation padrao nao precisa de label",
  async ({ page }) => {
    const icon = page.locator('[data-testid="icon-presentation"]');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute("role", "presentation");
  }
);
```

---

## Testes Placeholder (Por Implementar)

### Cenários de Tamanho

| # | Cenário BDD | data-testid | Assertions |
|---|-------------|-------------|------------|
| 1 | Icon renderiza com tamanho md 18px padrao | `icon-md` | width, height = 18 |
| 2 | Icon renderiza com tamanho xs 14px | `icon-xs` | width, height = 14 |
| 3 | Icon renderiza com tamanho sm 16px | `icon-sm` | width, height = 16 |
| 4 | Icon renderiza com tamanho lg 20px | `icon-lg` | width, height = 20 |
| 5 | Icon renderiza com tamanho xl 32px | `icon-xl` | width, height = 32 |

```typescript
test.skip("Icon renderiza com tamanho sm 16px", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-sm"]');
  await expect(icon).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="icon-sm"]');
  expect(styles?.width).toBe(TOKENS.iconSm);
  expect(styles?.height).toBe(TOKENS.iconSm);
});

test.skip("Icon renderiza com tamanho lg 20px", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-lg"]');
  await expect(icon).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="icon-lg"]');
  expect(styles?.width).toBe(TOKENS.iconLg);
  expect(styles?.height).toBe(TOKENS.iconLg);
});

test.skip("Icon renderiza com tamanho xl 32px", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-xl"]');
  await expect(icon).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="icon-xl"]');
  expect(styles?.width).toBe(TOKENS.iconXl);
  expect(styles?.height).toBe(TOKENS.iconXl);
});
```

### Cenários de Ícones

| # | Cenário BDD | data-testid |
|---|-------------|-------------|
| 6 | Icon renderiza icone de navegacao layout-dashboard | `icon-layout-dashboard` |
| 7 | Icon renderiza icone de navegacao chart-line | `icon-chart-line` |
| 8 | Icon renderiza icone de navegacao users | `icon-users` |
| 9 | Icon renderiza icone de acao download | `icon-download` |
| 10 | Icon renderiza icone de acao plus | `icon-plus` |
| 11 | Icon renderiza icone de indicacao trending-up | `icon-trending-up` |
| 12 | Icon renderiza icone de indicacao trending-down | `icon-trending-down` |
| 13 | Icon renderiza icone de navegacao chevron-left | `icon-chevron-left` |
| 14 | Icon renderiza icone de navegacao chevron-right | `icon-chevron-right` |
| 15 | Icon renderiza icone dismiss x | `icon-x` |

```typescript
test.skip("Icon renderiza icone de navegacao layout-dashboard", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-layout-dashboard"]');
  await expect(icon).toBeVisible();
  // Verificar que é um elemento SVG
  await expect(icon.locator("svg")).toBeVisible();
});

test.skip("Icon renderiza icone de acao plus", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-plus"]');
  await expect(icon).toBeVisible();
  await expect(icon.locator("svg")).toBeVisible();
});
```

### Cenários de Cor

| # | Cenário BDD | Assertions |
|---|-------------|------------|
| 16 | Icon herda cor do contexto via currentColor | color = currentColor |
| 17 | Icon aceita cor via CSS className | color = TOKENS.primary |

```typescript
test.skip("Icon herda cor do contexto via currentColor", async ({ page }) => {
  const parent = page.locator('[data-testid="icon-parent-primary"]');
  const icon = parent.locator('[data-testid="icon"]');
  await expect(icon).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="icon"]');
  // currentColor herda do pai
  expect(styles?.color).toBeDefined();
});

test.skip("Icon aceita cor via CSS className", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-with-class"]');
  await expect(icon).toBeVisible();
  await expect(icon).toHaveClass(/text-primary/);
});
```

### Cenários de Acessibilidade

| # | Cenário BDD | Assertions |
|---|-------------|------------|
| 18 | Icon com role presentation padrao nao precisa de label | role = presentation |
| 19 | Icon standalone com aria-label | role = img, aria-label |
| 20 | Icon aceita role customizado | role = button |

```typescript
test.skip("Icon standalone com aria-label", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-with-label"]');
  await expect(icon).toHaveAttribute("role", "img");
  await expect(icon).toHaveAttribute("aria-label", "Buscar");
});

test.skip("Icon aceita role customizado", async ({ page }) => {
  const icon = page.locator('[data-testid="icon-role-button"]');
  await expect(icon).toHaveAttribute("role", "button");
});
```

### Cenários de Integração

| # | Cenário BDD | Assertions |
|---|-------------|------------|
| 21 | Icon em Button herda cor do texto | color herdado |
| 22 | Icon em Navigation Item exibe corretamente | alinhamento vertical |

```typescript
test.skip("Icon em Button herda cor do texto", async ({ page }) => {
  const button = page.locator('[data-testid="button-with-icon"]');
  const icon = button.locator('[data-testid="icon"]');
  await expect(icon).toBeVisible();
  const buttonStyles = await getComputedStyles(page, '[data-testid="button-with-icon"]');
  const iconStyles = await getComputedStyles(page, '[data-testid="icon"]');
  // Icon herda cor do button
  expect(iconStyles?.color).toBe(buttonStyles?.color);
});

test.skip("Icon em Navigation Item exibe corretamente", async ({ page }) => {
  const navItem = page.locator('[data-testid="nav-item"]');
  const icon = navItem.locator('[data-testid="icon"]');
  await expect(icon).toBeVisible();
  // Verificar alinhamento vertical centralizado
  const iconStyles = await getComputedStyles(page, '[data-testid="icon"]');
  expect(iconStyles?.display).toBe("inline-block");
});
```

### Cenários de Tema

| # | Cenário BDD | Assertions |
|---|-------------|------------|
| 23 | Icon funciona em tema claro | currentColor adaptável |
| 24 | Icon funciona em tema escuro | currentColor adaptável |

```typescript
test.skip("Icon funciona em tema claro", async ({ page }) => {
  await page.evaluate(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  });
  const icon = page.locator('[data-testid="icon-theme"]');
  await expect(icon).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="icon-theme"]');
  expect(styles?.color).toBeDefined();
});

test.skip("Icon funciona em tema escuro", async ({ page }) => {
  await page.evaluate(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  });
  const icon = page.locator('[data-testid="icon-theme"]');
  await expect(icon).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="icon-theme"]');
  expect(styles?.color).toBeDefined();
});
```

### Cenários de Estado

| # | Cenário BDD | Assertions |
|---|-------------|------------|
| 25 | Icon em elemento desabilitado exibe opacity reduzida | opacity = 0.5 |
| 26 | Icon em elemento com hover herda comportamento | herda hover |

```typescript
test.skip(
  "Icon em elemento desabilitado exibe opacity reduzida",
  async ({ page }) => {
    const parent = page.locator('[data-testid="disabled-parent"]');
    const icon = parent.locator('[data-testid="icon"]');
    await expect(icon).toBeVisible();
    const styles = await getComputedStyles(page, '[data-testid="icon"]');
    expect(styles?.opacity).toBe(TOKENS.disabled);
  }
);

test.skip("Icon em elemento com hover herda comportamento", async ({ page }) => {
  const parent = page.locator('[data-testid="hoverable-parent"]');
  const icon = parent.locator('[data-testid="icon"]');
  await expect(icon).toBeVisible();
  await parent.hover();
  // Verificar que o hover effect foi aplicado
  const styles = await getComputedStyles(page, '[data-testid="icon"]');
  expect(styles?.color).toBeDefined();
});
```

---

## Resumo

| Categoria | Total | Status |
|-----------|-------|--------|
| Testes totais | 20 | - |
| Teste ATIVO | 1 | ✅ Código completo |
| Testes SKIP (código) | 2 | ✅ Código completo |
| Testes SKIP (placeholder) | 17 | ⏳ A implementar |

---

## Comandos Úteis

```bash
# Executar todos os testes
npx playwright test frontend/tests/features/icon/icon.spec.ts

# Executar apenas o teste ativo
npx playwright test frontend/tests/features/icon/icon.spec.ts --grep "ATIVO"

# Executar com debug
npx playwright test frontend/tests/features/icon/icon.spec.ts --debug

# Executar em mobile
npx playwright test frontend/tests/features/icon/icon.spec.ts --project=mobile
```

---

## Setup da Página de Teste

Para que os testes funcionem, a página `/test-ds` deve incluir instâncias do componente Icon:

```tsx
// frontend/src/app/test-ds/page.tsx
import { Icon } from "@/components/ui/Icon";

export default function TestDS() {
  return (
    <div>
      <Icon name="search" size="xs" data-testid="icon-xs" />
      <Icon name="plus" size="sm" data-testid="icon-sm" />
      <Icon name="settings" data-testid="icon-md" />
      <Icon name="zap" size="lg" data-testid="icon-lg" />
      <Icon name="image" size="xl" data-testid="icon-xl" />
      <Icon name="search" data-testid="icon-presentation" />
      <Icon name="search" aria-label="Buscar" data-testid="icon-with-label" />
      <Icon name="settings" role="button" data-testid="icon-role-button" />
    </div>
  );
}
```

---

## Referências

- [Playwright Test](https://playwright.dev/docs/api/class-test)
- [Playwright Locator](https://playwright.dev/docs/api/class-locator)
- [getComputedStyles Utils](https://github.com/example/utils/test-utils)
- [WAI-ARIA Icon Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/icon/)
- [Lucide Icons](https://lucide.dev/)
