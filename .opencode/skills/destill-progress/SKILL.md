---
name: destill-progress
description: "Destila aprendizados do progress.md para arquivos corretos. Move padrões globais para convenções e mantém específicos no progress. Use quando o usuário solicitar destilação ou análise de progress."
license: MIT
compatibility: opencode
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "destilar progress"
    - "destill progress"
    - "organizar aprendizados"
    - "analisar progress"
---

# Skill: Destill Progress

## Quando Usar

Execute esta skill quando o usuário solicitar:
- Destilação de progress.md
- Análise de aprendizados para mover padrões globais
- Organização de aprendizados por escopo

## Entrada do Usuário

```
feature=<nome-da-feature>
```

## Fluxo

### Passo 1: Carregar Artefatos

1. Ler `specs/features/[feature]/progress.md`
2. Ler `specs/docs/convencoes-codigo.md`
3. Listar todos os progress.md existentes (para comparar padrões globais)

### Passo 2: Classificar Entradas

Para CADA entrada no progress.md:

| Critério | Classificação |
|----------|---------------|
| Repete em ≥2 features | **GLOBAL** |
| Convenção universal de código | **GLOBAL** |
| Valores concretos do componente | **ESPECÍFICO** |
| Props/comportamento único | **ESPECÍFICO** |

### Passo 3: Mapear Destinos Globais

| Conteúdo | Destino |
|----------|---------|
| Test patterns | `convencoes-codigo.md` → seção "Escrita de testes" |
| CSS patterns genéricos | `convencoes-codigo.md` → seção "CSS" |
| ARIA patterns | `convencoes-codigo.md` → seção "React" |
| Props patterns | `convencoes-codigo.md` → seção "Componentes" |

### Passo 4: Gerar Relatório

Mostrar tabela:

```
| Entrada | Classificação | Destino |
|---------|---------------|---------|
| Test Instance | GLOBAL | convencoes-codigo.md (testes) |
| Avatar Sizes | ESPECÍFICO | Manter em progress.md |
```

### Passo 5: Solicitar Confirmação

```
Destilar conforme tabela acima?

├─ SIM → Executar edições
├─ MOSTRAR PLANOS → Apenas mostrar plano sem editar
└─ CANCELAR
```

### Passo 6: Executar (se SIM)

1. Editar arquivos de convenção (adicionar padrões globais)
2. Editar progress.md (remover entradas movidas)
3. Remover seções vazias
4. Confirmar sucesso

## Regras

- **NUNCA mover valores específicos** do componente
- **SEMPRE manter** progress.md com aprendizados do componente
- **VERIFICAR duplicações** antes de adicionar às convenções
- **RESPONDER de forma mínima** após execução
