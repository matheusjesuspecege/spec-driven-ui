> Neste artigo, mostro um experimento bem-sucedido de sincronização bidirecional entre Design e Código, mantendo os artefatos sincronizados usando modelos de IA gratuitos e open-source como parceiro de Pair Programming. 

## Fluxo de desenvolvimento bidirecional entre Design x Código

No [meu último experimento](https://github.com/mgomesdev/spec-driven-ui/tree/02-page_home) testei a geração de interfaces pixel-perfect utilizando [Zero-Shot prompting](https://www.promptingguide.ai/pt/techniques/zeroshot) e técnicas [RAG](https://cloud.google.com/use-cases/retrieval-augmented-generation?hl=pt-BR), funcionou perfeitamente e isso abriu minha mente para muitas outras possibilidades.

Com o avanço dos meus estudos, descobri novas técnicas e padrôes consolidados que permitem integrar a IA no meu fluxo de trabalho atual e automatizar muitas tarefas que antes era inviável de se fazer.

Nesta série de artigos irei compartilhar meus experimentos de geração de código seguindo os padrôes e especificações do projeto e da equipe, de forma intencional e controlada, além de manter o fluxo de design x código totalmente sincronizado bidirecionalmente, permitindo o desenvolvedor enviar código para o designer, e o designer modificar e enviar exatamente o que foi 'desenhado' para o código, mantendo os padrôes do projeto totalmente sincronizado e automatizado. 

Tudo isso utilizando ferramentas open-source com custo zero, somente com a minha criatividade e experiência.

Neste artigo foco exclusivamente no resultado final, omitindo intencionalmente detalhes de implementação. esses detalhes irei publicar nas próximas semanas para facilitar a compreensão e a ideia por trás do resultado. 

> **Repositório**: https://github.com/mgomesdev/spec-driven-ui

---

**Neste artigo**:


## Visao Geral do Projeto

### Projeto de Exemplo

O [Pencil](https://www.pencil.dev/) fornce alguns projetos de exemplo por padrão, e para fins de exemplo irei utilizar o **Dashboard**, mas poderia ser qualquer projeto de sua preferência.

![Projeto de Exemplo](/readme/projeto-exemplo.png)
> Projeto simples de exemplo com Nextjs + Playwright. Para não extender muito este artigo, irei codar apenas o **sidebar**, e explicar como avançar por conta própria.

### Stack

> Utilizei ferramentas totalmente gratis e open source.

- **Libs e Frameworks:**: React/NextJS, TypeScript, Playwright, husky/pre-commit.
- **Agente/LLM**: [opencode](https://opencode.ai/) e [Big Pickle](https://opencode.ai/docs/zen#pre%C3%A7os)

> Para mais detalhes leia o arquivo **AGENTS.md** que está na raiz do projeto.

### Metodologias

- **Spec-driven development**:para mais detalhes sobre arquitetura, funcionamento dos subagentes e tudo relacionado ao projeto, acesse a pasta **specs/docs/** e a pasta **.opencode/agents/**.
- **Extreme programming**: apliquei [extreme programming](https://kentbeck.com/) em todo o processo, utilizando a IA como parceiro de [pair programming](https://martinfowler.com/articles/on-pair-programming.html), seguindo todo o ritual dessa metodologia ágil.
- **Atomic design**: usei o [atomic design](https://atomicdesign.bradfrost.com/) no core deste experimento, acredito que ela se encaixa perfeitamente nesse cenário. além de ser a minha forma preferida de pensar e trabalhar em projetos frontend.
- **BDD (Behavior Driven-development)**: usei BDD para geração dos cenários de testes e servir de base para a aplicação do TDD.
> Para mais detalhes leia o arquivo **AGENTS.md** que está na raiz do projeto.
- **Ralph Wiggun**: Adaptei o ralph loop no subagent **implement-tasks** para o meu cenário mais enxuto e supervisionado.

### Referencias

Utilizei muitas referencias do github [spec-kit](https://github.com/github/spec-kit) e [ralph loop](https://github.com/snarktank/ralph), entendo que são soluções muito boas mas são muito verbosas, entendi o funcionamento e adaptei a ideia para meu cenário mais enxuto. 

## Context Enginner

### Alucinacao

As **LLMS** atuais, são modelos pré-treinados com milhares de informações da internet de todos os tipos (boas e ruins), e possui mecanismos especificos de funcionamento e calculo para te entregar a resposta que matematicamente é mais próxima daquilo que você solicitou baseado nos dados que ela possui.

Um dos principais problemas nas **LLMS** atuais é o limite da janela de contexto. Quando você solicita para a IA fornecendo informações genéricas e interpretativas, a IA faz uma interpretação do que ela **achou** que você está precisando, e na maioria das vezes a resposta é totalmente errada, esse processo é chamado de **Alucinação**.

Existem algumas técnicas para induzir a IA para priorizar dados e informações específicas que você deseja que ela responda, fazendo com que ela utilize toda a sua capacidade matematica e dados ao qual ela foi treinada, para te entregar a melhor resposta para o seu contexto específico. Esse processo é chamado de [RAG (Retrieval Augmented Generation)](https://cloud.google.com/use-cases/retrieval-augmented-generation?hl=pt-BR).

### RAG e Prompt Enginner

O RAG é um processo que possibilita a comunicação direta com a arquitetura das **LLMS** e ajuda a melhorar as respostas da IA, é utilizado técnicas de [Prompt Enginner](https://www.promptingguide.ai/pt) para realizar a **recuperação e pré-processamento** informando dados, referencias, links, e informações relevantes diretamente para o **LLM** que irá ter **atenção** máxima ao material fornecido, realizando **pré-processamentos**, **tokenização**, **embedding**  para gerar respostas mais precisas, e focadas no objetivo.

## Fluxo de trabalho

O **extreme programming** possui 4 principais valores (comunicação, simplicidade, feedback, coragem) sendo o respeito o wrapper de todos eles.

![Os 4 valores do xp - a base de tudo](/readme/4-valores-xp.jpg)

**Isso se encaixa perfeitamente no fluxo (RPI)**:
- **Comunicação:** aqui entra o agente **us-to-research**.
- **Simplicidade:** aqui entra o agente **research-to-plan**.
- **Feedback:** aqui entra o GATE (tdd, verify-patterns, typecheck + lint, pre-commit)
- **Coragem**: aqui entra a pipeline de ci, que verifica se os padroes, testes e as especificações estão consistentes entre o código e a spec.


![Fluxo de trabalho](/readme/fluxo-trabalho.png)

> Para facilitar o processo, criei **14 subagents especializados** responsáveis para cada uma das etapas do projeto.  

![Os 14 Subagentes de IA (Mapa completo de quem faz o que, quando acionar cada agente)](/readme/subagents.png)
> Irei entrar em mais detalhes sobre cada um dos subagents nos proximos artigos.

### O que o usuario precisa ?

No dia a dia, temos um backlog do produto e o **Product Owner** atribui **User Stories** para que possamos desenvolver. Em muitos casos as US são escritas de forma genérica a nível de produto e não a nível de desenvolvimento.

- **us-to-research**: esse agente recebe como input a US escrita pelo PO, e faz perguntas com o objetivo de especificar e converter a US a nivel de produto para nível de desenvolvimento.

![Research.md](/readme/research.png)

> Ao final do processo é gerado um arquivo **research.md** que o dev revisa e refina junto com a equipe até estar aprovado.

### Como vamos fazer?

Após a revisão do research.md, partimos para a definição do que precisaremos de recursos, interfacesm contratos, serviços, apis, onde será armazenado o código e toda a estrutura necessária para desenvolvimento.

![Plan.md](/readme/plan.png)

> Plan.md gerado apartir do research.md

### O que testar?

Esta é a fase de preparação dos testes que serão usados na implementação, os cenários são gerados apartir do **plan.md**, as tarefas são organizadas no formato **Gherkin (bdd)** e são transformadas em cenários de teste para desenvolvimento usando **tdd**.

![BDD](/readme/bdd.png)
> BDD (.feature) gerado apartir de plan.md

![TDD](/readme/tdd.png)
> Testes (gerados apartir do bdd) + dicas de como implementar com referencias

Neste meu cenário estou utilizando **bottom-up** para implementação, portanto preciso gerar todos os atomos que **Sidebar** depende para ser implementado. 


### Paralelismo e worktrees

Codificar um componente por vez de maneira sequencial é muito chato, para isso, existe o agente **worktree-mapper**, que analisa o plano e retorna um relatório mostrando quais tarefas podem ser executadas em paralelo (independente). 

Com isso posso delegar para subagentes especializados para implementar as tarefas em suas branchs separadas através do [git worktree](https://git-scm.com/docs/git-worktree) e o subagent **implement-tasks**.

![Diagrama de dependencias](/readme/dependencias-sidebar.png)

> Diagrama mostrando as tarefas que podem ser executadas em paralelo
