// Jogadores no contexto de um draft. Regras em docs/GUIA.md, seções 3 a 5.
//
// As rotas ficam dentro do draft porque a lista, os rankings e as situações
// congelam no início dele, e a equipe proprietária depende da liga.
//
// GET /api/drafts/:id/jogadores              -> ListaJogadores
// GET /api/drafts/:id/jogadores/:jogadorId   -> PerfilJogador
//
// Em pontuações e rankings, null significa sem dado (a tela mostra um traço).
// Zero é um valor real.
import { z } from "zod";

export const PosicaoSchema = z.enum(["GOL", "DEF", "MEI", "ATA"]);
export type Posicao = z.infer<typeof PosicaoSchema>;

// O servidor envia só uma situação: suspenso, depois lesionado, depois dúvida.
export const SituacaoJogadorSchema = z.enum(["suspenso", "lesionado", "duvida"]);
export type SituacaoJogador = z.infer<typeof SituacaoJogadorSchema>;

export const ClubeSchema = z.object({
  id: z.string(),
  nome: z.string(),
  sigla: z.string(),
  corPrincipal: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  escudoUrl: z.url().nullable(),
});
export type Clube = z.infer<typeof ClubeSchema>;

export const JogadorResumoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  posicao: PosicaoSchema,
  clube: ClubeSchema,
  fotoUrl: z.url().nullable(),
  situacao: SituacaoJogadorSchema.nullable(),
  pontuacaoTotalProjetada: z.number().nullable(),
  rankingGeral: z.number().int().positive().nullable(),
  rankingPosicao: z.number().int().positive().nullable(),
});
export type JogadorResumo = z.infer<typeof JogadorResumoSchema>;

// Toda a lista congelada, em ordem de ranking. A tela filtra localmente.
export const ListaJogadoresSchema = z.array(JogadorResumoSchema);
export type ListaJogadores = z.infer<typeof ListaJogadoresSchema>;

export const EquipeProprietariaSchema = z.object({
  id: z.string(),
  nome: z.string(),
  ehMinhaEquipe: z.boolean(),
});
export type EquipeProprietaria = z.infer<typeof EquipeProprietariaSchema>;

// Enviados em ordem de subtotal, do maior positivo ao mais negativo.
export const EventoPontuacaoSchema = z.object({
  nome: z.string(),
  ocorrencias: z.number().int().nonnegative(),
  pontosPorOcorrencia: z.number(),
  subtotal: z.number(),
});
export type EventoPontuacao = z.infer<typeof EventoPontuacaoSchema>;

export const EstatisticaRodadaSchema = z.object({
  rodada: z.number().int().positive(),
  pontuacao: z.number().nullable(),
  eventos: z.array(EventoPontuacaoSchema),
});
export type EstatisticaRodada = z.infer<typeof EstatisticaRodadaSchema>;

export const ProjecaoRodadaSchema = z.object({
  rodada: z.number().int().positive(),
  pontosProjetados: z.number().nullable(),
  adiada: z.boolean(),
});
export type ProjecaoRodada = z.infer<typeof ProjecaoRodadaSchema>;

export const PerfilJogadorSchema = JogadorResumoSchema.extend({
  numeroCamisa: z.number().int().positive().nullable(),
  mediaProjetada: z.number().nullable(),
  equipeProprietaria: EquipeProprietariaSchema.nullable(),
  estatisticasPorRodada: z.array(EstatisticaRodadaSchema),
  projecoesPorRodada: z.array(ProjecaoRodadaSchema),
});
export type PerfilJogador = z.infer<typeof PerfilJogadorSchema>;
