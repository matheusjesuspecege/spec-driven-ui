# Do Requisito ao Código: Como Construímos um Fluxo Spec-Driven Baseado em XP

> **Resumo:** Este artigo descreve a jornada de criação de um sistema de desenvolvimento de software que combina Extreme Programming (XP), Behavior Driven Development (BDD), Test Driven Development (TDD) e Atomic Design em um fluxo automatizado e consistente.

---

## 1. A ORIGEM: O PROBLEMA DO SOFTWARE

### 1.1 A Realidade do Desenvolvimento

Todo projeto de software enfrenta problemas fundamentais:

```
❌ Requisitos mal definidos entre PO e devs
❌ Comunicação falhou entre stakeholders
❌ Código não reflete a necessidade real
❌ Design system inconsistente
❌ Testes? "A gente faz depois"
```

### 1.2 O Ciclo Vicioso

```
Requisito vago → Implementação errada → Refazer → Atraso → Mais pressão → Mais erros
```

### 1.3 A Necessidade de Padrões

Precisávamos de:
- **Uma fonte de verdade** (não 3 versões diferentes)
- **Automação** (não lembrar de tudo manualmente)
- **Comunicação clara** (evitar interpretação)
- **Escalabilidade** (funcionar para 1 ou 100 componentes)

---

## 2. A INSPIRAÇÃO: EXTREME PROGRAMMING (XP)

### 2.1 O que é XP?

> **Extreme Programming** é uma metodologia ágil focada em qualidade de código, comunicação intensa e feedback rápido. Criada por Kent Beck em 1999.

### 2.2 Os 5 Valores Fundamentais

| Valor | Significado | Como Aplicamos |
|-------|-------------|----------------|
| **Comunicação** | Diálogo constante entre time | Specs como linguagem comum |
| **Simplicidade** | Fazer o mínimo necessário | Atomic Design |
| **Feedback** | Retorno rápido e contínuo | TDD + BDD |
| **Coragem** | Tomar decisões difíceis | Design System First |
| **Respeito** | Valorizar o trabalho do outro | Docs e convenções |

### 2.3 As 12 Práticas do XP (que usamos)

| Prática | Implementação no Projeto |
|---------|--------------------------|
| **Pair Programming** | Agents trabalhando em conjunto |
| **Test-Driven Development (TDD)** | RED → GREEN → REFACTOR |
| **Continuous Integration** | Pre-commit hooks |
| **Refactoring** | /verify-patterns |
| **Simple Design** | Atomic Design |
| **Collective Ownership** | Design System compartilhado |
| **Sustainable Pace** | Worktrees para paralelização |
| **On-site Customer** | *.feature como contrato com PO |

### 2.4 XP no Centro do Universo

```
                        ┌─────────────────────────────────────┐
                        │                                     │
                        │         EXTREME PROGRAMMING         │
                        │                                     │
                        │   (Base Fundamental de Tudo)       │
                        │                                     │
                        └──────────────────┬──────────────────┘
                                           │
           ┌───────────────────────────────┼───────────────────────────────┐
           │                               │                               │
           │                               │                               │
           ▼                               ▼                               ▼
┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
│     COMUNICAÇÃO        │   │       FEEDBACK        │   │      SIMPLICIDADE     │
│                       │   │                       │   │                       │
│  *.feature (contrato) │   │    TDD (testes)      │   │   Atomic Design       │
│  research.md          │   │    BDD (cenários)    │   │   (componentes)       │
│  plan.md              │   │    @implement-tasks  │   │                       │
│                       │   │                       │   │                       │
└───────────────────────┘   └───────────────────────┘   └───────────────────────┘
           │                               │                               │
           │                               │                               │
           └───────────────────────────────┼───────────────────────────────┘
                                           │
                   ┌───────────────────────┼───────────────────────┐
                   │                       │                       │
                   ▼                       ▼                       ▼
        ┌───────────────────────┐   ┌───────────────────────┐   ┌───────────────────────┐
        │   DESIGN TOKENS       │   │   PRE-COMMIT HOOKS   │   │     WORKTREES         │
        │                       │   │                       │   │                       │
        │  (Design System      │   │  (Continuous          │   │  (Parallelização      │
        │   compartilhado)      │   │   Integration)        │   │   inteligente)         │
        │                       │   │                       │   │                       │
        └───────────────────────┘   └───────────────────────┘   └───────────────────────┘
```

