# Checklist de Métricas

## Métricas Obrigatórias

Calcule e reporte estas métricas em todo relatório:

### Cobertura

| Métrica | Fórmula | Valor Ideal |
|---------|---------|-------------|
| Cobertura de RFs | (RF com ≥1 cenário / Total RFs) × 100 | 100% |
| Cobertura de Variantes | (Variantes com cenários / Total Variantes) × 100 | 100% |
| Cobertura de Estados | (Estados com cenários / Total Estados) × 100 | >80% |

### Qualidade

| Métrica | O que mede | Limite |
|---------|------------|--------|
| Ambiguidades | Placeholders, critérios vagos | ≤3 |
| Duplicatas | RFs/USs redundantes | 0 |
| Inconsistências | Deriva terminológica | ≤2 |

---

## Cálculo de Cobertura de RF

```
Cobertura % = (RFs com ≥1 cenário / Total de RFs) × 100
```

**Exemplo:**
- Total RFs: 16
- RFs cobertos: 5 (RF-05, RF-12, RF-13, RF-14, RF-15)
- Cobertura: (5/16) × 100 = 31.25%

---

## Checklist de Validação

Antes de finalizar o relatório, verificar:

- [ ] Todos os RFs do plan.md foram mapeados
- [ ] Todos os cenários do *.feature foram atribuídos a RFs
- [ ] Métricas foram calculadas corretamente
- [ ] Severidade atribuída segundo heurística
- [ ] Próximas ações são específicas e acionáveis

---

## Thresholds de Qualidade

| Condição | Status | Ação |
|----------|--------|------|
| Cobertura < 50% | ❌ CRÍTICO | Adicionar cenários |
| Cobertura 50-80% | ⚠️ ALERTA | Melhorar cobertura |
| Cobertura > 80% | ✅ BOM | Pode prosseguir |
| Ambiguidades > 5 | ⚠️ ALERTA | Resolver ambiguidades |
| Duplicatas > 0 | ⚠️ ALERTA | Unificar requisitos |
