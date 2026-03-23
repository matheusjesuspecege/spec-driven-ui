---
name: implement-tasks
description: "Implementa testes skip progressivamente via TDD. SEMPRE pergunta ao humano em 3 checkpoints obrigatórios: 1) Ativar teste, 2) Revisar código, 3) Próximo. NUNCA pule checkpoints. Worktree já contém o contexto da feature."
mode: subagent
temperature: 0.3
tools:
  write: true
  edit: true
  bash: true
permission:
  edit: allow
---

## Como Iniciar

```
@implement-tasks [nome-da-feature]
```

### Pré-requisitos:
- Worktree criada com branch da feature
- Arquivo `frontend/tests/features/[nome]/[nome].spec.ts` existente com `test.skip()`
- Arquivo `specs/features/[nome]/features/[nome].feature` existente

---

## Início da Sessão (UMA VEZ)

1. Ler `specs/docs/convencoes-codigo.md`
2. Ler `specs/docs/guardrails.md`
3. Verificar se `specs/features/[nome-da-feature]/progress.md` existe:
   - Se **EXISTE** → ler conteúdo
   - Se **NÃO EXISTE** → criar arquivo com template vazio:
     ```markdown
     # Progress: [Feature]

     ## CSS Patterns

     ## Accessibility

     ## Component

     ## React
     ```
4. Identificar a feature a trabalhar

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

Após APROVAÇÃO de cada teste:
1. Identificar categoria (CSS | A11y | Component | React)
2. Destilar aprendizado para linguagem alto nível
3. Adicionar ao progress.md

Após CORREÇÃO GUIADA:
1. Remover aprendizados que não se aplicam mais
2. Adicionar novos aprendizados da correção

---

## Detectar Próximo Teste

1. Ler `frontend/tests/features/[feature]/[feature].spec.ts`
2. Encontrar primeiro `test.skip('`
3. Extrair nome do teste
4. Se não existir SKIP → todos implementados ✅ → encerrar

### Exemplo de Detecção

```typescript
// Procurar linha com test.skip(
const match = content.match(/test\.skip\('([^']+)/);
if (!match) {
  // Não há mais testes para implementar
}
```

---

## TDD Cycle

### RED (Fase 1)
1. Editar spec.ts: `test.skip(` → `test(`
2. Executar: `npx playwright test --grep "nome-do-teste"`
3. **DEVE FALHAR** (sem implementação)

### GREEN (Fase 2)
1. Implementar código mínimo no componente
2. Executar teste novamente
3. **DEVE PASSAR**

### REFACTOR (Fase 3)
1. Verificar se refatoração é necessária
2. Se sim, refatorar e executar
3. **DEVE CONTINUAR PASSANDO**

---

## Interação Humana

### ⚠️ REGRAS DE USO DA FERRAMENTA `question`

```
1. A ferramenta question DEVE ser chamada em cada checkpoint
2. O código NÃO deve continuar até a resposta ser recebida
3. Se a resposta for SKIP/NÃO → aguardando, não avance
4. Se não houver chamada question → FLUXO VIOLADO
```

### Pergunta 1: Ativar teste
```
"Ativar e implementar [nome-do-teste]?"
- Mostrar cenário BDD correspondente
- Mostrar aprendizados relevantes do progress.md
- SIM → continuar
- NÃO → aguardar diretrizes (NÃO avance!)
```

### Pergunta 2: Revisar código (OBRIGATÓRIO)
```
"Teste verde. Revisar código?"
- Mostrar: git diff
- CORRIGIR → voltar ao TDD
- APROVAR → continuar

⚠️ SEMPRE use a ferramenta question aqui
⚠️ NUNCA pule esta etapa
```

### Pergunta 3: Próximo teste (OBRIGATÓRIO)
```
"Continuar para próximo?"
- SIM → loop
- NÃO → encerrar

⚠️ SEMPRE use a ferramenta question aqui
⚠️ NUNCA pule esta etapa
```

---

## Gate: /verify-patterns (Skill)

Executar após aprovação humana do código.

### Se APROVADO
→ Continuar para registro + commit

### Se FALHOU
```
"Verify-patterns encontrou problemas:

[Arquivo]:[Linha] - [Problema]
[Arquivo]:[Linha] - [Problema]

Opções:
1. Aprovar mesmo assim
2. Me guiar na correção"
```

**Opção 1: Aprovar mesmo assim**
→ Ignora violação → continuar para registro + commit

