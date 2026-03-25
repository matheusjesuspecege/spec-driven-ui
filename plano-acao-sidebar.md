# Plano de ação sidebar


## Design-system

**Implement**
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.

---

## Button

**Research -> Plan**
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.


## Icon

**Research -> Plan**
- Criar e atualizar o research.md
- Criar e atualizar o plan.md
- Criar e atualizar o bdd
- Gerar os testes e plano de implementação apartir do bdd
- Limpar o código e anotar os conhecimentos
- Atualizar AGENTS.md
- Destilar conhecimento global e remover o que não precisa.
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.

---

## NavItem

**Research -> Plan**
- Criar e atualizar o research.md
- Criar e atualizar o plan.md
- Criar e atualizar o bdd
- Gerar os testes e plano de implementação apartir do bdd
- Limpar o código e anotar os conhecimentos
- Atualizar AGENTS.md
- Destilar conhecimento global e remover o que não precisa.
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.

---

## Avatar

**Research -> Plan**
- Criar e atualizar o research.md
- Criar e atualizar o plan.md
- Criar e atualizar o bdd
- Gerar os testes e plano de implementação apartir do bdd
- Limpar o código e anotar os conhecimentos
- Atualizar AGENTS.md
- Destilar conhecimento global e remover o que não precisa.
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.

---

## Logo

**Research -> Plan**
- Criar e atualizar o research.md
- Criar e atualizar o plan.md
- Criar e atualizar o bdd
- Gerar os testes e plano de implementação apartir do bdd
- Limpar o código e anotar os conhecimentos
- Atualizar AGENTS.md
- Destilar conhecimento global e remover o que não precisa.
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.

---

## UpgradeBox

**Research -> Plan**
- Criar e atualizar o research.md
- Criar e atualizar o plan.md
- Criar e atualizar o bdd
- Gerar os testes e plano de implementação apartir do bdd
- Limpar o código e anotar os conhecimentos
- Atualizar AGENTS.md
- Destilar conhecimento global e remover o que não precisa.
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.

---

## NavList

**Research -> Plan**
- Criar e atualizar o research.md
- Criar e atualizar o plan.md
- Criar e atualizar o bdd
- Gerar os testes e plano de implementação apartir do bdd
- Limpar o código e anotar os conhecimentos
- Atualizar AGENTS.md
- Destilar conhecimento global e remover o que não precisa.
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.

---

## AccountSection

**Research -> Plan**
- Criar e atualizar o research.md
- Criar e atualizar o plan.md
- Criar e atualizar o bdd
- Gerar os testes e plano de implementação apartir do bdd
- Limpar o código e anotar os conhecimentos
- Atualizar AGENTS.md
- Destilar conhecimento global e remover o que não precisa.
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.

---

## Sidebar

**Research -> Plan**
- Criar e atualizar o research.md
- Criar e atualizar o plan.md
- Criar e atualizar o bdd
- Gerar os testes e plano de implementação apartir do bdd
- Limpar o código e anotar os conhecimentos
- Atualizar AGENTS.md
- Destilar conhecimento global e remover o que não precisa.
- Atualizar prints no readme do artigo

**Implement:** red -> green -> refactor
- Fazer os testes passarem
- Aprimorar o fluxo de sincronismo (sempre ancorado nas spec)
- Destilar os aprenzados globalmente
- Documentar processo no readme para o artigo.


## Worktree

- Analisar quais tarefas podem ser executadas nas worktress e tirar print do terminal e colar no readme do artigo

## Diagrama de dependencias

                    [globals.css]
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│  FASE 1: ATOMS (podem ser paralelos)               │
│  ┌───────┐ ┌───────┐ ┌────────┐ ┌───────┐          │
│  │ icon  │ │avatar │ │ button │ │logo   │          │
│  └───┬───┘ └───────┘ └───┬────┘ └───┬────┘          │
│      │                   │         │                │
│      │                   ▼         │                │
│      │            ┌────────────┐    │                │
│      └───────────►│  nav-item  │◄───┘                │
│                   └────────────┘                     │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│  FASE 2: MOLECULES (podem ser paralelos)           │
│  ┌───────────┐ ┌───────────┐ ┌────────────────┐    │
│  │upgrade-box│ │  nav-list │ │account-section │    │
│  └───────────┘ └───────────┘ └────────────────┘    │
└─────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│  FASE 3: ORGANISM (sequencial)                      │
│  ┌───────────┐                                      │
│  │  sidebar  │                                      │
│  └───────────┘                                      │
└─────────────────────────────────────────────────────┘
