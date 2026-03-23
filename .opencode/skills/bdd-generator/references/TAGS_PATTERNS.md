# Tags Patterns

## Status Tags

| Status | Tag |
|--------|-----|
| Pending | `@pending` |
| In Progress | `@in-progress` |
| Done | `@done` |
| Blocked | `@blocked` |
| Bug | `@bug` |

## Context Tags

### Desktop

```typescript
const DESKTOP_PATTERNS = [
  /(?:desktop|≥768px| desktop|1280|maior que 768)/i,
  /menu horizontal/i,
];
```

### Mobile

```typescript
const MOBILE_PATTERNS = [
  /(?:mobile|<768px| celular|375)/i,
  /hamburger/i,
  /overlay/i,
];
```

### Tablet

```typescript
const TABLET_PATTERNS = [
  /tablet|768px|1024px/i,
];
```

### Accessibility

```typescript
const A11Y_PATTERNS = [
  /a11y|acessibilidade|tab|teclado|leitor de tela/i,
  /focus|foco|navegação por teclado/i,
];
```

## Scenario Type Tags

### Rule (@rule)

Padrões para regras de negócio:

```typescript
const RULE_PATTERNS = {
  obrigatorio: [
    /obrigatório|campo.*vazio|sem.*preencher/i,
    /não.*pode.*vazio|deve.*preencher/i,
  ],
  valorMinimo: [
    /mínimo|mínimo.*r\$|não.*pode.*zero|greater.*than.*zero/i,
    /quantidade.*positiva|valor.*maior/i,
  ],
  estoque: [
    /estoque|disponível|quantidade.*excede/i,
    /sem.*estoque|estoque.*insuficiente/i,
  ],
  validacao: [
    /cpf.*válido|cnpj.*válido|email.*válido/i,
    /idade.*mínima|data.*válida/i,
  ],
  restricao: [
    /não.*permitido|impede|bloqueia/i,
    /acesso.*negado|operação.*inválida/i,
  ],
};
```

### Defensive (@defensive)

Padrões para Lei de Murphy:

```typescript
const DEFENSIVE_PATTERNS = {
  transacao: [
    /submete|finalizar|confirmar|comprar|pagar/i,
    /enviar|processar|executar/i,
  ],
  estado: [
    /toggle|abrir|fechar|ativar|desativar/i,
    /adicionar|remover|deletar/i,
  ],
  critica: [
    /pagamento|transação|transferência/i,
    /envio.*email|notificação/i,
  ],
};
```

### Happy Path (@happy)

```typescript
const HAPPY_PATTERNS = [
  /sucesso|funciona|正常/i,
  /fluxo.*normal|happy.*path/i,
];
```

### State (@state)

```typescript
const STATE_PATTERNS = [
  /loading|estado|erro|sucesso/i,
  /feedback|mensagem|spinner/i,
];
```

### Component (@component)

```typescript
const COMPONENT_PATTERNS = [
  /componente|renderiza|exibe/i,
  /elemento|botão|campo/i,
];
```
