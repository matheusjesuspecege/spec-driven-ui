---
name: verify-and-sync-bdd-tdd
description: "Verifica e reporta divergências entre BDD (.feature) e TDD (.spec.ts + .spec.docs.md). TDD é a referência, BDD sincroniza. Reporta diferenças para ajuste MANUAL."
mode: subagent
temperature: 0.1
tools:
  read: true
permission:
  read: allow
---

## Como Usar

```
@verify-and-sync-bdd-tdd feature=[nome-da-feature]
```

---

## REGRAS FUNDAMENTAIS

```
╔═══════════════════════════════════════════════════════════════════╗
║  FLUXO TDD → BDD (Ciclo de Vida)                              ║
║                                                                   ║
║  1. DESENVOLVEDOR implementa teste (tira do skip)             ║
║  2. Executa o teste                                             ║
║  3. Teste passa?                                               ║
║     ├── SIM → BDD deve receber @smoke                         ║
║     └── NÃO → BDD mantém tag original (ex: @hover)             ║
║                                                                   ║
║  TDD = REFERÊNCIA                                               ║
║  BDD = FONTE DA VERDADE ATUALIZADA                              ║
║                                                                   ║
║  ESTE AGENTE SÓ REPORTA DIVERGÊNCIAS - NÃO APLICA MUDANÇAS      ║
║  VOCÊ DECIDE O QUE FAZER MANUALMENTE                            ║
╚═══════════════════════════════════════════════════════════════════╝
```

| Situação | Ação do Agente |
|----------|---------------|
| TDD `test()` sem BDD `@smoke` | ⚠️ **SUGERIR** adicionar `@smoke` ao BDD |
| BDD `@smoke` sem TDD `test()` | ⚠️ **REPORTAR** - smoke pode ter quebrado |
| TDD `test.skip()` sem BDD | ✅ OK - em desenvolvimento |
| Assertions incompletas | ⚠️ **REPORTAR** - falso positivo |

---

## INPUT/OUTPUT

**INPUTS:**
- `frontend/tests/features/[feature]/[feature].spec.ts` ← **REFERÊNCIA (TDD)**
- `specs/features/[feature]/features/[feature].feature` ← **FONTE DA VERDADE (BDD)**
- `frontend/tests/features/[feature]/[feature].spec.docs.md`

**OUTPUTS:**
- Relatório de divergências (não modifica arquivos)
- Exit code: 0=synced, 1=diff

---

## FLUXO DE EXECUÇÃO

```
PASSO 1: Parse BDD (.feature)
  ├── Extrair TODOS os cenários com tags
  ├── Mapear: scenarioName → { tags, given, when, then, steps }
  └── Contar cenários

PASSO 2: Parse TDD (.spec.ts)
  ├── Extrair TODOS os testes com status
  ├── Mapear: testName → { assertions, selectors, status }
  └── Contar testes

PASSO 3: Validar BDD Contra TDD
  ├── Para cada cenário BDD → existe teste TDD?
  │   ├── ❌ NÃO → SUGERIR criar teste no .spec.ts
  │   └── ✅ SIM → OK
  ├── Para cada teste TDD → existe cenário BDD?
  │   ├── ❌ NÃO → REPORTAR (criar cenário BDD)
  │   └── ✅ SIM → OK
  └── Verificar status: TDD `test()` deve ter BDD `@smoke`
       ├── TDD `test()` + BDD SEM `@smoke` → ⚠️ SUGERIR adicionar `@smoke`
       ├── TDD `test()` + BDD COM `@smoke` → ✅ OK (sincronizado)
       ├── TDD `test.skip()` + BDD SEM `@smoke` → ✅ OK (em desenvolvimento)
       └── TDD `test.skip()` + BDD COM `@smoke` → ❌ REPORTAR (smoke quebrou?)

PASSO 4: Validar Completude de Assertions (ANTI-FALSO-POSITIVO)
  ├── Para cada cenário BDD:
  │   ├── Contar steps "Então" + "E" (assertions esperadas)
  │   └── Ignorar: "Dado que", "Quando" (são setup/ação)
  ├── Para cada teste TDD:
  │   ├── Contar assertions: expect(...)
  │   └── Mapear por tipo de verificação
  └── Comparar:
      ├── TDD assertions < BDD steps → ⚠️ REPORTAR
      └── TDD assertions >= BDD steps → ✅ OK

PASSO 5: Gerar Relatório
  ├── Exit code: 0=synced, 1=diff
  └── Lista de ações manuais necessárias
```

