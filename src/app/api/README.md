# `src/app/api/` — API (route handlers)

**Território: Igor.**

Endpoints HTTP da aplicação, no formato de _route handlers_ do Next.js
(`src/app/api/<recurso>/route.ts`, exportando `GET`, `POST` etc.).

Regras:

- **A API é o contrato entre front e back.** Toda entrada e saída deve ser
  validada/tipada com os schemas Zod de `src/contracts/`.
- Handlers ficam finos: validam a entrada, chamam `src/server/services/` e
  devolvem a resposta. Regra de negócio não mora aqui.
- Mudou o formato de uma resposta? Isso é mudança de contrato: avise no PR.
