# Modelo de Relatório de Análise

## Estrutura do Relatório

```
## Relatório de Análise de Consistência

### Fluxo Analisado
- Research: `specs/features/[nome]/research.md`
- Plan: `specs/features/[nome]/plan.md`
- Feature: `specs/features/[nome]/*.feature`

### Tabela de Descobertas
| ID | Categoria | Gravidade | Local(is) | Resumo | Recomendação |
|----|-----------|-----------|-------------|--------|---------------|
| D1 | Cobertura | CRÍTICO | *.feature | Feature cobre apenas X% dos RFs | Adicionar cenários para RF-YY |

### Cobertura de Requisitos
| ID | Tipo | Coberto | Observações |
|----|------|---------|-------------|
| RF-01 | Funcional | ✅/❌ | Status |

### Cobertura de User Stories
| US | Tem Task? | Task IDs | Observações |
|----|-----------|----------|-------------|
| US-001 | sim/não | T001 | Status |

### Questões de Alinhamento com Guardrails
(se houver - listar violações específicas)

### Métricas
- Total de RFs no plan: N
- Total de Cenários no *.feature: N
- Cobertura %: XX%
- Contagem de ambiguidades: N
- Contagem de duplicatas: N
- Variantes cobertas: X/Y

### Próximas Ações
[Bloco conciso baseado na severidade dos problemas]
```

---

## Exemplo de Preenchimento

### Tabela de Descobertas

| ID | Categoria | Gravidade | Local | Resumo | Recomendação |
|----|-----------|-----------|-------|--------|--------------|
| D1 | Cobertura | CRÍTICO | button.feature | Apenas variante "inverse" tem cenários; 4 variantes sem cobertura | Adicionar cenários para primary, secondary, ghost, destructive |
| D2 | Duplicação | ALTA | button.feature:130-141 | Dois cenários @double-click redundantes | Consolidar cenários |
| D3 | Subespecificação | ALTA | *.feature | RF-09, RF-10, RF-11 (posicionamento de ícones) sem cenários | Adicionar cenários de icon positions |

### Cobertura de Requisitos

| ID | Tipo | Coberto | Cenários | Observações |
|----|------|---------|----------|-------------|
| RF-01 (primary) | Funcional | ❌ | 0 | SEM COBERTURA |
| RF-02 (secondary) | Funcional | ❌ | 0 | SEM COBERTURA |
| RF-05 (inverse) | Funcional | ✅ | 16 | OK |
| RF-06 (sm) | Funcional | ❌ | 0 | SEM COBERTURA |

### Métricas

| Métrica | Valor |
|---------|-------|
| Total de RFs | 16 |
| Total de Cenários | 18 |
| Cobertura % | 31% |
| Ambiguidades | 1 |
| Duplicatas | 1 |

---

## Próximas Ações - Modelos

### Se existirem problemas CRÍTICOS:
```
⚠️ CRÍTICO: A cobertura está em XX%. [Problema específico].

Recomenda-se resolver antes da implementação.

Sugestões:
1. Execute /bdd-generator feature=[nome] --force-regenerate
2. Edite manualmente *.feature para adicionar cenários faltantes
```

### Se apenas BAIXO/MÉDIO:
```
✅ Análise concluída com problemas menores.

O usuário pode prosseguir para implementação, mas considere:
- [Sugestão opcional 1]
- [Sugestão opcional 2]
```

### Final:
```
---
Você gostaria que eu sugerisse correções concretas para os N principais problemas?
```
