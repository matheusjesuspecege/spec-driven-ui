# Button: Documentação de Implementação dos Testes

> Generated from: specs/features/button/plan.md
> TDD Strategy: Red-Green-Refactor with incremental test activation
> Complexity: medium (16 RFs)

---

## 1. Metodologia

### 1.1 TDD Cycle (Red-Green-Refactor)

1. **Red**: Escreva teste que falha para RF-01
2. **Green**: Implemente código mínimo para passar
3. **Refactor**: Melhore código mantendo testes passando
4. **Avance**: Ative próximo teste e repita

### 1.2 Testing Best Practices

- **AAA Pattern**: Arrange-Act-Assert
- **F.I.R.S.T. Principles**:
  - **F**ast: Testes executam rapidamente
  - **I**ndependent: Cada teste é isolado
  - **R**epeatable: Resultados consistentes
  - **S**elf-Validating: Passa ou falha automaticamente
  - **T**imely: Escritos antes do código

### 1.3 Test Organization

```typescript
test.describe('Feature: Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
  });
  
  // RF-01: Primeiro teste ATIVO
  test('RF-01 - deve renderizar botão primary visível', async ({ page }) => {
    // ...
  });
  
  // RF-02 a RF-16: SKIPPED
  test.skip('RF-02 - ...', async ({ page }) => {
    // ...
  });
});
```

**Referências:**
- [TDD Guide - MDN](https://developer.mozilla.org/en-US/docs/learn/TDD)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)

---

## 2. Clean Code - Robert C. Martin

### 2.1 Significado dos Nomes

```typescript
// Types para type safety
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right' | 'icon-only';

// Props interface com valores default explícitos
interface ButtonProps {
  variant?: ButtonVariant;      // default: 'primary'
  size?: ButtonSize;           // default: 'md'
  iconPosition?: IconPosition;  // default: 'left'
  loading?: boolean;            // default: false
  disabled?: boolean;           // default: false
  fullWidth?: boolean;           // default: false
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}
```

### 2.2 Funções Limpo

```typescript
// Helper com responsabilidade única: criar HTML do botão
function createButtonHTML(overrides: ButtonProps = {}): string {
  const { variant = 'primary', size = 'md', ... } = overrides;
  const classes = ['btn', `btn-${variant}`, `btn-${size}`].filter(Boolean).join(' ');
  return `<button class="${classes}">...</button>`;
}

// Helper para extrair computed styles
async function getComputedStyles(page: Page, selector: string): Promise<CSSStyleDeclaration> {
  return page.evaluate((sel) => window.getComputedStyle(document.querySelector(sel)!), selector);
}

// Helper para comparar cores com tolerância
function colorsMatch(color1: string, color2: string, tolerance = 5): boolean {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1 === color2;
  return Math.abs(rgb1.r - rgb2.r) <= tolerance && ...;
}
```

### 2.3 SOLID Principles

| Princípio | Button Implementation | Exemplo |
|-----------|----------------------|---------|
| **S**ingle Responsibility | Cada função faz uma coisa | `createButtonHTML()` só cria HTML |
| **O**pen/Closed | Aberto para extensão | Adicionar novo variant sem modificar código |
| **L**iskov Substitution | Subtipos substituíveis | Button pode usar qualquer variant |
| **I**nterface Segregation | Props específicas | `iconPosition` separado de `variant` |
| **D**ependency Inversion | Depende de abstrações | Usa tokens CSS, não valores hardcoded |

**Referências:**
- [Clean Code Book - Robert C. Martin](https://www.amazon.com/dp/0132350882)
- [SOLID Principles](https://digitaldefynd.org/solid-design-principles/)

---

## 3. Design Patterns

### 3.1 Compound Components Pattern

```tsx
// Alternativa A: Compound Components
<Button variant="primary">
  <Button.Icon><PlusIcon /></Button.Icon>
  <Button.Text>New Report</Button.Text>
</Button>
```

### 3.2 Polymorphic Component (asChild)

```tsx
// Alternativa B: Polymorphic via Radix Slot
import { Slot } from '@radix-ui/react-slot';

function Button({ asChild, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props}>{children}</Comp>;
}

// Uso: Link que parece botão
<Button asChild>
  <Link to="/dashboard">Go to Dashboard</Link>
</Button>
```

### 3.3 Controlled vs Uncontrolled

```tsx
// Controlled: estado gerenciado externamente
<Button loading={isSubmitting} onClick={handleSubmit}>
  Submit
</Button>

// Uncontrolled: estado interno
<Button onClick={handleClick}>Click me</Button>
```

### 3.4 Presenter Pattern

```tsx
// Helper para testes: cria HTML isolado
function createButtonHTML(props: ButtonProps): string {
  const classes = getButtonClasses(props);
  return `<button class="${classes}" data-testid="button">${props.children}</button>`;
}
```

**Referências:**
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Compound Components - Kent C. Dodds](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Polymorphic Components](https://blog.logrocket.com/build-polymorphic-components-react-typescript/)

---

## 4. Alternative Implementations

### Alternative A: Compound Components com Context API

**Pros:**
- API declarativa e flexível
- Estado encapsulado no componente
- Fácil de estender

**Cons:**
- Overhead de React Context
- Mais arquivos para manter
- Curva de aprendizado maior

**Quando usar:** Máxima flexibilidade e API declarativa

```tsx
<Button variant="primary" size="md">
  <Button.Icon><Icon /></Button.Icon>
  <Button.Text>Text</Button.Text>
  <Button.Suffix><Badge>New</Badge></Button.Suffix>
</Button>
```

### Alternative B: CSS Modules + Props Diretas (IMPLEMENTAÇÃO ATUAL)

**Pros:**
- Simplicidade e performance
- CSS Modules previnem conflitos
- Testes E2E diretos

**Cons:**
- API menos flexível
- Props podem crescer com variantes

**Quando usar:** Projetos com requisitos estáveis

### Alternative C: Tailwind + Composable

**Pros:**
- Utilidades pré-definidas
- Não requer arquivos CSS
- Hot reload rápido

**Cons:**
- Classes longas no JSX
- Requer configuração de custom tokens
- Vendor lock-in com Tailwind

**Quando usar:** Times com experiência em Tailwind

---

## 5. RF-01: Variant Primary

### Código para Passar

**CSS (button.module.css):**
```css
.btn-primary {
  background: var(--color-primary);  /* #FF5C00 */
  color: var(--color-text-primary); /* #FFFFFF */
  border: none;
}

.btn-primary:hover {
  background: var(--color-primary-hover); /* #FF7A33 */
}

.btn-primary:active {
  background: color-mix(in srgb, var(--color-primary) 90%, black);
}
```

**TypeScript (Button.tsx):**
```tsx
import styles from './button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'inverse';
  children: ReactNode;
}

function Button({ variant = 'primary', children }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[`btn-${variant}`]}`} data-testid="button">
      {children}
    </button>
  );
}
```

**Referências:**
- [toBeVisible](https://playwright.dev/docs/test-assertions#expect-locator-to-be-visible)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

## 6. RF-02: Variant Secondary

### Código para Passar

**CSS:**
```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-border); /* #2A2A2E */
  color: var(--color-text-primary);
}

