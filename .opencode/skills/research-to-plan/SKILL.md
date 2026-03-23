---
name: research-to-plan
description: Gera um documento de Plan técnico a partir do research.md com foco em frontend. Mapeia todos os artefatos, interfaces TypeScript, contratos de API consumidos, estrutura de componentes e diagrama de dependências.
license: MIT
compatibility: opencode
metadata:
  version: 1.0.0
  user-invocable: true
  triggers:
    - "@research-to-plan"
    - "gere o plan.md"
    - "crie o plano técnico"
---

# Research to Plan

Skill que converte um research.md aprovado em um plano técnico de implementação frontend.

## Quando Usar

- O research.md já foi aprovado e você precisa gerar o plan.md
- Está na etapa de planejamento técnico do fluxo: research → plan → *.feature
- Precisa mapear artefatos, interfaces, contratos de API e dependências

## Passo a Passo

### Etapa 1: Leitura do research

1. Solicite o nome da feature no formato `nome-da-feature` (se não informado)
2. Leia `specs/features/[nome-da-feature]/research.md`
3. Se não existir ou não estiver aprovado, informe o usuário e encerre

### Etapa 2: Perguntas de ambiguidade técnica

Pergunte **somente** se houver dúvida real que impacte os artefatos gerados.

Situações que exigem pergunta:
- Stack de UI não está clara (ex: shadcn/ui vs componentes próprios vs MUI)
- Gerenciamento de estado não está claro (ex: useState local vs Zustand vs React Query)
- Roteamento ambíguo (ex: Next.js App Router vs Pages Router)
- Não é possível inferir se há autenticação envolvida

**Se o contexto já deixar claro, pule esta etapa e gere diretamente.**

### Etapa 3: Gerar e salvar o plan.md

Gere o arquivo em `specs/features/[nome-da-feature]/plan.md` seguindo a estrutura definida em `references/PLAN_STRUCTURE.md`.

**Após salvar, apresente um resumo ao usuário:**

```
✅ plan.md gerado em specs/features/[nome]/plan.md

Resumo:
- X componentes novos, Y modificados
- Z tipos/interfaces definidos
- Contratos de API: [lista de endpoints/actions]
- Ordem de implementação: [resumo do diagrama]
```

## Estrutura do plan.md

Consulte `references/PLAN_STRUCTURE.md` para o template completo.

Seções principais:
1. Visão Geral Técnica
2. Estrutura de Arquivos
3. Contratos de API
4. Tipos e Interfaces
5. Props de Componentes
6. Hooks e Serviços
7. Diagrama de Dependências
8. Questões em Aberto

## Regras

- **Foco em frontend:** Não documente implementação de backend
- **Types explícitos:** `any` e `object` são proibidos. Use `unknown` se necessário
- **Props completas:** Todo componente listado deve ter suas props tipadas
- **Consistência de nomes:** O nome do tipo em `types.ts` deve ser o mesmo usado em componentes, hooks e serviços
- **Cobrir todos os RFs:** Cada requisito funcional do research deve ter um artefato correspondente

## Output

Um arquivo `plan.md` em `specs/features/[nome-da-feature]/plan.md` com:
- Estrutura de arquivos a criar/modificar
- Interfaces TypeScript definidas
- Contratos de API esperados
- Diagrama de dependências para ordem de implementação
- Questões técnicas em aberto