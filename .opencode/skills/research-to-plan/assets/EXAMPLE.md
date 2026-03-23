# Exemplo: Plan para Feature "user-list"

## Entrada: research.md

Suponha que o research.md contenha:

```
## RF01 - Listar Usuários
O sistema deve permitir listar todos os usuários com paginação.

## RF02 - Detalhar Usuário
Ao clicar em um usuário, abrir modal com detalhes.
```

## Saída: plan.md

```markdown
# Plan: user-list

> Gerado a partir de: `specs/features/user-list/research.md`
> Foco: Frontend

## 1. Visão Geral Técnica

Implementação de uma página de listagem de usuários com paginação server-side e modal de detalhes. O frontend utiliza React Query para gerenciamento de estado remoto e shadcn/ui para componentes base.

---

## 2. Estrutura de Arquivos

```
src/
├── app/
│   └── usuarios/
│       └── page.tsx                    # modificado - adiciona listagem
├── components/
│   ├── usuarios/
│   │   ├── UserList.tsx           # criado - tabela principal
│   │   ├── UserListItem.tsx       # criado - linha da tabela
│   │   └── UserDetailModal.tsx    # criado - modal de detalhes
│   └── ui/
│       └── table.tsx               # existente - shadcn
├── hooks/
│   └── useUsers.ts                 # criado - dados da lista
└── generated/
    └── types.ts                    # modificado - adiciona User, UserDTO
```

---

## 3. Contratos de API

| Método | Endpoint | Descrição | Payload | Response |
|--------|----------|-----------|---------|----------|
| GET | `/api/users` | Lista usuários | `PageRequest` | `PageResponse<User>` |
| GET | `/api/users/:id` | Detalhes do usuário | - | `User` |

---

## 4. Tipos e Interfaces

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface PageRequest {
  page: number;
  limit: number;
}

export interface PageResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
```

---

## 5. Props de Componentes

```typescript
// UserList/types.ts
export interface UserListProps {
  users: User[];
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onUserClick: (user: User) => void;
  total: number;
  page: number;
}
```

---

## 6. Hooks e Serviços

```typescript
// hooks/useUsers.ts
export function useUsers(page: number) {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => userService.getUsers({ page, limit: 10 }),
  });
}
```

---

## 7. Diagrama de Dependências

```
[types.ts]
    │
    ├──► [userService.ts]
    │         │
    │         ▼
    │    [useUsers.ts]
    │         │
    ▼         ▼
[UserListItem.tsx] ──► [UserList.tsx]
                            │
                            ▼
                      [usuarios/page.tsx]
                                │
                                ▼
                        [UserDetailModal.tsx]
```

---

## 8. Questões em Aberto

- [ ] shadcn/ui Table ou DataTable comTanStack Table?
- [ ] Paginação client-side ou server-side?