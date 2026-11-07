# Histórico do projeto

Registro cronológico do que foi feito. **Uma entrada por tarefa ou PR, a mais
recente no topo.** Use o modelo abaixo.

```md
## AAAA-MM-DD — Título curto

- **Quem:** Igor | PH
- **Branch / PR:** `feat/...` (#123)
- **Resumo:** o que foi feito e por quê, em 2–4 linhas.
- **Arquivos principais:** `caminho/arquivo.ts`, ...
```

---

## 2026-11-07 — P1 e integração das atualizações da main

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** trabalho da P1 salvo em `16aaebf`; conflitos de contexto e histórico
  resolvidos preservando as contribuições dos dois devs. Integrados guia, contratos
  e Better Auth do Igor. Página inicial, layouts, navegação e formulários visuais
  preservados; sem ligar autenticação ou aplicar migrations na `dev-ph`.
- **Validação:** `npm install`, lint, formatação, tipos e build concluídos.
  Build encerra com sucesso, com avisos do Better Auth sobre configuração local
  de segredo e URL pendente; nenhuma migration executada.
- **Arquivos principais:** `docs/CONTEXTO.md`, `docs/HISTORICO.md`, `src/app/`,
  `src/components/`.

## 2026-11-07 — Cores por posição nos jogadores

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** etiquetas com fundo vermelho (ATA), verde (MEI), azul (DEF) e
  roxo (GOL), conforme pedido do PH, em Partida, Elenco e Jogadores.
- **Arquivos principais:** `src/app/globals.css`, `src/components/league-preview.tsx`,
  `src/components/player-browser.tsx`, `docs/CONTEXTO.md`.

## 2026-11-07 — Restauração da interface anterior ao Draft Board

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** removidos a rota, os componentes, os dados de demonstração e os
  estilos do Draft Board, além do acesso na aba Liga, por pedido do PH.
  Preservadas a identidade DORMINHOCO e as quatro abas com os elencos definidos.
  Pesquisa de fontes cancelada sem mudanças no back-end ou banco.
- **Arquivos principais:** `src/app/(app)/liga/page.tsx`, `src/app/globals.css`,
  `docs/CONTEXTO.md`.

## 2026-11-07 — Prévia interativa autorizada do Draft

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** PH autorizou dados de demonstração para avaliar o Board e o modal.
  `/draft` exibe 4 equipes clicáveis, com elencos completos, parciais e vazio,
  identificação explícita dos dados fictícios e acesso pela aba Liga.
  Integração final continua reservada a dados reais.
- **Arquivos principais:** `src/components/draft/demo-data.ts`,
  `src/app/(app)/draft/page.tsx`, `src/app/(app)/liga/page.tsx`.

## 2026-11-07 — Consulta de elencos no Draft: estrutura de interface

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** base de Draft Board com cabeçalhos clicáveis e modal central,
  decisão 265 C confirmada pelo PH. Lista por posição/projeção, etiquetas
  compartilhadas e posições vazias; testes de ordenação e exclusividade.
  `/draft` permanece sem dados até contratos/API reais; sem jogadores inventados.
- **Arquivos principais:** `src/components/draft/`, `src/app/(app)/draft/page.tsx`,
  `src/app/globals.css`, `docs/CONTEXTO.md`.

## 2026-11-07 — Reservas livres por posição

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** PH definiu as cinco vagas do banco sem cotas por posição.
  Prévia do PH FC exemplifica 4 ATA e 1 GOL; textos de Elenco e Partida
  informam a liberdade de composição. Formação titular permanece 1/3/3/2.
- **Arquivos principais:** `src/components/league-preview.tsx`, `docs/CONTEXTO.md`.

## 2026-11-07 — Elenco com 9 titulares e 5 reservas

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** regra do PH aplicada aos dois times da prévia: 1 GOL, 3 DEF,
  3 MEI e 2 ATA titulares, mais 5 reservas. Elenco e Partida separam os grupos;
  Jogadores distingue atletas dos times e opções de waiver. Placares ilustrativos
  consistentes entre Partida e Liga, sem definir pontuação ou substituição do banco.
- **Arquivos principais:** `src/components/league-preview.tsx`,
  `src/components/player-browser.tsx`, `docs/CONTEXTO.md`.

