# Brasileirão Fantasy

Um jogo de fantasy baseado no Campeonato Brasileiro!

Plataforma web de fantasy football do Brasileirão, inspirada no fantasy do
Sleeper: você monta um time com jogadores reais de clubes diferentes, pontua
conforme eles jogam nas partidas reais e enfrenta outro membro da sua liga a
cada rodada, em confronto direto.

> Status: **esqueleto** com banco no Neon configurado. Ainda não há telas, endpoints nem autenticação.
> Veja o estado atual em [`docs/CONTEXTO.md`](docs/CONTEXTO.md).

## Documentação

- [`AGENTS.md`](AGENTS.md) — regras do projeto, comandos, territórios e
  instruções para IAs (Codex e Claude Code leem este arquivo).
- [`docs/CONTEXTO.md`](docs/CONTEXTO.md) — visão geral, stack, decisões,
  pontos em aberto e próximos passos.
- [`docs/HISTORICO.md`](docs/HISTORICO.md) — o que já foi feito, tarefa a tarefa.
- [`src/contracts/README.md`](src/contracts/README.md) — como funcionam os
  contratos da API entre front e back.

## Stack

Next.js 16 (App Router) + TypeScript · Tailwind CSS 4 · PostgreSQL no Neon ·
Prisma 7 · Better Auth · Zod · Vercel.

## Começando (GitHub Codespaces)

1. No GitHub, abra o repositório → botão **Code** → aba **Codespaces** →
   **Create codespace on main**.
2. Espere o setup terminar (ele roda `npm install` e instala as CLIs do
   Claude Code e do Codex — veja `.devcontainer/post-create.sh`).
3. Faça login na sua IA pelo terminal do Codespace: `claude` (Igor) ou
   `codex` (PH), e siga as instruções.
4. Configure as variáveis de ambiente (próxima seção). Para trabalhar só no
   front com mocks, dá para pular este passo.
5. Rode `npm run dev` e abra a porta **3000** que o Codespace encaminhar.

## Variáveis de ambiente

Os nomes das variáveis estão em [`.env.example`](.env.example). Os valores
**nunca** vão para o Git. Duas formas de configurar (pode usar as duas):

- **Codespaces Secrets (recomendado)**: GitHub → seu avatar → **Settings** →
  **Codespaces** → **New secret**. Dê o nome (ex.: `DATABASE_URL`), cole o
  valor e libere o acesso para este repositório. Reinicie o Codespace para valer.
- **`.env.local`**: o setup do Codespace cria esse arquivo a partir do
  `.env.example`. Preencha os valores nele. Ele é ignorado pelo Git.

Se a variável existir nos dois lugares, o valor do Codespaces Secret vence.

## Comandos principais

```bash
npm run dev           # app em http://localhost:3000
npm run lint          # ESLint
npm run format        # formata o código com Prettier
npm run format:check  # verifica formatação
npm run typecheck     # checagem de tipos
npm run build         # build de produção
npm run db:generate   # gera o cliente Prisma
npm run db:studio     # abre o Prisma Studio
```

Comandos de migration (`db:migrate`, `db:deploy`) são só para o Igor.

## Como contribuir

1. `git checkout main && git pull`
2. `git checkout -b feat/minha-tarefa` (ou `fix/`, `chore/`, `docs/`)
3. Commits pequenos em [Conventional Commits](https://www.conventionalcommits.org/pt-br/), em português.
4. Antes do PR: `npm run lint && npm run typecheck && npm run build`.
5. Abra o PR e preencha o template. A `main` é protegida: o merge exige PR e CI passando, sem
   aprovação obrigatória. Mudanças em `src/contracts/` precisam de acordo com o outro dev.
