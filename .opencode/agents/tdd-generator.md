---
name: tdd-generator
description: "Gera testes Playwright simplificados (*.spec.ts) e documentação (*.spec.docs.md). Padrão: 1 RF = 1 teste com múltiplas assertions unificadas. Primeiro teste ATIVO, demais SKIP. Segue princípio de testes únicos por RF."
mode: subagent
temperature: 0.1
tools:
  write: true
  edit: true
  read: true
permission:
  edit: allow
---

## Como Usar

```
@tdd-generator feature=[nome-da-feature]
```

---

## Princípios

1. **1 RF = 1 TESTE** com múltiplas assertions unificadas
2. **Primeiro teste ATIVO**, demais SKIP
3. **Unificar assertions relacionadas** (ex: height + padding + fontSize = 1 teste)
4. **Sem redundância**: não repetir verificações já cobertas

---

## INPUTS/OUTPUTS

**INPUTS:**
- `specs/features/[feature]/research.md`
- `specs/features/[feature]/plan.md`

**OUTPUTS:**
- `frontend/tests/features/[feature]/[feature].spec.ts`
- `frontend/tests/features/[feature]/[feature].spec.docs.md`

---

## NOMENCLATURA DE TESTES

### Regra: Usar texto do Cenário BDD completo como nome do teste

O nome do teste deve ser exatamente o texto do `Cenário` do arquivo `.feature`, com as seguintes exceções para sanitização:

| Caractere | Substituição | Exemplo |
|-----------|--------------|---------|
| `"` (aspas duplas) | removido | `type="button"` → `type-button` |
| `'` (aspas simples) | removido | - |
| `(` e `)` | removido | `(sm-like)` → `sm-like` |
| `#` | removido | - |
| `/` | substituído por `ou` | - |
| `.` à esquerda | removido | `.btn-spinner` → `btn-spinner` |

### Exemplo de Conversão

```
BDD (.feature):
  Cenário: Inverse button type="button" não submete formulário inadvertidamente

TDD (.spec.ts):
  test('Inverse button type-button não submete formulário inadvertidamente', async ({ page }) => {
    ...
  });
```

### Regras Importantes

1. **Manter texto completo em português** - não abreviar
2. **Preservar acentos** - ç, ã, é, etc. são mantidos
3. **1:1 com cenário BDD** - cada cenário = 1 teste
4. **Primeira letra maiúscula** - seguir padrão do cenário BDD

---

## PADRÃO DE UNIFICAÇÃO

### ANTES (redundante):
```typescript
test('RF-06 - deve ter altura de 32px', async ({ page }) => {
  expect(styles?.height).toBe(32);
});
test('RF-06 - deve ter padding 6x12px', async ({ page }) => {
  expect(styles?.paddingTop).toBe(6);
  expect(styles?.paddingRight).toBe(12);
});
test('RF-06 - deve ter font-size 12px', async ({ page }) => {
  expect(styles?.fontSize).toBe(12);
});
```

### DEPOIS (unificado):
```typescript
test('RF-06 - deve ter dimensões sm (32px, 6x12px, 12px, 6px)', async ({ page }) => {
  const styles = await getComputedStyles(page, '[data-testid="button-sm"]');
  expect(styles?.height).toBe(32);
  expect(styles?.paddingTop).toBe(6);
  expect(styles?.paddingRight).toBe(12);
  expect(styles?.paddingBottom).toBe(6);
  expect(styles?.paddingLeft).toBe(12);
  expect(styles?.fontSize).toBe(12);
  expect(styles?.borderRadius).toBe(6);
});
```

---

