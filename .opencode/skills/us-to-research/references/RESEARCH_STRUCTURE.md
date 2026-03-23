# Estrutura do research.md

Este documento define o template completo para arquivos research.md gerados pela skill `us-to-research`.

## Seções Obrigatórias

| # | Seção | Descrição |
|---|-------|-----------|
| 1 | Visão Geral | Descrição em 2–4 linhas do que será construído e qual problema resolve |
| 2 | Objetivos | Objetivos específicos e mensuráveis |
| 3 | Contegração com Backend | Tipo de API, status, contratos, autenticação |
| 4 | Histórias de Usuário | US formatadas com critérios de aceitação |
| 5 | Dependências (Atomic Design) | **Obrigatório para pages/templates/organisms** |
| 6 | Requisitos Funcionais | RF-01, RF-02, etc. |
| 7 | Requisitos Não-Funcionais | RNF-01, RNF-02, etc. |
| 8 | Fora do Escopo | Explicitamente o que NÃO será feito |
| 9 | Referências Visuais | Links Figma, componentes reutilizáveis |
| 10 | Métricas de Sucesso | Como medir que a feature atingiu o objetivo |
| 11 | Questões em Aberto | Dúvidas a serem respondidas |

## Status de Dependências

| Status | Significado |
|--------|-------------|
| ✅ Implementado | possui research.md + plan.md + *.feature completos |
| ⚠️ Parcialmente implementado | possui research.md e/ou plan.md, sem *.feature completo |
| ❌ Não implementado | não existe ou está incompleto |

## Critérios de Aceitação

Cada história de usuário deve ter critérios verificáveis:

- **Visual:** "botão aparece desabilitado quando campo vazio"
- **Comportamental:** "ao clicar, exibe toast de sucesso"
- **Integração:** "chama endpoint POST /items com os dados"

> ⚠️ Toda história com UI deve incluir sub-agent de testes e sub-agent de análise estática como critério.