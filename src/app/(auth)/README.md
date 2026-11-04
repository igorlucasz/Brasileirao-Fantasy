# `src/app/(auth)/` — telas de autenticação

**Território: PH.**

Telas de login e cadastro (ex.: `login/page.tsx`, `cadastro/page.tsx`).
O `(auth)` entre parênteses é um _route group_ do Next.js: organiza as pastas e
permite um layout próprio, mas **não aparece na URL** (`/login`, não `/auth/login`).

A autenticação em si (Better Auth) será implementada pelo Igor no back-end.
Enquanto isso, as telas podem ser feitas usando os contratos de `src/contracts/`
e dados de `src/mocks/`.
