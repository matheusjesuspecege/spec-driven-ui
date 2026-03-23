---
name: diff-design-vs-code
description: "Compara design tokens e componentes entre o Pencil (via pencil_id na spec) e o código. Suporta modo individual (--component) e em massa (--all). Retorna exit code: 0 = synced, 1 = diff."
license: MIT
compatibility: "agent:opencode >= 1.0"
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "diff design vs código"
    - "diff --component=[nome]"
    - "diff --all"
    - "comparar design com código"
    - "analise sincronização do design"
---

## Quando Usar

Use esta skill quando precisar:
- Verificar se o código React/Tailwind está sincronizado com o design Pencil
- Validar se as spec BDD (.feature) estão refletidas no código
- Executar como pre-commit hook ou em CI/CD
- Gerar relatório de consistência entre design e código
- Identificar divergências antes de deploy

## Modos de Execução

| Modo | Comando | Descrição |
|------|---------|-----------|
| **Individual** | `diff-design-vs-code --component=sidebar` | Compara apenas um componente específico |
| **Em massa** | `diff-design-vs-code --all` | Compara todos os componentes da spec |

## Fonte da Verdade

**BDD Spec (.feature) é a fonte da verdade.**

O diff compara três fontes:
1. **Spec (.feature)** → Contém `pencil_id` e valores esperados
2. **Pencil (.pen)** → Busca nó por `pencil_id` via MCP
3. **Código** → Implementação React/Tailwind

## Fluxo

### Etapa 1 — Identificar o que comparar

**Modo Individual (`--component=[nome]`):**
1. Localizar `.feature` do componente especificado
2. Extrair `pencil_id` da especificação
3. Comparar apenas esse componente

**Modo All (`--all`):**
1. Listar todos os `.feature` em `specs/features/*/features/`
2. Para cada um, extrair `pencil_id` se existir
3. Comparar todos os componentes

### Etapa 2 — Obter dados da Spec (.feature)

1. Ler arquivo `.feature` do componente
2. Extrair `pencil_id` (formato: `**pencil_id:** "xxx"`)
3. Parsear cenários para extrair valores esperados

### Etapa 3 — Obter dados do Pencil (via MCP)

1. Abrir documento `.pen` via `pencil_open_document`
2. Buscar nó pelo `pencil_id` via `pencil_batch_get`
3. Extrair propriedades de estilo

### Etapa 4 — Obter dados do Código

1. Ler componente React em `frontend/src/components/`
2. Parsear Tailwind classes ou CSS inline
3. Converter para formato comparável

### Etapa 5 — Comparação e Classificação

| Classificação | Descrição |
|---------------|-----------|
| ✅ SINCRONIZADO | Spec = Pencil = Código |
| ❌ DIVERGENTE_PENCIL | Spec ≠ Pencil |
| ❌ DIVERGENTE_CODIGO | Spec ≠ Código |
| ⚠️ PARCIAL | Pencil e Código sincronizados, mas Spec desatualizada |
| 🆕 SEM_IMPLEMENTACAO | Spec existe, Pencil/Código não |

### Etapa 6 — Gerar relatório

Relatório formatado com:
- Lista de componentes sincronizados
- Lista de componentes com divergências
- Exit code para automação

## Exit Codes

| Código | Significado |
|--------|------------|
| 0 | Todos os componentes sincronizados |
| 1 | Há divergências (spec ≠ pencil ou spec ≠ código) |

**Uso em CI/Hooks:**
```bash
diff-design-vs-code --all
if [ $? -eq 0 ]; then
  echo "✅ Design sincronizado"
else
  echo "❌ Design dessincronizado"
  exit 1
fi
```

## Referências

- `references/COMPARISON_MAPPING.md` — Mapeamento detalhado de propriedades
- `assets/EXAMPLE_OUTPUT.md` — Exemplos de saída formatada
