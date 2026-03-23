---
name: verify-and-sync-bdd-tdd
description: "Verifica e reporta divergências entre BDD (.feature) e TDD (.spec.ts + .spec.docs.md). TDD é a referência, BDD sincroniza. Reporta diferenças para ajuste MANUAL."
license: MIT
compatibility:
  opencode: ">=1.0"
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "@verify-and-sync-bdd-tdd"
    - "verify-bdd-tdd sync"
---

## Quando Usar

Execute esta skill quando precisar verificar a sincronização entre testes Playwright (TDD) e cenários Gherkin (BDD):

```
@verify-and-sync-bdd-tdd feature=[nome-da-feature]
```

## Regras Fundamentais (TDDBDD)

```
╔═══════════════════════════════════════════════════════════════════╗
║  FLUXO TDD → BDD (Ciclo de Vida)                                  ║
║                                                                   ║
║  1. DESENVOLVEDOR implementa teste (tira do skip)                ║
║  2. Executa o teste                                               ║
║  3. Teste passa?                                                  ║
║     ├── SIM → BDD deve receber @smoke                            ║
║     └── NÃO → BDD mantém tag original (ex: @hover)               ║
║                                                                   ║
║  TDD = REFERÊNCIA                                                 ║
║  BDD = FONTE DA VERDADE ATUALIZADA                               ║
║                                                                   ║
║  ESTE AGENTE SÓ REPORTA DIVERGÊNCIAS - NÃO APLICA MUDANÇAS        ║
║  VOCÊ DECIDE O QUE FAZER MANUALMENTE                              ║
╚═══════════════════════════════════════════════════════════════════╝
```

| Situação | Ação do Agente |
|----------|---------------|
| TDD `test()` sem BDD `@smoke` | ⚠️ **SUGERIR** adicionar `@smoke` ao BDD |
| BDD `@smoke` sem TDD `test()` | ⚠️ **REPORTAR** - smoke pode ter quebrado |
| TDD `test.skip()` sem BDD | ✅ OK - em desenvolvimento |
| Assertions incompletas | ⚠️ **REPORTAR** - falso positivo |

## Fluxo

```
PASSO 1: Parse BDD (.feature)
   ├── Extrair TODOS os cenários com tags
   ├── Mapear: scenarioName → { tags, given, when, then, steps }
   └── Contar cenários

PASSO 1.1: Classificar cenários por dependência
   ├── render: renderizad[oa], vis[í|i]vel, exibe, aparece
   ├── state: hover, focus, loading, disabled, active
   ├── interaction: clica, submit, digita, seleciona
   └── a11y: teclado, tab, leitor de tela, aria

PASSO 2: Parse TDD (.spec.ts)
   ├── Extrair TODOS os testes com status
   ├── Mapear: testName → { assertions, selectors, status }
   └── Contar testes

PASSO 3: Validar BDD Contra TDD
   ├── Para cada cenário BDD → existe teste TDD?
   ├── Para cada teste TDD → existe cenário BDD?
   └── Verificar status: TDD test() deve ter BDD @smoke

PASSO 4: Validar Completude de Assertions (ANTI-FALSO-POSITIVO)
   ├── Contar steps "Então" + "E" no BDD
   ├── Contar assertions expect(...) no TDD
   └── Comparar: TDD assertions >= BDD steps

PASSO 5: Gerar Relatório
   ├── Exit code: 0=synced, 1=diff
   └── Lista de ações manuais necessárias
```

## Mapeamento Tags/Status

| TDD | BDD | Status | Ação |
|-----|-----|--------|------|
| `test()` | COM `@smoke` | ✅ Sincronizado | OK |
| `test()` | SEM `@smoke` | ⚠️ Sugerir | Adicionar `@smoke` ao BDD |
| `test.skip()` | SEM `@smoke` | ✅ Em desenvolvimento | OK |
| `test.skip()` | COM `@smoke` | ❌ Problema | REPORTAR |

### Tags BDD e Significado

| Tag | Significado | Ação ao Implementar |
|-----|-------------|-------------------|
| `@smoke` | Teste crítico, deve sempre passar | Manter `test()` |
| `@hover` | Teste de hover | Ao passar, adicionar `@smoke` |
| `@active` | Teste de active | Ao passar, adicionar `@smoke` |
| `@state` | Teste de estado | Ao passar, adicionar `@smoke` |
| `@interaction` | Teste de interação | Ao passar, adicionar `@smoke` |
| `@a11y` | Teste de acessibilidade | Ao passar, adicionar `@smoke` |
| `@keyboard` | Navegação por teclado | Ao passar, adicionar `@smoke` |
| `@aria` | Atributos ARIA | Ao passar, adicionar `@smoke` |
| `@touch-target` | Área de toque mobile | Ao passar, adicionar `@smoke` |
| `@defensive` | Proteção contra bugs | Ao passar, adicionar `@smoke` |
| `@variant` | Variante de componente | Ao passar, adicionar `@smoke` |
| `@size` | Tamanho específico | Ao passar, adicionar `@smoke` |
| `@full-width` | Largura total | Ao passar, adicionar `@smoke` |
| `@testid` | Identificação para testes | Ao passar, adicionar `@smoke` |
| `@classname` | Sobrescrita de estilos | Ao passar, adicionar `@smoke` |
| `@children` | Conteúdo textual | Ao passar, adicionar `@smoke` |

## Output

```
🔍 Verificando BDD ↔ TDD (Fluxo TDD → BDD)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TDD: [N] testes (REFERÊNCIA)
📊 BDD: [N] cenários (FONTE DA VERDADE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ DIVERGÊNCIAS ENCONTRADAS

✅ SINCRONIZADOS: test() + BDD com @smoke
   • [cenário sincronizado]

⚠️ TDD ATIVO, BDD SEM @smoke (SUGERIR):
   • [cenário] → Ação: Se teste passou, adicionar @smoke

❌ TDD SKIP, BDD COM @smoke (PROBLEMA):
   • [cenário] → Ação: Verificar por que smoke quebrou

❌ TDD SEM BDD (você decide):
   • [teste] → Ação: Criar cenário no .feature

⚠️ BDD SEM TDD (você decide):
   • [cenário] → Ação: Implementar teste ou remover cenário

⚠️ ASSERTIONS INCOMPLETAS:
   • [cenário] → BDD: [N] steps, TDD: [N] assertions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FIM DO RELATÓRIO
   Sincronizados: [N]
   Sugerir @smoke: [N]
   Problemas: [N]
   Assertions incompletas: [N]
   Total divergências: [N]

Exit: [0|1] (synced|diff)
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Synced - sem divergências |
| 1 | Diff - divergências encontradas |
| 2 | Error - falha no parse |

---

**IMPORTANTE:** Esta skill SÓ REPORTA - não modifica arquivos. TDD é a referência.