## 2026-11-07 — Prévia de conta dentro de uma liga

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** cenário visual PH / PH FC / Liga dos Amigos nas quatro abas, com
  comparação de elencos, elenco, busca e filtros de jogadores, confrontos e
  classificação. Dados explicitamente fictícios; sem sessão ou alterações no waiver.
- **Arquivos principais:** `src/app/(app)/`, `src/components/league-preview.tsx`,
  `src/components/player-browser.tsx`, `src/components/app-header.tsx`.

## 2026-11-07 — Navegação Partida, Elenco, Jogadores e Liga

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** abas reorganizadas conforme definição do PH, com rotas e textos
  específicos para confronto, elenco, jogadores/waiver e visão da liga.
  Links anteriores redirecionam às novas áreas; funcionalidades seguem pendentes.
- **Arquivos principais:** `src/components/app-header.tsx`, `src/app/(app)/`,
  `src/app/(auth)/layout.tsx`, `docs/CONTEXTO.md`.

## 2026-11-07 — Identidade DORMINHOCO nas demais telas

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** identidade aprovada aplicada ao login, cadastro, Ligas, Meu time,
  Rodada e Classificação. Montserrat global, coroa compartilhada, marca DORMINHOCO,
  verdes e amarelo nos componentes, arcos discretos e navegação adaptada ao celular.
- **Arquivos principais:** `src/app/`, `src/components/`, `docs/CONTEXTO.md`.

## 2026-11-07 — Boas-vindas DORMINHOCO

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** tela inicial refeita conforme especificação DORMINHOCO: fundo
  esmeralda, arcos amarelo e azul, coroa geométrica e Montserrat. Somente duas
  ações, Criar conta e Entrar, ligadas às rotas existentes, sem autenticação fictícia.
- **Arquivos principais:** `src/app/page.tsx`, `src/app/globals.css`, `docs/CONTEXTO.md`.

## 2026-11-07 — Fundo azulado mais escuro

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** fundo global escurecido de `#0d0e21` para `#090a18`, a pedido do PH.
- **Arquivos principais:** `src/app/globals.css`, `docs/CONTEXTO.md`.

## 2026-11-07 — Ajuste da cor de fundo

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** fundo global alterado para `#0d0e21`, conforme pedido do PH.
- **Arquivos principais:** `src/app/globals.css`, `docs/CONTEXTO.md`.

## 2026-11-07 — P1: layout, navegação e telas de acesso

- **Quem:** PH (com Codex)
- **Branch / PR:** `feat/layout-e-telas-auth`
- **Resumo:** tema base escuro com destaque verde, página inicial, layout da área
  do app com navegação e páginas de espera para Ligas, Meu time, Rodada e
  Classificação. Login e cadastro com validação visual acessível, sem API ou sessão.
- **Arquivos principais:** `src/app/`, `src/components/`, `docs/CONTEXTO.md`.

## 2026-11-07 — Autenticação com Better Auth

