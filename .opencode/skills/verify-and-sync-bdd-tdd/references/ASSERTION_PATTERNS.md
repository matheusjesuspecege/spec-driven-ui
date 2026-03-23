# Steps BDD → Assertions TDD

## Regras de Contagem

| Keyword | Count | Motivo |
|---------|-------|--------|
| `Dado que` | 0 | Pré-condição / Setup |
| `Quando` | 0 | Ação / Trigger |
| `Então` | 1 | Assertion principal |
| `E` (após Então) | 1 | Assertion adicional |

## Mapeamento Semântico

| Pattern BDD | Assertion TDD Esperada |
|-------------|------------------------|
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

## Exemplo de Contagem

```gherkin
# BDD:
Cenário: Inverse button tem estilo correto
    Dado que o componente Button é renderizado com variant="inverse"   → 0
    Quando visível na página                                          → 0
    Então deve ter background #FFFFFF                                  → 1
     E deve ter texto com cor primary (#FF5C00)                       → 1
     E não deve ter borda                                              → 1
# Total esperado: 3 assertions
```

```typescript
// TDD:
test('Inverse button tem estilo correto', async ({ page }) => {
    expect(styles?.backgroundColor).toBe(...);  // 1
    expect(styles?.color).toBe(...);             // 2
    // FALTANDO: borda
});
// Total encontrado: 2 assertions
// RESULTADO: ⚠️ ASSERTIONS INCOMPLETAS (esperado 3, encontrado 2)
```

## Nome dos Testes Esperados

| Caractere | Substituição |
|-----------|--------------|
| `"` | removido |
| `'` | removido |
| `(` `)` | removido |
| `#` | removido |
| `/` | `ou` |

### Exemplo de Conversão

```gherkin
# BDD (Cenário):
Cenário: Inverse button type="button" não submete formulário inadvertidamente
```

```typescript
// TDD esperado:
test('Inverse button type-button não submete formulário inadvertidamente', ...)
```

### Limitações

1. **Contagem simples**: Não valida se a assertion corresponde ao step específico
2. **Pode haver falsos-negativos**: Se o dev usar `expect` para setup
3. **Não detecta mapeamento incorreto**: Se verificar `background` onde deveria verificar `border`
