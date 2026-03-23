---
name: bdd-generator
description: "Gera arquivos *.feature (Gherkin) a partir de research.md e plan.md. Converte User Stories em cenários BDD executáveis com Given-When-Then."
mode: subagent
temperature: 0.1
tools:
  write: true
  edit: true
  read: true
  pencil_open_document: true
  pencil_batch_get: true
  pencil_get_editor_state: true
  glob: true
permission:
  edit: allow
---

## Como Usar Este Agent

```
@bdd-generator feature=[nome-da-feature]
```

## Visão Geral

Gera cenários BDD em formato Gherkin a partir de:
- `specs/features/[feature]/research.md`
- `specs/features/[feature]/plan.md`

Output:
- `specs/features/[feature]/features/[feature].feature`

## Pré-requisitos

1. research.md deve existir e estar aprovado
2. plan.md deve existir (artefatos de alto nível)
3. Feature folder deve existir

## Passos de Execução

### Etapa 0: Verificar .feature existente

Antes de gerar, verificar se o .feature já existe:

1. Verificar se existe `specs/features/${feature}/features/${feature}.feature`
2. Se existir:
   - Perguntar ao usuário: "O arquivo ${feature}.feature já existe. Deseja sobrescrever?"
   - Se NÃO: manter existente, não fazer alterações
   - Se SIM: prosseguir com geração (sobrescrever)
3. Se não existir: prosseguir com geração normalmente