---

## MAPEAMENTO: TAGS ↔ STATUS (FLUXO TDD → BDD)

### Lógica de Validação

| TDD | BDD | Status | Ação |
|-----|-----|--------|------|
| `test()` | COM `@smoke` | ✅ Sincronizado | OK |
| `test()` | SEM `@smoke` | ⚠️ Sugerir | Adicionar `@smoke` ao BDD |
| `test.skip()` | SEM `@smoke` | ✅ Em desenvolvimento | OK |
| `test.skip()` | COM `@smoke` | ❌ Problema | REPORTAR |

### Tags BDD e Seu Significado

| Tag | Significado | Ação ao Implementar |
|-----|-------------|-------------------|
| `@smoke` | Teste crítico, deve sempre passar | Manter `test()` |
| `@hover` | Teste de hover (desenvolvimento) | Ao passar, adicionar `@smoke` |
| `@active` | Teste de active (desenvolvimento) | Ao passar, adicionar `@smoke` |
| `@state` | Teste de estado (desenvolvimento) | Ao passar, adicionar `@smoke` |
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

### Ciclo de Vida

```
┌─────────────────────────────────────────────────────────────┐
│ 1. TESTE É IMPLEMENTADO (tirado do skip)                   │
│ 2. DESENVOLVEDOR RODA O TESTE                             │
│ 3. TESTE PASSA?                                           │
│    ├── SIM → BDD deve receber @smoke                      │
│    └── NÃO → Manter tag original, corrigir código          │
└─────────────────────────────────────────────────────────────┘
```

---

## MAPEAMENTO: STEPS BDD → ASSERTIONS TDD (PASSO 4)

### Regras de Contagem

| Keyword | Count | Motivo |
|---------|-------|--------|
| `Dado que` | 0 | Pré-condição / Setup |
| `Quando` | 0 | Ação / Trigger |
| `Então` | 1 | Assertion principal |
| `E` (após Então) | 1 | Assertion adicional |

### Mapeamento Semântico (para detecção de padrão)

| Pattern BDD | Assertion TDD Esperada |
|-------------|----------------------|
| `deve ter background #X` | `expect(...).toBe(rgb(X))` |
| `deve ter texto com cor #X` | `expect(...).toBe(rgb(X))` |
| `não deve ter borda` | `expect(...border...).toBe(...)` ou `toBeFalsy()` |
| `deve ter opacity de X%` | `expect(...).toBe(X)` |
| `deve ter cursor X` | `expect(...).toBe('X')` |
| `deve ter outline de Xpx` | `expect(...outlineWidth...).toBe(X)` |
| `deve ter font-size de Xpx` | `expect(...fontSize...).toBe(X)` |
| `deve ter font-weight de X` | `expect(...fontWeight...).toBe(X)` |
| `deve ter border-radius de Xpx` | `expect(...borderRadius...).toBe(X)` |
| `deve ter width de X` | `expect(...width...).toBe('X')` ou `.toBe(X)` |
| `deve ter padding vertical de Xpx` | `expect(...padding...).toBe(X)` |
| `deve ter atributo X="Y"` | `expect(...).toHaveAttribute('X', 'Y')` |
| `o atributo X deve ser "Y"` | `expect(...).toHaveAttribute('X', 'Y')` |
| `aria-busy deve ser "true"` | `expect(...).toHaveAttribute('aria-busy', 'true')` |
| `aria-disabled deve ser "true"` | `expect(...).toHaveAttribute('aria-disabled', 'true')` |
| `deve exibir spinner` | `expect(...).toBeVisible()` |
| `não deve ser disparado` | Sem assertion direta (verificado por contraprova) |
| `o texto "X" deve estar visível` | `expect(...).toContainText('X')` |
| `deve incluir a classe "X"` | `expect(...).toHaveClass(/X/)` |
| `papel (role) deve ser "button"` | `expect(...).toHaveAttribute('role', 'button')` |
| `área de toque mínima de XxYpx` | `expect(box?.width).toBeGreaterThanOrEqual(X)` |
| `layout não deve saltar` | `expect(styles?.width).toBeDefined()` |
| `deve manter dimensões` | `expect(styles?.width).toBeDefined()` |

