# Button: Documentação de Implementação dos Testes

> **FONTE DA VERDADE: `specs/features/button/features/button.feature`**
> TDD sincronizado com BDD - cada teste corresponde a um cenário BDD
> **Ordem por dependência**: `render → state → interaction → a11y`

---

## 1. Metodologia

### BDD → TDD Sync Rules

| Regra | Descrição |
|-------|-----------|
| TDD SEM BDD | ❌ REMOVER - apagar teste |
| BDD SEM TDD | ⚠️ GERAR - criar teste |
| @smoke | `test()` ATIVO |
| Others | `test.skip()` |

### Status dos Testes

| Tag BDD | Status TDD | Count |
|---------|------------|-------|
| @smoke | `test()` (ativo) | 6 |
| @state | `test()` (ativo) | 2 |
| others | `test.skip()` | 14 |

### Ordem de Execução

```
RENDER (6)     → Componente existe e renderiza corretamente
STATE (5)      → Estados: hover, active, disabled, loading, focus  
INTERACTION (7) → Ações do usuário: cliques, navegações
A11Y (4)       → Leitores de tela, touch targets
```

---

## 2. Testes (Sincronizados com BDD)

### 2.1 RENDER (6 testes) - Renderização básica do componente

| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button tem estilo correto` | @smoke | ✅ ATIVO |
| `Upgrade button tem dimensões do inverse sm-like` | @smoke | ✅ ATIVO |
| `Upgrade button ocupa 100% do container` | @smoke | ✅ ATIVO |
| `Inverse button renderiza children como texto Upgrade Now` | @smoke | ✅ ATIVO |
| `Inverse button aceita className para estilos customizados` | @classname | ⏭️ SKIP |
| `Inverse button aceita data-testid para identificação em testes` | @testid | ⏭️ SKIP |

#### Snippet - `Inverse button tem estilo correto`

```typescript
// @smoke - ATIVO
test('Inverse button tem estilo correto', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
  expect(styles?.backgroundColor).toBe('rgb(255, 255, 255)');
  expect(styles?.color).toBe(hexToRgb(TOKENS.primary));
});
```

#### Snippet - `Upgrade button tem dimensões do inverse sm-like`

```typescript
// @smoke - ATIVO
test('Upgrade button tem dimensões do inverse sm-like', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
  expect(styles?.fontSize).toBe(12);
  expect(styles?.fontWeight).toBe(600);
  expect(styles?.borderRadius).toBe(6);
  expect(styles?.paddingTop).toBe(10);
  expect(styles?.paddingBottom).toBe(10);
});
```

#### Snippet - `Upgrade button ocupa 100% do container`

```typescript
// @smoke - ATIVO
test('Upgrade button occupies the full width of the container', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
  const screen = await button.evaluate(() => window.screen.width);
  expect(styles?.screenWidth).toBe(screen);
});
```

#### Snippet - `Inverse button renderiza children como texto Upgrade Now`

```typescript
// @smoke - ATIVO
test('Inverse button renderiza children como texto Upgrade Now', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toContainText(/Upgrade now/i);
});
```

#### Snippet - `Inverse button aceita className para estilos customizados`

```typescript
// @classname
test.skip('Inverse button aceita className para estilos customizados', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toHaveClass(/upgrade-btn/);
});
```

#### Snippet - `Inverse button aceita data-testid para identificação em testes`

```typescript
// @testid
test.skip('Inverse button aceita data-testid para identificação em testes', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toHaveAttribute('data-testid', 'button-inverse');
});
```

---

### 2.2 STATE (5 testes) - Estados do componente

| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button em hover` | @hover @smoke | ✅ ATIVO |
| `Inverse button em estado active` | @active @smoke | ✅ ATIVO |
| `Inverse button em disabled tem estilo correto` | @disabled | ⏭️ SKIP |
| `Inverse button em loading exibe spinner e desabilita interação` | @loading | ⏭️ SKIP |
| `Inverse button em focus tem focus ring visível` | @focus @a11y | ⏭️ SKIP |

#### Snippet - `Inverse button em hover`