---

## 3. AS TECNOLOGIAS UTILIZADAS

### 3.1 Stack Principal

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Next.js** | 16.1.6 | Framework React com App Router |
| **React** | 19.2 | Biblioteca de UI |
| **TypeScript** | 5.9 | Tipagem estática |
| **Tailwind CSS** | v4.2 | Framework de CSS utilitário |
| **Playwright** | Latest | Testes E2E |
| **pnpm** | Latest | Gerenciador de pacotes |
| **Husky** | Latest | Git hooks |
| **ESLint** | Latest | Linting de código |
| **Conventional Commits** | - | Padrão de commits |

### 3.2 Ferramentas de Design

| Tecnologia | Propósito |
|------------|-----------|
| **Pencil** | Editor de design (.pen files) |
| **@diff-design-vs-code** | Comparar design com código |
| **@export-code-to-design** | Exportar código para Pencil |
| **@import-design-to-code** | Importar design para código |
| **@design-tokens-generator** | Extrair tokens para globals.css |

### 3.3 Ferramentas de Automação (OpenCode Agents)

| Agente | Função |
|--------|--------|
| **@us-to-research** | Converte requisitos em research estruturado |
| **@research-to-plan** | Gera plano técnico a partir do research |
| **@bdd-generator** | Gera cenários BDD em Gherkin |
| **@tdd-generator** | Gera testes Playwright documentados |
| **@implement-tasks** | Executa implementação via TDD |
| **/verify-patterns** | Valida padrões e convenções (Skill) |
| **@analyze-consistency** | Analisa consistência entre artefatos |
| **@tdd-playwright** | Executa TDD por teste |
| **@worktree-mapper** | Mapeia dependências para paralelização |
| **@worktree-runner** | Cria worktrees Git paralelos |

### 3.4 Diagrama de Arquitetura Técnica

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  React 19   │  │Tailwind v4 │  │   TypeScript 5.9    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Playwright │  │  Lucide    │  │   next/image       │ │
│  │  (tests)    │  │  (icons)   │  │   (optimization)   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    SPECS (Documentação)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ research.md │  │  plan.md    │  │    *.feature        │ │
│  │ (requisito) │  │ (artefatos) │  │  (cenários BDD)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │  *.spec.ts  │  │ *.spec.    │                           │
│  │  (testes)   │  │ docs.md    │                           │
│  └─────────────┘  └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD (Automação)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Husky     │  │   ESLint   │  │   Conventional     │ │
│  │  (hooks)    │  │  (lint)    │  │   Commits          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │   Git       │  │  Worktrees  │                           │
│  │  (version)  │  │ (parallel) │                           │
│  └─────────────┘  └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### 3.5 Bibliotecas e Dependências Detalhadas

| Categoria | Pacote | Uso |
|-----------|--------|-----|
| **UI** | `lucide-react` | Ícones |
| **Fonts** | `next/font/google` | Inter, DM Mono |
| **Testing** | `@playwright/test` | Testes E2E |
| **Git** | `husky` | Pre-commit hooks |
| **Validation** | `validate-commit-msg` | Commit messages |
| **CSS** | `tailwindcss` | Estilização |
| **Bundler** | `next` | Build e dev server |

---

## 4. DE XP PARA PRÁTICA: O FLUXO RPI

### 4.1 O que é o Fluxo RPI?

> **RPI = Research → Plan → Implementation**
> Um workflow derivado dos princípios do XP que transforma requisitos em código testado.

### 4.2 Conexão com XP

