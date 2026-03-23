# Exemplo de Saída

## Arquivo: button.spec.ts

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
  test('Inverse button tem estilo correto', async ({ page }) => {
    const buttonInverseID = '[data-testid="button-inverse"]';
    const button = page.locator(buttonInverseID);
    await expect(button).toBeVisible();

    const styles = await getComputedStyles(page, buttonInverseID);
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.textPrimary));
    expect(styles?.color).toBe(hexToRgb(TOKENS.primary));
  });

  // 2º TESTE - SKIP (código completo para referência)
  test.skip('Inverse button em hover', async ({ page }) => {
    const buttonInverseID = '[data-testid="button-inverse"]';
    const button = page.locator(buttonInverseID);
    await expect(button).toBeVisible();

    await button.hover();
    const styles = await getComputedStyles(page, buttonInverseID);
    expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
  });

  // 3º TESTE - SKIP (código completo para referência)
  test.skip('Inverse button em estado active', async ({ page }) => {
    const buttonInverseID = '[data-testid="button-inverse"]';
    const button = page.locator(buttonInverseID);
    await expect(button).toBeVisible();

    await button.click();
    const styles = await getComputedStyles(page, buttonInverseID);
    expect(styles?.opacity).toBe(1);
  });

  // ============================================================
  // DEMAIS CENÁRIOS - APENAS ASSINATURA (placeholder)
  // Implementar baseado no .spec.docs.md
  // ============================================================

  test.skip('Upgrade button tem dimensões do inverse sm-like', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });

  test.skip('Upgrade button ocupa 100% do container', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });

  test.skip('Inverse button em disabled tem estilo correto', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Inverse button em disabled não responde a cliques', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });

  test.skip('Inverse button em loading exibe spinner e desabilita interação', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Inverse button em loading não responde a cliques', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });

  test.skip('Inverse button em focus tem focus ring visível', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });

  test.skip('Inverse button é navegável por teclado', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Inverse button expõe estados corretamente para leitores de tela', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Inverse button em disabled expõe estado corretamente', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Inverse button em loading expõe estado corretamente', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Inverse button em mobile tem touch target adequado', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });

  test.skip('Double-click não causa ação duplicada no Inverse button', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Spinner aparece imediatamente ao clicar no Inverse button', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Transição para loading state preserva layout no Inverse button', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });

  test.skip('Inverse button type-button não submete formulário inadvertidamente', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });

  test.skip('Inverse button aceita className para estilos customizados', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Inverse button aceita data-testid para identificação em testes', async ({ page }) => {
    // TODO: implementar basado no .spec.docs.md
  });

  test.skip('Inverse button renderiza children como texto Upgrade Now', async ({ page }) => {
    // TODO: implementar baseado no .spec.docs.md
  });
});
```

---

## Arquivo: button.spec.docs.md

```markdown
# Button: Documentação de Implementação dos Testes

> **FONTE DA VERDADE: `specs/features/button/features/button.feature`**
> TDD sincronizado com BDD - cada teste corresponde a um cenário BDD

---

## 1. Metodologia

### BDD → TDD Sync Rules

| Tag BDD | Status no Teste |
|---------|-----------------|
| @smoke | ✅ ATIVO (test()) |
| @desktop | ⏭️ SKIP (test.skip()) |
| @mobile | ⏭️ SKIP (test.skip()) |
| @a11y | ⏭️ SKIP (test.skip()) |

### Status dos Testes

| Posição | Tipo | Qtd |
|---------|------|-----|
| 1º teste | ATIVO (código completo) | 1 |
| 2º-3º teste | SKIP (código completo) | 2 |
| Demais | SKIP (placeholder) | N-3 |

---

## 2. Testes (Sintonia Fina com BDD)

