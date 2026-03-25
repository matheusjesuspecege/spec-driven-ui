@desktop @avatar @atom @component
Funcionalidade: Avatar com iniciais
  Como usuário do sistema
  Eu quero ver as iniciais do usuário em um avatar circular
  Para que eu possa identificar o usuário quando não houver foto de perfil

  # ═══════════════════════════════════════════════════════════
  # PENCIL_IDS (Source: research.md)
  # sYLr4: Avatar component
  # ═══════════════════════════════════════════════════════════
                **pencil_id:** "sYLr4"

        @render @smoke @pending
        Cenário: Avatar renderiza círculo com border-radius 50%
            Dado que o componente Avatar foi renderizado com iniciais "MR"
             Quando a página for carregada
             Então o avatar deve ser um círculo perfeito com border-radius 50%

        @render @smoke @pending
        Cenário: Avatar exibe as iniciais fornecidas
            Dado que o componente Avatar foi renderizado com iniciais "MR"
             Quando a página for carregada
             Então as iniciais "MR" devem ser exibidas no centro do círculo

        @render @smoke @pending
        Cenário: Avatar usa tamanho padrão quando não especificado
            Dado que o componente Avatar foi renderizado sem prop de tamanho
             Quando a página for carregada
             Então o avatar deve ter tamanho 36x36px

        @render @smoke @pending
        Cenário: Avatar usa cores padrão quando não especificadas
            Dado que o componente Avatar foi renderizado sem props de cores
             Quando a página for carregada
             Então o fundo deve ser #2A2A2E
              E a cor do texto deve ser #8B8B90

        @state @sm @smoke @pending
        Cenário: Avatar small renderiza com tamanho correto
            Dado que o componente Avatar foi renderizado com size="sm"
             Quando a página for carregada
             Então o avatar deve ter tamanho 24x24px

        @state @md @smoke @pending
        Cenário: Avatar medium renderiza com tamanho correto
            Dado que o componente Avatar foi renderizado com size="md"
             Quando a página for carregada
             Então o avatar deve ter tamanho 36x36px

        @state @lg @smoke @pending
        Cenário: Avatar large renderiza com tamanho correto
            Dado que o componente Avatar foi renderizado com size="lg"
             Quando a página for carregada
             Então o avatar deve ter tamanho 48x48px

        @state @xl @smoke @pending
        Cenário: Avatar extra-large renderiza com tamanho correto
            Dado que o componente Avatar foi renderizado com size="xl"
             Quando a página for carregada
             Então o avatar deve ter tamanho 64x64px

        @state @smoke @pending
        Cenário: Texto centralizado verticalmente
            Dado que o componente Avatar foi renderizado com iniciais "AB"
             Quando a página for carregada
             Então o texto deve estar centralizado verticalmente

        @state @smoke @pending
        Cenário: Texto centralizado horizontalmente
            Dado que o componente Avatar foi renderizado com iniciais "AB"
             Quando a página for carregada
             Então o texto deve estar centralizado horizontalmente

        @interaction @pending
        Cenário: Avatar aceita cor de fundo customizada
            Dado que o componente Avatar foi renderizado com backgroundColor="#FF0000"
             Quando a página for carregada
             Então o fundo do avatar deve ser #FF0000

        @interaction @pending
        Cenário: Avatar aceita cor do texto customizada
            Dado que o componente Avatar foi renderizado com textColor="#FFFFFF"
             Quando a página for carregada
             Então a cor do texto deve ser #FFFFFF

        @a11y @smoke @pending
        Cenário: Avatar renderiza com aria-label quando fornecido
            Dado que o componente Avatar foi renderizado com aria-label="Foto de João Silva"
             Quando a página for carregada
             Então o elemento deve ter attribute aria-label igual a "Foto de João Silva"

        @a11y @smoke @pending
        Cenário: Avatar usa role="img" para acessibilidade
            Dado que o componente Avatar foi renderizado com iniciais "JD"
             Quando a página for carregada
             Então o elemento deve ter role="img"