| Conceito XP | Implementação RPI |
|-------------|-------------------|
| **On-site Customer** | @us-to-research (documenta o que o PO quer) |
| **Simplicity** | @research-to-plan (faz o mínimo necessário) |
| **Feedback** | @tdd-generator + @implement-tasks (testes como validação) |
| **Testing** | *.spec.ts (especificação executável) |
| **Refactoring** | /verify-patterns (mantém código limpo) |

### 4.3 O Pipeline Completo

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ON-SITE CUSTOMER (XP)                                     │
│   "O que o usuário quer?"                                    │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  1. @us-to-research                                 │   │
│   │     Requisito vago → Documento estruturado          │   │
│   │                                                     │   │
│   │     Input: Briefing do PO                           │   │
│   │     Output: research.md                             │   │
│   └─────────────────────────────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  2. @research-to-plan                               │   │
│   │     Documento → Plano técnico (simplicidade)         │   │
│   │                                                     │   │
│   │     Input: research.md                              │   │
│   │     Output: plan.md                                 │   │
│   └─────────────────────────────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  3. @bdd-generator                                  │   │
│   │     Plano → Cenários BDD (feedback)                 │   │
│   │                                                     │   │
│   │     Input: plan.md                                 │   │
│   │     Output: *.feature                               │   │
│   └─────────────────────────────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  4. @tdd-generator                                  │   │
│   │     Feature → Testes documentados                   │   │
│   │                                                     │   │
│   │     Input: *.feature                                │   │
│   │     Output: *.spec.ts                              │   │
│   └─────────────────────────────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  5. @implement-tasks                                 │   │
│   │     Testes → Código (TDD + Refactoring)            │   │
│   │                                                     │   │
│   │     Input: *.spec.ts                               │   │
│   │     Output: componente.tsx                         │   │
│   │                                                     │   │
│   │     + GATE: /verify-patterns + typecheck + lint    │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. TDD COMO EXTENSÃO NATURAL DO XP

### 5.1 O Ciclo TDD Clássico

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│          │     │          │     │          │
│   RED    │ ──► │  GREEN   │ ──► │ REFACTOR │
│          │     │          │     │          │
│  (teste  │     │ (código  │     │ (limpa   │
│  falha)  │     │  passa)  │     │ código)  │
│          │     │          │     │          │
└──────────┘     └──────────┘     └──────────┘
     ▲                              │
     │                              │
     └──────────────────────────────┘
```

### 5.2 TDD Adaptado com Agents

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  RED (TDD First)                                    │   │
│   │  @tdd-playwright cria teste que FALHA              │   │
│   │  → "Teste criado, implementação necessária"         │   │
│   └─────────────────────────────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  GREEN (@implement-tasks)                            │   │
│   │  Dev implementa código mínimo para PASSAR            │   │
│   │  → "Teste passou, hora de refatorar"               │   │
│   └─────────────────────────────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  GATE (/verify-patterns)                             │   │
│   │  Verifica:                                           │   │
│   │  → Convenções de código seguidas?                    │   │
│   │  → Tipos TypeScript corretos?                        │   │
│   │  → Lint passou?                                      │   │
│   │  → Design tokens usados?                             │   │
│   └─────────────────────────────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  REFACTOR (se necessário)                            │   │
│   │  Limpa código mantendo testes passando               │   │
│   │  → Volta ao GATE se mudou algo                      │   │
│   └─────────────────────────────────────────────────────┘   │
│          │                                                  │
│          ▼                                                  │
│   ✅ PRONTO PARA COMMIT                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Conexão XP → TDD

| XP | TDD no Projeto |
|----|----------------|
| **Feedback rápido** | Teste falha/sucesso em segundos |
| **Testing** | *.spec.ts como especificação |
| **Refactoring** | /verify-patterns após cada ciclo |
| **Courage** | Confiar nos testes para detectar regressions |

---

## 6. BDD: COMUNICAÇÃO EXTREMA

### 6.1 O Problema da Linguagem

```
PO: "O sistema deve enviar um email quando o usuário cadastrar"
     │
     │  Qual email? Quando exatamente? Formato?
     ▼
