---
name: analyze-consistency
description: "Analisar consistência e qualidade entre arquivos research.md, plan.md e *.feature. Use quando o usuário solicitar análise de consistência, verificação de cobertura ou validação de artefatos após a geração de cenários BDD. Detecta duplicatas, ambiguidades, itens subespecificados e lacunas."
license: MIT
compatibility: opencode
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "analisar consistência"
    - "verificar cobertura"
    - "validar artefatos"
    - "analyze consistency"
---

# Skill: Analyze Consistency

## Quando Usar

Execute esta skill **após** o arquivo `*.feature` ter sido gerado com sucesso. NÃO execute antes da implementação.

## Início Rápido

1. Obter nome da feature da entrada do usuário (`feature=<nome>`)
2. Carregar artefatos com divulgação progressiva
3. Executar passagens de detecção
4. Gerar relatório de análise
5. Oferecer plano de remediação

---

## Passo a Passo

### Passo 1: Obter Nome da Feature

O usuário fornece `feature=<nome>` na entrada.

```
feature=button  →  specs/features/button/
```

**Abortar** se algum arquivo necessário estiver faltando:
- `specs/features/[nome]/research.md`
- `specs/features/[nome]/plan.md`
- `specs/features/[nome]/*.feature`

### Passo 2: Carregar Artefatos (Divulgação Progressiva)

Carregar apenas o contexto mínimo necessário:

**Do research.md:**
- Visão Geral, Objetivos, Histórias de Usuário
- Requisitos Funcionais (RF)
- Requisitos Não-Funcionais (RNF)
- Contexto de Integração com Backend

**Do plan.md:**
- Visão Geral Técnica, Estrutura de Arquivos
- Interfaces e Types, Contratos de API
- Componentes: Props e Responsabilidades
- Hooks, Diagrama de Dependências

**Do *.feature:**
- IDs de Cenários, Descrições (Given/When/Then)
- Tags (@pending, @smoke, @a11y, etc.)
- Critérios de Aceitação

**Dos guardrails:**
- Carregar `specs/docs/guardrails.md` para validação de princípios

### Passo 3: Construir Modelos Semânticos

Criar representações internas (NÃO incluir artefatos brutos na saída):

- **Inventário de User Stories**: Cada US com critérios de aceitação
- **Inventário de Requisitos Funcionais**: RFs com chaves estáveis
- **Inventário de RNFs**: RNFs com critérios mensuráveis
- **Mapeamento de Cobertura**: Tarefas mapeadas para requisitos/histórias
- **Inventário de Artefatos**: Arquivos a criar/modificar conforme plan.md

### Passo 4: Executar Passagens de Detecção

Consulte [references/DETECTION_PATTERNS.md](references/DETECTION_PATTERNS.md) para padrões detalhados.

**Passagens (ordem de prioridade):**
1. Violações de guardrails (sempre CRÍTICO)
2. Lacunas de cobertura (RF com zero cenários)
3. Detecção de duplicatas
4. Detecção de ambiguidade
5. Detecção de inconsistência

**Limite:** 50 descobertas máximo; agregar excedentes no resumo.

### Passo 5: Atribuir Severidade

| Severidade | Gatilho |
|------------|---------|
| **CRÍTICO** | Violação de guardrails, artefato essencial faltante, cobertura zero bloqueando funcionalidade básica |
| **ALTA** | Requisito duplicado/conflitante, atributo de segurança/desempenho ambíguo, critério de aceitação não testável |
| **MÉDIO** | Deriva terminológica, cobertura de requisitos não-funcionais faltante, caso extremo subespecificado |
| **BAIXO** | Melhorias de estilo/redação, redundância menor sem afetar ordem de execução |

### Passo 6: Gerar Relatório

Usar estrutura de [references/REPORT_TEMPLATE.md](references/REPORT_TEMPLATE.md).

**Seções:**
- Fluxo Analisado (caminhos dos artefatos)
- Tabela de Descobertas (máximo 50 linhas)
- Cobertura de Requisitos
- Cobertura de User Stories
- Questões de Alinhamento com Guardrails
- Métricas
- Próximas Ações

### Passo 7: Oferecer Remediação

Perguntar ao usuário: "Você gostaria de correções concretas para os N principais problemas?" (NÃO aplicar automaticamente).

---

## Regras de Saída

- **NUNCA modificar arquivos** (análise somente leitura)
- **NUNCA inventar seções faltantes** (relatar com precisão se ausente)
- **Priorizar violações de guardrails** (sempre CRÍTICO)
- **Usar exemplos em vez de regras exaustivas** (citar casos específicos)
- **Relatar zero problemas adequadamente** (emitir relatório de sucesso com estatísticas de cobertura)

## Eficiência de Contexto

- Tokens mínimos de alta relevância
- Divulgação progressiva (carregar incrementalmente)
- Saída < 5000 tokens recomendado
- Resultados determinísticos (mesma entrada = mesma saída)

## Fluxo do Projeto

O projeto segue o fluxo de artefatos:

```
research.md → plan.md → *.feature → implement
```

Cada artefato é gerado pelo agente anterior:
- **us-to-research**: Gera `research.md` a partir de requisitos/US
- **research-to-plan**: Gera `plan.md` a partir de `research.md`
- **bdd-generator**: Gera cenários `*.feature` a partir de `plan.md`
- **implement**: Implementa os cenários do `*.feature`