# Scenario Templates

## Mapeamento AC → Given-When-Then

### Given (Pré-condições)

| Padrão AC | Dado em português |
|-----------|-------------------|
| em desktop | que o usuário está em desktop (≥768px) |
| em mobile | que o usuário está em mobile (<768px) |
| página carrega | a página carrega |
| usuário está logado | que o usuário está logado |
| formulário vazio | que o formulário está vazio |
| overlay aberto | que o overlay está aberto |

### When (Ações)

| Padrão AC | Quando em português |
|-----------|---------------------|
| clica | o usuário clica no |
| digita | o usuário digita no campo |
| pressiona | o usuário pressiona |
| seleciona | o usuário seleciona |
| submete | o usuário submete o formulário |

### Then (Resultados)

| Padrão AC | Então em português |
|-----------|-------------------|
| está visível | está visível |
| está oculto | está oculto |
| redireciona para | a URL muda para |
| contador é | o contador é |
| exibe | exibe |
| aparece | aparece |
| fecha | fecha |

---

## Template: Cenários Happy Path

```gherkin
@pending @desktop @happy
Scenario: [Título da User Story]
  Given que o usuário está em desktop (≥768px)
  When a página carrega
  Then [resultado esperado]
```

## Template: Cenários @rule

```gherkin
@pending @rule @validation
Scenario: [Título] - Rejeita quando campo obrigatório vazio
  Given dado que o usuário está na página
  When quando tenta submeter sem preencher campos obrigatórios
  Then então o sistema exibe erro de validação
  And então a ação é bloqueada
```

## Template: Cenários @defensive

```gherkin
@pending @defensive
Scenario: [Título] - Double-click não causa ação duplicada
  Given dado que o formulário está válido
  When quando o usuário clica 3x rapidamente no botão
  Then então a ação ocorre apenas uma vez
  And então não há duplicação de dados
```

## Template: Cenários @state

```gherkin
@pending @state @loading
Scenario: [Título] - Estado de loading durante processamento
  Given dado que o usuário está na página
  When quando a ação é iniciada
  Then então indicador de loading aparece
  And então campos ficam desabilitados
```

---

## Exemplos Práticos

### Exemplo 1: Header Navigation

```gherkin
@pending @desktop @happy
Scenario: Header desktop exibe logo e menu
  Given que o usuário está em desktop (≥768px)
  When a página carrega
  Then o header é fixed com altura de HEADER_HEIGHT
  And o logo aparece à esquerda
  And o menu exibe NAV_COUNT itens
```

### Exemplo 2: Validação de Campo

```gherkin
@pending @rule @validation
Scenario: Formulário rejeita email inválido
  Given que o usuário está na página de cadastro
  And o campo email está vazio
  When o usuário digita "email-invalido" no campo email
  And tenta submeter o formulário
  Then o sistema exibe erro de validação
  And o campo email é destacado em vermelho
```

### Exemplo 3: Double-click Prevention

```gherkin
@pending @defensive
Scenario: Clique rápido no botãosubmit não causa ação duplicada
  Given que o formulário está válido
  When o usuário clica 3x rapidamente no botão submeter
  Then a submissão ocorre apenas uma vez
  And não há duplicação de dados no servidor
```

### Exemplo 4: Loading State

```gherkin
@pending @state @loading
Scenario: Button mostra spinner durante submissão
  Given que o usuário preencheu o formulário corretamente
  When o usuário clica no botão submeter
  Then o botão mostra indicador de loading
  And o botão fica desabilitado
  And cliques adicionais são ignorados
```
