# Níveis de Severidade

## Visão Geral

Cada descoberta é classificada com um nível de severidade para priorizar ações corretivas.

---

## CRÍTICO

**Definição:** Problemas que impedem completamente a implementação ou violam regras fundamentais.

**Gatilhos:**
- Violação de guardrails do projeto
- Artefato essencial ausente (ex: *.feature não existe)
- Requisito com cobertura zero bloqueando funcionalidade básica
- Contradição grave entre artefatos que impediria compilação

**Ação obrigatória:**
- Resolver ANTES de qualquer implementação
- Bloquear o fluxo até correção

---

## ALTA

**Definição:** Problemas significativos que afetam qualidade ou completude.

**Gatilhos:**
- Requisito duplicado ou conflitante
- Atributo de segurança/desempenho ambíguo
- Critério de aceitação não testável
- Cobertura de teste insuficiente (>50% de RFs sem cenário)
- Variante principal sem cenários

**Ação recomendada:**
- Resolver antes de prosseguir
- Pode ser feito em paralelo com implementação se necessário

---

## MÉDIO

**Definição:** Problemas de qualidade que não bloqueiam, mas merecem atenção.

**Gatilhos:**
- Deriva terminológica entre artefatos
- Falta de cobertura de requisitos não-funcionais
- Caso extremo subespecificado
- User Story sem critérios verificáveis claros
- Placeholder não resolvido (`TODO`, `TKTK`)

**Ação recomendada:**
- Documentar e resolver quando possível
- Não precisa bloquear implementação

---

## BAIXO

**Definição:** Melhorias opcionais ou redundâncias menores.

**Gatilhos:**
- Melhorias de estilo ou redação
- Redundância menor que não afeta ordem de execução
- Formatação inconsistente
- Comentários desnecessários

**Ação recomendada:**
- Sugerir como melhoria opcional
- Resolver após implementação principal

---

## Matriz de Decisão

| Severidade | Bloqueia Implementação? | Prioridade |
|-------------|-------------------------|------------|
| CRÍTICO | SIM | 1 |
| ALTA | Recomendado não | 2 |
| MÉDIO | Não | 3 |
| BAIXO | Não | 4 |

---

## Exemplos por Severidade

### CRÍTICO
- `*.feature` não existe após execução do bdd-generator
- Guardrail violado: implementação sem research.md
- RF-01 funcional com 0 cenários de teste

### ALTA
- Duas variantes sem cenários (ex: primary, secondary)
- Critério de aceitação: "deve funcionar bem" (não testável)
- Requisito duplicado RF-01 ≈ RF-03

### MÉDIO
- research.md menciona "ButtonIcon.tsx" mas plan.md não
- Placeholder `TODO` em critério de aceitação
- Tamanho de botão "lg" sem cenário específico

### BAIXO
- Comentário de documentação com formatação inconsistente
- Variante "ghost" com cenário redundante
- Nome de classe diferente: `btn-primary` vs `button-primary`
