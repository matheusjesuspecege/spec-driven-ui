---
name: bdd-generator
description: "Gera arquivos *.feature (Gherkin) a partir de research.md e plan.md. Converte User Stories em cenários BDD executáveis com Given-When-Then. Use quando o usuário solicitar geração de cenários de teste a partir de requisitos."
license: MIT
compatibility: opencode
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "gerar bdd"
    - "gerar cenários"
    - "bdd-generator"
    - "criar feature"
    - "gerar testes bdd"
---

# Skill: BDD Generator

## Quando Usar

Execute esta skill quando o usuário solicitar:

```
@bdd-generator feature=[nome-da-feature]
```

**Pré-requisitos:**
1. `specs/features/[feature]/research.md` deve existir e estar aprovado
2. `specs/features/[feature]/plan.md` deve existir (artefatos de alto nível)
3. Feature folder deve existir

## Início Rápido

1. Obter nome da feature da entrada do usuário
2. Verificar se .feature já existe (perguntar sobrescrita)
3. Verificar pré-requisitos (research.md, plan.md)
4. Ler e extrair User Stories e critérios de aceitação
5. Gerar cenários BDD (happy, rule, defensive, state, component)
6. Obter pencil_id via fluxo híbrido
7. Ordenar cenários por dependência (render → state → interaction → a11y)
8. Salvar arquivo .feature

---

## Passo a Passo

### Passo 1: Verificar .feature Existente

Verificar se `specs/features/${feature}/features/${feature}.feature` já existe.

- **Se existir**: Perguntar ao usuário: "O arquivo ${feature}.feature já existe. Deseja sobrescrever?"
  - Se NÃO: manter existente, não fazer alterações
  - Se SIM: prosseguir com geração (sobrescrever)
- **Se não existir**: Prosseguir com geração normalmente

> **Nota**: Para design-system, a verificação é por componente individual (atoms/*.feature, etc).

### Passo 2: Verificar Pré-requisitos

```typescript
// Verificar research.md
const researchPath = `specs/features/${feature}/research.md`;
if (!await fileExists(researchPath)) {
  return { error: 'research.md não encontrado. Execute @research-to-plan primeiro.' };
}

// Verificar plan.md
const planPath = `specs/features/${feature}/plan.md`;
if (!await fileExists(planPath)) {
  return { error: 'plan.md não encontrado. Execute @research-to-plan primeiro.' };
}
```

### Passo 3: Ler research.md

Extrair do research.md:
- User Stories
- Critérios de aceitação
- Contextos (desktop/mobile/a11y)

**Formato esperado:**
```markdown
### US-001: Título
**Descrição:** Como... eu quero... para que...
**Critérios de aceitação:**
- AC1
- AC2
```

### Passo 4: Ler plan.md

Extrair do plan.md:
- Artefatos de alto nível
- Tipos/interfaces
- Estrutura de arquivos

### Passo 5: Identificar Contextos e Tags

Usar [references/TAGS_PATTERNS.md](references/TAGS_PATTERNS.md) para mapear contextos.

### Passo 6: Mapear AC para Given-When-Then

Usar [references/SCENARIO_TEMPLATES.md](references/SCENARIO_TEMPLATES.md) para mapeamento.

### Passo 7: Identificar Constants

Valores que serão placeholders (ex: HEADER_HEIGHT, NAV_COUNT, BREAKPOINT).

Consulte [references/CONSTANTS_PATTERNS.md](references/CONSTANTS_PATTERNS.md).

### Passo 8: Gerar Cenários

Para cada User Story, gerar:

1. **Cenários Happy Path** (fluxo normal)
2. **Cenários de Regras de Negócio** (@rule) - MANDATÓRIO para operações críticas
3. **Cenários de Proteção** (@defensive) - MANDATÓRIO para Lei de Murphy
4. **Cenários de Estados** (@state) - MANDATÓRIO para ações assíncronas
5. **Cenários de Componentes** (@component)

### Passo 9: Obter pencil_id (Fluxo Híbrido)

Fluxo de prioridade:
1. research.md tem `pencil_id`? → Usar ID do research
2. plan.md tem `pencil_id`? → Usar ID do plan
3. Pencil MCP disponível? → Buscar por nome do componente
4. Não encontrou → Perguntar ao usuário (buscar/ignorar/informar ID)

### Passo 10: Ordenar Cenários por Dependência

**Ordem:** render → state → interaction → a11y

Consulte [references/DEPENDENCY_ORDER.md](references/DEPENDENCY_ORDER.md).

### Passo 11: Salvar .feature

Criar diretório `features/` e salvar `specs/features/[feature]/features/[feature].feature`.

---

## Design System - Geração Especial

Quando a feature é `design-system`, a estrutura de saída é diferente:

```
specs/features/design-system/features/
├── design-tokens.feature     # Testa CSS vars (SEM pencil_id)
├── atoms/
│   ├── button.feature       # pencil_id: "btn001"
│   ├── badge.feature
│   └── input.feature
├── molecules/
│   ├── card.feature
│   └── search-bar.feature
└── organisms/
    ├── sidebar.feature
    └── summary-cards.feature
```

Consulte [references/DESIGN_SYSTEM_TEMPLATES.md](references/DESIGN_SYSTEM_TEMPLATES.md).

---

## Regras

1. **Não inventar cenários** - apenas mapear AC existentes
2. **Usar placeholders** - constants devem ser placeholders (HEADER_HEIGHT, NAV_COUNT)
3. **Tags consistentes** - @desktop, @mobile, @a11y
4. **Iniciar @pending** - todos cenários começam @pending
5. **Given-When-Then** - usar linguagem natural em português
6. **Regras de Negócio (@rule)** - MANDATÓRIO para operações críticas
7. **Proteção (@defensive)** - MANDATÓRIO para Lei de Murphy
8. **Estados (@state)** - MANDATÓRIO para ações assíncronas
9. **Ordenação por dependência** - Cenários ordenados via inferência

---

## Output

```
✅ BDD gerado para feature [nome]

Arquivos criados:
- specs/features/[feature]/features/[feature].feature

pencil_id: [ID] (fonte: [research|pencil|user])

Cenários gerados: N (ordenados por dependência: render → state → interaction → a11y)
- @desktop: X
- @mobile: Y
- @a11y: Z
```

---

## Validações

Antes de salvar, verificar:

- [ ] Todos os critérios de aceitação estão mapeados
- [ ] Cenários têm Given-When-Then completos
- [ ] Tags de contexto estão corretas (@desktop, @mobile, @a11y)
- [ ] Placeholders para constants estão corretos
- [ ] Sintaxe Gherkin está válida
- [ ] Cenários @rule estão presentes para operações críticas
- [ ] Cenários @defensive estão presentes para Lei de Murphy
- [ ] Cenários @state estão presentes para loading/erro/sucesso
- [ ] pencil_id foi obtido
- [ ] Cenários ordenados por dependência
