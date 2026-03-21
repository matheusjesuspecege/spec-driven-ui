# AGENTS.md

## ⚠️ PRIORIDADE MÁXIMA

Leia primeiro: `@specs/docs/guardrails.md`

---

## 🚀 Início de Sessão

1. `@specs/docs/guardrails.md`
2. `.opencode/agent-session-log.json`
3. `@specs/docs/convencoes-codigo.md`
4. `@specs/docs/padroes-git.md`

---

## 🧠 Agentes

| Agente | Função |
|--------|--------|
| `@us-to-research` | Converte US em research.md |
| `@research-to-plan` | Gera plano de ação |
| `@bdd-generator` | Gera cenários BDD (*.feature) |
| `@tdd-generator` | Gera testes *.spec.ts |
| `@implement-tasks` | Implementa código via TDD |
| `@verify-patterns` | Valida padrões e convenções |
| `@analyze-consistency` | Analisa consistência entre artefatos |
| `@design-tokens-generator` | Extrai tokens → globals.css |
| `@diff-design-vs-code` | Compara design com código |
| `@export-code-to-design` | Exporta código para Pencil |
| `@import-design-to-code` | Importa design aprovado |
| `@tdd-playwright` | Executa TDD por teste |
| `@worktree-mapper` | Mapeia dependências entre componentes |
| `@worktree-runner` | Cria worktrees Git paralelos |

---

## 📚 Referências

| Tópico | Arquivo |
|--------|---------|
| Arquitetura e Fluxos | `@specs/docs/architecture.md` |
| Tecnologias | `@specs/docs/tecnologias.md` |
| Convenções de código | `@specs/docs/convencoes-codigo.md` |
| Guardrails | `@specs/docs/guardrails.md` |
| Padrões git | `@specs/docs/padroes-git.md` |

---

## ⚓ Pre-commit

1. **commit-msg**: Validação Conventional Commits
2. **pre-commit**: Playwright Tests
