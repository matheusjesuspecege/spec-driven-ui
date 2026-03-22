# Convenções de Código

## TypeScript

- Não adicionar comentários no código `.ts`, `.tsx`, apenas é permitido em cenarios de teste ou planejamento.
- Não adicionar o tipo de retorno da função, use a **inferencia de tipos** do typescript
- Props de componentes devem ser nomeadas de maneira descritiva para props `ComponentProps`
- Props que utilizam `ForwardRef` devem tipar as suas interfaces de maneira descritiva para ref `ComponentRef`.
- Não use `any` faça a tipagem correta.
- Função devem ser criadas com `arrow functions`
- Se um valor repetir mais de uma vez na mesma função, ou teste, armazene em uma constante mais acima que possa ser reaproveitada em todos os locais de uso.

---

## Arquivos e Pastas

- Arquivos devem respeitar o maximo de 500 linhas, acima disso deverá ser criado em arquivo separado e importado onde é utizado.
- Pastas devem ser criadas em lowercase, separado por `-` quando necessário.
- Utilitários devem ser salvos em `frontend/src/utils/utils.ts`
- **NÃO criar barrel exports** (`index.ts`) — imports diretos dos arquivos |
- **NÃO criar CSS separado** por componente — use Tailwind utilities no `.tsx` |

---

## Identação

- Evite espaçamentos desnecessários entre linhas (vertical).

---

## Componentes

- Componentes só devem ser exportados se forem realmente ser utilizados por outros componentes.
-  Use `export default` para arquivos com apenas 1 componente.

---

## Escrita de testes

- Testes não devem fazer exportações, cada teste deve ser isolado com responsabilidade unica - **single responsability - solid**
- Classes **page object** e **constantes globais** gerais devem ficar no final do arquivo de teste
- Cada componente/feature tem **spec próprio**: `frontend/tests/features/[nome]/[nome].spec.ts`
- Estrutura de spec por componente.
- Não crie string HTML para testes componentes.
- Não crie um página de teste para renderizar por meio do método setContent.
- Não criar CONSTANTS para armazenar os tokens ex: `TOKENS`, use os valores diretamente no código.
- HELPERS de teste abstratos que podem ser reutilizados entre os testes devem estar em `frontend/src/utils/test-utils.ts` (use eles)
- Se for usar `data-testid`, use nomes relacionados ao teste que está trabalhando
- O arquivo de instancia dos componentes atomicos que precisam ser instanciados para fazer o teste passar, está localizado em `frontend/src/app/test-ds/page.ts` 

```
frontend/tests/features/[nome]/
├── [nome].spec.ts       # Testes Playwright
└── [nome].spec.docs.md  # Documentação (gerado por @tdd-generator)
```

> **Ordem de implementação de testes**: componentes com menos dependências primeiro (bottom-up). Mockar dependências nos specs dos componentes pais.

---

## Next.js

- Utilize o component `Image` de `next/image` para imagens com a prop `alt` obrigatória
- As fonts devem ser importadas de `next/font/google` no arquivo de layout

---

## React

- Em loops `map` adicionar a `key` unica no elemento e priorizando a prop do array da iteração no lugar da key 

---

## CSS

- Não adicione comentários nos testes.
