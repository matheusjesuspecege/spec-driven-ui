---
name: import-design-to-code
description: "Importa design APÓS aprovação do designer. Busca componente aprovado no Pencil, extrai propriedades, mostra diff vs original, e retorna lista de mudanças para update-bdd."
license: MIT
compatibility: opencode
metadata:
  version: "1.1.0"
  user-invocable: true
  triggers:
    - importar design aprovado
    - importar do pencil para código
    - import --component=[nome]
    - sincronizar código com design
---

## Quando Usar

Use esta skill quando:
- O designer aprovou uma proposta no Pencil (renomeou para `[APROVADO]`)
- Você precisa sincronizar o código React com o design aprovado
- Deseja extrair as mudanças para alimentar o `update-bdd`

**IMPORTANTE**: Esta skill extrai e mostra as mudanças. A atualização do BDD é feita pela skill `update-bdd`.

---

## Regras Fundamentais

1. **Parser status do nome** - Extrai approved/rejected/pending do nome do frame
2. **Bloqueia se não aprovado** - Não permite import de pending ou rejected
3. **Extrai diff vs original** - Compara proposta com componente original
4. **Retorna lista de mudanças** - Para uso posterior pelo `update-bdd`
5. **Não modifica código diretamente** - Use o diff para atualizar via update-bdd

---

## Fluxo

### 1. Identificar o que importar

1. Receba o nome do componente
2. Buscar spec (.feature) com pencil_id e proposal_id

### 2. Buscar e validar status da proposta

1. Abrir documento: `pencil_open_document`
2. Buscar frame pelo proposal_id ou nome
3. Extrair status do nome via parser

```typescript
const parseProposalStatus = (frameName: string) => {
  const patterns = {
    approved: /\[APROVADO\]\s+(\d{8})\s+by:(\w+)/,
    rejected: /\[REJEITADO\]\s+(\d{8})\s+by:(\w+)\s*-\s*(.+)/,
    pending: /\[PROPOSTA\]\s+(\d{8})/
  };

  if (patterns.approved.test(frameName)) {
    const [, date, by] = frameName.match(patterns.approved);
    return { status: 'approved', date, by };
  }
  if (patterns.rejected.test(frameName)) {
    const [, date, by, reason] = frameName.match(patterns.rejected);
    return { status: 'rejected', date, by, reason };
  }
  if (patterns.pending.test(frameName)) {
    const [, date] = frameName.match(patterns.pending);
    return { status: 'pending', date };
  }
  return { status: 'unknown' };
};
```

4. **Validar status**:
   - Se `approved` → prosseguir com extração
   - Se `rejected` → BLOQUEAR e mostrar motivo
   - Se `pending` → BLOQUEAR e pedir aprovação
   - Se `unknown` → perguntar ao usuário

### 3. Extrair propriedades do Pencil

Extrair propriedades da proposta aprovada:
- `fill` → cor de background
- `stroke` → bordas
- `cornerRadius` → border-radius
- `width`, `height` → dimensões
- `padding` → espaçamento
- Tipografia

### 4. Extrair diff vs original

Se existir componente original (mesmo pencil_id):

```typescript
interface Change {
  type: 'modify' | 'add';
  property: string;
  oldValue?: string;
  newValue: string;
  scenario?: string;
}

// Exemplo:
const changes: Change[] = [
  { type: 'modify', property: 'fill', oldValue: '#2A2A2E', newValue: '#00FF00', scenario: 'Avatar usa cores padrão' },
  { type: 'modify', property: 'size', oldValue: '36px', newValue: '48px', scenario: 'Avatar medium' },
  { type: 'add', property: 'shadow', newValue: '8px blur', newScenarioName: 'Avatar aceita sombra' },
];
```

### 5. Apresentar diff para seleção

Mostrar lista de mudanças para o usuário:

```
✅ Proposta aprovada por Ana em 25032026

Mudanças detectadas (3):

[1] ☐ MODIFICAR: fill
    De: #2A2A2E
    Para: #00FF00 (verde)

[2] ☑ MODIFICAR: size
    De: 36px
    Para: 48px

[3] ☐ ADICIONAR: shadow
    Novo cenário: "Avatar aceita sombra"
    
Selecione os itens que deseja aplicar ao BDD:
(update-bdd --component=avatar --changes=1,2)
```

### 6. Retornar lista de mudanças

Retornar estrutura para uso pelo `update-bdd`:

```typescript
interface ImportResult {
  status: 'approved' | 'rejected' | 'pending';
  approvedBy?: string;
  approvedAt?: string;
  originalId: string;
  proposalId: string;
  changes: Change[];
}
```

---

## Output

### Sucesso (mostra diff)
```
✅ Proposta aprovada

Componente: Avatar
Proposta ID: sYLr4_PROPOSTA_1743000000000
Aprovado por: Ana em 25032026

Mudanças detectadas vs original:

MODIFICAR (2):
[1] fill: #2A2A2E → #00FF00
[2] size: 36px → 48px

ADICIONAR (1):
[3] shadow: novo cenário "Avatar aceita sombra"

Próximo passo:
update-bdd --component=avatar --changes=1,2,3
```

### Erro (pending)
```
❌ Import bloqueado

A proposta para Avatar ainda está pendente.

Status: PENDING
Designer precisa renomear para [APROVADO] primeiro.

No Pencil, renomeie:
Avatar [PROPOSTA] 25032026
  ↓
Avatar [APROVADO] 25032026 by:SeuNome
```

### Erro (rejected)
```
❌ Import bloqueado

A proposta para Avatar foi rejeitada.

Status: REJEITADO
Por: Ana em 25032026
Motivo: cores não seguem o design system

Ação: Ajuste o código e exporte novamente.
```

---

## Integração com update-bdd

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. export-code-to-design                                       │
│    → Cria proposta no Pencil                                   │
│    → Spec atualizada com proposal_id                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Designer aprova                                            │
│    → Renomeia frame para [APROVADO]                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. import-design-to-code                                       │
│    → Valida status (approved)                                  │
│    → Extrai diff vs original                                   │
│    → Retorna lista de mudanças                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. update-bdd                                                  │
│    → Usuário seleciona mudanças                                │
│    → BDD atualizado                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. tdd-generator                                               │
│    → Mantém testes existentes (passando)                      │
│    → Adiciona novos testes                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. DEV codifica e TDD passa                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Ciclo Completo Atualizado

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. DEV modifica código                                         │
│    export-code-to-design --component=[nome]                    │
│    → Nova proposta criada no Pencil                            │
│    → Spec atualizada com proposal_id e status="pending"        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. DESIGNER revisa no Pencil                                   │
│    → Renomeia para "[APROVADO] DDMMYYYY by:Nome"              │
│    → Ou "[REJEITADO] DDMMYYYY by:Nome - motivo"              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. DEV importa                                                  │
│    import-design-to-code --component=[nome]                     │
│    → Valida status                                             │
│    → Extrai diff vs original                                   │
│    → Mostra lista de mudanças                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. DEV atualiza BDD (sob demanda)                             │
│    update-bdd --component=[nome] --changes=1,2                 │
│    → Seleciona o que quer atualizar                            │
│    → BDD atualizado                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. DEV regenera TDD                                            │
│    tdd-generator --component=[nome]                            │
│    → Mantém testes existentes (passando)                       │
│    → Adiciona novos testes                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. DEV codifica                                                │
│    → TDD failing → dev codifica → TDD passing                  │
└─────────────────────────────────────────────────────────────────┘
```
