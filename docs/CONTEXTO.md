# Contexto do projeto — Brasileirão Fantasy

> Estado vivo do projeto. Toda IA e todo dev deve ler este arquivo antes de uma
> tarefa e atualizá-lo quando uma decisão, o estado ou os próximos passos
> mudarem. O registro cronológico do que foi feito fica em [`HISTORICO.md`](HISTORICO.md).

_Última atualização: 2026-11-07 (PH, P1: layout e telas de acesso)._

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
| 2026-11-07 | Draft snake, com jogador exclusivo por time da liga                                                  | Modelo do Sleeper, que inspira o projeto. Combina com o Draft Board e o painel de elenco. As demais regras ficam com o PH.                                                                                                                       |
| 2026-11-07 | Draft sincronizado por polling de 2 a 3 segundos, com prazo salvo no banco                           | A Vercel não é adequada para manter WebSockets abertos e funções serverless não guardam estado.                                                                                                                                                  |
| 2026-11-07 | Contrato antes da tela, com as regras do draft como dados                                            | O PH constrói com mocks sem esperar a API, e ajustar uma regra não muda o contrato.                                                                                                                                                              |

Decisão de interface de 2026-11-07 (P1): tema base escuro com destaque verde,
fundo global `#090a18` (azulado mais escuro, a pedido do PH),
componentes compartilhados e layouts separados para acesso e aplicativo. Mantém a
identidade visual consistente; somente formulários e navegação ativa usam componentes
cliente. As rotas do aplicativo são prévias públicas até a integração do Better Auth.

Decisão de interface de 2026-11-07 (DORMINHOCO): a tela inicial passa a seguir a
receita visual do PH: verde-esmeralda, arcos amarelo e azul, coroa geométrica,
Montserrat ExtraBold e somente os links Criar conta e Entrar na página inicial.
A pedido do PH, a identidade se estende também ao login, cadastro e às quatro abas:
fundo esmeralda, superfícies verdes, ações amarelas, coroa e marca DORMINHOCO,
com Montserrat global. Substitui o tema anterior em todas as telas. Os formulários
seguem visuais até I2; os arcos são menores nas páginas internas para priorizar o conteúdo.

Decisão de navegação de 2026-11-07 (PH): as abas passam a ser Partida (comparação
com o elenco adversário), Elenco (seu time), Jogadores (informações e waiver) e
Liga (confrontos da rodada e classificação). As rotas antigas redirecionam para
as novas áreas. As funcionalidades com dados reais (comparação, waiver e dados
da liga) serão integradas nas próximas tarefas; a apresentação está em prévia.

Decisão de interface de 2026-11-07 (PH): prévia da experiência dentro de uma liga,
com perfil PH, time PH FC e Liga dos Amigos. Partida compara amostras de elencos;
Elenco mostra jogadores; Jogadores permite busca, filtro e expansão de informações;
Liga apresenta confrontos e classificação ilustrativos. Exemplos de apresentação
ficam nos componentes, pois não existem contratos; não são mocks de API. Não há
sessão real, cadastro, pontuação oficial ou aquisição no waiver. Os resultados exibidos não definem regras de pontuação.

Decisão de produto de 2026-11-07 (PH): cada elenco terá **14 jogadores**, sendo
**9 titulares: 1 GOL, 3 DEF, 3 MEI e 2 ATA**, mais **5 reservas**. Definição
explícita do PH, aplicada à prévia de Elenco e aos dois times na aba Partida.
As **5 vagas de reserva são livres por posição**, sem mínimo ou máximo por posição
dentro dessas vagas (por exemplo: 4 ATA e 1 GOL), conforme esclarecimento do PH
em 2026-11-07. Regras de substituição e pontuação do banco continuam em aberto. Os placares da prévia somam apenas os titulares como exemplo,
sem estabelecer a regra definitiva. Contratos e banco não foram alterados.

Decisão de 2026-11-07 (PH): implementação e prévia do Draft Board removidas
por solicitação do usuário, restaurando a interface anterior. Permanecem Partida,
Elenco, Jogadores e Liga, com 9 titulares e 5 reservas livres por posição.
A pesquisa de fornecedores iniciada foi cancelada, sem alteração de back-end,
schema, contratos ou banco.

Decisão visual de 2026-11-07 (PH): etiquetas de posição em Partida, Elenco e
Jogadores usam fundo vermelho para ATA, verde para MEI, azul para DEF e roxo
para GOL, com abreviação branca legível. Paleta centralizada no tema CSS.

## 5. Pontos em aberto (não decidir sem conversar)

- **Fonte dos dados reais do Brasileirão**: jogadores, partidas, scouts. API
  paga? Gratuita? Scraping? Impacta custo, legalidade e frequência de atualização.
- **Sistema de pontuação**: quais scouts valem pontos e quanto.
- **Formato de liga**: número de times, temporada regular, playoffs?
- **Regras do draft**: rodadas, tempo por escolha, ordem inicial
  e tempo esgotado. O PH propõe em `docs/REGRAS-DRAFT.md` (snake e exclusividade já
  estão decididos).
- **Escalação**: titulares definidos em 1 GOL, 3 DEF, 3 MEI e 2 ATA; faltam
  5 reservas de qualquer posição; faltam regras de troca e pontuação do banco.
