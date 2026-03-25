---
name: tdd-generator
description: "Gera testes Playwright simplificados (*.spec.ts) e documentação (*.spec.docs.md). Mantém testes existentes intocados e passando. Adiciona novos testes para mudanças do BDD. Primeiro teste ATIVO, demais SKIP."
license: MIT
compatibility: opencode
metadata:
  version: "1.1"
  user-invocable: true
  triggers:
    - "gerar testes"
    - "tdd-generator"
    - "criar spec"
    - "gerar spec ts"
    - "atualizar testes"
---

# Skill: TDD Generator

## Quando Usar

Execute esta skill quando:
- O usuário solicitar: `@tdd-generator feature=[nome-da-feature]`
- Após executar `update-bdd` para sincronizar testes com BDD atualizado
- Quando novos cenários BDD forem adicionados ou modificados

**IMPORTANTE**: Testes existentes são **preservados intocados**. A skill adiciona/atualiza SOMENTE os testes relacionados às mudanças do BDD.

**Pré-requisitos:**
1. `specs/features/[feature]/research.md` deve existir e estar aprovado
2. `specs/features/[feature]/plan.md` deve existir
3. `specs/features/[feature]/features/[feature].feature` deve existir

---

## Manutenção de Testes Existentes

Esta skill NUNCA modifica ou remove testes existentes. Funcionamento:

| Situação | Comportamento |
|----------|---------------|
| Teste existente | Mantém intocado, passando |
| Cenário BDD modificado | Atualiza SOMENTE o teste desse cenário |
| Novo cenário BDD | Adiciona novo teste |
| Cenário BDD removido | **NÃO remove teste** (marca como outdated) |

### Fluxo de Atualização

```
BDD atualizado (update-bdd)
         ↓
tdd-generator executa
         ↓
┌────────────────────────────────────────┐
│ Para cada cenário BDD:                 │
│                                        │
│ Se teste existe:                       │
│   → Verifica se valores bateram       │
│   → Atualiza se necessário             │
│   → Mantém status (ativo/skip)        │
│                                        │
│ Se NÃO existe:                         │
│   → Adiciona novo teste               │
│   → Marca como SKIP (não ativo)       │
│                                        │
│ Testes existentes:                     │
│   → NUNCA modificados                 │
│   → NUNCA removidos                   │
└────────────────────────────────────────┘
```

## Início Rápido

1. Obter nome da feature da entrada do usuário
2. Verificar se .spec.ts já existe (perguntar sobrescrita)
3. Verificar pré-requisitos (research.md, plan.md, .feature)
4. Ler cenários do arquivo .feature
5. Gerar .spec.ts com padrão: 1º ativo, 2º skip com código, demais skip como placeholder
6. Gerar .spec.docs.md completo com todos os snippets
7. Salvar arquivos em frontend/tests/features/[feature]/

---

## Passo a Passo

### Passo 1: Verificar .spec.ts Existente

Verificar se `frontend/tests/features/[feature]/[feature].spec.ts` já existe.

**Se NÃO existir**: Prosseguir com geração normalmente.

**Se existir**: Executar modo de ATUALIZAÇÃO (não sobrescreve):
- Ler .spec.ts existente
- Ler .feature atualizado
- Identificar cenários modificados/adicionados
- Adicionar/atualizar SOMENTE os testes afetados
- **Manter TODOS os testes existentes intocados**

```typescript
interface UpdateMode {
  existingTests: TestCase[];
  newScenarios: string[];
  modifiedScenarios: string[];
  // Testes existentes são preservados, não modificados
}
```

### Passo 2: Verificar Pré-requisitos

```typescript
// Verificar research.md
const researchPath = `specs/features/${feature}/research.md`;
if (!await fileExists(researchPath)) {
  return { error: 'research.md não encontrado. Execute @research-to-plan primeiro.' };
}

// Verificar plan.md
const planPath = `specs/features/${feature}/plan.md`;
if (!await fileExists(planPath)) {
  return { error: 'plan.md não encontrado. Execute @research-to-plan primeiro.' };
}

// Verificar .feature
const featurePath = `specs/features/${feature}/features/${feature}.feature`;
if (!await fileExists(featurePath)) {
  return { error: '.feature não encontrado. Execute @bdd-generator primeiro.' };
}
```

### Passo 3: Ler .feature

Extrair do arquivo .feature:
- Cenários BDD
- Tags (@desktop, @mobile, @a11y, @smoke, etc.)
- Given-When-Then de cada cenário

### Passo 4: Mapear Cenários para Nomes de Teste

Seguir o padrão de nomenclatura em [references/TEST_PATTERNS.md](references/TEST_PATTERNS.md).

**Tabela de Conversão:**

| Caractere | Substituição | Exemplo |
|-----------|--------------|---------|
| `"` | removido | `type="button"` → `type-button` |
| `'` | removido | - |
| `(` | removido | `(sm-like)` → `sm-like` |
| `)` | removido | - |
| `#` | removido | - |
| `/` | substituído por `ou` | - |
| `.` à esquerda | removido | `.btn-spinner` → `btn-spinner` |

