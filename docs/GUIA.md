Fantasy Brasileirão 2027 — Documento Mestre de Contexto Página 1
FANTASY BRASILEIRÃO 2027
DOCUMENTO MESTRE DE CONTEXTO
Especificação consolidada do Draft, interfaces e decisões aprovadas
Finalidade: transferir o contexto do projeto para outra IA, permitindo que ela interprete corretamente as regras já
aprovadas, mantenha consistência entre funcionalidades e continue a discussão sem repetir decisões.
Estado do histórico: decisões numeradas até 264 registradas no contexto disponível. A decisão 265 está aberta e ainda
não foi escolhida.
Nota de integridade: o detalhamento individual das decisões 1–175 não está integralmente disponível. Essas decisões são resumidas apenas
com base nos pontos recuperados; não se deve inventar opções, números ou regras que não estejam documentados.
Fantasy Brasileirão 2027 — Documento Mestre de Contexto Página 2 0. Instruções obrigatórias para a IA que receber este
documento
• Trate este documento como a fonte de verdade para as decisões registradas. Não reabra, altere ou contradiga uma
decisão confirmada sem pedido explícito do usuário.
• Continue exatamente pela Decisão 265. Não pule números e não apresente mais de uma decisão nova por resposta.
• Fluxo esperado: (1) reconhecer a escolha anterior, (2) confirmar o que ela significa em termos de
interface/comportamento, (3) apresentar somente a próxima decisão, com opções claras, (4) aguardar a resposta.
• Quando o usuário pedir uma ilustração, mostre comparações visuais fiéis às alternativas e deixe explícito que a ilustração
não confirma uma escolha.
• Não confunda exemplos fictícios de jogadores, equipes, pontuações ou siglas com dados reais. Exemplos visuais devem
ser identificados como ilustrativos.
• Quando duas decisões parecerem conflitantes, aplique a decisão posterior e mais específica. Preserve o restante das
decisões anteriores que não foi alterado.
• Não suponha funcionalidades que não foram aprovadas. Diferencie claramente: confirmado, em discussão,
recomendação e não especificado.
• Use português brasileiro. O usuário prefere explicações objetivas, mas suficientemente claras para entender
consequências visuais e funcionais.

1. Visão geral do produto
   Fantasy Brasileirão 2027 é um jogo fantasy de futebol baseado no Campeonato Brasileiro de 2027. O projeto inclui uma
   experiência de Draft entre equipes participantes, seleção exclusiva de jogadores, acompanhamento das escolhas em um
   Draft Board e consulta de perfis e elencos. O usuário está definindo o produto por meio de decisões numeradas,
   normalmente com três alternativas.
   O Draft Board é a tela central de acompanhamento das escolhas. O perfil completo é a interface de consulta individual de
   um jogador. O painel de elenco é uma janela modal que permite consultar a composição de uma equipe diretamente a
   partir do cabeçalho dela no Draft Board.
2. Mecânica geral do Draft — contexto recuperado
   Os itens abaixo são regras recuperadas de discussões anteriores, mas o histórico integral das decisões 1–175 não está
   disponível neste documento. A IA deve preservá-los como contexto conhecido, sem atribuir a eles detalhes técnicos não
   registrados.
   • Formato Snake Draft, com ordem de escolhas invertida a cada rodada.
   • Redraft anual, com foco na temporada de 2027.
   • Quantidade de participantes/equipes variável.
   • Draft realizado ao vivo, com relógio de escolha visível aos participantes.
   • Tempo de escolha configurável; foi citado 90 segundos como referência.
   • Auto-Pick quando o tempo de escolha termina.
   • Sorteio automático da ordem do Draft.
   • Trocas de escolhas (picks) permitidas antes do início do Draft.
   • Jogadores selecionados ficam exclusivos da equipe que os escolheu.
   • Ranking utilizado no Draft congelado no início do Draft.
   • Fila de jogadores editável, conforme regras já discutidas.
   • Lista de jogadores disponível para o Draft congelada no início.
   Fantasy Brasileirão 2027 — Documento Mestre de Contexto Página 3
   • Pausas manuais ilimitadas foram mencionadas.
   • O Draft deve continuar mesmo se o comissário ficar offline.
   • Jogadores reservas ficam bloqueados no sorteio, conforme regra recuperada.
   • Abandono de participante é tratado por Auto-Pick, conforme regra recuperada.
   • Existem regras de composição de elenco e posições, mas seus limites numéricos não estão integralmente descritos aqui.
