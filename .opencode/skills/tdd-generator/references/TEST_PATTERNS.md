# Test Patterns

## Nomenclatura de Testes

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

## Padrão de Unificação de Assertions

### Por Que Unificar?

- **Menos testes** = menos tempo de execução
- **Assertions relacionadas** = melhor compreensão
- **Setup único** = código mais limpo

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

### Categorias de Unificação

| Categoria | O que Unificar | Exemplo |
|-----------|----------------|---------|
| **Dimensões** | height, width, padding, margin, borderRadius | Button size |
| **Cores** | backgroundColor, color, borderColor | Button variant |
| **Estados** | hover, active, focus, disabled | Button state |
| **Layout** | display, position, gap, alignment | Container layout |
| **Acessibilidade** | aria-*, role, tabIndex | Element a11y |

---

## Padrão de Status

### Sincronização BDD → TDD

| Tag BDD | Status no Teste | Descrição |
|---------|-----------------|-----------|
| `@smoke` | `test()` (ATIVO) | Teste principal |
| `@desktop` | `test.skip()` | Desktop apenas |
| `@mobile` | `test.skip()` | Mobile apenas |
| `@a11y` | `test.skip()` | Acessibilidade |
| `@rule` | `test.skip()` | Regra de negócio |
| `@defensive` | `test.skip()` | Proteção |
| `@state` | `test.skip()` | Estado |

### Padrão de Geração

| Posição | Tipo | Descrição |
|---------|------|-----------|
| 1º teste | **ATIVO** | Primeiro teste @smoke, código completo |
| 2º teste | SKIP | Segundo teste @smoke, código completo |
| 3º teste | SKIP | Terceiro teste @smoke, código completo |
| 4º+ teste | SKIP | Demais cenários, apenas placeholder |

---

## Utilitários Comuns

### getComputedStyles

```typescript
import { getComputedStyles } from '@/utils/test-utils';

const styles = await getComputedStyles(page, '[data-testid="button"]');
expect(styles?.height).toBe(32);
expect(styles?.paddingTop).toBe(6);
```

### hexToRgb

```typescript
import { hexToRgb } from '@/utils/utils';

expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.primary));
```

### Seletores

```typescript
// data-testid
const button = page.locator('[data-testid="button-primary"]');

// Role
const submitBtn = page.getByRole('button', { name: 'Submit' });

// Texto
const link = page.getByText('Learn more');
```
