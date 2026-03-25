# Icon Component - Research

## 1. Visão Geral

O componente **Icon** é um átomo fundamental do Design System, responsável por representar visualmente ações, estados e conceitos através de símbolos gráficos. Utiliza a biblioteca **Lucide Icons** e suporta múltiplos tamanhos, cores contextuais e uso standalone ou integrado em componentes compostos.

---

## 2. Source of Truth

| Artefato | Caminho |
|----------|---------|
| Design File | `pencil-demo.pen` |
| Design Tokens | `specs/features/design-system/features/design-tokens.feature` |

---

## 3. Análise do Design (pencil-demo.pen)

### 3.1 Instâncias Identificadas (33 total)

#### Por Tamanho

| Tamanho | Width/Height | Uso | Node IDs |
|---------|--------------|-----|----------|
| xs | 14x14 | Indicadores de tendência, status badges | XFsMT, gnk4J, labez, Em9Y0 |
| sm | 16x16 | Botões primários/secundários, search, nav, dismiss | MudB3, zKJ5d, SWTXZ, 7WNHv, 5e8Tl, 506iK, dNNoM, TGUHd |
| md | 18x18 | Navegação, itens de lista | afPV1, 44nr6, 45Osa, e2o2z, SMgsu, yHbp6, UVE08 |
| lg | 20x20 | CTAs especiais, upgrade | H8qxs |
| xl | 32x32 | Placeholders de imagem em cards | rhGrx, cpXRZ, K1odN |

#### Por Contexto de Cor

| Cor | Hex | Uso | Exemplos |
|-----|-----|-----|----------|
| primary | #FF5C00 | Ícones ativos/destaque | afPV1 (nav ativo), 7WNHv (banner), dNNoM (gallery nav ativo) |
| success | #22C55E | Indicadores positivos | XFsMT, gnk4J, Em9Y0 (trending up) |
| danger | #EF4444 | Indicadores negativos | labez (trending down) |
| muted | #6B6B70 | Secundário/default | 44nr6, 45Osa, SWTXZ, 5e8Tl, 506iK, TGUHd |
| subtle | #8B8B90 | Placeholder texto | MudB3 (button icon) |
| placeholder | #4A4A4E | Placeholder imagem | rhGrx |
| white | #FFFFFF | CTAs, texto sobre cor | zKJ5d, dNNoM, H8qxs |

### 3.2 Ícones em Uso

| Nome | Uso | Tamanho | Cor |
|------|-----|---------|-----|
| layout-dashboard | Nav item ativo | md (18px) | primary |
| chart-line | Nav item | md (18px) | muted |
| users | Nav item | md (18px) | muted |
| package | Nav item | md (18px) | muted |
| file-text | Nav item | md (18px) | muted |
| settings | Nav item | md (18px) | muted |
| zap | Upgrade CTA | lg (20px) | white |
| chevron-up | Menu dropdown | sm (16px) | muted |
| chevron-left | Navegação | sm (16px) | muted |
| chevron-right | Navegação | sm (16px) | white (ativo) |
| download | Button | sm (16px) | subtle |
| plus | Button | sm (16px) | white |
| search | Search bar | sm (16px) | muted |
| trending-up | Indicador | xs (14px) | success |
| trending-down | Indicador | xs (14px) | danger |
| info | Banner | sm (16px) | primary |
| x | Dismiss | sm (16px) | muted |
| credit-card | List item | md (18px) | muted |
| image | Placeholder | xl (32px) | placeholder |

---

## 4. Design Tokens

### 4.1 Cores de Ícone (via contexto)

O componente Icon herda cores dos design tokens existentes:

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | #FF5C00 | Ícone ativo/destaque |
| `--color-success` | #22C55E | Indicadores positivos |
| `--color-danger` | #EF4444 | Indicadores negativos |
| `--color-muted` | #6B6B70 | Secundário |
| `--color-subtle` | #8B8B90 | Placeholder |
| `--color-placeholder` | #4A4A4E | Placeholder imagem |
| `--color-white` | #FFFFFF | CTAs, contraste |

### 4.2 Tamanhos

| Token | Valor | Uso |
|-------|-------|-----|
| `--icon-xs` | 14px | Indicadores, badges |
| `--icon-sm` | 16px | Botões, nav secundário |
| `--icon-md` | 18px | Nav, itens de lista |
| `--icon-lg` | 20px | CTAs, hero |
| `--icon-xl` | 32px | Placeholders, Empty states |

---

## 5. Interface TypeScript

```typescript
type IconName = 
  | 'layout-dashboard' | 'chart-line' | 'users' | 'package' 
  | 'file-text' | 'settings' | 'zap' | 'chevron-up' 
  | 'chevron-left' | 'chevron-right' | 'download' | 'plus' 
  | 'search' | 'trending-up' | 'trending-down' | 'info' 
  | 'x' | 'credit-card' | 'image';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  'aria-label'?: string;
  role?: 'presentation' | 'img';
}
```

---

## 6. Estrutura de Arquivos

```
frontend/src/components/
└── icon/
    ├── Icon.tsx              # Componente principal
```

---

## 7. Requisitos Funcionais

- RF-01: Componente deve renderizar qualquer ícone da família Lucide
- RF-02: Deve suportar 5 tamanhos predefinidos (xs, sm, md, lg, xl)
- RF-03: Cor deve ser definida via CSS/herança (currentColor)
- RF-04: Deve ser acessível (role, aria-label quando standalone)

---

## 8. Requisitos Não-Funcionais

- RNF-01: Bundle otimizado com tree-shaking (apenas ícones usados)
- RNF-02: Renderização vetorial (SVG)
- RNF-03: Suporte a temas (dark/light mode via cor herdada)
- RNF-04: Performance: usar `lucide-react` com dynamic imports opcional

---

## 9. Estados

| Estado | Comportamento |
|--------|---------------|
| Default | Exibe ícone com cor herdada |
| Hover | Herda hover do pai (ex: botão) |
| Focus | Outline definido pelo pai |
| Disabled | Opacity 50% via CSS do pai |

---

## 10. Dependências

### Design System (já implementado)
- Design tokens de cor
- Tokens de tamanho

### Externas
- `lucide-react` ou `@phosphor-icons/react`

---

## 11. Fora do Escopo

- Ícones animados (spinner é componente separado)
- Ícones customizados (não-Lib)
- Sprite SVG (optimizado para bundle)
- Tooltip automático (comportamento do pai)

---

## 12. Referências

- [Lucide Icons](https://lucide.dev/)
- [Radix UI Patterns](https://www.radix-ui.com/)
- [WAI-ARIA Icon Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/icon/)