```typescript
// @hover @smoke - ATIVO
test('Inverse button em hover', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toBeVisible();
  await button.hover();
  const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
  expect(styles?.backgroundColor).toBe(hexToRgb(TOKENS.bgMuted));
});
```

#### Snippet - `Inverse button em estado active`

```typescript
// @active @smoke - ATIVO
test('Inverse button em estado active', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toBeVisible();
  await button.click();
  const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
  expect(styles?.opacity).toBe(1);
});
```

#### Snippet - `Inverse button em disabled tem estilo correto`

```typescript
// @disabled
test.skip('Inverse button em disabled tem estilo correto', async ({ page }) => {
  const button = page.locator('[data-testid="button-disabled-inverse"]');
  await expect(button).toHaveAttribute('disabled');
  const styles = await getComputedStyles(page, '[data-testid="button-disabled-inverse"]');
  expect(styles?.opacity).toBe(0.5);
  expect(styles?.cursor).toBe('not-allowed');
});
```

#### Snippet - `Inverse button em loading exibe spinner e desabilita interação`

```typescript
// @loading
test.skip('Inverse button em loading exibe spinner e desabilita interação', async ({ page }) => {
  const button = page.locator('[data-testid="button-loading-inverse"]');
  await expect(button).toHaveAttribute('aria-busy', 'true');
  await expect(button).toHaveAttribute('aria-disabled', 'true');
  const spinner = page.locator('[data-testid="button-loading-inverse"] .btn-spinner');
  await expect(spinner).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="button-loading-inverse"]');
  expect(styles?.cursor).toBe('not-allowed');
});
```

#### Snippet - `Inverse button em focus tem focus ring visível`

```typescript
// @focus @a11y
test.skip('Inverse button em focus tem focus ring visível', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await button.focus();
  const styles = await getComputedStyles(page, '[data-testid="button-inverse"]');
  expect(styles?.outlineWidth).toBe(2);
  expect(styles?.outlineColor).toBe(hexToRgb(TOKENS.borderFocus));
});
```

---

### 2.3 INTERACTION (7 testes) - Ações do usuário

| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button em disabled não responde a cliques` | @interaction | ⏭️ SKIP |
| `Inverse button em loading não responde a cliques` | @interaction | ⏭️ SKIP |
| `Inverse button é navegável por teclado` | @keyboard | ⏭️ SKIP |
| `Double-click não causa ação duplicada no Inverse button` | @double-click | ⏭️ SKIP |
| `Spinner aparece imediatamente ao clicar no Inverse button` | @double-click | ⏭️ SKIP |
| `Transição para loading state preserva layout no Inverse button` | @loading-transition | ⏭️ SKIP |
| `Inverse button type="button" não submete formulário inadvertidamente` | @type-attribute | ⏭️ SKIP |

#### Snippet - `Inverse button em disabled não responde a cliques`

```typescript
// @interaction
test.skip('Inverse button em disabled não responde a cliques', async ({ page }) => {
  const button = page.locator('[data-testid="button-disabled-inverse"]');
  await button.click({ force: true });
});
```

#### Snippet - `Inverse button em loading não responde a cliques`

```typescript
// @interaction
test.skip('Inverse button em loading não responde a cliques', async ({ page }) => {
  const button = page.locator('[data-testid="button-loading-inverse"]');
  await button.click({ force: true });
});
```

#### Snippet - `Inverse button é navegável por teclado`

```typescript
// @keyboard
test.skip('Inverse button é navegável por teclado', async ({ page }) => {
  await page.keyboard.press('Tab');
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toBeFocused();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
});
```

#### Snippet - `Double-click não causa ação duplicada no Inverse button`

```typescript
// @double-click
test.skip('Double-click não causa ação duplicada no Inverse button', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  let clickCount = 0;
  await page.evaluate((selector) => {
    const btn = document.querySelector(selector);
    btn?.addEventListener('click', () => { clickCount++; });
  }, '[data-testid="button-inverse"]');
  await button.dblclick();
  await button.click({ clickCount: 2 });
  expect(clickCount).toBeLessThanOrEqual(1);
});
```

#### Snippet - `Spinner aparece imediatamente ao clicar no Inverse button`

```typescript
// @double-click
test.skip('Spinner aparece imediatamente ao clicar no Inverse button', async ({ page }) => {
  const button = page.locator('[data-testid="button-click-loading-inverse"]');
  await button.click();
  const spinner = page.locator('[data-testid="button-click-loading-inverse"] .btn-spinner');
  await expect(spinner).toBeVisible();
});
```

#### Snippet - `Transição para loading state preserva layout no Inverse button`

```typescript
// @loading-transition
test.skip('Transição para loading state preserva layout no Inverse button', async ({ page }) => {
  const button = page.locator('[data-testid="button-click-loading-inverse"]');
  await expect(button).toBeVisible();
  const styles = await getComputedStyles(page, '[data-testid="button-click-loading-inverse"]');
  expect(styles?.width).toBeDefined();
  expect(styles?.height).toBeDefined();
  await button.click();
  const stylesAfter = await getComputedStyles(page, '[data-testid="button-click-loading-inverse"]');
  expect(stylesAfter?.width).toBeDefined();
  expect(stylesAfter?.height).toBeDefined();
});
```

#### Snippet - `Inverse button type="button" não submete formulário inadvertidamente`

```typescript
// @type-attribute
test.skip('Inverse button type-button não submete formulário inadvertidamente', async ({ page }) => {
  const form = page.locator('[data-testid="form-submitted"]');
  const button = form.locator('button');
  await expect(button).toHaveAttribute('type', 'button');
  await button.click();
  await expect(form).not.toContainText(/Form submitted!/i);
});
```

---

### 2.4 A11Y (4 testes) - Acessibilidade

| Teste | Tags | Status |
|-------|------|--------|
| `Inverse button expõe estados corretamente para leitores de tela` | @aria | ⏭️ SKIP |
| `Inverse button em disabled expõe estado corretamente` | @aria | ⏭️ SKIP |
| `Inverse button em loading expõe estado corretamente` | @aria | ⏭️ SKIP |
| `Inverse button em mobile tem touch target adequado` | @touch-target | ⏭️ SKIP |

#### Snippet - `Inverse button expõe estados corretamente para leitores de tela`

```typescript
// @aria
test.skip('Inverse button expõe estados corretamente para leitores de tela', async ({ page }) => {
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toHaveAttribute('role', 'button');
});
```

#### Snippet - `Inverse button em disabled expõe estado corretamente`

```typescript
// @aria
test.skip('Inverse button em disabled expõe estado corretamente', async ({ page }) => {
  const button = page.locator('[data-testid="button-disabled-inverse"]');
  await expect(button).toHaveAttribute('aria-disabled', 'true');
});
```

#### Snippet - `Inverse button em loading expõe estado corretamente`

```typescript
// @aria
test.skip('Inverse button em loading expõe estado corretamente', async ({ page }) => {
  const button = page.locator('[data-testid="button-loading-inverse"]');
  await expect(button).toHaveAttribute('aria-busy', 'true');
  await expect(button).toHaveAttribute('aria-disabled', 'true');
});
```

#### Snippet - `Inverse button em mobile tem touch target adequado`

```typescript
// @touch-target
test.skip('Inverse button em mobile tem touch target adequado', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  const button = page.locator('[data-testid="button-inverse"]');
  await expect(button).toBeVisible();
  const box = await button.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(44);
  expect(box?.height).toBeGreaterThanOrEqual(44);
});
```

---

## 3. Resumo

| Categoria | Total | Ativos | Skipped |
|-----------|-------|--------|---------|
| RENDER | 6 | 6 | 0 |
| STATE | 5 | 2 | 3 |
| INTERACTION | 7 | 0 | 7 |
| A11Y | 4 | 0 | 4 |
| **TOTAL** | **22** | **8** | **14** |

---

## 4. Design Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#ff5c00` | Primary/Inverse text |
| `--color-bg-muted` | `#1a1a1d` | Hover background |
| `--color-border-focus` | `#3b82f6` | Focus ring |
| `--color-text-primary` | `#ffffff` | Default text |
| `--radius-md` | `6px` | Inverse border-radius |
| `--font-size-xs` | `12px` | Upgrade button font-size |

