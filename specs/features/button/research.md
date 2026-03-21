# Button Component - Research

## 1. Visão Geral

O componente **Button** é um átomo fundamental do Design System, responsável por acionar ações do usuário. Deve suportar múltiplas variantes visuais, estados de interação, tamanhos e configurações de ícones, mantendo consistência com os tokens de design definidos.

---

## 2. Source of Truth

| Artefato | Caminho |
|----------|---------|
| Design File | `pencil-demo.pen` |
| Design Tokens | `specs/features/design-system/features/design-tokens.feature` |
| Design System Research | `specs/features/design-system/research.md` |

---

## 3. Análise do Design (pencil-demo.pen)

### 3.1 Button Instances Identificadas

#### Primary Button (Node ID: l9nUc)
- **Localização**: Header Actions
- **Background**: `#FF5C00` (primary)
- **Corner Radius**: `8px` (radius-lg)
- **Padding**: `[10, 16]` (vertical, horizontal)
- **Gap (icon-text)**: `8px`
- **Icon**: lucide `plus`, 16x16, cor `#FFFFFF`
- **Text**: "New Report"
- **Text Color**: `#FFFFFF`
- **Font**: Inter, 13px (text-sm), weight 500

#### Secondary Button (Node ID: fFV1n)
- **Localização**: Header Actions
- **Background**: transparent
- **Border**: 1px `#2A2A2E`
- **Corner Radius**: `8px` (radius-lg)
- **Padding**: `[10, 16]`
- **Gap (icon-text)**: `8px`
- **Icon**: lucide `download`, 16x16, cor `#8B8B90` (text-subtle)
- **Text**: "Export"
- **Text Color**: `#FFFFFF`
- **Font**: Inter, 13px (text-sm), weight 500

#### Upgrade Button (Node ID: jipw1)
- **Localização**: Banner card
- **Background**: `#FFFFFF`
- **Corner Radius**: `6px` (radius-md)
- **Padding**: `[10, 0]` (vertical, horizontal - full width button)
- **Text**: "Upgrade Now"
- **Text Color**: `#FF5C00` (primary - texto com cor de primary, background branco)
- **Font**: Inter, 12px (text-xs), weight 600

---

## 4. Variants

