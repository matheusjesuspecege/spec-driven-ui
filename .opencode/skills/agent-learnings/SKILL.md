---
name: agent-learnings
description: "Registra aprendizados e incidentes durante a sessão no agent-session-log.json. Use quando o usuário quiser registrar algo para aprendizados futuros (comandos errados, correções humanas)."
license: MIT
compatibility: opencode
metadata:
  version: "1.0"
  user-invocable: true
  triggers:
    - "registrar aprendizado"
    - "agent-learnings"
    - "registrar incidente"
---

# Skill: Agent Learnings

## Quando Usar

Execute esta skill quando o usuário solicitar:
- `@agent-learnings registre: [descrição] categoria: [categoria]`

## Como Funcionar

1. **Aguarde** solicitação do usuário
2. **Leia** `.opencode/agent-session-log.json`
3. **Adicione** novo incidente
4. **Salve** o arquivo
5. **Confirme** registro

## Categorias Válidas

| Categoria | Descrição |
|-----------|-----------|
| `comando_errado` | Comando executado incorretamente |
| `correcao_humana` | Correção feita por humano |

## Formato do Arquivo

`.opencode/agent-session-log.json`:
```json
{
  "incidents": [
    {
      "timestamp": "2026-03-23T14:01:00Z",
      "description": "Executei npm run dev sem verificar servidor",
      "category": "comando_errado"
    }
  ]
}
```

## Mensagens de Resposta

- **Sucesso**:
  ```
  ✅ Registrado: [breve resumo]
  Categoria: [categoria]
  ```

- **Erro**:
  ```
  ❌ Erro ao registrar: [motivo]
  ```

## Regras

- Apenas registre o que o usuário solicitar
- Não modifique código ou execute comandos
- Responda de forma mínima

---

**Início**: Pronto para registros.
