---
name: design-tokens-generator
description: "Extrai tokens de design dos arquivos *.feature e gera o globals.css do Tailwind. Consome design-tokens.feature (globais) e *.feature de componentes (específicos)."
license: MIT
compatibility: opencode
metadata:
  version: 1.0.0
  user-invocable: true
  triggers:
    - "@design-tokens-generator"
    - "gerar tokens de design"
    - "criar globals.css"
---

## Quando Usar

Use esta skill quando precisar:
- Gerar CSS global a partir de especificações BDD
- Extrair tokens de cores, tipografia, spacing e outros dos arquivos `.feature`
- Criar ou atualizar o `globals.css` do Tailwind
- Sincronizar design tokens entre especificação e implementação

---

## Visão Geral

Extrai tokens de design dos arquivos `*.feature` e gera:
- `:root` com tokens globais → `frontend/src/app/globals.css`
- Tokens específicos de componentes inline ou em arquivos separados

| Tipo | Fonte | Destino |
|------|-------|---------|
| **Globais** | `design-tokens.feature` | `:root` do `globals.css` |
| **Componente** | `atoms/*.feature`, `molecules/*.feature`, `organisms/*.feature` | CSS do componente ou seção no globals.css |

---

## Modelo Híbrido — Divisão de Responsabilidades

### design-tokens.feature (Globais)

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

  @pending @smoke @typography
  Cenário: Tipografia configurada corretamente
    Dado que o CSS está configurado
    Entao --font-sans deve ser 'Inter', sans-serif
    E --text-base deve ser 16px
```

**Tokens aqui extraídos:**
- `--color-bg-primary`
- `--color-bg-secondary`
- `--color-accent`
- `--font-sans`
- `--text-base`

### atoms/button.feature (Específico)

```gherkin
# language: pt
@pending @atom
Funcionalidade: Button
  **pencil_id:** "btn001"

  @pending @smoke
  Cenário: Button primário com estilo correto
    Dado que o componente Button é renderizado
    Quando tem variant="primary"
    Entao deve ter background --color-accent
    E deve ter border-radius --radius-md
    E deve ter padding 12px vertical, 16px horizontal
```

**Tokens aqui extraídos:**
- `--button-bg-primary` (mapeado de --color-accent)
- `--button-radius` (mapeado de --radius-md)
- `--button-padding-y`
- `--button-padding-x`

---

## Fluxo

### Etapa 1: Verificar Estrutura

```typescript
if (!await dirExists(designSystemPath)) {
  return { error: 'Estrutura design-system não encontrada. Execute @bdd-generator primeiro.' };
}
```

### Etapa 2: Ler design-tokens.feature (Globais)

Local: `specs/features/design-system/features/design-tokens.feature`

Extrair:
- Cores primárias, secundárias, neutras
- Cores semânticas (success, error, warning)
- Tipografia (fontes, tamanhos, pesos)
- Spacing scale
- Border radius
- Shadows

### Etapa 3: Ler *.feature de Componentes

Local: 
- `specs/features/design-system/features/atoms/*.feature`
- `specs/features/design-system/features/molecules/*.feature`
- `specs/features/design-system/features/organisms/*.feature`

### Etapa 4: Parsear Valores dos Cenários

Consulte `references/TOKEN_PATTERNS.md` para os padrões de extração.

### Etapa 5: Gerar :root CSS

```typescript
function generateRootCSS(tokens: GlobalTokens): string {
  let css = ':root {\n';
  css += '  /* Colors */\n';
  for (const [name, value] of Object.entries(tokens.colors.primary)) {
    css += `  --color-primary-${name}: ${value};\n`;
  }
  css += '}\n';
  return css;
}
```

### Etapa 6: Salvar globals.css

Local: `frontend/src/app/globals.css`

---

## Conversão para Tailwind

O agente deve converter CSS vars para formato Tailwind:

```typescript
const CSS_VAR_TO_TAILWIND = {
  '--color-bg-primary': 'bg-[var(--color-bg-primary)]',
  '--color-text-primary': 'text-[var(--color-text-primary)]',
  '--spacing-sm': 'p-[var(--spacing-sm)]',
  '--radius-md': 'rounded-[var(--radius-md)]',
  '--font-sans': 'font-[var(--font-sans)]',
};
```

---

## Regras

1. **BDD é fonte da verdade** — não inventar valores
2. **Extrair de cenários** — parsear Given-When-Then
3. **CSS vars format** — usar --nome-categoria-propriedade
4. **Tailwind compatível** — converter para formato tailwind quando possível
5. **Separar globais de específicos** — tokens globais no :root, específicos nos componentes

---

## Output

```
✅ Tokens extraídos e globals.css gerado

Arquivos lidos:
- specs/features/design-system/features/design-tokens.feature
- specs/features/design-system/features/atoms/*.feature
- specs/features/design-system/features/molecules/*.feature
- specs/features/design-system/features/organisms/*.feature

Tokens extraídos:
- Colors: X
- Typography: Y
- Spacing: Z
- Border Radius: W
- Component-specific: N

Arquivo gerado:
- frontend/src/app/globals.css

Próximos passos:
1. Revise o globals.css gerado
2. Ajuste tokens se necessário
3. Execute /implement-tasks para implementar componentes
```