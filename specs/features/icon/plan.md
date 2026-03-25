# Plan: Icon Component

> Gerado a partir de: `specs/features/icon/research.md`
> Foco: Frontend (átomo de Design System)

## 1. Visão Geral Técnica

O componente **Icon** é um átomo de Design System que encapsula a renderização de ícones da biblioteca Lucide React. Suporta 5 tamanhos predefinidos (xs, sm, md, lg, xl), utiliza herança de cor via CSS (`currentColor`) e é acessível por padrão. O bundle é otimizado via tree-shaking, importando apenas os ícones utilizados.

---

## 2. Estrutura de Arquivos

```
src/
└── components/
      └── icon/
            ├── icon.tsx              # criado - componente principal
```

**Legenda:**
- `# criado` — arquivo novo
- `# modificado` — arquivo existente com alterações

---

## 3. Contratos de API

**N/A** — Componente puramente front-end (átomo UI). Não consome APIs externas.

---

## 4. Tipos e Interfaces

```typescript
// src/components/icon/icon.tsx

type IconName =
  | 'layout-dashboard'
  | 'chart-line'
  | 'users'
  | 'package'
  | 'file-text'
  | 'settings'
  | 'zap'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'download'
  | 'plus'
  | 'search'
  | 'trending-up'
  | 'trending-down'
  | 'info'
  | 'x'
  | 'credit-card'
  | 'image';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

```

### Design Tokens Utilizados

```typescript
// Mapeamento de tamanho para pixel
const iconSizeMap: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 32,
};
```

---

## 5. Props de Componentes

```typescript
// src/components/icon/Icon.tsx

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  'aria-label'?: string;
  role?: 'presentation' | 'img';
}
```

| Prop | Tipo | Required | Default | Descrição |
|------|------|----------|---------|-----------|
| `name` | `IconName` | ✅ | - | Nome do ícone Lucide |
| `size` | `IconSize` | ❌ | `'md'` | Tamanho predefinido |
| `className` | `string` | ❌ | `undefined` | Classes CSS extras |
| `aria-label` | `string` | ❌ | `undefined` | Label para acessibilidade |
| `role` | `'presentation' \| 'img'` | ❌ | `'presentation'` | Role ARIA |

---

## 6. Hooks e Serviços

**N/A** — Componente stateless sem lógica de dados.

---

## 7. Diagrama de Dependências

```
[design-tokens.feature] ──► [icon.tsx]
```

**Regra:** `──►` significa "depende de / deve existir antes".

### Dependências Externas

| Dependência | Versão | Propósito |
|-------------|--------|----------|
| `lucide-react` | ^0.300+ | Biblioteca de ícones |

---

## 8. Questões em Aberto

- [ ] Expandir lista de ícones conforme demanda dos componentes? (iniciar com os 19 do research)
- [ ] Adicionar suporte a `strokeWidth` customizável?
- [ ] Criar wrapper para icon-only buttons com tooltip?

---

## 9. Checklist de Implementação

### RFs Cobertos

| RF | Descrição | Artefato |
|----|-----------|----------|
| RF-01 | Renderizar ícones Lucide | `Icon.tsx` via `lucide-react` |
| RF-02 | 5 tamanhos predefinidos | `iconSizeMap` em `Icon.tsx` |
| RF-03 | Cor via CSS (currentColor) | Comportamento padrão do SVG |
| RF-04 | Acessibilidade | `role` e `aria-label` props |

### RNFs Cobertos

| RNF | Descrição | Implementação |
|-----|-----------|---------------|
| RNF-01 | Tree-shaking | Importação nomeada de `lucide-react` |
| RNF-02 | SVG vetorial | Componente SVG nativo |
| RNF-03 | Suporte a temas | `currentColor` herda do contexto |
| RNF-04 | Performance | Componente leve, sem estado |

---

## 10. Estrutura do Component

```tsx
// Pseudocódigo icon.tsx
import { [IconName] } from 'lucide-react';

export function Icon({ name, size = 'md', ...props }: IconProps) {
  const pixelSize = iconSizeMap[size];  
  return (<div {...props}></div>)
}
```

---

## 11. Testes (TDD)

Arquivos de teste a serem criados:
- `icon.spec.ts` — Testes de renderização por tamanho e nome
- `icon.spec.docs.md` — Documentação dos casos de teste

---

## 12. Fora do Escopo

- Ícones animados (usar `Spin` ou `Pulse` component separado)
- Ícones customizados (não-Lib)
- Sprite SVG optimization
- Tooltip automático
