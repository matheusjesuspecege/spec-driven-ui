# Plan: Button Component

> Gerado a partir de: `specs/features/button/research.md`
> Foco: Frontend

## 1. Visão Geral Técnica

O componente **Button** é um átomo fundamental do Design System que encapsula ações do usuário. Será implementado como componente React com suporte a 5 variantes visuais (primary, secondary, ghost, destructive, inverse), 3 tamanhos (sm, md, lg), posicionamento flexível de ícones (left, right, icon-only) e todos os estados de interação (hover, active, disabled, loading, focus). O componente consome tokens de design globais para cores, espaçamento, border-radius e tipografia. Comunicação com backend não é necessária — componente puramente presentacional com callbacks de evento.

---

## 2. Requisitos Funcionais (RF)

| RF | Descrição |
|----|-----------|
| RF-01 | Renderizar botão com variant "primary" (bg primary, texto branco) |
| RF-02 | Renderizar botão com variant "secondary" (border only, hover bg-muted) |
| RF-03 | Renderizar botão com variant "ghost" (transparent, hover bg-muted) |
| RF-04 | Renderizar botão com variant "destructive" (bg error, para ações destrutivas) |
| RF-05 | Renderizar botão com variant "inverse" (bg white, texto primary) |
| RF-06 | Renderizar botão em tamanho "sm" (32px altura, padding 6/12) |
| RF-07 | Renderizar botão em tamanho "md" (40px altura, padding 10/16) - DEFAULT |
| RF-08 | Renderizar botão em tamanho "lg" (48px altura, padding 12/20) |
| RF-09 | Aceitar ícone React na posição esquerda (gap 8px) |
| RF-10 | Aceitar ícone React na posição direita |
| RF-11 | Renderizar como icon-only (square padding, tooltip obrigatório) |
| RF-12 | Exibir estado loading com spinner e desabilitar interação |
| RF-13 | Exibir estado disabled com opacity 50% e cursor-not-allowed |
| RF-14 | Aplicar focus ring com cor border-focus |
| RF-15 | Prop fullWidth para ocupar 100% da largura do container |
| RF-16 | Acessibilidade: aria-disabled, aria-busy, focus ring visível |

---

## 3. Estrutura de Arquivos

Todos os arquivos a serem **criados**:

```
frontend/src/
├── components/
│   └── button/
│       ├── Button.tsx              # criado - componente principal
│       ├── button.css              # criado - classes CSS específicas
│       └── index.ts                # criado - barrel export
frontend/tests/features/button/
├── button.spec.ts                  # criado - testes E2E Playwright
└── button.spec.docs.md             # criado - documentação de testes
```

---

## 4. Tipos e Interfaces

### Tipos Enum

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right' | 'icon-only';
```

### Interface Principal

```typescript
interface ButtonProps {
  variant?: ButtonVariant;      // default: 'primary'
  size?: ButtonSize;            // default: 'md'
  iconPosition?: IconPosition;  // default: 'left'
  icon?: ReactNode;             // ícone Lucide React
  loading?: boolean;            // default: false
  disabled?: boolean;           // default: false
  fullWidth?: boolean;           // default: false
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';  // default: 'button'
  className?: string;
  'aria-label'?: string;         // obrigatório para icon-only
  'data-testid'?: string;
}
```

### Classes CSS

```typescript
const BUTTON_CLASSES = {
  base: 'btn',
  variants: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    destructive: 'btn-destructive',
    inverse: 'btn-inverse',
  },
  sizes: {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  },
  states: {
    loading: 'btn-loading',
    disabled: 'btn-disabled',
    fullWidth: 'btn-full-width',
    iconOnly: 'btn-icon-only',
  },
} as const;
```

---

## 5. Props Table

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `variant` | `ButtonVariant` | `'primary'` | Variante visual do botão |
| `size` | `ButtonSize` | `'md'` | Tamanho (sm/md/lg) |
| `iconPosition` | `IconPosition` | `'left'` | Posição do ícone |
| `icon` | `ReactNode` | `undefined` | Componente de ícone Lucide |
| `loading` | `boolean` | `false` | Estado de carregamento |
| `disabled` | `boolean` | `false` | Estado desabilitado |
| `fullWidth` | `boolean` | `false` | Ocupa 100% largura |
| `children` | `ReactNode` | - | Conteúdo textual do botão |
| `onClick` | `() => void` | `undefined` | Handler de click |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo HTML do botão |
| `className` | `string` | `undefined` | Classes CSS extras |
| `aria-label` | `string` | `undefined` | Label para acessibilidade (obrigatório em icon-only) |
| `data-testid` | `string` | `undefined` | Identificador para testes |

### Estados Visuais por Variant

| Estado | Primary | Secondary | Ghost | Destructive | Inverse |
|--------|---------|-----------|-------|-------------|---------|
| Default | bg: primary | border: border | bg: transparent | bg: error | bg: white |
| Hover | bg: primary-hover | bg: bg-muted | bg: bg-muted | bg: darken 10% | bg: bg-muted |
| Active | bg: darken 10% | bg: darken 5% | bg: darken 5% | bg: darken 15% | bg: darken 5% |
| Disabled | opacity: 50% | opacity: 50% | opacity: 50% | opacity: 50% | opacity: 50% |
| Loading | spinner + disabled | spinner + disabled | spinner + disabled | spinner + disabled | spinner + disabled |
| Focus | ring: border-focus | ring: border-focus | ring: border-focus | ring: border-focus | ring: border-focus |

### Dimensões por Tamanho

| Tamanho | Padding | Font | Gap | Icon Size | Border Radius | Height |
|---------|---------|------|-----|----------|---------------|--------|
| sm | 6px 12px | 12px (text-xs) | 6px | 14px | 6px (radius-md) | 32px |
| md | 10px 16px | 13px (text-sm) | 8px | 16px | 8px (radius-lg) | 40px |
| lg | 12px 20px | 14px (text-base) | 10px | 18px | 8px (radius-lg) | 48px |

---

## 6. Design Tokens Consumidos

O componente utiliza tokens do Design System (já implementados em `globals.css`):

```css
/* Cores */
--color-primary: #FF5C00;
--color-primary-hover: #FF7A33;
--color-error: #EF4444;
--color-border: #2A2A2E;
--color-bg-muted: #1A1A1D;
--color-text-primary: #FFFFFF;
--color-text-subtle: #8B8B90;
--color-border-focus: #3B82F6;

