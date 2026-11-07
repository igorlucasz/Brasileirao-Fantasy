# Contexto do projeto — Brasileirão Fantasy

> Estado vivo do projeto. Toda IA e todo dev deve ler este arquivo antes de uma
> tarefa e atualizá-lo quando uma decisão, o estado ou os próximos passos
> mudarem. O registro cronológico do que foi feito fica em [`HISTORICO.md`](HISTORICO.md).

_Última atualização: 2026-11-07 (Igor, autenticação com Better Auth)._

## 1. Visão geral

Plataforma web de fantasy football do Campeonato Brasileiro, com foco na temporada de
2027 e redraft anual. As regras do produto estão em [`GUIA.md`](GUIA.md), que é a
referência do projeto: em conflito de regra de produto, vale o guia.

Cada usuário monta uma equipe em um draft snake ao vivo, com jogadores reais exclusivos
na liga. As equipes pontuam conforme as partidas reais, e a cada rodada o usuário
enfrenta outro membro da liga em confronto direto (head-to-head).

Escopo inicial previsto (nada disso implementado ainda):

- Cadastro e login de usuários
- Criação de ligas e confrontos semanais entre usuários
- Draft ao vivo, Draft Board, perfil dos jogadores e painel de elenco
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
| Autenticação      | Better Auth                                     | Usuários ficam no nosso próprio banco (sem dependência de serviço externo).                                                                                               |
| Contratos da API  | Zod 4, em `src/contracts/`                      | Fonte única dos tipos compartilhados entre front e back, com validação em tempo de execução.                                                                              |
| Qualidade         | ESLint + Prettier, CI no GitHub Actions         | Padroniza código das duas IAs e dos dois devs; o CI barra PR quebrado.                                                                                                    |
| Hospedagem        | Vercel Hobby (grátis) por enquanto              | Integração nativa com Next.js e preview por PR. Limites conhecidos: cron só 1x/dia, uso não comercial, 1 dev no painel. Migrar para Railway ou Vercel Pro quando apertar. |
| Ingestão de dados | GitHub Action agendado chamando uma rota da API | Contorna o limite de cron da Vercel Hobby. **Implementar só no futuro.**                                                                                                  |

Versões instaladas no esqueleto: Next 16.4.5, React 19.3, Tailwind 4,
Prisma 7.10.1, Zod 4.6, Node 24 (mínimo 22.12), npm 11.

## 4. Decisões tomadas

