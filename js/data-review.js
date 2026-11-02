/* ==========================================================================
   Atividade Principal: Revisão de um Documento Acadêmico
   10 problemas reais de normalização em um trabalho fictício de graduação
   ========================================================================== */

window.ABNTWorkshop = window.ABNTWorkshop || {};

window.ABNTWorkshop.REVIEW_ACTIVITY = {
  documentMeta: {
    fileName: 'Trabalho_Introducao_Computacao_Rascunho_Final.odt',
    studentAuthor: 'Gabriel Souza — Graduação em Computação',
    context: 'Gabriel concluiu a redação do seu trabalho sobre Software Livre e Editoração Acadêmica, mas formatou todo o texto de forma improvisada, sem consultar o Manual de Normalização do IFCE e sem usar os recursos estruturais do LibreOffice Writer.'
  },
  problems: [
    {
      id: 'p1',
      num: 1,
      shortLabel: 'Margens',
      title: 'Margens incorretas e simétricas na página',
      pageLabel: 'Configuração global (Folhas 3 a 5)',
      whatIsWrong: 'O documento está configurado com margens estreitas e iguais nos quatro lados (1,5 cm superior, inferior, esquerda e direita), comprometendo a área de encadernação e alargando excessivamente a mancha gráfica.',
      manualRule: 'Conforme a Seção 9.2 (alíneas a, b, p. 106) e as Figuras 31 e 32 (p. 107–108), no anverso as margens devem medir: esquerda 3 cm, superior 3 cm, direita 2 cm e inferior 2 cm. Quando houver digitação no anverso e verso, o verso utiliza direita 3 cm, superior 3 cm, esquerda 2 cm e inferior 2 cm.',
      writerHowTo: [
        'Acesse <span class="menu-path">Formatar &gt; Estilo da página...</span> e selecione a aba <strong>Página</strong>.',
        'Confirme o formato do papel em <strong>A4 (21,00 cm × 29,70 cm)</strong>.',
        'Para trabalho somente no anverso, mantenha <em>Direita e esquerda</em> e ajuste: <strong>Esquerda 3,00 cm</strong>, <strong>Superior 3,00 cm</strong>, <strong>Direita 2,00 cm</strong> e <strong>Inferior 2,00 cm</strong>.',
        'Para anverso e verso, escolha leiaute <strong>Espelhado</strong> e defina: <strong>Interna 3,00 cm</strong>, <strong>Externa 2,00 cm</strong>, <strong>Superior 3,00 cm</strong> e <strong>Inferior 2,00 cm</strong>.'
      ],
      previewHtml: '<div style="font-size:0.84rem;"><strong>Folha A4 (Anverso):</strong> Margem esquerda <code>3,00 cm</code> | Superior <code>3,00 cm</code> | Direita <code>2,00 cm</code> | Inferior <code>2,00 cm</code> (Mancha gráfica resultante: 16 cm × 24,7 cm).</div>'
    },
    {
      id: 'p2',
      num: 2,
      shortLabel: 'Fonte e tamanho',
      title: 'Fonte, tamanho e cor inadequados no texto principal',
      pageLabel: 'Folha 4 (Texto)',
      whatIsWrong: 'O texto foi digitado em fonte fantasia/decorativa (Trebuchet/Comic), tamanho 13,5 pt, em tom azulado e sem aplicar itálico nos termos estrangeiros ("software", "hardware").',
      manualRule: 'A Seção 9.1 (alíneas b, c e Nota 12, p. 105) estabelece o uso da cor preta para todo o texto, recomenda as fontes Arial ou Times New Roman no tamanho 12 para todo o trabalho (reservando o tamanho 10 apenas às exceções expressas) e determina que palavras em língua estrangeira sejam grafadas em itálico.',
      writerHowTo: [
        'Abra o painel de Estilos com <kbd>F11</kbd>, clique com o botão direito em <strong>Corpo de texto</strong> (ou <em>Estilo de parágrafo padrão</em>) e escolha <strong>Modificar...</strong>.',
        'Na aba <strong>Fonte</strong>, selecione <strong>Arial</strong> ou <strong>Times New Roman</strong>, estilo <strong>Regular</strong> e tamanho <strong>12 pt</strong>.',
        'Na aba <strong>Efeitos de fonte</strong>, defina <em>Cor da fonte</em> como <strong>Automático / Preto</strong>.',
        'Se houver formatação manual sobreposta no texto, selecione os parágrafos e pressione <kbd>Ctrl</kbd> + <kbd>M</kbd> (<em>Limpar formatação direta</em>), reaplicando depois apenas o <em>itálico</em> (<kbd>Ctrl</kbd> + <kbd>I</kbd>) nos termos estrangeiros.'
      ],
      previewHtml: '<p style="font-family:Arial,sans-serif;font-size:0.93rem;color:#111827;margin:0;">A adoção de soluções de <em>software</em> aberto no ensino superior fortalece a autonomia tecnológica discente.</p>'
    },
    {
      id: 'p3',
      num: 3,
      shortLabel: 'Recuo de parágrafo',
      title: 'Parágrafos sem recuo de primeira linha e desalinhados',
      pageLabel: 'Folha 4 (Texto)',
      whatIsWrong: 'Os parágrafos começam colados diretamente na margem esquerda (recuo 0 cm) e estão alinhados apenas à esquerda (bordas direitas irregulares), dificultando a identificação visual de onde inicia cada novo parágrafo.',
      manualRule: 'De acordo com a Seção 9.2 (alínea d, p. 106) e a Figura 34 (p. 110), o parágrafo deve apresentar recuo de 1,25 cm na primeira linha a partir da margem esquerda e alinhamento justificado.',
      writerHowTo: [
        'Nunca utilize a barra de espaço para simular recuo. Modifique o estilo <strong>Corpo de texto</strong> (<kbd>F11</kbd>).',
        'Na aba <strong>Alinhamento</strong>, selecione <strong>Justificado</strong>.',
        'Na aba <strong>Recuos e espaçamento</strong>, defina <em>Antes do texto</em> = <strong>0,00 cm</strong>, <em>Depois do texto</em> = <strong>0,00 cm</strong> e <em>Primeira linha</em> = <strong>1,25 cm</strong>.'
      ],
      previewHtml: '<p style="font-family:Arial,sans-serif;font-size:0.91rem;text-align:justify;text-indent:2rem;line-height:1.5;margin:0;color:#111827;">O domínio consciente de um editor de textos permite separar o conteúdo intelectual da camada visual de apresentação do documento científico.</p>'
    },
    {
      id: 'p4',
      num: 4,
      shortLabel: 'Espaçamento',
      title: 'Espaçamento entre linhas e entre parágrafos incorreto',
      pageLabel: 'Folha 4 (Texto)',
      whatIsWrong: 'O segundo parágrafo está com entrelinha dupla (2,0) e possui um espaçamento extra de 0,50 cm abaixo do parágrafo (além de uma linha vazia aberta com Enter entre parágrafos seguidos).',
      manualRule: 'A Seção 9.1 (alínea f, p. 105) determina que todo o texto deve ser digitado com espaçamento de 1,5 entre as linhas (salvo as exceções em espaço simples), e a Seção 9.2 (alínea d, p. 106) especifica que os parágrafos não devem ter espaçamento anterior ou posterior.',
      writerHowTo: [
        'No estilo <strong>Corpo de texto</strong> (<kbd>F11</kbd> &gt; <em>Modificar...</em> &gt; aba <strong>Recuos e espaçamento</strong>), altere <em>Espaçamento entre linhas</em> para <strong>1,5 linhas</strong>.',
        'Zere os campos <em>Acima do parágrafo</em> (<strong>0,00 cm</strong>) e <em>Abaixo do parágrafo</em> (<strong>0,00 cm</strong>).',
        'Ative <span class="menu-path">Exibir &gt; Marcas de formatação</span> (<kbd>Ctrl</kbd> + <kbd>F10</kbd>) para localizar e remover parágrafos vazios (<span style="font-family:serif;">¶</span>) deixados indevidamente entre dois parágrafos comuns.'
      ],
      previewHtml: '<div style="font-family:Arial,sans-serif;font-size:0.9rem;text-align:justify;line-height:1.5;color:#111827;"><p style="text-indent:2rem;margin:0;">Primeiro parágrafo com entrelinha de 1,5 e zero centímetro abaixo.</p><p style="text-indent:2rem;margin:0;">Segundo parágrafo imediatamente subsequente, identificado pelo recuo de 1,25 cm.</p></div>'
    },
    {
      id: 'p5',
      num: 5,
      shortLabel: 'Títulos e hierarquia',
      title: 'Títulos sem hierarquia padronizada e com pontuação indevida',
      pageLabel: 'Folha 4 (Títulos)',
      whatIsWrong: 'A seção primária foi escrita centralizada, sublinhada, em minúsculas e com ponto e dois-pontos ("1. Introdução:"), enquanto a subseção usa hífen ("1.1 - O formato aberto ODF") sem diferenciação por estilos do Writer.',
      manualRule: 'Segundo a Seção 9.3.1 (p. 111–113), os indicativos numéricos em algarismos arábicos alinham-se à margem esquerda e separam-se do título por apenas um espaço em branco (sem ponto, hífen ou travessão). No padrão do Manual do IFCE (p. 113), a seção primária usa MAIÚSCULAS e NEGRITO (1 INTRODUÇÃO) e a secundária usa inicial maiúscula e negrito (1.1 O formato aberto ODF), ambas em fonte 12, separadas do texto por 1 linha em branco (1,5).',
      writerHowTo: [
        'Configure os estilos <strong>Título 1</strong> (12 pt, Negrito, Maiúsculas, à esquerda) e <strong>Título 2</strong> (12 pt, Negrito, à esquerda) no painel <kbd>F11</kbd>.',
        'Vá em <span class="menu-path">Ferramentas &gt; Numeração de capítulos...</span>, vincule Nível 1 → Título 1 e Nível 2 → Título 2, deixe o separador <em>Depois</em> vazio e, na aba <strong>Posição</strong>, escolha <em>Numeração seguida por: Espaço</em>.',
        'Selecione cada título no texto e aplique o estilo correspondente (<kbd>Ctrl</kbd> + <kbd>1</kbd> para Título 1; <kbd>Ctrl</kbd> + <kbd>2</kbd> para Título 2), mantendo 1 linha em branco (1,5) entre título e texto.'
      ],
      previewHtml: '<div style="font-family:Arial,sans-serif;font-size:0.92rem;color:#111827;"><div style="font-weight:700;margin-bottom:0.5rem;">1 INTRODUÇÃO</div><div style="font-weight:700;">1.1 O formato aberto ODF</div></div>'
    },
    {
      id: 'p6',
      num: 6,
      shortLabel: 'Sumário manual',
      title: 'Sumário digitado manualmente e com elementos pré-textuais',
      pageLabel: 'Folha 3 (Sumário)',
      whatIsWrong: 'O estudante digitou os pontinhos manualmente (gerando uma coluna direita torta), incluiu elementos pré-textuais ("Folha de rosto" e "Resumo") que não podem constar no sumário e não reproduziu a mesma grafia tipográfica das seções.',
      manualRule: 'A Seção 3.2.1.13 (p. 53–54) e a Figura 20 determinam que os elementos pré-textuais NÃO devem constar no sumário. O título SUMÁRIO fica centralizado, em MAIÚSCULAS e negrito (fonte 12), seguido de 1 linha em branco (1,5). Os itens listados (textuais e pós-textuais) mantêm a mesma ordem, grafia e destaque tipográfico do texto, em fonte 12 e entrelinha 1,5.',
      writerHowTo: [
        'Apague as linhas digitadas manualmente. Certifique-se de que apenas as seções textuais e pós-textuais usem estilos configurados para o sumário.',
        'Mantenha o título centralizado <strong>SUMÁRIO</strong> (formatado com estilo sem nível de capítulo para não listar a si próprio) e dê 1 linha em branco (1,5).',
        'Acesse <span class="menu-path">Inserir &gt; Sumário e índice &gt; Sumário, índice ou bibliografia...</span>, desmarque o título interno duplicado e confirme.',
        'Ajuste os estilos <em>Sumário 1</em> e <em>Sumário 2</em> (<kbd>F11</kbd>) para fonte 12 pt e espaçamento 1,5. Clique com o botão direito e use <strong>Atualizar índice</strong> sempre que houver mudanças.'
      ],
      previewHtml: '<div style="font-family:Arial,sans-serif;font-size:0.86rem;color:#111827;"><div style="text-align:center;font-weight:700;margin-bottom:0.45rem;">SUMÁRIO</div><div style="display:flex;"><span><strong>1 INTRODUÇÃO</strong></span><span style="flex:1;border-bottom:1px dotted #64748b;margin:0 4px;"></span><span><strong>4</strong></span></div><div style="display:flex;"><span><strong>1.1 O formato aberto ODF</strong></span><span style="flex:1;border-bottom:1px dotted #64748b;margin:0 4px;"></span><span>4</span></div><div style="display:flex;"><span><strong>REFERÊNCIAS</strong></span><span style="flex:1;border-bottom:1px dotted #64748b;margin:0 4px;"></span><span><strong>5</strong></span></div></div>'
    },
    {
      id: 'p7',
      num: 7,
      shortLabel: 'Paginação',
      title: 'Numeração exibida no Sumário e posicionada no rodapé',
      pageLabel: 'Folhas 3, 4 e 5',
      whatIsWrong: 'O número de página está aparecendo visivelmente na página do Sumário (elemento pré-textual) e foi inserido centralizado no rodapé com a palavra "Página 3", em fonte tamanho 12.',
      manualRule: 'Conforme a Seção 9.4 (p. 117–118), todas as folhas a partir da folha de rosto são contadas, mas não numeradas. A numeração é colocada somente a partir da primeira página da parte textual (1 INTRODUÇÃO), em algarismos arábicos, fonte tamanho 10, no canto superior direito do anverso (a 2 cm da borda superior e 2 cm da borda direita; e no superior esquerdo caso haja verso).',
      writerHowTo: [
        'Aplique um Estilo de Página sem cabeçalho/rodapé nas páginas pré-textuais (Folha de Rosto, Resumo e Sumário).',
        'Ao final do Sumário, clique em <span class="menu-path">Inserir &gt; Mais quebras &gt; Quebra manual...</span>, escolha <strong>Quebra de página</strong>, selecione o estilo <strong>Textual</strong> (com Cabeçalho ativado e rodapé desativado) e <strong>não reinicie</strong> o número da página.',
        'Clique no cabeçalho da página de <em>1 INTRODUÇÃO</em>, alinhe à <strong>direita</strong> (no anverso), selecione fonte <strong>10 pt</strong> e insira apenas <span class="menu-path">Inserir &gt; Número da página</span> (sem a palavra "Página").'
      ],
      previewHtml: '<div style="font-family:Arial,sans-serif;font-size:0.84rem;color:#111827;"><div style="text-align:right;font-size:0.76rem;margin-bottom:0.35rem;">4</div><div><strong>1 INTRODUÇÃO</strong> <em>(Sumário na folha 3 contada sem número visível; Introdução exibe 4 em tamanho 10 no canto superior direito)</em></div></div>'
    },
    {
      id: 'p8',
      num: 8,
      shortLabel: 'Citação longa',
      title: 'Citação direta com mais de 3 linhas sem recuo de 4 cm e com aspas',
      pageLabel: 'Folha 4 (Citação)',
      whatIsWrong: 'Uma transcrição literal de cinco linhas foi deixada com aspas duplas, sem recuo de 4 cm, em fonte 13 com espaçamento 1,5, sem indicação da página consultada e com o sobrenome do autor em letras minúsculas dentro dos parênteses: "(silva, 2019)".',
      manualRule: 'Pela Seção 10.1.1.2 (p. 127–128) e Seção 10.2 (p. 130), citações diretas com mais de três linhas devem constituir parágrafo próprio com recuo de 4 cm da margem esquerda, fonte tamanho 10, sem aspas, espaçamento simples (1,0), justificadas, separadas do texto anterior e posterior por 1 linha em branco (1,5), indicando autor em MAIÚSCULAS dentro dos parênteses, ano e página: (SILVA, 2019, p. 42).',
      writerHowTo: [
        'Remova as aspas duplas do início e do fim da citação longa e complete a referência de chamada com sobrenome em MAIÚSCULAS, ano e página.',
        'No painel <kbd>F11</kbd>, crie/aplique o estilo <strong>Citação Longa ABNT</strong>: Fonte <strong>10 pt</strong>, Alinhamento <strong>Justificado</strong>, Recuo <em>Antes do texto</em> = <strong>4,00 cm</strong>, <em>Primeira linha</em> = <strong>0,00 cm</strong> e Espaçamento entre linhas <strong>Simples</strong>.',
        'Garanta <strong>uma linha em branco de espaçamento 1,5</strong> antes e depois do bloco citado.'
      ],
      previewHtml: '<div style="margin-left:25%;font-family:Arial,sans-serif;font-size:0.78rem;line-height:1.18;text-align:justify;color:#111827;">A padronização aberta dos documentos eletrônicos garante que o patrimônio científico produzido nas universidades públicas permaneça acessível independentemente de fornecedores proprietários específicos (SILVA, 2019, p. 42).</div>'
    },
    {
      id: 'p9',
      num: 9,
      shortLabel: 'Nota de rodapé',
      title: 'Nota de rodapé improvisada manualmente e linha separadora fora do padrão',
      pageLabel: 'Folha 4 (Rodapé)',
      whatIsWrong: 'Em vez de inserir uma nota de rodapé real vinculada a um expoente no texto, o estudante digitou "(ver nota no fim da página)" no parágrafo e desenhou uma linha de sublinhados de margem a margem no pé da folha em fonte 12.',
      manualRule: 'Segundo a Seção 11 (p. 144–148) e a Figura 34 (p. 110), as notas de rodapé são indicadas por algarismo arábico em expoente (¹), separadas do texto por um filete de 5 cm a partir da margem esquerda, digitadas em fonte tamanho 10, espaçamento simples, justificadas e alinhadas a partir da segunda linha abaixo da primeira letra da primeira palavra.',
      writerHowTo: [
        'Apague a linha manual. Posicione o cursor no ponto exato do texto e clique em <span class="menu-path">Inserir &gt; Nota de rodapé e nota de fim &gt; Nota de rodapé</span>.',
        'Verifique no estilo <strong>Nota de rodapé</strong> (<kbd>F11</kbd>) se a fonte está em <strong>10 pt</strong> e o espaçamento entre linhas em <strong>Simples</strong>.',
        'Acesse <span class="menu-path">Formatar &gt; Estilo da página... &gt; aba Nota de rodapé</span> e defina o <em>Comprimento</em> da linha separadora em <strong>31%</strong> à esquerda (equivalente a 5 cm da mancha gráfica de 16 cm).'
      ],
      previewHtml: '<div style="font-family:Arial,sans-serif;color:#111827;"><div style="width:31.25%;height:1px;background:#111827;margin-bottom:4px;"></div><div style="font-size:0.76rem;line-height:1.15;padding-left:0.75rem;text-indent:-0.75rem;"><sup>1</sup> O formato OpenDocument (ODF) é homologado internacionalmente pela norma ISO/IEC 26300.</div></div>'
    },
    {
      id: 'p10',
      num: 10,
      shortLabel: 'Referências',
      title: 'Seção de referências com título incorreto, justificada e fora de ordem alfabética',
      pageLabel: 'Folha 5 (Referências)',
      whatIsWrong: 'A seção foi intitulada "2. Referências Bibliográficas" (com número e adjetivo indevido), as obras estão fora de ordem alfabética (S → I → M), alinhadas de modo justificado com recuo de parágrafo, coladas umas nas outras sem linha em branco e com negrito estendido ao subtítulo.',
      manualRule: 'Pela Seção 12.3 (p. 150–152) e Figura 40, o título deve ser apenas REFERÊNCIAS (centralizado, MAIÚSCULAS, negrito, tamanho 12, sem número), seguido de 1 linha em branco (1,5). As referências devem estar em ordem alfabética única, fonte tamanho 12, alinhadas somente à margem esquerda, em espaço simples e separadas entre si por 1 linha em branco de espaço simples, com negrito apenas no título principal (Nota 23, p. 151; Seção 12.4.2, p. 162).',
      writerHowTo: [
        'Substitua o título por <strong>REFERÊNCIAS</strong> (centralizado, negrito, 12 pt, sem número) e deixe 1 linha em branco (1,5) abaixo.',
        'Aplique um estilo <strong>Referência ABNT</strong> com Fonte <strong>12 pt</strong>, Alinhamento <strong>À esquerda</strong>, Recuo <strong>0,00 cm</strong> e Entrelinha <strong>Simples</strong>.',
        'Corrija o negrito para cobrir somente o título (antes dos dois-pontos). Selecione as referências e ordene em <span class="menu-path">Ferramentas &gt; Ordenar...</span> (Crescente).',
        'Insira <strong>uma linha em branco de espaço simples</strong> entre cada referência.'
      ],
      previewHtml: '<div style="font-family:Arial,sans-serif;font-size:0.84rem;color:#111827;text-align:left;"><div style="text-align:center;font-weight:700;margin-bottom:0.5rem;">REFERÊNCIAS</div><div style="line-height:1.15;margin-bottom:0.55rem;">INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ. <strong>Manual de normalização de trabalhos acadêmicos do IFCE</strong>: de acordo com as normas da ABNT. 3. ed. atual. Fortaleza: IFCE, 2020.</div><div style="line-height:1.15;">MARCONI, Marina de Andrade; LAKATOS, Eva Maria. <strong>Fundamentos de metodologia científica</strong>. 5. ed. São Paulo: Atlas, 2003.</div></div>'
    }
  ]
};

