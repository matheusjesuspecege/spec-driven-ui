---
name: worktree-runner
description: "Cria worktree Git para uma feature. O worktree fica pronto para uso via implement-tasks. Use quando precisar isolar o desenvolvimento de uma feature em uma branch separada com seu próprio diretório."
license: MIT
compatibility: opencode
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "worktree"
    - "criar branch"
    - "criar worktree"
    - "isolar feature"
---

# Skill: Worktree Runner

## Quando Usar

Execute esta skill quando:
- Você precisa isolar o desenvolvimento de uma feature
- Quer trabalhar em uma branch separada
- Precisa de um diretório dedicado para a feature

```
@worktree-runner [feature]
```

Exemplo: `@worktree-runner button`

## Pré-requisitos

1. Estar no diretório principal do projeto (spec-driven-ui)
2. git pode estar dirty (será feito stash automático)
3. Branch atual será usada como base para a nova branch

---

## Passo a Passo

### Passo 1: Parse e Validação

1. Parsear a entrada para extrair nome da feature
2. Verificar para a feature:
   - `specs/features/[feature]/features/[feature].feature` existe
   - Branch `feat/[feature]` não existe
   - Diretório `../spec-driven-ui-[feature]` não existe

3. Se git tiver changes pendentes:
   - Executar `git stash push -m "worktree-runner backup"` automaticamente

4. Se alguma validação falhar (exceto git dirty):
   - Informar erro e abortar

### Passo 2: Setup do Worktree

1. Obter branch atual:
   ```bash
   CURRENT_BRANCH=$(git branch --show-current)
   ```

2. Criar worktree basada na branch atual:
   ```bash
   git worktree add ../spec-driven-ui-[feature] -b feat/[feature] ${CURRENT_BRANCH}
   ```

3. Instalar dependências:
   ```bash
   cd ../spec-driven-ui-[feature] && pnpm install
   ```

4. Restaurar changes (se houver stash):
   ```bash
   cd ../spec-driven-ui-[feature] && git stash pop || true
   ```

5. Confirmar criação

### Passo 4: Como Usar

Após o setup:

1. Entrar no worktree:
   ```bash
   cd ../spec-driven-ui-[feature]
   ```

2. Chamar implement-tasks:
   ```bash
   /implement-tasks [feature]
   ```

---

## Output

```
=== Setup Concluído ===

Feature: [nome]
Worktree: ../spec-driven-ui-[feature]
Branch: feat/[feature]

Para usar:
  cd ../spec-driven-ui-[feature]
  /implement-tasks [feature]
```

---

## Checklist

- [ ] Worktree criado com sucesso
- [ ] Dependências instaladas
- [ ] Relatório final apresentado