| Data       | Decisão                                                                                              | Motivo                                                                                                                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-11-04 | Stack da seção 3 (Next.js fullstack, Tailwind, Neon, Prisma 7, Better Auth, Zod, Vercel Hobby)       | Ver coluna "Motivo" da seção 3.                                                                                                                                                                                                                  |
| 2026-11-04 | Neon em vez de Supabase                                                                              | Plano grátis do Supabase pausa projetos inativos; Neon tem branching de banco.                                                                                                                                                                   |
| 2026-11-04 | Divisão por territórios (pastas com dono) e `src/contracts/` compartilhado                           | Dois devs com duas IAs diferentes: evitar conflitos e deixar claro quem decide o quê.                                                                                                                                                            |
| 2026-11-04 | `main` protegida, PR com revisão do outro dev, branches curtas, Conventional Commits em português    | Workflow simples e seguro para iniciantes-intermediários.                                                                                                                                                                                        |
| 2026-11-04 | `AGENTS.md` é a fonte única de instruções; `CLAUDE.md` só contém `@AGENTS.md`                        | Codex lê `AGENTS.md`; Claude Code importa o mesmo arquivo. Evita duas versões divergentes das regras.                                                                                                                                            |
| 2026-11-04 | Prisma fixado na 7.10.1 (versão exata)                                                               | O `latest` do npm já aponta para o Prisma 8 (release candidate); decidimos usar a v7 estável. Atualizar só de propósito.                                                                                                                         |
| 2026-11-04 | Cliente Prisma gerado em `src/generated/prisma` (fora do Git), gerado no `postinstall`               | Padrão do Prisma 7 (`prisma-client` exige `output`). Gerar no install garante que CI e Vercel tenham o cliente sem commitar código gerado.                                                                                                       |
| 2026-11-04 | `prisma.config.ts` carrega `.env.local` via dotenv                                                   | O Next.js lê `.env.local`, mas o Prisma CLI não; assim os dois usam o mesmo arquivo.                                                                                                                                                             |
| 2026-11-04 | Cliente do banco em `src/server/db` com `server-only` e singleton em `globalThis`                    | Impede import acidental no front e evita múltiplos pools de conexão no hot reload do dev.                                                                                                                                                        |
| 2026-11-04 | Uma única `DATABASE_URL` (pooled) por enquanto                                                       | Simplicidade. Se migrations pelo pooler derem problema, adicionar uma URL direta separada só para o CLI (ver próximos passos).                                                                                                                   |
| 2026-11-04 | `typecheck` = `next typegen && tsc --noEmit`                                                         | No Next 16 os tipos `LayoutProps`/`PageProps` são gerados; `next-env.d.ts` não é versionado, então o `tsc` puro falha num clone limpo.                                                                                                           |
| 2026-11-04 | Prettier com `prettier-plugin-tailwindcss` e `printWidth` 100                                        | Ordena classes do Tailwind automaticamente, reduzindo diffs entre os dois devs.                                                                                                                                                                  |
| 2026-11-04 | `allowScripts` do npm 11 libera só `prisma` e `@prisma/engines`                                      | O npm 11 bloqueia scripts de instalação por padrão; o Prisma precisa do seu para baixar o schema engine (usado em migrations).                                                                                                                   |
| 2026-11-04 | Devcontainer: imagem Node 24; Claude Code pelo instalador nativo, Codex pelo npm                     | Instalador nativo é o método recomendado na doc do Claude Code; o pacote npm do Codex não depende de install scripts.                                                                                                                            |
| 2026-11-04 | Devcontainer com as features `git-lfs` e `github-cli`                                                | O Codespace instala hooks do Git LFS ao clonar; sem o `git-lfs` na imagem, commit e push falham. O `gh` permite às IAs abrir e consultar PRs.                                                                                                    |
| 2026-11-04 | Histórico da `main` reescrito uma vez (remoção do trailer `Co-Authored-By` dos commits do esqueleto) | Pedido do Igor. Exceção pontual: a regra de nunca dar push direto na `main` continua valendo.                                                                                                                                                    |
| 2026-11-04 | Neon: projeto `Brasileirao-Fantasy` (sa-east-1, PG 18); branches `production`, `dev-igor`, `dev-ph`  | Uma branch por dev isola os dados de desenvolvimento; `production` fica reservada para o deploy na Vercel.                                                                                                                                       |
| 2026-11-04 | `DATABASE_URL` de cada dev vem dos Codespaces Secrets; `.env.local` pode ficar com ela vazia         | Variável de ambiente já definida tem prioridade sobre o `.env.local` (Next e dotenv não sobrescrevem), então o segredo fica fora do disco.                                                                                                       |
| 2026-11-07 | Ruleset da `main`: PR e CI obrigatórios, sem aprovação; sem force push e sem exclusão da branch      | Cada dev cuida do seu território e revisar todo o código do outro atrasaria os dois. Substitui a revisão obrigatória de 2026-11-04. Mudanças em `src/contracts/` continuam exigindo acordo. O check exigido é `Lint, formatação, tipos e build`. |
| 2026-11-07 | Draft snake, com jogador exclusivo por equipe da liga                                                | Modelo do Sleeper, que inspira o projeto. Combina com o Draft Board e o painel de elenco. As demais regras ficam com o PH.                                                                                                                       |
| 2026-11-07 | Draft sincronizado por polling de 2 a 3 segundos, com prazo salvo no banco                           | A Vercel não é adequada para manter WebSockets abertos e funções serverless não guardam estado.                                                                                                                                                  |
| 2026-11-07 | Contrato antes da tela, com as regras do draft como dados                                            | O PH constrói com mocks sem esperar a API, e ajustar uma regra não muda o contrato.                                                                                                                                                              |
| 2026-11-07 | `docs/GUIA.md` é a referência do produto                                                             | Descreve como o site vai funcionar. Em conflito de regra de produto, os demais documentos se ajustam a ele.                                                                                                                                      |
| 2026-11-07 | Cada dev decide o merge dos próprios PRs, de forma independente                                      | Cada um cuida da sua parte, e a IA de cada dev só faz merge com autorização do seu dono. O PR serve para evitar mudanças indesejadas das IAs. Substitui a decisão de merge centralizado no Igor.                                                 |
| 2026-11-07 | Autenticação só com e-mail e senha, sem verificação nem recuperação por enquanto                     | Essas funções exigem um serviço de envio de e-mail, previsto para antes do lançamento público.                                                                                                                                                   |
| 2026-11-07 | Tabelas do Better Auth com nomes padrão em inglês; a API expõe nomes em português                    | Mantém a compatibilidade com o CLI da biblioteca. `/api/sessao` isola o front desses nomes.                                                                                                                                                      |
| 2026-11-07 | `better-auth` fixado na 1.7.18 (versão exata)                                                        | Evita mudanças não planejadas em autenticação, e o `prisma-adapter` acompanha a versão.                                                                                                                                                          |
| 2026-11-07 | Posições `GOL`, `DEF`, `MEI` e `ATA`; termo "equipe" para a equipe do fantasy                        | Seguem o glossário do guia.                                                                                                                                                                                                                      |
| 2026-11-07 | Consultas de jogadores dentro do draft (`/api/drafts/:id/jogadores`)                                 | Lista, rankings e situações congelam no início do draft, e a equipe proprietária depende da liga.                                                                                                                                                |
| 2026-11-07 | A sala do draft devolve `sigla: null` até o início                                                   | O guia proíbe revelar quais equipes têm sigla pendente; a proteção fica na API, não só na tela.                                                                                                                                                  |

