# Exemplo de Output - Verify Patterns

## Exemplo 1: Aprovado

```
✅ VERIFICAÇÃO APROVADA - US-123

### Resultado: APROVADO

#### A. Convenções de Código
- [✅] Nomenclatura de arquivos: OK (form-dialog.tsx, user-card.tsx)
- [✅] Arrow functions: OK (todos componentes usam arrow function)
- [✅] Tailwind only: OK (sem style={{}})
- [✅] Tipagem de props: OK (todas props tipadas)

#### B. Guardrails
- [✅] Sem uso de `any`: OK
- [✅] Sem fetch direto em componentes: OK
- [✅] Sem comentários: OK
- [✅] Arquivos dentro do escopo: OK (3 arquivos modificados)

#### C. Arquitetura
- [✅] Estrutura de pastas: OK (componentes em src/features/user-form/)
- [✅] Tipos no mesmo arquivo: OK (para componentes simples)

#### D. Contrato plan.md
- [✅] Props batem com plan: OK
- [✅] Tipos batem com plan: OK

Verificações realizadas: 12/12 OK
Próx etapa: Commit
```

## Exemplo 2: Drift Detectado

```
❌ DRIFT DETECTADO - US-456

### Resultado: DRIFT DETECTADO

#### A. Convenções deCódigo
- [✅] Nomenclatura de arquivos: OK
- [✅] Arrow functions: OK
- [❌] Tailwind only: DRIFT
- [✅] Tipagem de props: OK

#### B. Guardrails
- [❌] Sem uso de `any`: DRIFT (encontrado 2x)
- [✅] Sem fetch direto em componentes: OK
- [✅] Sem comentários: OK
- [✅] Arquivos dentro do escopo: OK

#### C. Arquitetura
- [✅] Estrutura de pastas: OK
- [✅] Tipos no mesmo arquivo: OK

#### D. Contrato plan.md
- [✅] Props batem com plan: OK
- [✅] Tipos batem com plan: OK

### Drifts Encontrados:

1. user-card.tsx:17 - Estilo inline detectado
   Problema: `style={{ backgroundColor: '#fff' }}`
   Correção: Usar classe Tailwind `bg-white`

2. user-card.tsx:42 - Uso de `any` detectado
   Problema: `const data: any = ...`
   Correção: Tipar corretamente o tipo de dados

3. form-dialog.tsx:8 - Uso de `any` detectado
   Problema: `props: any`
   Correção: Definir interface para props

### Ação Necessária:
Corrigir os 3 drifts encontrados e re-executar verificação
```

## Exemplo 3: Modo Não-Interativo (pre-commit)

```
[PRE-COMMIT] Verificando padrões...

✅ Convenções básicas: OK

Arquivos verificados: 3
Violações encontradas: 0

Status: APROVADO
```

## Exemplo 4: Violação de Guardrail Crítica

```
❌ DRIFT DETECTADO - US-789

### Resultado: DRIFT DETECTADO

#### B. Guardrails
- [❌] Não implementar sem research→plan→*.feature: CRÍTICO

### Drifts Encontrados:

1. ARQUIVO FALTANTE: plan.md
   Problema: Feature implementada sem plano
   Correção: Criar specs/features/user-form/plan.md

2. ARQUIVO FALTANTE: *.feature
   Problema: Feature implementada sem cenários BDD
   Correção: Criar specs/features/user-form/*.feature

### Ação Necessária:
Gerar artefatos antes de implementar (research → plan → *.feature)
```
