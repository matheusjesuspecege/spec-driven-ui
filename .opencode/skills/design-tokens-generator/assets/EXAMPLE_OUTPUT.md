# Exemplo de Output

## Input: design-tokens.feature

```gherkin
# language: pt
@pending @design-tokens
Funcionalidade: Design Tokens Globais
  **referencia:** Tokens transversais do design system

  @pending @smoke @colors
  Cenário: Cores primárias definidas corretamente
    Dado que o CSS está configurado
    Entao --color-bg-primary deve ser #0A0A0B
    E --color-bg-secondary deve ser #141417
    E --color-accent deve ser #FF5C00

  @pending @smoke @colors
  Cenário: Cores semânticas definidas corretamente
    Dado que o CSS está configurado
    Entao --color-success deve ser #10B981
    E --color-error deve ser #EF4444
    E --color-warning deve ser #F59E0B

  @pending @smoke @typography
  Cenário: Tipografia configurada corretamente
    Dado que o CSS está configurado
    Entao --font-sans deve ser 'Inter', sans-serif
    E --text-base deve ser 16px

  @pending @smoke @spacing
  Cenário: Spacing scale definida corretamente
    Dado que o CSS está configurado
    Entao --spacing-sm deve ser 8px
    E --spacing-md deve ser 16px
    E --spacing-lg deve ser 24px
```

## Output: globals.css

```css
@import "tailwindcss";

:root {
  /* Colors - Background */
  --color-bg-primary: #0A0A0B;
  --color-bg-secondary: #141417;
  
  /* Colors - Accent */
  --color-accent: #FF5C00;
  
  /* Colors - Semantic */
  --color-success: #10B981;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  
  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --text-base: 16px;
  
  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## Input: atoms/button.feature

```gherkin
# language: pt
@pending @atom
Funcionalidade: Button
  **pencard_id:** "btn001"

  @pending @smoke
  Cenário: Button primário com estilo correto
    Dado que o componente Button é renderizado
    Quando tem variant="primary"
    Entao deve ter background --color-accent
    E deve ter border-radius --radius-md
    E deve ter padding 12px vertical, 16px horizontal

  @pending @smoke
  Cenário: Button secundário com estilo correto
    Dado que o componente Button é renderizado
    Quando tem variant="secondary"
    Entao deve ter background transparent
    E deve ter border 1px solid --color-accent
```

## Output: Component Tokens

```css
/* Button Component Tokens */
:root {
  --button-bg-primary: var(--color-accent);
  --button-bg-secondary: transparent;
  --button-border-secondary: 1px solid var(--color-accent);
  --button-radius: var(--radius-md);
  --button-padding-y: 12px;
  --button-padding-x: 16px;
}
```

## Conversão Tailwind (Preview)

| CSS Variable | Tailwind Class |
|--------------|----------------|
| `--color-bg-primary` | `bg-[var(--color-bg-primary)]` |
| `--color-text-primary` | `text-[var(--color-text-primary)]` |
| `--spacing-sm` | `p-[var(--spacing-sm)]` |
| `--spacing-md` | `p-[var(--spacing-md)]` |
| `--radius-md` | `rounded-[var(--radius-md)]` |
| `--font-sans` | `font-[var(--font-sans)]` |
| `--shadow-md` | `shadow-[var(--shadow-md)]` |