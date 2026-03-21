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

> Para mais detalhes leia o arquivo **AGENTS.md** que está na raiz do projeto.

## Context Enginner

### Alucinacao

As **LLMS** atuais, são modelos pré-treinados com milhares de informações da internet de todos os tipos (boas e ruins), e possui mecanismos especificos de funcionamento e calculo para te entregar a resposta que matematicamente é mais próxima daquilo que você solicitou baseado nos dados que ela possui.

Um dos principais problemas nas **LLMS** atuais é o limite da janela de contexto. Quando você solicita para a IA fornecendo informações genéricas e interpretativas, a IA faz uma interpretação do que ela **achou** que você está precisando, e na maioria das vezes a resposta é totalmente errada, esse processo é chamado de **Alucinação**.

Existem algumas técnicas para induzir a IA para priorizar dados e informações específicas que você deseja que ela responda, fazendo com que ela utilize toda a sua capacidade matematica e dados ao qual ela foi treinada, para te entregar a melhor resposta para o seu contexto específico. Esse processo é chamado de [RAG (Retrieval Augmented Generation)](https://cloud.google.com/use-cases/retrieval-augmented-generation?hl=pt-BR).

### RAG e Prompt Enginner

O RAG é um processo que possibilita a comunicação direta com a arquitetura das **LLMS** e ajuda a melhorar as respostas da IA, é utilizado técnicas de [Prompt Enginner](https://www.promptingguide.ai/pt) para realizar a **recuperação e pré-processamento** informando dados, referencias, links, e informações relevantes diretamente para o **LLM** que irá ter **atenção** máxima ao material fornecido, realizando **pré-processamentos**, **tokenização**, **embedding**  para gerar respostas mais precisas, e focadas no objetivo.

## Arquitetura

Para mais detalhes da arquitetura do projeto, função dos arquivos, acesse a pasta **specs/docs/** está tudo documentado no markdown.