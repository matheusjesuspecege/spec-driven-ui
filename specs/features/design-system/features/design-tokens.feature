@design-system @tokens @global
Funcionalidade: Design Tokens Globais
  Como desenvolvedor
  Quero usar tokens de design consistentes
  Para garantir coerência visual em toda a aplicação

  # ============================================
  # CORES - BACKGROUND
  # Source: pencil-demo.pen
  # ============================================
  @tokens.colors @tokens.colors.bg
  Esquema do Cenário: Tokens de cor de background
    Dado que o token <token_name> está definido
    Quando eu aplicar a cor em um elemento
    Então o elemento deve ter a cor <hex_value>

    Exemplos:
      | token_name           | hex_value |
      | bg-base              | #0a0a0b   |
      | bg-subtle            | #111113   |
      | bg-elevated          | #141417   |
      | bg-muted             | #1a1a1d   |
      | bg-input             | #1f1f23   |
      | bg-overlay           | #2a2a2e   |

  # ============================================
  # CORES - TEXTO
  # ============================================
  @tokens.colors @tokens.colors.text
  Esquema do Cenário: Tokens de cor de texto
    Dado que o token <token_name> está definido
    Quando eu aplicar a cor em um texto
    Então o texto deve ter a cor <hex_value>

    Exemplos:
      | token_name           | hex_value |
      | text-primary         | #ffffff   |
      | text-secondary       | #ffffffcc |
      | text-muted           | #adadb0   |
      | text-subtle          | #8b8b90   |
      | text-disabled        | #6b6b70   |
      | text-inverse         | #4a4a4e   |

  # ============================================
  # CORES - SEMÂNTICAS
  # ============================================
  @tokens.colors @tokens.colors.semantic
  Cenário: Tokens de cor primária
    Dado que o token "primary" está definido como "#ff5c00"
    E o token "primary-hover" está definido como "#ff7a33"
    E o token "primary-muted" está definido como "#ff5c0020"
    Quando eu aplicar essas cores
    Então todas devem estar disponíveis no tema

  Cenário: Tokens de cor de sucesso
    Dado que o token "success" está definido como "#22c55e"
    E o token "success-muted" está definido como "#22c55e20"
    Quando eu aplicar essas cores
    Então todas devem estar disponíveis no tema

  Cenário: Tokens de cor de erro
    Dado que o token "error" está definido como "#ef4444"
    E o token "error-muted" está definido como "#ef444420"
    Quando eu aplicar essas cores
    Então todas devem estar disponíveis no tema

  # ============================================
  # CORES - BORDAS
  # ============================================
  @tokens.colors @tokens.colors.border
  Cenário: Tokens de cor de borda
    Dado que os tokens de borda estão definidos:
      | token_name      | hex_value |
      | border          | #2a2a2e   |
      | border-subtle   | #1f1f23   |
      | border-focus    | #ff5c00   |
    Então todas as cores de borda devem estar disponíveis

  # ============================================
  # TIPOGRAFIA - FONT SIZES
  # ============================================
  @tokens.typography @tokens.typography.font-size
  Esquema do Cenário: Tokens de tamanho de fonte
    Dado que o token <token_name> está definido
    Quando eu aplicar o tamanho de fonte
    Então o elemento deve ter o tamanho <size>

    Exemplos:
      | token_name | size  |
      | text-hero  | 38px  |
      | text-h1    | 32px  |
      | text-lg    | 18px  |
      | text-base  | 14px  |
      | text-sm    | 13px  |
      | text-xs    | 12px  |
      | text-2xs   | 11px  |
      | text-3xs   | 10px  |

  # ============================================
  # ESPAÇAMENTO
  # ============================================
  @tokens.spacing
  Esquema do Cenário: Tokens de espaçamento
    Dado que o token <token_name> está definido
    Quando eu aplicar o espaçamento
    Então o elemento deve ter o valor <size>

    Exemplos:
      | token_name    | size  |
      | spacing-0     | 0px   |
      | spacing-1     | 2px   |
      | spacing-2     | 4px   |
      | spacing-3     | 6px   |
      | spacing-4     | 8px   |
      | spacing-5     | 10px  |
      | spacing-6     | 12px  |
      | spacing-7     | 14px  |
      | spacing-8     | 16px  |
      | spacing-10    | 20px  |
      | spacing-14    | 28px  |
      | spacing-16    | 32px  |

  # ============================================
  # BORDER RADIUS
  # ============================================
  @tokens.border-radius
  Esquema do Cenário: Tokens de border-radius
    Dado que o token <token_name> está definido
    Quando eu aplicar o border-radius
    Então o elemento deve ter o valor <size>

    Exemplos:
      | token_name   | size   |
      | radius-none  | 0px    |
      | radius-sm    | 4px    |
      | radius-md    | 6px    |
      | radius-lg    | 8px    |
      | radius-xl    | 10px   |
      | radius-2xl   | 12px   |
      | radius-3xl   | 16px   |
      | radius-4xl   | 18px   |
      | radius-full  | 9999px |
