---
name: verify-and-sync-bdd-tdd
description: "Verifica e reporta divergências entre BDD (.feature) e TDD (.spec.ts + .spec.docs.md). BDD é fonte da verdade. Reporta diferenças para ajuste MANUAL."
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
║  BDD = FONTE DA VERDADE                                        ║
║  TDD = IMPLEMENTAÇÃO DO BDD                                    ║
║                                                                   ║
║  ESTE AGENTE SÓ REPORTA DIVERGÊNCIAS - NÃO APLICA MUDANÇAS      ║
║  VOCÊ DECIDE O QUE FAZER MANUALMENTE                            ║
╚═══════════════════════════════════════════════════════════════════╝
```

| Situação | Ação do Agente |
|----------|---------------|
| TDD sem BDD | ⚠️ **REPORTAR** - você decide |
| BDD sem TDD | ⚠️ **REPORTAR** - você decide |
| Status diferente | ⚠️ **REPORTAR** - você decide |
| Assertions incompletas | ⚠️ **REPORTAR** - você decide |

---

## INPUT/OUTPUT

**INPUTS:**
- `specs/features/[feature]/features/[feature].feature` ← **FONTE DA VERDADE**
- `frontend/tests/features/[feature]/[feature].spec.ts`
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

PASSO 3: Validar Contra BDD
  ├── Para cada teste TDD → existe cenário BDD?
  │   ├── ❌ NÃO → REPORTAR (TDD sem BDD)
  │   └── ✅ SIM → OK
  ├── Para cada cenário BDD → existe teste TDD?
  │   ├── ❌ NÃO → REPORTAR (BDD sem TDD)
  │   └── ✅ SIM → OK
  └── Verificar status: @smoke = ativo, outros = skip
       └── ❌ DIFERENTE → REPORTAR

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

## MAPEAMENTO: TAGS → STATUS ESPERADO

| Tag | Status Esperado |
|-----|----------------|
| `@smoke` | `test()` (ativo) |
| `@hover` | `test.skip()` |
| `@active` | `test.skip()` |
| `@state` | `test.skip()` |
| `@interaction` | `test.skip()` |
| `@a11y` | `test.skip()` |
| `@keyboard` | `test.skip()` |
| `@aria` | `test.skip()` |
| `@touch-target` | `test.skip()` |
| `@defensive` | `test.skip()` |
| `@variant` | `test.skip()` (a menos que @smoke) |
| `@size` | `test.skip()` |
| `@full-width` | `test.skip()` |
| `@testid` | `test.skip()` |
| `@classname` | `test.skip()` |
| `@children` | `test.skip()` |

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
🔍 Verificando BDD ↔ TDD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 BDD: [N] cenários encontrados
📊 TDD: [N] testes encontrados
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ DIVERGÊNCIAS ENCONTRADAS

┌────────────────────────────────────────────────────────────────┐
│ ❌ TDD SEM BDD (você decide o que fazer):                     │
├────────────────────────────────────────────────────────────────┤
│ 1. "[nome-do-teste]"                                          │
│    → Sem cenário BDD correspondente                           │
│    → Ação: REMOVER do .spec.ts OU adicionar cenário no .feature│
│                                                                │
│ 2. "[nome-do-teste]"                                          │
│    → Sem cenário BDD correspondente                           │
│    → Ação: REMOVER do .spec.ts OU adicionar cenário no .feature│
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ BDD SEM TDD (você decide o que fazer):                     │
├────────────────────────────────────────────────────────────────┤
│ 1. "[nome-do-cenario]"                                        │
│    → Cenário BDD existe, teste TDD não                        │
│    → Ação: GERAR teste no .spec.ts OU remover cenário no .feature│
│                                                                │
│ 2. "[nome-do-cenario]"                                        │
│    → Cenário BDD existe, teste TDD não                        │
│    → Ação: GERAR teste no .spec.ts OU remover cenário no .feature│
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ STATUS DIFERENTE:                                          │
├────────────────────────────────────────────────────────────────┤
│ 1. "[nome-do-teste]"                                          │
│    → BDD: @smoke (deveria ser test())                        │
│    → TDD: test.skip()                                        │
│    → Ação: Mudar test.skip() → test() no .spec.ts            │
│                                                                │
│ 2. "[nome-do-teste]"                                          │
│    → BDD: SEM @smoke (deveria ser test.skip())               │
│    → TDD: test()                                              │
│    → Ação: Mudar test() → test.skip() no .spec.ts            │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ ASSERTIONS INCOMPLETAS (ANTI-FALSO-POSITIVO):              │
├────────────────────────────────────────────────────────────────┤
│ 1. "Inverse button tem estilo correto"                        │
│    → BDD: 3 steps (background, cor, borda)                   │
│    → TDD: 2 assertions                                        │
│    → FALTANDO: 1 assertion                                     │
│    → Step: "não deve ter borda" sem assert no TDD            │
│    → Ação: Adicionar expect para borda no .spec.ts           │
│                                                                │
│ 2. "Upgrade button tem dimensões do inverse sm-like"         │
│    → BDD: 4 steps (font-size, font-weight, radius, padding)  │
│    → TDD: 5 assertions (inclui paddingTop + paddingBottom)   │
│    → ✅ OK - assertions suficientes                            │
└────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 AÇÕES MANUAIS NECESSÁRIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

button.spec.ts:
  ❌ REMOVER: [lista de testes sem BDD]
  ⚠️ GERAR: [lista de testes faltando]
  ~ AJUSTAR STATUS: [lista de status diferentes]
  ⚠️ COMPLETAR ASSERTIONS: [lista de testes + steps faltando]

button.feature:
  ❌ (Nenhuma ação - BDD é fonte da verdade)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FIM DO RELATÓRIO
   TDD sem BDD: [N]
   BDD sem TDD: [N]
   Status diferente: [N]
   Assertions incompletas: [N]
   Total divergências: [N]

Exit: 1 (diferenças encontradas)
```

