---
name: tdd-generator
description: "Gera testes Playwright documentados (*.spec.ts) e documentação (*.spec.docs.md) com análise dinâmica. Inclui: (1) Metodologia, (2) Clean Code - Robert C. Martin, (3) Design Patterns, (4) Alternative Implementations, (5) Código para passar para cada RF, (6) Referências completas. Testes começam SKIP exceto o primeiro."
mode: subagent
temperature: 0.1
tools:
  write: true
  edit: true
  read: true
permission:
  edit: allow
---

## Como Usar

```
@tdd-generator feature=[nome-da-feature]
```

---

## Visão Geral

**INPUTS:**
- `specs/features/[feature]/research.md`
- `specs/features/[feature]/plan.md`
- `specs/features/[feature]/**/*.feature` (opcional)

**OUTPUTS:**
- `frontend/tests/features/[feature]/[feature].spec.ts`
- `frontend/tests/features/[feature]/[feature].spec.docs.md`

---

## FLUXO DE GERAÇÃO

### PASSO 0: Ler Arquivos Fonte

```typescript
async function readFeatureFiles(feature: string): Promise<FeatureFiles> {
  const basePath = `specs/features/${feature}`;
  
  return {
    research: await readFile(`${basePath}/research.md`).catch(() => null),
    plan: await readFile(`${basePath}/plan.md`).catch(() => null),
    featureFiles: await glob(`${basePath}/**/*.feature`).catch(() => []),
  };
}
```

---

### PASSO 1: Extrair Contexto

```typescript
interface FeatureContext {
  featureName: string;
  componentType: 'atomic' | 'molecular' | 'compound';
  complexity: 'low' | 'medium' | 'high';
  props: PropDefinition[];
  states: string[];
  currentImplementation: {
    approach: string;
    cssStrategy: string;
  };
  rfs: RFDefinition[];
  tokens: string[];
}

function analyzeFeature(files: FeatureFiles): FeatureContext {
  const plan = files.plan;
  
  return {
    featureName: extractFeatureName(plan),
    componentType: detectComponentType(plan),
    complexity: plan.rfs?.length > 10 ? 'high' : plan.rfs?.length > 5 ? 'medium' : 'low',
    props: extractProps(plan),
    states: extractStates(plan),
    currentImplementation: extractImplementation(plan),
    rfs: extractRFs(plan),
    tokens: extractTokens(plan),
  };
}
```

---

### PASSO 2: Gerar *.spec.ts

```typescript
function generateSpecTs(ctx: FeatureContext): string {
  let output = `import { test, expect, Page } from '@playwright/test';

/**
 * ${ctx.featureName} Component - Playwright E2E Tests
 * 
 * Generated from: specs/features/${ctx.featureName.toLowerCase()}/plan.md
 * TDD Strategy: Red-Green-Refactor with incremental test activation
 * Complexity: ${ctx.complexity}
 */

test.describe('Feature: ${ctx.featureName}', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
  });

${generateTestBlocks(ctx)}

});
`;
  return output;
}

function generateTestBlocks(ctx: FeatureContext): string {
  let output = '';
  
  // Agrupar RFs por categoria
  const groupedRFs = groupRFsByCategory(ctx.rfs);
  
  let testIndex = 0;
  for (const [category, rfs] of Object.entries(groupedRFs)) {
    output += `\n  // ==========================================================================\n`;
    output += `  // ${category}\n`;
    output += `  // ==========================================================================\n\n`;
    
    for (const rf of rfs) {
      const isFirst = testIndex === 0;
      output += generateTestForRF(rf, isFirst);
      testIndex++;
    }
  }
  
  return output;
}

function generateTestForRF(rf: RFDefinition, isFirst: boolean): string {
  const testFn = isFirst ? 'test' : 'test.skip';
  
  return `  test${isFirst ? '' : '.skip'}('${rf.id} - ${formatTestName(rf.description)}', async ({ page }) => {
    await page.setContent(create${rf.component}HTML({ ${rf.testParams} }));
    const element = page.locator('[data-testid="${rf.testSelector}"]');
    await expect(element).toBeVisible();
  });

`;
}

