# Avatar

## 1. Visão Geral
Componente de avatar com iniciais do usuário exibido em círculo. Usado para representar usuários em contextos onde foto não está disponível.

## 2. Objetivos
- Exibir iniciais do usuário em formato circular
- Suportar diferentes tamanhos (small, medium, large)
- Ser reutilizável em diferentes contextos da aplicação

## 3. Contexto de Integração com Backend
- **Tipo:** Componente UI puro (sem integração)
- **Status:** Novo componente
- **Autenticação:** N/A

## 4. Histórias de Usuário

### US-001: Avatar com iniciais
**Descrição:** Como usuário, eu quero ver as iniciais do usuário em um avatar circular quando não houver foto de perfil.
**Tela/Componente afetado:** Avatar component
**Critérios de aceitação:**
- [ ] Avatar renderiza círculo com border-radius 50%
- [ ] Texto centralizado dentro do círculo
- [ ] Tamanho configurável via props
- [ ] Cores do background e texto customizáveis

## 5. Dependências (Atomic Design)
| Componente | Tipo | Status | Caminho |
|------------|------|--------|---------|
| - | - | - | Componente atômico, sem dependências |

## 6. Requisitos Funcionais
- RF-01: Deve exibir string de iniciais (2 caracteres)
- RF-02: Deve permitir prop de tamanho (width/height)
- RF-03: Deve permitir cor de fundo customizável
- RF-04: Deve permitir cor do texto customizável

## 7. Requisitos Não-Funcionais
- RNF-01: Responsivo - suporta diferentes tamanhos
- RNF-02: Texto centralizado vertical e horizontalmente
- RNF-03: Acessível - suporta aria-label

## 8. Fora do Escopo
- Upload de foto de perfil
- Edição de avatar
- Estados de hover/active

## 9. Referências Visuais
- Design Pencil ID: sYLr4
- Especificações:
  - Tamanho: 36x36px
  - cornerRadius: 18 (50% de 36)
  - Background: #2A2A2E
  - Texto: "MR", #8B8B90, font-family: Inter, font-size: 12px, font-weight: 600

## 10. Métricas de Sucesso
- Renderização correta em 100% dos usos
- Centralização perfeita do texto

## 11. Questões em Aberto
- [ ] Quais variantes de tamanho são necessárias? (sm: 24, md: 36, lg: 48, xl: 64)
- [ ] Quais cores de background estão definidas no design system?
