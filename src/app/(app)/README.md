# `src/app/(app)/` — telas do aplicativo

**Território: PH.**

Telas da área logada: ligas, Draft Board, perfil dos jogadores, painel de elenco,
rodada/confronto e classificação. As regras de draft, perfil e elenco estão em
`docs/GUIA.md`. O `(app)` é um _route group_ do Next.js: não aparece na URL e
permite um layout comum (ex.: menu de navegação) para todas essas telas.

Regras:

- Dados vêm da API (`src/app/api/`) seguindo os tipos de `src/contracts/`.
- Enquanto o endpoint real não existir, use os dados de `src/mocks/`.
- Não acesse o banco diretamente daqui (nada de importar `@/server/db`).
