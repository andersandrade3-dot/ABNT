/* ==========================================================================
   Oficina Prática de Produção no LibreOffice Writer (Seção 5)
   Roteiro passo a passo + Checklist puramente organizacional (sem pontuação)
   ========================================================================== */

window.ABNTWorkshop = window.ABNTWorkshop || {};

window.ABNTWorkshop.WORKSHOP_GUIDE = {
  intro: {
    title: 'Oficina Prática: Produção de Trabalho Acadêmico no LibreOffice Writer',
    lead: 'Abra o LibreOffice Writer em seu computador e siga este roteiro técnico para estruturar, do zero, um minitrabalho acadêmico completo em conformidade com o Manual de Normalização do IFCE (2020). Você pode redigir sobre um tema próprio da disciplina de Introdução à Computação ou utilizar os textos-base de apoio fornecidos em cada etapa.',
    recommendedTheme: 'Tema sugerido caso deseje um assunto pronto: "A Importância de Formatos Abertos (ODF) na Preservação de Documentos Acadêmicos".'
  },
  stages: [
    {
      id: 'ws1',
      stepNum: 1,
      title: 'Configuração inicial da página e estilos de página',
      manualRef: 'Seções 9.1, 9.2 e 9.4 (p. 105–108, 117)',
      menuPaths: [
        'Arquivo > Salvar como... (.odt)',
        'Estilos (F11) > Estilos de página',
        'Formatar > Estilo da página... > Página'
      ],
      instructions: [
        'Crie um documento novo no LibreOffice Writer e salve-o imediatamente no formato nativo OpenDocument (<kbd>Ctrl</kbd> + <kbd>S</kbd>, ex.: <code>oficina_abnt_ifce.odt</code>).',
        'Pressione <kbd>F11</kbd> e clique no quarto ícone do topo do painel (<strong>Estilos de página</strong>).',
        'Modifique o estilo inicial (ou crie os estilos <strong>Pré-textual</strong> e <strong>Textual</strong>) definindo Papel <strong>A4 (21,00 cm × 29,70 cm)</strong>, Orientação <strong>Retrato</strong> e margens do anverso: Esquerda <strong>3,00 cm</strong>, Superior <strong>3,00 cm</strong>, Direita <strong>2,00 cm</strong> e Inferior <strong>2,00 cm</strong> (ou leiaute <em>Espelhado</em> com Interna 3 cm e Externa 2 cm caso produza frente e verso).',
        'No estilo <strong>Pré-textual</strong>, mantenha o <em>Cabeçalho</em> desativado. No estilo <strong>Textual</strong>, ative a aba <em>Cabeçalho</em> (ajustando margem superior a 2,00 cm e altura + espaçamento do cabeçalho em 1,00 cm para que o texto continue iniciando a 3,00 cm do topo).'
      ]
    },
    {
      id: 'ws2',
      stepNum: 2,
      title: 'Capa e Folha de Rosto (Identificação inicial)',
      manualRef: 'Seções 3.1.1 e 3.2.1.1 (p. 23–30) e Figura 33 (p. 109)',
      menuPaths: [
        'Inserir > Mais quebras > Quebra manual...',
        'Formatar > Parágrafo... > Recuos e espaçamento'
      ],
      instructions: [
        '<strong>Na Capa (página externa — não contada):</strong> em fonte Arial ou Times New Roman <strong>12 pt</strong>, centralizado, negrito, MAIÚSCULAS e espaçamento <strong>1,5</strong>, digite no topo o nome do Instituto, <em>Campus</em> e Curso. Deixe <strong>3 linhas em branco (1,5)</strong> e informe o Nome do(a) Autor(a). No centro vertical da folha, digite o <strong>TÍTULO DO TRABALHO</strong> (se houver subtítulo, precedido de dois-pontos e em minúsculas com inicial maiúscula). Nas duas últimas linhas da folha, centralize a Cidade e o Ano (sem ponto nem vírgula entre eles).',
        'Insira uma quebra manual de página (<span class="menu-path">Inserir &gt; Mais quebras &gt; Quebra manual...</span>) mudando para o estilo de página <strong>Pré-textual</strong> e marcando <strong>Alterar número da página: 1</strong> (pois a contagem inicia na Folha de Rosto, e não na Capa!).',
        '<strong>Na Folha de Rosto (Folha 1 — contada, não numerada):</strong> coloque o Nome do(a) Autor(a) no topo (centralizado, MAIÚSCULAS, negrito, 12 pt), deixe <strong>3 linhas em branco (1,5)</strong>, insira o Título centralizado, deixe <strong>2 linhas em branco (1,5)</strong> e adicione a <strong>natureza do trabalho</strong> com <strong>recuo à esquerda de 8,00 cm</strong>, alinhamento <strong>justificado</strong>, fonte 12 (maiúsculas e minúsculas) e <strong>espaçamento simples (1,0)</strong>, seguida da Cidade e do Ano nas últimas linhas.',
        'Ao final da Folha de Rosto, pressione <kbd>Ctrl</kbd> + <kbd>Enter</kbd> para abrir a folha que receberá o <strong>SUMÁRIO</strong> (Folha 2 — contada, sem número visível).'
      ],
      sampleText: 'Trabalho apresentado à disciplina de Introdução à Computação do Curso de Graduação do Instituto Federal de Educação, Ciência e Tecnologia do Ceará (IFCE) como requisito de oficina prática de editoração acadêmica.\nOrientador(a): Prof.(a) Nome do Docente.'
    },
    {
      id: 'ws3',
      stepNum: 3,
      title: 'Reserva da página do Sumário e Quebra para a Parte Textual',
      manualRef: 'Seção 3.2.1.13 (p. 53–54) e Seção 9.4 (p. 117)',
      menuPaths: [
        'Inserir > Mais quebras > Quebra manual... > Estilo: Textual',
        'Inserir > Número da página'
      ],
      instructions: [
        'Na folha reservada ao sumário (ainda no estilo de página <strong>Pré-textual</strong>), digite apenas o título <strong>SUMÁRIO</strong> (centralizado, MAIÚSCULAS, negrito, 12 pt — usando um estilo comum sem nível de capítulo) e deixe <strong>uma linha em branco (1,5)</strong> abaixo.',
        'Logo abaixo dessa linha em branco, acesse <span class="menu-path">Inserir &gt; Mais quebras &gt; Quebra manual...</span>, escolha <strong>Quebra de página</strong>, selecione o <em>Estilo de página</em> <strong>Textual</strong> e <strong>desmarque</strong> "Alterar número da página" (para a numeração continuar a contagem a partir da Folha de Rosto).',
        'Na nova página criada (início da parte textual), clique na área do <strong>Cabeçalho</strong>, alinhe à <strong>direita</strong> (no anverso), ajuste o tamanho da fonte do cabeçalho para <strong>10 pt</strong> e clique em <span class="menu-path">Inserir &gt; Número da página</span>. Confirme que o número exibido reflete as folhas contadas (ex.: <strong>3</strong>, sem aparecer na Capa, na Folha de Rosto nem no Sumário).'
      ]
    },
    {
      id: 'ws4',
      stepNum: 4,
      title: 'Configuração de Títulos, Subtítulos e Numeração de Capítulos',
      manualRef: 'Seção 9.3.1 (p. 111–113)',
      menuPaths: [
        'Estilos (F11) > Estilos de parágrafo > Título 1, Título 2, Título 3',
        'Ferramentas > Numeração de capítulos...'
      ],
      instructions: [
        'No painel <kbd>F11</kbd> (<em>Estilos de parágrafo</em>), modifique <strong>Título 1</strong> (12 pt, Negrito, Efeitos de fonte: Maiúsculas, alinhado à esquerda), <strong>Título 2</strong> (12 pt, Negrito, alinhado à esquerda) e <strong>Título 3</strong> (12 pt, Negrito Itálico, alinhado à esquerda).',
        'Abra <span class="menu-path">Ferramentas &gt; Numeração de capítulos...</span>. Na aba <strong>Numeração</strong>, associe os níveis 1, 2 e 3 a Título 1, Título 2 e Título 3 com número <strong>1, 2, 3...</strong> e deixe o separador <em>Depois</em> vazio (sem ponto). Na aba <strong>Posição</strong>, selecione os níveis 1–10 e defina <em>Numeração seguida por: Espaço</em>.',
        'Crie ao menos duas seções primárias (ex.: <code>1 INTRODUÇÃO</code> e <code>2 DESENVOLVIMENTO</code> e <code>3 CONCLUSÃO</code>) e uma seção secundária (ex.: <code>2.1 Padronização documental no Writer</code>), mantendo <strong>1 linha em branco de espaçamento 1,5</strong> entre os títulos e os parágrafos.'
      ]
    },
    {
      id: 'ws5',
      stepNum: 5,
      title: 'Redação de Parágrafos Formatados',
      manualRef: 'Seções 9.1 e 9.2 (p. 105–106)',
      menuPaths: [
        'Estilos (F11) > Corpo de texto > Modificar...',
        'Exibir > Marcas de formatação (Ctrl + F10)'
      ],
      instructions: [
        'Modifique o estilo <strong>Corpo de texto</strong> (<kbd>F11</kbd>): mesma família tipográfica escolhida (Arial ou Times New Roman), tamanho <strong>12 pt</strong>, cor preta, alinhamento <strong>Justificado</strong>, recuo de <em>Primeira linha</em> = <strong>1,25 cm</strong>, espaçamento <em>Acima</em> e <em>Abaixo</em> = <strong>0,00 cm</strong> e entrelinha de <strong>1,5 linhas</strong>.',
        'Redija ao menos dois parágrafos consecutivos em cada seção aplicando o estilo <strong>Corpo de texto</strong> e aplique <em>itálico</em> em eventuais palavras estrangeiras (como <em>software</em> ou <em>on-line</em>).'
      ],
      sampleText: 'A produção de textos técnicos e científicos no ensino superior demanda o domínio das ferramentas de automação oferecidas pelos editores de texto modernos. Ao substituir ajustes manuais improvisados pelo uso estruturado de estilos no LibreOffice Writer, o estudante assegura consistência visual em todo o documento.'
    },
    {
      id: 'ws6',
      stepNum: 6,
      title: 'Inserção de uma Citação Direta e de uma Nota de Rodapé',
      manualRef: 'Seções 10 e 11 (p. 127–130, 144–148)',
      menuPaths: [
        'Estilos (F11) > Novo estilo: Citação Longa ABNT',
        'Inserir > Nota de rodapé e nota de fim > Nota de rodapé',
        'Formatar > Estilo da página... > Nota de rodapé'
      ],
      instructions: [
        '<strong>Citação direta:</strong> insira uma citação direta curta (até 3 linhas, no parágrafo, entre aspas duplas, com autor, ano e página) <strong>ou</strong> uma citação direta longa (mais de 3 linhas, em parágrafo próprio com estilo de <strong>recuo à esquerda de 4,00 cm</strong>, <strong>fonte 10 pt</strong>, <strong>espaçamento simples</strong>, justificado, <strong>sem aspas</strong> e separado do texto anterior e posterior por 1 linha em branco de 1,5). Verifique a grafia do autor: <code>Segundo Autor (2020, p. 15)</code> fora dos parênteses ou <code>(AUTOR, 2020, p. 15)</code> dentro dos parênteses.',
        '<strong>Nota de rodapé:</strong> posicione o cursor após um termo que mereça esclarecimento e clique em <span class="menu-path">Inserir &gt; Nota de rodapé e nota de fim &gt; Nota de rodapé</span>. Redija uma breve nota explicativa.',
        'Confirme que o estilo <strong>Nota de rodapé</strong> (<kbd>F11</kbd>) usa fonte <strong>10 pt</strong> e entrelinha <strong>Simples</strong>, e ajuste o filete separador de 5 cm em <span class="menu-path">Formatar &gt; Estilo da página... &gt; aba Nota de rodapé</span> definindo <em>Comprimento</em> = <strong>31%</strong> à esquerda.'
      ],
      sampleText: 'De acordo com o Manual de Normalização do Instituto Federal de Educação, Ciência e Tecnologia do Ceará (2020, p. 105), os trabalhos acadêmicos devem ser digitados em cor preta, utilizando-se fonte tamanho 12 para todo o texto e reservando-se o tamanho 10 para citações longas, notas de rodapé, paginação e elementos auxiliares de ilustrações e tabelas.'
    },
    {
      id: 'ws7',
      stepNum: 7,
      title: 'Seção de Referências e Geração Final do Sumário Automático',
      manualRef: 'Seção 12 (p. 149–187) e Seção 3.2.1.13 (p. 53–54)',
      menuPaths: [
        'Ferramentas > Ordenar...',
        'Inserir > Sumário e índice > Sumário, índice ou bibliografia...',
        'Botão direito no Sumário > Atualizar índice'
      ],
      instructions: [
        'Abra uma nova página ao final do trabalho, digite o título <strong>REFERÊNCIAS</strong> centralizado, em MAIÚSCULAS, negrito e fonte 12 (sem número de seção — para que conste no sumário sem número, você pode incluí-lo como estilo adicional na configuração do sumário) e deixe <strong>1 linha em branco (1,5)</strong>.',
        'Liste em <strong>ordem alfabética</strong> todas as obras efetivamente citadas no texto, aplicando fonte <strong>12 pt</strong>, alinhamento <strong>somente à esquerda</strong>, sem recuo, <strong>espaço simples (1,0)</strong>, <strong>negrito apenas no título</strong> e <strong>1 linha em branco de espaço simples</strong> entre cada referência.',
        'Volte à página reservada ao <strong>SUMÁRIO</strong> (Etapa 3), posicione o cursor abaixo da linha em branco sob o título <em>SUMÁRIO</em> e acesse <span class="menu-path">Inserir &gt; Sumário e índice &gt; Sumário, índice ou bibliografia...</span> (desmarque o título interno duplicado para manter apenas o seu título centralizado <em>SUMÁRIO</em>, ajuste os estilos <em>Sumário 1/2/3</em> para 12 pt e entrelinha 1,5 e confirme que nenhum elemento pré-textual entrou na lista).'
      ],
      sampleText: 'INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ. Manual de normalização de trabalhos acadêmicos do IFCE: de acordo com as normas da ABNT. 3. ed. atual. Fortaleza: IFCE, 2020.'
    }
  ],
  checklistGroups: [
    {
      groupTitle: '1. Estrutura da Página e Identificação',
      items: [
        { id: 'chk_a4', text: 'Papel configurado em formato A4 (21 cm × 29,7 cm), orientação Retrato e fonte preta.' },
        { id: 'chk_margins', text: 'Margens do anverso em 3 cm (esquerda e superior) e 2 cm (direita e inferior) — ou leiaute Espelhado se anverso e verso.' },
        { id: 'chk_cover', text: 'Capa e/ou Folha de Rosto com informações institucionais, autor, título, local e ano (e recuo de 8 cm com espaço simples na natureza do trabalho).' }
      ]
    },
    {
      groupTitle: '2. Texto, Títulos e Sumário Automático',
      items: [
        { id: 'chk_font', text: 'Mesma fonte (Arial ou Times New Roman) em todo o documento, tamanho 12 no texto geral e itálico em palavras estrangeiras.' },
        { id: 'chk_paragraph', text: 'Parágrafos do texto com alinhamento justificado, recuo de 1ª linha de 1,25 cm, entrelinha 1,5 e 0 cm acima/abaixo.' },
        { id: 'chk_headings', text: 'Títulos numerados via Estilos (Título 1, 2, 3) e Numeração de Capítulos, sem ponto após o número e com apenas 1 espaço antes do título.' },
        { id: 'chk_toc', text: 'Sumário gerado automaticamente (sem digitar pontos manualmente e sem incluir elementos pré-textuais).' }
      ]
    },
    {
      groupTitle: '3. Paginação, Citação, Nota de Rodapé e Referências',
      items: [
        { id: 'chk_pagenum', text: 'Capa não contada; folhas pré-textuais contadas sem exibir número; numeração visível a partir de 1 INTRODUÇÃO (tamanho 10, canto superior direito a 2 cm no anverso).' },
        { id: 'chk_quote', text: 'Citação direta formatada conforme a extensão (curta com aspas no texto ou longa com recuo de 4 cm, fonte 10, espaço simples e sem aspas) e chamada autor-data correta.' },
        { id: 'chk_footnote', text: 'Nota de rodapé inserida pelo recurso nativo do Writer, em fonte 10, espaço simples e com filete separador de 5 cm (31%).' },
        { id: 'chk_refs', text: 'Seção intitulada REFERÊNCIAS (centralizado, sem número), itens em ordem alfabética, fonte 12, alinhados à esquerda, espaço simples, negrito só no título e separados por 1 linha simples.' }
      ]
    }
  ]
};

