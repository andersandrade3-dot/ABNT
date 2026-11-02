/* ==========================================================================
   Dados Estruturados dos 6 Módulos Temáticos
   Fonte Primária: Manual de Normalização de Trabalhos Acadêmicos do IFCE
   (3ª edição atualizada, Fortaleza, 2020)
   ========================================================================== */

window.ABNTWorkshop = window.ABNTWorkshop || {};

window.ABNTWorkshop.MODULES = [
  {
    id: 'mod1',
    num: 1,
    shortTitle: 'Página e Margens',
    title: 'Módulo 1 — Configuração da Página',
    subtitle: 'Formato A4, orientação, margens do anverso e do verso e configuração de estilos de página no LibreOffice Writer.',
    manualRef: 'Seções 9.1 e 9.2 (p. 105–108) • Figuras 31 e 32',
    caseStudy: {
      title: 'Estudo de caso: o modelo importado com papel Carta e margens simétricas',
      text: 'Lucas iniciou seu artigo da disciplina abrindo um modelo genérico baixado da internet. Ao exportar o PDF para revisão, percebeu que as linhas estavam mais largas do que as do modelo da biblioteca e que todas as bordas tinham 2,0 cm. Ao inspecionar o arquivo no LibreOffice Writer, descobriu que o documento estava configurado em papel Carta (Letter — 21,59 cm × 27,94 cm) com margens iguais nos quatro lados.'
    },
    specs: [
      {
        label: 'Formato e Cor do Papel',
        value: 'A4 (21 cm × 29,7 cm) • Cor preta no texto',
        note: 'Se impresso, papel branco ou reciclado. Outras cores são permitidas somente para ilustrações (Seção 9.1, p. 105).'
      },
      {
        label: 'Orientação da Página',
        value: '21 cm × 29,7 cm (Retrato no Writer)',
        note: 'Nota de fidelidade: o Manual do IFCE especifica as medidas 21 cm × 29,7 cm e não detalha regras para orientação Paisagem.'
      },
      {
        label: 'Margens do Anverso (Frente)',
        value: 'Esquerda: 3 cm | Superior: 3 cm | Direita: 2 cm | Inferior: 2 cm',
        note: 'Gera uma mancha gráfica útil de 16 cm de largura por 24,7 cm de altura (Seção 9.2, alínea a; Figura 31, p. 107).'
      },
      {
        label: 'Margens do Verso (Costas)',
        value: 'Direita: 3 cm | Superior: 3 cm | Esquerda: 2 cm | Inferior: 2 cm',
        note: 'A margem de 3 cm acompanha a borda interna de encadernação quando há impressão frente e verso (Figura 32, p. 108).'
      }
    ],
    explanations: [
      {
        heading: 'Quando aplicar somente Anverso ou Anverso e Verso?',
        body: 'Segundo a Seção 9.1 (alíneas d, e, p. 105), todos os elementos pré-textuais devem iniciar no anverso da folha (frente), com exceção da ficha catalográfica, que vem no verso da folha de rosto nos trabalhos impressos (e na folha seguinte nos trabalhos em formato digital, conforme p. 27). Já para os elementos textuais e pós-textuais, o manual recomenda a digitação no anverso e verso, mantendo também orientações específicas caso o trabalho seja configurado somente no anverso.'
      },
      {
        heading: 'Como o LibreOffice Writer automatiza o Anverso e o Verso?',
        body: 'No Writer, você não precisa ajustar páginas pares e ímpares manualmente. Ao escolher o leiaute de página "Espelhado", os campos Esquerda e Direita mudam para "Interna" e "Externa". Definindo Interna = 3,00 cm e Externa = 2,00 cm, o Writer aplica automaticamente 3 cm à esquerda no anverso (páginas ímpares) e 3 cm à direita no verso (páginas pares).'
      }
    ],
    writerSteps: [
      'No menu superior do LibreOffice Writer, acesse <span class="menu-path">Formatar &gt; Estilo da página...</span> (ou abra a barra lateral com <kbd>F11</kbd>, selecione o ícone <strong>Estilos de página</strong>, clique com o botão direito sobre o estilo atual e escolha <strong>Modificar...</strong>).',
      'Abra a aba <strong>Página</strong>. Em <em>Formato do papel</em>, selecione <strong>A4</strong> (confirme Largura <strong>21,00 cm</strong>, Altura <strong>29,70 cm</strong> e Orientação <strong>Retrato</strong>).',
      'Se o trabalho for entregue <strong>somente no anverso</strong>: mantenha <em>Leiaute da página</em> em <strong>Direita e esquerda</strong> e defina Esquerda <strong>3,00 cm</strong>, Direita <strong>2,00 cm</strong>, Superior <strong>3,00 cm</strong> e Inferior <strong>2,00 cm</strong>.',
      'Se o trabalho usar <strong>anverso e verso</strong>: altere <em>Leiaute da página</em> para <strong>Espelhado</strong> e configure Interna <strong>3,00 cm</strong>, Externa <strong>2,00 cm</strong>, Superior <strong>3,00 cm</strong> e Inferior <strong>2,00 cm</strong>. Clique em <strong>OK</strong>.'
    ]
  },
  {
    id: 'mod2',
    num: 2,
    shortTitle: 'Texto e Parágrafos',
    title: 'Módulo 2 — Formatação de Textos e Parágrafos',
    subtitle: 'Fontes recomendadas, usos dos tamanhos 12 e 10, alinhamento justificado, recuo de 1,25 cm e entrelinhas 1,5 e simples.',
    manualRef: 'Seções 9.1 e 9.2 (p. 105–106, 110) • Figura 34',
    caseStudy: {
      title: 'Estudo de caso: o texto com "Enter" duplo e recuo feito na barra de espaço',
      text: 'Ao revisar um relatório em equipe, Marina notou que cada integrante formatou sua parte de um jeito: um usou fonte Calibri 11 alinhada à esquerda; outro pressionou a barra de espaço oito vezes no início de cada parágrafo e deixou 0,25 cm de espaçamento abaixo dos parágrafos, criando lacunas visuais entre blocos de texto.'
    },
    specs: [
      {
        label: 'Fonte e Tamanho Principal',
        value: 'Arial ou Times New Roman • Tamanho 12',
        note: 'Utilizado em todo o trabalho, inclusive capa, folha de rosto, títulos das seções, sumário e referências. Palavras estrangeiras ficam em itálico (Nota 12, p. 105).'
      },
      {
        label: 'Exceções em Tamanho 10',
        value: 'Citações > 3 linhas, notas de rodapé e paginação',
        note: 'Também usam tamanho 10: ficha catalográfica, epígrafe em abertura de seção primária e fonte/legenda/notas de ilustrações e tabelas (o título da ilustração/tabela permanece 12).'
      },
      {
        label: 'Parágrafo Padrão',
        value: 'Justificado • Recuo de 1ª linha: 1,25 cm',
        note: 'Sem espaçamento anterior ou posterior entre parágrafos (Acima: 0,00 cm | Abaixo: 0,00 cm — Seção 9.2, alínea d, p. 106).'
      },
      {
        label: 'Espaçamento entre Linhas',
        value: '1,5 linhas (geral) • Simples / 1,0 (exceções)',
        note: 'Usam espaço simples: citações > 3 linhas, notas de rodapé, referências, ficha catalográfica, natureza do trabalho, epígrafe de seção e título/fonte/legenda/notas de ilustrações e tabelas.'
      }
    ],
    explanations: [
      {
        heading: 'Qual é a diferença entre Margem, Recuo e Espaçamento?',
        body: 'A margem é a distância fixa entre a borda física do papel A4 e o limite da mancha gráfica (configurada no Estilo da Página). O recuo é um deslocamento interno medido a partir da margem: pode afetar apenas a 1ª linha do parágrafo (1,25 cm no texto comum) ou o bloco inteiro (4 cm na citação longa; 8 cm na natureza do trabalho). Já o espaçamento entre linhas (entrelinha) controla a altura vertical entre linhas do mesmo parágrafo (1,5 ou simples), não devendo ser confundido com o espaçamento entre parágrafos (que deve ser 0 cm no texto corrido).'
      }
    ],
    writerSteps: [
      'Pressione <kbd>F11</kbd> para abrir o painel lateral <strong>Estilos</strong> e selecione a categoria <strong>Estilos de parágrafo</strong>.',
      'Clique com o botão direito em <strong>Corpo de texto</strong> (ou <em>Estilo de parágrafo padrão</em>) e escolha <strong>Modificar...</strong>.',
      'Na aba <strong>Fonte</strong>, escolha <strong>Arial</strong> ou <strong>Times New Roman</strong>, estilo <strong>Regular</strong> e tamanho <strong>12 pt</strong>.',
      'Na aba <strong>Alinhamento</strong>, marque <strong>Justificado</strong>.',
      'Na aba <strong>Recuos e espaçamento</strong>, defina: <em>Primeira linha</em> = <strong>1,25 cm</strong>; <em>Acima do parágrafo</em> = <strong>0,00 cm</strong>; <em>Abaixo do parágrafo</em> = <strong>0,00 cm</strong>; e <em>Espaçamento entre linhas</em> = <strong>1,5 linhas</strong>. Confirme em <strong>OK</strong>.'
    ]
  },
  {
    id: 'mod3',
    num: 3,
    shortTitle: 'Títulos e Sumário',
    title: 'Módulo 3 — Títulos, Estilos e Sumário Automático',
    subtitle: 'Numeração progressiva, destaque tipográfico das seções, aplicação de estilos no Writer e geração automática do sumário.',
    manualRef: 'Seção 3.2.1.13 (p. 53–54) e Seção 9.3 (p. 111–113) • Figura 20',
    caseStudy: {
      title: 'Estudo de caso: o sumário cheio de pontinhos digitados à mão',
      text: 'Faltando vinte minutos para enviar o TCC, Beatriz precisou acrescentar dois parágrafos na Introdução. Isso deslocou todas as seções seguintes em uma página. Como ela havia formatado os títulos manualmente com negrito avulso e digitado o sumário linha por linha com a tecla ponto (.), todas as páginas do sumário ficaram erradas.'
    },
    specs: [
      {
        label: 'Seção Primária (Título 1)',
        value: '1 SEÇÃO PRIMÁRIA (MAIÚSCULA e NEGRITO)',
        note: 'Tamanho 12, alinhado à esquerda, sem ponto após o número e com apenas 1 espaço antes do título. Inicia em nova folha (anverso) com 1 linha em branco (1,5) abaixo.'
      },
      {
        label: 'Seção Secundária e Terciária',
        value: '1.1 Secundária (negrito) • 1.1.1 Terciária (negrito + itálico)',
        note: 'Tamanho 12, apenas inicial maiúscula (e nomes próprios), separadas do texto anterior e posterior por 1 linha em branco (1,5) — p. 112–113.'
      },
      {
        label: 'Quaternária, Quinária e Títulos sem Número',
        value: '1.1.1.1 Quaternária (itálico) • 1.1.1.1.1 Quinária (regular)',
        note: 'Títulos sem indicativo numérico (RESUMO, SUMÁRIO, REFERÊNCIAS, APÊNDICE, ANEXO) são centralizados, em MAIÚSCULAS e NEGRITO (p. 112).'
      },
      {
        label: 'Regras do Sumário (Figura 20)',
        value: 'Fonte 12 • Espaçamento 1,5 • Mesma grafia do texto',
        note: 'Elementos pré-textuais NÃO constam no sumário. Os títulos pós-textuais (ex.: REFERÊNCIAS) acompanham o alinhamento dos títulos do sumário (p. 53–54).'
      }
    ],
    explanations: [
      {
        heading: 'Por que usar Estilos (Título 1, Título 2, Título 3) em vez de formatação manual?',
        body: 'Formatar um título apenas clicando no botão "N" (Negrito) altera a aparência visual, mas não informa ao LibreOffice Writer que aquela linha é uma seção estrutural. Quando você aplica os estilos Título 1, Título 2 e Título 3, o Writer constrói automaticamente a árvore no Navegador (F5), mantém todos os títulos padronizados de uma só vez e gera ou atualiza o Sumário Automático em um clique.'
      }
    ],
    writerSteps: [
      'Abra <kbd>F11</kbd> (Estilos de parágrafo) e modifique <strong>Título 1</strong> (Arial/Times 12 pt, Negrito, Efeitos de fonte &gt; Maiúsculas), <strong>Título 2</strong> (12 pt, Negrito) e <strong>Título 3</strong> (12 pt, Negrito Itálico), todos alinhados à esquerda com recuo 0 cm.',
      'Acesse <span class="menu-path">Ferramentas &gt; Numeração de capítulos...</span>. Na aba <strong>Numeração</strong>, associe Nível 1 → Título 1, Nível 2 → Título 2 e Nível 3 → Título 3, escolha Número <strong>1, 2, 3...</strong> e deixe o campo <em>Separador &gt; Depois</em> <strong>vazio</strong> (sem ponto final).',
      'Ainda em <em>Numeração de capítulos</em>, abra a aba <strong>Posição</strong>, selecione os níveis <strong>1–10</strong> e altere <em>Numeração seguida por</em> para <strong>Espaço</strong> (garantindo apenas 1 espaço entre o número e o título, conforme a Seção 9.3.1).',
      'Posicione o cursor na página do sumário, digite o título centralizado <strong>SUMÁRIO</strong> (sem aplicar o estilo Título 1 para que o próprio sumário não entre na lista), dê uma linha em branco (1,5) e clique em <span class="menu-path">Inserir &gt; Sumário e índice &gt; Sumário, índice ou bibliografia...</span> (desmarque o título padrão "Sumário" da caixa ou personalize o estilo para fonte 12 e entrelinha 1,5).',
      'Sempre que editar o documento, clique com o <strong>botão direito</strong> sobre o sumário e escolha <strong>Atualizar índice</strong>.'
    ]
  },
  {
    id: 'mod4',
    num: 4,
    shortTitle: 'Numeração de Páginas',
    title: 'Módulo 4 — Numeração de Páginas',
    subtitle: 'Diferença entre páginas contadas e páginas numeradas, elementos pré-textuais, quebras manuais e Estilos de Página no Writer.',
    manualRef: 'Seção 9.4 (p. 117–118) • Figuras 31 e 32',
    caseStudy: {
      title: 'Estudo de caso: o número "1" estampado na capa do trabalho',
      text: 'Ao inserir o número de página no cabeçalho do seu trabalho, Rafael percebeu que o número 1 apareceu bem no canto da Capa, o 2 na Folha de Rosto e o 3 no Sumário. Tentando apagar o número na Capa com a tecla Delete, ele apagou a numeração de todas as páginas do arquivo ao mesmo tempo.'
    },
    specs: [
      {
        label: 'Capa vs. Elementos Pré-textuais',
        value: 'Capa: NÃO contada • Pré-textuais: CONTADOS, sem exibir número',
        note: 'A contagem inicia sempre na Folha de Rosto. Em trabalhos somente no anverso, não se conta o verso da folha de rosto / ficha catalográfica (Seção 9.4, alínea a, p. 117).'
      },
      {
        label: 'Início da Exibição',
        value: '1ª página da parte textual (1 INTRODUÇÃO) em diante',
        note: 'Algarismos arábicos, fonte tamanho 10, prosseguindo continuamente até a última página dos elementos pós-textuais (Referências, Apêndices, Anexos).'
      },
      {
        label: 'Posição no Anverso',
        value: 'Canto superior direito (a 2 cm do topo e 2 cm da direita)',
        note: 'O último algarismo fica alinhado à margem direita de 2 cm da mancha gráfica (Figura 31, p. 107).'
      },
      {
        label: 'Posição no Verso (quando aplicável)',
        value: 'Canto superior esquerdo (a 2 cm do topo e 2 cm da esquerda)',
        note: 'Em trabalhos com anverso e verso, o primeiro algarismo fica a 2 cm da borda esquerda no verso (Seção 9.4, alínea b; Figura 32, p. 108).'
      }
    ],
    explanations: [
      {
        heading: 'Por que apagar o número na Capa apaga o documento inteiro?',
        body: 'No LibreOffice Writer, o cabeçalho pertence ao Estilo de Página. Se todo o documento usa apenas o "Estilo de página padrão", qualquer campo colocado ou removido no cabeçalho se repete em todas as folhas. A solução técnica correta é usar dois estilos de página (um sem cabeçalho para os elementos pré-textuais e outro com cabeçalho ativado para a parte textual e pós-textual), separados por uma Quebra Manual de Página.'
      }
    ],
    writerSteps: [
      'Nota para a Capa: se a <strong>Capa</strong> estiver no mesmo arquivo (pois a capa não é contada), mantenha-a em um estilo inicial e, ao inserir a quebra para a <em>Folha de rosto</em>, marque <strong>Alterar número da página: 1</strong> para a contagem iniciar na Folha de rosto.',
      'Abra <kbd>F11</kbd> &gt; ícone <strong>Estilos de página</strong>. Clique com o botão direito, escolha <strong>Novo...</strong>, crie o estilo <strong>Pré-textual</strong> (com <em>Cabeçalho desativado</em> e margens 3/3/2/2) e aplique-o da Folha de Rosto até o Sumário.',
      'Crie ou modifique um estilo de página chamado <strong>Textual</strong>: configure a aba <em>Página</em> a 2,00 cm no topo e ative a aba <strong>Cabeçalho</strong> (Altura ~0,50 cm + Espaçamento ~0,50 cm, totalizando 3,00 cm até o início do texto). Para anverso e verso, desmarque <em>Mesmo conteúdo na esquerda e direita</em>.',
      'Posicione o cursor ao final da página do <strong>SUMÁRIO</strong> e acesse <span class="menu-path">Inserir &gt; Mais quebras &gt; Quebra manual...</span>.',
      'Selecione <strong>Quebra de página</strong>, em <em>Estilo de página</em> escolha <strong>Textual</strong> e <strong>NÃO marque</strong> "Alterar número da página" (assim o Writer mantém a contagem acumulada das folhas pré-textuais!).',
      'Clique no cabeçalho da página de <strong>1 INTRODUÇÃO</strong>, alinhe à <strong>direita</strong> (no anverso), escolha fonte <strong>tamanho 10 pt</strong> e acesse <span class="menu-path">Inserir &gt; Número da página</span>.'
    ]
  },
  {
    id: 'mod5',
    num: 5,
    shortTitle: 'Citações e Notas',
    title: 'Módulo 5 — Citações e Notas de Rodapé',
    subtitle: 'Citações diretas curtas e longas, citações indiretas, grafia autor-data, notas explicativas/de referência e filete de 5 cm.',
    manualRef: 'Seções 10 e 11 (p. 126–148) • Figura 34 (p. 110)',
    caseStudy: {
      title: 'Estudo de caso: a transcrição de seis linhas misturada ao parágrafo com aspas',
      text: 'Camila transcreveu literalmente seis linhas de um livro sobre sistemas operacionais dentro do próprio parágrafo, em fonte 12, entre aspas e com o autor em minúsculas dentro dos parênteses. Além disso, inseriu um comentário explicativo no meio do texto em vez de usar o recurso de nota de rodapé do Writer.'
    },
    specs: [
      {
        label: 'Citação Direta até 3 Linhas',
        value: 'No parágrafo • Entre "aspas duplas" • Fonte 12 • Entrelinha 1,5',
        note: 'Exige autor, ano e página. Aspas internas transformam-se em aspas simples (Seção 10.1.1.1, p. 127).'
      },
      {
        label: 'Citação Direta com Mais de 3 Linhas',
        value: 'Recuo de 4 cm • Fonte 10 • Espaço simples • SEM aspas',
        note: 'Justificada, sem recuo adicional de 1ª linha, separada do texto anterior e posterior por 1 linha em branco de espaço 1,5 (Seção 10.1.1.2, p. 127–128).'
      },
      {
        label: 'Citação Indireta e Grafia do Autor',
        value: 'Sem aspas • Fora: Autor (2020) | Dentro: (AUTOR, 2020)',
        note: 'Na citação indireta (paráfrase), autor e ano são obrigatórios e a página é opcional. Dentro dos parênteses o sobrenome fica em MAIÚSCULAS (Seção 10.2, p. 130).'
      },
      {
        label: 'Notas de Rodapé (Seção 11)',
        value: 'Filete de 5 cm • Fonte 10 • Espaço simples • Sem espaço entre notas',
        note: 'Numeração arábica contínua; a partir da 2ª linha, alinhadas abaixo da 1ª letra da 1ª palavra para destacar o expoente. Use autor-data para citações e sistema numérico para notas explicativas (Nota 19, p. 144).'
      }
    ],
    explanations: [
      {
        heading: 'Diferença entre Nota Explicativa e Nota de Referência',
        body: 'As notas de referência indicam fontes consultadas ou remetem a outras partes da obra (ex.: dados obtidos por informação verbal ou trabalhos em fase de elaboração, conforme p. 132), sem dispensar a listagem final em Referências (Nota 20, p. 144). Já as notas explicativas trazem comentários, traduções ou esclarecimentos que quebrariam a fluidez da leitura no texto. Conforme a Nota 19 (p. 144) do Manual do IFCE, deve-se utilizar o sistema autor-data para as citações no texto e reservar o sistema numérico às notas explicativas.'
      }
    ],
    writerSteps: [
      '<strong>Para citação direta longa:</strong> crie ou modifique um estilo de parágrafo chamado <em>Citação Longa ABNT</em> (<kbd>F11</kbd>) com Fonte <strong>10 pt</strong>, Alinhamento <strong>Justificado</strong>, Recuo <em>Antes do texto</em> = <strong>4,00 cm</strong>, <em>Primeira linha</em> = <strong>0,00 cm</strong> e Espaçamento entre linhas <strong>Simples</strong>.',
      'Deixe uma linha em branco (1,5) antes e uma linha em branco (1,5) depois do bloco da citação longa.',
      '<strong>Para inserir nota de rodapé:</strong> posicione o cursor imediatamente após a pontuação/palavra desejada e clique em <span class="menu-path">Inserir &gt; Nota de rodapé e nota de fim &gt; Nota de rodapé</span>.',
      'Modifique o estilo de parágrafo <strong>Nota de rodapé</strong> (<kbd>F11</kbd>) para Fonte <strong>10 pt</strong>, Justificado e Espaçamento entre linhas <strong>Simples</strong> (0,00 cm acima/abaixo).',
      '<strong>Para configurar o filete separador de 5 cm:</strong> acesse <span class="menu-path">Formatar &gt; Estilo da página... &gt; aba Nota de rodapé</span>. Em <em>Linha separadora</em>, mantenha Posição à <strong>Esquerda</strong> e ajuste <em>Comprimento</em> para <strong>31%</strong> (pois 31,25% de 16 cm de mancha gráfica equivale exatamente a 5 cm).'
    ]
  },
  {
    id: 'mod6',
    num: 6,
    shortTitle: 'Referências',
    title: 'Módulo 6 — Referências Bibliográficas',
    subtitle: 'Título da seção, alinhamento exclusivo à esquerda, espaçamento simples, separação entre itens, destaque em negrito e ordenação alfabética.',
    manualRef: 'Seção 12 (p. 149–187) • Figura 40 (p. 152)',
    caseStudy: {
      title: 'Estudo de caso: a lista "Referências Bibliográficas" justificada e fora de ordem',
      text: 'Na última página do trabalho, Pedro escreveu o título numerado "5 REFERÊNCIAS BIBLIOGRÁFICAS", manteve o alinhamento justificado com recuo de 1,25 cm herdado dos parágrafos do texto — o que abriu enormes buracos brancos antes dos links da internet — e listou as obras na ordem em que foram lidas.'
    },
    specs: [
      {
        label: 'Título da Seção',
        value: 'REFERÊNCIAS (centralizado, MAIÚSCULAS, negrito, sem número)',
        note: 'Elemento pós-textual obrigatório. Fonte 12, seguido de 1 linha em branco com espaçamento de 1,5 antes da primeira referência (Figura 40, p. 152).'
      },
      {
        label: 'Alinhamento e Fonte das Referências',
        value: 'Alinhadas somente à esquerda • Fonte tamanho 12 • Sem recuo',
        note: 'Diferentemente do corpo do texto, as referências NÃO são justificadas e usam tamanho 12 (Seção 12.3, alíneas c, d, p. 150).'
      },
      {
        label: 'Espaçamento e Separação',
        value: 'Espaço simples (1,0) • Separadas por 1 linha em branco simples',
        note: 'Cada referência tem entrelinha simples e é separada da seguinte por uma linha em branco de espaço simples (Seção 12.3, alínea d, p. 150).'
      },
      {
        label: 'Ordenação e Destaque Tipográfico',
        value: 'Ordem alfabética única • Negrito somente no título',
        note: 'A Nota 23 (p. 151) recomenda negrito, aplicado apenas ao título da obra (o subtítulo após dois-pontos fica sem negrito — p. 162). Em artigos de periódico, o negrito vai no título do periódico.'
      }
    ],
    explanations: [
      {
        heading: 'Documentos online e obras sem autoria no Manual do IFCE',
        body: 'Para documentos consultados em meio eletrônico, acrescentam-se ao final as expressões "Disponível em: endereço eletrônico. Acesso em: dd mês. aaaa.", abreviando-se os meses com as três primeiras letras seguidas de ponto, exceto "maio" (Quadro 2, p. 172). Quando a obra não possui autoria conhecida, a entrada ocorre diretamente pelo título, com a primeira palavra (incluindo artigo definido/indefinido ou monossílabo inicial) em letras MAIÚSCULAS e sem negrito.'
      }
    ],
    writerSteps: [
      'Inicie a seção com o título <strong>REFERÊNCIAS</strong> centralizado, em MAIÚSCULAS, negrito e tamanho 12 (sem número de seção), deixando <strong>uma linha em branco (1,5)</strong> abaixo.',
      'No painel <kbd>F11</kbd>, crie um estilo de parágrafo chamado <strong>Referência ABNT</strong>: Fonte <strong>12 pt</strong>, Alinhamento <strong>À esquerda</strong>, Recuos zerados (<strong>0,00 cm</strong>) e Espaçamento entre linhas <strong>Simples</strong>.',
      'Digite cada referência em um único parágrafo contínuo (sem quebrar linhas manualmente com Enter no meio da referência), aplicando <strong>negrito</strong> apenas ao título principal.',
      'Para colocar em ordem alfabética automaticamente: selecione todas as referências (ainda sem linhas em branco entre elas), acesse <span class="menu-path">Ferramentas &gt; Ordenar...</span>, mantenha <em>Chave 1: Alfanumérico / Crescente</em> e clique em <strong>OK</strong>.',
      'Após ordenar, insira <strong>uma linha em branco de espaço simples</strong> entre cada referência.'
    ]
  }
];