## ESTRUTURA DO SPEC.TS

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

  // RF-01: PRIMARY - UNIFICADO (visível + background + color + hover)
  test('RF-01 - deve renderizar botão primary com estilos corretos', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toBeVisible();
    
    const styles = await getComputedStyles(page, '[data-testid="button"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.primary));
    expect(styles?.color).toBe(hexToRgb(TOKENS.textPrimary));
    
    await button.hover();
    const hoverStyles = await getComputedStyles(page, '[data-testid="button"]');
    expect(hoverStyles?.backgroundColor).toBe(hexToRgb(TOKENS.primaryHover));
  });

  // RF-02: SECONDARY - UNIFICADO
  test.skip('RF-02 - deve renderizar botão secondary com border', async ({ page }) => {
    const button = page.locator('[data-testid="button-secondary"]');
    await expect(button).toBeVisible();
    
    const styles = await getComputedStyles(page, '[data-testid="button-secondary"]');
    expect(styles?.border).toBe(`1px solid ${hexToRgb(TOKENS.border)}`);
    
    await button.hover();
    const hoverStyles = await getComputedStyles(page, '[data-testid="button-secondary"]');
    expect(hoverStyles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
  });

  // RF-03: GHOST
  test.skip('RF-03 - deve renderizar botão ghost transparente', async ({ page }) => {
    const button = page.locator('[data-testid="button-ghost"]');
    await expect(button).toBeVisible();
    
    const styles = await getComputedStyles(page, '[data-testid="button-ghost"]');
    expect(styles?.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    
    await button.hover();
    const hoverStyles = await getComputedStyles(page, '[data-testid="button-ghost"]');
    expect(hoverStyles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
  });

  // RF-04: DESTRUCTIVE - UNIFICADO
  test.skip('RF-04 - deve renderizar botão destructive (bg error + texto branco)', async ({ page }) => {
    const button = page.locator('[data-testid="button-destructive"]');
    await expect(button).toBeVisible();
    
    const styles = await getComputedStyles(page, '[data-testid="button-destructive"]');
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.error));
    expect(styles?.color).toBe(hexToRgb(TOKENS.textPrimary));
  });

  // RF-05: INVERSE - UNIFICADO
  test.skip('RF-05 - deve renderizar botão inverse (bg branco + texto primary)', async ({ page }) => {
    const button = page.locator('[data-testid="button-inverse"]');
    await expect(button).toBeVisible();
    
    const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
    expect(styles?.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(styles?.color).toBe(hexToRgb(TOKENS.primary));
    expect(styles?.borderRadius).toBe(6);
    expect(styles?.fontSize).toBe(12);
    expect(styles?.fontWeight).toBe(600);
  });

  // RF-06: SIZE SM - UNIFICADO
  test.skip('RF-06 - deve ter dimensões sm (32px, 6x12px, 12px, 6px)', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button-sm"]');
    expect(styles?.height).toBe(32);
    expect(styles?.paddingTop).toBe(6);
    expect(styles?.paddingRight).toBe(12);
    expect(styles?.paddingBottom).toBe(6);
    expect(styles?.paddingLeft).toBe(12);
    expect(styles?.fontSize).toBe(12);
    expect(styles?.borderRadius).toBe(6);
  });

  // RF-07: SIZE MD - UNIFICADO
  test.skip('RF-07 - deve ter dimensões md default (40px, 10x16px, 13px, 8px)', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button-md"]');
    expect(styles?.height).toBe(40);
    expect(styles?.paddingTop).toBe(10);
    expect(styles?.paddingRight).toBe(16);
    expect(styles?.paddingBottom).toBe(10);
    expect(styles?.paddingLeft).toBe(16);
    expect(styles?.fontSize).toBe(13);
    expect(styles?.borderRadius).toBe(8);
  });

  // RF-08: SIZE LG - UNIFICADO
  test.skip('RF-08 - deve ter dimensões lg (48px, 12x20px, 14px, 8px)', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button-lg"]');
    expect(styles?.height).toBe(48);
    expect(styles?.paddingTop).toBe(12);
    expect(styles?.paddingRight).toBe(20);
    expect(styles?.paddingBottom).toBe(12);
    expect(styles?.paddingLeft).toBe(20);
    expect(styles?.fontSize).toBe(14);
    expect(styles?.borderRadius).toBe(8);
  });

  // RF-09: ICON LEFT
  test.skip('RF-09 - deve renderizar ícone à esquerda com gap 8px', async ({ page }) => {
    const icon = page.locator('[data-testid="button"] .btn-icon-left');
    await expect(icon).toBeVisible();
    expect(icon).toHaveCSS('margin-right', '8px');
  });

  // RF-10: ICON RIGHT
  test.skip('RF-10 - deve renderizar ícone à direita com gap 8px', async ({ page }) => {
    const icon = page.locator('[data-testid="button"] .btn-icon-right');
    await expect(icon).toBeVisible();
    expect(icon).toHaveCSS('margin-left', '8px');
  });

  // RF-11: ICON-ONLY - UNIFICADO
  test.skip('RF-11 - deve renderizar icon-only (quadrado + aria-label + 44x44px)', async ({ page }) => {
    const button = page.locator('[data-testid="button-icon-only"]');
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aria-label', 'Add');
    
    const styles = await getComputedStyles(page, '[data-testid="button-icon-only"]');
    expect(styles?.paddingTop).toBe(10);
    expect(styles?.paddingRight).toBe(10);
    expect(styles?.paddingBottom).toBe(10);
    expect(styles?.paddingLeft).toBe(10);
    
    const box = await button.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });

  // RF-12: LOADING - UNIFICADO
  test.skip('RF-12 - deve ter estado loading (aria-busy + spinner + cursor)', async ({ page }) => {
    const button = page.locator('[data-testid="button-loading"]');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    
    const spinner = page.locator('[data-testid="button-loading"] .btn-spinner');
    await expect(spinner).toBeVisible();
    
    const styles = await getComputedStyles(page, '[data-testid="button-loading"]');
    expect(styles?.cursor).toBe('not-allowed');
    expect(styles?.opacity).toBe(0.5);
  });

  // RF-13: DISABLED - UNIFICADO
  test.skip('RF-13 - deve ter estado disabled (attr + cursor + opacity)', async ({ page }) => {
    const button = page.locator('[data-testid="button-disabled"]');
    await expect(button).toHaveAttribute('disabled');
    
    const styles = await getComputedStyles(page, '[data-testid="button-disabled"]');
    expect(styles?.cursor).toBe('not-allowed');
    expect(styles?.opacity).toBe(0.5);
  });

  // RF-14: FOCUS - UNIFICADO
  test.skip('RF-14 - deve ter focus ring 2px e ser navegável via Tab', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    
    await button.focus();
    const focusStyles = await getComputedStyles(page, '[data-testid="button"]');
    expect(focusStyles?.outlineWidth).toBe(2);
    expect(focusStyles?.outlineColor).toBe(hexToRgb(TOKENS.borderFocus));
    
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
  });

  // RF-15: FULLWIDTH
  test.skip('RF-15 - deve ocupar 100% width com fullWidth', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="button-fullwidth"]');
    expect(styles?.width).toBe('100%');
  });

  // RF-16: ACCESSIBILITY - UNIFICADO
  test.skip('RF-16 - deve ter role=button e aceitar props customizadas', async ({ page }) => {
    const button = page.locator('[data-testid="button"]');
    await expect(button).toHaveAttribute('role', 'button');
    await expect(button).toHaveAttribute('type', 'button');
    await expect(button).toContainText('Click me');
  });

});
```

---

## TABELA DE UNIFICAÇÃO

| RF | Assertions | Testes Antes | Testes Depois |
|----|------------|--------------|---------------|
| RF-01 | visível + bg + color + hover | 4 | **1** |
| RF-02 | border + hover | 3 | **1** |
| RF-03 | bg + hover | 2 | **1** |
| RF-04 | bg + color | 2 | **1** |
| RF-05 | bg + color + radius + font | 4 | **1** |
| RF-06 | height + padding + font + radius | 4 | **1** |
| RF-07 | height + padding + font + radius | 4 | **1** |
| RF-08 | height + padding + font + radius | 4 | **1** |
| RF-09 | ícone + gap | 2 | **1** |
| RF-10 | ícone + gap | 2 | **1** |
| RF-11 | class + padding + aria + box | 4 | **1** |
| RF-12 | aria-busy + aria-disabled + spinner + cursor + opacity | 5 | **1** |
| RF-13 | attr + cursor + opacity | 4 | **1** |
| RF-14 | outline + Tab | 5 | **2** |
| RF-15 | width + padding | 2 | **1** |
| RF-16 | role + type + children | 7 | **2** |

**TOTAL: ~20 testes (de ~60)**

---

## FLUXO

1. Ler `specs/features/[feature]/plan.md`
2. Extrair RFs e categorizá-los
3. Gerar spec.ts com **1 RF = 1 teste unificado**
4. Gerar spec.docs.md com código para passar cada RF
5. Primeiro teste ATIVO, demais SKIP

---

## ESTRUTURA COMPLETA DO SPEC.DOCS.MD

O arquivo `.spec.docs.md` deve conter TODAS as informações necessárias para o desenvolvedor implementar os testes. Não é apenas uma lista - é um **guia completo de referência**.

### Estrutura Obrigatória

```markdown
# [Feature]: Documentação de Implementação dos Testes

