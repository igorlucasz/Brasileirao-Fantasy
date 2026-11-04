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
