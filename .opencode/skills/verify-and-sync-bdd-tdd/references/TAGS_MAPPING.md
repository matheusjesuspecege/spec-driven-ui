# Tags BDD → Significado → Ação

| Tag | Significado | Ação ao Implementar |
|-----|-------------|---------------------|
| `@smoke` | Teste crítico, deve sempre passar | Manter `test()` |
| `@hover` | Teste de hover (desenvolvimento) | Ao passar, adicionar `@smoke` |
| `@active` | Teste de active (desenvolvimento) | Ao passar, adicionar `@smoke` |
| `@state` | Teste de estado (desenvolvimento) | Ao passar, adicionar `@smoke` |
| `@interaction` | Teste de interação | Ao passar, adicionar `@smoke` |
| `@a11y` | Teste de acessibilidade | Ao passar, adicionar `@smoke` |
| `@keyboard` | Navegação por teclado | Ao passar, adicionar `@smoke` |
| `@aria` | Atributos ARIA | Ao passar, adicionar `@smoke` |
| `@touch-target` | Área de toque mobile | Ao passar, adicionar `@smoke` |
| `@defensive` | Proteção contra bugs | Ao passar, adicionar `@smoke` |
| `@variant` | Variante de componente | Ao passar, adicionar `@smoke` |
| `@size` | Tamanho específico | Ao passar, adicionar `@smoke` |
| `@full-width` | Largura total | Ao passar, adicionar `@smoke` |
| `@testid` | Identificação para testes | Ao passar, adicionar `@smoke` |
| `@classname` | Sobrescrita de estilos | Ao passar, adicionar `@smoke` |
| `@children` | Conteúdo textual | Ao passar, adicionar `@smoke` |

## Ciclo de Vida

```
1. TESTE É IMPLEMENTADO (tirado do skip)
2. DESENVOLVEDOR RODA O TESTE
3. TESTE PASSA?
   ├── SIM → BDD deve receber @smoke
   └── NÃO → Manter tag original, corrigir código
```

## Mapeamento Status TDD ↔ Tags BDD

| TDD | BDD | Status | Ação |
|-----|-----|--------|------|
| `test()` | COM `@smoke` | ✅ Sincronizado | OK |
| `test()` | SEM `@smoke` | ⚠️ Sugerir | Adicionar `@smoke` ao BDD |
| `test.skip()` | SEM `@smoke` | ✅ Em desenvolvimento | OK |
| `test.skip()` | COM `@smoke` | ❌ Problema | REPORTAR |

## Classificação por Dependência

| Categoria | Palavras-chave |
|-----------|----------------|
| `render` | renderizad[oa], vis[í|i]vel, exibe, aparece |
| `state` | hover, focus, loading, disabled, active |
| `interaction` | clica, submit, digita, seleciona |
| `a11y` | teclado, tab, leitor de tela, aria |
