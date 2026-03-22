# Button: Documentação de Implementação dos Testes

> **FONTE DA VERDADE: `specs/features/button/features/button.feature`**
> TDD sincronizado com BDD - cada teste corresponde a um cenário BDD

---

## 1. Metodologia

### BDD → TDD Sync Rules

| Regra | Descrição |
|-------|-----------|
| TDD SEM BDD | ❌ REMOVER - apagar teste |
| BDD SEM TDD | ⚠️ GERAR - criar teste |
| @smoke | `test()` ATIVO |
| Others | `test.skip()` |

### Status dos Testes

| Tag BDD | Status TDD | Count |
|---------|-------------|-------|
| @smoke | `test()` (ativo) | 4 |
| others | `test.skip()` | 18 |

---

## 2. Testes (Sincronizados com BDD)

### 2.1 VARIANTES - Inverse

| Teste | Tags | Status |
|-------|------|--------|
| `inverse-button-tem-estilo-correto` | @smoke | ✅ ATIVO |
| `inverse-button-em-hover` | @hover | ⏭️ SKIP |
| `inverse-button-em-estado-active` | @active | ⏭️ SKIP |

### 2.2 ESTADO - Disabled

| Teste | Tags | Status |
|-------|------|--------|
| `inverse-button-em-disabled-tem-estilo-correto` | @smoke | ✅ ATIVO |
| `inverse-button-em-disabled-nao-responde-a-cliques` | @interaction | ⏭️ SKIP |

### 2.3 ESTADO - Loading

| Teste | Tags | Status |
|-------|------|--------|
| `inverse-button-em-loading-exibe-spinner-e-desabilita-interacao` | @smoke | ✅ ATIVO |
| `inverse-button-em-loading-nao-responde-a-cliques` | @interaction | ⏭️ SKIP |

### 2.4 ESTADO - Focus

| Teste | Tags | Status |
|-------|------|--------|
| `inverse-button-em-focus-tem-focus-ring-visivel` | @a11y | ⏭️ SKIP |

### 2.5 TAMANHO - Upgrade

| Teste | Tags | Status |
|-------|------|--------|
| `upgrade-button-tem-dimensoes-do-inverse-sm-like` | @smoke | ✅ ATIVO |
| `upgrade-button-ocupa-100-do-container` | @full-width | ⏭️ SKIP |

### 2.6 ACESSIBILIDADE

| Teste | Tags | Status |
|-------|------|--------|
| `inverse-button-e-navegavel-por-teclado` | @keyboard | ⏭️ SKIP |
| `inverse-button-expoe-estados-corretamente-para-leitores-de-tela` | @aria | ⏭️ SKIP |
| `inverse-button-em-disabled-expoe-estado-corretamente` | @aria | ⏭️ SKIP |
| `inverse-button-em-loading-expoe-estado-corretamente` | @aria | ⏭️ SKIP |
| `inverse-button-em-mobile-tem-touch-target-adequado` | @touch-target | ⏭️ SKIP |

### 2.7 PROTEÇÃO CRÍTICA (@defensive)

| Teste | Tags | Status |
|-------|------|--------|
| `double-click-nao-causa-acao-duplicada-no-inverse-button` | @double-click | ⏭️ SKIP |
| `spinner-aparece-imediatamente-ao-clicar-no-inverse-button` | @double-click | ⏭️ SKIP |
| `transicao-para-loading-state-preserva-layout-no-inverse-button` | @loading-transition | ⏭️ SKIP |
| `inverse-button-type-button-nao-submete-formulario-inadvertidamente` | @type-attribute | ⏭️ SKIP |

### 2.8 CLASSNAME

| Teste | Tags | Status |
|-------|------|--------|
| `inverse-button-aceita-classname-para-estilos-customizados` | @classname | ⏭️ SKIP |

### 2.9 DATATESTID

| Teste | Tags | Status |
|-------|------|--------|
| `inverse-button-aceita-data-testid-para-identificacao-em-testes` | @testid | ⏭️ SKIP |

### 2.10 CHILDREN

| Teste | Tags | Status |
|-------|------|--------|
| `inverse-button-renderiza-children-como-texto-upgrade-now` | @children | ⏭️ SKIP |

---

## 3. Resumo

| Categoria | Total | Ativos | Skipped |
|-----------|-------|--------|---------|
| Variantes | 3 | 1 | 2 |
| Disabled | 2 | 1 | 1 |
| Loading | 2 | 1 | 1 |
| Focus | 1 | 0 | 1 |
| Size | 2 | 1 | 1 |
| Acessibilidade | 5 | 0 | 5 |
| Defensive | 4 | 0 | 4 |
| Classname | 1 | 0 | 1 |
| Testid | 1 | 0 | 1 |
| Children | 1 | 0 | 1 |
| **TOTAL** | **22** | **4** | **18** |

---

## 4. Design Tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#ff5c00` | Primary/Inverse text |
| `--color-bg-muted` | `#1a1a1d` | Hover background |
| `--color-border-focus` | `#3b82f6` | Focus ring |
| `--color-text-primary` | `#ffffff` | Default text |
| `--radius-md` | `6px` | Inverse border-radius |
| `--font-size-xs` | `12px` | Upgrade button font-size |

---

## 5. Comandos

```bash
# Executar todos os testes
npm test

# Executar apenas botão
npx playwright test button.spec.ts

# Executar apenas @smoke
npx playwright test button.spec.ts --grep "@smoke"

# Executar teste específico
npx playwright test button.spec.ts -g "inverse-button-tem-estilo-correto"
```

---

## 6. Referências

| Recurso | Link |
|---------|------|
| Playwright | https://playwright.dev/docs/intro |
| WAI-ARIA Button | https://www.w3.org/WAI/ARIA/apg/patterns/button/ |
| WCAG Contrast | https://webaim.org/resources/contrastchecker/ |
