# Estrutura do spec.ts

## Template Completo

```typescript
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
  borderFocus: '#ff5c00',
} as const;

test.describe('Feature: Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
  });

  // ============================================================
  // PRIMEIROS 3 TESTES - CÓDIGO COMPLETO
  // ============================================================

  // 1º TESTE - ATIVO (sem .skip())
  test('Nome do cenário BDD completo', async ({ page }) => {
    const elementID = '[data-testid="element-id"]';
    const element = page.locator(elementID);
    await expect(element).toBeVisible();

    const styles = await getComputedStyles(page, elementID);
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.textPrimary));
    expect(styles?.color).toBe(hexToRgb(TOKENS.primary));
  });

  // 2º TESTE - SKIP (código completo para referência)
  test.skip('Nome do cenário BDD completo', async ({ page }) => {
    const elementID = '[data-testid="element-id"]';
    const element = page.locator(elementID);
    await expect(element).toBeVisible();

    await element.hover();
    const styles = await getComputedStyles(page, elementID);
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
  });

  // 3º TESTE - SKIP (código completo para referência)
  test.skip('Nome do cenário BDD completo', async ({ page }) => {
    const elementID = '[data-testid="element-id"]';
    const element = page.locator(elementID);
    await expect(element).toBeVisible();

    await element.click();
    const styles = await getComputedStyles(page, elementID);
    expect(styles?.opacity).toBe(1);
  });

  // ============================================================
  // DEMAIS CENÁRIOS - APENAS ASSINATURA (placeholder)
  // Implementar baseado no .spec.docs.md
  // ============================================================

  test.skip('Nome do cenário BDD completo', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });
});
```

## Padrão de Geração

| Posição | Tipo | Descrição |
|---------|------|-----------|
| 1º teste | **ATIVO** | Código completo, sem `.skip()` |
| 2º teste | SKIP | Código completo, com `.skip()` |
| 3º teste | SKIP | Código completo, com `.skip()` |
| 4º+ teste | SKIP | Apenas assinatura + TODO |

## Estrutura do TOKENS

```typescript
const TOKENS = {
  // Cores primárias
  primary: '#ff5c00',
  primaryHover: '#ff7a33',
  primaryActive: '#cc4900',
  
  // Cores de estado
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  
  // Cores de fundo
  bgPrimary: '#1a1a1d',
  bgMuted: '#2a2a2e',
  bgElevated: '#3a3a3d',
  
  // Cores de texto
  textPrimary: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  
  // Cores de borda
  border: '#2a2a2e',
  borderFocus: '#ff5c00',
  
  // Opacidades
  disabled: 0.5,
  loading: 0.7,
} as const;
```

## Estrutura do beforeEach

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto(TEST_URL);
});
```

## Seletores Comuns

```typescript
// Seletor por data-testid
const elementID = '[data-testid="element-id"]';
const element = page.locator(elementID);

// Seletor por role
const button = page.getByRole('button', { name: 'Submit' });

// Seletor por texto
const link = page.getByText('Learn more');
```
