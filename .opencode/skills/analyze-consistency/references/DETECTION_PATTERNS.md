# Padrões de Detecção de Problemas

## Visão Geral

Esta referência documenta os padrões de detecção usados na análise de consistência. Cada passagem verifica uma categoria específica de problemas.

---

## A. Detecção de Duplicatas

**Objetivo:** Identificar requisitos ou histórias redundantes.

**O que verificar:**
- Requisitos quase idênticos entre research e plan
- User Stories que tratam do mesmo objetivo
- RFs com descrições sobrepostas

**Exemplos de problemas:**
- RF-01 e RF-03 descrevendo a mesma variante de botão
- Duas US com critério de aceitação idêntico

**Ação recomendada:**
- Unificar requisitos duplicados
- Clarificar escopo de cada requisito

---

## B. Detecção de Ambiguidade

**Objetivo:** Identificar linguagem vaga ou placeholders não resolvidos.

**O que verificar:**
- Adjetivos vagos sem critérios mensuráveis:
  - "rápido", "escalável", "seguro", "intuitivo", "robusto", "moderno"
- Marcadores de posição não resolvidos:
  - `TODO`, `TKTK`, `???`, `<placeholder>`, `[fazer]`, `___`
- Critérios de aceitação vagos:
  - "funciona corretamente"
  - "boa experiência do usuário"
  - "interface amigável"

**Ação recomendada:**
- Substituir por critérios mensuráveis
- Adicionar métricas específicas

---

## C. Detecção de Subespecificação

**Objetivo:** Identificar requisitos incompletos ou não verificáveis.

**O que verificar:**
- User Stories sem critérios de aceitação verificáveis
- Requisitos com verbos mas sem objeto ou resultado mensurável
- Tarefas que referenciam arquivos/componentes não definidos no plan
- Estados ou variantes sem descrição de comportamento

**Exemplos de problemas:**
- "O botão deve ter estados" (quais estados?)
- "Implementar variant" (qual variant?)

**Ação recomendada:**
- Adicionar critérios de aceitação específicos
- Definir comportamento esperado para cada estado

---

## D. Alinhamento com Guardrails

**Objetivo:** Garantir conformidade com a constituição do projeto.

**O que verificar:**
- Requisitos conflitantes com `specs/docs/guardrails.md`
- Ausência de seções obrigatórias previstas nos guardrails
- Violações de padrões estabelecidos

**Regras críticas dos guardrails:**
1. Não implementar sem fluxo RPI completo
2. Não inventar contratos de API (consultar plan.md)
3. Não refatorar código fora do escopo
4. Design System (tokens) SEMPRE primeiro

**Ação recomendada:**
- Corrigir violação antes de prosseguir
- Adicionar seção faltante

---

## E. Lacunas de Cobertura

**Objetivo:** Identificar requisitos sem cenários de teste.

**O que verificar:**
- User Stories sem tarefas/scenários associados
- RFs do research sem cobertura no plan/*.feature
- RNFs (performance, segurança, acessibilidade) não refletidos nas tarefas
- Variantes/combinações sem teste

**Mapeamento esperado:**
- 1 RF funcional → pelo menos 1 cenário
- 1 variante → cenários para estado default + hover + disabled
- Estados críticos (loading, error) → cenários específicos

**Ação recomendada:**
- Adicionar cenários para cobertura completa
- Priorizar variantes principais primeiro

---

## F. Detecção de Inconsistência

**Objetivo:** Identificar contradições entre artefatos.

**O que verificar:**
- Deriva terminológica (mesmo conceito com nomes diferentes)
- Contradições entre research e plan:
  - Tipos diferentes para mesma propriedade
  - Bibliotecas diferentes especificadas
- Contradições na ordem das tarefas:
  - Integração antes de configuração fundamental
- Requisitos do research não contemplados no plan

**Exemplos de problemas:**
- Research diz "ButtonIcon.tsx" mas plan.md só menciona "Button.tsx"
- Research usa "bg-primary" mas plan usa "primary-background"

**Ação recomendada:**
- Uniformizar terminologia
- Reconciliar contradições entre artefatos

---

## Priorização de Descobertas

Quando houver muitas descobertas, priorizar por:

1. **Bloqueadores** (impedem implementação)
2. **Cobertura zero** (funcionalidade básica sem teste)
3. **Violações de guardrails** (padrões do projeto)
4. **Contradrições** (artefatos conflitantes)
5. **Melhorias** (sugestões de polish)