## 5. Pontos em aberto (não decidir sem conversar)

- **Fonte dos dados reais do Brasileirão**: jogadores, partidas, scouts. API
  paga? Gratuita? Scraping? Impacta custo, legalidade e frequência de atualização.
- **Sistema de pontuação**: quais scouts valem pontos e quanto.
- **Formato de liga**: temporada regular e playoffs.
- **Lacunas do guia**: número de equipes, rodadas, limites por posição, momento do sorteio,
  regras de troca de escolhas, reservas no sorteio, desempate de projeções e decisão 265.
  O PH fecha esses pontos em `docs/GUIA.md`.
- **Escalação**: formação tática e trocas depois do draft. O guia ainda não trata disso.
- **Modelo de dados**: depende das regras do draft e da fonte de dados.
- **Custos futuros de hospedagem**: quando sair do Vercel Hobby e do plano grátis do Neon.

## 6. Estado atual

O que já existe e funciona (esqueleto, 2026-11-04):

- App Next.js 16 com App Router, TypeScript, Tailwind e alias `@/*`; página
  inicial provisória em português.
- ESLint + Prettier integrados; scripts `lint`, `format`, `format:check`, `typecheck`, `build`.
- Prisma 7 configurado para Neon, com cliente singleton em `src/server/db` e a primeira
  migration (`add_better_auth`) aplicada só na `dev-igor`.
- Autenticação com Better Auth: cadastro, login e logout por e-mail e senha.
- Endpoints `GET /api/health`, `GET /api/sessao` e rotas `/api/auth/*`.
- Neon: projeto `Brasileirao-Fantasy` em São Paulo (`aws-sa-east-1`, Postgres 18)
  com as branches `production` (padrão), `dev-igor` e `dev-ph` (as duas filhas da
  `production`). Conexão testada no Codespace do Igor pela URL pooled da `dev-igor`
  (query direta e `prisma migrate status` funcionam).
- Contratos Zod de jogador, equipe, draft, elenco e erro em `src/contracts/`, seguindo o guia.
- Estrutura de pastas por território, cada uma com `README.md`.
- `.env.example`, `.gitignore`, devcontainer, CI no GitHub Actions e template de PR.
- GitHub: PH (`pauloh-12`) já é colaborador do repositório e a `main` está protegida.
- `AGENTS.md`, `CLAUDE.md`, este arquivo e `HISTORICO.md`.

O que **não** existe ainda: modelos de negócio, endpoints do jogo, telas,
ingestão de dados, deploy na Vercel, tabelas no banco.

## 7. Próximos passos

### Configuração manual (Igor)