**Importante:** Esta verificação se aplica APENAS para features normais.
Para design-system, a verificação é por componente individual (atoms/*.feature, etc).

### Etapa 1: Verificar Pré-requisitos

```typescript
// Verificar se research.md existe
const researchPath = `specs/features/${feature}/research.md`;
if (!await fileExists(researchPath)) {
  return { error: 'research.md não encontrado. Execute @research-to-plan primeiro.' };
}

// Verificar se plan.md existe
const planPath = `specs/features/${feature}/plan.md`;
if (!await fileExists(planPath)) {
  return { error: 'plan.md não encontrado. Execute @research-to-plan primeiro.' };
}
```

### Passo 2: Ler research.md

Extrair:
- User Stories
- Critérios de aceitação
- Contextos (desktop/mobile/a11y)

```typescript
const research = await readFile(researchPath);

// Extrair User Stories
const userStories = extractUserStories(research);

// Formato esperado:
// ### US-001: Título
// **Descrição:** Como... eu quero... para que...
// **Critérios de aceitação:**
// - AC1
// - AC2
```

### Passo 3: Ler plan.md

Extrair:
- Artefatos de alto nível
- Tipos/interfaces
- Estrutura de arquivos

```typescript
const plan = await readFile(planPath);

// Extrair artefatos
const artifacts = extractArtifacts(plan);

// Extrair tipos
const types = extractTypes(plan);
```

### Passo 4: Identificar Contextos e Tags

Mapear contextos dos critérios de aceitação:

```typescript
const STATUS_TAGS = {
  pending: '@pending',
  inProgress: '@in-progress',
  done: '@done',
  blocked: '@blocked',
  bug: '@bug',
};

const CONTEXT_TAGS = {
  desktop: [
    /(?:desktop|≥768px| desktop|1280|maior que 768)/i,
    /menu horizontal/i,
  ],
  mobile: [
    /(?:mobile|<768px| celular|375)/i,
    /hamburger/i,
    /overlay/i,
  ],
  tablet: [
    /tablet|768px|1024px/i,
  ],
  a11y: [
    /a11y|acessibilidade|tab|teclado|leitor de tela/i,
    /focus|foco|navegação por teclado/i,
  ],
};

const SCENARIO_TYPE_TAGS = {
  rule: [
    /regra|validação|obrigatório|estoque/i,
    /não.*pode|não.*permitido|bloqueia/i,
    /crítico|importante|i mpportant/i,
  ],
  defensive: [
    /double.*click|clique.*rápido|proteção/i,
    /prevenir|evitar.*duplic|segurança/i,
    /timeout|repetir|persiste/i,
  ],
  happy: [
    /sucesso|funciona|正常/i,
    /fluxo.*normal|happy.*path/i,
  ],
  state: [
    /loading|estado|erro|sucesso/i,
    /feedback|mensagem|spinner/i,
  ],
  component: [
    /componente|renderiza|exibe/i,
    /elemento|botão|campo/i,
  ],
};
```

### Passo 5: Mapear AC para Given-When-Then

Template de mapeamento:

```typescript
const AC_TO_GHERKIN = {
  // Given (pré-condição)
  'em desktop': 'que o usuário está em desktop (≥768px)',
  'em mobile': 'que o usuário está em mobile (<768px)',
  'página carrega': 'a página carrega',
  'usuário está logado': 'que o usuário está logado',
  'formulário vazio': 'que o formulário está vazio',
  'overlay aberto': 'que o overlay está aberto',

  // When (ação)
  'clica': 'o usuário clica no',
  'digita': 'o usuário digita no campo',
  'pressiona': 'o usuário pressiona',
  'seleciona': 'o usuário seleciona',
  'submete': 'o usuário submete o formulário',

  // Then (resultado)
  'está visível': 'está visível',
  'está oculto': 'está oculto',
  'redireciona para': 'a URL muda para',
  'contador é': 'o contador é',
  'exibe': 'exibe',
  'aparece': 'aparece',
  'fecha': 'fecha',
};
```

### Passo 6: Identificar Constants

Extrair valores que serão placeholders:

```typescript
const CONSTANT_PATTERNS = [
  { pattern: /80px|80 pixels/i, placeholder: 'HEADER_HEIGHT' },
  { pattern: /4 itens?|quatro/i, placeholder: 'NAV_COUNT' },
  { pattern: /768px/i, placeholder: 'BREAKPOINT' },
  { pattern: /300ms|300 milissegundos/i, placeholder: 'ANIMATION_DURATION' },
  { pattern: /100%|cem por cento/i, placeholder: 'FULL_WIDTH' },
  { pattern: /375x667|mobile pequeno/i, placeholder: 'MOBILE_WIDTH' },
];
```

### Passo 7: Gerar Cenários

Para cada User Story:

```typescript
function generateScenario(us: UserStory): Scenario[] {
  const scenarios: Scenario[] = [];
  
  // 1. Cenários Happy Path (fluxo normal)
  const happyScenarios = generateHappyPath(us);
  scenarios.push(...happyScenarios);
  
  // 2. Cenários de Regras de Negócio (críticos)
  const ruleScenarios = generateRuleScenarios(us);
  scenarios.push(...ruleScenarios);
  
  // 3. Cenários de Proteção (Lei de Murphy)
  const defensiveScenarios = generateDefensiveScenarios(us);
  scenarios.push(...defensiveScenarios);
  
  // 4. Cenários de Estados (loading, erro, sucesso)
  const stateScenarios = generateStateScenarios(us);
  scenarios.push(...stateScenarios);
  
  // 5. Cenários de Componentes
  const componentScenarios = generateComponentScenarios(us);
  scenarios.push(...componentScenarios);
  
  return scenarios;
}
```

---

### Passo 7.1: Gerar Cenários Happy Path

Cenários de fluxo normal onde tudo dá certo:

```typescript
function generateHappyPath(us: UserStory): Scenario[] {
  const scenarios: Scenario[] = [];
  
  // Identificar contextos
  const contexts = identifyContexts(us.criteria);
  
  for (const context of contexts) {
    scenarios.push({
      tags: ['@pending', '@happy', `@${context}`],
      name: us.title,
      given: mapToGiven(us.criteria, context),
      when: mapToWhen(us.criteria),
      then: mapToThen(us.criteria),
    });
  }
  
  return scenarios;
}
```

---

### Passo 7.2: Gerar Cenários de Regras de Negócio (@rule)

**CRÍTICO**: Gerar para toda ação que modifica dados ou executa transação:

```typescript
const RULE_PATTERNS = {
  // Validação de campos obrigatórios
  obrigatorio: [
    /obrigatório|campo.*vazio|sem.*preencher/i,
    /não.*pode.*vazio|deve.*preencher/i,
  ],
  
  // Valor mínimo/máximo
  valorMinimo: [
    /mínimo|mínimo.*r\$|não.*pode.*zero|greater.*than.*zero/i,
    /quantidade.*positiva|valor.*maior/i,
  ],
  
  // Estoque
  estoque: [
    /estoque|disponível|quantidade.*excede/i,
    /sem.*estoque|estoque.*insuficiente/i,
  ],
  
  // Validação de negócio
  validacao: [
    /cpf.*válido|cnpj.*válido|email.*válido/i,
    /idade.*mínima|data.*válida/i,
  ],
  
  // Restrição de ação
  restricao: [
    /não.*permitido|impede|bloqueia/i,
    /acesso.*negado|operação.*inválida/i,
  ],
};

function generateRuleScenarios(us: UserStory): Scenario[] {
  const scenarios: Scenario[] = [];
  
  // Para cada critério de aceitação, verificar se há regra de negócio
  for (const ac of us.criteria) {
    if (matchesPattern(ac, RULE_PATTERNS.obrigatorio)) {
      scenarios.push({
        tags: ['@pending', '@rule', '@validation'],
        name: `${us.title} - Rejeita quando campo obrigatório vazio`,
        given: ['dado que o usuário está na página'],
        when: ['quando tenta submeter sem preencher campos obrigatórios'],
        then: ['então o sistema exibe erro de validação', 'então a ação é bloqueada'],
      });
    }
    
    if (matchesPattern(ac, RULE_PATTERNS.estoque)) {
      scenarios.push({
        tags: ['@pending', '@rule', '@stock'],
        name: `${us.title} - Rejeita quando estoque insuficiente`,
        given: ['dado que o usuário está na página', 'dado que o estoque é insuficiente'],
        when: ['quando tenta finalizar a operação'],
        then: ['então o sistema impede a transação', 'então exibe mensagem de estoque'],
      });
    }
    
    if (matchesPattern(ac, RULE_PATTERNS.valorMinimo)) {
      scenarios.push({
        tags: ['@pending', '@rule', '@validation'],
        name: `${us.title} - Rejeita quando valor é zero ou negativo`,
        given: ['dado que o valor é R$ 0,00 ou negativo'],
        when: ['quando tenta submeter'],
        then: ['então o sistema rejeita a transação', 'então nenhum dado é processado'],
      });
    }
  }
  
  return scenarios;
}
```

---

### Passo 7.3: Gerar Cenários de Proteção (@defensive) - Lei de Murphy

**CRÍTICO**: Gerar para toda ação que causa modificação de estado ou transação:

```typescript
const DEFENSIVE_PATTERNS = {
  // Ações que causam transação
  transacao: [
    /submete|finalizar|confirmar|comprar|pagar/i,
    /enviar|processar|executar/i,
  ],
  
  // Ações que alteram estado
  estado: [
    /toggle|abrir|fechar|ativar|desativar/i,
    /adicionar|remover|deletar/i,
  ],
  
  // Ações críticas
  critica: [
    /pagamento|transação|transferência/i,
    /envio.*email|notificação/i,
  ],
};

function generateDefensiveScenarios(us: UserStory): Scenario[] {
  const scenarios: Scenario[] = [];
  
  for (const ac of us.criteria) {
    // Double-click prevention para transações
    if (matchesPattern(ac, DEFENSIVE_PATTERNS.transacao)) {
      scenarios.push({
        tags: ['@pending', '@defensive'],
        name: `${us.title} - Double-click não causa ação duplicada`,
        given: ['dado que o formulário está válido'],
        when: ['quando o usuário clica 3x rapidamente no botão'],
        then: ['então a ação ocorre apenas uma vez', 'então não há duplicação de dados'],
      });
      
      scenarios.push({
        tags: ['@pending', '@defensive'],
        name: `${us.title} - Botão desabilita imediatamente ao clicar`,
        given: ['dado que o formulário está válido'],
        when: ['quando o usuário clica no botão'],
        then: ['então o botão é desabilitado IMEDIATAMENTE', 'então spinner aparece', 'então cliques adicionais são ignorados'],
      });
    }
    
    // Estado consistente para toggle
    if (matchesPattern(ac, DEFENSIVE_PATTERNS.estado)) {
      scenarios.push({
        tags: ['@pending', '@defensive'],
        name: `${us.title} - Toggle rápido não causa estado inconsistente`,
        given: ['dado que o elemento está em estado inicial'],
        when: ['quando o usuário alterna rapidamente 5 vezes'],
        then: ['então o estado final é consistente', 'então não há flickering'],
      });
    }
    
    // Timeout preserva dados
    scenarios.push({
      tags: ['@pending', '@defensive'],
      name: `${us.title} - Timeout não perde dados`,
      given: ['dado que o formulário está preenchido'],
      when: ['quando há falha de conexão durante processamento'],
      then: ['então os dados são preservados', 'então o usuário pode tentar novamente'],
    });
  }
  
  return scenarios;
}
```

---

### Passo 7.4: Gerar Cenários de Estados (@state)

```typescript
function generateStateScenarios(us: UserStory): Scenario[] {
  const scenarios: Scenario[] = [];
  
  // Loading state
  scenarios.push({
    tags: ['@pending', '@state', '@loading'],
    name: `${us.title} - Estado de loading durante processamento`,
    given: ['dado que o usuário está na página'],
    when: ['quando a ação é iniciada'],
    then: ['então indicador de loading aparece', 'então campos ficam desabilitados'],
  });
  
  // Success state
  scenarios.push({
    tags: ['@pending', '@state', '@success'],
    name: `${us.title} - Estado de sucesso exibe feedback`,
    given: ['dado que a ação foi processada com sucesso'],
    when: ['quando o servidor retorna sucesso'],
    then: ['então feedback de sucesso é exibido', 'então usuário é redirecionado ou atualizado'],
  });
  
  // Error state
  scenarios.push({
    tags: ['@pending', '@state', '@error'],
    name: `${us.title} - Estado de erro exibe mensagem clara`,
    given: ['dado que houve falha no processamento'],
    when: ['quando o servidor retorna erro'],
    then: ['então mensagem de erro clara é exibida', 'então dados do formulário são mantidos'],
  });
  
  return scenarios;
}
```

---

### Passo 7.5: Gerar Cenários de Componentes (@component)

```typescript
function generateComponentScenarios(us: UserStory): Scenario[] {
  const scenarios: Scenario[] = [];
  
  // Identificar componentes mencionados nos artefatos
  const components = extractComponents(us.relatedComponents || []);
  
  for (const component of components) {
    scenarios.push({
      tags: ['@pending', '@component', `@${component.name}`],
      name: `${component.name} renderiza corretamente`,
      given: ['dado que o componente está na página'],
      when: ['quando a página carrega'],
      then: [`então ${component.name} está visível`, `então ${component.name} tem dados corretos`],
    });
  }
  
  return scenarios;
}
```

### Passo 7.6: Obter pencil_id (VINCULAÇÃO COM PENCIL)

Esta etapa obtém o `pencil_id` do componente via fluxo híbrido (automático + fallback).

```typescript
async function getPencilId(
  feature: string,
  research: string,
  plan: string
): Promise<{ pencilId: string | null; source: 'research' | 'plan' | 'pencil' | 'user' | 'none' }> {
  
  // 1. Verificar se já existe em research.md
  const researchMatch = research.match(/pencil_id:\s*["']?([\w-]+)/i);
  if (researchMatch) {
    return { pencilId: researchMatch[1], source: 'research' };
  }
  
  // 2. Verificar se já existe em plan.md
  const planMatch = plan.match(/pencil_id:\s*["']?([\w-]+)/i);
  if (planMatch) {
    return { pencilId: planMatch[1], source: 'plan' };
  }
  
  // 3. Tentar buscar no Pencil via MCP (automático)
  try {
    // Encontrar arquivos .pen no projeto
    const penFiles = await glob('*.pen');
    
    if (penFiles.length > 0) {
      for (const penFile of penFiles) {
        // Abrir documento
        await pencil_open_document(penFile);
        
        // Buscar nó pelo nome do componente
        const nodes = await pencil_batch_get({
          filePath: penFile,
          patterns: [{ name: new RegExp(`^${feature}$|^${feature}\\s*\\[PROPOSTA\\]`, 'i'), type: 'frame' }],
          searchDepth: 3
        });
        
        if (nodes && nodes.length > 0) {
          return { pencilId: nodes[0].id, source: 'pencil' };
        }
      }
    }
  } catch (error) {
    // MCP não disponível ou arquivo não encontrado - continuar para fallback
    console.log('Pencil MCP não disponível ou componente não encontrado no Pencil');
  }
  
  // 4. Fallback: perguntar ao usuário
  // Será tratado no fluxo principal que chama esta função
  return { pencilId: null, source: 'none' };
}
```

**Fluxo de decisão:**

```
getPencilId()
    │
    ├─ research.md tem pencil_id? ──sim──→ usar ID do research
    │
    ├─ plan.md tem pencil_id? ──sim──→ usar ID do plan
    │
    ├─ Pencil MCP disponível? ──sim──→ buscar por nome do componente
    │                                    │
    │                                    ├─ encontrou ──→ usar ID do Pencil
    │                                    └─ não encontrou
    │
    └─ não encontrou em lugar nenhum
           │
           └─ retornar { pencilId: null, source: 'none' }
               (fluxo principal pergunta ao usuário)
```

### Passo 7.7: Ordenar Cenários por Dependência (Inferência)

**CRÍTICO**: Reordenar cenários para que dependências lógicas venham primeiro.

```typescript
// Classificação de cenários por tipo (inferência automática)
const SCENARIO_TYPES = {
  render: [
    /renderizad[oa]|vis[í|i]vel|exibe|aparece|presente|carregad[oa]|mostra|exibindo/i,
    /está na página|está renderizad/i,
  ],
  state: [
    /hover|focus|loading|disabled|active|pressed|erro|success|focused/i,
    /estado de |em hover|em focus|em disabled|em loading|em active/i,
  ],
  interaction: [
    /clica|click|submit|digita|seleciona|pressiona|abre|fecha|toggle|envia/i,
    /quando o usuário|ao clicar|ao submeter|ao pressionar/,
  ],
  a11y: [
    /teclado|tab|navegaç[a|ã]o|leitor de tela|aria|foco|acessibilidad/i,
    /navegável|acess[í|i]vel|leitor/i,
  ],
};

// Ordenar cenários por dependência (render → state → interaction → a11y)
function sortScenariosByDependency(scenarios: Scenario[]): Scenario[] {
  // 1. Classificar cada cenário
  const classified = scenarios.map(scenario => {
    const text = `${scenario.name} ${scenario.given.join(' ')} ${scenario.when.join(' ')} ${scenario.then.join(' ')}`;
    
    let type: 'render' | 'state' | 'interaction' | 'a11y' = 'render';
    
    for (const [key, patterns] of Object.entries(SCENARIO_TYPES)) {
      for (const pattern of patterns) {
        if (pattern.test(text)) {
          type = key as 'render' | 'state' | 'interaction' | 'a11y';
          break;
        }
      }
      if (type !== 'render') break;
    }
    
    return { scenario, type };
  });
  
  // 2. Ordenar por tipo (ordem lógica: render → state → interaction → a11y)
  const typeOrder: Record<string, number> = { render: 1, state: 2, interaction: 3, a11y: 4 };
  
  // 3. Dentro de cada tipo, manter ordem original (happy → rule → defensive → state → component)
  const sorted = [...classified].sort((a, b) => {
    const orderDiff = typeOrder[a.type] - typeOrder[b.type];
    if (orderDiff !== 0) return orderDiff;
    
    // Manter ordem original dentro do mesmo tipo
    return scenarios.indexOf(a.scenario) - scenarios.indexOf(b.scenario);
  });
  
  return sorted.map(s => s.scenario);
}

// Validar dependências circulares
function validateNoCycles(scenarios: Scenario[]): boolean {
  const graph = new Map<string, string[]>();
  
  for (const scenario of scenarios) {
    const depMatch = scenario.tags.find(t => t.startsWith('@depends-on:'));
    if (depMatch) {
      const target = depMatch.replace('@depends-on:', '');
      const sources = graph.get(target) || [];
      sources.push(scenario.name);
      graph.set(target, sources);
    }
  }
  
  // Verificar ciclos (simplificado)
  const visited = new Set<string>();
  for (const scenario of scenarios) {
    if (visited.has(scenario.name)) continue;
    
    const stack = [scenario.name];
    while (stack.length > 0) {
      const current = stack.pop()!;
      if (visited.has(current)) return false; // Ciclo detectado
      visited.add(current);
      
      const deps = graph.get(current) || [];
      stack.push(...deps);
    }
  }
  
  return true;
}

function orderScenarios(scenarios: Scenario[]): Scenario[] {
  // 1. Classificar e ordenar
  const ordered = sortScenariosByDependency(scenarios);
  
  // 2. Validar ciclos (se houver @depends-on tags)
  if (!validateNoCycles(ordered)) {
    console.warn('⚠️ Dependências circulares detectadas nos cenários');
  }
  
  return ordered;
}
```

**Ordem de execução:**
```
render → state → interaction → a11y
```

**Exemplo de transformação:**

| Input (ordem aleatória) | Output (ordenado) |
|-------------------------|-------------------|
| "Button em hover" (state) | "Button renderiza" (render) |
| "Button navegável" (a11y) | "Button em hover" (state) |
| "Button renderiza" (render) | "Button em clique" (interaction) |
| "Button em clique" (interaction) | "Button navegável" (a11y) |

---

### Passo 8: Gerar *.feature

```typescript
function generateFeature(
  feature: string, 
  scenarios: Scenario[], 
  pencilId?: string | null
): string {
  let output = '@pending\n';
  output += `Feature: ${formatFeatureName(feature)}\n`;
  
  // Adicionar pencil_id se disponível
  if (pencilId) {
    output += `  **pencil_id:** "${pencilId}"\n\n`;
  } else {
    output += '\n';
  }
  
  for (const scenario of scenarios) {
    output += `  ${scenario.tags.join(' ')}\n`;
    output += `  Scenario: ${scenario.name}\n`;
    
    for (const given of scenario.given) {
      output += `    Given ${given}\n`;
    }
    
    for (const when of scenario.when) {
      output += `    When ${when}\n`;
    }
    
    for (const then of scenario.then) {
      output += `    Then ${then}\n`;
    }
    
    output += '\n';
  }
  
  return output;
}
```

### Passo 8.1: Fluxo Principal de Geração

O fluxo completo que integra a obtenção de pencil_id:

```typescript
async function generateBddFeature(feature: string): Promise<{ success: boolean; pencilId?: string; pencilSource?: string }> {
  
  // 1. Verificar pré-requisitos (etapas 0-1)
  // ...
  
  // 2. Ler research.md e plan.md (etapas 2-3)
  const research = await readFile(researchPath);
  const plan = await readFile(planPath);
  
  // 3. Gerar cenários (etapas 4-7)
  const scenarios = await generateAllScenarios(research, plan);
  
  // 3.1 Ordenar cenários por dependência (etapa 7.7)
  const orderedScenarios = orderScenarios(scenarios);
  
  // 4. Obter pencil_id (etapa 7.6)
  const { pencilId, source } = await getPencilId(feature, research, plan);
  
  // 5. Se não encontrou, perguntar ao usuário
  let finalPencilId = pencilId;
  if (!finalPencilId) {
    const userChoice = await question({
      question: `O componente "${feature}" já existe no Pencil?`,
      options: [
        { label: 'A) Buscar no Pencil', description: 'Tentar encontrar automaticamente' },
        { label: 'B) Ainda não existe', description: 'Gerar sem pencil_id' },
        { label: 'C) Informar ID', description: 'Digitar pencil_id manualmente' }
      ]
    });
    
    switch (userChoice) {
      case 'A':
        // Tentar buscar novamente com mais opções
        const retryResult = await searchPencilByAlternativeNames(feature);
        if (retryResult) {
          finalPencilId = retryResult;
        } else {
          console.log('⚠️ Componente não encontrado no Pencil. Gerando sem pencil_id.');
        }
        break;
      case 'C':
        finalPencilId = await question({ question: 'Informe o pencil_id:' });
        break;
      case 'B':
      default:
        // Manter sem pencil_id
        break;
    }
  }
  
  // 6. Gerar arquivo .feature com pencil_id (já ordenado por dependência)
  const featureContent = generateFeature(feature, orderedScenarios, finalPencilId);
  
  // 7. Salvar (etapa 9)
  await writeFile(featurePath, featureContent);
  
  return { 
    success: true, 
    pencilId: finalPencilId,
    pencilSource: finalPencilId ? source : 'user-declined'
  };
}
```

### Passo 9: Criar diretório e salvar

```typescript
// Criar diretório features/
const featuresDir = `specs/features/${feature}/features`;
await mkdir(featuresDir, { recursive: true });

// Salvar *.feature
const featurePath = `${featuresDir}/${feature}.feature`;
await writeFile(featurePath, featureContent);
```

---

## Atualização de Cenários (Requisito Mudou)

Quando um requisito muda ou precisa de novos cenários:

### Passo 10: Verificar *.feature Existente

```typescript
const featurePath = `specs/features/${feature}/features/${feature}.feature`;

if (await fileExists(featurePath)) {
  // *.feature existe → ADICIONAR cenários
} else {
  // *.feature não existe → CRIAR novo
}
```

### Passo 11: Adicionar Cenários (se *.feature existe)

```typescript
async function addScenariosToExistingFeature(feature: string, newScenarios: Scenario[]): Promise<void> {
  // 1. Ler *.feature existente
  const existingContent = await readFile(featurePath);
  
  // 2. Preservar cenários @done e @in-progress
  const existingScenarios = parseFeatureFile(existingContent);
  const scenariosToPreserve = existingScenarios.filter(s => 
    s.tags.includes('@done') || s.tags.includes('@in-progress')
  );
  
  // 3. Identificar cenários já implementados (não duplicar)
  const existingScenarioNames = scenariosToPreserve.map(s => s.name);
  
  // 4. Filtrar novos cenários (remover duplicatas)
  const newUniqueScenarios = newScenarios.filter(
    s => !existingScenarioNames.includes(s.name)
  );
  
  // 5. Adicionar novos cenários com @pending
  const scenariosToAdd = newUniqueScenarios.map(s => ({
    ...s,
    tags: s.tags.filter(t => !['@done', '@in-progress'].includes(t)).concat(['@pending'])
  }));
  
  // 6. Montar conteúdo atualizado
  let updatedContent = existingContent;
  
  // 7. Adicionar comentários separadores
  const separator = '\n\n  # ═══════════════════════════════════════════════════════════\n  # NOVOS CENÁRIOS\n  # ═══════════════════════════════════════════════════════════\n\n';
  
  // 8. Adicionar ao final do Feature (antes de fechar)
  for (const scenario of scenariosToAdd) {
    updatedContent += generateScenarioBlock(scenario);
  }
  
  // 9. Salvar
  await writeFile(featurePath, updatedContent);
}

function parseFeatureFile(content: string): ParsedScenario[] {
  // Parse *.feature existente mantendo estrutura
}

function generateScenarioBlock(scenario: Scenario): string {
  // Gerar bloco Given-When-Then formatado
}
```

### Regras de Adição

| Situação | Ação |
|----------|------|
| *.feature não existe | Criar novo (comportamento atual) |
| *.feature existe | Adicionar cenários ao final |
| Cenário @done | PRESERVAR - não modificar |
| Cenário @in-progress | PRESERVAR - não modificar |
| Cenário @pending existente | PRESERVAR - não duplicar |
| Novo cenário | Adicionar com @pending |

### Output ao Adicionar

```
✅ Cenários adicionados ao *.feature existente

Cenários preservados (@done/@in-progress): X
Cenários adicionados (@pending): Y
Cenários duplicados (ignorados): Z

*.feature atualizado: specs/features/[feature]/features/[feature].feature
```

---

## Output

```
✅ BDD gerado para feature [nome]

Arquivos criados:
- specs/features/[feature]/features/[feature].feature

pencil_id: [ID] (fonte: [research|pencil|user])
- Se "não vinculado": componente ainda não existe no Pencil ou usuário optou por não vincular

Cenários gerados: N (ordenados por dependência: render → state → interaction → a11y)
- @desktop: X
- @mobile: Y
- @a11y: Z

Ordenação por dependência: ✅ Ativada (inferência automática)

Próx passos:
1. Revise os cenários gerados
2. Aprovar ou ajustar cenários
3. Execute @tdd-generator para gerar testes
4. Para verificar consistência com design: diff-design-vs-code --component=[nome]
```

## Validações

Antes de salvar, verificar:

- [ ] Todos os critérios de aceitação estão mapeados
- [ ] Cenários têm Given-When-Then completos
- [ ] Tags de contexto estão corretas (@desktop, @mobile, @a11y)
- [ ] Placeholders para constants estão corretos
- [ ] Sintaxe Gherkin está válida
- [ ] Cenários @rule estão presentes para operações críticas
- [ ] Cenários @defensive estão presentes para Lei de Murphy
- [ ] Cenários @state estão presentes para loading/erro/sucesso
- [ ] pencil_id foi obtido (via research, plan, Pencil MCP, ou input do usuário)
- [ ] pencil_id correto foi vinculado ao .feature
- [ ] **Cenários ordenados por dependência** (render → state → interaction → a11y)

## Regras

1. **Não inventar cenários** - only mapear AC existentes
2. **Usar placeholders** - constants devem ser placeholders (HEADER_HEIGHT, NAV_COUNT)
3. **Tags consistentes** - @desktop, @mobile, @a11y
4. **Iniciar @pending** - todos cenários começam pending
5. **Given-When-Then** - usar linguagem natural
6. **Regras de Negócio (@rule)** - MANDATÓRIO para operações críticas (submit, transação,validação)
7. **Proteção (@defensive)** - MANDATÓRIO para Lei de Murphy (double-click, timeout)
8. **Estados (@state)** - MANDATÓRIO para ações assíncronas (loading, erro, sucesso)
9. **Ordenação por dependência** - Cenários ordenadaos via inferência (render → state → interaction → a11y)

## Regras de Vinculação com Pencil

1. **Prioridade de busca**: research.md → plan.md → Pencil MCP → usuário
2. **Formato do pencil_id**: `**pencil_id:** "[id]"` na linha 2 do .feature
3. **Fonte transparente**: informar ao usuário de onde veio o pencil_id
4. **Fallback para usuário**: se não encontrar, perguntar antes de prosseguir
5. **Componente não existe no Pencil**: permitir gerar sem pencil_id (vincular depois)

## Exemplo de Output

```gherkin
@pending
Feature: Header de Navegação
  **pencil_id:** "header001"

  # ═══════════════════════════════════════════════════════════
  # ✅ FLUXO FELIZ - Happy Path
  # ═══════════════════════════════════════════════════════════

  @pending @desktop @happy
  Scenario: Header desktop exibe logo e menu
    Given que o usuário está em desktop (≥768px)
    When a página carrega
    Then o header é fixed com altura de HEADER_HEIGHT
    And o logo aparece à esquerda
    And o menu exibe NAV_COUNT itens

  # ═══════════════════════════════════════════════════════════
  # 🎯 REGRAS DE NEGÓCIO - @rule
  # ═══════════════════════════════════════════════════════════

  @pending @desktop @rule
  Scenario: Menu deve exibir NAV_COUNT itens exatamente
    Given que o usuário está em desktop (≥768px)
    When a página carrega
    Then o menu exibe exatamente NAV_COUNT itens
    And menos ou mais itens indica erro

  # ═══════════════════════════════════════════════════════════
  # 🛡️ PROTEÇÃO CRÍTICA - @defensive (Lei de Murphy)
  # ═══════════════════════════════════════════════════════════

  @pending @mobile @defensive
  Scenario: Clique rápido no hamburger não abre múltiplos overlays
    Given que o usuário está em mobile (<768px)
    And o menu está fechado
    When o usuário clica 3x rapidamente no botão hamburger
    Then o overlay abre apenas uma vez
    And o estado é consistente

  @pending @mobile @defensive
  Scenario: Toggle rápido não causa estado inconsistente
    Given que o usuário está em mobile (<768px)
    When o usuário abre e fecha o menu rapidamente 5 vezes
    Then o estado final está correto
    And não há flickering

  # ═══════════════════════════════════════════════════════════
  # ⚠️ ESTADOS - @state (loading, erro, sucesso)
  # ═══════════════════════════════════════════════════════════

  @pending @state @loading
  Scenario: Menu abrindo mostra estado de loading
    Given que o usuário está em mobile (<768px)
    When o usuário clica no hamburger
    Then animação de abertura inicia
    And menu fica interativo após animação

  # ═══════════════════════════════════════════════════════════
  # 🎛️ COMPONENTES - @component
  # ═══════════════════════════════════════════════════════════

  @pending @component @Header
  Scenario: Header renderiza com todos os subcomponentes
    Given que a página carrega
    Then o logo está presente
    And o menu desktop está presente
    And o botão hamburger está presente
```

## Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| "research.md não encontrado" | Não executou @research-to-plan | Execute @research-to-plan primeiro |
| "Cenários vazios" | AC não mapeados | Verificar formato do research.md |
| "Tags duplicadas" | Contexto identificado errado | Ajustar padrões de contexto |
| "pencil_id não vinculado" | Componente não existe no Pencil | Gerar sem pencil_id ou criar no Pencil primeiro |
| "Componente não encontrado no Pencil" | Nome diferente no Pencil | Verificar nome correto no Pencil ou informar ID manualmente |

---

## Design System - Geração Especial

Quando a feature é `design-system`, o comportamento muda:

### Detecção

```typescript
const isDesignSystem = feature === 'design-system' || feature === 'design_system';
```

### Estrutura de Saída

Para design-system, a estrutura de saída é diferente:

```
specs/features/design-system/features/
├── design-tokens.feature     # Testa CSS vars (SEM pencil_id)
├── atoms/
│   ├── button.feature       # pencil_id: "btn001"
│   ├── badge.feature       # pencil_id: "badge001"
│   ├── input.feature       # pencil_id: "input001"
│   ├── avatar.feature      # pencil_id: "avatar001"
│   └── icon.feature        # pencil_id: "icon001"
├── molecules/
│   ├── card.feature        # pencil_id: "card001"
│   ├── search-bar.feature  # pencil_id: "search001"
│   ├── breadcrumbs.feature # pencil_id: "bread001"
│   ├── pagination.feature  # pencil_id: "page001"
│   ├── banner.feature      # pencil_id: "banner001"
│   └── quick-actions.feature # pencil_id: "quick001"
└── organisms/
    ├── sidebar.feature     # pencil_id: "ncY1p"
    ├── summary-cards.feature # pencil_id: "L1zBB"
    ├── chart-section.feature # pencil_id: "chart001"
    ├── table-section.feature # pencil_id: "table001"
    ├── gallery-section.feature # pencil_id: "gallery001"
    └── stacked-list.feature # pencil_id: "stack001"
```

### Regras para Design System

| Categoria | pencil_id | Testa |
|----------|-----------|-------|
| design-tokens | N/A | CSS vars em globals.css |
| atoms | ✅ Sim | Componente vs design tokens |
| molecules | ✅ Sim | Componente vs design tokens |
| organisms | ✅ Sim | Componente vs design tokens |

### Template de .feature para Design System

```markdown
# language: pt
@[pending] @[atom|molecule|organism]
Funcionalidade: [Nome do Componente]
  **pencil_id:** "[id_no_pencil]"

  @[pending] @smoke
  Cenário: [Nome do cenário]
    Dado que o componente [nome] deve seguir o design system
    Quando renderizado
    Entao deve ter [propriedade] [valor]
```

### Exemplo: button.feature

```markdown
# language: pt
@pending @atom
Funcionalidade: Button
  **pencil_id:** "btn001"

  @pending @smoke
  Cenário: Button primário com estilo correto
    Dado que o componente Button é renderizado
    Quando tem variant="primary"
    Entao deve ter background #FF5C00
    E deve ter border-radius 8px
    E deve ter padding 12px vertical, 16px horizontal

  @pending @smoke
  Cenário: Button secundário com estilo correto
    Dado que o componente Button é renderizado
    Quando tem variant="secondary"
    Entao deve ter background transparent
    E deve ter border 1px solid #A1A1AA
    E deve ter text color #A1A1AA
```

### Exemplo: design-tokens.feature

```markdown
# language: pt
@pending @design-tokens
Funcionalidade: Design Tokens
  **referencia:** Design tokens do sistema

  @pending @smoke
  Cenário: Cores primárias definidas corretamente
    Dado que o CSS está configurado
    Entao --color-bg-primary deve ser #0A0A0B
    E --color-bg-secondary deve ser #141417
    E --color-accent deve ser #FF5C00

  @pending @smoke
  Cenário: Cores semânticas definidas corretamente
    Dado que o CSS está configurado
    Entao --color-success deve ser #22C55E
    E --color-error deve ser #EF4444

  @pending @smoke
  Cenário: Tipografia configurada corretamente
    Dado que o CSS está configurado
    Entao --font-family deve ser 'Inter', sans-serif
    E --font-size-heading deve ser 20px
    E --font-weight-heading deve ser 600
```

### Fluxo para Design System

```
1. Detectar: feature === 'design-system'
2. Criar estrutura de diretórios:
   - features/
   - features/atoms/
   - features/molecules/
   - features/organisms/
3. Gerar design-tokens.feature (sem pencil_id)
4. Para cada componente no plan.md:
   - Determinar categoria (atom/molecule/organism)
   - Extrair pencil_id usando getPencilId() (mesmo fluxo híbrido)
   - Gerar .feature com pencil_id
```

### Extração de pencil_id

O bdd-generator usa a função `getPencilId()` (Passo 7.6) que segue esta ordem de prioridade:

1. **research.md** - pencil_id já documentado
2. **plan.md** - pencil_id já mapeado
3. **Pencil MCP** - busca automática pelo nome do componente
4. **Usuário** - fallback com opções (buscar/ignorar/informar)

### Cenários Obrigatórios por Categoria

**design-tokens:**
- Cores primárias
- Cores semânticas (success, error, warning)
- Tipografia
- Spacing scale
- Border radius scale
- Shadows (se houver)

**atoms:**
- Renderização correta
- Variants (primary, secondary, ghost)
- Estados (hover, focus, disabled)
- Tamanhos (sm, md, lg)

**molecules:**
- Composição de átomos
- Estilos herdados dos átomos
- Layout interno
- Estados

**organisms:**
- Composição de moléculas
- Layout e posicionamento
- Estilos consistentes
- Responsividade (se aplicável)