> **FONTE DA VERDADE: `specs/features/[feature]/features/[feature].feature`**
> TDD sincronizado com BDD - cada teste corresponde a um cenário BDD

---

## 1. Metodologia
### BDD → TDD Sync Rules
### Status dos Testes

---

## 2. Testes (Sincronizados com BDD)
### [Categoria]
| Teste | Tags | Status |
|-------|------|--------|
| `Nome do teste` | @tag | ✅ ATIVO / ⏭️ SKIP |

#### Snippet - `Nome do teste`
\`\`\`typescript
// @tag - STATUS
test('Nome do teste', async ({ page }) => {
  // código completo do teste
});
\`\`\`

---

## 3. Resumo
Tabela com totais por categoria

---

## 4. Design Tokens
Tabela com todos os tokens usados

---

## 5. Comandos
Scripts úteis para executar os testes

---

## 6. Referências de Documentação
### 6.1 Playwright API
| Método | Descrição | Uso |
|--------|-----------|-----|
| `page.locator()` | Seleciona elemento | Seletores CSS/data-testid |
| ... | ... | ... |

### 6.2 Utils Customizadas
| Função | Arquivo | Descrição |
|--------|---------|-----------|
| `getComputedStyles()` | @/utils/test-utils | Extrai CSS computado |
| `hexToRgb()` | @/utils/utils | Converte hex para rgb |

### 6.3 WAI-ARIA
| Atributo | Descrição | Quando Usar |
|----------|-----------|--------------|
| `aria-busy` | Indica elemento em processamento | Estado loading |
| `aria-disabled` | Indica elemento desabilitado | Estado disabled |
| `role="button"` | Define semântica de botão | Acessibilidade |

---

## 7. Dicas de Design Patterns
### 7.1 Clean Code (Robert Martin)

| Princípio | Aplicação nos Testes |
|-----------|---------------------|
| **Nomes significativos** | Nome descreve comportamento, não implementação |
| **Funções pequenas** | Cada teste verifica um cenário específico |
| **DRY** | TOKENS centraliza valores repetidos |
| **Arrange-Act-Assert** | Setup → Ação → Verificação |
| **Sem comentários desnecessários** | Código auto-explicativo |

### 7.2 Testing Patterns

| Pattern | Exemplo |
|---------|---------|
| **Given-When-Then (BDD)** | Segue estrutura do .feature |
| **Test Isolation** | `beforeEach` reseta estado |
| **Descriptive Test Names** | Nome descreve comportamento |
| **Single Assertion Focus** | Assertions agrupadas logicamente |

### 7.3 Acessibilidade (WCAG)

| Princípio | Como Testar |
|-----------|-------------|
| **Keyboard Navigation** | `page.keyboard.press('Tab')` |
| **Focus Visibility** | `expect(button).toBeFocused()` |
| **ARIA Attributes** | `aria-busy`, `aria-disabled`, `role` |
| **Touch Target Size** | `expect(box?.width).toBeGreaterThanOrEqual(44)` |

### 7.4 Design System Patterns

| Pattern | Implementação |
|--------|--------------|
| **Design Tokens** | `TOKENS` object centralizado |
| **Semantic Colors** | `primary`, `bgMuted`, `borderFocus` |
| **Consistent Selectors** | `data-testid` para todos os elementos |
```

---

## REGRAS DE GERAÇÃO

### O .spec.docs.md DEVE:

1. **Snippets completos** - Todo código necessário para implementar o teste
2. **Referências documentadas** - Links para documentação oficial
3. **Design patterns** - Boas práticas de código e testes
4. **Sync com BDD** - Nomes sincronizados com cenários
5. **Status correto** - @smoke = test(), outros = test.skip()

### O .spec.docs.md NÃO DEVE:

1. **Perder snippets durante sync** - Manter código mesmo ao renomear
2. **Ter código genérico** - Cada snippet deve ser específico
3. **Faltar referências** - Documentar todas as APIs usadas

---

## OUTPUT

```
✅ Testes gerados para feature [nome]

Arquivos:
- frontend/tests/features/[feature]/[feature].spec.ts
- frontend/tests/features/[feature]/[feature].spec.docs.md

Testes: N (1 ATIVO, N-1 SKIPPED)
Unificação: ~60 → ~20 testes
```
