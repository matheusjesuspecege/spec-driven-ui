# Progress: Button (Inverse Variant)

## Component

### [2026-03-22] Disabled State Pattern
- Usar `props.disabled` via spread operator para aplicar classes condicionais
- Classes Tailwind para disabled: `opacity-50 cursor-not-allowed`
- Template literal: `${condition ? "classes" : ""}` para classes condicionais

### [2026-03-22] Disabled Accessibility
- `disabled` attribute nativo do HTML é passado via `{...props}`
- Não precisa explicitamente `disabled={disabled}` - spread operator já cuida disso

### [2026-03-22] Testing Disabled Button
- Para testar clique em botão disabled, usar `click({ force: true })`
- Isso força o clique mesmo em elementos desabilitados pelo HTML

### [2026-03-22] Loading State Pattern
- Prop `loading?: boolean` deve ser explicitamente declarada na interface
- Classes Tailwind para loading: `cursor-not-allowed`
- Spinner como children: `{loading ? <span className="btn-spinner">...</span> : children}`
- Atributos ARIA: `aria-busy={loading}` e `aria-disabled={loading}`

### [2026-03-22] Loading Click Behavior
- Usar `click({ force: true })` no teste para forçar clique

### [2026-03-22] Focus Ring Pattern
- Classes Tailwind para focus ring: `focus:outline-2 focus:outline-offset-2 focus:outline-[#3b82f6]`
- Usar cor literal `[#3b82f6]` em vez de CSS variable para compatibilidade

### [2026-03-22] Keyboard Navigation
- Elemento `<button>` nativo já suporta navegação por teclado
- Teste usa `page.keyboard.press("Tab")` + `toBeFocused()` para verificar focus

### [2026-03-22] Accessibility - Role Attribute
- Adicionar `role="button"` explicitamente para leitores de tela
- Teste usa `toHaveAttribute("role", "button")` para verificar

### [2026-03-22] Mobile Touch Target
- Height do botão: `h-11` (44px) para atingir touch target mínimo de 44px
- Teste usa `setViewportSize({ width: 375, height: 667 })` para mobile
- Verifica `boundingBox().width/height >= 44`

### [2026-03-22] Double-Click Prevention
- Teste usa `page.evaluate()` para adicionar event listener e contar cliques
- Usa `dblclick()` e `click({ clickCount: 2 })` para simular double-click
- Verifica `clickCount <= 1`

### [2026-03-22] Loading Click Test
- Para testar loading state via clique, usar `useState` no componente de teste
- Criar `ButtonWithLoading` component com `onClick={() => setLoading(true)}`
- Usar `data-testid` específico para botão interativo

### [2026-03-22] Form Submission Prevention
- Criar Form component com `useState` para testar submissão
- Verificar que `type="button"` não submete formulário
- Usar `toHaveAttribute("type", "button")` para verificar
- Usar `form.locator("button")` para localizar botão dentro do form

### [2026-03-22] Custom className Support
- Extrair `className` da desestruturação antes de `...props`
- Mesclar classes: `${baseClasses} ${customClassName || ""}`
- Ordem importa: classes base primeiro, custom por último

### [2026-03-22] Data-Testid Attribute
- `data-testid` é propagado via `{...props}`
- Teste verifica `toHaveAttribute("data-testid", "button-inverse")`