### 4.1 Primary
| Prop | Valor |
|------|-------|
| Background | `primary` (#FF5C00) |
| Text | `#FFFFFF` |
| Border | none |
| Hover | `primary-hover` (#FF7A33) |
| Active | darken 10% |
| **Uso** | Ações principais, CTAs |

### 4.2 Secondary (Outline)
| Prop | Valor |
|------|-------|
| Background | transparent |
| Border | 1px `border` (#2A2A2E) |
| Text | `#FFFFFF` |
| Hover | background `bg-muted` (#1A1A1D) |
| **Uso** | Ações secundárias |

### 4.3 Ghost
| Prop | Valor |
|------|-------|
| Background | transparent |
| Border | none |
| Text | `#FFFFFF` |
| Hover | background `bg-muted` (#1A1A1D) |
| **Uso** | Ações terciárias, navegação |

### 4.4 Destructive
| Prop | Valor |
|------|-------|
| Background | `error` (#EF4444) |
| Text | `#FFFFFF` |
| Border | none |
| Hover | darken 10% |
| **Uso** | Ações destrutivas (delete, remove) |

### 4.5 Inverse (Upgrade Style)
| Prop | Valor |
|------|-------|
| Background | `#FFFFFF` |
| Text | `primary` (#FF5C00) |
| Border | none |
| Hover | background `bg-muted` |
| **Uso** | Upgrade, highlight actions |

---

## 5. States

| State | Primary | Secondary | Ghost | Destructive | Inverse |
|-------|---------|-----------|-------|--------------|---------|
| Default | bg-primary | border-only | transparent | bg-error | bg-white |
| Hover | bg-primary-hover | bg-muted | bg-muted | darken | bg-muted |
| Active/Pressed | darken 10% | darken 5% | darken 5% | darken 15% | darken 5% |
| Disabled | opacity 50%, cursor-not-allowed | opacity 50% | opacity 50% | opacity 50% | opacity 50% |
| Loading | show spinner, disabled | show spinner, disabled | show spinner, disabled | show spinner, disabled | show spinner, disabled |
| Focus | ring 2px `border-focus` | ring 2px `border-focus` | ring 2px `border-focus` | ring 2px `border-focus` | ring 2px `border-focus` |

---

## 6. Sizes

### Small (sm)
| Prop | Valor |
|------|-------|
| Padding | `[6, 12]` |
| Font Size | 12px (text-xs) |
| Gap | 6px |
| Icon Size | 14px |
| Border Radius | `radius-md` (6px) |
| Height | ~32px |

### Medium (md) - Default
| Prop | Valor |
|------|-------|
| Padding | `[10, 16]` |
| Font Size | 13px (text-sm) |
| Gap | 8px |
| Icon Size | 16px |
| Border Radius | `radius-lg` (8px) |
| Height | ~40px |

### Large (lg)
| Prop | Valor |
|------|-------|
| Padding | `[12, 20]` |
| Font Size | 14px (text-base) |
| Gap | 10px |
| Icon Size | 18px |
| Border Radius | `radius-lg` (8px) |
| Height | ~48px |

---

## 7. Icon Placements

### Left Icon (padrão)
```
[Icon] [Text]
```
- Gap: 8px (md), 6px (sm), 10px (lg)

### Right Icon
```
[Text] [Icon]
```
- Uso: Dropdown buttons, navegação com seta

### Icon Only
```
[Icon]
```
- Padding: `[10, 10]` (square)
- Tooltip obrigatório para acessibilidade
- Min touch target: 44x44px

---

## 8. Design Tokens Utilizados

### Cores
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | #FF5C00 | Primary background/text |
| `--color-primary-hover` | #FF7A33 | Primary hover |
| `--color-error` | #EF4444 | Destructive background |
| `--color-border` | #2A2A2E | Secondary border |
| `--color-bg-muted` | #1A1A1D | Hover background |
| `--color-text-primary` | #FFFFFF | Default text |
| `--color-text-subtle` | #8B8B90 | Secondary icon color |

### Espaçamento
| Token | Valor | Uso |
|-------|-------|-----|
| `--spacing-6` | 12px | Large vertical padding |
| `--spacing-8` | 16px | Medium horizontal padding |
| `--spacing-10` | 20px | Large horizontal padding |

### Border Radius
| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-md` | 6px | Small buttons |
| `--radius-lg` | 8px | Medium/Large buttons |

### Tipografia
| Token | Valor | Uso |
|-------|-------|-----|
| `--text-xs` | 12px | Small buttons |
| `--text-sm` | 13px | Medium buttons |
| `--text-base` | 14px | Large buttons |

---

## 9. Interface TypeScript

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right' | 'icon-only';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconPosition?: IconPosition;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

---

## 10. Estrutura de Arquivos

```
frontend/src/components/ui/
└── Button/
    ├── Button.tsx           # Componente principal
    ├── ButtonIcon.tsx       # Ícone do botão (opcional)
    ├── ButtonSpinner.tsx    # Spinner para loading state
    ├── button.css           # Classes CSS específicas
    └── index.ts             # Export barrel
```

---

## 11. Critérios de Aceitação

- [ ] Variants: primary, secondary, ghost, destructive, inverse
- [ ] Sizes: sm, md, lg
- [ ] Icon positions: left, right, icon-only
- [ ] States: default, hover, active, disabled, loading, focus
- [ ] Tokens: todos os valores vindos do design tokens
- [ ] Acessibilidade: focus ring, aria-disabled, aria-busy
- [ ] Responsividade: touch targets mínimo 44x44px
- [ ] FullWidth prop para botões que ocupam toda a largura

---

## 12. Dependências

### Design System (já implementado)
- Tokens de cor (primary, error, border, etc.)
- Tokens de espaçamento
- Tokens de border-radius
- Tokens tipográficos

### Componentes Dependentes
- Icon (átomo) - para ícones Lucide
- Spinner (átomo) - para loading state

---

## 13. Fora do Escopo

- Button Groups (comportamento de radio/checkbox)
- Split Buttons (dropdown + button)
- Floating Action Buttons (FAB)
- Touch ripple effects

---

## 14. Referências

- [Design Tokens](./design-system/features/design-tokens.feature)
- [Pencil Design File](./pencil-demo.pen)
- [Radix UI Button Patterns](https://radix-ui.com/primitives/docs/components/button)
- [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
