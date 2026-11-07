// Situação da aplicação.
//
// GET /api/health -> Saude (200 se ok, 503 se o banco estiver indisponível)
import { z } from "zod";

export const SaudeSchema = z.object({
  status: z.enum(["ok", "erro"]),
  banco: z.enum(["ok", "indisponivel"]),
});
export type Saude = z.infer<typeof SaudeSchema>;