1. ~~Criar o projeto no Neon com branches de dev~~ (feito).
2. ~~Adicionar o PH como colaborador~~ (feito).
3. Passar ao PH, por canal privado, a connection string **pooled** da branch
   `dev-ph` (console do Neon → Connect → branch `dev-ph` → "Connection pooling" ligado).
4. ~~Proteger a `main` no GitHub (PR + CI obrigatórios)~~ (feito).
5. Conectar o repositório à Vercel (Hobby, funções em São Paulo `gru1`).
6. Antes de o PH integrar as telas de login, aplicar as migrations na `dev-ph`
   (`npm run db:deploy` com a URL dela). A `production` fica para a I9.
7. Cada dev define `BETTER_AUTH_SECRET` e `BETTER_AUTH_URL` no próprio ambiente
   (ver `.env.example`). A produção usa um segredo próprio.

### Onboarding do PH (checklist)

1. Aceitar o convite do repositório e criar um Codespace na `main` (ver README).
2. Fazer login no Codex dentro do Codespace (`codex` e seguir as instruções).
3. Cadastrar `DATABASE_URL` (branch `dev-ph`) nos Codespaces Secrets. **Não é
   obrigatório para começar**: as telas usam mocks e o build funciona sem banco.
4. Rodar `npm run dev` e abrir a porta 3000.
5. Pedir ao Codex para ler `AGENTS.md` e este arquivo antes da primeira tarefa.
6. Se já tinha clonado o repo antes de 2026-11-04 (reescrita da `main`), rodar
   `git fetch && git checkout main && git reset --hard origin/main`.

### Tarefas atuais

As listas estão em ordem. Tarefas sem dependência entre si podem andar em paralelo.

#### PH (front-end)

| Ordem | Tarefa                     | Entrega                                          | Depende de |
| ----- | -------------------------- | ------------------------------------------------ | ---------- |
| P1    | `feat/layout-e-telas-auth` | Layout, navegação, login e cadastro (só visual)  | Nada       |
| P2    | `docs/lacunas-guia`        | Formato do Draft: fechar as lacunas de `GUIA.md` | Nada       |
| P3    | `feat/perfil-jogadores`    | Perfil completo (guia, seções 3 e 4), com mocks  | I1 (feita) |
| P4    | `feat/draft-board`         | Draft Board (guia, seções 5 e 6), com mocks      | I1 (feita) |
| P5    | `feat/painel-elenco`       | Painel de elenco (guia, seção 7), com mocks      | I1 (feita) |

Detalhes de P1:

- Layout da área logada em `src/app/(app)/layout.tsx`: cabeçalho, navegação
  (Ligas, Meu time, Rodada, Classificação) e tema base em `src/app/globals.css`.
- Telas `/login` e `/cadastro` em `src/app/(auth)/`, com layout próprio. Campos
  sugeridos: login com e-mail e senha; cadastro com nome, e-mail, senha e
  confirmação de senha (Better Auth usa e-mail e senha por padrão).
- Formulários com validação só visual; o envio não chama nenhuma API ainda.
- Componentes reutilizáveis (botão, campo de formulário, cabeçalho) em `src/components/`.
- Pode substituir a página inicial provisória (`src/app/page.tsx`).
- Não precisa de contratos nem mocks nesta tarefa.

Detalhes de P2: `docs/GUIA.md` já define o formato do draft. Falta fechar com o Igor as
lacunas listadas na seção 5, registrando cada decisão no próprio guia. Não depende de código.

#### Igor (back-end)

| Ordem  | Tarefa                      | Entrega                                                        | Depende de  |
| ------ | --------------------------- | -------------------------------------------------------------- | ----------- |
| ~~I1~~ | `feat/contratos-draft`      | Contratos de jogador, equipe, draft e elenco (feito)           | Nada        |
| ~~I2~~ | `chore/auth-better-auth`    | Better Auth, primeira migration, `/api/health`, sessão (feito) | Nada        |
| I3     | Pesquisa                    | Fonte de dados do Brasileirão, com a decisão registrada aqui   | Nada        |
| I4     | `feat/modelo-dados`         | Modelos de campeonato, liga, draft e elenco                    | I2 e P2     |
| I5     | `feat/ingestao-jogadores`   | Carga de clubes e jogadores                                    | I3 e I4     |
| I6     | `feat/api-ligas`            | Criar liga, convidar e entrar                                  | I4          |
| I7     | `feat/api-draft`            | Motor do draft e endpoints                                     | I4 e I6     |
| I8     | `feat/api-jogadores-elenco` | Endpoints de jogadores e elenco                                | I4 e I5     |
| I9     | `chore/deploy-vercel`       | Deploy em produção (Vercel Hobby, `gru1`)                      | Em paralelo |

