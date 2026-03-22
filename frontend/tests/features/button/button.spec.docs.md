# Button: Documentação de Implementação dos Testes

> Generated from: `specs/features/button/plan.md`
> TDD Strategy: Red-Green-Refactor with incremental test activation
> Complexity: medium

---

## 1. Metodologia

### 1.1 TDD Cycle (Red-Green-Refactor)

1. **Red**: Escreva teste que falha - primeiro teste já está ativo (RF-01)
2. **Green**: Código mínimo para passar - implementar CSS + componente
3. **Refactor**: Melhore código mantendo testes - remover duplicações

### 1.2 Testing Best Practices

- **AAA**: Arrange-Act-Assert
  ```typescript
  test('deve renderizar botão primary', async ({ page }) => {
    // Arrange: preparar HTML com botão primary
    await setupTestPage(page, createButtonHTML({ variant: 'primary' }));
    
    // Act: selecionar elemento
    const button = page.locator('[data-testid="button"]');
    
    // Assert: verificar visibilidade
    await expect(button).toBeVisible();
  });
  ```

- **F.I.R.S.T.**: Fast, Independent, Repeatable, Self-Validating, Timely
  - Testes são rápidos (sem requests de rede)
  - Independentes (cada teste cria seu próprio HTML)
  - Repetíveis (mesmo resultado sempre)
  - Auto-validadores (assertions claras)
  - Oportunos (criados antes da implementação)

### 1.3 Estratégia de Testes

| Fase | Status | Objetivo |
|------|--------|----------|
| RF-01 (Red) | ✅ ATIVO | Validar renderização básica |
| RF-02 a RF-16 | ⏭️ SKIP | Gradualmente ativar conforme implementação |

