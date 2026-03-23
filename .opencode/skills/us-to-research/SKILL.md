---
name: us-to-research
description: "Converte requisitos abstratos escritos por Product Owners em um research.md estruturado para desenvolvimento frontend. Use esta skill sempre que receber uma User Story, briefing de produto, ou descrição de feature não técnica que precisa ser traduzida para linguagem de desenvolvimento."
license: MIT
compatibility: opencode
metadata:
  version: 1.0.0
  user-invocable: true
  triggers:
    - "converter us em research"
    - "criar research a partir da US"
    - "analisar requisito e gerar research"
    - "us-to-research"
---

## Quando Usar

- Quando receber uma User Story, briefing de produto ou descrição de feature não técnica
- Quando precisar traduzir requisitos do Product Owner para linguagem de desenvolvimento
- Deve ser usada ANTES do `research-to-plan`

## Passo a Passo

### Etapa 1: Receber o requisito

Solicite ao usuário (se não fornecido):
- O **nome da feature** no formato `nome-da-feature`
- O **conteúdo do requisito** (texto do Notion, US, briefing, etc.)

Verifique se existe `specs/features/[nome-da-feature]/research.md`. Se existir, leia-o antes de continuar.

### Etapa 2: Verificar dependências (Atomic Design)

Quando a feature for uma **page, template ou organism** que contém componentes filhos:

1. Liste os componentes filhos mencionados (Button, Card, Header, etc.)
2. Para cada componente filho, verifique se já foi implementado:
   - Existe `specs/features/[nome-do-componente]/research.md`?
   - Existe `specs/features/[nome-do-componente]/plan.md`?
   - Existe `specs/features/[nome-do-componente]/*.feature`?
3. Classifique cada componente:
   - ✅ **Implementado:** possui research, plan e *.feature
   - ⚠️ **Parcialmente implementado:** possui research e/ou plan, sem *.feature completo
   - ❌ **Não implementado:** não existe ou está incompleto
4. Se algum filho está ❌ ou ⚠️:
   - Marcar como **BLOCKED por dependências**
   - Listar dependências faltantes no research
   - **NÃO criar *.feature** até dependências resolvidas

### Etapa 3: Perguntas de esclarecimento

Faça **3 a 5 perguntas essenciais** quando o requisito for ambíguo:

1. Esta feature altera uma tela existente ou cria uma nova?
2. A integração com o backend será (REST API, Server Actions, Mock)?

Se o requisito já for claro, pule esta etapa.

### Etapa 4: Gerar e salvar o research.md

Gere o arquivo e salve em `specs/features/[nome-da-feature]/research.md`.

## Estrutura do research.md

```markdown
# [Nome da Feature]

## 1. Visão Geral
Descrição em 2–4 linhas do que será construído.

## 2. Objetivos
- Objetivo específico e mensurável 1
- Objetivo específico e mensurável 2

## 3. Contexto de Integração com Backend
- **Tipo:** REST API | Server Actions | React Query | Mock
- **Status:** Existente | A ser criado | Em desenvolvimento paralelo
- **Contratos:** [link para swagger/docs ou "a definir"]
- **Autenticação:** [token JWT / Better Auth / sessão / sem auth]

## 4. Histórias de Usuário
Cada história deve ser pequena o suficiente para ser implementada em uma única sessão.

### US-001: [Título]
**Descrição:** Como [usuário], eu quero [ação] para que [benefício].
**Tela/Componente afetado:** [nome]
**Critérios de aceitação:**
- [ ] Critério visual verificável
- [ ] Critério de comportamento
- [ ] Critério de integração
> ⚠️ Toda história com alteração de UI deve incluir **sub-agent de testes**, **sub-agent de analise estatica** como critério.

## 5. Dependências (Atomic Design)
> ⚠️ **Seção obrigatória para pages, templates e organisms**

| Componente | Tipo | Status | Caminho |
|------------|------|--------|---------|
| Button | atom | ✅ Implementado | specs/components/atoms/button/ |
| Card | molecule | ⚠️ Parcial | - |
| Header | organism | ❌ Não implementado | - |

## 6. Requisitos Funcionais
- RF-01: O sistema deve [comportamento]
- RF-02: Quando o usuário [ação], a interface deve [resposta]

## 7. Requisitos Não-Funcionais
- RNF-01: Componentes responsivos (mobile-first)
- RNF-02: Estados de loading durante chamadas API
- RNF-03: Erros de validação inline

## 8. Fora do Escopo
- Não inclui [funcionalidade X]
- Não altera [tela Y]

## 9. Referências Visuais
- Link Figma: [url ou "não disponível"]
- Componentes reutilizáveis: [lista]

## 10. Métricas de Sucesso
- Como será medido que a feature atingiu seu objetivo

## 11. Questões em Aberto
- [ ] [Dúvida a ser respondida]
```

## Regras

- **Escreva para um dev júnior ou agente de IA** — seja explícito
- **Critérios de aceitação são verificáveis**, não vagos
- **Toda história com UI** deve ter **sub-agent de testes**, **sub-agent de analise estatica**
- **Não misture frontend e backend** — o critério é visual/comportamental
- **Integração é contrato**, não implementação
- **Atualização pós-implementação:** Quando uma dependência for implementada (status ✅), atualize o research.md da feature principal

## Output

Ao final, apresente o resumo:

```
✅ research.md gerado em specs/features/[nome]/research.md

Resumo:
- X histórias de usuário
- Principais telas/componentes: [lista]
- Integração: [tipo]
- Dependências: [lista e status]

⚠️ Status: [PROSSEGUIR / BLOQUEADO]
- Se BLOQUEADO: listar dependências necessárias

Sugestão de Próximos Passos:
- Se PROSSEGUIR: Iniciar 'research-to-plan' em novo chat
- Se BLOQUEADO: Implementar dependências primeiro
```