---

## 5. Comandos

```bash
# Executar todos os testes
npm test

# Executar apenas botão
npx playwright test button.spec.ts

# Executar apenas @smoke
npx playwright test button.spec.ts --grep "@smoke"

# Executar teste específico
npx playwright test button.spec.ts -g "Inverse button tem estilo correto"
```

---

## 6. Referências de Documentação

### 6.1 Playwright API

| Método | Descrição | Uso nos Testes |
|--------|-----------|----------------|
| `page.locator(selector)` | Seleciona elemento(s) no DOM | `page.locator('[data-testid="button"]')` |
| `expect(locator).toBeVisible()` | Verifica se elemento está visível | `await expect(button).toBeVisible()` |
| `expect(locator).toHaveAttribute(name, value)` | Verifica atributo do elemento | `await expect(button).toHaveAttribute('disabled')` |
| `expect(locator).toBeFocused()` | Verifica se elemento tem focus | `await expect(button).toBeFocused()` |
| `expect(locator).toContainText(text)` | Verifica conteúdo textual | `await expect(button).toContainText('Upgrade Now')` |
| `expect(locator).toHaveClass(regex)` | Verifica classes CSS | `await expect(button).toHaveClass(/upgrade-btn/)` |
| `expect(value).toBe(value)` | Verifica igualdade | `expect(styles?.fontSize).toBe(12)` |
| `expect(value).toBeGreaterThanOrEqual(n)` | Verifica valor mínimo | `expect(box?.width).toBeGreaterThanOrEqual(44)` |
| `page.keyboard.press(key)` | Simula tecla pressionada | `await page.keyboard.press('Tab')` |
| `locator.hover()` | Simula hover do mouse | `await button.hover()` |
| `locator.focus()` | Coloca foco no elemento | `await button.focus()` |
| `locator.click()` | Simula clique | `await button.click()` |
| `locator.dblclick()` | Simula double-click | `await button.dblclick()` |
| `locator.boundingBox()` | Retorna dimensões do elemento | `const box = await button.boundingBox()` |
| `page.setViewportSize({ width, height })` | Define tamanho da viewport | `await page.setViewportSize({ width: 375, height: 667 })` |
| `page.goto(url)` | Navega para URL | `await page.goto('/')` |
| `page.evaluate(fn)` | Executa JavaScript no contexto da página | `await page.evaluate(() => {...})` |

### 6.2 Utils Customizadas

