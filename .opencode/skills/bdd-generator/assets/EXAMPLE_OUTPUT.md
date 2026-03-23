# Exemplo de Output

Exemplo completo de um arquivo .feature gerado para um Header de Navegação.

## Output Completo

```gherkin
@pending
Feature: Header de Navegação
  **pencil_id:** "header001"

  # ═══════════════════════════════════════════════════════════
  # ✅ FLUXO FELIZ - Happy Path
  # ═══════════════════════════════════════════════════════════

  @pending @desktop @happy
  Scenario: Header desktop exibe logo e menu
    Given que o usuário está em desktop (≥768px)
    When a página carrega
    Then o header é fixed com altura de HEADER_HEIGHT
    And o logo aparece à esquerda
    And o menu exibe NAV_COUNT itens

  @pending @mobile @happy
  Scenario: Header mobile exibe hamburger
    Given que o usuário está em mobile (<768px)
    When a página carrega
    Then o header é fixed com altura de HEADER_HEIGHT
    And o logo aparece à esquerda
    And o botão hamburger aparece à direita

  # ═══════════════════════════════════════════════════════════
  # 🎯 REGRAS DE NEGÓCIO - @rule
  # ═══════════════════════════════════════════════════════════

  @pending @desktop @rule
  Scenario: Menu deve exibir NAV_COUNT itens exatamente
    Given que o usuário está em desktop (≥768px)
    When a página carrega
    Then o menu exibe exatamente NAV_COUNT itens
    And menos ou mais itens indica erro

  # ═══════════════════════════════════════════════════════════
  # 🛡️ PROTEÇÃO CRÍTICA - @defensive (Lei de Murphy)
  # ═══════════════════════════════════════════════════════════

  @pending @mobile @defensive
  Scenario: Clique rápido no hamburger não abre múltiplos overlays
    Given que o usuário está em mobile (<768px)
    And o menu está fechado
    When o usuário clica 3x rapidamente no botão hamburger
    Then o overlay abre apenas uma vez
    And o estado é consistente

  @pending @mobile @defensive
  Scenario: Toggle rápido não causa estado inconsistente
    Given que o usuário está em mobile (<768px)
    When o usuário abre e fecha o menu rapidamente 5 vezes
    Then o estado final está correto
    And não há flickering

  # ═══════════════════════════════════════════════════════════
  # ⚠️ ESTADOS - @state (loading, erro, sucesso)
  # ═══════════════════════════════════════════════════════════

  @pending @state @loading
  Scenario: Menu abrindo mostra estado de loading
    Given que o usuário está em mobile (<768px)
    When o usuário clica no hamburger
    Then animação de abertura inicia
    And menu fica interativo após animação

  # ═══════════════════════════════════════════════════════════
  # 🎛️ COMPONENTES - @component
  # ═══════════════════════════════════════════════════════════

  @pending @component @Header
  Scenario: Header renderiza com todos os subcomponentes
    Given que a página carrega
    Then o logo está presente
    And o menu desktop está presente
    And o botão hamburger está presente
```

## Estatísticas do Output

```
Cenários gerados: 9

Por contexto:
- @desktop: 2
- @mobile: 4
- @component: 1
- @state: 1

Por tipo:
- @happy: 2
- @rule: 1
- @defensive: 2
- @state: 1
- @component: 1

Ordenação por dependência: ✅
  1. render (@component)
  2. state (@state)
  3. interaction (@happy, @rule, @defensive)
  4. a11y (nenhum)
```
