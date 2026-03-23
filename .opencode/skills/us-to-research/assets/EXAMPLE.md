# Exemplo: Conversão de US para research.md

## Input (do Product Owner)

```
Nome: dashboard-admin
Texto: Preciso de um dashboard administrativo moderno com sidebar de navegação,
header com breadcrumbs e ações, área de conteúdo com cards de métricas,
tabela de dados, gráficos e galeria de itens.
```

## Output (research.md gerado)

```markdown
# dashboard-admin

## 1. Visão Geral

Dashboard administrativo moderno para gestão de usuários e métricas de negócio.
Sidebar de navegação fixa à esquerda, header com breadcrumbs e ações no topo,
e área de conteúdo principal com cards de métricas, tabela de dados e gráficos.

## 2. Objetivos

- Permitir navegação rápida entre diferentes áreas do sistema
- Exibir métricas-chave do negócio em cards visuais
- Permitir listagem e gestão de itens em tabela com paginação
- Visualizar dados em gráficos interativos
- Exibir galeria de itens com thumbnails

## 3. Contexto de Integração com Backend

- **Tipo:** REST API
- **Status:** A ser criado em paralelo pelo time de backend
- **Contratos:** a definir no plan
- **Autenticação:** JWT token

## 4. Histórias de Usuário

### US-001: Navegação via Sidebar

**Descrição:** Como usuário autenticado, eu quero navegar entre as áreas do sistema via sidebar para acessar rapidamente diferentes funcionalidades.

**Tela/Componente afetado:** Sidebar (organism)

**Critérios de aceitação:**
- [ ] Sidebar permanece fixa à esquerda em todas as telas
- [ ] Itens de menu são clicáveis e redirecionam para a página correta
- [ ] Item ativo recebe destaque visual
- [ ] Sidebar é colapsável em telas menores (mobile)
- [ ] Análise estática passa com zero erros

### US-002: Visualização de Métricas em Cards

**Descrição:** Como usuário, eu quero visualizar métricas-chave do negócio em cards para acompanhar o desempenho rapidamente.

**Tela/Componente afetado:** Dashboard (page), MetricCard (molecule)

**Critérios de aceitação:**
- [ ] Cards exibem valor numérico grande, label e variação percentual
- [ ] Cards variam de cor conforme o estado (positivo/negativo)
- [ ] Cards são responsivos (4 colunas desktop, 2 tablet, 1 mobile)
- [ ] Sub-agent de testes cobre componente
- [ ] Análise estática passa com zero erros

### US-003: Listagem de Dados em Tabela

**Descrição:** Como usuário, eu quero listar itens em uma tabela com ordenação e paginação para encontrar informações rapidamente.

**Tela/Componente afetado:** DataTable (organism)

**Critérios de aceitação:**
- [ ] Tabela exibe colunas configuráveis
- [ ] Ordenação por clique no header da coluna
- [ ] Paginação com 10/25/50 itens por página
- [ ] Estados de loading e vazio handled corretamente
- [ ] Sub-agent de testes cobre componente
- [ ] Análise estática passa com zero erros

## 5. Dependências (Atomic Design)

| Componente | Tipo | Status | Caminho |
|------------|------|--------|---------|
| Button | atom | ✅ Implementado | specs/components/atoms/button/ |
| Icon | atom | ✅ Implementado | specs/components/atoms/icon/ |
| Card | molecule | ✅ Implementado | specs/components/molecules/card/ |
| Badge | atom | ✅ Implementado | specs/components/atoms/badge/ |
| Sidebar | organism | ⚠️ Parcial | specs/components/organisms/sidebar/ |
| DataTable | organism | ❌ Não implementado | - |

**Status:** ⚠️ PARCIALMENTE BLOQUEADA - Sidebar parcial, DataTable não implementado

> ⚠️ Esta feature não pode ter *.feature gerado até que Sidebar e DataTable estejam ✅ implementados.

## 6. Requisitos Funcionais

- RF-01: O sistema deve exibir sidebar com itens de navegação
- RF-02: O sistema deve exibir header com breadcrumbs e ações
- RF-03: O sistema deve exibir cards de métricas com valores dinâmicos
- RF-04: O sistema deve permitir ordenação de colunas na tabela
- RF-05: O sistema deve implementar paginação da tabela
- RF-06: O sistema deve exibir gráficos com dados mockados
- RF-07: O sistema deve exibir galeria de itens com thumbnails
- RF-08: Em caso de erro de API, exibir toast de erro

## 7. Requisitos Não-Funcionais

- RNF-01: Componentes devem ser responsivos (mobile-first)
- RNF-02: Estados de loading devem ser exibidos durante chamadas à API
- RNF-03: Erros de validação devem aparecer inline nos campos
- RNF-04: Sidebar deve suportar expand/collapse
- RNF-05: Tabela deve suportar pelo menos 1000 registros sem lag

## 8. Fora do Escopo

- Não inclui autenticação de usuários (ya existente)
- Não inclui exportação de dados (PDF/Excel)
- Não inclui filtros avançados na tabela
- Não inclui gráficos em tempo real (websockets)

## 9. Referências Visuais

- Link Figma: https://figma.com/example (não disponível)
- Componentes existentes que podem ser reutilizados: Button, Card, Icon, Badge

## 10. Métricas de Sucesso

- Usuário consegue acessar todas as áreas do sistema via sidebar em menos de 2 cliques
- Usuário consegue visualizar métricas em menos de 1 segundo após carregamento
- Usuário consegue ordenar e paginar tabela sem percepcão de lag

## 11. Questões em Aberto

- [ ] Qual API fornecera os dados das métricas?
- [ ] Quais são os valores iniciais para os gráficos?
- [ ] A galeria terá quantos itens por linha?
```

## Resumo Apresentado ao Usuário

```
✅ research.md gerado em specs/features/dashboard-admin/research.md

Resumo:
- 3 histórias de usuário
- Principais telas/componentes: Sidebar, MetricCard, DataTable, Charts, Gallery
- Integração: REST API (a ser criada)
- Dependências: Button ✅, Icon ✅, Card ✅, Badge ✅, Sidebar ⚠️, DataTable ❌

⚠️ Status: BLOQUEADO
- Sidebar está parcialmente implementado (sem *.feature completo)
- DataTable não foi implementado ainda

Para prosseguir, primeiro implementar:
- [ ] Sidebar (organism) - precisa de *.feature completo
- [ ] DataTable (organism) - precisa ser criado do zero

Sugestão de Próximos Passos:
- Implementar Sidebar e DataTable primeiro, depois revisitar esta feature
```