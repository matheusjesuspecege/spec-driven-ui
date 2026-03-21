# Design System - Research

## 1. Visão Geral

O **Design System** estabelece as bases visuais e consistentes para todo o projeto do Dashboard. Define tokens de design (cores, tipografia, espaçamento, border-radius) que servem como fonte única de verdade, garantindo coerência visual em todos os componentes e telas. A implementação será feita via Tailwind v4 CSS-first approach.

---

## 2. Objetivos

- Extrair e formalizar os tokens de design do arquivo `pencil-demo.pen`
- Mapear valores do Pencil para variáveis CSS customizadas (Tailwind v4)
- Criar escala tipográfica consistente usando os sizes extraídos
- Definir sistema de cores completo (backgrounds, textos, estados)
- Implementar sistema de espaçamento baseado nos gaps do design
- Documentar bordas arredondadas (border-radius scale)

---

## 3. Contexto Técnico

### Stack Atual

- Consulte `AGENTS.md` na seção **Referências**

### Arquitetura Tailwind v4

O Tailwind v4 utiliza abordagem **CSS-first**, onde a configuração é feita diretamente no CSS através de `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-*: ...;
  --font-*: ...;
  --spacing-*: ...;
  --radius-*: ...;
}
```

### Arquivo de Saída

- **globals.css**: `frontend/src/app/globals.css`
- Tokens serão definidos como `@theme` blocks

---

## 4. Tokens Extraídos do Pencil (pencil-demo.pen)

### 4.1 Sistema de Cores

#### Paleta de Backgrounds

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg-base` | `#0a0a0b` | Fundo principal (darkest) |
| `--color-bg-subtle` | `#111113` | Cards, áreas elevadas |
| `--color-bg-elevated` | `#141417` | Modals, popovers |
| `--color-bg-muted` | `#1a1a1d` | Hover states, áreas de destaque |
| `--color-bg-input` | `#1f1f23` | Inputs, campos de formulário |
| `--color-bg-overlay` | `#2a2a2e` | Overlays, backdrops |

#### Paleta de Textos

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-text-primary` | `#ffffff` | Texto principal |
| `--color-text-secondary` | `#ffffffcc` | Texto secundário (com opacity) |
| `--color-text-muted` | `#adadb0` | Placeholders, hints |
| `--color-text-subtle` | `#8b8b90` | Labels secundários |
| `--color-text-disabled` | `#6b6b70` | Estados desabilitados |
| `--color-text-inverse` | `#4a4a4e` | Texto sobre fundos claros |

#### Cores Semânticas

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-primary` | `#ff5c00` | Ações primárias, destaques |
| `--color-primary-hover` | `#ff7a33` | Hover do primary |
| `--color-primary-muted` | `#ff5c0020` | Backgrounds de primary |
| `--color-success` | `#22c55e` | Sucesso, confirmações |
| `--color-success-muted` | `#22c55e20` | Backgrounds de sucesso |
| `--color-error` | `#ef4444` | Erros, validações |
| `--color-error-muted` | `#ef444420` | Backgrounds de erro |

#### Cores de Borda

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-border` | `#2a2a2e` | Bordas padrão |
| `--color-border-subtle` | `#1f1f23` | Bordas sutis |
| `--color-border-focus` | `#ff5c00` | Focus ring (primary) |

---

### 4.2 Sistema Tipográfico

#### Escala de Font Sizes

| Token | Size | Uso |
|-------|------|-----|
| `--text-hero` | 38px | Títulos principais (hero) |
| `--text-h1` | 32px | Títulos de página (h1) |
| `--text-lg` | 18px | Subtítulos, texto grande |
| `--text-base` | 14px | Corpo de texto padrão |
| `--text-sm` | 13px | Texto secundário |
| `--text-xs` | 12px | Labels, timestamps |
| `--text-2xs` | 11px | Badges, tags pequenas |
| `--text-3xs` | 10px | Texto mínimo (copyright) |

#### Line Heights

| Token | Valor | Uso |
|-------|-------|-----|
| `--leading-tight` | 1.1 | Títulos grandes |
| `--leading-snug` | 1.25 | Subtítulos |
| `--leading-normal` | 1.5 | Corpo de texto |
| `--leading-relaxed` | 1.75 | Textos longos |

#### Font Weights

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-normal` | 400 | Texto regular |
| `--font-medium` | 500 | Texto medium emphasis |
| `--font-semibold` | 600 | Labels, botões |
| `--font-bold` | 700 | Títulos, destaques |

---

### 4.3 Sistema de Espaçamento

#### Gaps (Tailwind spacing scale)

| Token | Size | Equivalente Tailwind |
|-------|------|---------------------|
| `--spacing-0` | 0px | `gap-0` |
| `--spacing-1` | 2px | `gap-0.5` |
| `--spacing-2` | 4px | `gap-1` |
| `--spacing-3` | 6px | `gap-1.5` |
| `--spacing-4` | 8px | `gap-2` |
| `--spacing-5` | 10px | `gap-2.5` |
| `--spacing-6` | 12px | `gap-3` |
| `--spacing-7` | 14px | `gap-3.5` |
| `--spacing-8` | 16px | `gap-4` |
| `--spacing-10` | 20px | `gap-5` |
| `--spacing-14` | 28px | `gap-7` |
| `--spacing-16` | 32px | `gap-8` |

---

### 4.4 Sistema de Border-Radius

| Token | Size | Uso |
|-------|------|-----|
| `--radius-none` | 0px | Sem arredondamento |
| `--radius-sm` | 4px | Botões pequenos, inputs |
| `--radius-md` | 6px | Cards, containers |
| `--radius-lg` | 8px | Modals, grandes elementos |
| `--radius-xl` | 10px | Dropdowns |
| `--radius-2xl` | 12px | Cards grandes |
| `--radius-3xl` | 16px | Seções |
| `--radius-4xl` | 18px | Containers especiais |
| `--radius-full` | 9999px | Pills, avatares circulares |

---

## 5. Estrutura de Arquivos

### Input (Source of Truth)
- `pencil-demo.pen` - Design extraído via Pencil

### Output (Tokens CSS)
- `frontend/src/app/globals.css` - Tokens definidos via `@theme`

---

## 6. Integração com Tailwind v4

### Mapeamento de Tokens para @theme

```css
@import "tailwindcss";