3. Perfil completo dos jogadores — decisões 176–218
   3.1 Estrutura, abas e navegação
   • O perfil completo possui três abas: Visão geral, Estatísticas e Projeções.
   • A aba inicial ao abrir o perfil é sempre Visão geral.
   • Selecionar outro jogador substitui imediatamente o perfil atualmente aberto; não manter dois perfis simultâneos.
   • No celular, fechar o perfil pelo botão Voltar ou gesto de deslizar da esquerda para a direita.
   • No computador, fechar pelo X, clique fora da janela ou tecla Esc.
   • Após confirmar uma escolha no Draft, o perfil pode permanecer aberto, sem alterar a visualização atual.
   3.2 Visão geral
   • Dois cartões principais: pontuação total projetada e média projetada.
   • Rankings geral e por posição aparecem em uma linha compacta abaixo dos cartões.
   • Rankings são congelados no início do Draft e não mudam durante as escolhas.
   • Não mostrar indicação adicional do período das projeções nos cartões.
   • Indicadores sem projeção devem mostrar somente traços, sem explicação adicional.
   • Não oferecer ferramenta de comparação direta entre jogadores durante o Draft.
   3.3 Estatísticas
   • Mostrar exclusivamente estatísticas do Brasileirão 2027.
   • Tabela cronológica: rodada 1 até a rodada mais recente.
   • Mostrar todas as rodadas concluídas.
   • Quando não houver pontuação registrada, mostrar travessão (—); quando a pontuação real for zero, mostrar 0,0.
   • Cada linha de rodada pode ser expandida para consultar os eventos e pontos que compõem aquela pontuação.
   • Permitir somente uma rodada expandida por vez.
   • No detalhamento, mostrar quantidade de ocorrências, pontos por ocorrência e subtotal de cada evento.
   • Ordenar eventos pelo subtotal, do maior positivo ao mais negativo.
   • A pontuação total da rodada aparece apenas na linha principal, sem repetição no detalhamento.
   3.4 Projeções
   • Mostrar projeções gerais e uma tabela com projeção de pontos para cada rodada restante.
   • Mostrar todas as rodadas restantes; usar — quando não houver projeção individual confiável.
   • Ordenar cronologicamente, da próxima rodada até a última, sem controle de ordenação.
   • Não mostrar datas nem horários na tabela.
   • Partidas adiadas permanecem na rodada original e recebem a indicação Adiada.
   • Para partidas adiadas, manter congelada a pontuação projetada no início do Draft.
   Fantasy Brasileirão 2027 — Documento Mestre de Contexto Página 4
   3.5 Situação do jogador e propriedade
   • Situações possíveis: Suspenso, Lesionado e Dúvida.
   • Exibir uma indicação curta junto à identificação do jogador, visível em todas as abas do perfil.
   • Não exibir indicação quando não houver situação registrada.
   • Se mais de uma situação se aplicar, mostrar apenas uma, com prioridade: Suspenso → Lesionado → Dúvida.
   • Congelar as situações de lesão, suspensão e dúvida no início do Draft.
   • Não exibir essas situações na tabela de Projeções.
   • Mostrar a equipe de Fantasy proprietária junto ao nome do jogador; se for a equipe do usuário, escrever Meu time.
   • Não mostrar indicação adicional de disponibilidade para jogadores ainda não draftados.
   • Atualizar a equipe proprietária somente quando o perfil for fechado e reaberto.
4. Identidade visual do perfil — decisões 215–218
   • Cabeçalho com a cor principal do clube do jogador.
   • Escudo do clube discreto ao fundo do cabeçalho.
   • Usar uma silhueta genérica no espaço da foto do jogador no cabeçalho.
   • Exibir nome, posição, clube e número da camisa quando disponível.
   • A referência visual enviada pelo usuário lembra um perfil esportivo moderno, com identidade do clube, imagem do atleta e
   abas.
