# Exemplo de Relatório de Verificação

```
🔍 Verificando BDD ↔ TDD (Fluxo TDD → BDD)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TDD: 16 testes (REFERÊNCIA)
📊 BDD: 22 cenários (FONTE DA VERDADE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 ORDEM DOS CENÁRIOS (por dependência):
   1. render: "Inverse button tem estilo correto" [render] (@smoke)
   2. render: "Upgrade button tem dimensões do inverse" [render] (@smoke)
   3. state: "Inverse button em hover" [state] (@hover)
   4. state: "Inverse button em disabled" [state] (@smoke)
   5. interaction: "Inverse button em clique" [interaction] (@interaction)
   6. a11y: "Inverse button é navegável" [a11y] (@a11y)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ SINCRONIZADOS:
• "Inverse button tem estilo correto" (TDD=test(), BDD=@smoke)
• "Inverse button em disabled tem estilo correto" (TDD=test(), BDD=@smoke)
• "Upgrade button tem dimensões do inverse" (TDD=test(), BDD=@smoke)

⚠️ DIVERGÊNCIAS ENCONTRADAS

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ TDD ATIVO, BDD SEM @smoke (SUGERIR):                      │
├────────────────────────────────────────────────────────────────┤
│ 1. "Inverse button em hover"                                   │
│    → TDD: test() (ativo)                                     │
│    → BDD: @hover (sem @smoke)                                │
│    → Ação: Se teste passou, adicionar @smoke ao BDD            │
│                                                                │
│ 2. "Upgrade button ocupa 100% do container"                  │
│    → TDD: test() (ativo)                                     │
│    → BDD: @full-width (sem @smoke)                           │
│    → Ação: Se teste passou, adicionar @smoke ao BDD           │
│                                                                │
│ 3. "Inverse button renderiza children"                         │
│    → TDD: test() (ativo)                                     │
│    → BDD: @children (sem @smoke)                              │
│    → Ação: Se teste passou, adicionar @smoke ao BDD           │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ TDD SKIP, BDD COM @smoke (PROBLEMA):                       │
├────────────────────────────────────────────────────────────────┤
│ 1. "Inverse button em loading exibe spinner"                  │
│    → TDD: test.skip()                                        │
│    → BDD: @smoke                                             │
│    → Ação: Verificar por que smoke quebrou                    │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ ASSERTIONS INCOMPLETAS (ANTI-FALSO-POSITIVO):              │
├────────────────────────────────────────────────────────────────┤
│ 1. "Inverse button tem estilo correto"                        │
│    → BDD: 3 steps (background, cor, borda)                   │
│    → TDD: 2 assertions                                        │
│    → FALTANDO: "não deve ter borda"                          │
│    → Ação: Adicionar expect para borda                        │
└────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 AÇÕES MANUAIS NECESSÁRIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

button.feature (BDD):
  ⚠️ ADICIONAR @smoke:
    • "Inverse button em hover" (se teste passou)
    • "Upgrade button ocupa 100% do container" (se teste passou)
    • "Inverse button renderiza children" (se teste passou)

button.spec.ts (TDD):
  ❌ (Nenhuma ação - TDD é a referência)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FIM DO RELATÓRIO
   Sincronizados: 3
   Sugerir @smoke no BDD: 3
   Problemas (smoke quebrou): 1
   Assertions incompletas: 1
   Total divergências: 8

Exit: 1 (diferenças encontradas)
```

## Resumo

| Métrica | Valor |
|---------|-------|
| Testes TDD | 16 |
| Cenários BDD | 22 |
| Sincronizados | 3 |
| Sugestões @smoke | 3 |
| Problemas | 1 |
| Assertions incompletas | 1 |
| **Exit Code** | **1** (diff) |
