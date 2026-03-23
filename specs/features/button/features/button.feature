# language: pt
@button @atom @component
Funcionalidade: Button Component - Upgrade Button (Inverse)
  Como usuário ou desenvolvedor
  Quero usar botões de upgrade consistentes com o Design System
  Para acionar ações de destaque na interface de forma clara e acessível

  # ═══════════════════════════════════════════════════════════
  # PENCIL_IDS (Source: research.md)
  # jipw1: Upgrade Button (Inverse) - Banner card
  # ═══════════════════════════════════════════════════════════
                **pencil_id:** "jipw1"

  # ═══════════════════════════════════════════════════════════
  # RENDER - Renderização básica (deve vir primeiro)
  # Cenários que verificam a renderização inicial do componente
  # ═══════════════════════════════════════════════════════════

  @button @variant @inverse @smoke
  Cenário: Inverse button tem estilo correto
      Dado que o componente Button é renderizado com variant="inverse"
       Quando visível na página
       Então deve ter background #FFFFFF
        E deve ter texto com cor primary (#FF5C00)
        E não deve ter borda

  @button @size @upgrade @smoke
  Cenário: Upgrade button tem dimensões do inverse (sm-like)
      Dado que o componente Button é renderizado com variant="inverse"
       Quando visível na página
       Então deve ter font-size de 12px (text-xs)
        E deve ter font-weight de 600
        E deve ter border-radius de 6px (radius-md)
        E deve ter padding vertical de 10px

  @button @full-width @upgrade @smoke
  Cenário: Upgrade button ocupa 100% do container
      Dado que o componente Button é renderizado com variant="inverse"
       Quando visível na página
       Então deve ter width de 100%
        E deve ter padding horizontal de 0

  @button @children @smoke
  Cenário: Inverse button renderiza children como texto "Upgrade Now"
      Dado que o componente Button variant="inverse" é renderizado com children="Upgrade Now"
       Quando visível na página
       Então o texto "Upgrade Now" deve estar visível

  @button @classname
  Cenário: Inverse button aceita className para estilos customizados
      Dado que o componente Button variant="inverse" é renderizado com className="upgrade-btn"
       Quando visível na página
       Então deve incluir a classe "upgrade-btn" no elemento
        E deve manter as classes base do componente

  @button @testid
  Cenário: Inverse button aceita data-testid para identificação em testes
      Dado que o componente Button variant="inverse" é renderizado com data-testid="upgrade-btn"
       Quando visível na página
       Então o elemento deve ter o atributo data-testid="upgrade-btn"
        E deve ser possível selecionar o elemento por este atributo

  # ═══════════════════════════════════════════════════════════
  # STATE - Estados do componente
  # Hover, disabled, loading, focus, active
  # ═══════════════════════════════════════════════════════════

  @button @variant @inverse @hover @smoke
  Cenário: Inverse button em hover
      Dado que o componente Button variant="inverse" está visível
       Quando o cursor passa sobre o botão
       Então o background muda para bg-muted (#1A1A1D)

  @button @variant @inverse @active @smoke
  Cenário: Inverse button em estado active
      Dado que o componente Button variant="inverse" está visível
       Quando o botão é clicado
       Então o background escurece 5% em relação ao estado default

  @button @state @disabled
  Cenário: Inverse button em disabled tem estilo correto
      Dado que o componente Button é renderizado com variant="inverse" e disabled=true
       Quando visível na página
       Então deve ter opacity de 50%
        E deve ter cursor not-allowed
        E deve ter atributo disabled="true"

  @button @state @loading
  Cenário: Inverse button em loading exibe spinner e desabilita interação
      Dado que o componente Button é renderizado com variant="inverse" e loading=true
       Quando visível na página
       Então o atributo aria-busy deve ser "true"
        E o atributo aria-disabled deve ser "true"
        E deve exibir spinner
        E deve ter cursor not-allowed

  @button @state @focus @a11y
  Cenário: Inverse button em focus tem focus ring visível
      Dado que o componente Button variant="inverse" está visível
       Quando o botão recebe focus (Tab)
       Então deve exibir focus ring com cor border-focus (#3B82F6)
        E deve ter outline de 2px

  # ═══════════════════════════════════════════════════════════
  # INTERACTION - Ações do usuário
  # Cliques, navegação, feedback
  # ═══════════════════════════════════════════════════════════

  @button @state @disabled @interaction
  Cenário: Inverse button em disabled não responde a cliques
      Dado que o componente Button variant="inverse" está em estado disabled
       Quando o usuário clica no botão
       Então o onClick não deve ser disparado

  @button @state @loading @interaction
  Cenário: Inverse button em loading não responde a cliques
      Dado que o componente Button variant="inverse" está em estado loading
       Quando o usuário clica no botão
       Então o onClick não deve ser disparado

  @button @a11y @keyboard
  Cenário: Inverse button é navegável por teclado
      Dado que o componente Button variant="inverse" está visível na página
       Quando o usuário pressiona Tab
       Então o botão deve receber focus
        E deve ser possível ativá-lo com Enter
        E deve ser possível ativá-lo com Space

  @button @defensive @double-click
  Cenário: Double-click não causa ação duplicada no Inverse button
      Dado que o componente Button variant="inverse" está habilitado
       Quando o usuário clica rapidamente 3 vezes no botão
       Então a ação deve ocorrer apenas uma vez
        E não deve haver duplicação de requisições ou estados

  @button @defensive @double-click
  Cenário: Spinner aparece imediatamente ao clicar no Inverse button
      Dado que o componente Button variant="inverse" está habilitado
       E o callback onClick é síncrono (retorna promise)
       Quando o usuário clica no botão
       Então deve haver proteção contra double-click nativo do browser

  @button @defensive @loading-transition
  Cenário: Transição para loading state preserva layout no Inverse button
      Dado que o componente Button variant="inverse" está visível
       Quando loading muda de false para true
       Então o layout não deve saltar (no layout shift)
        E o botão deve manter dimensões similares

  @button @defensive @type-attribute
  Cenário: Inverse button type="button" não submete formulário inadvertidamente
      Dado que o componente Button variant="inverse" está dentro de um formulário
       Quando o botão tem type="button" (default)
        E o usuário clica no botão
       Então o formulário não deve ser submetido

  # ═══════════════════════════════════════════════════════════
  # A11Y - Acessibilidade
  # Leitores de tela, touch targets
  # ═══════════════════════════════════════════════════════════

  @button @a11y @aria
  Cenário: Inverse button expõe estados corretamente para leitores de tela
      Dado que o componente Button variant="inverse" é renderizado
       Quando exposto para leitores de tela
       Então o papel (role) deve ser "button"
        E deve ter texto acessível como nome acessível

  @button @a11y @aria
  Cenário: Inverse button em disabled expõe estado corretamente
      Dado que o componente Button variant="inverse" é renderizado com disabled=true
       Quando exposto para leitores de tela
       Então o atributo aria-disabled deve ser "true"

  @button @a11y @aria
  Cenário: Inverse button em loading expõe estado corretamente
      Dado que o componente Button variant="inverse" é renderizado com loading=true
       Quando exposto para leitores de tela
       Então o atributo aria-busy deve ser "true"
        E o atributo aria-disabled deve ser "true"

  @button @a11y @touch-target
  Cenário: Inverse button em mobile tem touch target adequado
      Dado que o componente Button variant="inverse" é renderizado
       Quando visualizado em dispositivo mobile (touch)
       Então deve ter área de toque mínima de 44x44px