---

## EXEMPLO DE RELATÓRIO

```
🔍 Verificando BDD ↔ TDD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 BDD: 22 cenários
📊 TDD: 16 testes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ DIVERGÊNCIAS ENCONTRADAS

┌────────────────────────────────────────────────────────────────┐
│ ❌ TDD SEM BDD (você decide o que fazer):                     │
├────────────────────────────────────────────────────────────────┤
│ 1. "primary-button"                                           │
│    → Sem cenário BDD correspondente                           │
│    → Ação: REMOVER do .spec.ts OU adicionar cenário no .feature│
│                                                                │
│ 2. "secondary-button"                                          │
│    → Sem cenário BDD correspondente                           │
│    → Ação: REMOVER do .spec.ts OU adicionar cenário no .feature│
│                                                                │
│ 3. "ghost-button"                                             │
│    → Sem cenário BDD correspondente                           │
│    → Ação: REMOVER do .spec.ts OU adicionar cenário no .feature│
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ BDD SEM TDD (você decide o que fazer):                     │
├────────────────────────────────────────────────────────────────┤
│ 1. "inverse-button-em-active"                                  │
│    → Cenário BDD existe, teste TDD não                       │
│    → Ação: GERAR teste no .spec.ts OU remover cenário no .feature│
│                                                                │
│ 2. "double-click-protection"                                   │
│    → Cenário BDD existe, teste TDD não                       │
│    → Ação: GERAR teste no .spec.ts OU remover cenário no .feature│
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ STATUS DIFERENTE:                                          │
├────────────────────────────────────────────────────────────────┤
│ 1. "inverse-button-tem-estilo-correto"                        │
│    → BDD: @smoke (deveria ser test())                        │
│    → TDD: test.skip()                                        │
│    → Ação: Mudar test.skip() → test() no .spec.ts            │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│ ⚠️ ASSERTIONS INCOMPLETAS:                                   │
├────────────────────────────────────────────────────────────────┤
│ 1. "Inverse button tem estilo correto"                        │
│    → BDD: 3 assertions esperadas                              │
│    → TDD: 2 assertions encontradas                            │
│    → FALTANDO: "não deve ter borda"                          │
│    → Ação: Adicionar expect para borda                       │
└────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 AÇÕES MANUAIS NECESSÁRIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

button.spec.ts:
  ❌ REMOVER: primary-button, secondary-button, ghost-button
  ⚠️ GERAR: inverse-button-em-active, double-click-protection
  ~ AJUSTAR: inverse-button-tem-estilo-correto (skip → ativo)
  ⚠️ COMPLETAR: Inverse button tem estilo correto (faltando borda)

button.feature:
  ❌ (Nenhuma ação - BDD é fonte da verdade)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FIM DO RELATÓRIO
   TDD sem BDD: 3
   BDD sem TDD: 2
   Status diferente: 1
   Assertions incompletas: 1
   Total divergências: 7

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
- BDD é intocável - é a fonte da verdade
- Após ajustar manualmente, rode novamente para verificar
- **Assertions incompletas = FALSO POSITIVO**: Um teste pode passar sem verificar todos os steps do BDD

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
