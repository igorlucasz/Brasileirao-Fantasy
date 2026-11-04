# `src/server/ingestion/` — coleta de dados do campeonato

**Território: Igor.**

Código que busca dados reais do Brasileirão (clubes, jogadores, partidas,
scouts) numa fonte externa e grava no nosso banco.

Plano (ainda não implementado): um GitHub Action agendado chama uma rota
protegida da API, que dispara a ingestão definida aqui.

A **fonte dos dados ainda está em aberto** (ver `docs/CONTEXTO.md`).