.btn-secondary:hover {
  background: var(--color-bg-muted); /* #1A1A1D */
}
```

**Referências:**
- [hover](https://playwright.dev/docs/api/class-locator#locator-hover)
- [toHaveClass](https://playwright.dev/docs/test-assertions#expect-locator-to-have-class)

---

## 7. RF-03: Variant Ghost

### Código para Passar

**CSS:**
```css
.btn-ghost {
  background: transparent;
  border: none;
  color: var(--color-text-primary);
}

.btn-ghost:hover {
  background: var(--color-bg-muted);
}
```

---

## 8. RF-04: Variant Destructive

### Código para Passar

**CSS:**
```css
.btn-destructive {
  background: var(--color-error); /* #EF4444 */
  color: var(--color-text-primary);
  border: none;
}

.btn-destructive:hover {
  background: color-mix(in srgb, var(--color-error) 90%, black);
}

.btn-destructive:active {
  background: color-mix(in srgb, var(--color-error) 85%, black);
}
```

---

## 9. RF-05: Variant Inverse

### Código para Passar

**CSS:**
```css
.btn-inverse {
  background: #FFFFFF;
  color: var(--color-primary); /* #FF5C00 */
  border: none;
}

.btn-inverse:hover {
  background: var(--color-bg-muted);
}
```

---

## 10. RF-06 a RF-08: Sizes (sm, md, lg)

### Código para Passar

**CSS:**
```css
.btn-sm {
  height: 32px;
  padding: 6px 12px;
  font-size: var(--text-xs);  /* 12px */
  gap: 6px;
  border-radius: var(--radius-md); /* 6px */
}

.btn-md {
  height: 40px;
  padding: 10px 16px;
  font-size: var(--text-sm);  /* 13px */
  gap: 8px;
  border-radius: var(--radius-lg); /* 8px */
}

