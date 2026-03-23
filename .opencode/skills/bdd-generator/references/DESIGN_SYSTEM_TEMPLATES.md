# Design System Templates

Templates especiais para geração de cenários BDD do Design System.

## Estrutura de Saída

```
specs/features/design-system/features/
├── design-tokens.feature     # Testa CSS vars (SEM pencil_id)
├── atoms/
│   ├── button.feature
│   ├── badge.feature
│   ├── input.feature
│   ├── avatar.feature
│   └── icon.feature
├── molecules/
│   ├── card.feature
│   ├── search-bar.feature
│   ├── breadcrumbs.feature
│   ├── pagination.feature
│   ├── banner.feature
│   └── quick-actions.feature
└── organisms/
    ├── sidebar.feature
    ├── summary-cards.feature
    ├── chart-section.feature
    ├── table-section.feature
    ├── gallery-section.feature
    └── stacked-list.feature
```

## Regras por Categoria

| Categoria | pencil_id | O que Testa |
|-----------|-----------|--------------|
| design-tokens | N/A | CSS vars em globals.css |
| atoms | ✅ Sim | Componente vs design tokens |
| molecules | ✅ Sim | Componente vs design tokens |
| organisms | ✅ Sim | Componente vs design tokens |

## Template: design-tokens.feature

```gherkin
# language: pt
@pending @design-tokens
Funcionalidade: Design Tokens
  **referencia:** Design tokens do sistema

  @pending @smoke
  Cenário: Cores primárias definidas corretamente
    Dado que o CSS está configurado
    Entao --color-bg-primary deve ser #0A0A0B
    E --color-bg-secondary deve ser #141417
    E --color-accent deve ser #FF5C00
```

## Template: atoms (button.feature)

```gherkin
# language: pt
@pending @atom
Funcionalidade: Button
  **pencil_id:** "btn001"

  @pending @smoke
  Cenário: Button primário com estilo correto
    Dado que o componente Button é renderizado
    Quando tem variant="primary"
    Entao deve ter background #FF5C00
    E deve ter border-radius 8px
    E deve ter padding 12px vertical, 16px horizontal
```

## Template: molecules (card.feature)

```gherkin
# language: pt
@pending @molecule
Funcionalidade: Card
  **pencil_id:** "card001"

  @pending @smoke
  Cenário: Card renderiza com título e conteúdo
    Dado que o componente Card é renderizado
    Quando tem título e conteúdo
    Entao o título é exibido
    E o conteúdo é exibido
    E o card tem border-radius 12px
```

## Cenários Obrigatórios por Categoria

### design-tokens

- Cores primárias
- Cores semânticas (success, error, warning)
- Tipografia
- Spacing scale
- Border radius scale
- Shadows (se houver)

### atoms

- Renderização correta
- Variants (primary, secondary, ghost)
- Estados (hover, focus, disabled)
- Tamanhos (sm, md, lg)

### molecules

- Composição de átomos
- Estilos herdados dos átomos
- Layout interno
- Estados

### organisms

- Composição de moléculas
- Layout e posicionamento
- Estilos consistentes
- Responsividade (se aplicável)

## Fluxo para Design System

```
1. Detectar: feature === 'design-system'
2. Criar estrutura de diretórios
3. Gerar design-tokens.feature (sem pencil_id)
4. Para cada componente no plan.md:
   - Determinar categoria (atom/molecule/organism)
   - Extrair pencil_id
   - Gerar .feature com pencil_id
```
