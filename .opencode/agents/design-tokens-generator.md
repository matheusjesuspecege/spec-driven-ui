---
name: design-tokens-generator
description: "Extrai tokens de design dos arquivos *.feature e gera o globals.css do Tailwind. Consome design-tokens.feature (globais) e *.feature de componentes (específicos)."
mode: subagent
temperature: 0.1
tools:
  write: true
  edit: true
  read: true
  glob: true
permission:
  edit: allow
---

## Como Usar Este Agente

```

## Visão Geral

Extrai tokens de design dos arquivos `*.feature` e gera:
- `:root` com tokens globais → `frontend/src/app/globals.css`
- Tokens específicos de componentes inline ou em arquivos separados

| Tipo | Fonte | Destino |
|------|-------|---------|
| **Globais** | `design-tokens.feature` | `:root` do `globals.css` |
| **Componente** | `atoms/*.feature`, `molecules/*.feature`, `organisms/*.feature` | CSS do componente ou seção no globals.css |

---

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

```typescript
interface GlobalTokens {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    neutral: Record<string, string>;
    semantic: Record<string, string>;
  };
  typography: {
    fonts: Record<string, string>;
    sizes: Record<string, string>;
    weights: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}
```

### Etapa 3: Ler *.feature de Componentes

Local: 
- `specs/features/design-system/features/atoms/*.feature`
- `specs/features/design-system/features/molecules/*.feature`
- `specs/features/design-system/features/organisms/*.feature`

Extrair tokens específicos de cada componente:
- `--button-primary-color`
- `--card-padding`
- `--sidebar-width`

```typescript
interface ComponentTokens {
  [componentName: string]: {
    [tokenName: string]: string;
  };
}
```

### Etapa 4: Parsear Valores dos Cenários

Os valores nos cenários seguem padrão:

```gherkin
Cenário: Button primário com estilo correto
  Dado que o componente Button é renderizado
  Quando tem variant="primary"
  Entao deve ter background #FF5C00
  E deve ter border-radius 8px
  E deve ter padding 12px vertical, 16px horizontal
```

Extrair via regex:

```typescript
const TOKEN_PATTERNS = {
  color: /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb\(|rgba\(/,
  radius: /(\d+)px/,
  spacing: /(\d+)px\s+(vertical|horizontal)?/,
  shadow: /shadow|box-shadow/,
};

const extractColor = (line: string): string | null => {
  const match = line.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/);
  return match ? `#${match[1]}` : null;
};

const extractSpacing = (line: string): { top: number; bottom: number; left: number; right: number } | null => {
  const pyMatch = line.match(/(\d+)px\s+vertical/);
  const pxMatch = line.match(/(\d+)px\s+horizontal/);
  
  if (pyMatch && pxMatch) {
    return {
      top: parseInt(pyMatch[1]),
      bottom: parseInt(pyMatch[1]),
      left: parseInt(pxMatch[1]),
      right: parseInt(pxMatch[1]),
    };
  }
  return null;
};
```

### Etapa 5: Gerar :root CSS

```typescript
function generateRootCSS(tokens: GlobalTokens): string {
  let css = ':root {\n';
  css += '  /* Colors */\n';
  for (const [name, value] of Object.entries(tokens.colors.primary)) {
    css += `  --color-primary-${name}: ${value};\n`;
  }
  for (const [name, value] of Object.entries(tokens.colors.semantic)) {
    css += `  --color-${name}: ${value};\n`;
  }
  css += '\n  /* Typography */\n';
  for (const [name, value] of Object.entries(tokens.typography.fonts)) {
    css += `  --font-${name}: ${value};\n`;
  }
  for (const [name, value] of Object.entries(tokens.typography.sizes)) {
    css += `  --text-${name}: ${value};\n`;
  }
  css += '\n  /* Spacing */\n';
  for (const [name, value] of Object.entries(tokens.spacing)) {
    css += `  --spacing-${name}: ${value};\n`;
  }
  css += '\n  /* Border Radius */\n';
  for (const [name, value] of Object.entries(tokens.borderRadius)) {
    css += `  --radius-${name}: ${value};\n`;
  }
  css += '}\n';
  return css;
}
```

### Etapa 6: Gerar globals.css Completo

```typescript
async function generateGlobalsCSS(): Promise<string> {
  const tokens = await extractAllTokens();
  
  let css = `@import "tailwindcss";\n\n`;
  css += generateRootCSS(tokens.globals);
  css += '\n';
  css += generateComponentCSS(tokens.components);
  
  return css;
}
```

### Etapa 7: Salvar globals.css

```typescript
const globalsPath = 'frontend/src/app/globals.css';
await writeFile(globalsPath, cssContent);
```

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
3. Execute @implement-tasks para implementar componentes
```

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

## Validações

- [ ] design-tokens.feature existe
- [ ] Cenários têm formato correto
- [ ] Valores são parseáveis (cores hex, spacing px)
- [ ] globals.css é gerado sem erros de sintaxe
- [ ] Tokens globais e de componente estão separados

---

## Regras

1. **BDD é fonte da verdade** — não inventar valores
2. **Extrair de cenários** — parsear Given-When-Then
3. **CSS vars format** — usar --nome-categoria-propriedade
4. **Tailwind compatível** — converter para formato tailwind quando possível
5. **Separar globais de específicos** — tokens globais no :root, específicos nos componentes

---

## Exemplo de Output

### Input: design-tokens.feature

```gherkin
@pending @smoke @colors
Cenário: Cores primárias definidas corretamente
  Dado que o CSS está configurado
  Entao --color-bg-primary deve ser #0A0A0B
  E --color-bg-secondary deve ser #141417
  E --color-accent deve ser #FF5C00
```

### Output: globals.css

```css
:root {
  --color-bg-primary: #0A0A0B;
  --color-bg-secondary: #141417;
  --color-accent: #FF5C00;
}
```