Os contratos tratam regras como dados (`rodadas`, `segundosPorEscolha`, `composicaoElenco`),
então fechar as lacunas de P2 não deve mudar o formato deles.

#### Integração e fases seguintes

- Ligar login e cadastro com `authClient` (`src/lib/auth-client.ts`), validando com os
  schemas de `src/contracts/sessao.ts`. Depende do item 6 da configuração manual.
- Ligar perfil, Draft Board e elenco aos endpoints reais, com um PR do PH para
  cada um, conforme I7 e I8 ficarem prontos.
- Antes do lançamento público: serviço de e-mail para verificação de conta e recuperação
  de senha.
- Depois do draft: pontuação, escalação, confrontos e classificação. Exigem fechar os
  pontos em aberto de pontuação e formato de liga.

### Pendências técnicas para lembrar

- A primeira migration funcionou pela URL pooled, então não é preciso uma URL direta.
- Codespaces criados antes da feature `git-lfs` no devcontainer precisam de
  **Rebuild Container** (ou apagar os hooks em `.git/hooks`) para commit e push
  funcionarem.

## 8. Arquitetura

Um único app Next.js contém o front e a API, e um único deploy na Vercel publica os dois.

```text
Navegador
  telas React (Client Components) e HTML vindo dos Server Components
        | HTTPS: JSON validado pelos contratos Zod
        v
Vercel (funções serverless em São Paulo, gru1)
  src/app/(app) e (auth)   telas                 PH
  src/app/api              route handlers        Igor
  src/server/services      regras de negócio     Igor
  src/server/db            cliente Prisma        Igor
        | SQL pelo pooler do Neon
        v
Neon (PostgreSQL em São Paulo)
        ^
        | grava clubes, jogadores, partidas e scouts
src/server/ingestion  <-- rota protegida  <-- GitHub Action agendado
        ^
        | busca os dados
Fonte externa do Brasileirão (ainda não definida)
```

### Caminho de uma requisição

Exemplo: escolher um jogador no draft.

1. A tela chama `POST /api/drafts/:id/escolhas`.
2. O route handler confere a sessão do Better Auth e valida o corpo com o Zod.
3. O service `draft` confere se é a vez da equipe e se o jogador está livre.
4. O Prisma grava a escolha em uma transação no Neon.
5. A resposta volta no formato do contrato, e a tela atualiza.

Serverless não mantém processo ligado: cada requisição pode rodar em uma instância
nova, então todo estado compartilhado fica no banco. Com `cacheComponents` ativo, os
dados são dinâmicos por padrão e o cache é opcional; dados do usuário não são cacheados.

### Draft

- **Sincronização:** a tela consulta `GET /api/drafts/:id` a cada 2 ou 3 segundos.
- **Relógio:** o banco guarda o prazo da escolha atual como data absoluta. A tela só faz
  a contagem regressiva, e quem decide é o servidor.
- **Disputa:** índices únicos em `(draftId, jogadorId)` e `(draftId, numeroEscolha)`
  impedem que o mesmo jogador vá para duas equipes em requisições simultâneas.
- **Tempo esgotado:** o draft não para, nem com todos offline. A próxima requisição aplica
  em sequência todos os Auto-Picks vencidos, usando o prazo de cada um, e o resultado é o
  mesmo de um draft contínuo.
- **Custo:** o polling consome funções da Vercel e computação do Neon. Se apertar, um
  serviço de tempo real pode substituir a sincronização sem mudar as regras.

### Dados planejados

- **Campeonato:** `Clube`, `Jogador`, `Partida`, `Scout`.
- **Usuários:** tabelas do Better Auth.
- **Liga:** `Liga`, `MembroLiga`.
- **Draft:** `Draft`, `EscolhaDraft`.
- **Elenco:** `JogadorElenco`, criado pelas escolhas do draft.
- **Depois:** `Escalacao`, `PontuacaoRodada`, `Confronto`.
