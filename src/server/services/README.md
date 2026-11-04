# `src/server/services/` — regras de negócio

**Território: Igor.**

Lógica de negócio do back-end: cálculo de pontuação, geração de confrontos
head-to-head, classificação da liga, gestão de escalação etc.

Regras:

- Só roda no servidor. Usa o banco via `@/server/db`.
- Funções puras sempre que possível (fáceis de testar), por exemplo o cálculo
  de pontos a partir dos scouts de uma partida.
- Chamado pelos route handlers de `src/app/api/`, nunca por componentes.
