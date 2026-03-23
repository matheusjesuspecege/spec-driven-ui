# Exemplo de Uso: import-design-to-code

## Cenário

O designer aprovou a proposta do componente "Button" no Pencil. Você precisa importar o design aprovado para o código.

## Comando

```
importar design aprovado --component=Button
```

## Etapas Executadas

### 1. Identificar o que importar
- Componente: Button
- Busca spec (.feature) com pencil_id

### 2. Buscar componente no Pencil
- Abre documento Pencil
- Encontra proposta: `button_PROPOSTA_1709221200`

### 3. Extrair propriedades do Pencil
```
fill: #141417
cornerRadius: 12
padding: 16
width: 200
height: 48
```

### 4. Converter para Tailwind/CSS
```
background: bg-[#141417]
borderRadius: rounded-xl
padding: p-4
```

### 5. Atualizar código
- Lê `frontend/src/components/ui/Button.tsx`
- Aplica mudanças nos valores de estilo
- Mantém estrutura React existente

### 6. Verificar integridade
- Executa lint
- Verifica compilação

---

## Resultado

```
✅ Design importado para o código

**Componente:** Button
**Pencil ID:** button_PROPOSTA_1709221200
**Aprovado por:** designer@exemplo.com
**Data:** 2024-03-01

**Arquivos modificados:**
- `frontend/src/components/ui/Button.tsx`

**Mudanças aplicadas:**
- background: #141417 (antes: #FF5500)
- borderRadius: 12 (antes: 8)
- padding: 16 (antes: 12)

**Status:** Pronto para review/commitar
```
