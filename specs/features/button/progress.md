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
- O `aria-disabled={loading}` impede resposta a cliques
- Mesmo padrão do disabled: usar `click({ force: true })` no teste para forçar clique

### [2026-03-22] Focus Ring Pattern
- Classes Tailwind para focus ring: `focus:outline-2 focus:outline-offset-2 focus:outline-[#3b82f6]`
- Usar cor literal `[#3b82f6]` em vez de CSS variable para compatibilidade
