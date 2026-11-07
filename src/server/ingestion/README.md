# `src/server/ingestion/` — coleta de dados do campeonato

**Território: Igor.**

Código que busca dados reais do Brasileirão (clubes, jogadores, partidas,
scouts) numa fonte externa e grava no nosso banco.

Plano (ainda não implementado): um GitHub Action agendado chama uma rota
protegida da API, que dispara a ingestão definida aqui.

A fonte atual é a API do Cartola, que não é oficial. A ingestão deve expor uma interface
própria, com o Cartola como uma implementação, para que a fonte possa ser trocada sem afetar o
restante do sistema. Rotas, mapeamentos e riscos estão em `docs/FONTE-DADOS.md`.