5. Draft Board — estrutura e estilo — decisões 219–254
   5.1 Colunas e cabeçalhos
   • Cada equipe ocupa uma coluna do Draft Board.
   • As colunas seguem a ordem original do sorteio da primeira rodada e permanecem fixas durante todo o Draft.
   • Trocas de picks não mudam a posição da coluna da equipe.
   • Cada cabeçalho mostra somente avatar à esquerda e nome da equipe à direita.
   • Não exibir número da posição original do sorteio no cabeçalho; também não há tooltip para esse número.
   • Nome da equipe pode ocupar até duas linhas e deve ser truncado se necessário.
   5.2 Dimensões e organização das células
   • Colunas com aproximadamente 200 px de largura.
   • Células com aproximadamente 70 px de altura.
   • Identificar a escolha com código compacto, por exemplo 3.07.
   • Posicionar o código da escolha no canto superior esquerdo da célula.
   • Identificar as rodadas somente pelos códigos compactos nas células.
   • Células futuras alternam discretamente entre dois tons escuros de fundo, por rodada.
   5.3 Destaques e paleta por posição
   • A célula da escolha atual recebe borda verde vibrante.
   • O cabeçalho da equipe cuja vez chegou recebe borda da mesma cor verde vibrante.
   • Não aplicar destaque especial adicional às escolhas pertencentes à equipe do usuário.
   • O fundo inteiro de cada célula preenchida é colorido conforme a posição do jogador.
   Fantasy Brasileirão 2027 — Documento Mestre de Contexto Página 5
   • Paleta fixa: GOL verde; DEF azul; MEI amarelo; ATA vermelho.
   5.4 Conteúdo das células preenchidas
   • Organização interna: foto à esquerda; nome e informações à direita.
   • Foto quadrada, com cantos arredondados, de 28 × 28 px.
   • Se não houver foto do jogador, usar silhueta genérica neutra.
   • Nome pode ocupar até duas linhas; se não couber, truncar com reticências.
   • Posição e clube real aparecem em texto simples na mesma linha, no formato DEF · PAL.
   • Não confundir a sigla da posição (ATA/MEI/DEF/GOL) com a sigla personalizada da equipe.
   5.5 Trocas e Auto-Pick — decisões 239–241
   • Mostrar pequeno ícone de Auto-Pick ao lado do código da escolha.
   • Ao tocar ou passar o cursor sobre o ícone, mostrar explicação de que a escolha foi realizada por Auto-Pick.
   • Quando uma escolha tiver sido trocada e também for Auto-Pick, mostrar os ícones de troca e Auto-Pick lado a lado.
   • As abreviações das equipes envolvidas na troca aparecem no canto superior direito da célula, na mesma linha superior do
   código e dos ícones.
   • Formato de exemplo: APG → GYN. A leitura deve representar a equipe original e a equipe atual da escolha, conforme o
   contexto da troca.
6. Siglas personalizadas das equipes — decisões 242–252
   • Cada equipe deve escolher manualmente uma sigla própria, com exatamente três caracteres alfanuméricos.
   • São permitidas letras e números; não são permitidos espaços, acentos ou símbolos.
   • Todas as letras digitadas devem ser convertidas automaticamente para maiúsculas. Exemplo: ap7 → AP7.
   • As siglas devem ser únicas dentro da liga.
   • Verificar disponibilidade em tempo real assim que houver três caracteres; validar novamente ao salvar para evitar
   conflitos simultâneos.
   • Não gerar siglas automaticamente.
   • Todas as equipes devem definir uma sigla válida antes do início do Draft.
   • Somente o dono da equipe pode definir ou editar sua própria sigla. O comissário não pode editar a sigla de outra equipe.
   • A edição fica disponível até o início do Draft; ao iniciar, todas as siglas ficam bloqueadas.
   • Aviso de sigla pendente deve ser exibido somente ao dono da equipe correspondente.
   • Não exibir ao comissário uma lista de equipes pendentes nem avisos públicos identificando equipes.
   • Enquanto houver siglas pendentes, o botão Iniciar Draft fica desabilitado, com explicação genérica sem identificar
   equipes.
   • A sigla é editada exclusivamente nas configurações normais da equipe.
   • Não criar atalho para configurações dentro da sala do Draft.
7. Painel modal de elenco — decisões 255–264
   O painel é aberto ao clicar/tocar no cabeçalho de uma equipe no Draft Board. Ele permite consultar o elenco sem sair da
   tela principal.
   7.1 Apresentação e comportamento
   • Abrir em uma janela modal central sobre o Draft Board.
   Fantasy Brasileirão 2027 — Documento Mestre de Contexto Página 6
   • Escurecer o fundo enquanto o modal estiver aberto.
   • Não utilizar painel lateral e não expandir a grade do Draft Board.
   • Fechar pelo X no canto superior direito, clicando fora da janela ou pressionando Esc no computador.
   7.2 Conteúdo por jogador — decisão 259, escolha mais recente
   • Cada jogador selecionado aparece com somente nome e pontuação total projetada.
   • Não mostrar foto, média projetada por jogo, clube real, rodada da escolha ou código da escolha.
   • A lista continua organizada por posição, mas sem cabeçalhos de grupo.
   • Importante: uma escolha anterior da decisão 257 havia incluído nome, posição, clube e projeção. O usuário
   posteriormente corrigiu/atualizou a decisão 259 para mostrar somente nome e projeção. Aplicar a versão mais recente e
   específica.
   7.3 Ordenação e posições
   • Ordenar os jogadores pela pontuação total projetada, da maior para a menor, dentro de cada posição.
   • Mostrar todas as posições, mesmo quando vazias.
   • Lista única agrupada na ordem fixa: ATA → MEI → DEF → GOL.
   • Cada jogador recebe etiqueta colorida com sua posição, sem cabeçalhos de grupo.
   • Usar as mesmas cores do Draft Board: ATA vermelho, MEI amarelo, DEF azul e GOL verde.
   • Para posição vazia, mostrar a etiqueta colorida da posição e o contador 0 jogadores.
   7.4 Exemplo conceitual da lista aprovada
   • ATA Jogador A — 149,6
   • ATA Jogador B — 132,4
   • MEI Jogador C — 161,8
   • MEI Jogador D — 143,2
   • DEF 0 jogadores
   • GOL Jogador E — 130,2
   • Os nomes e valores acima são apenas exemplos ilustrativos. O importante é a lista única, ordem de posição fixa e
   ordenação decrescente da projeção dentro de cada posição.
