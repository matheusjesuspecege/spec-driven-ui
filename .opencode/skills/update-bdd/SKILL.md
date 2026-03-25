---
name: update-bdd
description: "Atualiza cenários BDD (.feature) com base em diff detectado ou proposta aprovada. Permite seleção de mudanças sob demanda, substituindo valores existentes ou adicionando novos cenários."
license: MIT
compatibility: opencode
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "update-bdd"
    - "atualizar bdd"
    - "atualizar cenários"
    - "sync bdd"
---

## Quando Usar

Use esta skill quando:
- Você executou `diff-design-vs-code` e quer aplicar as mudanças detectadas
- Você executou `import-design-to-code` e quer sincronizar o BDD com as mudanças aprovadas
- O designer aprovou uma proposta e você quer atualizar os cenários

**IMPORTANTE**: Esta skill atualiza SOMENTE o BDD. Não modifica código, testes ou Pencil.

---

## Regras Fundamentais

1. **Substitui** valores existentes quando especificado
2. **Adiciona** novos cenários quando há novos elementos
3. **Preserva** cenários não selecionados (mantém como estão)
4. **Não modifica** código, testes ou Pencil
5. Permite **seleção sob demanda** (não precisa atualizar tudo)

---

## Fluxo

### Etapa 1: Receber lista de mudanças

Receber do `diff-design-vs-code` ou `import-design-to-code`:

```typescript
interface Change {
  type: 'modify' | 'add';
  property: string;
  oldValue?: string;
  newValue: string;
  scenario?: string;
  newScenarioName?: string;
}
```

### Etapa 2: Apresentar lista para seleção

Mostrar ao usuário a lista de mudanças disponíveis:

```
Mudanças detectadas para Avatar:

[1] ☐ MODIFICAR: fill
    De: #2A2A2E
    Para: #00FF00 (verde)

[2] ☑ MODIFICAR: size
    De: 36px
    Para: 48px

[3] ☐ ADICIONAR: shadow
    Novo cenário: "Avatar aceita sombra"
    
Selecione os itens que deseja atualizar (padrão: nenhum)
Digite os números separados por vírgula ou 'todos':
```

### Etapa 3: Ler .feature atual

1. Localizar arquivo `.feature` do componente
2. Parsear todos os cenários existentes
3. Identificar quais cenários serão modificados

### Etapa 4: Aplicar mudanças selecionadas

**Para modificações:**
```typescript
// Antes
Então o avatar deve ter tamanho 36x36px

// Depois (se selected)
Então o avatar deve ter tamanho 48x48px
```

**Para adições:**
```typescript
// Novo cenário adicionado ao final
Cenário: Avatar aceita sombra
    Dado que o componente Avatar foi renderizado com shadow=true
     Quando a página for carregada
     Então o avatar deve ter sombra com blur de 8px
```

### Etapa 5: Salvar arquivo

1. Manter cenários não selecionados intocados
2. Substituir/adicionar apenas os selecionados
3. Preservar formatação e tags existentes

---

## Comportamento de Substituição

| Situação | Ação |
|----------|------|
| Valor existente encontrado | Substituir linha inteira |
| Novo elemento detectado | Criar novo cenário |
| Cenário não selecionado | Manter intocado |
| Múltiplos valores iguais | Substituir todos (com confirmação) |

---

## Comandos

### Seleção específica
```bash
update-bdd --component=avatar --changes=1,3
```
Atualiza apenas itens 1 e 3

### Selecionar todos
```bash
update-bdd --component=avatar --all
```
Atualiza todas as mudanças detectadas

### Selecionar por tipo
```bash
update-bdd --component=avatar --type=modify
```
Atualiza apenas modificações (não adições)

###dry-run (não salva)
```bash
update-bdd --component=avatar --dry-run
```
Mostra preview sem salvar

---

## Output

### Sucesso
```
✅ BDD atualizado para Avatar

Cenários modificados (2):
• "Avatar usa tamanho padrão" 
  36x36px → 48x48px
  
• "Avatar medium"
  36x36px → 48x48px

Cenários adicionados (1):
• "Avatar aceita sombra"

Cenários preservados (5):
• "Avatar renderiza círculo"
• "Avatar usa cores padrão"
• (mantidos como estavam)

Arquivo atualizado:
specs/features/avatar/features/avatar.feature
```

### dry-run
```
🔍 Preview - Nenhuma alteração salva

Se confirmar, seriam aplicados:

MODIFICAR (1):
• fill: #2A2A2E → #00FF00

ADICIONAR (1):
• Novo cenário: "Avatar aceita sombra"

PRESERVAR (5):
• Cenários não listados acima
```

### Nenhuma seleção
```
⚠️ Nenhuma mudança selecionada

Use --changes=NUMEROS ou --all para selecionar

Exemplos:
  update-bdd --component=avatar --changes=1,2
  update-bdd --component=avatar --all
```

---

## Integração com outras Skills

```
┌─────────────────────────────────────────────────────────────────┐
│ diff-design-vs-code                                           │
│ → Lista mudanças                                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ update-bdd                                                    │
│ → Usuário seleciona o que atualizar                           │
│ → BDD atualizado                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ tdd-generator                                                 │
│ → Mantém testes existentes (passando)                        │
│ → Adiciona novos testes                                       │
└─────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────┐
│ import-design-to-code                                         │
│ → Mostra diff                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ update-bdd                                                    │
│ → Usuário seleciona o que atualizar                           │
│ → BDD atualizado                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ tdd-generator                                                 │
│ → Mantém testes existentes (passando)                        │
│ → Adiciona novos testes                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Exemplo Completo

```
$ diff-design-vs-code --component=avatar

Avatar - Divergências detectadas:

[1] fill: Código=#2A2A2E | Pencil=#00FF00
[2] size: Código=36px | Pencil=48px

$ update-bdd --component=avatar --changes=2

Selecione as mudanças:

[1] ☐ fill: #2A2A2E → #00FF00
[2] ☑ size: 36px → 48px

> 2

✅ BDD atualizado

• "Avatar medium" → 48x48px
• "Avatar usa tamanho padrão" → 48x48px

$ tdd-generator --component=avatar

✅ Testes atualizados

• Testes existentes mantidos (passando)
• Novo teste adicionado para size 48px
```

---

## Validações

Antes de salvar, verificar:

- [ ] Cenários modificados existem no .feature
- [ ] Valores antigos estão corretos (substituição precisa)
- [ ] Novos cenários têm Given-When-Then completo
- [ ] Tags existentes preservadas
- [ ] Formatação Gherkin mantida
