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

## 2026-11-07 — Arquitetura e divisão de tarefas

- **Quem:** Igor (com Claude Code)
- **Branch / PR:** `docs/planejamento-tarefas`
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
