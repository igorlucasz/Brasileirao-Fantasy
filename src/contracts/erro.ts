// Formato padrão das respostas de erro da API.
import { z } from "zod";

export const ErroApiSchema = z.object({
  codigo: z.string(),
  mensagem: z.string(),
});
export type ErroApi = z.infer<typeof ErroApiSchema>;
