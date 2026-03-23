# Agentes Disponíveis: Guia de Referência

## Índice

1. [Fluxo de Feature](#1-fluxo-de-feature)
2. [Agents de Geração](#2-agents-de-geração)
3. [Agents de Design](#3-agents-de-design)
4. [Agents Utilitários](#4-agents-utilitários)
5. [Quick Reference](#5-quick-reference)

---

## 1. Fluxo de Feature

```
    PO/Requisito
        │
        ▼
┌─────────────────┐
│ us-to-research  │ ← Converte requisitos em research.md
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ research-to-plan │ ← Gera plano técnico (plan.md)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  bdd-generator  │ ← Gera cenários BDD (*.feature)
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ analyse-consistency  │ ← Valida consistência (opcional)
└────────┬────────────┘
         │
         ▼
┌─────────────────┐
│ tdd-generator   │ ← Gera testes Playwright
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ implement-tasks │ ← Implementa código + testes
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  tdd-playwright │ ← Ciclo RED→GREEN
└────────┬────────┘
         │
         ▼
     ┌───────┐
     │ GATE  │ ← verify-patterns + tsc + lint
     └───────┘
         │
         ▼
        PR 🎉
```

---

## us-to-research

**Purpose:** Converte requisitos abstratos do PO em `research.md` estruturado.

**Quando usar:**
- Recebe User Story ou briefing de feature não-técnica
- Necessita traduzir para linguagem de desenvolvimento

**Como invocar:**
```
@us-to-research Desenvolver um Dashboard de Analytics com tema escuro...
```

**Input:** Requisito do PO, decisões (mock vs real API, etc)

**Output:** `specs/features/[feature]/research.md`

---

## research-to-plan

**Purpose:** Gera documento de Plan técnico a partir do `research.md`.

**Quando usar:**
- Após `research.md` estar aprovado
- Necessita mapear artefatos, interfaces, componentes

**Como invocar:**
```
@research-to-plan specs/features/dashboard-analytics/research.md
Decisões: bottom-up, mock data, Sidebar primeiro, cores #0A0A0B
```

**Output:** `specs/features/[feature]/plan.md`

---

## bdd-generator

**Purpose:** Gera arquivos `*.feature` (Gherkin) a partir de `research.md` e `plan.md`.

**Quando usar:**
- Após `plan.md` estar aprovado
- Necessita cenários BDD para testes

**Como invocar:**
```
@bdd-generator specs/features/dashboard-analytics/research.md specs/features/dashboard-analytics/plan.md
```

**Output:** `specs/features/[feature]/features/*.feature`

---

## analyse-consistency

**Purpose:** Análise de consistência entre `research.md`, `plan.md` e `*.feature`.

**Quando usar:**
- Após gerar arquivos `.feature`
- Antes de iniciar implementação

**Como invocar:**
```
@analyse-consistency Verifique a consistência da feature dashboard-analytics
```

**Output:** Relatório de inconsistências (READ-ONLY)

---

## tdd-generator

**Purpose:** Gera testes Playwright documentados a partir dos `*.feature`.

**Quando usar:**
- Após `*.feature` estar pronto
- Necessita criar testes E2E antes da implementação

**Como invocar:**
```
@tdd-generator specs/features/dashboard-analytics/features/sidebar.feature
```

**Output:**
- `frontend/tests/features/[feature]/[feature].spec.ts`
- `frontend/tests/features/[feature]/[feature].spec.docs.md`

---

## implement-tasks

**Purpose:** Executa uma subtask específica de uma User Story.

**Quando usar:**
- Task específica atribuída a você
- Implementação código + testes

**Como invocar:**
```
@implement-tasks implemente a subtask 1.2 da US-001 para dashboard-analytics
```

**Fluxo interno:**
```
1. Lê docs de convenções (guardrails, convencoes-codigo)
2. Lê contexto da feature (*.feature, plan.md)
3. Cria/atualiza branch: feat/[feature]/[us-id]
4. Gera teste (*.spec.ts) → RED
5. Implementa código mínimo → GREEN
6. Executa gate (verify-patterns, tsc, eslint)
7. Atualiza progress.md
8. Retorna para revisão humana
```

---

## verify-patterns

**Purpose:** Verifica se código segue convenções do projeto.

**Quando usar:**
- Parte do GATE antes de commit
- Após implementação de código

**Como invocar:**
```
/verify-patterns Verifique o componente Sidebar
```

**Verificações:**
- Props tipadas (sem `any`)
- Sem `style={{}}` inline
- Sem `console.log`
- Nomenclatura correta (kebab-case)

---

## 2. Agents de Geração

## tdd-playwright

**Purpose:** Executa ciclo TDD (RED → GREEN) para uma subtask específica.

**Quando usar:**
- Implementando uma task específica
- Ciclo de desenvolvimento TDD

**Como invocar:**
```
@tdd-playwright Crie o teste e implementação para "Sidebar exibe logo no topo"
```

**Fluxo:**
```
1. RED: Cria teste que falha
2. GREEN: Implementa código mínimo para passar
3. REFACTOR: Melhora código mantendo comportamento
```

---

## design-tokens-generator

**Purpose:** Extrai tokens do design (`.pen`) para `globals.css`.

**Quando usar:**
- Após design ser aprovado
- Necessita gerar tokens CSS

**Como invocar:**
```
@design-tokens-generator Extraia tokens do designs/dashboard.pen
```

**Output:** Tokens em `globals.css`

---

## 3. Agents de Design

## export-code-to-design

**Purpose:** Envia código React para o `.pen` do Pencil.

**Quando usar:**
- Após implementação de página
- Deseja criar prototype visual

**Como invocar:**
```
@export-code-to-design Exporte o código da página dashboard para designs/dashboard.pen
```

---

## import-design-to-code

**Purpose:** Importa design validado do Pencil para código.

**Quando usar:**
- Design foi revisado e ajustado no Pencil
- Necessita atualizar código fonte

**Como invocar:**
```
@import-design-to-code Atualize o código com as alterações do dashboard.pen
```

---

## diff-design-vs-code

**Purpose:** Compara `.pen` com código existente.

**Quando usar:**
- Antes de importar design
- Identificar gaps entre spec e implementação

**Como invocar:**
```
@diff-design-vs-code Compare designs/dashboard.pen com implementação atual
```

---

## 4. Agents Utilitários

## worktree-runner

**Purpose:** Cria Git worktrees para trabalho paralelo.

**Quando usar:**
- Múltiplas features simultâneas
- Necessita branches isoladas

**Como invocar:**
```
@worktree-runner Crie worktrees para dashboard e home-imobiliaria
```

---

## worktree-mapper

**Purpose:** Mapeia dependências entre componentes.

**Quando usar:**
- Antes de criar worktrees
- Identificar ordem de implementação

**Como invocar:**
```
@worktree-mapper Analise dependências da feature dashboard
```

---

## agent-learnings-runner

**Purpose:** Registra incidents e aprendizados durante a sessão.

**Quando usar:**
- Início de cada sessão (automático)
- Final da sessão para consolidação

**Input:** `agent-learnings.json`, conversa atual

**Output:** Insights em `.opencode/agent-session-log.json`

---

## 5. Quick Reference

### Tabela Resumo

| Agent | Input | Output | Quando Usar |
|-------|-------|--------|-------------|
| `us-to-research` | Requisito PO | research.md | Recebeu US do PO |
| `research-to-plan` | research.md | plan.md | Research aprovado |
| `bdd-generator` | research + plan | *.feature | Plan aprovado |
| `analyse-consistency` | research + plan + *.feature | Relatório | Validar artefatos |
| `tdd-generator` | *.feature | *.spec.ts | Precisa de testes |
| `implement-tasks` | *.feature + plan | Código + Testes | Vou implementar |
| `tdd-playwright` | Task | RED→GREEN | Ciclo TDD |
| `verify-patterns` | Código | Validação | Validar código |
| `design-tokens-generator` | .pen | globals.css | Extrair tokens |
| `export-code-to-design` | Código | .pen | Exportar para design |
| `import-design-to-code` | .pen | Código | Importar design |
| `diff-design-vs-code` | .pen + Código | Diff | Comparar design |
| `worktree-runner` | Features | Worktrees | Criar worktrees |
| `worktree-mapper` | Features | Dependências | Mapear deps |

---

### Atalhos por Situação

| Situação | Agent a Usar |
|----------|--------------|
| Recebi requisito do PO | `@us-to-research` |
| Research aprovado | `@research-to-plan` |
| Plan aprovado | `@bdd-generator` |
| Preciso validar artefatos | `@analyse-consistency` |
| Preciso de testes | `@tdd-generator` |
| Vou implementar | `@implement-tasks` |
| Ciclo TDD | `@tdd-playwright` |
| Validar código | `/verify-patterns` |
| Extrair tokens | `@design-tokens-generator` |
| Criar worktrees | `@worktree-runner` |
| Mapear dependências | `@worktree-mapper` |
| Exportar para design | `@export-code-to-design` |
| Importar design | `@import-design-to-code` |
| Comparar design vs código | `@diff-design-vs-code` |