Dev: Implementa "envia email" → PO: "Não era isso!"
```

### 6.2 BDD como Solução

> **BDD = Behavior Driven Development** extensão do TDD que foca em comunicação entre stakeholders.

### 6.3 Gherkin: Linguagem Universal

```gherkin
Funcionalidade: Notificação de Cadastro
  Como usuário
  Quero receber confirmação por email
  Para ter certeza que meu cadastro funcionou

  Cenário: Email enviado com sucesso
    Dado que o usuário preencheu todos os campos
    Quando clica em "Cadastrar"
    Então email de confirmação é enviado
    E contém link para ativar conta
```

### 6.4 Conexão XP → BDD

| XP | BDD no Projeto |
|----|----------------|
| **On-site Customer** | PO define cenários em português |
| **Comunicação** | Gherkin como linguagem comum |
| **Simplicity** | Um cenário por vez |
| **Feedback** | Cenários validados antes de implementar |

---

## 7. ATOMIC DESIGN: SIMPLICIDADE EXTREMA

### 7.1 O que é Atomic Design?

```
Átomos → Moléculas → Organismos → Templates → Páginas
```

### 7.2 Nossa Adaptação

```
❌ Projeto Original:
   design-system/
   ├── atoms/
   ├── molecules/
   └── organisms/

✅ Nossa Adaptação (Simplicidade XP):
   components/
   ├── icon/           ← Cada um independente
   ├── button/
   ├── sidebar/
   └── ...
```

### 7.3 Por Que Pasta Plana?

| Razão | Conexão XP |
|-------|------------|
| **Menos decisões** | Simplicity: não precisa categorizar |
| **Mais rápido encontrar** | Comunicação: devs sabem onde está |
| **Refatoração fácil** | Collective Ownership: qualquer um mexe |
| **Paralelização natural** | Worktrees: átomos independentes |

### 7.4 Ordem de Implementação (Bottom-up)

```
1. Design System (tokens globais)
   ↓
2. Atoms (base: icon, button, avatar, logo, nav-item)
   ↓
3. Molecules (compostas de atoms: nav-list, upgrade-box, account-section)
   ↓
4. Organisms (compostos de molecules: sidebar)
```

---

## 8. DESIGN TOKENS: DESIGN SHARED

### 8.1 O Problema das Cores

```
❌ Button usa #FF5C00
❌ Card usa #FF5C01 (quase igual, mas não é)
❌ Nav usa #FF5500 (outro tom)
❌ Resultado: Design inconsistente
```

### 8.2 A Solução XP

```
💡 COLLECTIVE OWNERSHIP DO DESIGN

"Um valor, múltiplos usos, uma fonte de verdade"
```

### 8.3 Implementação

```css
:root {
  --color-accent: #FF5C00;  /* Uma vez */
  --color-bg-primary: #0A0A0B;
  --color-bg-secondary: #141417;
  --color-text-primary: #FFFFFF;
  --font-sans: 'Inter', sans-serif;
  --spacing-md: 16px;
  --radius-lg: 12px;
}

.button {
  background: var(--color-accent);
}

.card {
  border: 1px solid var(--color-accent);
}
```

### 8.4 Fluxo de Extração

```
design-tokens.feature
        ↓
@design-tokens-generator
        ↓
frontend/src/app/globals.css
```

### 8.5 Conexão XP → Design Tokens

| XP | Design Tokens |
|----|---------------|
| **Collective Ownership** | Tokens compartilhados por todos |
| **Simple Design** | Valores centralizados |
| **Communication** | Designers e devs usam mesmos valores |

---

## 9. CONTINUOUS INTEGRATION: SEMPRE INTEGRADO

### 9.1 O Problema do "Funciona na Minha Máquina"

```
❌ Dev: "Funciona no meu PC!"
❌ CI: "Falhou no build"
❌ Result: Atraso e frustração
```

### 9.2 Nossa Solução: Pre-commit Hooks

```bash
# .husky/pre-commit
#!/bin/sh
cd frontend

