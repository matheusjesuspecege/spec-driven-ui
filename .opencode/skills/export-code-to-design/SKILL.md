---
name: export-code-to-design
description: "Envia código React para o Pencil como PROPOSTA. Cria NOVO componente no Pencil (não altera o original) para revisão e aprovação do designer. Segue fluxo spec-driven."
license: MIT
compatibility:
  opencode: ">= 0.1.0"
  pencil: ">= 1.0.0"
metadata:
  version: "1.0.0"
  user-invocable: true
  triggers:
    - "exportar código para design"
    - "propor mudança de design"
    - "criar proposta no pencil"
    - "export --component=[nome]"
    - "code to design [nome-do-componente]"
---

## Quando Usar

Use esta skill quando você precisa:

- Propor uma mudança de design baseada em código existente
- Exportar um componente React para o Pencil para revisão do designer
- Criar uma proposta visual a partir de implementação real
- Sincronizar código com design através de fluxo de aprovação

**Não use** quando:
- O designer já aprovou o design (use import-design-to-code)
- Precisa apenas visualizar specs (use outra skill)
- Quer alterar componente original diretamente (sempre crie proposta)

---

## Regras Fundamentais

⚠️ **IMPORTANTE**: Esta skill CRIA um novo componente no Pencil. **NUNCA altera o componente original.**

- **Componente original**: permanece intacto no Pencil
- **Nova proposta**: criada com sufixo `[PROPOSTA]`
- **Designer aprova/rejeita** a proposta
- **Somente após aprovação**, a mudança é aplicada ao código

### Regras Obrigatórias

1. **Nunca modifique** o componente original no Pencil
2. Use **specs como fonte da verdade** para intent/nome
3. Use **código para valores reais** (não assuma)
4. Marque claramente como **"[PROPOSTA]"**
5. Não modifique código, apenas leia
6. Atualize spec com status da proposta

---

## Fluxo

### Etapa 1: Identificar o que exportar

1. Receba o nome do componente a exportar
2. Se não especificado, pergunte ao usuário

### Etapa 2: Verificar se já existe no Pencil

1. Procurar no Pencil por ID existente (usar pencil_id da spec)
2. Se existir, usar como base para a proposta
3. Se não existir, criar do zero

### Etapa 3: Ler as specs (fonte da verdade)

1. Procure por `specs/features/*/features/*.feature` com pencil_id
2. Extraia:
   - pencil_id original
   - Valores esperados (cores, tamanhos, etc.)
   - Estrutura Atomic Design

### Etapa 4: Ler o código (valores reais)

1. Localize o arquivo do componente em `frontend/src/`
2. Extraia valores CSS reais:
   - Cores (Tailwind, CSS vars, inline)
   - Tamanhos (width, height, padding, margin)
   - Fontes
   - Border radius

### Etapa 5: Preparar dados para o Pencil

1. Estruture os dados conforme schema do .pen
2. Gere nome para a proposta: `[NomeOriginal] [PROPOSTA] [DATA]`
3. Gere ID único: `[pencil_id_original]_PROPOSTA_[TIMESTAMP]`

```typescript
const proposalName = `${componentName} [PROPOSTA] ${formatDate(new Date())}`;
// Exemplo: "Button [PROPOSTA] 20260321"

const proposalId = `${pencilId}_PROPOSTA_${Date.now()}`;
// Exemplo: "btn001_PROPOSTA_1711001234567"
```

### Etapa 6: Criar NOVO frame no Pencil

1. Abra o documento: `pencil_open_document`
2. Encontre espaço vazio: `pencil_find_empty_space_on_canvas`
3. Insira novo frame com:
   - Nome: `[Nome] [PROPOSTA]`
   - ID: `[id]_PROPOSTA_[timestamp]`
   - Propriedades visuais baseadas no código

### Etapa 7: Confirmar e informar

Retornar resumo da proposta criada para revisão do designer.

---

## Atomic Design

A skill classifica o elemento exportado:

- **Atom**: Elementos indivisíveis — botões, ícones, labels, inputs, cores, fontes, tokens
- **Molecule**: Combinação simples — SearchBar (input + botão), CardSimple (título + descrição)
- **Organism**: Grupo de moléculas — Header (Logo + Nav + SearchBar), HeroSection
- **Template**: Estrutura de layout — PageLayout, DashboardLayout
- **Page**: Instância concreta — HomePage, AboutPage

---

## Workflow de Aprovação

```
1. Dev executa export-code-to-design
   → Nova proposta criada no Pencil
   
2. Designer abre Pencil
   → Vê componente "[Nome] [PROPOSTA]"
   → Revisa e decide: Aprovar / Modificar / Rejeitar
   
3. Se aprovar/modificar:
   → Designer atualiza Pencil
   → Dev executa import-design-to-code
   
4. Se rejeitar:
   → Proposta é marcada como rejeitada
   → Dev precisa ajustar código e re-exportar
```

---

## Output

### Sucesso

```
✅ Proposta enviada para revisão no Pencil

**Componente:** [nome]
**Proposta ID:** [id]_PROPOSTA_[timestamp]
**Nível Atomic:** [Atom/Molecule/Organism]
**Localização:** [posição no canvas]

**Valores exportados:**
- fill: [cor]
- cornerRadius: [valor]
- padding: [valor]
- etc.

**Próximos passos:**
1. Designer revisa no Pencil
2. Após aprovação, execute import-design-to-code
```

### Erro (componente não encontrado)

```
❌ Componente não encontrado

O componente [nome] não foi encontrado em:
- frontend/src/components/
- Pencil (.pen)

Verifique se o componente existe antes de exportar.
```

---

## Exemplo de Fluxo

```
Dev modifica Button no código:
- Muda background de #FF5500 para #FF5C00

Dev executa:
$ export-code-to-design --component=button

Output:
✅ Proposta enviada para revisão no Pencil

Componente: Button
Proposta ID: btn001_PROPOSTA_1711001234567

Designer abre Pencil:
┌─────────────────────────────────────┐
│  Button              [PROPOSTA]     │  ← NOVO
│  Button (original)                  │  ← ORIGINAL
└─────────────────────────────────────┘

Designer aprova → Dev executa import
Designer rejeita → Dev ajusta código
```
