# Dependency Order

Ordenação de cenários por dependência lógica para execução otimizada.

## Classificação de Cenários

### Render

Cenários que verificam renderização inicial:

```typescript
const RENDER_PATTERNS = [
  /renderizad[oa]|vis[í|i]vel|exibe|aparece|presente|carregad[oa]|mostra|exibindo/i,
  /está na página|está renderizad/i,
];
```

### State

Cenários de estados interativos:

```typescript
const STATE_PATTERNS = [
  /hover|focus|loading|disabled|active|pressed|erro|success|focused/i,
  /estado de |em hover|em focus|em disabled|em loading|em active/i,
];
```

### Interaction

Cenários de interação do usuário:

```typescript
const INTERACTION_PATTERNS = [
  /clica|click|submit|digita|seleciona|pressiona|abre|fecha|toggle|envia/i,
  /quando o usuário|ao clicar|ao submeter|ao pressionar/,
];
```

### Accessibility

Cenários de acessibilidade:

```typescript
const A11Y_PATTERNS = [
  /teclado|tab|navegaç[a|ã]o|leitor de tela|aria|foco|acessibilidad/i,
  /navegável|acess[í|i]vel|leitor/i,
];
```

## Ordem de Execução

```
render → state → interaction → a11y
```

| Ordem | Tipo | Descrição |
|-------|------|-----------|
| 1 | render | Verifica renderização |
| 2 | state | Verifica estados |
| 3 | interaction | Verifica interações |
| 4 | a11y | Verifica acessibilidade |

## Exemplo de Transformação

| Input (ordem aleatória) | Output (ordenado) |
|-------------------------|-------------------|
| "Button em hover" (state) | "Button renderiza" (render) |
| "Button navegável" (a11y) | "Button em hover" (state) |
| "Button renderiza" (render) | "Button em clique" (interaction) |
| "Button em clique" (interaction) | "Button navegável" (a11y) |

## Algoritmo

```typescript
const typeOrder: Record<string, number> = { render: 1, state: 2, interaction: 3, a11y: 4 };

function sortScenariosByDependency(scenarios: Scenario[]): Scenario[] {
  const classified = scenarios.map(scenario => {
    const text = `${scenario.name} ${scenario.given.join(' ')} ${scenario.when.join(' ')} ${scenario.then.join(' ')}`;
    let type: 'render' | 'state' | 'interaction' | 'a11y' = 'render';
    // ... matching logic
    return { scenario, type };
  });

  return [...classified].sort((a, b) => {
    const orderDiff = typeOrder[a.type] - typeOrder[b.type];
    if (orderDiff !== 0) return orderDiff;
    return scenarios.indexOf(a.scenario) - scenarios.indexOf(b.scenario);
  }).map(s => s.scenario);
}
```