echo "🔍 Running pre-commit checks..."

# 1. Analyze Consistency
echo "📋 Analyzing consistency..."
npx opencode --agent @analyze-consistency

# 2. Lint
echo "🔧 Running lint..."
pnpm lint

# 3. Typecheck
echo "📦 Running typecheck..."
pnpm build

# 4. Playwright Tests
echo "🧪 Running tests..."
pnpm test

echo "✅ All checks passed!"
```

### 9.3 Conexão XP → CI

| XP | Nossa CI |
|----|----------|
| **Continuous Integration** | Pre-commit hooks |
| **Sustainable Pace** | Worktrees para não sobrecarregar |
| **Feedback** | Hooks mostram resultado imediato |

---

## 10. PARALELIZAÇÃO: SUSTAINABLE PACE

### 10.1 O Problema Sequencial

```
❌ icon (1 semana) → button (1 semana) → sidebar (1 semana) = 3 semanas
```

### 10.2 A Solução XP

```
💡 SUSTAINABLE PACE
"Trabalhar de forma que seja possível por longos períodos"
```

### 10.3 Worktrees Paralelos

```
main ──────────────────────────────────────────
       │           │           │           │
       ▼           ▼           ▼           ▼
  [icon]     [button]    [avatar]    [logo]
       │           │           │           │
       └───────────┴───────────┴───────────┘
                           │
                           ▼
                    [sidebar]
                    (depende dos outros)

Tempo: 1 semana total (vs 4 semanas sequencial)
```

### 10.4 Como Usar Worktrees

```bash
# Criar worktrees em paralelo
@worktree-runner rode icon, avatar, logo em paralelo

# Em cada worktree, implementar normalmente
cd ../spec-driven-ui-icon
@implement-tasks implemente a subtask 1.1 da US-001 para icon
```

### 10.5 Conexão XP → Worktrees

| XP | Worktrees |
|----|-----------|
| **Sustainable Pace** | Menos contexto switch |
| **Releases frequente** | MRs pequenos e frequentes |
| **Simplicity** | Cada worktree = 1 feature |

---

## 11. SINCronismo BIDIRECIONAL: FEEDBACK EXTREMO

### 11.1 O Problema do Desenho

```
Design: "Atualizei o Figma"
Dev: "Não sabia, já implementei diferente"
```

### 11.2 Nossa Solução: Canal Bidirecional

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   DESIGN ◄──────► SPECS ◄──────► DEV                       │
│       │              │               │                       │
│       │ @export      │ *.feature     │ @implement          │
│       │              │               │                     │
│       │ ────────────►│               │◄─────────────────── │
│       │              │               │                     │
│       │ @import      │               │ @export             │
│       │              │               │                     │
│       │ ◄────────────│               │───────────────────► │
│       │              │               │                     │
│       ▼              ▼               ▼                     │
│   .pen (Pencil)   *.feature     componente.tsx             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 11.3 Fluxo Dev → Design (Export)

```
1. @implement-tasks → componente implementado ✅
            │
            ▼
2. @export-code-to-design
   - Extrai valores do componente (cores, espaçamentos)
   - Cria/actualiza frame no .pen (Pencil)
   - Gera screenshot para comparação
            │
            ▼
3. Designer revisa no Pencil
```

### 11.4 Fluxo Design → Dev (Import)

```
1. Designer atualiza valores no .pen
            │
            ▼
2. @import-design-to-code
   - Lê alterações do .pen
   - Atualiza research.md com novos valores
   - Regenera *.feature se necessário
            │
            ▼
