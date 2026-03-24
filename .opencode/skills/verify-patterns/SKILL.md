---
name: verify-patterns
description: "Verifica se o código implementado segue as convenções do projeto (convencoes-codigo.md, guardrails.md, architecture.md) e o contrato do plan.md. Use quando o usuário solicitar validação de padrões, verificação de código ou após a implementação de uma feature."
license: MIT
compatibility: opencode
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "verificar padrões"
    - "verificar convenções"
    - "verify patterns"
    - "validar código"
---

# Skill: Verify Patterns

## Quando Usar

Execute esta skill como parte do **GATE de validação** após o TDD passar:

```
Gate de Validação:
  1. TDD (tdd-playwright)
  2. Verify Patterns (esta skill) ←
```

Também pode ser executada pelo **pre-commit hook** em modo não-interativo.

## Início Rápido

1. Obter nome da feature e US-ID da entrada
2. Carregar documentos de referência (divulgação progressiva)
3. Identificar arquivos modificados
4. Executar verificações em 4 categorias
5. Detectar drifts e gerar relatório
6. Retornar status APROVADO ou DRIFT_DETECTADO

---

## Documentos de Referência

Carregar os seguintes documentos **OBRIGATORIAMENTE** antes de iniciar:

| Documento | Caminho | Quando carregar |
|-----------|---------|-----------------|
| Convenções de Código | `specs/docs/convencoes-codigo.md` | Sempre |
| Guardrails | `specs/docs/guardrails.md` ou `guardrails.json` | Sempre |
| Arquitetura | `specs/docs/architecture.md` | Sempre |
| Plan da Feature | `specs/features/[nome-da-feature]/plan.md` | Sempre |

> **Nota**: `guardrails.json` é gerado automaticamente do `guardrails.md` pelo script `.opencode/scripts/generate-guardrails-json.ts` durante o pre-commit. Se não existir, leia o `guardrails.md` como fallback.

---

## Fluxo de Verificação

### Etapa 1: Carregar Referências

```
# Carregar documentos usando a ferramenta read:
# - specs/docs/convencoes-codigo.md
# - specs/docs/guardrails.md ou guardrails.json
# - specs/docs/architecture.md
# - specs/features/[nome-da-feature]/plan.md
```

### Etapa 2: Identificar Arquivos Modificados

Determinar quais arquivos foram criados/modificados pela US:
- Componentes: procure em `frontend/src/features/[nome-da-feature]/` ou `frontend/src/components/`
- Testes: procure em `frontend/tests/`
- Identifique componentes, hooks, types, testes, etc.

### Etapa 3: Executar Verificações

Execute as verificações em 4 categorias:

#### A. Verificação de Convenções de Código

| Regra | O que verificar |
|-------|------------------|
| Nomenclatura arquivos | Arquivos em kebab-case (`form-dialog.tsx`) |
| Nomenclatura componentes | PascalCase para componentes |
| Arrow functions | Componentes usam arrow function |
| Estilização | Apenas classes Tailwind, SEM `style={{}}` |
| Tipos | Props tipadas, SEM `any` |
| Retorno | Sem tipo de retorno explícito |
| Imports | Caminhos absolutos (`@/features/...`) |

#### B. Verificação de Guardrails

| # | Regra | Como verificar |
|---|-------|----------------|
| 1 | Não implementar sem research→plan→*.feature | Verificar existência dos arquivos |
| 2 | Não inventar contratos de API | Comparar tipos com plan.md |
| 3 | Não usar `any` | Grep por `: any` ou `<any>` |
| 4 | Não fazer fetch direto em componentes | Grep por `useEffect.*fetch` |
| 5 | Não reforar código fora do escopo | Verificar arquivos modificados |
| 6 | Não criar componentes sem tipar props | Verificar interface/type de props |
| 7 | Não criar arquivos sem padrão de nomenclatura | Comparar com convencoes-codigo.md |
| 8 | Não adicionar comentários | Grep por `//` ou `/*` em .tsx e .spec.ts |
| 9 | Não criar arquivos desnecessários | Verificar se todos são usados |
| 10 | Não ultrapassar 500 linhas | Contar linhas dos arquivos |
| 11 | Não adicionar tipagem de retorno | Grep por `: React.JSX.Element` |
| 12 | Não criar barrel exports | Imports diretos dos arquivos |

