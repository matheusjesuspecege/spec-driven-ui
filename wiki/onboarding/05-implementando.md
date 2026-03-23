# Implementando: TDD First

## O Ciclo TDD

TDD = Escrever o **teste antes** do código.

```
┌─────────────────────────────────────────────────────────────────┐
│                    CICLO TDD: RED → GREEN                         │
└─────────────────────────────────────────────────────────────────┘

   1. RED           2. GREEN          3. REFACTOR (opcional)
   ┌────────┐       ┌────────┐       ┌────────┐
   │ ESCREVE│       │ ESCREVE│       │ MELHORA│
   │TESTE   │──────→│ CÓDIGO │──────→│ CÓDIGO │──────→
   │QUE     │ FAIL  │ MINIMO │ PASS  │SEMMUDAR│
   │FAIL   │       │PARA    │       │COMPORT.│
   └────────┘       │PASSAR  │       └────────┘
                    └────────┘
```

---

## Passo a Passo

### Cenário de Exemplo

```gherkin
@desktop @pending
Scenario: Logo click navigates to home
  Given I am on the "/about" page
  When I click the sidebar logo
  Then I should be navigated to "/"
```

### Passo 1: Leia o *.spec.docs.md (se existir)

```bash
# Verifique se existe
ls frontend/tests/features/sidebar/*.spec.docs.md
```

Contém: data-testids documentados, passos sugeridos, referências.

### Passo 2: Crie/Execute o Teste (RED)

```bash
cd frontend
pnpm playwright test tests/features/sidebar/sidebar.spec.ts
```

**Saída esperada (falha):**
```
✗ Logo click navigates to home
  Error: No such element: [data-testid="sidebar-logo"]
```

**Isso é bom!** Teste está funcionando.

### Passo 3: Implemente o Código Mínimo (GREEN)

`frontend/src/components/sidebar/sidebar.tsx`:

```tsx
import Link from 'next/link';

export const Sidebar = () => {
  return (
    <aside data-testid="sidebar">
      <Link href="/" data-testid="sidebar-logo">
        Logo
      </Link>
    </aside>
  );
};
```

### Passo 4: Execute o Teste Novamente

```bash
pnpm playwright test tests/features/sidebar/sidebar.spec.ts
```

**Saída esperada:**
```
✓ Logo click navigates to home
```

### Passo 5: Refatore (se necessário)

```tsx
import Link from 'next/link';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside
      data-testid="sidebar"
      className={`w-[240px] h-screen bg-[#141417] ${className || ''}`}
    >
      <Link href="/" data-testid="sidebar-logo" className="flex items-center">
        <span className="text-xl font-bold text-white">Logo</span>
      </Link>
    </aside>
  );
};
```

---

## Onde Colocar o Código

```
frontend/
├── src/
│   ├── app/                    ← Páginas Next.js
│   └── components/            ← Componentes
│       └── sidebar/
│           ├── sidebar.tsx    ← Componente
│           └── index.ts       ← Export
│
└── tests/
    └── features/              ← Testes E2E
        └── sidebar/
            ├── sidebar.spec.ts
            └── sidebar.spec.docs.md
```

---

## Checklist: Está Pronto?

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHECKLIST PRONTO!                            │
└─────────────────────────────────────────────────────────────────┘

□ Teste criado seguindo *.feature
□ Teste passa com pnpm playwright test
□ /verify-patterns passou
□ pnpm tsc --noEmit passou
□ pnpm eslint passou
□ progress.md atualizado
□ Revisão humana aprovada

Se tudo verde → PR! 🎉
```

---

## Exemplo: Sidebar com NavItems

### O Cenário

```gherkin
@desktop @pending
Scenario: Desktop menu shows all navigation items
  Given I am on the home page
  Then I should see the following navigation items:
    | Home     |
    | About    |
    | Projects |
    | Contact  |
```

### O Teste

```typescript
test('Desktop menu shows all navigation items', async ({ page }) => {
  await page.goto('/');

  const items = ['Home', 'About', 'Projects', 'Contact'];
  for (let i = 0; i < items.length; i++) {
    await expect(page.locator(`[data-testid="sidebar-nav-${i}"]`))
      .toHaveText(items[i]);
  }
});
```

### A Implementação

```tsx
const NAV_ITEMS = ['Home', 'About', 'Projects', 'Contact'];

export const Sidebar = () => {
  return (
    <aside data-testid="sidebar">
      <nav data-testid="sidebar-desktop-menu" className="flex flex-col gap-4">
        {NAV_ITEMS.map((item, index) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            data-testid={`sidebar-nav-${index}`}
          >
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
```

### O Resultado

```
✓ Desktop menu shows all navigation items
```

---

## Erros Comuns

| ❌ Error | ✅ Correção |
|----------|------------|
| Implementar antes do teste | RED primeiro! |
| Teste complexo | Um assert por vez |
| Ignorar o data-testid | Use o que está no *.spec.docs.md |
| Testar implementação | Given-When-Then = comportamento |

---

## Próximo Passo

Entenda a validação → `06-gate.md`