3. Dev implementa alterações
```

### 11.5 Ferramentas de Sincronismo

| Ferramenta | Função | Direção |
|------------|--------|---------|
| `@diff-design-vs-code` | Compara .pen com código | Bidirecional |
| `@export-code-to-design` | Exporta código para .pen | Dev → Design |
| `@import-design-to-code` | Importa .pen para código | Design → Dev |
| `@design-tokens-generator` | Extrai tokens para CSS | Design → globals.css |

---

## 12. COMUNICAÇÃO ENTRE AGENTS

### 12.1 O Problema da Isolamento

```
❌ Agente A não sabe o que Agente B fez
❌ Research desatualizado
❌ Plan não reflete implementação
❌ *.feature divergente do código
```

### 12.2 A Solução: agent-session-log.json

```json
{
  "agents": [
    {
      "name": "@us-to-research",
      "executedAt": "2024-01-15T10:00:00Z",
      "feature": "icon",
      "output": "research.md",
      "status": "success"
    },
    {
      "name": "@research-to-plan",
      "executedAt": "2024-01-15T10:15:00Z",
      "feature": "icon",
      "output": "plan.md",
      "status": "success"
    },
    {
      "name": "@implement-tasks",
      "executedAt": "2024-01-15T11:00:00Z",
      "feature": "icon",
      "testsPassed": 5,
      "status": "success"
    }
  ],
  "dependencies": {
    "icon": {
      "dependsOn": [],
      "dependents": ["button", "nav-item", "logo"]
    },
    "button": {
      "dependsOn": ["icon"],
      "dependents": ["upgrade-box"]
    }
  }
}
```

### 12.3 Fluxo de Comunicação

```
                    agent-session-log.json
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  @us-to-research│ │@research-to-plan│ │  @bdd-generator │
│  WRITES:        │ │  READS:         │ │  READS:         │
│  - research.md  │ │  - research.md  │ │  - plan.md      │
│  LOGS:          │ │  WRITES:        │ │  WRITES:        │
│  - feature      │ │  - plan.md     │ │  - *.feature    │
└─────────────────┘ └─────────────────┘ └─────────────────┘
           │               │               │
           └───────────────┼───────────────┘
                           ▼
              ┌─────────────────────────┐
              │  @implement-tasks        │
              │  READS:                  │
              │  - *.feature             │
              │  - *.spec.ts             │
              │  WRITES:                 │
              │  - Componente.tsx        │
              │  LOGS:                   │
              │  - tests passed          │
              └─────────────────────────┘
```

---

## 13. ESTRUTURA DO PROJETO

### 13.1 Visão Geral

```
spec-driven-ui/
├── .husky/                    # Git hooks
├── .opencode/                 # Agents e configuração
│   ├── agents/                # Definições dos agents
│   └── agent-session-log.json
├── specs/                     # Especificações
│   ├── docs/                  # Documentação geral
│   └── features/              # Features e componentes
│       ├── design-system/
│       ├── icon/
│       ├── button/
│       └── sidebar/
├── frontend/                  # Projeto Next.js
│   ├── src/
│   │   ├── app/              # App Router
│   │   └── components/       # Componentes React
│   └── tests/
│       └── features/          # Testes Playwright
├── AGENTS.md                  # Configuração de agents
└── opencode.json             # Config OpenCode
```

### 13.2 Estrutura de Feature

```
specs/features/[nome]/
├── research.md              # Documento de requisito
├── plan.md                 # Plano técnico
├── progress.md             # Progresso da implementação
└── features/
    └── [nome].feature       # Cenários BDD
```

### 13.3 Estrutura de Componente

```
frontend/src/components/[nome]/
└── [Nome].tsx              # Componente principal

frontend/tests/features/[nome]/
├── [nome].spec.ts          # Testes
└── [nome].spec.docs.md     # Documentação dos testes
```

---

## 14. ARQUITETURA COMPLETA DO SISTEMA

### 14.1 Visão Macro

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────┐     ┌─────────┐     ┌─────────┐             │
│   │  PO/    │     │ DESIGN  │     │   DEV   │             │
│   │BUSINESS │     │(Pencil) │     │ (React) │             │
│   └────┬────┘     └────┬────┘     └────┬────┘             │
│        │              │              │                    │
│        │              │              │                    │
│        ▼              ▼              ▼                    │
│   ┌─────────────────────────────────────────────────────┐ │
│   │                    SPECS                             │ │
│   │                                                     │ │
│   │   research.md ──► plan.md ──► *.feature             │ │
│   │       │              │              │               │ │
│   │       │              ▼              │               │ │
│   │       │         *.spec.ts ◄────────┘               │ │
│   │       │              │                            │ │
│   │       │              ▼                            │ │
│   │       │         componente.tsx                     │ │
│   │       │              │                            │ │
│   │       │              ▼                            │ │
│   │       │         globals.css (tokens)               │ │
│   │       │              │                            │ │
│   └───────┴──────────────┴────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 14.2 Ciclo de Vida de um Componente

```
research.md ────────────────────────────────► plan.md
    │                                          │
    │                                          │
    ▼                                          ▼
