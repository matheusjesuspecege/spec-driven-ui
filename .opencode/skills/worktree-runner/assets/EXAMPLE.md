# Exemplo de Execução

## Input

```
@worktree-runner button
```

## Output

```
=== Setup Concluído ===

Feature: button
Worktree: ../spec-driven-ui-button
Branch: feat/button

Para usar:
  cd ../spec-driven-ui-button
  /implement-tasks button
```

## Validações

| Verificação | Resultado |
|-------------|-----------|
| .feature existe | ✅ Continua |
| Branch não existe | ✅ Pode criar |
| Diretório não existe | ✅ Pode criar |

## Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| "Branch já existe" | feat/button já foi criada | Usar branch existente ou usar outro nome |
| "Diretório já existe" | Worktree já existe | Remover diretório ou usar outro nome |
| ".feature não encontrado" | Feature não existe | Criar feature primeiro com bdd-generator |
| "Não está na main" | Em outro worktree | Voltar para main antes |