/* Espaçamento */
--spacing-6: 12px;
--spacing-8: 16px;
--spacing-10: 20px;
--spacing-12: 24px;

/* Border Radius */
--radius-md: 6px;
--radius-lg: 8px;

/* Tipografia */
--text-xs: 12px;
--text-sm: 13px;
--text-base: 14px;
--font-weight-medium: 500;
--font-weight-semibold: 600;
```

---

## 7. Dependências Externas

| Dependência | Versão | Uso |
|-------------|--------|-----|
| `lucide-react` | latest | Ícones (Plus, Download, etc.) |

---

## 8. Diagrama de Dependências

Ordem de implementação (bottom-up):

```
[globals.css] ──► [button.css]
       │                │
       │                ▼
       │         [Button.tsx]
       │                │
       │                ▼
       │         [index.ts]
       │                │
       ▼                ▼
[button.spec.ts] ◄─────┘
```

**Sequência de implementação:**

1. **button.css** — Classes CSS específicas do botão (variants, sizes, states)
2. **Button.tsx** — Componente React principal com todas as props
3. **index.ts** — Barrel export
4. **button.spec.ts** — Testes E2E Playwright
5. **button.spec.docs.md** — Documentação de testes

---

## 9. Contratos de API

### Props de Entrada (Input)

```typescript
// children é obrigatório, todos os outros são opcionais
<Button>Save Changes</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="destructive" icon={<TrashIcon />} loading={isDeleting}>
  Delete Item
</Button>
<Button variant="ghost" icon={<ArrowRightIcon />} iconPosition="right">
  Learn More
</Button>
<Button variant="inverse" fullWidth>Upgrade Now</Button>
```

### Eventos (Output)

| Evento | Payload | Comportamento |
|--------|---------|---------------|
| `onClick` | `MouseEvent` | Dispara callback se não disabled/loading |
| `type="submit"` | Form submit | Funciona em formulários HTML |

### Estados Acessibilidade

| Atributo | Valor | Condição |
|----------|-------|----------|
| `disabled` | `true` | Quando `disabled={true}` |
| `aria-disabled` | `"true"` | Quando `loading={true}` |
| `aria-busy` | `"true"` | Quando `loading={true}` |
| `aria-label` | `string` | Obrigatório quando `icon-only` |

---

## 10. Questões em Aberto

- [ ] Confirmar se Spinner será componente separado ou inline (sugestão: usar componente Spinner do design system quando existir)
- [ ] Confirmar se Tooltip para icon-only deve ser implementado dentro do Button ou via wrapper
- [ ] Verificar necessidade de suporte a `asChild` (polymorphic component via Radix)

---

## 11. Checklist de Implementação

- [ ] Criar `frontend/src/components/button/button.css`
- [ ] Criar `frontend/src/components/button/Button.tsx`
- [ ] Criar `frontend/src/components/button/index.ts`
- [ ] Criar `frontend/tests/features/button/button.spec.ts`
- [ ] Criar `frontend/tests/features/button/button.spec.docs.md`
- [ ] Verificar que todos os 16 RFs estão cobertos
- [ ] Verificar que nenhum `any` foi utilizado
- [ ] Verificar que todos os tokens vêm do Design System