### Exemplos de Contagem

```
# BDD:
Cenário: Inverse button tem estilo correto
    Dado que o componente Button é renderizado com variant="inverse"   → 0
    Quando visível na página                                          → 0
    Então deve ter background #FFFFFF                                  → 1
     E deve ter texto com cor primary (#FF5C00)                       → 1
     E não deve ter borda                                              → 1
# Total esperado: 3 assertions
```

```
# TDD:
test('Inverse button tem estilo correto', async ({ page }) => {
    expect(styles?.backgroundColor).toBe(...);  // 1
    expect(styles?.color).toBe(...);             // 2
    // FALTANDO: borda
});
# Total encontrado: 2 assertions
# RESULTADO: ⚠️ ASSERTIONS INCOMPLETAS (esperado 3, encontrado 2)
```

### Limitações (Basic Mode)

1. **Contagem simples**: Não valida se a assertion corresponde ao step específico
2. **Pode haver falsos-negativos**: Se o dev usar `expect` para setup (ex: `expect(button).toBeVisible()` como Given)
3. **Não detecta mapeamento incorreto**: Se verificar `background` onde deveria verificar `border`

---

## NOME DOS TESTES ESPERADOS

### Regra: Usar texto do Cenário BDD (sanitizado)

O nome do teste deve ser o texto do `Cenário` do `.feature`, sanitizado:

| Caractere | Substituição |
|-----------|--------------|
| `"` | removido |
| `'` | removido |
| `(` `)` | removido |
| `#` | removido |
| `/` | `ou` |

### Exemplos de Conversão

```
# BDD (Cenário):
Cenário: Inverse button type="button" não submete formulário inadvertidamente

# TDD esperado:
test('Inverse button type-button não submete formulário inadvertidamente', ...)

# BDD:
Cenário: Upgrade button tem dimensões do inverse (sm-like)

# TDD esperado:
test('Upgrade button tem dimensões do inverse sm-like', ...)
```

### Validação de Sincronia

Ao verificar sincronia, normalizar ambos os nomes (remover pontuação, normalizar espaços) antes de comparar.

---

## RELATÓRIO DE SAÍDA