#### C. Verificação de Arquitetura

| Regra | O que verificar |
|-------|------------------|
| Estrutura de pastas | Componentes em local apropriado |
| Tipos no mesmo arquivo | Para componentes simples, tipos no mesmo arquivo |

#### D. Verificação de Contrato (plan.md)

| Regra | O que verificar |
|-------|------------------|
| Props | Componente recebe as props definidas no plan |
| Tipos | Interfaces batem com plan.md |
| Nomes | Componentes/tipos seguem nomenclatura do plan |

---

## Categorias de Verificação

### Modo Interativo (chamado por implement-tasks)

Executa verificação completa conforme fluxo acima.

### Modo Não-Interativo (pre-commit hook)

O script `pre-commit-validate.js` executa verificações simplificadas:
- Verifica uso de `any`
- Verifica estilos inline (`style={{`)
- Verifica comentários em código
- Verifica tipagem de retorno explítica

---

## Detecção de Drift

### Categorias de Drift

| Categoria | Descrição | Severidade |
|-----------|-----------|------------|
| Nomenclatura | Nome de arquivo/componente diferente do padrão | ALTA |
| Tipagem | Props/tipos diferentes do plan.md | CRÍTICA |
| Guardrail | Violação de antipadrão | CRÍTICA |
| Arquitetura | Estrutura diferente da esperada | MÉDIA |
| Estilização | Uso de inline styles | ALTA |

### Relatório de Drift

Consulte [assets/EXAMPLE_OUTPUT.md](assets/EXAMPLE_OUTPUT.md) para modelo de saída.

```
## Verificação de Padrões - US-[ID]

### Resultado: [APROVADO / DRIFT DETECTADO]

#### A. Convenções de Código
- [✅/❌] Nomenclatura de arquivos
- [✅/❌] Arrow functions
- [✅/❌] Tailwind only (sem style={{}})
- [✅/❌] Tipagem de props

#### B. Guardrails
- [✅/❌] Sem uso de `any`
- [✅/❌] Sem fetch direto em componentes
- [✅/❌] Sem comentários
- [✅/❌] Arquivos dentro do escopo

#### C. Arquitetura
- [✅/❌] Estrutura de pastas
- [✅/❌] Tipos no mesmo arquivo (quando aplicável)

#### D. Contrato plan.md
- [✅/❌] Props batem com plan
- [✅/❌] Tipos batem com plan

### Drift Detectado (se houver):
- [Arquivo]: [Problema] → [Correção necessária]
```

---

## Ação Corretiva

### Se DRIFT DETECTADO

1. Liste todos os drifts encontrados
2. Retorne com status **DRIFT_DETECTADO** e lista de correções
3. O implement-tasks deve acionar o TDD novamente para corrigir

### Se APROVADO

1. Retorne status **APROVADO**
2. Liste as verificações realizadas
3. Permita que o implement-tasks faça o commit

---

## Regras

- **NUNCA use a ferramenta `task`** para chamar subagents
- **NUNCA modifique arquivos** — apenas detecte e relate (read-only)
- **Verifique TODAS as categorias** — não pule nenhuma verificação
- **Seja preciso** — cite arquivo e linha onde encontrou o problema
- **Compare com plan.md** — tipos e props devem bater exatamente
- **Esta skill é READ-ONLY** — não faz commits, não modifica código

---

## Output

### Se Aprovado:

```
✅ VERIFICAÇÃO APROVADA - US-[ID]

Verificações realizadas:
- Convenções de código: OK
- Guardrails: OK
- Arquitetura: OK
- Contrato plan.md: OK

Próx etapa: Commit
```

### Se Drift Detectado:

```
❌ DRIFT DETECTADO - US-[ID]

Drifts encontrados:
1. [Arquivo]:[Linha] - [Problema]
2. [Arquivo]:[Linha] - [Problema]

Ação necessária: Corrigir drifts e re-executar verificação
```
