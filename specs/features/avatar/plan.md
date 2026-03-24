# Plan: Avatar

> Gerado a partir de: `specs/features/avatar/research.md`
> Foco: Frontend
> Pencil ID: `sYLr4`

## 1. Visão Geral Técnica

Componente atômico de Avatar que exibe iniciais do usuário em formato circular. Sem integração com backend - componente UI puro receber props de conteúdo (string de iniciais) e aparência (tamanho, cores). Segue padrão de componentes atômicos do projeto.

**Design Reference:** `pencil-demo.pen` → nó `sYLr4`

---

## 2. Estrutura de Arquivos

```
frontend/
├── src/
│   └── components/
│       └── avatar/
│           └── avatar.tsx              # criado - componente Avatar
```

Legenda:
- `# criado` — arquivo novo
- `# modificado` — arquivo existente com alterações

---

## 3. Contratos de API

N/A - Componente UI puro sem integração com backend.

---

## 4. Tipos e Interfaces

```typescript
// frontend/src/components/avatar/types.ts
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  backgroundColor?: string;
  textColor?: string;
  'aria-label'?: string;
  className?: string;
}
```

---

## 5. Props de Componentes

```typescript
// frontend/src/components/avatar/avatar.tsx
export interface AvatarComponentProps {
  initials: string;
  size?: AvatarSize;
  backgroundColor?: string;
  textColor?: string;
  'aria-label'?: string;
  className?: string;
}
```

---

## 6. Hooks e Serviços

N/A - Componente não consome dados de API.

---

## 7. Diagrama de Dependências

```
──► [avatar.tsx]
```

Regra: `──►` significa "depende de / deve existir antes".

---

## 8. Questões em Aberto

- [ ] Quais variantes de tamanho são necessárias? (sm: 24, md: 36, lg: 48, xl: 64)
- [ ] Quais cores de background estão definidas no design system?
- [ ] O componente deve suportar image (foto) além de iniciais?

---

## Lista de Verificação (antes de salvar)

- [x] Todos os RFs do research têm artefato correspondente
- [x] Nenhum tipo usa `any` ou `object` genérico
- [x] Nomes são consistentes entre types, componentes, hooks e serviços
- [x] Todos os componentes têm props definidas na seção 5
- [x] Contratos documentam os erros e como o frontend deve tratá-los
- [x] Diagrama cobre todos os artefatos criados
- [x] Arquivo salvo em `specs/features/avatar/plan.md`
