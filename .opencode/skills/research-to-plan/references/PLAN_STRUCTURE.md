# Estrutura do plan.md

Template completo para o documento de plano técnico.

```markdown
# Plan: [Nome da Feature]

> Gerado a partir de: `specs/features/[nome-da-feature]/research.md`
> Foco: Frontend

## 1. Visão Geral Técnica

Resumo de 3–5 linhas do que será construído no frontend. Mencione as camadas: quais páginas mudam, quais componentes são criados, como o frontend se comunica com o backend.

---

## 2. Estrutura de Arquivos

Todos os arquivos que serão **criados ou modificados**. Use árvore de diretórios.

```
src/
├── app/
│   └── [rota]/
│       └── page.tsx                          # modificado - adiciona seção X
├── components/
│   ├── nome-componente-principal.tsx   # criado - descrição breve
│   └── nome-subomponente.tsx         # criado - descrição breve
├── hooks/
│   └── use-nome-hook.ts                # criado - lógica de dados
├── services/
│   └── nome-service.ts                # criado - chamadas à API
└── generated/   
    └── types.ts                          # criado - interfaces e enums
```

Legenda:
- `# criado` — arquivo novo
- `# modificado` — arquivo existente com alterações

---

## 3. Contratos de API

Lista de endpoints/actions consumidos pelo frontend.

| Método | Endpoint | Descrição | Payload | Response |
|--------|----------|-----------|---------|----------|
| GET | `/api/recurso` | Lista recursos | - | `Resource[]` |
| POST | `/api/recurso` | Cria recurso | `CreateResourceDTO` | `Resource` |

**Tratamento de erros:**
- 400: validar input no frontend
- 401: redirecionar para login
- 500: exibir mensagem genérica

---

## 4. Tipos e Interfaces

Todos os tipos TypeScript definidos para a feature.

```typescript
// Tipos da feature
export interface Recurso {
  id: string;
  nome: string;
  status: 'ativo' | 'inativo';
}

export type CreateRecursoDTO = Omit<Recurso, 'id'>;
export type UpdateRecursoDTO = Partial<CreateRecursoDTO>;
```

---

## 5. Props de Componentes

Interfaces das props de cada componente.

```typescript
// NomeComponente/types.ts
export interface NomeComponenteProps {
  data: Recurso[];
  onSelect: (id: string) => void;
  isLoading?: boolean;
}
```

---

## 6. Hooks e Serviços

Lógica de consumo de dados.

```typescript
// hooks/useNomeHook.ts
export function useNomeHook() {
  const query = useQuery({
    queryKey: ['nome'],
    queryFn: nomeService.getAll,
  });
  return query;
}
```

---

## 7. Diagrama de Dependências

Ordem de implementação. Artefatos anteriores devem existir antes dos posteriores.

```
[types.ts]
    │
    ├──► [nomeService.ts]
    │         │
    │         ▼
    │    [useNomeHook.ts]
    │         │
    ▼         ▼
[NomeSubComponente.tsx] ──► [NomeComponentePrincipal.tsx]
                                        │
                                        ▼
                                  [page.tsx (modificado)]
```

Regra: `──►` significa "depende de / deve existir antes".

---

## 8. Questões em Aberto

Decisões que ainda precisam de resposta antes ou durante a implementação.

- [ ] [Questão técnica pendente]
- [ ] [Decisão de UX que impacta implementação]
```

---

## Lista de Verificação (antes de salvar)

- [ ] Todos os RFs do research têm artefato correspondente
- [ ] Nenhum tipo usa `any` ou `object` genérico
- [ ] Nomes são consistentes entre types, componentes, hooks e serviços
- [ ] Todos os componentes têm props definidas na seção 5
- [ ] Contratos documentam os erros e como o frontend deve tratá-los
- [ ] Diagrama cobre todos os artefatos criados
- [ ] Arquivo salvo em `specs/features/[nome-da-feature]/plan.md`