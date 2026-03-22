# Arquitetura do Projeto

## Raiz do Projeto

| Pasta/Arquivo | Descrição |
|--------------|-----------|
| `.husky/` | Git hooks (pre-commit + commit-msg) |
| `.opencode/` | Configuração e agentes do OpenCode |
| `frontend/` | Projeto Next.js principal |
| `specs/` | Especificações e documentação do projeto |
| `AGENTS.md` | Configuração do agente principal |
| `opencode.json` | Configuração do OpenCode |
| `.opencode/agent-session-log.json` | Aprendizados da sessão (versionado) |

---

## frontend/ — Projeto Next.js

| Arquivo/Pasta | Descrição |
|--------------|-----------|
| `src/app/` | Next.js App Router (páginas) |
| `src/components/` | Componentes React |
| `tests/features/` | Testes E2E Playwright por feature |
| `playwright.config.ts` | Configuração do Playwright |
| `next.config.ts` | Configuração do Next.js |
| `eslint.config.mjs` | Configuração do ESLint |
| `postcss.config.mjs` | Configuração do PostCSS |
| `tsconfig.json` | Configuração TypeScript |

## specs/ — Especificações

| Pasta | Descrição |
|-------|-----------|
| `docs/` | Documentação geral do projeto |
| `features/` | Especificações por feature |

### specs/features/ — Estrutura de Features

Cada feature tem **pasta própria** com fluxo RPI completo:

```
specs/features/
├── design-system/              # Design System (tokens globais)
│   ├── research.md
│   ├── plan.md
│   └── features/
│       └── design-tokens.feature  # Tokens GLOBAIS│
├── [nome-da-feature]/          # Features normais
│   ├── research.md
│   ├── plan.md
│   └── features/
│       └── [nome].feature
```

### frontend/src/components/ — Estrutura de Componentes

Componentes em **pasta plana** (sem separação por tipo):

```
frontend/src/components/
├── nav-item/
│   └── nav-item.tsx
```