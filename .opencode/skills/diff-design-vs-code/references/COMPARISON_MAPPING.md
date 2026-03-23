# Comparison Mapping

Mapeamento detalhado de propriedades entre Spec, Pencil e Código.

## Propriedades Suportadas

| Spec (BDD) | Pencil | Código (Tailwind) | Tipo |
|------------|--------|-------------------|------|
| fill | `.fill` | `bg-[#hex]` | cor |
| stroke | `.stroke` | `border-[#hex]` | cor |
| strokeThickness | `.strokeThickness` | `border-[width]px` | medida |
| cornerRadius | `.cornerRadius` | `rounded-[value]` | medida |
| width | `.width` | `w-[value]px` | medida |
| height | `.height` | `h-[value]px` | medida |
| padding | `.padding` | `p-[value]px`, `py-[value]`, `px-[value]` | medida |
| margin | N/A | `m-[value]px`, `my-[value]`, `mx-[value]` | medida |
| fontSize | `.fontSize` | `text-[size]px` | tipografia |
| fontFamily | `.fontFamily` | `font-[family]` | tipografia |
| fontWeight | `.fontWeight` | `font-[weight]` | tipografia |
| textColor | `.textColor` | `text-[#hex]` | cor |
| gap | `.gap` | `gap-[value]px` | medida |
| layout | `.layout` | `flex`, `grid` | layout |

## Extração de Valores

### Spec (.feature)

```gherkin
**pencil_id:** "sidebar001"
**fill:** "#141417"
**cornerRadius:** 12
**width:** 260
```

Extração via regex:
```typescript
const pencilIdMatch = featureContent.match(/\*\*pencil_id:\*\*\s*["']?([\w-]+)/i);
const fillMatch = featureContent.match(/\*\*fill:\*\*\s*["']?([\w#]+)/i);
```

### Pencil (.pen)

Valores extraídos via `pencil_batch_get`:
```json
{
  "id": "sidebar001",
  "fill": "#141417",
  "cornerRadius": [0, 0, 0, 12],
  "width": 260,
  "height": "fill_container"
}
```

### Código (Tailwind)

Conversão Tailwind → valores:
```typescript
const tailwindToValue = {
  'bg-[#141417]': '#141417',
  'rounded-xl': 12,
  'rounded-[12px]': 12,
  'w-[260px]': 260,
  'py-6': 24,
  'px-5': 20,
};
```

## Casos Especiais

### Border Radius com múltiplos valores

Pencil pode retornar array: `[0, 0, 12, 12]`
Código deve considerar: `max(...radius)` ou verificar se é uniforme

### Cores com opacidade

Pencil: `rgba(20, 20, 23, 0.8)`
Código: `bg-[#141417]/[0.8]` ou `bg-[#141417]/80`
Spec: normalizar para formato base

### Dimensõesdinâmicas

Pencil: `"fill_container"`, `"auto"`
Código: `w-full`, `h-full`, `w-auto`
Spec: marcar como `dynamic` e pular comparison
