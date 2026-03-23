# Exemplo de Uso: export-code-to-design

## Cenário

O desenvolvedor modificou a cor de fundo de um botão no código React e quer propor essa mudança ao designer para revisão.

## Código Modificado

```tsx
// frontend/src/components/Button.tsx
export function Button({ children, variant = 'primary' }) {
  return (
    <button 
      className={variant === 'primary' 
        ? 'bg-[#FF5C00] px-4 py-2 rounded-lg'  // ← Mudou de #FF5500 para #FF5C00
        : 'bg-gray-500 px-4 py-2 rounded-lg'
      }
    >
      {children}
    </button>
  );
}
```

## Comando Executado

```
export-code-to-design --component=button
```

## Execução da Skill

### Etapa 1: Identificar
- Componente: `Button`
- pencil_id: `btn001`

### Etapa 2: Verificar Pencil
- Encontra `btn001` no documento Pencil

### Etapa 3: Ler Specs
```gherkin
Feature: Button Component
  Scenario: Primary button
    Given background color "#FF5500"
    Then corner radius "8px"
```

### Etapa 4: Ler Código
- Extrai cor: `#FF5C00`
- Extrai radius: `8px` (do `rounded-lg`)

### Etapa 5: Preparar Proposta
- Nome: `Button [PROPOSTA] 20260321`
- ID: `btn001_PROPOSTA_1711001234567`

### Etapa 6: Criar NOVO Frame
```
┌─────────────────────────────────────┐
│  Button              [PROPOSTA]     │
│  ─────────────────────────────────  │
│  [ #FF5C00 ]                        │
│  (8px radius)                       │
│  [ Button text ]                    │
└─────────────────────────────────────┘
```

## Output

```
✅ Proposta enviada para revisão no Pencil

**Componente:** Button
**Proposta ID:** btn001_PROPOSTA_1711001234567
**Nível Atomic:** Atom
**Localização:** Canvas (800, 200)

**Valores exportados:**
- fill: #FF5C00
- cornerRadius: 8
- padding: 16px (horizontal), 8px (vertical)
- border: none

**Valores anteriores (spec):**
- fill: #FF5500

**Próximos passos:**
1. Designer revisa no Pencil
2. Após aprovação, execute import-design-to-code
```

## Resultado no Pencil

```
┌─────────────────────────────────────┐
│  Button              [PROPOSTA]     │  ← NOVO (proposta)
│  Button (original)                  │  ← ORIGINAL (intacto)
└─────────────────────────────────────┘
```

## Próximos Passos

1. **Designer revisa** a proposta no Pencil
2. **Se aprovar**: executa `import-design-to-code`
3. **Se rejeitar**: ajusta o código e re-exporta
