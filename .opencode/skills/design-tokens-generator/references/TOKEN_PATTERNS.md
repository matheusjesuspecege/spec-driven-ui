# Padrões de Extração de Tokens

## Cores

```typescript
const colorPattern = /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb\(|rgba\(/;
const extractColor = (line: string): string | null => {
  const match = line.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/);
  return match ? `#${match[1]}` : null;
};
```

### Variações de cor (exemplos)
- Cores primárias: `primary-50` até `primary-900`
- Cores semânticas: `success`, `error`, `warning`, `info`

## Spacing

```typescript
const spacingPattern = /(\d+)px\s+(vertical|horizontal)?/;
const extractSpacing = (line: string): { top: number; bottom: number; left: number; right: number } | null => {
  const pyMatch = line.match(/(\d+)px\s+vertical/);
  const pxMatch = line.match(/(\d+)px\s+horizontal/);
  
  if (pyMatch && pxMatch) {
    return {
      top: parseInt(pyMatch[1]),
      bottom: parseInt(pyMatch[1]),
      left: parseInt(pxMatch[1]),
      right: parseInt(pxMatch[1]),
    };
  }
  return null;
};
```

## Border Radius

```typescript
const radiusPattern = /(\d+)px/;
const extractRadius = (line: string): string | null => {
  const match = line.match(/(\d+)px/);
  return match ? `${match[1]}px` : null;
};
```

### Escala recomendada
- `none`: 0px
- `sm`: 4px
- `md`: 8px
- `lg`: 16px
- `xl`: 24px
- `full`: 9999px

## Shadows

```typescript
const shadowPattern = /shadow|box-shadow/;
const extractShadowValue = (line: string): string | null => {
  const match = line.match(/([\d.]+)px\s+([\d.]+)px\s+([\d.]+)px/);
  if (match) {
    return `${match[1]}px ${match[2]}px ${match[3]}px rgba(0,0,0,0.1)`;
  }
  return null;
};
```

## Tipografia

```typescript
const fontPattern = /'[^']+',?\s*(sans-serif|serif)/;
const sizePattern = /(\d+)px/;
const weightPattern = /weight\s*(\d+)|bold|semibold|medium|regular/;
```

### Escala de tamanhos
- `xs`: 12px
- `sm`: 14px
- `base`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px
- `4xl`: 36px

### Pesos de fonte
- `thin`: 100
- `light`: 300
- `regular`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700
- `black`: 900

## CSS Variables

### Formato de nomenclatura
```
--[categoria]-[propriedade]-[variante]
```

Exemplos:
- `--color-primary-500`
- `--spacing-md`
- `--radius-lg`
- `--font-sans`
- `--text-base`

### Conversão para Tailwind
```typescript
const CSS_VAR_TO_TAILWIND = {
  '--color-bg-primary': 'bg-[var(--color-bg-primary)]',
  '--color-text-primary': 'text-[var(--color-text-primary)]',
  '--spacing-sm': 'p-[var(--spacing-sm)]',
  '--radius-md': 'rounded-[var(--radius-md)]',
  '--font-sans': 'font-[var(--font-sans)]',
};
```