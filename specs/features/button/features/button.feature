# language: pt
@button @atom @component
Funcionalidade: Button Component
  Como usuário ou desenvolvedor
  Quero usar botões consistentes com o Design System
  Para acionar ações na interface de forma clara e acessível

  # ═══════════════════════════════════════════════════════════
  # PENCIL_IDS (Source: research.md)
  # l9nUc: Primary Button
  # fFV1n: Secondary Button
  # jipw1: Upgrade Button (Inverse)
  # ═══════════════════════════════════════════════════════════
  **pencil_id:** "l9nUc"

  # ============================================================
  # VARIANTES - Primary
  # RF-01: Renderizar botão com variant "primary"
  # ============================================================
  @button @variant @primary @smoke
  Cenário: Primary button tem estilo correto
    Dado que o componente Button é renderizado com variant="primary"
    Quando visível na página
    Então deve ter background com cor primary (#FF5C00)
    E deve ter texto com cor #FFFFFF
    E não deve ter borda

  @button @variant @primary @hover
  Cenário: Primary button em hover
    Dado que o componente Button variant="primary" está visível
    Quando o cursor passa sobre o botão
    Então o background muda para primary-hover (#FF7A33)

  @button @variant @primary @active
  Cenário: Primary button em estado active
    Dado que o componente Button variant="primary" está visível
    Quando o botão é clicado
    Então o background escurece 10% em relação ao estado default

  # ============================================================
  # VARIANTES - Secondary
  # RF-02: Renderizar botão com variant "secondary"
  # ============================================================
  @button @variant @secondary @smoke
  Cenário: Secondary button tem estilo correto
    Dado que o componente Button é renderizado com variant="secondary"
    Quando visível na página
    Então deve ter background transparent
    E deve ter borda 1px com cor border (#2A2A2E)
    E deve ter texto com cor #FFFFFF

  @button @variant @secondary @hover
  Cenário: Secondary button em hover
    Dado que o componente Button variant="secondary" está visível
    Quando o cursor passa sobre o botão
    Então o background muda para bg-muted (#1A1A1D)

  # ============================================================
  # VARIANTES - Ghost
  # RF-03: Renderizar botão com variant "ghost"
  # ============================================================
  @button @variant @ghost @smoke
  Cenário: Ghost button tem estilo correto
    Dado que o componente Button é renderizado com variant="ghost"
    Quando visível na página
    Então deve ter background transparent
    E não deve ter borda
    E deve ter texto com cor #FFFFFF

  @button @variant @ghost @hover
  Cenário: Ghost button em hover
    Dado que o componente Button variant="ghost" está visível
    Quando o cursor passa sobre o botão
    Então o background muda para bg-muted (#1A1A1D)

  # ============================================================
  # VARIANTES - Destructive
  # RF-04: Renderizar botão com variant "destructive"
  # ============================================================
  @button @variant @destructive @smoke
  Cenário: Destructive button tem estilo correto
    Dado que o componente Button é renderizado com variant="destructive"
    Quando visível na página
    Então deve ter background com cor error (#EF4444)
    E deve ter texto com cor #FFFFFF
    E não deve ter borda

  @button @variant @destructive @hover
  Cenário: Destructive button em hover
    Dado que o componente Button variant="destructive" está visível
    Quando o cursor passa sobre o botão
    Então o background escurece 10%

  @button @variant @destructive @active
  Cenário: Destructive button em estado active
    Dado que o componente Button variant="destructive" está visível
    Quando o botão é clicado
    Então o background escurece 15% em relação ao estado default

  # ============================================================
  # VARIANTES - Inverse
  # RF-05: Renderizar botão com variant "inverse"
  # ============================================================
  @button @variant @inverse @smoke
  Cenário: Inverse button tem estilo correto
    Dado que o componente Button é renderizado com variant="inverse"
    Quando visível na página
    Então deve ter background #FFFFFF
    E deve ter texto com cor primary (#FF5C00)
    E não deve ter borda

  @button @variant @inverse @hover
  Cenário: Inverse button em hover
    Dado que o componente Button variant="inverse" está visível
    Quando o cursor passa sobre o botão
    Então o background muda para bg-muted (#1A1A1D)

  # ============================================================
  # TAMANHOS - Small
  # RF-06: Renderizar botão em tamanho "sm"
  # ============================================================
  @button @size @sm @smoke
  Cenário: Button small tem dimensões corretas
    Dado que o componente Button é renderizado com size="sm"
    Quando visível na página
    Então deve ter altura de aproximadamente 32px
    E deve ter padding vertical de 6px
    E deve ter padding horizontal de 12px
    E deve ter font-size de 12px (text-xs)
    E deve ter gap de 6px entre ícone e texto
    E deve ter border-radius de 6px (radius-md)

  # ============================================================
  # TAMANHOS - Medium (Default)
  # RF-07: Renderizar botão em tamanho "md" - DEFAULT
  # ============================================================
  @button @size @md @smoke
  Cenário: Button medium tem dimensões corretas
    Dado que o componente Button é renderizado com size="md"
    Quando visível na página
    Então deve ter altura de aproximadamente 40px
    E deve ter padding vertical de 10px
    E deve ter padding horizontal de 16px
    E deve ter font-size de 13px (text-sm)
    E deve ter gap de 8px entre ícone e texto
    E deve ter border-radius de 8px (radius-lg)

  @button @size @md @default
  Cenário: Button sem size especificado usa md como default
    Dado que o componente Button é renderizado sem especificar size
    Quando visível na página
    Então deve se comportar como size="md"

  # ============================================================
  # TAMANHOS - Large
  # RF-08: Renderizar botão em tamanho "lg"
  # ============================================================
  @button @size @lg @smoke
  Cenário: Button large tem dimensões corretas
    Dado que o componente Button é renderizado com size="lg"
    Quando visível na página
    Então deve ter altura de aproximadamente 48px
    E deve ter padding vertical de 12px
    E deve ter padding horizontal de 20px
    E deve ter font-size de 14px (text-base)
    E deve ter gap de 10px entre ícone e texto
    E deve ter border-radius de 8px (radius-lg)

  # ============================================================
  # ICONES - Posição Esquerda
  # RF-09: Aceitar ícone na posição esquerda
  # ============================================================
  @button @icon @icon-left @smoke
  Cenário: Button com ícone à esquerda
    Dado que o componente Button é renderizado com icon e iconPosition="left"
    Quando visível na página
    Então o ícone deve aparecer antes do texto
    E deve haver gap de 8px entre ícone e texto (size md)
    E deve ter ícone com tamanho de 16px (size md)

  # ============================================================
  # ICONES - Posição Direita
  # RF-10: Aceitar ícone na posição direita
  # ============================================================
  @button @icon @icon-right @smoke
  Cenário: Button com ícone à direita
    Dado que o componente Button é renderizado com icon e iconPosition="right"
    Quando visível na página
    Então o ícone deve aparecer depois do texto
    E deve haver gap de 8px entre texto e ícone (size md)

  # ============================================================
  # ICONES - Icon Only
  # RF-11: Renderizar como icon-only
  # ============================================================
  @button @icon @icon-only @smoke
  Cenário: Button icon-only tem padding quadrado
    Dado que o componente Button é renderizado com iconPosition="icon-only"
    Quando visível na página
    Então deve ter padding simétrico [10, 10]
    E deve ter touch target mínimo de 44x44px
    E deve exibir apenas o ícone (sem texto)

  @button @icon @icon-only @a11y
  Cenário: Button icon-only requer aria-label para acessibilidade
    Dado que o componente Button é renderizado com iconPosition="icon-only"
    Quando visível na página
    Então o atributo aria-label deve estar presente
    E deve ter valor não vazio

  # ============================================================
  # ESTADO - Loading
  # RF-12: Exibir estado loading
  # ============================================================
  @button @state @loading @smoke
  Cenário: Button em loading exibe spinner e desabilita interação
    Dado que o componente Button é renderizado com loading=true
    Quando visível na página
    Então o atributo aria-busy deve ser "true"
    E o atributo aria-disabled deve ser "true"
    E deve exibir spinner
    E deve ter cursor not-allowed

  @button @state @loading @interaction
  Cenário: Button em loading não responde a cliques
    Dado que o componente Button está em estado loading
    Quando o usuário clica no botão
    Então o onClick não deve ser disparado

  @button @state @loading @all-variants
  Esquema do Cenário: Button em loading funciona para todas as variantes
    Dado que o componente Button é renderizado com variant="<variant>" e loading=true
    Quando visível na página
    Então deve exibir spinner
    E deve estar desabilitado

    Exemplos:
      | variant      |
      | primary      |
      | secondary    |
      | ghost        |
      | destructive  |
      | inverse      |

  # ============================================================
  # ESTADO - Disabled
  # RF-13: Exibir estado disabled
  # ============================================================
  @button @state @disabled @smoke
  Cenário: Button em disabled tem estilo correto
    Dado que o componente Button é renderizado com disabled=true
    Quando visível na página
    Então deve ter opacity de 50%
    E deve ter cursor not-allowed
    E deve ter atributo disabled="true"

  @button @state @disabled @interaction
  Cenário: Button em disabled não responde a cliques
    Dado que o componente Button está em estado disabled
    Quando o usuário clica no botão
    Então o onClick não deve ser disparado

  @button @state @disabled @all-variants
  Esquema do Cenário: Button em disabled funciona para todas as variantes
    Dado que o componente Button é renderizado com variant="<variant>" e disabled=true
    Quando visível na página
    Então deve ter opacity de 50%
    E deve ter cursor not-allowed

    Exemplos:
      | variant      |
      | primary       |
      | secondary     |
      | ghost         |
      | destructive   |
      | inverse       |

  # ============================================================
  # ESTADO - Focus
  # RF-14: Aplicar focus ring
  # ============================================================
  @button @state @focus @a11y
  Cenário: Button em focus tem focus ring visível
    Dado que o componente Button está visível
    Quando o botão recebe focus (Tab)
    Então deve exibir focus ring com cor border-focus (#3B82F6)
    E deve ter outline de 2px

  @button @state @focus @all-variants
  Esquema do Cenário: Focus ring aparece em todas as variantes
    Dado que o componente Button é renderizado com variant="<variant>"
    Quando o botão recebe focus (Tab)
    Então deve exibir focus ring com cor border-focus

    Exemplos:
      | variant      |
      | primary      |
      | secondary    |
      | ghost        |
      | destructive  |
      | inverse      |

  # ============================================================
  # FULL WIDTH
  # RF-15: Prop fullWidth para ocupar 100% da largura
  # ============================================================
  @button @full-width @smoke
  Cenário: Button com fullWidth ocupa 100% do container
    Dado que o componente Button é renderizado com fullWidth=true
    Quando visível na página
    Então deve ter width de 100%

  @button @full-width @layout
  Cenário: Button sem fullWidth respeita width do conteúdo
    Dado que o componente Button é renderizado sem fullWidth
    Quando visível na página
    Então deve ter width baseado no conteúdo
    E não deve ocupar 100% do container

  # ============================================================
  # ACESSIBILIDADE
  # RF-16: Acessibilidade: aria-disabled, aria-busy, focus ring
  # ============================================================
  @button @a11y @keyboard
  Cenário: Button é navegável por teclado
    Dado que o componente Button está visível na página
    Quando o usuário pressiona Tab
    Então o botão deve receber focus
    E deve ser possível ativá-lo com Enter
    E deve ser possível ativá-lo com Space

  @button @a11y @aria
  Cenário: Button expõe estados corretamente para leitores de tela
    Dado que o componente Button é renderizado
    Quando exposto para leitores de tela
    Então o papel (role) deve ser "button"
    E deve ter texto acessível como nome acessível

  @button @a11y @aria
  Cenário: Button em disabled expõe estado corretamente
    Dado que o componente Button é renderizado com disabled=true
    Quando exposto para leitores de tela
    Então o atributo aria-disabled deve ser "true"

  @button @a11y @aria
  Cenário: Button em loading expõe estado corretamente
    Dado que o componente Button é renderizado com loading=true
    Quando exposto para leitores de tela
    Então o atributo aria-busy deve ser "true"
    E o atributo aria-disabled deve ser "true"

  @button @a11y @touch-target
  Cenário: Button em mobile tem touch target adequado
    Dado que o componente Button é renderizado
    Quando visualizado em dispositivo mobile (touch)
    Então deve ter área de toque mínima de 44x44px

  # ============================================================
  # PROTEÇÃO CRÍTICA - @defensive (Lei de Murphy)
  # ============================================================
  @button @defensive @double-click
  Cenário: Double-click não causa ação duplicada
    Dado que o componente Button está habilitado
    Quando o usuário clica rapidamente 3 vezes no botão
    Então a ação deve ocorrer apenas uma vez
    E não deve haver duplicação de requisições ou estados

  @button @defensive @double-click
  Cenário: Spinner aparece imediatamente ao clicar (antes de loading prop mudar)
    Dado que o componente Button está habilitado
    E o callback onClick é síncrono (retorna promise)
    Quando o usuário clica no botão
    Então deve haver proteção contra double-click nativo do browser

  @button @defensive @loading-transition
  Cenário: Transição para loading state preserva layout
    Dado que o componente Button está visível
    Quando loading muda de false para true
    Então o layout não deve saltar (no layout shift)
    E o botão deve manter dimensões similares

  @button @defensive @type-attribute
  Cenário: Button type="button" não submete formulário inadvertidamente
    Dado que o componente Button está dentro de um formulário
    Quando o botão tem type="button" (default)
    E o usuário clica no botão
    Então o formulário não deve ser submetido

  @button @defensive @type-attribute
  Cenário: Button type="submit" submete formulário
    Dado que o componente Button está dentro de um formulário
    Quando o botão tem type="submit"
    E o usuário clica no botão
    Então o formulário deve ser submetido

  @button @defensive @type-attribute
  Cenário: Button type="reset" limpa formulário
    Dado que o componente Button está dentro de um formulário com campos
    Quando o botão tem type="reset"
    E o usuário clica no botão
    Então os campos do formulário devem ser limpos

  # ============================================================
  # VARIANT + SIZE COMBINATIONS
  # ============================================================
  @button @combo @smoke
  Esquema do Cenário: Todas as combinações variant + size funcionam
    Dado que o componente Button é renderizado com variant="<variant>" e size="<size>"
    Quando visível na página
    Então deve renderizar sem erros
    E deve aplicar estilos corretos do variant
    E deve aplicar dimensões corretas do size

    Exemplos:
      | variant      | size |
      | primary      | sm   |
      | primary      | md   |
      | primary      | lg   |
      | secondary    | sm   |
      | secondary    | md   |
      | secondary    | lg   |
      | ghost        | sm   |
      | ghost        | md   |
      | ghost        | lg   |
      | destructive  | sm   |
      | destructive  | md   |
      | destructive  | lg   |
      | inverse      | sm   |
      | inverse      | md   |
      | inverse      | lg   |

  # ============================================================
  # CLASSNAME - Sobrescrita de estilos
  # ============================================================
  @button @classname
  Cenário: Button aceita className para estilos customizados
    Dado que o componente Button é renderizado com className="custom-class"
    Quando visível na página
    Então deve incluir a classe "custom-class" no elemento
    E deve manter as classes base do componente

  # ============================================================
  # DATATESTID - Identificação para testes
  # ============================================================
  @button @testid
  Cenário: Button aceita data-testid para identificação em testes
    Dado que o componente Button é renderizado com data-testid="submit-btn"
    Quando visível na página
    Então o elemento deve ter o atributo data-testid="submit-btn"
    E deve ser possível selecionar o elemento por este atributo

  # ============================================================
  # CHILDREN - Conteúdo textual
  # ============================================================
  @button @children
  Cenário: Button renderiza children como texto
    Dado que o componente Button é renderizado com children="Save Changes"
    Quando visível na página
    Então o texto "Save Changes" deve estar visível

  @button @children
  Cenário: Button aceita ReactNode como children
    Dado que o componente Button é renderizado com children contendo elementos React
    Quando visível na página
    Então os elementos React devem ser renderizados corretamente