```
🔍 Verificando BDD ↔ TDD (Fluxo TDD → BDD)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TDD: [N] testes (REFERÊNCIA)
📊 BDD: [N] cenários (FONTE DA VERDADE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ DIVERGÊNCIAS ENCONTRADAS

┌────────────────────────────────────────────────────────────────┐
│ ✅ SINCRONIZADOS: test() + BDD com @smoke                    │
├────────────────────────────────────────────────────────────────┤
│ • "Inverse button tem estilo correto"                          │
│ • "Upgrade button tem dimensões do inverse"                     │
│ • (outros cenários sincronizados)                              │
└────────────────────────────────────────────────────────────────┘

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
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ TDD SKIP, BDD COM @smoke (PROBLEMA):                       │
├────────────────────────────────────────────────────────────────┤
│ 1. "[nome-do-teste]"                                          │
│    → TDD: test.skip()                                        │
│    → BDD: @smoke                                             │
│    → Ação: Verificar por que smoke quebrou                    │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ❌ TDD SEM BDD (você decide o que fazer):                     │
├────────────────────────────────────────────────────────────────┤
│ 1. "[nome-do-teste]"                                          │
│    → TDD: test() existe                                      │
│    → BDD: Sem cenário correspondente                          │
│    → Ação: Criar cenário no .feature                          │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ BDD SEM TDD (você decide o que fazer):                     │
├────────────────────────────────────────────────────────────────┤
│ 1. "[nome-do-cenario]"                                        │
│    → BDD: Cenário existe                                      │
│    → TDD: Sem teste correspondente                            │
│    → Ação: Implementar teste ou remover cenário               │
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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 AÇÕES MANUAIS NECESSÁRIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

button.feature (BDD):
  ⚠️ ADICIONAR @smoke:
    • "Inverse button em hover" (se teste passou)
    • "Upgrade button ocupa 100% do container" (se teste passou)

button.spec.ts (TDD):
  ❌ (Nenhuma ação - TDD é a referência)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FIM DO RELATÓRIO
   Sincronizados: [N]
   Sugerir @smoke no BDD: [N]
   Problemas (smoke quebrou): [N]
   Assertions incompletas: [N]
   Total divergências: [N]

---

## EXEMPLO DE RELATÓRIO

```
🔍 Verificando BDD ↔ TDD (Fluxo TDD → BDD)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 TDD: 16 testes (REFERÊNCIA)
📊 BDD: 22 cenários (FONTE DA VERDADE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
│ 2. "Upgrade button ocupa 100% do container"                   │
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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 AÇÕES MANUAIS NECESSÁRIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

button.feature (BDD):
  ⚠️ ADICIONAR @smoke:
    • "Inverse button em hover" (se teste passou)
    • "Upgrade button ocupa 100% do container" (se teste passou)
    • "Inverse button renderiza children" (se teste passou)

button.spec.ts (TDD):
  ❌ (Nenhuma ação - TDD é a referência)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FIM DO RELATÓRIO
   Sincronizados: 3
   Sugerir @smoke no BDD: 3
   Problemas (smoke quebrou): 1
   Assertions incompletas: 1
   Total divergências: 8

Exit: 1 (diferenças encontradas)
```

---

## EXIT CODES

| Code | Meaning |
|------|---------|
| 0 | Synced - sem divergências |
| 1 | Diff - divergências encontradas (veja relatório) |
| 2 | Error - falha no parse |

---

## IMPORTANTE

- Este agente **SÓ REPORTA** - não modifica arquivos
- Você decide manualmente o que fazer
- **TDD é a referência**: Se um teste está ativo (`test()`), ele deve ser considerado `@smoke` no BDD
- **BDD é a fonte da verdade ATUALIZADA**: Após o teste passar, o BDD deve sincronizar
- Após ajustar manualmente, rode novamente para verificar
- **Assertions incompletas = FALSO POSITIVO**: Um teste pode passar sem verificar todos os steps do BDD
- **Ciclo de vida**: Implementar → Rodar → Passou? → Adicionar @smoke ao BDD

---

## REGRAS DE SINCRONIZAÇÃO DO SPEC.DOCS.MD

O arquivo `.spec.docs.md` contém **snippets de código** que são essenciais para o desenvolvedor. Durante qualquer sincronização:

### SEMPRE MANTER:

1. **Snippets completos** - Todo código de cada teste
2. **Referências de documentação** - Links para APIs utilizadas
3. **Design patterns** - Dicas de Clean Code, Acessibilidade, etc.
4. **Tags e status** - Mapeamento correto com BDD

### O QUE PODE ALTERAR (durante sync):

1. **Nomes dos testes** - Se o BDD renomeou, atualizar no snippet
2. **Status dos testes** - Se a tag mudou, ajustar test() / test.skip()
3. **Códigos** - Se o teste foi corrigido, atualizar o snippet

### O QUE NUNCA ALTERAR:

1. **Estrutura do documento** - Manter seções organizadas
2. **Referências** - Seção 6 e 7 sempre presentes
3. **Snippets** - Não apagar, apenas atualizar

### Exemplo de Sync Correto:

```
# ANTES do sync:
test.skip('inverse-button-tem-estilo-correto', async ({ page }) => { ... });

# DEPOIS do sync (nome mudou):
test.skip('Inverse button tem estilo correto', async ({ page }) => { ... });
#          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#          Nome atualizado, snippet mantido
```

### Checklist de Verificação:

- [ ] Snippets de todos os testes presentes?
- [ ] Referências de Playwright atualizadas?
- [ ] Design patterns documentados?
- [ ] Tags correspondem ao BDD?
- [ ] Status (@smoke = test(), outros = test.skip())?

---

## COMANDOS

```bash
# Verificar button
@verify-and-sync-bdd-tdd feature=button

# Verificar outra feature
@verify-and-sync-bdd-tdd feature=[nome]
```