.btn-lg {
  height: 48px;
  padding: 12px 20px;
  font-size: var(--text-base); /* 14px */
  gap: 10px;
  border-radius: var(--radius-lg); /* 8px */
}
```

**Referências:**
- [boundingBox](https://playwright.dev/docs/api/class-locator#locator-bounding-box)
- [toBeCloseTo](https://jestjs.io/docs/expect#tobeclosetonumber-numdigits)

---

## 11. RF-09 a RF-11: Icon Positions

### Código para Passar

**CSS:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
}

.btn-icon-left {
  margin-right: 8px; /* gap para md */
}

.btn-icon-right {
  margin-left: 8px;
}

.btn-icon-only {
  padding: 10px; /* padding simétrico */
  min-width: 44px;
  min-height: 44px;
}
```

**TypeScript:**
```tsx
function Button({ icon, iconPosition = 'left', children, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
      {iconPosition === 'icon-only' && icon}
    </button>
  );
}
```

**Referências:**
- [aria-label](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name)

---

## 12. RF-12: Loading State

### Código para Passar

**CSS:**
```css
.btn-loading {
  position: relative;
  pointer-events: none;
}

.btn-spinner {
  display: inline-flex;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**TypeScript:**
```tsx
function Button({ loading = false, disabled, children, ...props }: ButtonProps) {
  const isDisabled = disabled || loading;
  
  return (
    <button 
      {...props} 
      disabled={isDisabled}
      aria-disabled={loading}
      aria-busy={loading}
      className={`${styles.btn} ${loading ? styles['btn-loading'] : ''}`}
    >
      {loading && <span className={styles['btn-spinner']}><Spinner /></span>}
      {!loading && children}
    </button>
  );
}
```

**Referências:**
- [aria-busy](https://www.w3.org/WAI/WCAG21/Understanding/status-messages)
- [aria-disabled](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)

---

## 13. RF-13: Disabled State

### Código para Passar

**CSS:**
```css
.btn-disabled,
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

**TypeScript:**
```tsx
function Button({ disabled = false, children, ...props }: ButtonProps) {
  return (
    <button 
      {...props} 
      disabled={disabled}
      aria-disabled={disabled}
      className={`${styles.btn} ${disabled ? styles['btn-disabled'] : ''}`}
    >
      {children}
    </button>
  );
}
```

---

## 14. RF-14: Focus Ring

### Código para Passar

**CSS:**
```css
.btn:focus-visible {
  outline: 2px solid var(--color-border-focus); /* #3B82F6 */
  outline-offset: 2px;
}

/* Remove outline padrão do browser */
.btn:focus:not(:focus-visible) {
  outline: none;
}
```