- **Quem:** Igor (com Claude Code)
- **Branch / PR:** `chore/auth-better-auth` (#4)
- **Resumo:** cadastro, login e logout por e-mail e senha com Better Auth 1.7.18, usando o
  cliente Prisma existente. Primeira migration aplicada na `dev-igor`, pela URL pooled.
  Criados `GET /api/health`, `GET /api/sessao`, os contratos de sessão e saúde e o
  `authClient` para as telas. Fluxo testado de ponta a ponta. O merge passou a ser
  decidido de forma independente por cada dev.
- **Arquivos principais:** `src/server/auth/`, `src/app/api/`, `src/lib/auth-client.ts`,
  `src/contracts/sessao.ts`, `prisma/schema.prisma`, `prisma/migrations/`.

## 2026-11-07 — Contratos do draft e guia do produto

- **Quem:** Igor (com Claude Code)
- **Branch / PR:** `feat/contratos-draft` (#3)
- **Resumo:** contratos de jogador, equipe, draft, elenco e erro criados a partir do
  `docs/GUIA.md`, que entrou no repo como referência do produto. Os demais documentos
  foram alinhados ao guia, e o merge de todo PR passou a ser decidido pelo Igor.
- **Arquivos principais:** `src/contracts/`, `docs/GUIA.md`, `docs/CONTEXTO.md`, `AGENTS.md`.

## 2026-11-07 — Arquitetura e divisão de tarefas

- **Quem:** Igor (com Claude Code)
- **Branch / PR:** `docs/planejamento-tarefas` (#2)
- **Resumo:** registro da macroarquitetura e das tarefas separadas entre PH e Igor,
  com dependências, para os dois trabalharem de forma independente. Decididos o draft
  snake com jogador exclusivo, o polling na sala do draft e o contrato antes da tela.
- **Arquivos principais:** `docs/CONTEXTO.md`, `docs/HISTORICO.md`.

## 2026-11-07 — Proteção da `main` e merge do onboarding

- **Quem:** Igor (com Claude Code)
- **Branch / PR:** `chore/setup-neon` (#1)
- **Resumo:** o PR #1 tinha sido fechado sem merge, o que deixava a `main` sem o
  `git-lfs` no devcontainer e sem o onboarding do PH; ele foi reaberto e entrou na
  `main`. O ruleset da `main` foi ativado exigindo PR e CI, sem aprovação obrigatória,
  e bloqueando force push e exclusão da branch. Regras atualizadas no `AGENTS.md` e
  no `README.md`.
- **Arquivos principais:** `AGENTS.md`, `README.md`, `docs/CONTEXTO.md`, `docs/HISTORICO.md`.

## 2026-11-04 — Onboarding do PH

- **Quem:** Igor (com Claude Code)
- **Branch / PR:** `chore/setup-neon` (#1)
- **Resumo:** revisão da documentação para o PH e o Codex entrarem no projeto:
  checklist de onboarding e tarefas atuais detalhadas no `CONTEXTO.md`, notas de
  front-end (Server Components, Tailwind 4) no `AGENTS.md`, login da IA no README.
  Devcontainer ganhou `git-lfs` (hooks de LFS quebravam commit/push) e `gh`.
  Antes disso, o histórico da `main` foi reescrito para remover o trailer
  `Co-Authored-By` dos commits do esqueleto (force push autorizado pelo Igor).
- **Arquivos principais:** `docs/CONTEXTO.md`, `AGENTS.md`, `README.md`,
  `.devcontainer/devcontainer.json`.

## 2026-11-04 — Setup do Neon

- **Quem:** Igor (com Claude Code)
- **Branch / PR:** `chore/setup-neon`
- **Resumo:** projeto `Brasileirao-Fantasy` no Neon (São Paulo, Postgres 18) com
  as branches `production`, `dev-igor` e `dev-ph`. `DATABASE_URL` do Igor nos
  Codespaces Secrets apontando para o pooler da `dev-igor`; conexão testada com
  query direta e `prisma migrate status`. Lockfile sincronizado (`engines` e
  `hasInstallScript`). Nenhuma tabela criada ainda.
- **Arquivos principais:** `docs/CONTEXTO.md`, `docs/HISTORICO.md`, `package-lock.json`.

## 2026-11-04 — Esqueleto do projeto

- **Quem:** Igor (com Claude Code)
- **Branch / PR:** direto na `main` (exceção combinada: repositório vazio, PH ainda não tinha entrado)
- **Resumo:** criado o esqueleto completo: app Next.js 16 (App Router, TS,
  Tailwind, `src/`, alias `@/*`), ESLint + Prettier, Prisma 7.10.1 configurado
  para Neon (sem modelos e sem migrations), Zod, estrutura de pastas por
  território com README em cada uma, `.env.example`, devcontainer com Claude
  Code e Codex, CI (lint, format, typecheck, build) e template de PR.
  Documentação inicial: `AGENTS.md`, `CLAUDE.md`, `docs/CONTEXTO.md`, este
  arquivo e `README.md`. Nenhuma regra de negócio, tela, endpoint ou
  autenticação implementada.
- **Arquivos principais:** `package.json`, `eslint.config.mjs`, `.prettierrc`,
  `prisma/schema.prisma`, `prisma.config.ts`, `src/server/db/index.ts`,
  `src/contracts/README.md`, `.devcontainer/`, `.github/workflows/ci.yml`,
  `.github/pull_request_template.md`, `AGENTS.md`, `docs/`.
