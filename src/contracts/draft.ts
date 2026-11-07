// Draft snake ao vivo. Regras em docs/GUIA.md, seções 2, 5 e 6.
//
// GET  /api/drafts/:id            -> Draft (consultado a cada 2 ou 3 segundos)
// POST /api/drafts/:id/escolhas   FazerEscolhaInput -> Draft
// POST /api/drafts/:id/iniciar    sem corpo -> Draft
// POST /api/drafts/:id/pausar     sem corpo -> Draft
// POST /api/drafts/:id/retomar    sem corpo -> Draft
// GET  /api/drafts/:id/fila       -> FilaDraft
// PUT  /api/drafts/:id/fila       FilaDraft -> FilaDraft
//
// Erros usam ErroApi (erro.ts), com os códigos de CodigoErroDraftSchema.
import { z } from "zod";

import { EquipeResumoSchema } from "./equipe";
import { JogadorResumoSchema, PosicaoSchema, type Posicao } from "./jogador";

export const LimitePosicaoSchema = z
  .object({
    minimo: z.number().int().nonnegative(),
    maximo: z.number().int().nonnegative(),
  })
  .refine((limite) => limite.minimo <= limite.maximo, {
    error: "O mínimo não pode passar do máximo.",
  });
export type LimitePosicao = z.infer<typeof LimitePosicaoSchema>;

// Os valores ainda não estão definidos no guia, por isso são dados, não constantes.
export const ConfiguracaoDraftSchema = z
  .object({
    rodadas: z.number().int().positive(),
    segundosPorEscolha: z.number().int().positive(),
    composicaoElenco: z.object({
      GOL: LimitePosicaoSchema,
      DEF: LimitePosicaoSchema,
      MEI: LimitePosicaoSchema,
      ATA: LimitePosicaoSchema,
    }),
  })
  .refine(
    ({ rodadas, composicaoElenco }) => {
      const limites = PosicaoSchema.options.map((posicao: Posicao) => composicaoElenco[posicao]);
      const somaMinimos = limites.reduce((soma, limite) => soma + limite.minimo, 0);
      const somaMaximos = limites.reduce((soma, limite) => soma + limite.maximo, 0);
      return somaMinimos <= rodadas && rodadas <= somaMaximos;
    },
    { error: "Os limites por posição precisam permitir um elenco com o número de rodadas." },
  );
export type ConfiguracaoDraft = z.infer<typeof ConfiguracaoDraftSchema>;

export const StatusDraftSchema = z.enum(["aguardando", "em_andamento", "pausado", "concluido"]);
export type StatusDraft = z.infer<typeof StatusDraftSchema>;

export const EscolhaDraftSchema = z.object({
  numero: z.number().int().positive(),
  rodada: z.number().int().positive(),
  posicaoNaRodada: z.number().int().positive(),
  codigo: z.string().regex(/^[1-9]\d*\.\d{2}$/), // Ex.: 3.07
  equipeOriginalId: z.string(), // Define a coluna, que nunca muda.
  equipeAtualId: z.string(), // Dona da escolha. É diferente da original após uma troca.
  jogador: JogadorResumoSchema.nullable(), // null enquanto a escolha não foi feita.
  automatica: z.boolean(), // Feita por Auto-Pick.
});
export type EscolhaDraft = z.infer<typeof EscolhaDraftSchema>;

export const DraftSchema = z
  .object({
    id: z.string(),
    ligaId: z.string(),
    status: StatusDraftSchema,
    configuracao: ConfiguracaoDraftSchema,
    equipes: z.array(EquipeResumoSchema), // Na ordem fixa das colunas do Draft Board.
    escolhas: z.array(EscolhaDraftSchema), // Todas, inclusive as futuras, por número.
    numeroEscolhaAtual: z.number().int().positive().nullable(),
    prazoEscolha: z.iso.datetime().nullable(), // Limite da escolha atual.
    segundosRestantes: z.number().int().nonnegative().nullable(), // Só quando pausado.
    servidorEm: z.iso.datetime(), // Usado para acertar o relógio da tela.
    minhaEquipeId: z.string().nullable(),
    souComissario: z.boolean(),
    siglasCompletas: z.boolean(), // Libera "Iniciar Draft", sem identificar equipes.
  })
  .superRefine((draft, contexto) => {
    const erro = (mensagem: string) => contexto.addIssue({ code: "custom", message: mensagem });
    const aguardando = draft.status === "aguardando";
    const andamento = draft.status === "em_andamento";
    const pausado = draft.status === "pausado";

    if (andamento !== (draft.prazoEscolha !== null)) {
      erro("prazoEscolha só existe com o draft em andamento.");
    }
    if (pausado !== (draft.segundosRestantes !== null)) {
      erro("segundosRestantes só existe com o draft pausado.");
    }
    if (andamento || pausado) {
      const atual = draft.escolhas.find((escolha) => escolha.numero === draft.numeroEscolhaAtual);
      if (!atual || atual.jogador !== null) {
        erro("numeroEscolhaAtual precisa apontar para uma escolha ainda não feita.");
      }
    } else if (draft.numeroEscolhaAtual !== null) {
      erro("numeroEscolhaAtual só existe com o draft em andamento ou pausado.");
    }
    if (aguardando && draft.equipes.some((equipe) => equipe.sigla !== null)) {
      erro("As siglas ficam ocultas até o início do draft.");
    }
    if (!aguardando) {
      if (!draft.siglasCompletas || draft.equipes.some((equipe) => equipe.sigla === null)) {
        erro("Todas as equipes precisam de sigla depois do início do draft.");
      }
    }
    if (
      draft.status === "concluido" &&
      draft.escolhas.some((escolha) => escolha.jogador === null)
    ) {
      erro("Um draft concluído não tem escolhas pendentes.");
    }
  });
export type Draft = z.infer<typeof DraftSchema>;

export const FazerEscolhaInputSchema = z.object({ jogadorId: z.string() });
export type FazerEscolhaInput = z.infer<typeof FazerEscolhaInputSchema>;

// Fila privada da equipe do usuário, em ordem de preferência.
export const FilaDraftSchema = z.object({
  jogadorIds: z
    .array(z.string())
    .refine((ids) => new Set(ids).size === ids.length, { error: "Jogador repetido na fila." }),
});
export type FilaDraft = z.infer<typeof FilaDraftSchema>;

export const CodigoErroDraftSchema = z.enum([
  "nao_e_sua_vez",
  "jogador_indisponivel",
  "limite_posicao_atingido",
  "tempo_esgotado",
  "draft_nao_ativo",
  "siglas_pendentes",
  "sem_permissao",
]);
export type CodigoErroDraft = z.infer<typeof CodigoErroDraftSchema>;