**Referências:**
- [:focus-visible](https://css-tricks.com/almanac/selectors/f/focus-visible/)
- [WAI-ARIA focus](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible)

---

## 15. RF-15: Full Width

### Código para Passar

**CSS:**
```css
.btn-full-width {
  width: 100%;
}
```

**TypeScript:**
```tsx
function Button({ fullWidth = false, children, ...props }: ButtonProps) {
  return (
    <button 
      {...props} 
      className={`${styles.btn} ${fullWidth ? styles['btn-full-width'] : ''}`}
    >
      {children}
    </button>
  );
}
```

---

## 16. RF-16: Accessibility

### Código para Passar

**Acessibilidade implementada em todos os estados:**

| Atributo | Valor | Condição |
|----------|-------|----------|
| `disabled` | `true` | `disabled={true}` |
| `aria-disabled` | `"true"` | `loading={true}` |
| `aria-busy` | `"true"` | `loading={true}` |
| `aria-label` | `string` | `iconPosition="icon-only"` |
| `role` | `"button"` | Sempre (default HTML) |

**Touch targets:**
```css
/* Garante mínimo 44x44px para touch */
.btn-icon-only {
  min-width: 44px;
  min-height: 44px;
  padding: 10px;
}

.btn-sm,
.btn-md,
.btn-lg {
  min-height: 44px; /* Touch target mínimo */
}
```

**Referências:**
- [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size-minimum)
- [Keyboard Navigation](https://webaim.org/techniques/keyboard/)

---

## 17. Defensive Tests (Murphy's Law)

### Double-Click Protection

```tsx
// Implementação com debounce
function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) return; // Ignora se já há clique pendente
      callback(...args);
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = undefined;
      }, delay);
    },
    [callback, delay]
  ) as T;
}
```

### Type Attribute

```tsx
function Button({ type = 'button', children, ...props }: ButtonProps) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
```

**Referências:**
- [Form Submission](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction)
- [Debounce Pattern](https://underscorejs.org/#debounce)

---

## 18. Referências Completas

### Playwright

| Recurso | Link |
|---------|------|
| Docs | https://playwright.dev/docs/intro |
| toBeVisible | https://playwright.dev/docs/test-assertions#expect-locator-to-be-visible |
| toHaveAttribute | https://playwright.dev/docs/test-assertions#expect-locator-to-have-attribute |
| toHaveClass | https://playwright.dev/docs/test-assertions#expect-locator-to-have-class |
| hover | https://playwright.dev/docs/api/class-locator#locator-hover |
| click | https://playwright.dev/docs/api/class-locator#locator-click |
| focus | https://playwright.dev/docs/api/class-locator#locator-focus |
| boundingBox | https://playwright.dev/docs/api/class-locator#locator-bounding-box |
| setContent | https://playwright.dev/docs/api/class-page#page-set-content |
| keyboard.press | https://playwright.dev/docs/api/class-keyboard |

### React

| Recurso | Link |
|---------|------|
| Docs | https://react.dev/ |
| Components | https://react.dev/learn/your-first-component |
| Props | https://react.dev/learn/passing-props-to-a-component |
| useState | https://react.dev/reference/react/useState |
| useCallback | https://react.dev/reference/react/useCallback |

### TypeScript

| Recurso | Link |
|---------|------|
| Handbook | https://www.typescriptlang.org/docs/ |
| Generic Types | https://www.typescriptlang.org/docs/handbook/2/generics.html |
| Utility Types | https://www.typescriptlang.org/docs/handbook/utility-types.html |

### CSS

| Recurso | Link |
|---------|------|
| CSS Modules | https://github.com/css-modules/css-modules |
| Custom Properties | https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties |
| color-mix | https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix |

### Accessibility

| Recurso | Link |
|---------|------|
| WAI-ARIA Button | https://www.w3.org/WAI/ARIA/apg/patterns/button/ |
| Focus Visible | https://www.w3.org/WAI/WCAG21/Understanding/focus-visible |
| Touch Targets | https://www.w3.org/WAI/WCAG21/Understanding/target-size-minimum |

### Design System

| Recurso | Link |
|---------|------|
| Radix UI | https://www.radix-ui.com/primitives/docs/components/button |
| Slot | https://www.radix-ui.com/primitives/docs/utilities/slot |
| Lucide Icons | https://lucide.dev/ |

---

## 19. Estrutura de Arquivos

```
frontend/
├── src/
│   ├── components/
│   │   └── button/
│   │       ├── Button.tsx              # Componente principal
│   │       ├── Button.module.css       # Estilos CSS Modules
│   │       └── index.ts                # Barrel export
│   ├── app/
│   │   └── test-button/
│   │       └── page.tsx                # Página de testes
│   └── styles/
│       └── globals.css                 # Design tokens
└── tests/
    └── features/
        └── button/
            ├── button.spec.ts          # Testes E2E Playwright
            └── button.spec.docs.md     # Esta documentação
```

---

## 20. Checklist de Testes

### RF Coverage

| RF | Descrição | Teste |
|----|-----------|-------|
| RF-01 | variant="primary" | ✅ ACTIVE |
| RF-02 | variant="secondary" | ⏳ SKIPPED |
| RF-03 | variant="ghost" | ⏳ SKIPPED |
| RF-04 | variant="destructive" | ⏳ SKIPPED |
| RF-05 | variant="inverse" | ⏳ SKIPPED |
| RF-06 | size="sm" | ⏳ SKIPPED |
| RF-07 | size="md" (default) | ⏳ SKIPPED |
| RF-08 | size="lg" | ⏳ SKIPPED |
| RF-09 | iconPosition="left" | ⏳ SKIPPED |
| RF-10 | iconPosition="right" | ⏳ SKIPPED |
| RF-11 | iconPosition="icon-only" | ⏳ SKIPPED |
| RF-12 | loading state | ⏳ SKIPPED |
| RF-13 | disabled state | ⏳ SKIPPED |
| RF-14 | focus ring | ⏳ SKIPPED |
| RF-15 | fullWidth | ⏳ SKIPPED |
| RF-16 | accessibility | ⏳ SKIPPED |

### Total: 16 RFs | 1 ACTIVE | 30+ Test Cases
