# `src/mocks/` — dados falsos para o front-end

**Território: PH.**

Dados de exemplo usados pelas telas enquanto os endpoints reais não existem.

Regras:

- Todo mock deve seguir um contrato de `src/contracts/`. Valide com o schema
  para garantir que o mock não "mente" sobre o formato real:

  ```ts
  import { LigaSchema, type Liga } from "@/contracts/liga";

  export const ligaMock: Liga = LigaSchema.parse({
    id: "liga-1",
    nome: "Liga dos Amigos",
    // ...
  });
  ```

- Quando o endpoint real ficar pronto, a tela troca o mock pela chamada à API
  sem mudar mais nada, porque os tipos são os mesmos.