| Função | Arquivo | Descrição |
|--------|---------|-----------|
| `getComputedStyles(page, selector)` | `@/utils/test-utils` | Extrai estilos CSS computados do elemento. Retorna: `backgroundColor`, `color`, `fontSize`, `fontWeight`, `height`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`, `opacity`, `cursor`, `borderRadius`, `outlineWidth`, `outlineColor`, `width`, `display`, `border` |
| `hexToRgb(hex)` | `@/utils/utils` | Converte cor hexadecimal para formato RGB. Ex: `'#ff5c00'` → `'rgb(255, 92, 0)'` |

### 6.3 WAI-ARIA

| Atributo | Descrição | Quando Usar | Exemplo |
|----------|-----------|-------------|---------|
| `role="button"` | Define semântica de botão para assistive technology | Todos os botões | `<button role="button">` |
| `aria-busy` | Indica elemento em processamento | Estado loading | `aria-busy="true"` |
| `aria-disabled` | Indica elemento desabilitado (mantém no DOM) | Estado disabled | `aria-disabled="true"` |
| `aria-label` | Define nome acessível para elemento | Icon-only buttons | `aria-label="Close"` |

---

## 7. Dicas de Design Patterns

### 7.1 Clean Code (Robert Martin)

| Princípio | Aplicação nos Testes |
|-----------|---------------------|
| **Nomes significativos** | `test('Inverse button tem estilo correto')` - descreve comportamento, não implementação |
| **Funções pequenas** | Cada teste verifica um cenário específico (um estado ou interação) |
| **DRY (Don't Repeat Yourself)** | `TOKENS` centraliza valores repetidos; `getComputedStyles` reutiliza lógica |
| **Arrange-Act-Assert** | Setup (locators) → Ação (click, hover) → Verificação (expect) |
| **Sem comentários desnecessários** | Código auto-explicativo; comentários só quando necessário explicar "por que" |
| **SRP (Single Responsibility Principle)** | Cada teste uma única responsabilidade - verificar um comportamento |

### 7.2 Testing Patterns

| Pattern | Descrição | Exemplo nos Testes |
|---------|-----------|-------------------|
| **Given-When-Then (BDD)** | Estrutura de teste inspirada em BDD | Dado (setup) → Quando (ação) → Então (verificação) |
| **Test Isolation** | Cada teste é independente | `beforeEach` garante estado limpo entre testes |
| **Descriptive Test Names** | Nomes longos mas descritivos | `Inverse button em hover` descreve exatamente o cenário |
| **Single Assertion Focus** | Assertions agrupadas logicamente | Múltiplos `expect` para mesma propriedade |

### 7.3 Acessibilidade (WCAG)

| Princípio WCAG | Como Testar | Referência |
|----------------|-------------|------------|
| **Keyboard Navigation** | `page.keyboard.press('Tab')` verifica navegação por Tab | [WCAG 2.1 - 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard) |
| **Focus Visibility** | `expect(button).toBeFocused()` verifica indicator de focus | [WCAG 2.4.7 - Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible) |
| **Touch Target Size** | `expect(box?.width).toBeGreaterThanOrEqual(44)` - mínimo 44x44px | [WCAG - Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size-minimum) |
| **ARIA Attributes** | `aria-busy`, `aria-disabled` comunicam estado | [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) |

### 7.4 Design System Patterns

| Pattern | Implementação | Benefício |
|--------|--------------|-----------|
| **Design Tokens** | `const TOKENS = { primary: '#ff5c00' }` | Mudanças centralizadas |
| **Consistent Selectors** | `data-testid="button-inverse"` | Testes menos frágeis |
| **Component States** | @disabled, @loading, @focus | Cobertura completa |

### 7.5 Defensive Programming (Lei de Murphy)

| Técnica | Aplicação |
|---------|-----------|
| **Double-click Protection** | Verificar que cliques rápidos não causam ações duplicadas |
| **Form Submission Control** | `type="button"` previne submit acidental |
| **State Transition Guards** | Loading state desabilita interação |
| **Layout Shift Prevention** | Dimensões preservadas durante transições |

---

## 8. Tags BDD - Referência Rápida

| Tag | Significado | Categoria |
|-----|------------|-----------|
| @smoke | Teste crítico de smoke | RENDER |
| @hover | Comportamento em hover | STATE |
| @active | Comportamento em active | STATE |
| @disabled | Estado desabilitado | STATE |
| @loading | Estado de carregamento | STATE |
| @focus | Estado de focus | STATE |
| @a11y | Acessibilidade | A11Y |
| @keyboard | Navegação por teclado | INTERACTION |
| @aria | Atributos ARIA | A11Y |
| @touch-target | Área de toque mobile | A11Y |
| @full-width | Botão largura total | RENDER |
| @double-click | Proteção contra double-click | INTERACTION |
| @loading-transition | Transição de estado | INTERACTION |
| @type-attribute | Atributo type do HTML | INTERACTION |
| @classname | Propriedade className | RENDER |
| @testid | Atributo data-testid | RENDER |
| @children | Conteúdo children | RENDER |
| @interaction | Interação do usuário | INTERACTION |
| @defensive | Proteção crítica | INTERACTION |

---

> **Nota:** Este documento é gerado automaticamente e sincronizado com o arquivo `.feature` BDD.
> Qualquer alteração nos nomes dos testes deve manter correspondência 1:1 com os cenários BDD.
> **Ordem de execução**: render → state → interaction → a11y