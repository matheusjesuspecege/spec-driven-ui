# Example Output

Exemplos de saída formatada do diff-design-vs-code.

## Modo Individual — Sincronizado

```
diff-design-vs-code --component=sidebar

✅ Sidebar (ncY1p) está sincronizado
   - fill: #141417 ✅
   - radius: 12 ✅
   - width: 260px ✅
   - height: fill_container ✅

Exit Code: 0
```

## Modo Individual — Com Divergência

```
diff-design-vs-code --component=button

❌ Button (btn001) dessincronizado
   - fill: BDD #FF5C00 ≠ Pencil #FF5500 ❌
   - radius: BDD 8 = Código 8 ✅
   - textColor: BDD #FFFFFF = Pencil #FFFFFF ✅

Exit Code: 1
```

## Modo All — Relatório Completo

```
diff-design-vs-code --all

📊 Relatório Geral:
────────────────────────────────────────────────────
✅ 14 componentes sincronizados
❌ 3 componentes com divergências
⚠️  2 componentes parciais
🆕  1 componente sem implementação

Componentes Dessincronizados:
────────────────────────────────────────────────────
❌ Sidebar (ncY1p)
   - fill: BDD #141417 ≠ Pencil #FF5500 ❌
   - radius: BDD 12 = Código 12 ✅

❌ Button (btn001)
   - radius: BDD 8 ≠ Código 12 ❌
   - padding: BDD 16 = Código 16 ✅

❌ Card (card001)
   - padding: BDD 24 ≠ Código 16 ❌

Componentes Parciais:
────────────────────────────────────────────────────
⚠️ Input (inp001)
   - Pencil e Código sincronizados (rounded-lg)
   - Spec desatualizada (não tem border-radius)

Sem Implementação:
────────────────────────────────────────────────────
🆕 Modal (modal001)
   - Spec existe mas não há implementação

────────────────────────────────────────────────────
Exit Code: 1 (há divergências)
```

## Modo All — Tudo Sincronizado

```
diff-design-vs-code --all

📊 Relatório Geral:
────────────────────────────────────────────────────
✅ 20 componentes sincronizados
❌ 0 componentes com divergências

🎉 Todos os componentes estão sincronizados!

────────────────────────────────────────────────────
Exit Code: 0
```

## Modo Design System

```
diff-design-vs-code --all (para design-system)

📊 Relatório - Design System:
────────────────────────────────────────────────────
Atoms:
✅ Button ✅ Input ✅ Badge ✅ Avatar
❌ Card - border divergente

Molecules:
✅ FormGroup ✅ InputGroup ✅ Modal
⚠️ Toast - spec desatualizada

Organisms:
✅ Header ✅ Sidebar ✅ Footer

Tokens:
✅ Colors (CSS vars verificadas)
✅ Typography (CSS vars verificadas)
✅ Spacing (CSS vars verificadas)

────────────────────────────────────────────────────
Exit Code: 1
```
