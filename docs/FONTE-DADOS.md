# Fonte de dados

> Decisão de 2026-11-07: usar a API do Cartola, com possibilidade de troca no futuro.
> Tudo abaixo foi testado nessa data, com a temporada 2026 na rodada 35, salvo indicação.

A API não é oficial nem documentada. Esta página registra o que observamos, não um contrato:
os campos podem mudar sem aviso.

## Rotas

Base: `https://api.cartola.globo.com`. As rotas abaixo responderam sem autenticação.

| Rota                         | Uso                                     | Observação                           |
| ---------------------------- | --------------------------------------- | ------------------------------------ |
| `/atletas/mercado`           | Jogadores, posição, status              | 790 atletas                          |
| `/clubes`                    | Nome e sigla dos clubes                 | 68 clubes, inclusive fora da Série A |
| `/rodadas`                   | Início e fim das rodadas                | 38 rodadas                           |
| `/partidas/:rodada`          | Partidas e os clubes da rodada          | 10 partidas e exatamente 20 clubes   |
| `/atletas/pontuados/:rodada` | Eventos por jogador em rodada encerrada | Testada nas rodadas 1 e 34           |
| `/atletas/pontuados`         | Eventos da rodada em andamento          | Responde 204 com o mercado aberto    |
| `/mercado/status`            | Temporada, rodada atual, fechamento     | `status_mercado` indica a fase       |

Para saber quais clubes estão na Série A, use `/partidas`, não `/clubes`.

## Mapeamentos para os contratos

| Cartola                      | `src/contracts/jogador.ts` |
| ---------------------------- | -------------------------- |
| `gol`                        | `GOL`                      |
| `lat`, `zag`                 | `DEF`                      |
| `mei`                        | `MEI`                      |
| `ata`                        | `ATA`                      |
| `tec`                        | Fora do jogo               |
| Suspenso                     | `suspenso`                 |
| Contundido                   | `lesionado`                |
| Dúvida                       | `duvida`                   |
| Provável, Nulo ou sem status | `null`                     |

## O que a fonte não entrega

| Necessidade do guia    | Solução                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| Projeções e rankings   | Calculados por nós a partir do histórico (tarefa I11)                       |
| Cor principal do clube | Cadastro próprio; `/clubes` não tem esse campo                              |
| Foto e escudo          | Não usamos os do Cartola; a tela usa silhueta e os contratos aceitam `null` |
| Número da camisa       | Não aparece em `/atletas/mercado`; o contrato aceita `null`                 |

## Eventos

Códigos vistos em `/atletas/pontuados/34`:

`A`, `CA`, `CV`, `DE`, `DS`, `FC`, `FD`, `FF`, `FS`, `FT`, `G`, `GC`, `GS`, `I`, `PC`, `PP`, `PS`,
`SG`, `V`

A rota traz a quantidade de cada evento por jogador. A nossa pontuação usa essas quantidades com
valores próprios, que ainda serão definidos. Não copiamos `pontuacao` nem a tabela do Cartola.
Os significados e a lista completa devem ser confirmados na I5.

## Riscos

- **Autorização:** não encontramos documentação oficial nem conseguimos ler os termos de uso. Não
  há confirmação de que esse uso seja permitido, e a API pertence a um concorrente direto.
- **Produto público:** o projeto será aberto em 2027, então a exposição é maior do que em ligas
  privadas. Antes do lançamento, é preciso revisar os termos do Cartola e buscar orientação jurídica
  sobre a API e sobre nomes de atletas e clubes.
- **Estabilidade:** campos e rotas podem mudar, e o acesso pode ser bloqueado sem aviso.
- **Temporada:** todas as respostas observadas são de 2026. A API parece expor só a temporada
  atual, então o histórico precisa ser guardado antes da virada (tarefa I10).

## Regras de uso

- Consultar o mínimo necessário e com pausa entre as chamadas. As telas nunca chamam o Cartola.
- Toda leitura passa pelo nosso banco, alimentado pela ingestão agendada.
- Não usar imagens da Globo nem o nome ou a marca do Cartola no produto.
- Guardar a resposta bruta, para reprocessar os dados sem nova consulta.

## Como trocar a fonte

A ingestão expõe uma interface própria em `src/server/ingestion/`, e o Cartola é só uma implementação.
Os dados são convertidos para o nosso formato antes de ir ao banco, com ids próprios ligados ao id
externo. Assim, a troca fica restrita ao adaptador.

Alternativas avaliadas:

| Fonte             | Situação                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| API-Football      | API oficial e principal alternativa. Plano grátis e pagos a partir de cerca de US$ 19/mês; a cobertura da Série A não foi testada |
| Sportmonks        | API oficial, a partir de €29/mês para 5 ligas. Falta confirmar a Série A nesse plano                                              |
| football-data.org | Série A no plano grátis, mas sem estatísticas por jogador                                                                         |
| SofaScore         | Sem API oficial pública; descartado                                                                                               |

Preços vistos em 2026-11-07. O da API-Football vem de um guia do próprio fornecedor, pois a página de
preços não abriu.

## Pontos a confirmar na I5

- **Partidas adiadas:** a rodada 34 teve uma partida com `valida: false`, mas o significado desse
  campo ainda não foi confirmado.
- **Virada de temporada:** quando a API zera e o que ela responde na pré-temporada.
- **Acesso:** se a API responde a partir do GitHub Actions. Os testes foram feitos em um Codespace.
- **Status:** se ele continua atualizado depois do início da temporada e durante as rodadas.

## Fontes consultadas

- [football-data.org: cobertura](https://www.football-data.org/coverage) e
  [preços](https://www.football-data.org/pricing)
- [Sportmonks: planos](https://www.sportmonks.com/football-api/plans-pricing) e
  [Série A do Brasil](https://www.sportmonks.com/football-api/serie-a-api-brazil/)
- [API-Football: guia inicial](https://www.api-football.com/news/post/how-to-get-started-with-api-football-the-complete-beginners-guide)
- [TabNews: endpoints do Cartola](https://www.tabnews.com.br/maiconfriedel/375c9291-df03-47e3-8c37-ec0461219365)
- [Mattos Filho: Lei Geral do Esporte](https://www.mattosfilho.com.br/unico/nova-lei-geral-esporte/)
