/* ==========================================================================
   Recursos Interativos Adicionais (Seção 6):
   1. Comparador de Formatação
   2. Laboratório de Margens
   3. Organizador de Títulos
   4. Identificador de Problemas
   5. Painel de Consulta Rápida (Manual IFCE 2020 + Menus do Writer)
   6. Glossário Técnico e Editorial
   ========================================================================== */

window.ABNTWorkshop = window.ABNTWorkshop || {};

window.ABNTWorkshop.TOOLS_DATA = {
  /* 1. Comparador de Formatação */
  comparatorCases: [
    {
      id: 'comp_textual',
      label: 'Página Textual, Citação Longa e Nota',
      summary: 'Observe a diferença visual entre um texto com formatação improvisada e a mancha gráfica limpa exigida pelo Manual do IFCE (Seções 9, 10 e 11).',
      highlights: [
        'Paginação sai do rodapé ("Pág. 4") para o canto superior direito (2 cm) em fonte tamanho 10.',
        'Título perde o ponto e o sublinhado ("1. Introdução") e assume "1 INTRODUÇÃO" em MAIÚSCULAS e negrito, com 1 linha em branco (1,5) abaixo.',
        'Parágrafo ganha alinhamento justificado, recuo de 1,25 cm na 1ª linha e entrelinha 1,5.',
        'Citação com mais de 3 linhas perde as aspas, recua 4 cm à esquerda e passa para fonte 10 e espaço simples.',
        'Nota de rodapé passa a usar expoente numérico, filete de 5 cm (31%), fonte 10 e espaço simples.'
      ],
      incorrectHtml: `
        <div class="a4-sheet font-comic" style="padding:1.15rem;">
          <div style="text-align:center;text-decoration:underline;font-size:1.08rem;font-weight:700;margin-bottom:0.35rem;">1. Introdução:</div>
          <p style="font-size:1rem;line-height:1.9;text-align:left;text-indent:0;margin-bottom:0.75rem;">O uso de ferramentas de software livre nas universidades públicas amplia o acesso à produção acadêmica e incentiva padrões abertos de documentação (ver obs. 1).</p>
          <p style="font-size:1rem;line-height:1.85;text-align:left;text-indent:0;margin-bottom:0.75rem;">"A adoção do formato OpenDocument garante que trabalhos científicos possam ser lidos, auditados e preservados por décadas sem dependência tecnológica de um único fabricante comercial de editores de texto." (ferreira, 2021)</p>
          <div style="margin-top:1rem;border-top:2px solid #991b1b;padding-top:0.35rem;font-size:0.92rem;">Obs. 1: O padrão ODF foi reconhecido pela ISO/IEC 26300.</div>
          <div class="a4-page-number bottom-center-err">Página 4</div>
        </div>
      `,
      correctedHtml: `
        <div class="a4-sheet font-arial">
          <div class="a4-page-number top-right">4</div>
          <div class="doc-h1">1 INTRODUÇÃO</div>
          <p class="doc-p">O uso de ferramentas de <em>software</em> livre nas universidades públicas amplia o acesso à produção acadêmica e incentiva padrões abertos de documentação<sup>1</sup>.</p>
          <div class="doc-long-quote">A adoção do formato OpenDocument garante que trabalhos científicos possam ser lidos, auditados e preservados por décadas sem dependência tecnológica de um único fabricante comercial de editores de texto (FERREIRA, 2021, p. 88).</div>
          <p class="doc-p">Dessa forma, o domínio dos estilos no LibreOffice Writer integra a formação básica em computação.</p>
          <div class="doc-footnote-area">
            <div class="doc-footnote-line"></div>
            <p class="doc-footnote-item"><sup>1</sup> O padrão OpenDocument Format (ODF) é regulamentado internacionalmente pela norma ISO/IEC 26300.</p>
          </div>
        </div>
      `
    },
    {
      id: 'comp_rosto',
      label: 'Folha de Rosto e Natureza do Trabalho',
      summary: 'Compare o alinhamento, a ausência de número visível e o recuo de 8 cm da nota de natureza do trabalho (Seção 3.2.1.1, p. 27–30; Figura 33, p. 109).',
      highlights: [
        'A Folha de Rosto é a 1ª folha contada do trabalho, mas não exibe número de página.',
        'Autor no topo centralizado em MAIÚSCULAS e negrito, seguido de 3 linhas em branco (1,5) até o título.',
        'Abaixo do título, deixam-se 2 linhas em branco (1,5) e posiciona-se a natureza do trabalho com recuo de 8 cm da margem esquerda, justificada, fonte 12 (maiúsculas e minúsculas) e espaçamento simples.',
        'Cidade e ano ficam centralizados nas duas últimas linhas, sem vírgula ou travessão entre eles.'
      ],
      incorrectHtml: `
        <div class="a4-sheet font-arial" style="padding:1.25rem;">
          <div style="text-align:right;color:#991b1b;font-size:0.9rem;margin-bottom:0.5rem;">1</div>
          <div style="text-align:center;font-size:1rem;margin-bottom:0.8rem;">Mariana Costa Alves</div>
          <div style="text-align:center;font-size:1.25rem;font-weight:700;text-decoration:underline;margin-bottom:0.8rem;">EDITORAÇÃO CIENTÍFICA COM LIBREOFFICE WRITER</div>
          <p style="text-align:center;font-size:0.85rem;line-height:1.6;margin-bottom:1.5rem;"><em> TRABALHO APRESENTADO AO CURSO DE INTRODUÇÃO À COMPUTAÇÃO DO IFCE PARA AVALIAÇÃO PARCIAL. ORIENTADOR: PROF. CARLOS MENDES.</em></p>
          <div style="text-align:center;font-size:0.95rem;">Fortaleza - CE, 2026.</div>
        </div>
      `,
      correctedHtml: `
        <div class="a4-sheet font-arial">
          <div style="text-align:center;font-weight:700;font-size:0.94rem;margin-bottom:2.1rem;">MARIANA COSTA ALVES</div>
          <div style="text-align:center;font-weight:700;font-size:0.95rem;margin-bottom:1.5rem;">EDITORAÇÃO CIENTÍFICA COM LIBREOFFICE WRITER</div>
          <div style="margin-left:50%;font-size:0.85rem;line-height:1.18;text-align:justify;margin-bottom:2.2rem;">
            Trabalho apresentado à disciplina de Introdução à Computação do Instituto Federal de Educação, Ciência e Tecnologia do Ceará (IFCE) como requisito parcial de avaliação.<br><br>
            Orientador: Prof. Me. Carlos Mendes.
          </div>
          <div style="text-align:center;font-weight:700;font-size:0.92rem;line-height:1.5;">FORTALEZA<br>2026</div>
        </div>
      `
    },
    {
      id: 'comp_refs',
      label: 'Seção de Referências',
      summary: 'Compare o alinhamento à esquerda, o destaque apenas no título, a ordem alfabética e a separação por linha simples (Seção 12.3, p. 150–152; Figura 40).',
      highlights: [
        'Título passa de "4. REFERÊNCIAS BIBLIOGRÁFICAS" (alinhado à esquerda) para "REFERÊNCIAS" (centralizado, sem número), seguido de 1 linha em branco (1,5).',
        'Alinhamento muda de justificado (que estica espaços antes de URLs) para alinhado somente à margem esquerda, sem recuo.',
        'Mantém-se fonte tamanho 12 com espaçamento simples (1,0) e 1 linha em branco simples entre cada obra.',
        'Ordem alfabética rigorosa e negrito restrito ao título principal (subtítulo após dois-pontos fica regular).'
      ],
      incorrectHtml: `
        <div class="a4-sheet font-arial">
          <div style="font-weight:700;font-size:1rem;margin-bottom:0.4rem;">4. REFERÊNCIAS BIBLIOGRÁFICAS</div>
          <p style="font-size:0.82rem;line-height:1.5;text-align:justify;text-indent:1.8rem;margin:0;">VYGOTSKY, Lev Semenovich. <strong>A formação social da mente: o desenvolvimento dos processos psicológicos superiores</strong>. 6. ed. São Paulo: Martins Fontes, 1998.</p>
          <p style="font-size:0.82rem;line-height:1.5;text-align:justify;text-indent:1.8rem;margin:0;">INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ. <em>Manual de normalização de trabalhos acadêmicos do IFCE: de acordo com as normas da ABNT</em>. Fortaleza: IFCE, 2020. Link: https://ifce.edu.br</p>
        </div>
      `,
      correctedHtml: `
        <div class="a4-sheet font-arial">
          <div class="a4-page-number top-right">12</div>
          <div class="doc-title-centered">REFERÊNCIAS</div>
          <p class="doc-ref-item">INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ. <strong>Manual de normalização de trabalhos acadêmicos do IFCE</strong>: de acordo com as normas da ABNT. 3. ed. atual. Fortaleza: IFCE, 2020. Disponível em: https://ifce.edu.br. Acesso em: 10 out. 2026.</p>
          <p class="doc-ref-item" style="margin-bottom:0;">VYGOTSKY, Lev Semenovich. <strong>A formação social da mente</strong>: o desenvolvimento dos processos psicológicos superiores. 6. ed. São Paulo: Martins Fontes, 1998.</p>
        </div>
      `
    }
  ],

  /* 3. Organizador de Títulos (estado inicial embaralhado) */
  outlineOrganizerInitial: [
    { id: 'org1', title: 'Introdução', currentLevel: '2', expectedOrder: 0, expectedLevel: '1' },
    { id: 'org2', title: 'Configuração de estilos no Writer', currentLevel: '1', expectedOrder: 3, expectedLevel: '3' },
    { id: 'org3', title: 'Fundamentação teórica', currentLevel: '2', expectedOrder: 1, expectedLevel: '1' },
    { id: 'org4', title: 'Referências', currentLevel: '1', expectedOrder: 5, expectedLevel: 'post' },
    { id: 'org5', title: 'Editoração eletrônica de textos científicos', currentLevel: '3', expectedOrder: 2, expectedLevel: '2' },
    { id: 'org6', title: 'Conclusão', currentLevel: '2', expectedOrder: 4, expectedLevel: '1' }
  ],

  /* 4. Identificador de Problemas (3 casos rápidos clicáveis/tocáveis) */
  identifierCases: [
    {
      id: 'id_case_1',
      title: 'Caso 1 — Resumo Acadêmico (Elemento Pré-textual)',
      instruction: 'Toque nos elementos da folha abaixo para inspecionar quais apresentam erros segundo o Manual do IFCE (Seção 3.2.1.7, p. 39–40).',
      segments: [
        {
          id: 'c1_s1',
          label: 'Número de página "2" exibido no topo do Resumo',
          hasError: true,
          html: '<div style="text-align:right;font-size:0.82rem;">2</div>',
          feedback: '<strong>Problema identificado:</strong> O Resumo é um elemento pré-textual obrigatório; a folha é contada, mas <strong>não pode exibir número de página</strong> (Seção 9.4, p. 117). Use um Estilo de Página sem cabeçalho nos pré-textuais.'
        },
        {
          id: 'c1_s2',
          label: 'Título RESUMO',
          hasError: false,
          html: '<div style="text-align:center;font-weight:700;font-size:0.95rem;">RESUMO</div>',
          feedback: '<strong>Correto:</strong> Título sem indicativo numérico deve ser centralizado, em letras MAIÚSCULAS, negrito e fonte 12, seguido de uma linha em branco com espaçamento 1,5 (Seção 9.3.1, alínea l, p. 112).'
        },
        {
          id: 'c1_s3',
          label: 'Corpo do Resumo dividido em dois parágrafos com recuo',
          hasError: true,
          html: '<div style="font-size:0.88rem;line-height:1.5;text-align:justify;"><p style="text-indent:2rem;margin:0;">Este trabalho analisa os recursos de estilos de parágrafo e de página do LibreOffice Writer aplicados à normalização acadêmica.</p><p style="text-indent:2rem;margin:0;">Os resultados demonstram redução de retrabalho na geração de sumários e paginação.</p></div>',
          feedback: '<strong>Problema identificado:</strong> Segundo a Seção 3.2.1.7 (p. 39–40 e Figura 13), o Resumo deve ser composto de uma sequência de frases concisas em <strong>parágrafo único, justificado e SEM recuo na primeira linha</strong> (0,00 cm), mantendo fonte 12 e espaçamento 1,5.'
        },
        {
          id: 'c1_s4',
          label: 'Palavras-chave separadas por ponto e vírgula e sem ponto final',
          hasError: true,
          html: '<div style="font-size:0.88rem;margin-top:0.4rem;"><strong>Palavras-chave:</strong> LibreOffice Writer; Normalização; ABNT</div>',
          feedback: '<strong>Problema identificado:</strong> Conforme o Manual do IFCE (p. 39–40), após uma linha em branco (1,5), devem figurar de 3 a 5 palavras-chave <strong>separadas entre si por ponto e finalizadas também por ponto</strong> (ex.: <code>Palavras-chave: LibreOffice Writer. Normalização. ABNT.</code>).'
        }
      ]
    },
    {
      id: 'id_case_2',
      title: 'Caso 2 — Alíneas e Ilustração no Texto',
      instruction: 'Toque em cada componente da página para verificar a conformidade das alíneas e da figura (Seções 9.3.2 e 9.5, p. 113–114, 118–120).',
      segments: [
        {
          id: 'c2_s1',
          label: 'Parágrafo introdutório terminado em dois-pontos e alíneas',
          hasError: false,
          html: '<div style="font-size:0.88rem;line-height:1.5;text-align:justify;"><p style="text-indent:2rem;margin:0;">Para automatizar a estrutura de um documento extenso no Writer, destacam-se dois recursos essenciais:</p><p style="padding-left:2rem;margin:0;">a) estilos de parágrafo vinculados à numeração de capítulos;</p><p style="padding-left:2rem;margin:0;">b) estilos de página combinados com quebras manuais.</p></div>',
          feedback: '<strong>Correto:</strong> O texto que antecede as alíneas termina em dois-pontos (:); as alíneas usam letras minúsculas com parênteses, recuo de 1,25 cm, inicial minúscula, terminam em ponto e vírgula (;) e a última termina em ponto (.) (Seção 9.3.2, p. 113–114).'
        },
        {
          id: 'c2_s2',
          label: 'Título da Figura posicionado ABAIXO da imagem',
          hasError: true,
          html: '<div style="margin:0.5rem 0;text-align:center;"><div style="border:1px solid #94a3b8;background:#f8fafc;padding:0.75rem;font-size:0.8rem;">[ Painel lateral de Estilos (F11) do LibreOffice Writer ]</div><div style="font-size:0.9rem;margin-top:0.3rem;">Figura 1 – Painel de Estilos do LibreOffice Writer</div></div>',
          feedback: '<strong>Problema identificado:</strong> Segundo a Seção 9.5 (p. 118–120), a identificação da ilustração (ex.: <code>Figura 1 – ...</code>) deve aparecer na <strong>parte superior</strong> (acima da imagem), em tamanho 12 e espaçamento simples, precedendo a ilustração.'
        },
        {
          id: 'c2_s3',
          label: 'Ausência de Fonte na parte inferior da Figura',
          hasError: true,
          html: '<div style="text-align:center;font-size:0.78rem;color:#64748b;">(Sem indicação de fonte abaixo da ilustração)</div>',
          feedback: '<strong>Problema identificado:</strong> Na parte inferior da ilustração, é <strong>obrigatório indicar a fonte consultada</strong> (mesmo que seja produção do próprio autor, ex.: <code>Fonte: Elaborada pelo autor (2026).</code>), em <strong>fonte tamanho 10 e espaçamento simples</strong> (Seção 9.5, p. 119).'
        }
      ]
    },
    {
      id: 'id_case_3',
      title: 'Caso 3 — Citações no Texto',
      instruction: 'Analise os três parágrafos abaixo e toque naqueles que violam as regras de citação da Seção 10 (p. 126–131) do Manual do IFCE.',
      segments: [
        {
          id: 'c3_s1',
          label: 'Citação com autor integrado à frase todo em MAIÚSCULAS',
          hasError: true,
          html: '<p style="font-size:0.88rem;line-height:1.5;text-align:justify;text-indent:2rem;margin:0;">Segundo MARCONI E LAKATOS (2003, p. 79), a pesquisa bibliográfica permite colocar o pesquisador em contato direto com a produção escrita sobre o tema.</p>',
          feedback: '<strong>Problema identificado:</strong> Pela Seção 10.2 (p. 130), quando os nomes dos autores fazem parte da sentença (fora dos parênteses), devem ser grafados apenas com a <strong>inicial maiúscula seguida de minúsculas</strong>: <code>Segundo Marconi e Lakatos (2003, p. 79)...</code>.'
        },
        {
          id: 'c3_s2',
          label: 'Citação direta curta sem número de página',
          hasError: true,
          html: '<p style="font-size:0.88rem;line-height:1.5;text-align:justify;text-indent:2rem;margin:0;">Nesse sentido, "a normalização documental constitui etapa indispensável para o intercâmbio científico" (ALMEIDA, 2018).</p>',
          feedback: '<strong>Problema identificado:</strong> Em toda <strong>citação direta</strong> (transcrição literal), é obrigatório informar a página (ou intervalo de páginas), volume ou seção da fonte consultada: <code>(ALMEIDA, 2018, p. 34)</code> (Seção 10.1.1, p. 126–127).'
        },
        {
          id: 'c3_s3',
          label: 'Citação indireta com autor dentro dos parênteses',
          hasError: false,
          html: '<p style="font-size:0.88rem;line-height:1.5;text-align:justify;text-indent:2rem;margin:0;">A utilização consistente de modelos padronizados reduz falhas estruturais durante a revisão final de monografias e artigos (CAVALCANTI <em>et al.</em>, 2000).</p>',
          feedback: '<strong>Correto:</strong> Na citação indireta (sem aspas), a indicação da página é opcional, o sobrenome dentro dos parênteses vem em MAIÚSCULAS e a expressão latina <em>et al.</em> aparece em itálico (Seções 9.1 e 10.2, p. 105, 130).'
        }
      ]
    }
  ],

  /* 5. Painel de Consulta Rápida */
  quickReference: [
    {
      category: 'Página e Margens',
      item: 'Formato do papel e cor',
      spec: 'A4 (21 cm × 29,7 cm) • Retrato • Texto em cor preta',
      writerPath: 'Formatar > Estilo da página... > Página',
      manualRef: 'Seção 9.1 (p. 105)'
    },
    {
      category: 'Página e Margens',
      item: 'Margens — Anverso (frente / página ímpar)',
      spec: 'Esquerda: 3 cm | Superior: 3 cm | Direita: 2 cm | Inferior: 2 cm',
      writerPath: 'Formatar > Estilo da página... > Página (Direita e esquerda)',
      manualRef: 'Seção 9.2, a (p. 106–107)'
    },
    {
      category: 'Página e Margens',
      item: 'Margens — Verso (costas / página par)',
      spec: 'Direita: 3 cm | Superior: 3 cm | Esquerda: 2 cm | Inferior: 2 cm',
      writerPath: 'Formatar > Estilo da página... > Página (Leiaute: Espelhado → Interna 3 cm, Externa 2 cm)',
      manualRef: 'Seção 9.2, b (p. 106, 108)'
    },
    {
      category: 'Fonte e Parágrafo',
      item: 'Fonte e tamanho geral (texto, títulos, capa, referências)',
      spec: 'Arial ou Times New Roman • Tamanho 12 • Estrangeirismos em itálico',
      writerPath: 'Estilos (F11) > Corpo de texto > Modificar > Fonte',
      manualRef: 'Seção 9.1, c (p. 105) e 12.3 (p. 150)'
    },
    {
      category: 'Fonte e Parágrafo',
      item: 'Uso de fonte tamanho 10 (exceções)',
      spec: 'Citações > 3 linhas, notas de rodapé, paginação, ficha catalográfica, epígrafe de seção e fonte/legenda/notas de ilustrações e tabelas',
      writerPath: 'Estilos (F11) > Estilos específicos de citação, nota e cabeçalho',
      manualRef: 'Seção 9.1, c (p. 105)'
    },
    {
      category: 'Fonte e Parágrafo',
      item: 'Parágrafo padrão (corpo do texto)',
      spec: 'Justificado • Recuo de 1ª linha: 1,25 cm • Entrelinha: 1,5 • 0 cm acima/abaixo',
      writerPath: 'Estilos (F11) > Corpo de texto > Alinhamento / Recuos e espaçamento',
      manualRef: 'Seções 9.1, f e 9.2, d (p. 105–106)'
    },
    {
      category: 'Fonte e Parágrafo',
      item: 'Uso de espaçamento simples (1,0)',
      spec: 'Citações > 3 linhas, notas de rodapé, referências, ficha catalográfica, natureza do trabalho, epígrafe de seção e título/fonte/legenda/notas de ilustrações e tabelas',
      writerPath: 'Formatar > Parágrafo... > Espaçamento entre linhas: Simples',
      manualRef: 'Seção 9.1, g (p. 105–106)'
    },
    {
      category: 'Fonte e Parágrafo',
      item: 'Natureza do trabalho (Folha de rosto e aprovação)',
      spec: 'Recuo à esquerda de 8 cm • Justificado • Fonte 12 • Espaço simples',
      writerPath: 'Formatar > Parágrafo... > Antes do texto: 8,00 cm',
      manualRef: 'Seção 3.2.1.1 (p. 27) e 9.2, e (p. 106, 109)'
    },
    {
      category: 'Fonte e Parágrafo',
      item: 'Resumo e Abstract',
      spec: 'Parágrafo único • Justificado • SEM recuo (0 cm) • Fonte 12 • Entrelinha 1,5 • 3 a 5 palavras-chave separadas e finalizadas por ponto',
      writerPath: 'Estilos (F11) > Novo estilo "Resumo" (Primeira linha: 0,00 cm)',
      manualRef: 'Seção 3.2.1.7 (p. 39–40)'
    },
    {
      category: 'Títulos e Sumário',
      item: 'Hierarquia de seções numeradas (1 a 5 níveis)',
      spec: '1 PRIMÁRIA (MAIÚSCULA+negrito) | 1.1 Secundária (negrito) | 1.1.1 Terciária (negrito+itálico) | 1.1.1.1 Quaternária (itálico) | 1.1.1.1.1 Quinária (regular)',
      writerPath: 'Estilos (F11) + Ferramentas > Numeração de capítulos... (sem ponto; seguido por Espaço)',
      manualRef: 'Seção 9.3.1 (p. 111–113)'
    },
    {
      category: 'Títulos e Sumário',
      item: 'Títulos sem indicativo numérico',
      spec: 'RESUMO, ABSTRACT, LISTAS, SUMÁRIO, REFERÊNCIAS, GLOSSÁRIO, APÊNDICE, ANEXO: centralizados, MAIÚSCULAS, negrito, fonte 12, + 1 linha (1,5)',
      writerPath: 'Estilos (F11) > Alinhamento: Centralizado',
      manualRef: 'Seção 9.3.1, l (p. 112)'
    },
    {
      category: 'Títulos e Sumário',
      item: 'Sumário automático',
      spec: 'Fonte 12 • Entrelinha 1,5 • Mesma grafia das seções • NÃO inclui elementos pré-textuais',
      writerPath: 'Inserir > Sumário e índice > Sumário, índice ou bibliografia...',
      manualRef: 'Seção 3.2.1.13 (p. 53–54)'
    },
    {
      category: 'Paginação',
      item: 'Contagem e exibição do número de página',
      spec: 'Capa: não contada | Folha de rosto até Sumário: contadas, sem exibir | 1 INTRODUÇÃO até o fim: exibe em arábicos, fonte 10, a 2 cm do topo e 2 cm da borda externa (direita no anverso, esquerda no verso)',
      writerPath: 'Inserir > Mais quebras > Quebra manual... (Estilo Textual) + Inserir > Número da página',
      manualRef: 'Seção 9.4 (p. 117–118)'
    },
    {
      category: 'Citações e Notas',
      item: 'Citação direta curta (até 3 linhas) vs. longa (> 3 linhas)',
      spec: 'Até 3 linhas: no parágrafo, "aspas duplas", fonte 12, 1,5 | > 3 linhas: recuo 4 cm, fonte 10, espaço simples, sem aspas, 1 linha (1,5) antes e depois',
      writerPath: 'Estilos (F11) > Estilo Citação Longa (Antes do texto: 4,00 cm, 10 pt, Simples)',
      manualRef: 'Seção 10.1.1 (p. 127–128)'
    },
    {
      category: 'Citações e Notas',
      item: 'Chamada autor-data (caixa das letras)',
      spec: 'Na frase: Autor (2020, p. 10) | Entre parênteses: (AUTOR, 2020, p. 10)',
      writerPath: 'Digitação direta conforme contexto sintático',
      manualRef: 'Seção 10.2 (p. 130)'
    },
    {
      category: 'Citações e Notas',
      item: 'Nota de rodapé e linha separadora',
      spec: 'Filete de 5 cm à esquerda • Fonte 10 • Espaço simples • Sem espaço entre notas • 2ª linha alinhada sob a 1ª letra',
      writerPath: 'Inserir > Nota de rodapé e nota de fim + Formatar > Estilo da página... > Nota de rodapé (Comprimento: 31%)',
      manualRef: 'Seção 11 (p. 144–148) e Figura 34'
    },
    {
      category: 'Referências',
      item: 'Formatação da lista de REFERÊNCIAS',
      spec: 'Ordem alfabética • Fonte 12 • Alinhadas somente à esquerda • Espaço simples • Separadas por 1 linha em branco simples • Negrito apenas no título',
      writerPath: 'Estilos (F11) > Alinhamento à esquerda + Ferramentas > Ordenar...',
      manualRef: 'Seção 12.3 (p. 150–152)'
    }
  ],

  /* 6. Glossário Técnico e Editorial */
  glossary: [
    {
      term: 'Margem',
      category: 'Página',
      definition: 'Espaço em branco compreendido entre as bordas físicas da folha de papel A4 e os limites da área útil de impressão (mancha gráfica). No anverso mede 3 cm à esquerda e no topo, e 2 cm à direita e na base (Seção 9.2, p. 106).'
    },
    {
      term: 'Recuo',
      category: 'Parágrafo',
      definition: 'Deslocamento interno do texto medido a partir da margem já configurada na página. Exemplos no Manual do IFCE: 1,25 cm apenas na 1ª linha do parágrafo comum; 4 cm em todo o bloco de citação direta longa; e 8 cm na natureza do trabalho.'
    },
    {
      term: 'Entrelinha (Espaçamento entre linhas)',
      category: 'Parágrafo',
      definition: 'Distância vertical entre as linhas de um mesmo parágrafo. O padrão geral do trabalho é 1,5 linhas, utilizando-se espaçamento simples (1,0) em citações longas, notas de rodapé, referências, natureza do trabalho e elementos auxiliares de ilustrações e tabelas.'
    },
    {
      term: 'Anverso',
      category: 'Página',
      definition: 'Face frontal (frente) de uma folha, correspondente às páginas ímpares quando o documento é impresso em frente e verso. Todos os elementos pré-textuais (exceto a ficha catalográfica impressa) e seções primárias iniciam no anverso.'
    },
    {
      term: 'Verso',
      category: 'Página',
      definition: 'Face posterior (costas) de uma folha, correspondente às páginas pares. Quando utilizado, recebe margem direita de 3 cm, superior de 3 cm, esquerda de 2 cm e inferior de 2 cm, com número de página no canto superior esquerdo.'
    },
    {
      term: 'Citação direta',
      category: 'Citações',
      definition: 'Transcrição textual literal de parte da obra do autor consultado, exigindo obrigatoriamente sobrenome do autor, ano e página. Até 3 linhas fica no parágrafo entre aspas duplas; com mais de 3 linhas recebe recuo de 4 cm, fonte 10, espaço simples e sem aspas.'
    },
    {
      term: 'Citação indireta',
      category: 'Citações',
      definition: 'Texto redigido pelo próprio estudante com base nas ideias da obra de um autor consultado (paráfrase), integrado ao parágrafo sem aspas, com indicação obrigatória do autor e do ano (a página é opcional).'
    },
    {
      term: 'Nota de rodapé',
      category: 'Citações',
      definition: 'Indicação, observação ou aditamento ao texto feito pelo autor, posicionado na margem inferior da mesma página onde ocorre a chamada em expoente numérico, separada por um filete de 5 cm (31% da mancha gráfica no Writer), em fonte 10 e espaço simples.'
    },
    {
      term: 'Elemento pré-textual',
      category: 'Estrutura',
      definition: 'Parte que antecede o conteúdo textual com informações que ajudam na identificação e utilização do trabalho (ex.: folha de rosto, ficha catalográfica, folha de aprovação, resumo, listas e sumário). Suas folhas são contadas a partir da folha de rosto, mas não exibem numeração e não entram no sumário.'
    },
    {
      term: 'Sumário automático',
      category: 'Writer',
      definition: 'Recurso do LibreOffice Writer que lê automaticamente todos os parágrafos marcados com Estilos de Título (Título 1, Título 2, etc.) e monta a relação de seções e números de página correspondentes, permitindo atualização instantânea após edições.'
    },
    {
      term: 'Mancha gráfica',
      category: 'Página',
      definition: 'Área efetiva ocupada pelo texto e ilustrações dentro da folha após o desconto das margens. Em uma folha A4 (21 × 29,7 cm) com margens de 3 e 2 cm, a mancha gráfica possui 16 cm de largura por 24,7 cm de altura.'
    },
    {
      term: 'Estilo de página (Writer)',
      category: 'Writer',
      definition: 'Categoria de estilo exclusiva do LibreOffice Writer (F11 > Estilos de página) que controla tamanho do papel, margens, leiaute espelhado, cabeçalho e rodapé. Permite ocultar a numeração nas páginas pré-textuais e exibi-la a partir da Introdução.'
    },
    {
      term: 'Quebra manual de página',
      category: 'Writer',
      definition: 'Comando (Inserir > Mais quebras > Quebra manual...) que encerra a página atual e permite iniciar a página seguinte aplicando outro Estilo de Página, com opção de manter ou redefinir o contador de páginas.'
    },
    {
      term: 'Elemento pós-textual',
      category: 'Estrutura',
      definition: 'Parte que sucede o texto e complementa o trabalho: Referências (obrigatório), Glossário, Apêndice (elaborado pelo próprio autor), Anexo (não elaborado pelo autor) e Índice. Mantém a numeração contínua de páginas e consta no sumário.'
    }
  ]
};