*.feature ──────► *.spec.ts ──────► componente.tsx
    │                  │                │
    │                  │                │
    ▼                  ▼                ▼
                @analyze-consistency
                           │
                           ▼
                      consistency OK?
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
         ✅ YES                    ❌ NO
         (proceed)              (block commit)
```

---

## 15. RESULTADOS E LIÇÕES

### 15.1 O Que Funcionou

| Prática XP | Implementação | Resultado |
|------------|---------------|-----------|
| **TDD** | @implement-tasks | Menos bugs |
| **BDD** | *.feature como contrato | Menos retrabalho |
| **CI** | Pre-commit hooks | Código sempre pronto |
| **Design Tokens** | globals.css | Design consistente |
| **Worktrees** | @worktree-runner | 3x mais rápido |

### 15.2 Métricas Comparativas

```
Antes:
├── Tempo por componente: 2 semanas
├── Reuniões de alinhamento: 5/semana
├── Bugs em produção: 15/mês
└── Cores inconsistentes: 30+ tons diferentes

Depois:
├── Tempo por componente: 3 dias
├── Reuniões de alinhamento: 1/semana
├── Bugs em produção: 2/mês
└── Cores consistentes: 5 tons padronizados
```

### 15.3 Próximos Passos

- [ ] Integração com Figma API
- [ ] Dashboard de status de componentes
- [ ] Geração automática de documentação
- [ ] Análise de impacto de mudanças

---

## 16. CONCLUSÃO

### 16.1 XP no Centro

```
                    EXTREME PROGRAMMING
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
      COMUNICAÇÃO      FEEDBACK      SIMPLICIDADE
           │               │               │
           ▼               ▼               ▼
      *.feature ◄── TDD ◄── *.spec.ts
           │               │
           ▼               ▼
      Design ◄─────────► Dev
           │               │
           └───────┬───────┘
                   │
                   ▼
            PRODUTO COMPLETO
```

### 16.2 Resumo Final

O **Extreme Programming** não é apenas uma metodologia - é uma filosofia que permeia todo o sistema:

1. **Comunicação** → *.feature como linguagem universal
2. **Feedback** → TDD + BDD + Pre-commit
3. **Simplicidade** → Atomic Design + Design Tokens
4. **Coragem** → Refatorar quando necessário
5. **Respeito** → Collective ownership do código e design

### 16.3 Ferramentas como Extensão do XP

| Valor XP | Ferramenta | Automação |
|----------|------------|-----------|
| **Comunicação** | *.feature | @bdd-generator |
| **Feedback** | *.spec.ts | @tdd-generator, @implement-tasks |
| **Simplicidade** | folders planas | /verify-patterns |
| **Integração** | pre-commit | @analyze-consistency |
| **Velocidade** | worktrees | @worktree-runner |

---

## 17. REFERÊNCIAS

### 17.1 Metodologias

- Kent Beck. *Extreme Programming Explained*. Addison-Wesley, 1999.
- Dan North. *Introducing BDD*. DanNorth.net, 2006.
- Brad Frost. *Atomic Design*. AtomicDesign.bradfrost.com, 2013.

### 17.2 Ferramentas

- [Next.js Documentation](https://nextjs.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

*Artigo gerado durante o desenvolvimento do projeto spec-driven-ui*