### Estilo e Dimensões
| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button tem estilo correto` | @smoke | ✅ ATIVO |
| `Upgrade button tem dimensões do inverse sm-like` | @smoke | ⏭️ SKIP |
| `Upgrade button ocupa 100% do container` | @smoke | ⏭️ SKIP |

### Estados Interativos
| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button em hover` | @desktop | ⏭️ SKIP |
| `Inverse button em estado active` | @desktop | ⏭️ SKIP |
| `Inverse button em disabled tem estilo correto` | @smoke | ⏭️ SKIP |
| `Inverse button em disabled não responde a cliques` | @smoke | ⏭️ SKIP |

### Loading State
| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button em loading exibe spinner e desabilita interação` | @smoke | ⏭️ SKIP |
| `Inverse button em loading não responde a cliques` | @smoke | ⏭️ SKIP |
| `Spinner aparece imediatamente ao clicar no Inverse button` | @smoke | ⏭️ SKIP |
| `Transição para loading state preserva layout no Inverse button` | @desktop | ⏭️ SKIP |

### Foco e Navegação
| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button em focus tem focus ring visível` | @a11y | ⏭️ SKIP |
| `Inverse button é navegável por teclado` | @a11y | ⏭️ SKIP |

### Acessibilidade
| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button expõe estados corretamente para leitores de tela` | @a11y | ⏭️ SKIP |
| `Inverse button em disabled expõe estado corretamente` | @a11y | ⏭️ SKIP |
| `Inverse button em loading expõe estado corretamente` | @a11y | ⏭️ SKIP |

### Responsividade
| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button em mobile tem touch target adequado` | @mobile | ⏭️ SKIP |

### Proteção
| Teste | Tags | Status |
|-------|------|--------|
| `Double-click não causa ação duplicada no Inverse button` | @defensive | ⏭️ SKIP |
| `Inverse button type-button não submete formulário inadvertidamente` | @defensive | ⏭️ SKIP |

### Customização
| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button aceita className para estilos customizados` | @smoke | ⏭️ SKIP |
| `Inverse button aceita data-testid para identificação em testes` | @smoke | ⏭️ SKIP |
| `Inverse button renderiza children como texto Upgrade Now` | @smoke | ⏭️ SKIP |

---

## 3. Resumo

| Categoria | Qtd |
|-----------|-----|
| Estilo e Dimensões | 3 |
| Estados Interativos | 4 |
| Loading State | 4 |
| Foco e Navegação | 2 |
| Acessibilidade | 3 |
| Responsividade | 1 |
| Proteção | 2 |
| Customização | 3 |
| **TOTAL** | **22** |

---

## 4. Design Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `primary` | #ff5c00 | Cor do botão inverse |
| `primaryHover` | #ff7a33 | Hover state |
| `error` | #ef4444 | Estado de erro |
| `border` | #2a2a2e | Bordas |
| `bgMuted` | #1a1a1d | Fundo escuro |
| `textPrimary` | #ffffff | Texto branco |
| `borderFocus` | #ff5c00 | Focus ring |

---

## 5. Comandos

```bash
# Rodar todos os testes
npm test

# Rodar apenas testes ativos
npm test -- --grep "@smoke"

# Rodar com debug
npm test -- --debug

# Gerar relatório
npm test -- --reporter=html
```

---

## 6. Referências de Documentação

### 6.1 Playwright API

| Método | Descrição | Uso |
|--------|-----------|-----|
| `page.locator()` | Seleciona elemento | Seletores CSS/data-testid |
| `page.getByRole()` | Seleciona por role ARIA | Botões, links, etc |
| `page.getByText()` | Seleciona por texto | Links, labels |
| `element.hover()` | Simula hover | Testar estado hover |
| `element.click()` | Simula clique | Testar click |
| `element.focus()` | Simula focus | Testar focus |
| `page.keyboard.press()` | Simula teclado | Tab, Enter, etc |

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
| `aria-pressed` | Indica estado pressed | Botões toggles |
| `role="button"` | Define semântica de botão | Acessibilidade |
| `aria-label` | Label alternativo | Botões sem texto |

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
|--------|---------|
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
