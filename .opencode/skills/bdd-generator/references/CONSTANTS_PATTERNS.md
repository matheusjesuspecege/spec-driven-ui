# Constants Patterns

Padrões para identificar valores que devem ser convertidos em placeholders.

## Padrões de Constants

```typescript
const CONSTANT_PATTERNS = [
  { pattern: /80px|80 pixels/i, placeholder: 'HEADER_HEIGHT' },
  { pattern: /4 itens?|quatro/i, placeholder: 'NAV_COUNT' },
  { pattern: /768px/i, placeholder: 'BREAKPOINT' },
  { pattern: /300ms|300 milissegundos/i, placeholder: 'ANIMATION_DURATION' },
  { pattern: /100%|cem por cento/i, placeholder: 'FULL_WIDTH' },
  { pattern: /375x667|mobile pequeno/i, placeholder: 'MOBILE_WIDTH' },
  { pattern: /1280px/i, placeholder: 'DESKTOP_WIDTH' },
  { pattern: /60s|60 segundos/i, placeholder: 'TIMEOUT_DURATION' },
  { pattern: /3 vezes|três/i, placeholder: 'MAX_RETRY_COUNT' },
];
```

## Placeholders Comuns

| Valor Original | Placeholder |
|----------------|-------------|
| 80px | HEADER_HEIGHT |
| 4 itens | NAV_COUNT |
| 768px | BREAKPOINT |
| 300ms | ANIMATION_DURATION |
| 100% | FULL_WIDTH |
| 375px | MOBILE_WIDTH |
| 1280px | DESKTOP_WIDTH |
| 60s | TIMEOUT_DURATION |
| 3 vezes | MAX_RETRY_COUNT |

## Regras

1. Use PascalCase para nomes de placeholders
2. Prefira nomes semânticos (HEADER_HEIGHT, não VAL_1)
3. Mantenha consistência com nomes já usados no projeto