**Referências:**
- [TDD Guide - MDN](https://developer.mozilla.org/en-US/docs/learn/TDD)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

---

## 2. Clean Code - Robert C. Martin

### 2.1 Significado dos Nomes

```typescript
// Tipos descritivos
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right' | 'icon-only';

// Interface com props bem nomeadas
interface ButtonProps {
  variant?: ButtonVariant;      // Variante visual
  size?: ButtonSize;            // Tamanho
  iconPosition?: IconPosition;  // Posição do ícone
  loading?: boolean;            // Estado de carregamento
  disabled?: boolean;           // Estado desabilitado
  fullWidth?: boolean;          // Ocupa 100% largura
  children: ReactNode;          // Conteúdo (obrigatório)
  onClick?: () => void;        // Callback de clique
  type?: 'button' | 'submit' | 'reset';
}
```

### 2.2 Funções com Responsabilidade Única

```typescript
// Cada função faz uma coisa
function createButtonHTML(options) { /* cria HTML */ }
async function getComputedStyles(page, selector) { /* obtém estilos */ }
function hexToRgb(hex: string): string { /* converte cor */ }
async function setupTestPage(page, buttonHTML) { /* configura página */ }
```

### 2.3 SOLID Principles

| Princípio | Button | Exemplo |
|-----------|--------|---------|
| **S**ingle Responsibility | Cada função uma coisa | `getComputedStyles()` só obtém estilos |
| **O**pen/Closed | Aberto para extensão | Adicionar novo variant sem modificar código |
| **L**iskov Substitution | Todos variants intercambiáveis | Qualquer variant funciona como Button |
| **I**nterface Segregation | Props mínimas necessárias | Só props relevantes para botão |
| **D**ependency Inversion | Depende de abstrações | Usa tokens, não valores hardcoded |

**Referências:**
- [Clean Code Book - Robert C. Martin](https://www.amazon.com/dp/0132350882)
- [SOLID Principles](https://digitaldefynd.org/solid-design-principles/)

---

## 3. Design Patterns

### 3.1 Composable Props

```typescript
// Props são composáveis para diferentes casos de uso
<Button variant="primary" size="md" icon={<Plus />} />
<Button variant="secondary" size="sm" loading={isSubmitting} />
<Button variant="destructive" fullWidth onClick={handleDelete} />
```

### 3.2 Estado Declarativo

```typescript
// Estados são declarados via props
const Button = ({ loading, disabled, ...props }) => (
  <button 
    disabled={disabled || loading}
    aria-busy={loading}
    aria-disabled={loading}
    {...props}
  />
);
```

### 3.3 CSS com Tokens

```css
/* Usa tokens, não valores hardcoded */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-primary);
}
```

**Referências:**
- [Radix UI Button](https://radix-ui.com/primitives/docs/components/button)
- [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

---

## 4. Alternative Implementations

### Alternative A: Compound Components

```tsx
<Button>
  <Button.Icon><Plus /></Button.Icon>
  <Button.Text>Save</Button.Text>
</Button>
```

**Pros:** API declarativa,拆分开/compact toggle
**Cons:** Overhead de Context, mais arquivos
**Quando usar:** Máxima flexibilidade, temas complexos

### Alternative B: CSS-in-JS (IMPLEMENTAÇÃO ATUAL)

```tsx
<button className={getButtonClasses(variant, size, state)}>
  {children}
</button>
```

**Pros:** Simplicidade, performance, tokens CSS
**Cons:** Menos type-safe que styled-components
**Quando usar:** Projetos com CSS Modules/Tailwind

### Alternative C: Polymorphic (asChild)

```tsx
import { Slot } from '@radix-ui/react-slot';

<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>
```

**Pros:**Flexibilidade máxima
**Cons:** Overhead de Radix, complexidade
**Quando usar:** Link + Button intercambiáveis

---

## 5. RF-01: Variant Primary

### Código para Passar

**CSS (`button.module.css`):**

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-primary);
}

.btn-primary:hover {
  background: var(--color-primary-hover);
}

.btn-primary:active {
  background: #e54d00;
}

.btn:focus {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

**React (`Button.tsx`):**

```tsx
import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  'data-testid'?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children,
  ...props 
}: ButtonProps) {
  const className = `${styles.btn} ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]}`;
  
  return (
    <button className={className} data-testid="button">
      {children}
    </button>
  );
}
```

**Referências:**
- [toBeVisible](https://playwright.dev/docs/test-assertions#expect-locator-to-be-visible)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

## 6. RF-02: Variant Secondary

### Código para Passar

```css
.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-bg-muted);
}

.btn-secondary:active {
  background: #151517;
}
```

---

## 7. RF-03: Variant Ghost

### Código para Passar

```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
}

.btn-ghost:hover {
  background: var(--color-bg-muted);
}
```

---

## 8. RF-04: Variant Destructive

### Código para Passar

```css
.btn-destructive {
  background: var(--color-error);
  color: var(--color-text-primary);
}

.btn-destructive:hover {
  background: #dc2626;
}

.btn-destructive:active {
  background: #b91c1c;
}
```

---

## 9. RF-05: Variant Inverse

### Código para Passar

```css
.btn-inverse {
  background: #ffffff;
  color: var(--color-primary);
  border-radius: var(--radius-md);
}

.btn-inverse:hover {
  background: var(--color-bg-muted);
}

/* Para upgrade button: */
.btn-inverse.btn-sm {
  font-size: var(--font-size-xs);
  font-weight: 600;
}
```

---

## 10. RF-06: Size sm

### Código para Passar

```css
.btn-sm {
  height: 32px;
  padding: 6px 12px;
  font-size: var(--font-size-xs);
  border-radius: var(--radius-md);
}
```

---

## 11. RF-07: Size md (DEFAULT)

### Código para Passar

```css
.btn-md {
  height: 40px;
  padding: 10px 16px;
  font-size: var(--font-size-sm);
  border-radius: var(--radius-lg);
}
```

---

## 12. RF-08: Size lg

### Código para Passar

```css
.btn-lg {
  height: 48px;
  padding: 12px 20px;
  font-size: var(--font-size-base);
  border-radius: var(--radius-lg);
}
```

---

## 13. RF-09: Icon Left

### Código para Passar

```css
.btn-icon {
  flex-shrink: 0;
}

.btn-icon-left {
  margin-right: 8px;
}

.btn-text {
  white-space: nowrap;
}
```

```tsx
<button className={className}>
  {icon && iconPosition === 'left' && (
    <span className={`${styles['btn-icon']} ${styles['btn-icon-left']}`}>
      {icon}
    </span>
  )}
  <span className={styles['btn-text']}>{children}</span>
</button>
```

---

## 14. RF-10: Icon Right

### Código para Passar

```css
.btn-icon-right {
  margin-left: 8px;
}
```

---

## 15. RF-11: Icon Only

### Código para Passar

```css
.btn-icon-only {
  padding: 10px;
  min-width: 44px;
  min-height: 44px;
}
```

```tsx
<button 
  className={className}
  aria-label={ariaLabel}
>
  {icon}
</button>
```

**Referências:**
- [WCAG 2.1 Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size-minimum.html)

---

## 16. RF-12: Loading State

### Código para Passar

```css
.btn-loading {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

```tsx
<button 
  disabled={loading || disabled}
  aria-busy={loading}
  aria-disabled={loading}
>
  {loading && <span className={styles['btn-spinner']} />}
  {children}
</button>
```

**Referências:**
- [aria-busy](https://www.w3.org/TR/wai-aria-1.2/#aria-busy)
- [aria-disabled](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)

---

## 17. RF-13: Disabled State

### Código para Passar

```css
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

```tsx
<button disabled={disabled} aria-disabled={disabled}>
  {children}
</button>
```

---

## 18. RF-14: Focus Ring

### Código para Passar

```css
.btn:focus {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.btn:focus:not(:focus-visible) {
  outline: none;
}

.btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

**Referências:**
- [:focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)

---

## 19. RF-15: Full Width

### Código para Passar

```css
.btn-full-width {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}
```

---

## 20. RF-16: Accessibility

### Código para Passar

```tsx
<button
  type={type}
  disabled={disabled}
  aria-disabled={loading || disabled}
  aria-busy={loading}
  aria-label={ariaLabel}
  onClick={disabled || loading ? undefined : onClick}
>
  {children}
</button>
```

### Checklist Acessibilidade

| Critério | Implementação |
|----------|---------------|
| ✅ role="button" | `<button>` nativo já tem |
| ✅ Keyboard navigation | Tab + Enter/Space |
| ✅ Focus indicator | outline 2px visible |
| ✅ aria-busy | Para loading |
| ✅ aria-disabled | Para disabled/loading |
| ✅ aria-label | Para icon-only |
| ✅ Touch target | min 44x44px |
| ✅ Color contrast | >= 4.5:1 |

**Referências:**
- [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 21. Design Tokens

### Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#ff5c00` | Primary background/text |
| `--color-primary-hover` | `#ff7a33` | Primary hover |
| `--color-error` | `#ef4444` | Destructive background |
| `--color-border` | `#2a2a2e` | Secondary border |
| `--color-bg-muted` | `#1a1a1d` | Hover background |
| `--color-text-primary` | `#ffffff` | Default text |
| `--color-border-focus` | `#ff5c00` | Focus ring |

### Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `--spacing-6` | `6px` | sm vertical padding |
| `--spacing-8` | `8px` | md gap, padding |
| `--spacing-10` | `10px` | lg vertical padding |
| `--spacing-12` | `12px` | sm horizontal padding |
| `--spacing-16` | `16px` | md horizontal padding |
| `--spacing-20` | `20px` | lg horizontal padding |

### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-md` | `6px` | sm buttons |
| `--radius-lg` | `8px` | md/lg buttons |

### Tipografia

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-size-xs` | `12px` | sm buttons |
| `--font-size-sm` | `13px` | md buttons |
| `--font-size-base` | `14px` | lg buttons |

---

## 22. Referências Completas

### Playwright

| Recurso | Link |
|---------|------|
| Docs | https://playwright.dev/docs/intro |
| toBeVisible | https://playwright.dev/docs/test-assertions#expect-locator-to-be-visible |
| toHaveAttribute | https://playwright.dev/docs/test-assertions#expect-locator-to-have-attribute |
| toHaveClass | https://playwright.dev/docs/test-assertions#expect-locator-to-have-class |
| toContainText | https://playwright.dev/docs/test-assertions#expect-locator-to-contain-text |
| focus | https://playwright.dev/docs/api/class-locator#locator-focus |
| hover | https://playwright.dev/docs/api/class-locator#locator-hover |
| boundingBox | https://playwright.dev/docs/api/class-locator#locator-bounding-box |
| setContent | https://playwright.dev/docs/api/class-page#page-set-content |

### React

| Recurso | Link |
|---------|------|
| Docs | https://react.dev/ |
| Components | https://react.dev/learn/your-first-component |
| Props | https://react.dev/learn/passing-props-to-a-component |
| TypeScript | https://react.dev/learn/typescript |

### CSS

| Recurso | Link |
|---------|------|
| Custom Properties | https://developer.mozilla.org/en-US/docs/Web/CSS/--* |
| :focus-visible | https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible |
| CSS Modules | https://github.com/css-modules/css-modules |

### Acessibilidade

| Recurso | Link |
|---------|------|
| WAI-ARIA Button | https://www.w3.org/WAI/ARIA/apg/patterns/button/ |
| WCAG Contrast | https://webaim.org/resources/contrastchecker/ |
| Touch Targets | https://www.w3.org/WAI/WCAG21/Understanding/target-size-minimum.html |

---

## 23. Estrutura de Arquivos

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens CSS
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── test-button/
│   │       └── page.tsx         # Página de testes E2E
│   └── components/
│       └── button/
│           ├── Button.tsx        # Componente principal
│           ├── button.module.css # Estilos CSS Modules
│           └── index.ts          # Barrel export
└── tests/
    └── features/
        └── button/
            ├── button.spec.ts   # Testes Playwright (ESTE ARQUIVO)
            └── button.spec.docs.md # Documentação (ESTE ARQUIVO)
```

---

## 24. Roadmap de Implementação

### Fase 1: Foundation (RF-01, RF-07, RF-13)
- [ ] Criar `Button.tsx` com variant="primary" e size="md" default
- [ ] Criar `button.module.css` com classes base
- [ ] Implementar estado disabled
- [ ] ✅ Teste RF-01 já ativo

### Fase 2: Variants (RF-02 a RF-05)
- [ ] Implementar secondary
- [ ] Implementar ghost
- [ ] Implementar destructive
- [ ] Implementar inverse

### Fase 3: Sizes (RF-06, RF-08)
- [ ] Implementar sm
- [ ] Implementar lg

### Fase 4: Icons (RF-09 a RF-11)
- [ ] Implementar ícone left
- [ ] Implementar ícone right
- [ ] Implementar icon-only com aria-label

### Fase 5: States (RF-12, RF-14)
- [ ] Implementar loading state
- [ ] Implementar focus ring

### Fase 6: Polish (RF-15, RF-16)
- [ ] Implementar fullWidth
- [ ] Verificar acessibilidade completa

---

## 25. Comandos Úteis

```bash
# Executar todos os testes
npm test

# Executar com UI
npm run test:ui

# Executar apenas botão
npx playwright test button.spec.ts

# Executar apenas primeiro teste
npx playwright test button.spec.ts --grep "RF-01"

# Ativar próximo teste (remover .skip)
npx playwright test button.spec.ts --grep "RF-02" --grep-invert "skip"
```