- **Modelo de dados**: depende das regras do draft e da fonte de dados.
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
- GitHub: PH (`pauloh-12`) já é colaborador do repositório e a `main` está protegida.
- `AGENTS.md`, `CLAUDE.md`, este arquivo e `HISTORICO.md`.

P1 implementado: página inicial, tema base, navegação responsiva, layouts de acesso
e aplicativo, login e cadastro com validação visual. Rotas `/partida`, `/elenco`,
`/jogadores` e `/liga` têm prévias com PH, PH FC e Liga dos Amigos. Os dados são
exemplos fictícios de apresentação, sem formato de API ou regra de negócio.
Nenhum formulário envia dados ou cria sessão/conta.

O que **não** existe ainda: autenticação, modelos de banco, endpoints, telas de negócio,
ingestão de dados, deploy na Vercel, tabelas no banco.

## 7. Próximos passos

### Configuração manual (Igor)

1. ~~Criar o projeto no Neon com branches de dev~~ (feito).
2. ~~Adicionar o PH como colaborador~~ (feito).
3. Passar ao PH, por canal privado, a connection string **pooled** da branch
   `dev-ph` (console do Neon → Connect → branch `dev-ph` → "Connection pooling" ligado).
4. ~~Proteger a `main` no GitHub (PR + CI obrigatórios)~~ (feito).
5. Conectar o repositório à Vercel (Hobby, funções em São Paulo `gru1`).

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

| Ordem | Tarefa                     | Entrega                                                  | Depende de |
| ----- | -------------------------- | -------------------------------------------------------- | ---------- |
| P1    | `feat/layout-e-telas-auth` | Implementado: layout, navegação, login e cadastro visual | Nada       |
| P2    | `docs/regras-draft`        | Formato do Draft: `docs/REGRAS-DRAFT.md`                 | Nada       |
| P3    | `feat/perfil-jogadores`    | Lista, busca e perfil de jogadores, com mocks            | I1         |
| P4    | `feat/draft-board`         | Draft Board e sala do draft, com simulação em mock       | I1         |
| P5    | `feat/painel-elenco`       | Painel de elenco, com mocks                              | I1         |

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

Detalhes de P2: o documento define número de rodadas, tempo por escolha, composição
do elenco, ordem inicial e o que acontece se o tempo acabar ou alguém faltar. O PH
propõe e combina com o Igor. Não depende de código.

#### Igor (back-end)

| Ordem | Tarefa                      | Entrega                                                            | Depende de  |
| ----- | --------------------------- | ------------------------------------------------------------------ | ----------- |
| I1    | `feat/contratos-draft`      | Contratos de jogador, draft e elenco, combinados com o PH          | Nada        |
| I2    | `chore/auth-better-auth`    | Better Auth, primeira migration, `/api/health`, contrato de sessão | Nada        |
| I3    | Pesquisa                    | Fonte de dados do Brasileirão, com a decisão registrada aqui       | Nada        |
| I4    | `feat/modelo-dados`         | Modelos de campeonato, liga, draft e elenco                        | I2 e P2     |
| I5    | `feat/ingestao-jogadores`   | Carga de clubes e jogadores                                        | I3 e I4     |
| I6    | `feat/api-ligas`            | Criar liga, convidar e entrar                                      | I4          |
| I7    | `feat/api-draft`            | Motor do draft e endpoints                                         | I4 e I6     |
| I8    | `feat/api-jogadores-elenco` | Endpoints de jogadores e elenco                                    | I4 e I5     |
| I9    | `chore/deploy-vercel`       | Deploy em produção (Vercel Hobby, `gru1`)                          | Em paralelo |

I1 vem primeiro porque libera P3, P4 e P5. As regras entram como dados
(`rodadas`, `segundosPorEscolha`, `composicaoElenco`), então os contratos usam
valores provisórios e não esperam P2.

#### Integração e fases seguintes

- Ligar auth, perfil, Draft Board e elenco aos endpoints reais, com um PR do PH para
  cada um, conforme I2, I7 e I8 ficarem prontos.
- Depois do draft: pontuação, escalação, confrontos e classificação. Exigem fechar os
  pontos em aberto de pontuação e formato de liga.

### Pendências técnicas para lembrar

- `prisma migrate status` funcionou pela URL pooled; confirmar o mesmo com o
  primeiro `prisma migrate dev`. Se der problema, adicionar uma variável com a
  URL direta (sem `-pooler`) usada só pelo `prisma.config.ts`.
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
3. O service `draft` confere se é a vez do time e se o jogador está livre.
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
  impedem que o mesmo jogador vá para dois times em requisições simultâneas.
- **Tempo esgotado:** a próxima requisição detecta o prazo vencido e faz a escolha
  automática na mesma transação. Sem ninguém na sala, o draft só avança quando alguém
  voltar, o que é aceitável para ligas de amigos.
- **Custo:** o polling consome funções da Vercel e computação do Neon. Se apertar, um
  serviço de tempo real pode substituir a sincronização sem mudar as regras.

### Dados planejados

- **Campeonato:** `Clube`, `Jogador`, `Partida`, `Scout`.
- **Usuários:** tabelas do Better Auth.
- **Liga:** `Liga`, `MembroLiga`.
- **Draft:** `Draft`, `EscolhaDraft`.
- **Elenco:** `JogadorElenco`, criado pelas escolhas do draft.
- **Depois:** `Escalacao`, `PontuacaoRodada`, `Confronto`.