### Passo 5: Aplicar Padrão de Unificação

Consultar [references/TEST_PATTERNS.md](references/TEST_PATTERNS.md) para o padrão de unificação de assertions.

**ANTES (redundante):**
```typescript
test('RF-06 - deve ter altura de 32px', async ({ page }) => {
  expect(styles?.height).toBe(32);
});
test('RF-06 - deve ter padding 6x12px', async ({ page }) => {
  expect(styles?.paddingTop).toBe(6);
  expect(styles?.paddingRight).toBe(12);
});
```

**DEPOIS (unificado):**
```typescript
test('RF-06 - deve ter dimensões sm (32px, 6x12px, 12px, 6px)', async ({ page }) => {
  const styles = await getComputedStyles(page, '[data-testid="button-sm"]');
  expect(styles?.height).toBe(32);
  expect(styles?.paddingTop).toBe(6);
  expect(styles?.paddingRight).toBe(12);
  expect(styles?.paddingBottom).toBe(6);
  expect(styles?.paddingLeft).toBe(12);
  expect(styles?.fontSize).toBe(12);
  expect(styles?.borderRadius).toBe(6);
});
```

### Passo 6: Gerar .spec.ts

Consultar [references/SPEC_STRUCTURE.md](references/SPEC_STRUCTURE.md) para estrutura completa.

**Padrão de Geração:**

| Posição | Tipo | Descrição |
|---------|------|-----------|
| 1º teste | **ATIVO** | Código completo, sem `.skip()` |
| 2º teste | SKIP | Código completo, com `.skip()` |
| 3º teste | SKIP | Código completo, com `.skip()` |
| 4º+ teste | SKIP | Apenas assinatura + TODO |

### Passo 7: Gerar .spec.docs.md

O arquivo deve conter:
1. Metodologia (BDD → TDD Sync Rules)
2. Testes com snippets completos por categoria
3. Resumo (totais por categoria)
4. Design Tokens
5. Comandos úteis
6. Referências de Documentação (Playwright API, Utils, WAI-ARIA)
7. Dicas de Design Patterns

### Passo 8: Criar Diretório e Salvar

Criar diretório `frontend/tests/features/[feature]/` e salvar:
- `[feature].spec.ts`
- `[feature].spec.docs.md`

---

## Princípios

1. **1 RF = 1 TESTE** com múltiplas assertions unificadas
2. **Primeiro teste ATIVO**, demais SKIP
3. **Unificar assertions relacionadas** (ex: height + padding + fontSize = 1 teste)
4. **Sem redundância**: não repetir verificações já cobertas

---

## Regras

1. **Nomenclatura completa** - Usar texto do cenário BDD completo como nome do teste
2. **Manter texto em português** - não abreviar
3. **Preservar acentos** - ç, ã, é, etc. são mantidos
4. **1:1 com cenário BDD** - cada cenário = 1 teste
5. **Primeira letra maiúscula** - seguir padrão do cenário BDD
6. **Sync com BDD**: @smoke = teste ativo, outras tags = test.skip()
7. **Código limpo** - 3 primeiros testes completos, fácil de iniciar
8. **Progresso visível** - Pode ativar tests um a um conforme implementa

---

## Output

### Geração nova
```
✅ Testes gerados para feature [nome]

Arquivos:
- frontend/tests/features/[feature]/[feature].spec.ts
- frontend/tests/features/[feature]/[feature].spec.docs.md

Testes: N (1 ATIVO com código, 2 SKIP com código, N-3 SKIP como placeholder)
```

### Atualização
```
✅ Testes atualizados para feature [nome]

Arquivos:
- frontend/tests/features/[feature]/[feature].spec.ts
- frontend/tests/features/[feature]/[feature].spec.docs.md

Testes existentes: 5 (preservados, passando)
Testes adicionados: 2 (novos cenários BDD)
Testes modificados: 1 (cenário atualizado)
Testes removidos: 0 (nenhum removido)

⚠️ Cenários BDD modificados que não têm teste correspondente:
  • "Avatar xl tem 64px" → teste adicionado
```

---

## Validações

Antes de salvar, verificar:

**Para geração nova:**
- [ ] Todos os cenários BDD estão mapeados para testes
- [ ] Nome do teste corresponde ao cenário BDD
- [ ] Primeiro teste está ATIVO (sem .skip())
- [ ] Segundo e terceiro testes estão SKIP com código completo
- [ ] Demais testes estão SKIP como placeholders
- [ ] Assertions estão unificadas logicamente
- [ ] .spec.docs.md contém snippets completos
- [ ] Tokens estão centralizados no objeto TOKENS
- [ ] Seletores usam data-testid

**Para atualização:**
- [ ] Testes existentes são preservados exatamente como estão
- [ ] Novos testes são adicionados para novos cenários
- [ ] Testes existentes não são modificados
- [ ] Testes existentes continuam passando
- [ ] Novos testes estão marcados como SKIP (para dev ativar)
