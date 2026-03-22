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
    // TODO: implementar basado no .spec.docs.md
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
    // TODO: implementar basado no .spec.docs.md
  });
});
```

---

## PADRÃO DE GERAÇÃO

| Posição | Tipo | Descrição |
|---------|------|-----------|
| 1º teste | **ATIVO** | Código completo, sem `.skip()` |
| 2º teste | SKIP | Código completo, com `.skip()` |
| 3º teste | SKIP | Código completo, com `.skip()` |
| 4º+ teste | SKIP | Apenas assinatura + TODO |

### Benefícios

1. **Código limpo** - 3 primeiros testes completos, fácil de iniciar
2. **Referência no .docs.md** - Dev implementa os skipados olhando o .md
3. **Progresso visível** - Pode ativar tests um a um conforme implementa

---

## FLUXO

1. Ler `specs/features/[feature]/research.md`, `plan.md` e `.feature`
2. Extrair cenários do arquivo `.feature` BDD
3. Gerar `.spec.ts`:
   - **Primeiros 3 testes**: código completo (1º sem `.skip()`, 2º e 3º com)
   - **Demais cenários**: apenas assinatura com `.skip()` e `// TODO`
4. Gerar `.spec.docs.md` completo com todos os snippets para referência
5. Sincronizar com BDD: `@smoke` = teste ativo, outras tags = `test.skip()`

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

Testes: N (1 ATIVO com código, 2 SKIP com código, N-3 SKIP como placeholder)
```