@theme {
  /* ============================================
   * DESIGN TOKENS - Design System
   * Source: pencil-demo.pen
   * ============================================ */
  
  /* Colors - Background */
  --color-bg-base: #0a0a0b;
  --color-bg-subtle: #111113;
  --color-bg-elevated: #141417;
  --color-bg-muted: #1a1a1d;
  --color-bg-input: #1f1f23;
  --color-bg-overlay: #2a2a2e;
  
  /* Colors - Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #ffffffcc;
  --color-text-muted: #adadb0;
  --color-text-subtle: #8b8b90;
  --color-text-disabled: #6b6b70;
  --color-text-inverse: #4a4a4e;
  
  /* Colors - Semantic */
  --color-primary: #ff5c00;
  --color-primary-hover: #ff7a33;
  --color-primary-muted: #ff5c0020;
  --color-success: #22c55e;
  --color-success-muted: #22c55e20;
  --color-error: #ef4444;
  --color-error-muted: #ef444420;
  
  /* Colors - Border */
  --color-border: #2a2a2e;
  --color-border-subtle: #1f1f23;
  --color-border-focus: #ff5c00;
  
  /* Typography - Font Sizes */
  --text-hero: 38px;
  --text-h1: 32px;
  --text-lg: 18px;
  --text-base: 14px;
  --text-sm: 13px;
  --text-xs: 12px;
  --text-2xs: 11px;
  --text-3xs: 10px;
  
  /* Spacing */
  --spacing-0: 0px;
  --spacing-1: 2px;
  --spacing-2: 4px;
  --spacing-3: 6px;
  --spacing-4: 8px;
  --spacing-5: 10px;
  --spacing-6: 12px;
  --spacing-7: 14px;
  --spacing-8: 16px;
  --spacing-10: 20px;
  --spacing-14: 28px;
  --spacing-16: 32px;
  
  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 10px;
  --radius-2xl: 12px;
  --radius-3xl: 16px;
  --radius-4xl: 18px;
  --radius-full: 9999px;
}

html {
  scroll-behavior: smooth;
}
```

---

## 7. Componentes Dependentes (Atomic Design)

O Design System é a **base para todos os componentes**:

### Fase 1: Atoms (dependem dos tokens)
| Componente | Status | Dependência |
|------------|--------|-------------|
| Icon | ⏳ Pendente | Cores semânticas |
| Button | ⏳ Pendente | Primary, border-radius, spacing |
| Avatar | ⏳ Pendente | Border-radius-full, text |
| Logo | ⏳ Pendente | Colors |
| Badge | ⏳ Pendente | Colors semânticas |

### Fase 2: Molecules (dependem dos atoms)
| Componente | Status | Dependência |
|------------|--------|-------------|
| NavItem | ⏳ Pendente | Button, Icon |
| Card | ⏳ Pendente | Background, border-radius |
| Input | ⏳ Pendente | Background, border, spacing |

### Fase 3: Organisms (dependem das molecules)
| Componente | Status | Dependência |
|------------|--------|-------------|
| Sidebar | ⏳ Pendente | NavItem, Logo, Card |
| Header | ⏳ Pendente | Logo, Button, Avatar |

---

## 8. Critérios de Aceitação

- [ ] Tokens de cores extraídos e mapeados para `--color-*` no @theme
- [ ] Escala tipográfica definida com todos os 8 tamanhos
- [ ] Sistema de espaçamento implementado com os 12 valores
- [ ] Border-radius scale com 9 variações
- [ ] Cores semânticas (primary, success, error) com variants muted
- [ ] globals.css atualizado com @theme block
- [ ] Validação: sem conflicts com Tailwind defaults

---

## 9. Fora do Escopo

- Componentes React (serão implementados após os tokens)
- Funcionalidades de acessibilidade (serão tratadas por componente)
- Testes E2E (não se aplicam a design tokens)
- Temas alternativos (light mode) - futuro

---

## 10. Referências

- [Tailwind CSS v4 - Theme Configuration](https://tailwindcss.com/docs/theme)
- [Tailwind CSS v4 - PostCSS Plugin](https://tailwindcss.com/docs/postcss)
- [Design Tokens - W3C](https://design-tokens.github.io/community-group/format/)
- `pencil-demo.pen` - Source of truth para valores extraídos

---

## 11. Questões em Aberto

- [ ] Verificar se font-family deve ser customizada ou usar Tailwind default (sans)
- [ ] Decidir se será usado CSS custom properties com `--` ou direto no @theme
- [ ] Avaliar necessidade de criar `src/styles/tokens.css` separado vs inline no globals.css

---

## 12. Próximos Passos

1. **Este research** → Aprovar tokens e mapeamentos
2. **@design-tokens-generator** → Gerar globals.css com @theme
3. **Verificar no Pencil** → Comparar valores CSS com design original
4. **Criar primeiro atom** → Ex: Button (depende dos tokens)
