// Painel de elenco, aberto a partir do Draft Board. Regras em docs/GUIA.md, seção 7.
//
// GET /api/drafts/:id/equipes/:equipeId/elenco -> Elenco
//
// A tela agrupa por posição (ATA, MEI, DEF, GOL) e ordena por projeção.
import { z } from "zod";

import { EquipeResumoSchema } from "./equipe";
import { PosicaoSchema } from "./jogador";

export const JogadorElencoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  posicao: PosicaoSchema,
  pontuacaoTotalProjetada: z.number().nullable(),
});
export type JogadorElenco = z.infer<typeof JogadorElencoSchema>;

export const ElencoSchema = z.object({
  equipe: EquipeResumoSchema,
  jogadores: z.array(JogadorElencoSchema),
});
export type Elenco = z.infer<typeof ElencoSchema>;
