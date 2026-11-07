// Equipes do fantasy. Regras em docs/GUIA.md, seção 6.
//
// PUT /api/equipes/:id/sigla          DefinirSiglaInput -> EquipeResumo
// GET /api/ligas/:id/siglas/:sigla    -> DisponibilidadeSigla
import { z } from "zod";

// Três letras ou números, convertidos para maiúsculas (ap7 vira AP7).
export const SiglaEquipeSchema = z
  .string()
  .toUpperCase()
  .regex(/^[A-Z0-9]{3}$/);
export type SiglaEquipe = z.infer<typeof SiglaEquipeSchema>;

export const EquipeResumoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  // Na sala do draft, é null para todas as equipes até o início. Assim a API não
  // revela quais equipes estão com a sigla pendente.
  sigla: SiglaEquipeSchema.nullable(),
  avatarUrl: z.url().nullable(),
});
export type EquipeResumo = z.infer<typeof EquipeResumoSchema>;

export const DefinirSiglaInputSchema = z.object({ sigla: SiglaEquipeSchema });
export type DefinirSiglaInput = z.infer<typeof DefinirSiglaInputSchema>;

export const DisponibilidadeSiglaSchema = z.object({
  sigla: SiglaEquipeSchema,
  disponivel: z.boolean(),
});
export type DisponibilidadeSigla = z.infer<typeof DisponibilidadeSiglaSchema>;