function formatTestName(description: string): string {
  return description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .substring(0, 60);
}
```

---

### PASSO 3: Gerar *.spec.docs.md

A ordem deve seguir EXATAMENTE a mesma sequência do spec.ts para facilitar leitura lado a lado.

```typescript
function generateSpecDocs(ctx: FeatureContext): string {
  let output = `# ${ctx.featureName}: Documentação de Implementação dos Testes

> Generated from: specs/features/${ctx.featureName.toLowerCase()}/plan.md
> TDD Strategy: Red-Green-Refactor with incremental test activation
> Complexity: ${ctx.complexity}

---

`;

  // 1. METODOLOGIA (curta)
  output += generateMethodology(ctx);
  
  // 2. CLEAN CODE (curto)
  output += generateCleanCode(ctx);
  
  // 3. DESIGN PATTERNS (curto)
  output += generateDesignPatterns(ctx);
  
  // 4. ALTERNATIVES (curto)
  output += generateAlternatives(ctx);
  
  // 5-9. CÓDIGO PARA CADA RF (NA ORDEM DO SPEC.TS)
  const groupedRFs = groupRFsByCategory(ctx.rfs);
  for (const [category, rfs] of Object.entries(groupedRFs)) {
    output += `## ${category}\n\n`;
    for (const rf of rfs) {
      output += generateRFDocumentation(rf, ctx);
    }
  }
  
  // 10. REFERÊNCIAS COMPLETAS (tabela consolidada)
  output += generateCompleteReferences(ctx);
  
  // 11. ESTRUTURA DE ARQUIVOS
  output += generateFileStructure(ctx);
  
  return output;
}
```

---

## SEÇÕES DO docs.md

### 1. METODOLOGIA

```markdown
## 1. Metodologia

### 1.1 TDD Cycle (Red-Green-Refactor)

1. **Red**: Escreva teste que falha
2. **Green**: Código mínimo para passar
3. **Refactor**: Melhore código mantendo testes

### 1.2 Testing Best Practices

- **AAA**: Arrange-Act-Assert
- **F.I.R.S.T.**: Fast, Independent, Repeatable, Self-Validating, Timely

