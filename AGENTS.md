# AGENTS.md — instruções para IAs (Codex, Claude Code) e humanos

Este é o arquivo de instruções principal do repositório. O Codex lê este arquivo
diretamente; o Claude Code lê via `CLAUDE.md` (que só contém `@AGENTS.md`).
**Uma fonte de verdade só: edite aqui, nunca no CLAUDE.md.**

Antes de qualquer tarefa, leia também [`docs/CONTEXTO.md`](docs/CONTEXTO.md)
(estado atual, decisões e pontos em aberto).

## Projeto

**Brasileirão Fantasy**: plataforma web de fantasy football do Campeonato
Brasileiro, inspirada no fantasy do Sleeper. O usuário monta um time com
jogadores reais de clubes diferentes; os jogadores pontuam conforme as partidas
reais, e a cada rodada o usuário enfrenta outro membro da liga em confronto
direto (head-to-head).

Equipe:

- **Igor** (usa Claude Code): infraestrutura e back-end — banco, API, ingestão
  de dados, pontuação, deploy.
- **PH** (usa Codex): front-end — telas, fluxos de usuário, interface.

**A API é o contrato entre os dois.** Os tipos ficam em `src/contracts/` (Zod).
O PH desenvolve telas com mocks (`src/mocks/`) que seguem esses contratos
enquanto o Igor implementa os endpoints reais.

## Stack

| Camada       | Escolha                                                          |
| ------------ | ---------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router), fullstack, TypeScript, React 19         |
| Estilo       | Tailwind CSS 4                                                   |
| Banco        | PostgreSQL no Neon (região São Paulo)                            |
| ORM          | Prisma 7 (`prisma-client`, sem motor Rust, adapter `PrismaNeon`) |
| Autenticação | Better Auth (ainda não implementado)                             |
| Contratos    | Zod 4 em `src/contracts/`                                        |
| Qualidade    | ESLint + Prettier, CI no GitHub Actions                          |
| Hospedagem   | Vercel Hobby                                                     |

## Comandos

| Comando                | O que faz                                                  |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Sobe o app em http://localhost:3000                        |
| `npm run lint`         | ESLint                                                     |
| `npm run format`       | Formata tudo com Prettier                                  |
| `npm run format:check` | Verifica formatação (usado no CI)                          |
| `npm run typecheck`    | Gera tipos de rota do Next e roda `tsc --noEmit`           |
| `npm run build`        | Build de produção                                          |
| `npm run db:generate`  | Gera o cliente Prisma em `src/generated/prisma` (ignorado) |
| `npm run db:migrate`   | `prisma migrate dev` — **só o Igor**                       |
| `npm run db:deploy`    | `prisma migrate deploy` — **só o Igor**                    |
| `npm run db:studio`    | Abre o Prisma Studio para inspecionar o banco              |

O `npm install` já roda `prisma generate` (postinstall).

## Mapa de territórios

| Caminho                 | Dono        | Conteúdo                                      |
| ----------------------- | ----------- | --------------------------------------------- |
| `.devcontainer/`        | Igor        | Ambiente do Codespace                         |
| `.github/`              | Igor        | CI e template de PR                           |
| `docs/`                 | **Os dois** | Contexto e histórico do projeto               |
| `prisma/`               | Igor        | Schema e migrations                           |
| `src/app/(auth)/`       | PH          | Telas de login e cadastro                     |
| `src/app/(app)/`        | PH          | Ligas, time, rodada, classificação            |
| `src/app/api/`          | Igor        | Route handlers (a API)                        |
| `src/components/`       | PH          | Componentes de interface                      |
| `src/server/db/`        | Igor        | Cliente Prisma (singleton)                    |
| `src/server/services/`  | Igor        | Regras de negócio (pontuação, confrontos)     |
| `src/server/ingestion/` | Igor        | Coleta de dados do campeonato                 |
| `src/contracts/`        | **Os dois** | Schemas Zod da API — só muda com acordo       |
| `src/mocks/`            | PH          | Dados falsos que seguem os contratos          |
| `src/generated/`        | (gerado)    | Cliente Prisma gerado — nunca editar/commitar |

Cada pasta tem um `README.md` explicando seu papel. Regras de dependência:

- Front (`(auth)`, `(app)`, `components`, `mocks`) **nunca** importa de `src/server/`.
- `src/server/db` é `server-only`: importar em componente de cliente quebra o build.
- `src/contracts/` só importa `zod` (e outros contratos).

## Workflow do time

- `main` é protegida: nada entra sem Pull Request revisado pelo outro dev.
- Uma branch por tarefa, curta: `feat/...`, `fix/...`, `chore/...`, `docs/...`.
- Antes de começar: `git checkout main && git pull`, depois `git checkout -b <branch>`.
- Commits pequenos, [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
  em português. Ex.: `feat: adiciona tela de classificação`, `fix: corrige soma de pontos`.
- Segredos ficam em `.env.local` (ignorado) e nos Codespaces Secrets de cada um.
  O repo só tem `.env.example` com os nomes.
- Cada dev usa sua própria branch do Neon para desenvolvimento.
- Só o Igor altera `prisma/schema.prisma` e roda migrations. Se o PH precisar
  de algo no banco, pede ao Igor.

## Regras para IAs

1. Ler `AGENTS.md` e `docs/CONTEXTO.md` antes de qualquer tarefa.
2. Não alterar arquivos fora do território da tarefa atual. Não refatorar código
   não relacionado.
3. Mudanças em `src/contracts/` exigem aviso explícito no PR.
4. Nunca dar push na `main`; nunca commitar `.env*` (exceto `.env.example`) nem
   imprimir valores de variáveis de ambiente.
5. Só o Igor altera o schema do Prisma e roda migrations.
6. Ao terminar uma tarefa: adicionar entrada em `docs/HISTORICO.md` e atualizar
   `docs/CONTEXTO.md` se alguma decisão, estado ou próximo passo mudou.
7. Toda decisão técnica nova vai para a seção "Decisões tomadas" do
   `docs/CONTEXTO.md`, com data e motivo.
8. Antes de abrir PR: `npm run lint`, `npm run typecheck` e `npm run build`
   precisam passar (e `npm run format:check`, que o CI também roda).
9. Na dúvida sobre uma decisão de produto ou arquitetura, perguntar ao humano
   em vez de decidir sozinho.
10. Para ferramentas que mudam muito entre versões (Next.js 16, Prisma 7,
    Better Auth, Tailwind 4, Zod 4), consultar a documentação da versão
    instalada em vez de confiar na memória. Ver o bloco abaixo sobre Next.js.

## Notas técnicas

- **Prisma 7**: o cliente é importado de `@/generated/prisma/client`, nunca de
  `@prisma/client`. No código da aplicação, use sempre `import { db } from "@/server/db"`.
  A URL do banco para o CLI fica em `prisma.config.ts` (que lê `.env.local`).
- **npm 11 / allowScripts**: o `package.json` lista em `allowScripts` os pacotes
  autorizados a rodar scripts de instalação (hoje, `prisma` e `@prisma/engines`
  com versão fixa). Ao atualizar o Prisma, rode
  `npm install-scripts approve prisma @prisma/engines` para atualizar a lista.
- **Tipos de rota do Next 16**: `LayoutProps`/`PageProps` são globais gerados
  pelo `next typegen` (por isso o `typecheck` roda ele antes do `tsc`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
