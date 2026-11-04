# `src/contracts/` — contratos da API

**Território: OS DOIS (Igor e PH). Só muda com acordo entre os dois.**

Esta pasta é a **fonte única de verdade** dos formatos de dados trocados entre o
front-end e a API. Cada contrato é um schema [Zod](https://zod.dev) (v4) do qual
derivamos o tipo TypeScript com `z.infer`.

- **Back-end (Igor):** valida a entrada dos route handlers e garante o formato
  das respostas usando estes schemas.
- **Front-end (PH):** usa os tipos para tipar telas e componentes, e cria mocks
  em `src/mocks/` que passam na validação destes schemas.

## Regras

1. Mudou, criou ou apagou algo aqui? **Avise explicitamente no PR** (o template
   de PR tem um campo para isso) e combine com o outro antes.
2. Contratos não importam nada de `src/server/` nem de componentes React. Só
   `zod` e outros contratos.
3. Um arquivo por recurso (ex.: `liga.ts`, `time.ts`, `rodada.ts`), exportando
   os schemas e os tipos.
4. Nomes de campos em português, `camelCase` (ex.: `nomeTime`, `pontosRodada`).

## Exemplo (ilustrativo, ainda não existe)

Um futuro arquivo `src/contracts/liga.ts` seria mais ou menos assim:

```ts
import { z } from "zod";

// Schema: descreve e valida o formato de uma liga em tempo de execução.
export const LigaSchema = z.object({
  id: z.string(),
  nome: z.string().min(3).max(50),
  quantidadeMembros: z.number().int().min(2),
  criadaEm: z.iso.datetime(), // datas trafegam como string ISO 8601
});

// Tipo: derivado do schema, usado no TypeScript (front e back).
export type Liga = z.infer<typeof LigaSchema>;

// Contrato de entrada de um endpoint (ex.: POST /api/ligas).
export const CriarLigaInputSchema = LigaSchema.pick({ nome: true });
export type CriarLigaInput = z.infer<typeof CriarLigaInputSchema>;
```

Uso no back-end (route handler):

```ts
const input = CriarLigaInputSchema.parse(await request.json()); // lança erro se inválido
```

Uso no front-end:

```ts
import type { Liga } from "@/contracts/liga";
```
