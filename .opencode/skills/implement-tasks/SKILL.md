---
name: implement-tasks
description: "Implementa código via TDD seguindo fluxo estruturado: 1 teste por iteração. Sempre segue 3 checkpoints obrigatórios: 1) Ativar/Planejar, 2) Revisar código, 3) Próximo. NUNCA pule checkpoints. Registra aprendizados no progress.md após cada iteração. Use quando o usuário solicitar implementação de código com TDD supervisionado."
license: MIT
compatibility: opencode
metadata:
  version: "1.2"
  user-invocable: true
  triggers:
    - "implementar"
    - "codar"
    - "implement tasks"
    - "tdd"
---

# Skill: Implement Tasks

## Quando Usar

Execute esta skill quando:
- O usuário solicitar implementação de código via TDD
- Houver uma feature com testes `.spec.ts` pendentes (`test.skip()`)
- For necessário supervisionar implementação com checkpoints humanos

## Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    IMPLEMENT-TASKS: FEATURE=[NOME]                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  INÍCIO DA SESSÃO (UMA VEZ)                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Ler specs/docs/convencoes-codigo.md                                     │
│  2. Ler specs/docs/guardrails.md                                             │
│  3. Verificar se specs/features/[feature]/progress.md existe:              │
│     - Se EXISTE → ler conteúdo                                              │
│     - Se NÃO EXISTE → criar arquivo com template vazio                      │
│  4. Identificar a feature a trabalhar                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DETECTAR PRÓXIMO TESTE                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Ler frontend/tests/features/[feature]/[feature].spec.ts                │
│  2. Encontrar primeiro test.skip('                                          │
│  3. Extrair nome do teste                                                   │
│  4. Se não existir SKIP → todos implementados ✅ → encerrar               │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  📋 CHECKPOINT 1: "Ativar e implementar [nome-do-teste]?"                  │
│  ⚠️ OBRIGATÓRIO - usar ferramenta question                                   │
│                                                                              │
│  Mostrar:                                                                    │
│  - Cenário BDD correspondente                                                │
│  - Aprendizados relevantes do progress.md                                  │
│  - Próximos passos se SIM                                                  │
│                                                                              │
│  Opções:                                                                     │
│    ├─ SIM                                                                    │
│    └─ NÃO                                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                           ┌─────────┴─────────┐
                           ▼                   ▼
                     ┌───────────┐      ┌──────────────┐
                     │    SIM    │      │     NÃO      │
                     └─────┬─────┘      │   Aguardar   │
                           │              └──────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⚠️ APÓS RESPOSTA "SIM":                                                    │
│  - PAUSAR e aguardar confirmação explícita para continuar                  │
│  - NÃO avance automaticamente para implementação                           │
│  - Aguarde o humano dizer "Pode continuar" ou equivalente                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  IMPLEMENTAÇÃO DO TESTE (1 teste por iteração)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. REMOVER SKIP: Editar spec.ts - test.skip( → test(                     │
│  2. PLANEJAR: Entender o que o teste espera                                 │
│     - Quais tokens?                                                         │
│     - Quais assertions?                                                     │
│  3. Adicionar o componente no test-ds page se necessário                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  TDD LOOP                                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                               │
│  │   RED    │──▶│  GREEN   │──▶│ REFACTOR │                               │
│  │          │   │          │   │          │                               │
│  │ Teste    │   │ Código   │   │ Melhorar │                               │
│  │ falha    │   │ passa    │   │ se needed│                               │
│  └──────────┘   └──────────┘   └──────────┘                               │
│                                                                             │
│  RED:   npx playwright test --grep "[nome-teste]" → deve falhar           │
│  GREEN: Implementar código → deve passar                                   │
│  REFACTOR: Melhorar código se necessário                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  GIT STASH (após GREEN, antes da revisão)                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. git stash push -m "implement-tasks: [nome-teste]"                     │
│  2. Armazenar nome do stash para comparação posterior                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  📋 REVISAR CÓDIGO GERADO                                                  │
│  ⚠️ OBRIGATÓRIO - usar ferramenta question                                   │
│                                                                              │
│  Mostrar:                                                                    │
│  - Código atual do componente                                              │
│  - Testes passando (X/Y)                                                   │
│  - Pendente implementar                                                    │
│                                                                              │
│  Opções:                                                                     │
│    ├─ ✅ OK          → Confirmar e continuar                                │
│    ├─ 🔧 FAZER AJUSTES→ Corrigir o código gerado                          │
│    ├─ ↩️ REFAZER     → Descartar e reimplementar                          │
│    └─ ⏹️ SAIR        → Encerrar sessão                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                 ┌─────────────────────┼─────────────────────┐
                 ▼                     ▼                     ▼
          ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
          │     ✅ OK    │      │ 🔧 FAZER     │      │ ↩️ REFAZER   │
          │              │      │   AJUSTES    │      │              │
          └──────┬───────┘      └──────┬───────┘      └──────┬───────┘
                 │                     │                     │
                 ▼                     ▼                     ▼
┌─────────────────────────┐ ┌─────────────────────────────────────────────┐ ┌──────────────────┐
│  /verify-patterns       │ │  INSTRUÇÕES PARA CORREÇÕES                  │ │  REFATORAR       │
│                         │ │                                             │ │  CÓDIGO          │
│  Se OK → Registrar +    │ │  1. Faça as correções nos arquivos         │ │                  │
│  Commit                 │ │  2. Quando terminar, digite "PRONTO"       │ │  Após refatorar: │
│                         │ │                                             │ │  →Perguntar      │
│  Se FALHOU →            │ │  Após "PRONTO":                            │ │    "Revisar      │
│  - Mostrar erros        │ │  1. Comparar código IA vs seu código       │ │   novamente?"    │
│  - Pedir instruções    │ │  2. Atualizar progress.md                   │ │                  │
│                         │ │  3. Verificar padrões                      │ │                  │
│                         │ │  4. Commit                                 │ │                  │
└─────────────────────────┘ └─────────────────────────────────────────────┘ └──────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  REGISTRAR APRENDIZADOS NO PROGRESS.MD                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Comparar código gerado vs correções humanas (se houver)                │
│  2. Identificar categoria:                                                  │
│     - CSS Patterns                                                          │
│     - Accessibility                                                          │
│     - Component                                                              │
│     - React                                                                  │
│  3. Destilar para linguagem alto nível                                      │
│  4. Adicionar entrada com data                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  COMMIT (após iteração)                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Padrão Conventional Commits:                                              │
│    - feat: implementação de código de componente                            │
│    - test: implementação de teste                                          │
│    - refactor: melhoria sem mudança de comportamento                       │
│                                                                             │
│  Exemplo:                                                                   │
│    feat(avatar): implement small size variant                               │
│    test(avatar): implement size sm test                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  📋 CHECKPOINT 3: "Próximo teste?"                                          │
│  ⚠️ OBRIGATÓRIO - usar ferramenta question                                  │
│                                                                              │
│  Opções:                                                                     │
│    ├─ SIM → loop (volta para DETECTAR PRÓXIMO TESTE)                      │
│    └─ NÃO → ENCERRAR                                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                     ┌──────────────┴──────────────┐
                     ▼                             ▼
              ┌──────────────┐              ┌──────────────┐
              │     SIM      │              │     NÃO      │
              │              │              │              │
              │ Loop:        │              │    FIM       │
              │ +1 iteração │              │              │
              └──────────────┘              └──────────────┘
```

---

## Pré-requisitos

- Worktree criada com branch da feature (ou branch ativa)
- Arquivo `frontend/tests/features/[nome]/[nome].spec.ts` existente com `test.skip()`
- Arquivo `specs/features/[nome]/features/[nome].feature` existente

---

## Progress.md — Formato

Arquivo: `specs/features/[nome-da-feature]/progress.md`

### Estrutura por Categoria

```markdown
# Progress: [Feature]

## CSS Patterns

### [YYYY-MM-DD] [Nome do Pattern]
- Usar `hover:` prefix do Tailwind para feedback visual
- Manter transições suaves com `transition-colors`

## Accessibility

### [YYYY-MM-DD] [Nome do Pattern]
- `aria-disabled="true"` em vez de `disabled` attribute
- `aria-busy="true"` durante processamento

## Component

### [YYYY-MM-DD] [Nome do Pattern]
- Template literal para className: `${base} ${custom}`
- Spinner como children, não pseudo-element

## React

### [YYYY-MM-DD] [Nome do Pattern]
- Props tipadas com interfaces descritivas
- Sem `any`, usar inferência de tipos
```

### Como Registrar

1. Identificar categoria (CSS | A11y | Component | React)
2. Destilar aprendizado para linguagem alto nível
3. Adicionar ao progress.md com data

### Substituição de Registro (FONTE DE VERDADE = HUMANO)

Quando o humano faz ajustes no código:

1. Comparar código IA (stash) vs código humano (HEAD)
2. Identificar o tema/tópico da mudança
3. Se já existir registro sobre o mesmo tema no progress → REMOVER
4. INSERIR nova entrada com a regra definida pelo humano
5. NÃO registrar "antes/depois" - só a regra final do humano

---

## Detectar Próximo Teste

1. Ler `frontend/tests/features/[feature]/[feature].spec.ts`
2. Encontrar primeiro `test.skip('`
3. Extrair nome do teste
4. Se não existir SKIP → todos implementados ✅ → encerrar

---

## Interação Humana

### ⚠️ REGRAS DE USO DA FERRAMENTA `question`

```
1. A ferramenta question DEVE ser chamada em cada checkpoint
2. O código NÃO deve continuar até a resposta ser recebida
3. Se a resposta for NÃO → aguardando, não avance
4. Se não houver chamada question → FLUXO VIOLADO
```

### CHECKPOINT 1: Ativar teste
```
"Ativar e implementar [nome-do-teste]?"

- Mostrar cenário BDD correspondente
- Mostrar aprendizados relevantes do progress.md
- Próximos passos se SIM

⚠️ APÓS RESPOSTA "SIM":
- O agente DEVE pausar e esperar confirmação explícita
- NÃO avance automaticamente para implementação
- Aguarde o humano dizer "Pode continuar" ou equivalente
```

### CHECKPOINT 2: Revisar código
```
"Revisar código gerado?"

- Mostrar código atual do componente
- Mostrar testes passando (X/Y)
- Pendente implementar

Opções:
  ├─ ✅ OK → Confirmar e continuar
  ├─ 🔧 FAZER AJUSTES → Corrigir o código gerado
  ├─ ↩️ REFAZER → Descartar e reimplementar
  └─ ⏹️ SAIR → Encerrar sessão
```

### CHECKPOINT 2: Instruções pós-seleção "FAZER AJUSTES"

Quando o usuário selecionar "🔧 FAZER AJUSTES":

1. Mostrar mensagem clara:
```
╔════════════════════════════════════════════════════════════╗
║  🔧 FAÇA SUAS CORREÇÕES NOS ARQUIVOS                   ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Edite os arquivos necessários no seu editor.             ║
║                                                            ║
║  Quando TERMINAR, digite: "PRONTO"                       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

2. Aguardar usuário digitar "PRONTO"

3. Após "PRONTO", executar fluxo de comparação:
   - git stash (salvar código humano)
   - git stash pop (recuperar código IA)
   - git diff (comparar)
   - Atualizar progress.md
   - /verify-patterns
   - git stash pop (restaurar código humano)
   - Commit
```

### CHECKPOINT 3: Próximo teste
```
"Próximo teste?"

- Mostrar resumo: X/Y testes passando
- Opção de encerrar

Opções:
  ├─ SIM → loop (volta para DETECTAR PRÓXIMO TESTE)
  └─ NÃO → ENCERRAR
```

---

## Gate: /verify-patterns (Skill)

Executar APÓS aprovação humana do código.

### Se APROVADO
→ Continuar para registro + commit

### Se FALHOU
```
"Verify-patterns encontrou problemas:

[Arquivo]:[Linha] - [Problema]

Opções:
1. Aprovar mesmo assim
2. Me guiar na correção"
```

---

## Registro e Commit

### Após Aprovação (automático)

1. **Registrar no progress.md**
   - Identificar categoria
   - Destilar para linguagem alto nível
   - Adicionar com data

2. **Commit (Conventional Commits)**
   
   Padrão: `<tipo>(<escopo>): <descrição>`
   
   Exemplos:
   ```
   feat(avatar): implement size sm
   test(avatar): implement size sm test
   ```

### Após "FAZER AJUSTES" (comparação código IA vs humano)

1. **Aguardar usuário digitar "PRONTO"**

2. **Salvar código humano atual**
   ```
   git stash push -m "implement-tasks: código humano"
   ```

3. **Recuperar código IA do stash**
   ```
   git stash pop
   ```

4. **Comparar mudanças**
   ```
   git diff stash@{0} HEAD -- [arquivos-alterados]
   ```

5. **Atualizar progress.md (FONTE DE VERDADE = HUMANO)**
   - Ler progress.md atual
   - Para cada mudança identificada:
     - Se tema já existe no progress → REMOVER entrada anterior
     - INSERIR nova entrada com regra do humano
   - Mostrar ao usuário o que será registrado

6. **Executar /verify-patterns**

7. **Restaurar código humano**
   ```
   git stash pop
   ```

8. **Commit com Conventional Commits**
   ```
   feat(avatar): implement small size variant
   test(avatar): implement size sm test
   ```

---

## Checklist de Verificação

```
□ Checkpoint 1: question "Ativar [nome]?" chamado?
□ Pausa após "SIM": Agent aguardou confirmação?
□ Remover skip do teste?
□ Implementar teste (1 por iteração)?
□ TDD completo: RED → GREEN → REFACTOR?
□ Git stash após GREEN (antes da revisão)
□ Checkpoint 2: "Revisar código gerado?" chamado?
□   Se 🔧 FAZER AJUSTES:
□     □ Mostrar instruções "FAÇA SUAS CORREÇÕES"
□     □ Aguardar usuário digitar "PRONTO"
□     □ Comparar código IA vs código humano
□     □ Atualizar progress: tema existente → REMOVER + INSERIR nova regra
□     □ /verify-patterns executado
□     □ Commit criado
□   Se ✅ OK:
□     □ /verify-patterns executado
□ Registros salvos no progress.md?
□ Commit criado?
□ Checkpoint 3: "Próximo teste?" chamado?

SE QUALQUER □ ESTIVER VAZIO:
  → PARAR E EXECUTAR O CHECKPOINT FALTANTE
```

---

## Regras de Ouro

| Regra | Detalhe |
|-------|---------|
| **TDD First** | Sempre RED → GREEN → REFACTOR |
| **1 teste/iteração** | Apenas 1 teste por ciclo completo |
| **Aprovação** | Perguntar em 3 pontos: ativar, revisar, próximo |
| **Gate** | /verify-patterns (Skill) antes do commit |
| **Progress** | Registrar após aprovação, categorizado |
| **Commit** | Após aprovação, Conventional Commits |
| **Encerrar** | Só quando não houver mais SKIP |
| **NUNCA use `task`** | Use @ menção direta para subagents |
| **SEM EXCEÇÕES** | NUNCA pular checkpoints - são OBRIGATÓRIOS |
| **Stash após GREEN** | Git stash antes da revisão humana |
| **Fonte de verdade** | Código do humano substitui registro anterior no progress |
| **Pausa explícita** | Após "SIM" em P1, aguardar confirmação antes de continuar |

---

## Condição de Parada

### Por Feature:
```
Se não existe test.skip() no spec.ts:
  → "Feature [nome] completa!"
  → Mostrar todos os aprendizados destilados
  → Aguardar aprovação final
  → ENCERRAR
```

---

## Exemplos

### Progress.md Exemplo

```markdown
# Progress: Avatar

## CSS Patterns

### [2024-01-15] Avatar Sizes
- sm: size-6 (24px), text-[10px]
- md: size-9 (36px), text-xs
- lg: size-12 (48px), text-base
- xl: size-16 (64px), text-xl

## Accessibility

### [2024-01-15] Avatar Role
- Usar role="img" para semântica
- Suportar aria-label via props

## Component

### [2024-01-15] Avatar Props
- initials (obrigatório)
- size?: 'sm' | 'md' | 'lg' | 'xl'
- backgroundColor?: string
- textColor?: string

## React

### [2024-01-20] Size Props
- Usar string literal para size props
```

### Commits Exemplo

```
feat(avatar): implement size variants sm md lg xl
test(avatar): implement size sm test
refactor(avatar): add aria-label support
```
