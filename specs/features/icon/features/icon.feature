# language: pt

@icon @design-system @pending
Funcionalidade: Icon Component - Átomo de Design System

  Como desenvolvedor
  Eu quero utilizar o componente Icon
  Para exibir ícones Lucide com tamanhos e cores consistentes

  # ===========================================
  # CONSTANTES
  # ===========================================
  #
  # ICON_SIZE_XS = 14px
  # ICON_SIZE_SM = 16px
  # ICON_SIZE_MD = 18px
  # ICON_SIZE_LG = 20px
  # ICON_SIZE_XL = 32px
  #
  # ICON_NAMES = [
  #   'layout-dashboard', 'chart-line', 'users', 'package',
  #   'file-text', 'settings', 'zap', 'chevron-up',
  #   'chevron-left', 'chevron-right', 'download', 'plus',
  #   'search', 'trending-up', 'trending-down', 'info',
  #   'x', 'credit-card', 'image'
  # ]
  #
  # DEFAULT_ICON_SIZE = 'md'
  # DEFAULT_ICON_ROLE = 'presentation'
  #
  # ===========================================

  # ------------------------------------------
  # Cenários de Renderização por Tamanho
  # ------------------------------------------

  @component @render @size
  Cenário: Icon renderiza com tamanho xs (14px)
    Dado que o componente Icon recebe name="zap" e size="xs"
    Quando o componente é renderizado
    Então o ícone zap é exibido com dimensões ICON_SIZE_XS x ICON_SIZE_XS

  @component @render @size
  Cenário: Icon renderiza com tamanho sm (16px)
    Dado que o componente Icon recebe name="plus" e size="sm"
    Quando o componente é renderizado
    Então o ícone plus é exibido com dimensões ICON_SIZE_SM x ICON_SIZE_SM

  @component @render @size
  Cenário: Icon renderiza com tamanho md (18px) - tamanho padrão
    Dado que o componente Icon recebe name="settings" sem size definido
    Quando o componente é renderizado
    Então o ícone settings é exibido com dimensões ICON_SIZE_MD x ICON_SIZE_MD
    E o tamanho aplicado é DEFAULT_ICON_SIZE

  @component @render @size
  Cenário: Icon renderiza com tamanho lg (20px)
    Dado que o componente Icon recebe name="zap" e size="lg"
    Quando o componente é renderizado
    Então o ícone zap é exibido com dimensões ICON_SIZE_LG x ICON_SIZE_LG

  @component @render @size
  Cenário: Icon renderiza com tamanho xl (32px)
    Dado que o componente Icon recebe name="image" e size="xl"
    Quando o componente é renderizado
    Então o ícone image é exibido com dimensões ICON_SIZE_XL x ICON_SIZE_XL

  # ------------------------------------------
  # Cenários de Renderização de Ícones
  # ------------------------------------------

  @component @render @icons
  Cenário: Icon renderiza ícone de navegação - layout-dashboard
    Dado que o componente Icon recebe name="layout-dashboard"
    Quando o componente é renderizado
    Então o ícone layout-dashboard é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone de navegação - chart-line
    Dado que o componente Icon recebe name="chart-line"
    Quando o componente é renderizado
    Então o ícone chart-line é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone de navegação - users
    Dado que o componente Icon recebe name="users"
    Quando o componente é renderizado
    Então o ícone users é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone de ação - download
    Dado que o componente Icon recebe name="download"
    Quando o componente é renderizado
    Então o ícone download é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone de ação - plus
    Dado que o componente Icon recebe name="plus"
    Quando o componente é renderizado
    Então o ícone plus é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone de indicacao - trending-up
    Dado que o componente Icon recebe name="trending-up"
    Quando o componente é renderizado
    Então o ícone trending-up é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone de indicacao - trending-down
    Dado que o componente Icon recebe name="trending-down"
    Quando o componente é renderizado
    Então o ícone trending-down é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone de navegação - chevron-left
    Dado que o componente Icon recebe name="chevron-left"
    Quando o componente é renderizado
    Então o ícone chevron-left é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone de navegação - chevron-right
    Dado que o componente Icon recebe name="chevron-right"
    Quando o componente é renderizado
    Então o ícone chevron-right é exibido corretamente

  @component @render @icons
  Cenário: Icon renderiza ícone dismiss - x
    Dado que o componente Icon recebe name="x"
    Quando o componente é renderizado
    Então o ícone x é exibido corretamente

  # ------------------------------------------
  # Cenários de Herança de Cor (currentColor)
  # ------------------------------------------

  @component @render @color @css
  Cenário: Icon herda cor do contexto via currentColor
    Dado que o componente Icon está dentro de um elemento pai com color="primary"
    Quando o componente Icon é renderizado
    Então o ícone utiliza a cor herdada do contexto (currentColor)

  @component @render @color @css
  Cenário: Icon aceita cor via CSS className
    Dado que o componente Icon recebe className com color customizada
    Quando o componente é renderizado
    Então o ícone utiliza a cor definida via className

  # ------------------------------------------
  # Cenários de Acessibilidade
  # ------------------------------------------

  @a11y @component
  Cenário: Icon com role presentation (padrão) não precisa de label
    Dado que o componente Icon recebe apenas name="search"
    Quando o componente é renderizado
    Então o atributo role é DEFAULT_ICON_ROLE
    E aria-label não é necessário

  @a11y @component
  Cenário: Icon standalone com aria-label
    Dado que o componente Icon é usado standalone e recebe aria-label="Buscar"
    Quando o componente é renderizado
    Então o atributo role é 'img'
    E o atributo aria-label é "Buscar"

  @a11y @component
  Cenário: Icon aceita role customizado
    Dado que o componente Icon recebe role="button"
    Quando o componente é renderizado
    Então o atributo role é 'button'

  # ------------------------------------------
  # Cenários de Integração em Componentes Pai
  # ------------------------------------------

  @component @integration
  Cenário: Icon em Button herda cor do texto
    Dado que existe um componente Button com children incluindo Icon
    Quando o Button define cor de texto
    Então o Icon dentro do Button herda a cor automaticamente

  @component @integration
  Cenário: Icon em Navigation Item exibe corretamente
    Dado que existe um componente NavItem com Icon e texto
    Quando o NavItem é renderizado
    Então o Icon está alinhado com o texto
    E ambos compartilham o mesmo alinhamento vertical

  # ------------------------------------------
  # Cenários de Suporte a Temas
  # ------------------------------------------

  @component @theme
  Cenário: Icon funciona em tema claro
    Dado que o componente Icon está em contexto de tema claro
    Quando o componente é renderizado
    Então o ícone utiliza currentColor que se adapta ao tema

  @component @theme
  Cenário: Icon funciona em tema escuro
    Dado que o componente Icon está em contexto de tema escuro
    Quando o componente é renderizado
    Então o ícone utiliza currentColor que se adapta ao tema

  # ------------------------------------------
  # Cenários de Estados
  # ------------------------------------------

  @state @disabled
  Cenário: Icon em elemento desabilitado exibe opacity reduzida
    Dado que o componente Icon está dentro de um elemento pai desabilitado
    Quando o componente é renderizado
    Então o ícone herda opacity 50% do elemento pai

  @state @hover
  Cenário: Icon em elemento com hover herda comportamento
    Dado que o componente Icon está dentro de um elemento com hover effect
    Quando o hover é ativado
    Então o ícone herda o comportamento de hover do elemento pai
