# Contexto do projeto — Brasileirão Fantasy

> Estado vivo do projeto. Toda IA e todo dev deve ler este arquivo antes de uma
> tarefa e atualizá-lo quando uma decisão, o estado ou os próximos passos
> mudarem. O registro cronológico do que foi feito fica em [`HISTORICO.md`](HISTORICO.md).

_Última atualização: 2026-11-04 (Igor, setup do Neon)._

## 1. Visão geral

Plataforma web de fantasy football do Campeonato Brasileiro (Brasileirão),
inspirada no fantasy do Sleeper. O usuário monta um time com jogadores reais de
clubes diferentes; conforme esses jogadores pontuam nas partidas reais, o
usuário pontua. A cada rodada, ele enfrenta outro usuário da liga em confronto
direto (head-to-head).

Escopo inicial previsto (nada disso implementado ainda):

- Cadastro e login de usuários
- Criação de ligas e confrontos semanais entre usuários
- Montagem e gestão de time (escalação, troca de jogadores)
- Pontuação automática com base nos dados das partidas reais
- Classificação da liga e resultados por rodada

## 2. Equipe

| Pessoa | Papel                                                                                               | Ferramenta de IA |
| ------ | --------------------------------------------------------------------------------------------------- | ---------------- |
| Igor   | Infraestrutura e back-end completos: banco, API, ingestão de dados do campeonato, pontuação, deploy | Claude Code      |
| PH     | Front-end e features do app: telas, fluxos de usuário, interface                                    | Codex            |

- Os dois são iniciantes-intermediários; cada um trabalha no seu próprio GitHub Codespace.
- **A API é o contrato entre as duas partes** e precisa ser bem documentada e
  estável. O PH desenvolve telas com dados mock que seguem os contratos
  (`src/contracts/`) enquanto o Igor implementa os endpoints reais.

## 3. Stack (e por quê)

| Camada            | Escolha                                         | Motivo                                                                                                                                                                    |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework         | Next.js 16 (App Router), fullstack, TypeScript  | Front e API no mesmo projeto e no mesmo deploy; um repositório só para os dois devs; TypeScript compartilha tipos entre front e back.                                     |
| Estilo            | Tailwind CSS 4                                  | Padrão do create-next-app, rápido de iterar, muito material de referência.                                                                                                |
| Banco             | PostgreSQL no Neon, região São Paulo            | Escolhido em vez do Supabase porque o plano grátis do Supabase pausa projetos inativos. O Neon permite uma branch do banco por branch do Git / por dev.                   |
| ORM               | Prisma 7 (sem motor Rust)                       | Mais usado no mercado e melhor documentado. A v7 usa cliente em TypeScript + driver adapter (`@prisma/adapter-neon`), mais leve em serverless.                            |
| Autenticação      | Better Auth                                     | Usuários ficam no nosso próprio banco (sem dependência de serviço externo). **Ainda não implementado.**                                                                   |
| Contratos da API  | Zod 4, em `src/contracts/`                      | Fonte única dos tipos compartilhados entre front e back, com validação em tempo de execução.                                                                              |
| Qualidade         | ESLint + Prettier, CI no GitHub Actions         | Padroniza código das duas IAs e dos dois devs; o CI barra PR quebrado.                                                                                                    |
| Hospedagem        | Vercel Hobby (grátis) por enquanto              | Integração nativa com Next.js e preview por PR. Limites conhecidos: cron só 1x/dia, uso não comercial, 1 dev no painel. Migrar para Railway ou Vercel Pro quando apertar. |
| Ingestão de dados | GitHub Action agendado chamando uma rota da API | Contorna o limite de cron da Vercel Hobby. **Implementar só no futuro.**                                                                                                  |

Versões instaladas no esqueleto: Next 16.4.5, React 19.3, Tailwind 4,
Prisma 7.10.1, Zod 4.6, Node 24 (mínimo 22.12), npm 11.

## 4. Decisões tomadas