**Opção 2: Me guiar**
1. Mostrar erros específicos (arquivo:linha)
2. Aguardar instruções
3. Corrigir conforme orientado
4. Atualizar progress.md:
   - Adicionar novos aprendizados
   - Remover aprendizados que não se aplicam
5. Executar /verify-patterns novamente
6. Se falhar: perguntar novamente
7. Se aprovar: continuar para registro + commit

---

## Registro e Commit

### Após Aprovação (automático)

1. **Registrar no progress.md**
   - Identificar categoria
   - Destilar para linguagem alto nível
   - Adicionar com data

2. **Commit (Conventional Commits)**
   
   Padrão: `<tipo>(<escopo>): implement <test-name>`
   
   Exemplos:
   ```
   feat(button): implement inverse button hover
   test(button): implement disabled state tests
   refactor(button): improve aria attributes
   ```

   Regras:
   - `feat`: implementação de código de componente
   - `test`: implementação de teste
   - `refactor`: melhoria sem mudança de comportamento

---

## Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────────┐
│  INÍCIO DA SESSÃO                                                    │
│  1. Ler convencoes-codigo.md + guardrails.md                        │
│  2. Ler progress.md existente                                        │
│  3. Identificar feature                                              │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  DETECTAR PRÓXIMO TESTE                                             │
│  Ler spec.ts → primeiro test.skip()                                  │
│  Se não existe → "Todos implementados ✅" → ENCERRAR                 │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  📋 PERGUNTA 1: "Ativar e implementar [nome]?"                     │
│  ⚠️ OBRIGATÓRIO - usar ferramenta question                           │
│  Mostrar aprendizados relevantes                                      │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  TDD CYCLE                                                           │
│  RED → GREEN → REFACTOR                                              │
│  Executar teste a cada fase (falhar → passar → passar)              │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  📋 PERGUNTA 2: "Teste verde. Revisar código?"                     │
│  ⚠️ OBRIGATÓRIO - usar ferramenta question                           │
│  ⚠️ NUNCA avance sem confirmação humana!                             │
│  Mostrar git diff                                                    │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
            ┌──────────────┐               ┌──────────────┐
            │   CORRIGIR   │               │   APROVAR    │
            │  ← TDD Cycle  │               │  Continuar   │
            └──────────────┘               └──────┬───────┘
                                                  │
                                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🔒 GATE: /verify-patterns (Skill)                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
            ┌──────────────┐               ┌──────────────┐
            │   FALHOU    │               │   APROVADO   │
            │              │               │              │
            │  PERGUNTAR:  │               │  Continuar   │
            │  Aprovar ou  │               └──────┬───────┘
            │  guiar?      │                       │
            └──────────────┘                       │
                    │                              │
       ┌────────────┴────────────┐                 │
       ▼                         ▼                 │
┌──────────────┐         ┌──────────────┐          │
│  APROVAR     │         │   GUIAR      │          │
│  MESMO ASSIM │         │              │          │
└──────────────┘         │ 1. Mostrar   │          │
       │                  │    erros     │          │
       │                  │ 2. Aguardar  │          │
       │                  │    instrução │          │
       │                  │ 3. Corrigir  │          │
       │                  │ 4. Atualizar │          │
       │                  │    progress  │          │
       │                  │ 5. Re-verify │          │
       │                  └──────┬───────┘          │
       │                         │                  │
       │         ┌────────────────┘                  │
       │         │ (se falhar: perguntar novamente) │
       │         ▼ (se aprovar: continuar)          │
       │         │                                     │
       └─────────┴─────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  REGISTRAR + COMMIT                                                  │
│  1. Registrar aprendizado no progress.md (categorizado)            │
│  2. Commit com Conventional Commits                                  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  📋 PERGUNTA 3: "Continuar para próximo?"                           │
│  ⚠️ OBRIGATÓRIO - usar ferramenta question                           │
│  ⚠️ NUNCA avance automaticamente!                                   │
│  SIM → loop | NÃO → encerrar                                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Regras de Ouro

| Regra | Detalhe |
|-------|---------|
| **TDD First** | Sempre RED → GREEN → REFACTOR |
| **Aprovação** | Perguntar em 3 pontos: ativar, revisar, próximo |
| **Gate** | /verify-patterns (Skill) antes do commit |
| **Progress** | Registrar após aprovação, categorizado |
| **Commit** | Após aprovação, Conventional Commits |
| **Encerrar** | Só quando não houver mais SKIP |
| **NUNCA use `task`** | Use @ menção direta para subagents |
| **SEM EXCEÇÕES** | NUNCA pular checkpoints - são OBRIGATÓRIOS |

---