8. Próxima decisão — 265 (AINDA NÃO CONFIRMADA)
   Pergunta: O que acontece se outra equipe for selecionada enquanto a janela de elenco estiver aberta?
   Opção Comportamento proposto Status
   A — Substituição
   imediata
   O modal permanece aberto e seu conteúdo é substituído pelo elenco da nova equipe
   selecionada.
   Não escolhida
   B — Fechar e abrir
   novamente
   O modal atual fecha e uma nova janela é aberta para a equipe selecionada. Não escolhida
   C — Bloquear
   interação
   Enquanto o modal estiver aberto, outros cabeçalhos não podem ser acionados; é
   necessário fechar primeiro.
   Não escolhida
   Não presumir a recomendação como escolha. O usuário ainda precisa selecionar A, B ou C.
9. Pontos não especificados / cuidados para implementação
   • Não estão documentados aqui todos os detalhes das decisões 1–175. Se uma implementação depender de um detalhe
   ausente (por exemplo, limite exato de jogadores por posição, número de equipes ou regra específica de troca), não
   Fantasy Brasileirão 2027 — Documento Mestre de Contexto Página 7
   inventar: perguntar ou recuperar o histórico.
   • Não foram especificados neste contexto o layout responsivo completo do Draft Board, comportamento de rolagem
   horizontal/vertical, virtualização da lista, animações, acessibilidade detalhada ou persistência em caso de reconexão.
   • Não inferir que o painel de elenco permita abrir perfil de jogador ao clicar em uma linha; isso ainda não foi decidido.
   • Não inferir que o painel tenha busca, filtros, ordenação manual, comparação, paginação ou edição de elenco.
   • Não inferir como desempatar projeções iguais dentro da mesma posição; a ordenação decrescente foi aprovada, mas o
   critério de desempate não foi definido.
   • Não inferir que o usuário possa editar siglas durante o Draft: isso está expressamente bloqueado.
   • Não tratar a sigla de equipe de três caracteres como abreviação da posição. São elementos diferentes.
   • Quando houver conflito entre decisão antiga e atualização posterior, aplicar a atualização mais recente. Caso não seja
   possível determinar o alcance, perguntar antes de implementar.
10. Glossário
    Termo Significado neste projeto
    Draft Board Grade principal que mostra as escolhas de todas as equipes ao longo das rodadas.
    Pick / escolha Uma seleção de jogador feita por uma equipe em uma posição específica do Draft.
    Snake Draft Formato em que a ordem de escolha se inverte a cada rodada.
    Auto-Pick Escolha automática realizada pelo sistema, por exemplo quando o tempo acaba.
    Pick trocado Escolha cuja titularidade foi transferida entre equipes por uma troca.
    Código da escolha Identificador compacto de rodada e posição, como 3.07.
    Sigla da equipe Código personalizado único de três caracteres alfanuméricos, como APG ou G02.
    Posição do jogador Uma das quatro posições: ATA, MEI, DEF ou GOL.
    Projeção total Estimativa de pontuação total do jogador para o período de projeção utilizado pelo sistema.
    Modal Janela sobreposta ao conteúdo principal, com fundo escurecido.
11. Checklist de continuidade para a próxima IA
    • Reconhecer que as decisões 1–264 estão registradas conforme o resumo e que a 265 está pendente.
    • Não pedir ao usuário para repetir decisões já tomadas.
    • Apresentar somente a decisão 265 na próxima interação.
    • Após a escolha da 265, registrar claramente a regra aprovada e avançar para a 266.
    • Manter uma decisão numerada por turno.
    • Atualizar o documento mestre quando o usuário pedir novo resumo ou transferência.
