---
name: import-design-to-code
description: "Importa design APÓS aprovação do designer. Busca componente aprovado no Pencil (por pencil_id), extrai propriedades e atualiza o código React."
license: MIT
compatibility: opencode
metadata:
  version: 1.0.0
  user-invocable: true
  triggers:
    - importar design aprovado
    - importar do pencil para código
    - import --component=[nome]
    - sincronizar código com design
---

## Quando Usar

Use esta skill quando:
- O designer aprovou uma proposta no Pencil
- Você precisa sincronizar o código React com o design aprovado
- Deseja importar propriedades visuais (cores, bordas, tipografia, dimensões) do Pencil para o código

**IMPORTANTE**: Esta skill requer que o designer TENHA APROVADO a proposta.

- Verificar status: `approved` ou `approved_with_changes`
- Se não aprovado, informar usuário e abortar
- Nunca importar proposta pendente ou rejeitada

---

## Regras Fundamentais

1. **VERIFIQUE o status** antes de importar (deve ser `approved`)
2. **NÃO importe** propostas pendentes ou rejeitadas
3. Preserve a estrutura React existente
4. Aplique apenas valores presentes no Pencil
5. Documente as mudanças no commit
6. Atualize spec com status `imported`

---

## Fluxo

### 1. Identificar o que importar

1. Receba o nome do componente
2. Buscar spec (.feature) com pencil_id

### 2. Buscar componente no Pencil

1. Abrir documento: `pencil_open_document`
2. Se tem `pencil_id` de proposta, usar esse ID
3. Se tem apenas `pencil_id` original, usar esse

Prioridade de busca:
- Tentativa 1: proposta (`${pencilId}_PROPOSTA_${timestamp}`)
- Tentativa 2: pencil_id original

### 3. Extrair propriedades do Pencil

Extrair todas as propriedades visuais:
- `fill` → cor de background
- `stroke` → bordas
- `cornerRadius` → border-radius
- `width`, `height` → dimensões
- `padding` → espaçamento
- Tipografia

### 4. Converter para Tailwind/CSS

Converter valores do Pencil para formato do código:

```typescript
const toTailwind = {
  fill: (color) => `bg-[${color}]`,
  cornerRadius: (radius) => {
    if (radius === 8) return 'rounded';
    if (radius === 10) return 'rounded-lg';
    if (radius === 12) return 'rounded-xl';
    if (radius === 9999) return 'rounded-full';
    return `rounded-[${radius}px]`;
  },
  padding: (value) => {
    if (value === 12) return 'p-3';
    if (value === 16) return 'p-4';
    if (value === 24) return 'p-6';
    return `p-[${value}px]`;
  }
};
```

### 5. Atualizar código

1. Ler arquivo do componente em `frontend/src/components/`
2. Aplicar mudanças nos valores de estilo
3. Manter estrutura React/TypeScript existente

### 6. Verificar integridade

1. Executar lint se disponível
2. Verificar se código compila
3. Confirmar que mudanças refletem o design

---

## Ciclo Completo

```
┌─────────────────────────────────────────────────────────────────┐
│  1. DEV modifica código                                         │
│     export-code-to-design --component=[nome]                    │
│     → Nova proposta criada no Pencil: "[Nome] [PROPOSTA]"       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. DESIGNER revisa no Pencil                                  │
│     → Aprova / Modifica e Approva / Rejeita                     │
│     → Marca status como "approved"                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. DEV importa                                                 │
│     import-design-to-code --component=[nome]                    │
│     → Código atualizado com base no Pencil                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Output

**Sucesso:**
```
✅ Design importado para o código

**Componente:** [nome]
**Pencil ID:** [id]
**Aprovado por:** [designer]
**Data:** [data]

**Arquivos modificados:**
- `frontend/src/components/[categoria]/[nome].tsx`

**Mudanças aplicadas:**
- background: #141417 (antes: #FF5500)
- borderRadius: 12 (antes: 8)
- padding: 24 (antes: 16)

**Status:** Pronto para review/commitar
```

**Erro (não aprovado):**
```
❌ Import bloqueado

A proposta para [nome] ainda não foi aprovada.

Status atual: pending
Designer precisa revisar no Pencil primeiro.
```
