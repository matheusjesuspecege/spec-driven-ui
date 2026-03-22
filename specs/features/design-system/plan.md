# Plan: Design System

> Gerado a partir de: `specs/features/design-system/research.md`
> Foco: Design Tokens (CSS-first)

## 1. Visão Geral Técnica

Este plano implementa o **Design System** como a fundação visual do projeto spec-driven-ui. A implementação consiste em:

1. **Modificar** o arquivo `frontend/src/app/globals.css` existente para adicionar o bloco `:root` com todos os tokens de design
2. **Definir** variáveis CSS customizadas via `:root` do Tailwind v4 (colors, typography, spacing, border-radius)
3. **Validar** que não há conflitos com os valores padrão do Tailwind

Os tokens servem como fonte única de verdade para todos os componentes que serão implementados posteriormente (Atomic Design: Atoms → Molecules → Organisms).

---

## 2. Estrutura de Arquivos

Todos os arquivos que serão **criados ou modificados**:

```
frontend/src/
└── app/
    └── globals.css                        # modificado - adiciona :root block
```

---

## 3. Artefatos a Serem Gerados

### 3.1 globals.css (modificado)

**Caminho:** `frontend/src/app/globals.css`

**Bloco :root a ser adicionado:**

```css
:root {
  --color-bg-base: #0a0a0b;
  --color-bg-subtle: #111113;
  --color-bg-elevated: #141417;
  --color-bg-muted: #1a1a1d;
  --color-bg-input: #1f1f23;
  --color-bg-overlay: #2a2a2e;
  --color-text-primary: #ffffff;
  --color-text-secondary: #ffffffcc;
  --color-text-muted: #adadb0;
  --color-text-subtle: #8b8b90;
  --color-text-disabled: #6b6b70;
  --color-text-inverse: #4a4a4e;
  --color-primary: #ff5c00;
  --color-primary-hover: #ff7a33;
  --color-primary-muted: #ff5c0020;
  --color-success: #22c55e;
  --color-success-muted: #22c55e20;
  --color-error: #ef4444;
  --color-error-muted: #ef444420;
  --color-border: #2a2a2e;
  --color-border-subtle: #1f1f23;
  --color-border-focus: #ff5c00;
  --text-hero: 38px;
  --text-h1: 32px;
  --text-lg: 18px;
  --text-base: 14px;
  --text-sm: 13px;
  --text-xs: 12px;
  --text-2xs: 11px;
  --text-3xs: 10px;
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
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
```

---

## 4. Tipos e Interfaces TypeScript

Não aplicável — Design Tokens são definidos puramente em CSS via `:root`. Types TypeScript serão criados quando os componentes React (Atoms) forem implementados.

---

## 5. Contratos de API

Não aplicável — Design System é uma biblioteca estática de CSS tokens. Não há comunicação com backend.

---

## 6. Componentes Dependentes (Futuro)

### Fase 1: Atoms (dependem dos tokens)
| Componente | Dependência |
|------------|-------------|
| Icon | `--color-text-primary`, `--color-text-muted` |
| Button | `--color-primary`, `--color-primary-hover`, `--radius-sm`, `--spacing-4` |
| Avatar | `--radius-full`, `--color-bg-muted`, `--text-sm` |
| Logo | `--color-primary` |
| Badge | `--color-success`, `--color-error`, `--color-primary`, `--text-xs` |

### Fase 2: Molecules (dependem dos atoms)
| Componente | Dependência |
|------------|-------------|
| NavItem | Button, Icon |
| Card | `--color-bg-subtle`, `--radius-md` |
| Input | `--color-bg-input`, `--color-border`, `--color-border-focus`, `--spacing-2` |

### Fase 3: Organisms (dependem das molecules)
| Componente | Dependência |
|------------|-------------|
| Sidebar | NavItem, Logo, Card |
| Header | Logo, Button, Avatar |

---

## 7. Diagrama de Dependências

Ordem de implementação:

```
[globals.css] (modificado com :root)
        │
        ▼
[Atom Components] (futuro)
  - Icon
  - Button
  - Avatar
  - Logo
  - Badge
        │
        ▼
[Molecule Components] (futuro)
  - NavItem
  - Card
  - Input
        │
        ▼
[Organism Components] (futuro)
  - Sidebar
  - Header
```

---

## 8. Critérios de Aceitação

- [ ] globals.css contém `:root` block com todos os tokens de cor (bg, text, semantic, border)
- [ ] Escala tipográfica completa (8 tamanhos de fonte)
- [ ] Sistema de espaçamento implementado (12 valores)
- [ ] Border-radius scale com 9 variações
- [ ] Cores semânticas com variants muted (primary, success, error)
- [ ] Validação: tokens não conflitam com Tailwind defaults

---

## 9. Questões em Aberto

---

## 10. Checklist de Implementação

### Pré-requisitos
- [ ] Verificar existência de `frontend/src/app/globals.css`

### Implementação
- [ ] Verificar globals.css e adicionar o que não existir
- [ ] Adicionar `@import "tailwindcss";` no início (se não existir)
- [ ] Inserir bloco `:root` completo conforme seção 3.1 
- [ ] Adicionar `html { scroll-behavior: smooth; }` ao final

### Validação
- [ ] Verificar que todos os tokens estão formatados corretamente
- [ ] Testar que o build do Next.js não apresenta erros
- [ ] Confirmar que os tokens estão acessíveis via Tailwind (ex: `bg-bg-base`, `text-primary`)