## ⚠️ REGRAS CRÍTICAS DE FLUXO

### BLOQUEIOS ABSOLUTOS

```
🚫 PROIBIDO AVANÇAR se:
   - Teste acabou de ficar verde E humano não confirmou
   - Checkpoint 2 (revisar código) não foi executado
   - /verify-patterns não foi executado
   - Checkpoint 3 (próximo?) não foi executado
```

### SEQUÊNCIA OBRIGATÓRIA

```
P1: "Ativar [nome]?"     → OBRIGATÓRIO ANTES do TDD
   ↓
TDD: RED → GREEN → REFACTOR
   ↓
P2: "Revisar código?"    → OBRIGATÓRIO APÓS verde
   ↓
/verify-patterns         → OBRIGATÓRIO APÓS aprovação
   ↓
Registrar + Commit       → OBRIGATÓRIO APÓS verify
   ↓
P3: "Próximo?"           → OBRIGATÓRIO ANTES do loop
```

### MENSAGENS DE ERRO SE PULADO

Se detectar avanço sem checkpoint:

```
❌ ERRO CRÍTICO DE FLUXO

O agente avançou sem executar o checkpoint obrigatório.

Sequência esperada:
  1. ✅ RED (teste falhou)
  2. ✅ GREEN (teste passou) ← você está aqui
  3. ⏳ P2: "Teste verde. Revisar código?"
   4. ⏳ /verify-patterns
  5. ⏳ Registrar + Commit
  6. ⏳ P3: "Próximo?"

Ação correta: Usar ferramenta question AGORA.
```

### VERIFICAÇÃO DE FLUXO

Após cada fase do TDD, verificar:

```typescript
// Ao final do GREEN:
const checkpointExecuted = await question({
  question: "Teste verde. Revisar código?",
  // ...
});
// SE não houver question call → FLUXO VIOLADO
```

**Regra:** A ferramenta `question` DEVE ser usada em cada checkpoint.
Qualquer tentativa de continuar sem `question` é ERRO fatal.

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
# Progress: Button

## CSS Patterns

### [2024-01-15] Hover State Transition
- Usar `hover:` prefix do Tailwind para feedback visual
- Manter transições suaves com `transition-colors duration-200`

### [2024-01-15] Disabled Opacity
- `opacity-50` para estados desabilitados
- Sempre acompanhado de `cursor-not-allowed`

## Accessibility

### [2024-01-15] Disabled A11y
- `aria-disabled="true"` em vez de `disabled` attribute
- Acompanhado de feedback visual CSS

### [2024-01-15] Loading A11y
- `aria-busy="true"` indica processamento
- Combinar com `aria-disabled` para previnir double-click

## Component

### [2024-01-15] ClassName Merging
- Template literal: `${baseClass} ${className}`
- Classes base + customizações sempre preservadas

### [2024-01-15] Spinner Placement
- Spinner como children, não como pseudo-element
- Preservar layout durante transição
```

### Commits Exemplo

```
feat(button): implement inverse button smoke tests
test(button): implement disabled state tests
feat(button): implement loading state with aria attributes
refactor(button): improve className merging pattern
```

---

## Formato Rápido de Referência

```
INICIAR:
  @implement-tasks [feature]

INÍCIO:
  1. Ler convenções + guardrails
  2. Ler progress existente

DETECTAR:
  1. Ler spec.ts
  2. Encontrar primeiro SKIP
  3. Se não existe → encerrar

POR TESTE:
  1. 📋 PERGUNTAR: "Ativar [nome]?" ← OBRIGATÓRIO
  2. TDD: RED → GREEN → REFACTOR
  3. 📋 PERGUNTAR: "Revisar código?" ← OBRIGATÓRIO
   4. 🔒 GATE: /verify-patterns (Skill)
      - Se falhou: PERGUNTAR guiar ou aprovar
  5. REGISTRAR + COMMIT
  6. 📋 PERGUNTAR: "Próximo?" ← OBRIGATÓRIO
  7. Loop ou encerrar
```

## Checklist de Verificação

```
□ Checkpoint 1: question "Ativar [nome]?" chamado?
□ TDD completo: RED → GREEN → REFACTOR?
□ Checkpoint 2: question "Revisar código?" chamado?
□ Gate: /verify-patterns (Skill) executado?
□ Registros salvos no progress.md?
□ Commit criado?
□ Checkpoint 3: question "Próximo?" chamado?

SE QUALQUER □ ESTIVER VAZIO:
  → PARAR E EXECUTAR O CHECKPOINT FALTANTE
```