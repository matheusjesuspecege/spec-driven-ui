# Fluxo Completo: Spec-Driven UI

## Visão Geral

Este documento descreve o fluxo completo de trabalho quando designer e dev colaboram usando o sistema de sincronização design-código.

---

## Cenário 1: Designer mudou no Pencil → Dev atualiza sob demanda

### Fluxo
```
┌─────────────────────────────────────────────────────────────────┐
│ 1. DESIGNER modifica no Pencil                                  │
│    Ex: Avatar verde (fill=#00FF00), size 48px                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. DEV executa diff-design-vs-code                              │
│    → Detecta mudanças vs código                                │
│    → Lista diff para review                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. DEV SELECIONA o que quer atualizar AGORA:                   │
│    □ fill: #2A2A2E → #00FF00 (verde)                         │
│    ☑ size: 36px → 48px                                        │
│    □ textColor: #8B8B90 → #FFFFFF                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. DEV executa update-bdd                                       │
│    → Substitui SOMENTE o selecionado:                          │
│    → "Então o avatar deve ter tamanho 36x36px"                │
│       → "Então o avatar deve ter tamanho 48x48px"             │
│    → Cenários NÃO selecionados PERMANECEM como estão          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. DEV executa tdd-generator                                    │
│    → Mantém testes existentes (intocados, passando)            │
│    → Adiciona/atualiza testes para mudanças selecionadas       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. DEV codifica                                                │
│    → TDD failing → dev codifica → TDD passing                 │
│    → Pode commitar o(size 48px) sem alterar o(fill green)     │
└─────────────────────────────────────────────────────────────────┘
```

### Exemplo de Comando
```bash
# Detectar mudanças
diff-design-vs-code --component=avatar

# Selecionar e atualizar (apenas size)
update-bdd --component=avatar --changes=2

# Sincronizar testes
tdd-generator --component=avatar

# Codificar
# TDD passa → commit
```

---

## Cenário 2: Dev idea → Export → Design approve → Import → Update BDD → TDD → Código

### Fluxo
```
┌─────────────────────────────────────────────────────────────────┐
│ 1. DEV codifica ideia                                           │
│    Ex: Avatar azul size 64px                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. DEV executa export-design-to-code                            │
│    → Cria "Avatar Azul [PROPOSTA] DDMMYYYY" no Pencil         │
│    → Relaciona: sYLr4 → sYLr4_PROPOSTA_xxx                     │
│    → Atualiza spec com:                                        │
│       • proposal_id: "sYLr4_PROPOSTA_xxx"                     │
│       • proposal_status: "pending"                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. DESIGNER revisa e aprova                                     │
│    → Modifica se necessário                                     │
│    → Renomeia: "Avatar Azul [APROVADO] DDMMYYYY by:Ana"       │
│    → Spec atualiza: proposal_status="approved"                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. DEV executa import-design-to-code                            │
│    → Busca por ID da proposta                                   │
│    → Valida status (approved)                                   │
│    → Extrai diff vs original:                                   │
│       • NOVO: fill=#0000FF (azul)                             │
│       • NOVO: size=64px                                       │
│    → Mostra diff ao dev                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. DEV SELECIONA o que quer atualizar AGORA:                   │
│    ☑ fill: novo #0000FF (azul)                                │
│    ☑ size: novo 64px                                           │
│    (pode fazer em partes, não tudo de uma vez)                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. DEV executa update-bdd                                       │
│    → Substitui/adiciona SOMENTE selecionados                   │
│    → Cria cenário: "Avatar aceita cor azul"                    │
│    → Cria cenário: "Avatar xl tem 64px"                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. DEV executa tdd-generator                                    │
│    → Mantém testes existentes (intocados)                       │
│    → Adiciona testes para fill azul e size 64px                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. DEV codifica e TDD passa                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Exemplo de Comando
```bash
# Exportar ideia do dev
export-design-to-code --component=avatar

# Após designer aprovar...
# DEV renomeia no Pencil para "[APROVADO]"

# Importar mudanças
import-design-to-code --component=avatar

# Atualizar BDD
update-bdd --component=avatar --all

# Sincronizar testes
tdd-generator --component=avatar

# Codificar
# TDD passa → commit
```

---

## Resumo das Skills

| Skill | Função | Quando usar |
|-------|--------|-------------|
| `diff-design-vs-code` | Detecta mudanças no Pencil vs Código | Após designer modificar |
| `update-bdd` | Atualiza BDD sob demanda | Após diff ou import |
| `export-design-to-code` | Exporta código como proposta | Quando dev tem ideia |
| `import-design-to-code` | Importa proposta aprovada | Após designer aprovar |
| `tdd-generator` | Mantém/adiciona testes | Após update-bdd |

---

## Convenções de Nomenclatura no Pencil

| Status | Formato | Exemplo |
|--------|---------|---------|
| Proposta criada | `[NOME] [PROPOSTA] [DDMMYYYY]` | `Avatar [PROPOSTA] 25032026` |
| Aprovado | `[NOME] [APROVADO] [DDMMYYYY] by:[NOME]` | `Avatar [APROVADO] 25032026 by:Ana` |
| Rejeitado | `[NOME] [REJEITADO] [DDMMYYYY] by:[NOME] - [MOTIVO]` | `Avatar [REJEITADO] 25032026 by:Ana - cor diferente` |

---

## Metadados na Spec (.feature)

```gherkin
# ═══════════════════════════════════════════════════════════
# PENCIL_IDS
# ═══════════════════════════════════════════════════════════
              **pencil_id:** "sYLr4"
              **proposal_id:** "sYLr4_PROPOSTA_1743000000000"
              **proposal_status:** "pending" | "approved" | "rejected" | "imported"
              **proposal_created_at:** "2026-03-25"
              **proposal_approved_by:** ""
```

---

## Regras de Ouro

1. **Seleção sob demanda**: Não é obrigado a atualizar tudo de uma vez
2. **Testes intocados**: Testes existentes NUNCA são modificados ou removidos
3. **BDD guia**: BDD é a fonte da verdade, TDD segue o BDD
4. **Diff explícito**: Sempre see o diff antes de aplicar mudanças
5. **Status no nome**: Designer marca aprovação/rejeição renomeando o frame