**Referências:**
- [TDD Guide](https://developer.mozilla.org/en-US/docs/learn/TDD)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
```

---

### 2. CLEAN CODE - Robert C. Martin

```markdown
## 2. Clean Code - Robert C. Martin

### 2.1 Significado dos Nomes

\`\`\`typescript
${extractTypesFromPlan(ctx)}
\`\`\`

### 2.2 Funções

\`\`\`typescript
${extractFunctionsFromPlan(ctx)}
\`\`\`

### 2.3 SOLID Principles

| Princípio | ${ctx.featureName} | Exemplo |
|-----------|---------------------|---------|
| **S**ingle Responsibility | Cada função uma coisa | \`get${ctx.featureName}Classes()\` |
| **O**pen/Closed | Aberto para extensão | Adicionar variant |

**Referências:**
- [Clean Code Book](https://www.amazon.com/dp/0132350882)
- [SOLID Principles](https://digitaldefynd.org/solid-design-principles/)
```

---

### 3. DESIGN PATTERNS

```markdown
## 3. Design Patterns

### 3.1 Compound Components

\`\`\`tsx
<${ctx.featureName} variant="primary">
  <${ctx.featureName}.Icon><Icon /></${ctx.featureName}.Icon>
  <${ctx.featureName}.Text>Text</${ctx.featureName}.Text>
</${ctx.featureName}>
\`\`\`

### 3.2 Polymorphic (asChild)

\`\`\`tsx
import { Slot } from '@radix-ui/react-slot';

function ${ctx.featureName}({ asChild, children, ...props }: Props) {
  const Comp = asChild ? Slot : 'div';
  return <Comp {...props}>{children}</Comp>;
}
\`\`\`

**Referências:**
- [Radix UI](https://www.radix-ui.com/)
- [Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)
```

---

### 4. ALTERNATIVES

```markdown
## 4. Alternative Implementations

### Alternative A: Compound Components com Context

**Pros:** API declarativa, estado encapsulado
**Cons:** Overhead de Context, mais arquivos
**Quando usar:** Máxima flexibilidade

### Alternative B: CSS Modules + Props Diretas (IMPLEMENTAÇÃO ATUAL)

**Pros:** Simplicidade, performance
**Cons:** API menos flexível
**Quando usar:** Projetos simples
```

---

### 5-9. CÓDIGO PARA CADA RF

```markdown
## 5. RF-01: ${rfTitle}

### Código para Passar

\`\`\`css
/* ${ctx.featureName.toLowerCase()}.module.css */
${extractCSSForRF(rf, ctx)}
\`\`\`

\`\`\`tsx
// ${ctx.featureName}.tsx
${extractTSForRF(rf, ctx)}
\`\`\`

**Referências:**
${generateRFReferences(rf)}
```

---

### 10. REFERÊNCIAS COMPLETAS

```markdown
## 10. Referências Completas

| Categoria | Recurso | Link |
|-----------|---------|------|
| **Playwright** | Docs | https://playwright.dev/docs/intro |
| | toBeVisible | https://playwright.dev/docs/test-assertions#expect-locator-to-be-visible |
| | toHaveAttribute | https://playwright.dev/docs/test-assertions#expect-locator-to-have-attribute |
| | boundingBox | https://playwright.dev/docs/api/class-locator#locator-bounding-box |
| | setContent | https://playwright.dev/docs/api/class-page#page-set-content |
| **React** | Docs | https://react.dev/ |
| | Components | https://react.dev/learn/your-first-component |
| | Props | https://react.dev/learn/passing-props-to-a-component |
| **TypeScript** | Handbook | https://www.typescriptlang.org/docs/ |
| **CSS Modules** | Guide | https://github.com/css-modules/css-modules |
| **Radix UI** | Slot | https://www.radix-ui.com/primitives/docs/utilities/slot |
| **WAI-ARIA** | Button | https://www.w3.org/WAI/ARIA/apg/patterns/button/ |
```

---

### 11. ESTRUTURA DE ARQUIVOS

```markdown
## 11. Estrutura de Arquivos

\`\`\`
frontend/
├── src/
│   └── components/
│       └── ${ctx.featureName.toLowerCase()}/
│           ├── ${ctx.featureName}.tsx
│           ├── ${ctx.featureName.toLowerCase()}.module.css
│           └── index.ts
└── tests/
    └── features/
        └── ${ctx.featureName.toLowerCase()}/
            ├── ${ctx.featureName.toLowerCase()}.spec.ts
            └── ${ctx.featureName.toLowerCase()}.spec.docs.md
\`\`\`
```

---

## REGRAS

1. **Ordem do docs.md** deve seguir EXATAMENTE a mesma sequência do spec.ts
2. **Primeiro teste ATIVO**, demais SKIP
3. **Código para passar** incluído em cada RF
4. **Referências** incluidas para cada RF
5. **Referências completas** como último item

---

## EXEMPLO DE OUTPUT COMPLETO

### badge.spec.ts

```typescript
import { test, expect, Page } from '@playwright/test';

/**
 * Badge Component - Playwright E2E Tests
 * 
 * Generated from: specs/features/badge/plan.md
 * TDD Strategy: Red-Green-Refactor with incremental test activation
 * Complexity: low
 */

test.describe('Feature: Badge', () => {
  test.beforeEach(async ({ page }) => { await page.goto(TEST_URL); });
 
  test('RF-01 - deve renderizar badge visível', async ({ page }) => {
    await page.setContent(createBadgeHTML({ variant: 'primary' }));
    await expect(page.locator('[data-testid="badge"]')).toBeVisible();
  });

  test.skip('RF-01 - deve ter background primary', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="badge"]');
    expect(styles.backgroundColor).toBe('rgb(255, 92, 0)');
  });

  test.skip('RF-02 - deve ter border e background transparente', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="badge"]');
    expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  test.skip('RF-09 - deve ter opacity 50% quando disabled', async ({ page }) => {
    const styles = await getComputedStyles(page, '[data-testid="badge"]');
    expect(styles.opacity).toBe(0.5);
  });

});
```

### badge.spec.docs.md

```markdown
# Badge: Documentação de Implementação dos Testes

> Generated from: specs/features/badge/plan.md
> TDD Strategy: Red-Green-Refactor with incremental test activation
> Complexity: low

---

## 1. Metodologia

### 1.1 TDD Cycle (Red-Green-Refactor)

1. **Red**: Escreva teste que falha
2. **Green**: Código mínimo para passar
3. **Refactor**: Melhore código mantendo testes

### 1.2 Testing Best Practices

- **AAA**: Arrange-Act-Assert
- **F.I.R.S.T.**: Fast, Independent, Repeatable, Self-Validating, Timely

---

## 2. Clean Code - Robert C. Martin

### 2.1 Significado dos Nomes

\`\`\`typescript
type BadgeVariant = 'primary' | 'secondary' | 'error';
interface BadgeProps {
  variant?: BadgeVariant;
  disabled?: boolean;
  children: ReactNode;
}
\`\`\`

### 2.2 Funções

\`\`\`typescript
function getBadgeClasses({ variant, disabled }: BadgeProps): string {
  const classes = ['badge', \`badge-\${variant}\`];
  if (disabled) classes.push('badge-disabled');
  return classes.join(' ');
}
\`\`\`

---

## 3. Design Patterns

### 3.1 Compound Components

\`\`\`tsx
<Badge variant="primary">
  <Badge.Icon><Icon /></Badge.Icon>
  <Badge.Text>Text</Badge.Text>
</Badge>
\`\`\`

### 3.2 Polymorphic (asChild)

\`\`\`tsx
import { Slot } from '@radix-ui/react-slot';
function Badge({ asChild, children, ...props }) {
  return <Slot {...props}>{children}</Slot>;
}
\`\`\`

---

## 4. Alternative Implementations

### Alternative A: Compound Components com Context
**Quando usar:** Máxima flexibilidade

### Alternative B: CSS Modules + Props (IMPLEMENTAÇÃO ATUAL)
**Quando usar:** Projetos simples

---

## 5. RF-01: Variant Primary

### Código para Passar

\`\`\`css
.badge {
  display: inline-flex;
  border-radius: 6px;
}
.badge-primary {
  background: #FF5C00;
  color: #FFFFFF;
}
\`\`\`

\`\`\`tsx
function Badge({ variant = 'primary', children }: BadgeProps) {
  return <span data-testid="badge" className={\`badge badge-\${variant}\`}>{children}</span>;
}
\`\`\`

**Referências:**
- [toBeVisible](https://playwright.dev/docs/test-assertions#expect-locator-to-be-visible)

---

## 6. RF-02: Variant Secondary

### Código para Passar

\`\`\`css
.badge-secondary {
  background: transparent;
  border: 1px solid #2A2A2E;
}
\`\`\`

---

## 7. RF-09: Disabled

### Código para Passar

\`\`\`css
.badge-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
\`\`\`

\`\`\`tsx
function Badge({ disabled = false, ...props }: BadgeProps) {
  return <span data-testid="badge" disabled={disabled} className={getBadgeClasses({ ...props, disabled })}>{props.children}</span>;
}
\`\`\`

---

## 8. Referências Completas

| Categoria | Recurso | Link |
|-----------|---------|------|
| Playwright | Docs | https://playwright.dev/docs/intro |
| | toBeVisible | https://playwright.dev/docs/test-assertions#expect-locator-to-be-visible |
| | toHaveAttribute | https://playwright.dev/docs/test-assertions#expect-locator-to-have-attribute |
| React | Docs | https://react.dev/ |
| TypeScript | Handbook | https://www.typescriptlang.org/docs/ |
| CSS Modules | Guide | https://github.com/css-modules/css-modules |
| Radix UI | Slot | https://www.radix-ui.com/primitives/docs/utilities/slot |

---

## 9. Estrutura de Arquivos

\`\`\`
frontend/
├── src/components/badge/
│   ├── Badge.tsx
│   ├── badge.module.css
│   └── index.ts
└── tests/features/badge/
    ├── badge.spec.ts
    └── badge.spec.docs.md
\`\`\`
```

---

## OUTPUT FINAL

```
✅ Testes gerados para feature [nome]

Arquivos:
- frontend/tests/features/[feature]/[feature].spec.ts
- frontend/tests/features/[feature]/[feature].spec.docs.md

Testes: N (1 ATIVO, N-1 SKIPPED)

Ordem docs.md = spec.ts para leitura lado a lado
```