| Data       | Decisão                                                                                             | Motivo                                                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-11-04 | Stack da seção 3 (Next.js fullstack, Tailwind, Neon, Prisma 7, Better Auth, Zod, Vercel Hobby)      | Ver coluna "Motivo" da seção 3.                                                                                                            |
| 2026-11-04 | Neon em vez de Supabase                                                                             | Plano grátis do Supabase pausa projetos inativos; Neon tem branching de banco.                                                             |
| 2026-11-04 | Divisão por territórios (pastas com dono) e `src/contracts/` compartilhado                          | Dois devs com duas IAs diferentes: evitar conflitos e deixar claro quem decide o quê.                                                      |
| 2026-11-04 | `main` protegida, PR com revisão do outro dev, branches curtas, Conventional Commits em português   | Workflow simples e seguro para iniciantes-intermediários.                                                                                  |
| 2026-11-04 | `AGENTS.md` é a fonte única de instruções; `CLAUDE.md` só contém `@AGENTS.md`                       | Codex lê `AGENTS.md`; Claude Code importa o mesmo arquivo. Evita duas versões divergentes das regras.                                      |
| 2026-11-04 | Prisma fixado na 7.10.1 (versão exata)                                                              | O `latest` do npm já aponta para o Prisma 8 (release candidate); decidimos usar a v7 estável. Atualizar só de propósito.                   |
| 2026-11-04 | Cliente Prisma gerado em `src/generated/prisma` (fora do Git), gerado no `postinstall`              | Padrão do Prisma 7 (`prisma-client` exige `output`). Gerar no install garante que CI e Vercel tenham o cliente sem commitar código gerado. |
| 2026-11-04 | `prisma.config.ts` carrega `.env.local` via dotenv                                                  | O Next.js lê `.env.local`, mas o Prisma CLI não; assim os dois usam o mesmo arquivo.                                                       |
| 2026-11-04 | Cliente do banco em `src/server/db` com `server-only` e singleton em `globalThis`                   | Impede import acidental no front e evita múltiplos pools de conexão no hot reload do dev.                                                  |
| 2026-11-04 | Uma única `DATABASE_URL` (pooled) por enquanto                                                      | Simplicidade. Se migrations pelo pooler derem problema, adicionar uma URL direta separada só para o CLI (ver próximos passos).             |
| 2026-11-04 | `typecheck` = `next typegen && tsc --noEmit`                                                        | No Next 16 os tipos `LayoutProps`/`PageProps` são gerados; `next-env.d.ts` não é versionado, então o `tsc` puro falha num clone limpo.     |
| 2026-11-04 | Prettier com `prettier-plugin-tailwindcss` e `printWidth` 100                                       | Ordena classes do Tailwind automaticamente, reduzindo diffs entre os dois devs.                                                            |
| 2026-11-04 | `allowScripts` do npm 11 libera só `prisma` e `@prisma/engines`                                     | O npm 11 bloqueia scripts de instalação por padrão; o Prisma precisa do seu para baixar o schema engine (usado em migrations).             |
| 2026-11-04 | Devcontainer: imagem Node 24; Claude Code pelo instalador nativo, Codex pelo npm                    | Instalador nativo é o método recomendado na doc do Claude Code; o pacote npm do Codex não depende de install scripts.                      |
| 2026-11-04 | Neon: projeto `Brasileirao-Fantasy` (sa-east-1, PG 18); branches `production`, `dev-igor`, `dev-ph` | Uma branch por dev isola os dados de desenvolvimento; `production` fica reservada para o deploy na Vercel.                                 |
| 2026-11-04 | `DATABASE_URL` de cada dev vem dos Codespaces Secrets; `.env.local` pode ficar com ela vazia        | Variável de ambiente já definida tem prioridade sobre o `.env.local` (Next e dotenv não sobrescrevem), então o segredo fica fora do disco. |

## 5. Pontos em aberto (não decidir sem conversar)

- **Fonte dos dados reais do Brasileirão**: jogadores, partidas, scouts. API
  paga? Gratuita? Scraping? Impacta custo, legalidade e frequência de atualização.
- **Sistema de pontuação**: quais scouts valem pontos e quanto.
- **Formato de liga**: número de times, temporada regular, playoffs?
- **Draft / escalação**: draft (snake? leilão?) ou mercado livre com orçamento?
  Jogador exclusivo por time na liga (estilo Sleeper) ou não? Formação tática?
- **Modelo de dados**: depende dos pontos acima.
- **Custos futuros de hospedagem**: quando sair do Vercel Hobby e do plano grátis do Neon.

## 6. Estado atual

O que já existe e funciona (esqueleto, 2026-11-04):

- App Next.js 16 com App Router, TypeScript, Tailwind e alias `@/*`; página
  inicial provisória em português.
- ESLint + Prettier integrados; scripts `lint`, `format`, `format:check`, `typecheck`, `build`.
- Prisma 7 configurado para Neon (schema **sem modelos**, nenhuma migration,
  cliente singleton em `src/server/db`).
- Neon: projeto `Brasileirao-Fantasy` em São Paulo (`aws-sa-east-1`, Postgres 18)
  com as branches `production` (padrão), `dev-igor` e `dev-ph` (as duas filhas da
  `production`). Conexão testada no Codespace do Igor pela URL pooled da `dev-igor`
  (query direta e `prisma migrate status` funcionam).
- Zod instalado; `src/contracts/README.md` com exemplo comentado (nenhum contrato real ainda).
- Estrutura de pastas por território, cada uma com `README.md`.
- `.env.example`, `.gitignore`, devcontainer, CI no GitHub Actions e template de PR.
- `AGENTS.md`, `CLAUDE.md`, este arquivo e `HISTORICO.md`.

O que **não** existe ainda: autenticação, modelos de banco, endpoints, telas,
ingestão de dados, deploy na Vercel, tabelas no banco.

## 7. Próximos passos

Configuração manual (Igor):

1. ~~Criar o projeto no Neon com branches de dev~~ (feito). Falta: copiar a
   connection string **pooled** da branch `dev-ph` no console do Neon (Connect →
   branch `dev-ph` → "Connection pooling" ligado) e passar ao PH por canal privado,
   para ele cadastrar como `DATABASE_URL` nos Codespaces Secrets dele.
2. Proteger a `main` no GitHub (PR + 1 aprovação + CI obrigatório).
3. Adicionar o PH como colaborador.
4. Conectar o repositório à Vercel (Hobby, funções em São Paulo `gru1`).

Primeiras tarefas sugeridas:

- **Igor**: `chore/auth-better-auth` — modelos de usuário/sessão do Better Auth,
  primeira migration, rotas de auth e um endpoint `GET /api/health` que testa a
  conexão com o banco. Em paralelo, pesquisar a fonte de dados do Brasileirão.
- **PH**: `feat/layout-e-telas-auth` — layout base do app (cabeçalho, navegação,
  tema) e telas de login/cadastro só com interface, sem integração.
- **Os dois**: conversa para fechar pontuação, formato de liga e draft, e
  definir os primeiros contratos em `src/contracts/` (usuário, liga, time).

Pendências técnicas para lembrar:

- `prisma migrate status` funcionou pela URL pooled; confirmar o mesmo com o
  primeiro `prisma migrate dev`. Se der problema, adicionar uma variável com a
  URL direta (sem `-pooler`) usada só pelo `prisma.config.ts`.
