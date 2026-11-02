/* ==========================================================================
   Dados da Atividade Avaliativa (Com Nota 0,0 a 10,0)
   Questões práticas baseadas no Manual do IFCE (2020) e no LibreOffice Writer
   Critérios de Equilíbrio: alternativas com extensão homogênea, distratores
   plausíveis com equívocos reais de formatação e distribuição equilibrada de gabarito.
   ========================================================================== */

window.ABNTWorkshop = window.ABNTWorkshop || {};

window.ABNTWorkshop.EVALUATION_DATA = {
  meta: {
    title: 'Atividade Avaliativa Final: Normalização ABNT & LibreOffice Writer',
    institution: 'Instituto Federal de Educação, Ciência e Tecnologia do Ceará — IFCE',
    course: 'Introdução à Computação',
    manualEdition: 'Manual de Normalização de Trabalhos Acadêmicos do IFCE (3ª ed. 2020)',
    totalQuestions: 10,
    pointsPerQuestion: 1.0,
    maxScore: 10.0
  },
  questions: [
    {
      id: 'q1',
      num: 1,
      theme: 'Página e Margens',
      title: 'Configuração de Margens no Anverso de Folha A4',
      scenario: 'Um estudante precisa configurar as margens no LibreOffice Writer para um trabalho acadêmico impresso somente no anverso (páginas ímpares). Considerando as normas da Seção 9.2 do Manual do IFCE, quais são as medidas regulamentares e o procedimento no editor?',
      options: [
        {
          id: 'q1_a',
          text: 'Superior 2,0 cm, Inferior 3,0 cm, Esquerda 3,0 cm e Direita 2,0 cm, acessando o menu Inserir > Cabeçalho e rodapé > Margens de impressão.',
          isCorrect: false,
          explanation: 'Incorreto. A margem superior no anverso mede 3,0 cm e a inferior mede 2,0 cm. Além disso, margens são definidas no Estilo da Página, e não no menu Inserir.'
        },
        {
          id: 'q1_b',
          text: 'Superior 3,0 cm, Inferior 2,0 cm, Esquerda 2,0 cm e Direita 3,0 cm, aplicando o estilo de página padrão em Formatar > Parágrafo > Recuos e espaçamento.',
          isCorrect: false,
          explanation: 'Incorreto. A configuração de 2,0 cm à esquerda e 3,0 cm à direita pertence ao verso (página par). Ademais, margens de folha não se configuram em Formatar > Parágrafo.'
        },
        {
          id: 'q1_c',
          text: 'Superior 3,0 cm, Inferior 2,0 cm, Esquerda 3,0 cm e Direita 2,0 cm, definindo o leiaute em Formatar > Estilo da página... > aba Página.',
          isCorrect: true,
          explanation: 'Correto! A Seção 9.2 (alínea a) e a Figura 31 do Manual do IFCE determinam: esquerda 3 cm, superior 3 cm, direita 2 cm e inferior 2 cm no anverso. No Writer, isso é ajustado em Formatar > Estilo da página... > aba Página.'
        },
        {
          id: 'q1_d',
          text: 'Superior 2,5 cm, Inferior 2,5 cm, Esquerda 3,0 cm e Direita 2,0 cm, configurando a mancha gráfica diretamente em Ferramentas > Opções do LibreOffice Writer.',
          isCorrect: false,
          explanation: 'Incorreto. Margens superior e inferior não medem 2,5 cm na norma do IFCE, e a configuração de documento não é feita nas opções globais do programa.'
        }
      ]
    },
    {
      id: 'q2',
      num: 2,
      theme: 'Formatação de Parágrafo',
      title: 'Recuo de 1ª Linha, Alinhamento e Espaçamento de Parágrafo',
      scenario: 'No LibreOffice Writer, a padronização do corpo de texto deve seguir as regras de alinhamento, recuo e entrelinha do Manual do IFCE (Seções 9.1 e 9.2). Qual conjunto de parâmetros deve ser salvo no estilo de parágrafo "Corpo de texto"?',
      options: [
        {
          id: 'q2_a',
          text: 'Alinhamento justificado, recuo de primeira linha de 1,25 cm, entrelinha de 1,5 linhas e espaçamento anterior e posterior de 0,00 cm.',
          isCorrect: true,
          explanation: 'Correto! Conforme a Seção 9.2 (alínea d, p. 106) e a Seção 9.1 (alínea f), o parágrafo padrão tem recuo de 1,25 cm na primeira linha, alinhamento justificado, entrelinha de 1,5 e sem espaçamento entre parágrafos (0 cm acima/abaixo).'
        },
        {
          id: 'q2_b',
          text: 'Alinhamento justificado, recuo antes do texto de 1,25 cm, entrelinha de 1,5 linhas e espaçamento abaixo do parágrafo de 0,25 cm.',
          isCorrect: false,
          explanation: 'Incorreto. O recuo de 1,25 cm aplica-se exclusivamente à primeira linha, e não a todo o bloco antes do texto. Além disso, não deve haver espaçamento de 0,25 cm abaixo do parágrafo.'
        },
        {
          id: 'q2_c',
          text: 'Alinhamento à esquerda, recuo de primeira linha de 1,25 cm, entrelinha simples de 1,0 linha e espaçamento anterior e posterior de 0,00 cm.',
          isCorrect: false,
          explanation: 'Incorreto. O texto acadêmico geral exige alinhamento justificado e entrelinha de 1,5 linhas, reservando o alinhamento à esquerda e entrelinha simples às referências e citações longas.'
        },
        {
          id: 'q2_d',
          text: 'Alinhamento justificado, recuo de primeira linha de 2,00 cm, entrelinha proporcional de 120% e espaçamento abaixo do parágrafo de 0,50 cm.',
          isCorrect: false,
          explanation: 'Incorreto. O recuo regulamentar da primeira linha no IFCE é de 1,25 cm (e não 2,0 cm), a entrelinha é de 1,5 linhas e não se adiciona espaçamento vertical abaixo do parágrafo.'
        }
      ]
    },
    {
      id: 'q3',
      num: 3,
      theme: 'Tipografia e Tamanhos',
      title: 'Uso de Fonte Tamanho 10 vs. Tamanho 12',
      scenario: 'A norma institucional do IFCE (Seção 9.1) adota o tamanho 12 como padrão geral para todo o trabalho, estipulando o tamanho 10 para exceções específicas. Em qual das alternativas TODOS os elementos listados devem obrigatoriamente utilizar fonte tamanho 10?',
      options: [
        {
          id: 'q3_a',
          text: 'Títulos de seções secundárias, notas de rodapé explicativas, paginação no cabeçalho e corpo do Resumo em língua portuguesa.',
          isCorrect: false,
          explanation: 'Incorreto. Títulos de seções secundárias e o corpo do Resumo utilizam obrigatoriamente fonte tamanho 12.'
        },
        {
          id: 'q3_b',
          text: 'Citações diretas até três linhas, notas de referência no rodapé, sumário automático e epígrafe na folha de abertura de seção.',
          isCorrect: false,
          explanation: 'Incorreto. Citações curtas (até 3 linhas) e o sumário automático são digitados em fonte tamanho 12.'
        },
        {
          id: 'q3_c',
          text: 'Todas as referências bibliográficas finais, número da página no cabeçalho, subtítulos de seção e ficha catalográfica.',
          isCorrect: false,
          explanation: 'Incorreto. A seção de Referências (Seção 12.3, c) e os subtítulos de seção são digitados em fonte tamanho 12, e não 10.'
        },
        {
          id: 'q3_d',
          text: 'Citações diretas com mais de três linhas, notas de rodapé, paginação e fonte/legendas de ilustrações e tabelas.',
          isCorrect: true,
          explanation: 'Correto! A Seção 9.1 (alínea c, p. 105) elenca rigorosamente estas exceções ao tamanho 12: citações diretas longas, notas de rodapé, número de página e elementos de ilustração/tabela.'
        }
      ]
    },
    {
      id: 'q4',
      num: 4,
      theme: 'Títulos e Numeração Progressiva',
      title: 'Formatação de Seções e Numeração de Capítulos no Writer',
      scenario: 'Um estudante está estruturando as seções do seu trabalho no Writer e precisa formatar a seção primária "1 INTRODUÇÃO" e a secundária "1.1 Contexto" de acordo com a Seção 9.3 do Manual do IFCE. Qual é o padrão correto?',
      options: [
        {
          id: 'q4_a',
          text: 'O número arábico deve ser seguido de ponto final e travessão antes do título, formatando cada título manualmente com negrito e itálico na barra de ferramentas.',
          isCorrect: false,
          explanation: 'Incorreto. A norma veda ponto final ou travessão entre o número e o título (Seção 9.3.1, d), e a formatação manual avulsa impede a criação do sumário automático.'
        },
        {
          id: 'q4_b',
          text: 'O número arábico é separado do título por apenas um espaço sem ponto final, configurado no Writer em Ferramentas > Numeração de capítulos... com separador vazio.',
          isCorrect: true,
          explanation: 'Correto! A Seção 9.3.1 (p. 111–112) proíbe ponto, hífen ou travessão após o número. No Writer, isso é padronizado em Ferramentas > Numeração de capítulos... deixando o separador "Depois" vazio e escolhendo "Espaço".'
        },
        {
          id: 'q4_c',
          text: 'O indicativo numérico deve ser alinhado ao centro com algarismos romanos nas seções primárias, utilizando o menu Formatar > Marcadores e numeração.',
          isCorrect: false,
          explanation: 'Incorreto. Títulos com indicativo numérico alinham-se à margem esquerda e utilizam algarismos arábicos (1, 2, 3...), nunca romanos ou centralizados.'
        },
        {
          id: 'q4_d',
          text: 'O título primário deve usar tabulação fixa de 1,25 cm após o número com ponto, aplicando o estilo Título Principal com alinhamento justificado.',
          isCorrect: false,
          explanation: 'Incorreto. O Manual do IFCE estipula apenas um espaço comum de caractere após o número (sem tabulação larga), e os títulos são alinhados à esquerda, não justificados.'
        }
      ]
    },
    {
      id: 'q5',
      num: 5,
      theme: 'Sumário Automático',
      title: 'Estrutura e Conteúdo do Sumário no Manual do IFCE',
      scenario: 'De acordo com a Seção 3.2.1.13 e a Figura 20 do Manual do IFCE, como o estudante deve configurar os elementos contemplados na geração do Sumário no LibreOffice Writer?',
      options: [
        {
          id: 'q5_a',
          text: 'O sumário deve listar todos os elementos do trabalho a partir da Capa, Folha de Rosto e Resumo até os Anexos, mantendo paginação contínua.',
          isCorrect: false,
          explanation: 'Incorreto. Elementos pré-textuais (Capa, Folha de Rosto, Resumo, Listas) não podem constar no sumário de acordo com a ABNT e o Manual do IFCE.'
        },
        {
          id: 'q5_b',
          text: 'O sumário deve incluir obrigatoriamente a Folha de Rosto, o Resumo e as Listas de ilustrações, mas omitir as seções terciárias e os anexos.',
          isCorrect: false,
          explanation: 'Incorreto. Nenhum elemento pré-textual entra no sumário, enquanto seções terciárias e anexos fazem parte dele.'
        },
        {
          id: 'q5_c',
          text: 'O sumário lista apenas as seções textuais (da Introdução à Conclusão) e pós-textuais (como Referências), não devendo conter os elementos pré-textuais.',
          isCorrect: true,
          explanation: 'Correto! A Seção 3.2.1.13 (p. 53–54) estabelece que o sumário é o último elemento pré-textual e contempla unicamente as divisões textuais e pós-textuais da obra.'
        },
        {
          id: 'q5_d',
          text: 'O sumário deve registrar exclusivamente as seções primárias numeradas, excluindo qualquer elemento pós-textual sem indicativo numérico como Referências.',
          isCorrect: false,
          explanation: 'Incorreto. As subdivisões (secundárias, terciárias) e elementos pós-textuais obrigatórios (REFERÊNCIAS) constam no sumário.'
        }
      ]
    },
    {
      id: 'q6',
      num: 6,
      theme: 'Paginação e Estilos de Página',
      title: 'Contagem vs. Exibição e Estilos de Página no Writer',
      scenario: 'Em relação às regras de contagem e exibição do número de página no Manual do IFCE (Seção 9.4), como deve ser planejada a estrutura do documento no LibreOffice Writer?',
      options: [
        {
          id: 'q6_a',
          text: 'A contagem inicia na Capa e todas as páginas exibem o número arábico no rodapé centralizado, aplicando o estilo de página padrão em todo o arquivo.',
          isCorrect: false,
          explanation: 'Incorreto. A Capa não entra na contagem, pré-textuais não exibem número e a numeração fica no cabeçalho superior direito, não no rodapé.'
        },
        {
          id: 'q6_b',
          text: 'A contagem inicia na Folha de Rosto (Folha 1), pré-textuais contam sem exibir número, e a numeração surge na Introdução no canto superior direito.',
          isCorrect: true,
          explanation: 'Correto! Conforme a Seção 9.4 (p. 117), a Capa não conta; a Folha de Rosto é a folha 1; pré-textuais são contadas sem número visível; e a numeração aparece a partir de 1 INTRODUÇÃO no canto superior direito (anverso) a 2 cm das bordas.'
        },
        {
          id: 'q6_c',
          text: 'A contagem inicia somente na Introdução que recebe o número 1 no canto superior direito, desconsiderando completamente as páginas pré-textuais.',
          isCorrect: false,
          explanation: 'Incorreto. As folhas pré-textuais anteriores contam normalmente na numeração total acumulada (a Introdução não reinicia em 1).'
        },
        {
          id: 'q6_d',
          text: 'A Folha de Rosto e o Sumário recebem numeração romana minúscula no cabeçalho, enquanto a Introdução inicia a numeração arábica a partir de 1.',
          isCorrect: false,
          explanation: 'Incorreto. O padrão ABNT adotado no IFCE não utiliza algarismos romanos em pré-textuais; a numeração é exclusivamente arábica oculta.'
        }
      ]
    },
    {
      id: 'q7',
      num: 7,
      theme: 'Citações Diretas Longas',
      title: 'Formatação Regulamentar de Citação Direta com Mais de 3 Linhas',
      scenario: 'Ao inserir uma citação direta literal com 5 linhas extraída de uma obra consultada, qual configuração técnica é exigida pela Seção 10.1.1.2 do Manual do IFCE?',
      options: [
        {
          id: 'q7_a',
          text: 'Parágrafo com recuo de 4,0 cm da margem esquerda, fonte tamanho 10, espaçamento simples, alinhamento justificado e sem aspas, com linhas em branco antes e depois.',
          isCorrect: true,
          explanation: 'Correto! A Seção 10.1.1.2 (p. 127–128) prescreve: recuo de 4 cm da margem esquerda, fonte menor (tamanho 10), espaçamento simples entre linhas, ausência de aspas e 1 linha em branco (1,5) antes e depois.'
        },
        {
          id: 'q7_b',
          text: 'Parágrafo com recuo de primeira linha de 1,25 cm, fonte tamanho 12 em itálico, espaçamento de 1,5 linhas e delimitado por aspas duplas no início e fim.',
          isCorrect: false,
          explanation: 'Incorreto. Citações diretas com mais de 3 linhas não ficam no fluxo do parágrafo, não usam aspas e não utilizam itálico integral.'
        },
        {
          id: 'q7_c',
          text: 'Bloco centralizado com recuo de 2,0 cm em ambas as margens, fonte tamanho 10, espaçamento duplo, com aspas simples e sem indicação de número de página.',
          isCorrect: false,
          explanation: 'Incorreto. O recuo é de 4 cm exclusivo da margem esquerda (não em ambas), o espaçamento é simples e o número de página é obrigatório.'
        },
        {
          id: 'q7_d',
          text: 'Parágrafo com recuo de 8,0 cm da margem esquerda, fonte tamanho 12, espaçamento simples, alinhado à direita e com o texto integralmente sublinhado.',
          isCorrect: false,
          explanation: 'Incorreto. O recuo de 8 cm é reservado à natureza do trabalho na folha de rosto; citações longas utilizam recuo de 4 cm e fonte tamanho 10.'
        }
      ]
    },
    {
      id: 'q8',
      num: 8,
      theme: 'Chamada Autor-Data',
      title: 'Grafia da Chamada Autor-Data no Texto e entre Parênteses',
      scenario: 'No sistema de chamada autor-data adotado pelo Manual do IFCE (Seção 10.2 / NBR 10520:2002), como deve ser apresentada a grafia do autor quando citado no corpo da sentença versus dentro dos parênteses?',
      options: [
        {
          id: 'q8_a',
          text: 'O sobrenome do autor deve ser grafado inteiramente em letras MAIÚSCULAS tanto no corpo da sentença quanto dentro dos parênteses ao final do parágrafo.',
          isCorrect: false,
          explanation: 'Incorreto. Na sentença fora dos parênteses, apenas a letra inicial é maiúscula (ex.: Segundo Ferreira, 2021).'
        },
        {
          id: 'q8_b',
          text: 'O sobrenome do autor deve ser grafado em letras minúsculas na sentença e com inicial maiúscula acompanhada de itálico dentro dos parênteses.',
          isCorrect: false,
          explanation: 'Incorreto. Nomes próprios iniciam com maiúscula na frase e não se aplica itálico ao sobrenome do autor.'
        },
        {
          id: 'q8_c',
          text: 'O sobrenome do autor deve ser grafado em MAIÚSCULAS no corpo da sentença e em minúsculas com inicial maiúscula quando estiver entre parênteses.',
          isCorrect: false,
          explanation: 'Incorreto. A regra é o inverso: inicial maiúscula na sentença e MAIÚSCULAS dentro dos parênteses.'
        },
        {
          id: 'q8_d',
          text: 'O sobrenome fica em inicial maiúscula e minúsculas quando integrado à frase, e inteiramente em letras MAIÚSCULAS quando estiver dentro dos parênteses.',
          isCorrect: true,
          explanation: 'Correto! Conforme a Seção 10.2 (p. 130), fora dos parênteses usa-se inicial maiúscula e minúsculas (ex.: Conforme Silva, 2019); dentro dos parênteses usam-se MAIÚSCULAS: (SILVA, 2019, p. 42).'
        }
      ]
    },
    {
      id: 'q9',
      num: 9,
      theme: 'Notas de Rodapé',
      title: 'Linha Separadora e Configuração da Nota no Writer',
      scenario: 'O Manual do IFCE (Seção 11 e Figura 34) regulamenta a apresentação das notas de rodapé explicativas. Qual é a configuração exigida para a linha separadora e para o texto da nota no LibreOffice Writer?',
      options: [
        {
          id: 'q9_a',
          text: 'Linha separadora de margem a margem (100% da mancha), com texto da nota em fonte tamanho 12, alinhamento justificado e espaçamento entre linhas de 1,5.',
          isCorrect: false,
          explanation: 'Incorreto. A linha separadora não cruza toda a página (mede 5 cm) e as notas usam fonte 10 e entrelinha simples.'
        },
        {
          id: 'q9_b',
          text: 'Linha separadora centralizada medindo 10,0 cm, com texto da nota em fonte tamanho 8, alinhamento à esquerda e espaçamento entre parágrafos de 0,5 cm.',
          isCorrect: false,
          explanation: 'Incorreto. O filete é alinhado à esquerda medindo 5 cm, a fonte é tamanho 10 e não há espaçamento entre notas.'
        },
        {
          id: 'q9_c',
          text: 'Filete separador de 5,0 cm alinhado à esquerda (31% no Writer), com texto em fonte tamanho 10, espaçamento simples e numeração arábica contínua.',
          isCorrect: true,
          explanation: 'Correto! A Seção 11 (p. 144) estipula um filete de 5 cm à esquerda. No Writer (mancha de 16 cm), configura-se comprimento em 31% (5 cm / 16 cm = 31,25%), com fonte 10 e espaçamento simples.'
        },
        {
          id: 'q9_d',
          text: 'Inexistência de linha separadora física, separando a nota do texto principal por duas linhas em branco com fonte tamanho 10 em estilo itálico.',
          isCorrect: false,
          explanation: 'Incorreto. A presença do filete separador de 5 cm é obrigatória pelas normas da ABNT e do IFCE para demarcar o rodapé.'
        }
      ]
    },
    {
      id: 'q10',
      num: 10,
      theme: 'Seção de Referências',
      title: 'Critérios Formais da Seção de REFERÊNCIAS',
      scenario: 'De acordo com a Seção 12.3 e a Figura 40 do Manual do IFCE, quais são os critérios formais para a elaboração da seção final de REFERÊNCIAS?',
      options: [
        {
          id: 'q10_a',
          text: 'Título centralizado com indicativo numérico da seção, referências justificadas com recuo de 1,25 cm, entrelinha de 1,5 e organizadas por ordem cronológica.',
          isCorrect: false,
          explanation: 'Incorreto. O título não é numerado, as referências não são justificadas nem possuem recuo, a entrelinha é simples e a ordem é alfabética.'
        },
        {
          id: 'q10_b',
          text: 'Título REFERÊNCIAS centralizado sem número, obras alinhadas somente à margem esquerda, espaçamento simples, 1 linha simples entre itens e ordem alfabética.',
          isCorrect: true,
          explanation: 'Correto! A Seção 12.3 (p. 150) determina: título REFERÊNCIAS centralizado sem número, alinhamento apenas à esquerda, entrelinha simples, separadas por 1 linha em branco simples, em ordem alfabética única e negrito restrito ao título principal.'
        },
        {
          id: 'q10_c',
          text: 'Título REFERÊNCIAS BIBLIOGRÁFICAS alinhado à esquerda, obras justificadas em espaço simples, sem separação em branco e negrito em toda a referência.',
          isCorrect: false,
          explanation: 'Incorreto. O termo "BIBLIOGRÁFICAS" não é utilizado no título, o alinhamento é somente à esquerda e há 1 linha simples entre as obras.'
        },
        {
          id: 'q10_d',
          text: 'Título centralizado em itálico, referências alinhadas à direita em fonte tamanho 10, espaçamento duplo e organizadas pelo formato do suporte do documento.',
          isCorrect: false,
          explanation: 'Incorreto. As referências utilizam fonte tamanho 12, espaçamento simples, alinhamento à esquerda e ordem alfabética pelo sobrenome do autor.'
        }
      ]
    }
  ]
};
