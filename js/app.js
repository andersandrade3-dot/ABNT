/* ==========================================================================
   Aplicação: Oficina Prática de ABNT (Manual IFCE 2020) & LibreOffice Writer
   Controlador Principal e Mecânicas Interativas
   ========================================================================== */

(function () {
  'use strict';

  const D = window.ABNTWorkshop;
  if (!D) {
    console.error('Dados da aplicação não carregados.');
    return;
  }

  // Estado da Aplicação
  const state = {
    currentView: 'inicio',
    currentModuleId: 'mod1',
    currentToolId: 'comparador',
    theme: localStorage.getItem('abnt_theme') || 'light',
    // Revisão do Documento (10 problemas)
    selectedProblemId: 'p1',
    fixedProblems: new Set(),
    // Oficina Prática Checklist
    checklist: JSON.parse(localStorage.getItem('abnt_workshop_checklist') || '{}'),
    // Atividade Avaliativa (com nota formal 0,0 a 10,0)
    evalStudent: JSON.parse(localStorage.getItem('abnt_eval_student') || '{"name":"","reg":"","course":""}'),
    evalAnswers: JSON.parse(localStorage.getItem('abnt_eval_answers') || '{}'),
    evalSubmitted: localStorage.getItem('abnt_eval_submitted') === 'true',
    // Laboratório de Margens (Módulo 1 / Ferramenta)
    margins: {
      mode: 'anverso',
      top: 3.0,
      left: 3.0,
      right: 2.0,
      bottom: 2.0,
      orientation: 'portrait'
    },
    // Organizador de Títulos (Ferramenta)
    outlineItems: JSON.parse(JSON.stringify(D.TOOLS_DATA.outlineOrganizerInitial)),
    // Identificador de Problemas (Ferramenta)
    inspectedSegments: new Set(),
    // Busca no Glossário e Consulta Rápida
    glossaryQuery: '',
    glossaryCategory: 'todas',
    quickRefQuery: '',
    quickRefCategory: 'todas'
  };

  // Inicialização do Tema
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeToggleButtons();
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('abnt_theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeToggleButtons();
  }

  function updateThemeToggleButtons() {
    const isDark = state.theme === 'dark';
    document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
      btn.innerHTML = isDark
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg><span class="btn-label-desktop">Tema Claro</span>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><span class="btn-label-desktop">Tema Escuro</span>`;
    });
  }

  // Roteamento via Hash (#inicio, #modulos/1..6, #revisao, #oficina, #ferramentas/...)
  function parseHash() {
    const raw = window.location.hash.replace(/^#\/?/, '').trim();
    if (!raw) return { view: 'inicio', param: null };
    const parts = raw.split('/');
    return {
      view: parts[0] || 'inicio',
      param: parts[1] || null
    };
  }

  function navigateTo(view, param = null, replaceState = false) {
    let hash = `#${view}`;
    if (param) hash += `/${param}`;
    if (replaceState) {
      history.replaceState(null, '', hash);
    } else {
      window.location.hash = hash;
    }
    handleRoute();
  }

  function handleRoute() {
    const route = parseHash();
    state.currentView = route.view;

    if (route.view === 'modulos') {
      if (route.param) {
        const modId = route.param.startsWith('mod') ? route.param : `mod${route.param}`;
        if (D.MODULES.some(m => m.id === modId)) {
          state.currentModuleId = modId;
        }
      }
    } else if (route.view === 'ferramentas') {
      if (route.param) {
        state.currentToolId = route.param;
      }
    }

    renderActiveView();
    updateNavigationUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavigationUI() {
    // Atualiza botões da barra lateral
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
      const targetView = btn.dataset.view;
      btn.classList.toggle('active', targetView === state.currentView);
    });

    // Subitens de módulos na barra lateral
    document.querySelectorAll('.sidebar-subbtn[data-mod-id]').forEach(btn => {
      btn.classList.toggle('active', state.currentView === 'modulos' && btn.dataset.modId === state.currentModuleId);
    });

    // Botões da navegação inferior (mobile)
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === state.currentView);
    });
  }

  // Renderizador Central de Vistas
  function renderActiveView() {
    const container = document.getElementById('view-container');
    if (!container) return;

    switch (state.currentView) {
      case 'inicio':
        container.innerHTML = renderHomeView();
        bindHomeEvents();
        break;
      case 'modulos':
        container.innerHTML = renderModulesView();
        bindModulesEvents();
        break;
      case 'revisao':
        container.innerHTML = renderReviewView();
        bindReviewEvents();
        break;
      case 'avaliacao':
        container.innerHTML = renderEvaluationView();
        bindEvaluationEvents();
        break;
      case 'oficina':
        container.innerHTML = renderWorkshopView();
        bindWorkshopEvents();
        break;
      case 'ferramentas':
        container.innerHTML = renderToolsView();
        bindToolsEvents();
        break;
      default:
        container.innerHTML = renderHomeView();
        bindHomeEvents();
        break;
    }
  }

  /* ==========================================================================
     VISTA: INÍCIO (Apresentação Profissional & Acesso Direto)
     ========================================================================== */
  function renderHomeView() {
    return `
      <section class="view-section">
        <div class="hero-banner">
          <span class="eyebrow">Introdução à Computação • IFCE</span>
          <h1 class="page-title">Oficina Prática de ABNT e LibreOffice Writer</h1>
          <p class="page-lead">
            Ambiente profissional de aprendizagem e revisão de trabalhos acadêmicos fundamentado rigorosamente no 
            <strong>Manual de Normalização de Trabalhos Acadêmicos do IFCE (3ª ed. atualizada, 2020)</strong>. 
            Aprenda a reconhecer inconformidades, dominar as regras e aplicar os recursos técnicos nativos do LibreOffice Writer.
          </p>
          <div class="hero-cta-row">
            <button class="btn btn-primary" id="btn-start-modules">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Iniciar pelos 6 Módulos (Passo 1)
            </button>
            <button class="btn btn-secondary" id="btn-start-review">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Revisão de Documento (Passo 2)
            </button>
            <button class="btn btn-secondary" id="btn-open-workshop">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Oficina no Writer (Passo 3)
            </button>
            <button class="btn btn-secondary" id="btn-start-eval" style="border-color:#16a34a;color:#166534;font-weight:700;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Avaliação Final com Nota (Passo 4)
            </button>
          </div>
        </div>

        <!-- Percurso Pedagógico em 4 Passos -->
        <div class="section-block">
          <h2 class="section-heading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" style="color:var(--brand-primary);"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Percurso Formativo Recomendado
          </h2>
          <div class="grid-cards" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));gap:0.85rem;">
            <div class="card card-interactive" data-go-step="modulos">
              <span class="module-num-tag">Passo 1</span>
              <h3 class="card-title" style="margin-top:0.4rem;">6 Módulos Temáticos</h3>
              <p class="card-desc">Estude as normas do IFCE e experimente os laboratórios práticos de cada módulo.</p>
              <div class="card-footer"><span class="btn btn-sm btn-secondary">Acessar &rarr;</span></div>
            </div>
            <div class="card card-interactive" data-go-step="revisao">
              <span class="module-num-tag">Passo 2</span>
              <h3 class="card-title" style="margin-top:0.4rem;">Revisão de Documento</h3>
              <p class="card-desc">Analise o documento universitário fictício com 10 problemas e simule as correções.</p>
              <div class="card-footer"><span class="btn btn-sm btn-secondary">Inspecionar &rarr;</span></div>
            </div>
            <div class="card card-interactive" data-go-step="oficina">
              <span class="module-num-tag">Passo 3</span>
              <h3 class="card-title" style="margin-top:0.4rem;">Oficina no Writer</h3>
              <p class="card-desc">Abra o LibreOffice e produza o minitrabalho orientado pelo roteiro técnico e checklist.</p>
              <div class="card-footer"><span class="btn btn-sm btn-secondary">Produzir &rarr;</span></div>
            </div>
            <div class="card card-interactive" data-go-step="avaliacao" style="border:2px solid #16a34a;background:linear-gradient(180deg, var(--status-ok-bg), var(--bg-surface));">
              <span class="module-num-tag" style="background:#16a34a;color:#fff;">Passo 4 • Conclusão</span>
              <h3 class="card-title" style="margin-top:0.4rem;color:#166534;">Avaliação Final (Nota)</h3>
              <p class="card-desc">Conclua o percurso respondendo às 10 questões práticas para gerar sua nota oficial (0 a 10).</p>
              <div class="card-footer"><span class="btn btn-sm btn-primary" style="background:#166534;">Fazer Avaliação &rarr;</span></div>
            </div>
          </div>
        </div>

        <div class="section-block">
          <h2 class="section-heading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" style="color:var(--brand-primary);"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Módulos Temáticos de Aprendizagem
          </h2>
          <div class="grid-cards cols-3">
            ${D.MODULES.map(m => `
              <div class="card card-interactive" data-open-mod="${m.id}">
                <div class="card-header-row">
                  <span class="module-num-tag">Módulo ${m.num}</span>
                  <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">Manual IFCE</span>
                </div>
                <h3 class="card-title">${m.shortTitle}</h3>
                <p class="card-desc">${m.subtitle}</p>
                <div class="card-footer">
                  <span style="font-size:0.78rem;font-weight:600;color:var(--brand-primary);">${m.manualRef.split('•')[0]}</span>
                  <span class="btn btn-sm btn-secondary">Acessar &rarr;</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section-block">
          <div class="callout manual-ref">
            <div class="callout-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Fidelidade e Rigor Normativo ao Manual do IFCE (2020)
            </div>
            <p style="font-size:0.92rem;margin-bottom:0.4rem;">
              Esta aplicação adota estritamente os parâmetros do <em>Manual de Normalização de Trabalhos Acadêmicos do IFCE</em> (3ª edição atualizada, Fortaleza: IFCE, 2020), que consolida as normas técnicas aplicadas à instituição (NBR 14724, NBR 10520, NBR 6023, NBR 6024, NBR 6027 e NBR 6028).
            </p>
            <p style="font-size:0.85rem;color:var(--text-muted);margin:0;">
              Orientações não detalhadas no manual de referência (como parâmetros de orientação em paisagem) são explicitamente assinaladas na aplicação, preservando a transparência técnica.
            </p>
          </div>
        </div>
      </section>
    `;
  }

  function bindHomeEvents() {
    document.getElementById('btn-start-eval')?.addEventListener('click', () => navigateTo('avaliacao'));
    document.getElementById('card-eval-cta')?.addEventListener('click', () => navigateTo('avaliacao'));
    document.getElementById('btn-start-review')?.addEventListener('click', () => navigateTo('revisao'));
    document.getElementById('btn-start-modules')?.addEventListener('click', () => navigateTo('modulos', '1'));
    document.getElementById('btn-open-workshop')?.addEventListener('click', () => navigateTo('oficina'));

    document.querySelectorAll('[data-go-step]').forEach(card => {
      card.addEventListener('click', () => {
        const step = card.dataset.goStep;
        if (step === 'modulos') navigateTo('modulos', '1');
        else navigateTo(step);
      });
    });

    document.querySelectorAll('[data-open-mod]').forEach(el => {
      el.addEventListener('click', () => {
        const modId = el.dataset.openMod;
        const num = modId.replace('mod', '');
        navigateTo('modulos', num);
      });
    });
  }

  /* ==========================================================================
     VISTA: MÓDULOS TEMÁTICOS (1 a 6)
     ========================================================================== */
  function renderModulesView() {
    const activeMod = D.MODULES.find(m => m.id === state.currentModuleId) || D.MODULES[0];
    const prevMod = D.MODULES.find(m => m.num === activeMod.num - 1);
    const nextMod = D.MODULES.find(m => m.num === activeMod.num + 1);

    return `
      <section class="view-section">
        <!-- Barra de Seleção Rápida de Módulos (Scroll horizontal em celulares) -->
        <div class="pill-bar" role="tablist" aria-label="Módulos de aprendizagem">
          ${D.MODULES.map(m => `
            <button class="pill-btn ${m.id === activeMod.id ? 'active' : ''}" 
                    data-select-mod="${m.num}" 
                    role="tab" 
                    aria-selected="${m.id === activeMod.id}">
              Módulo ${m.num}: ${m.shortTitle}
            </button>
          `).join('')}
        </div>

        <div class="hero-banner" style="margin-bottom:1.25rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem;">
            <span class="eyebrow writer">Módulo ${activeMod.num} • LibreOffice Writer</span>
            <span style="font-size:0.8rem;font-weight:700;color:var(--text-muted);">${activeMod.manualRef}</span>
          </div>
          <h1 class="page-title">${activeMod.title}</h1>
          <p class="page-lead">${activeMod.subtitle}</p>
        </div>

        <!-- Estudo de Caso -->
        <div class="callout case-study">
          <div class="callout-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            ${activeMod.caseStudy.title}
          </div>
          <p style="font-size:0.93rem;margin:0;">${activeMod.caseStudy.text}</p>
        </div>

        <!-- Parâmetros Normativos do Manual IFCE -->
        <div class="section-block">
          <h2 class="section-heading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="color:var(--brand-primary);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            Especificações do Manual do IFCE (3ª ed. 2020)
          </h2>
          <div class="spec-grid">
            ${activeMod.specs.map(s => `
              <div class="spec-item">
                <div class="spec-label">${s.label}</div>
                <div class="spec-value">${s.value}</div>
                <div class="spec-note">${s.note}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Explicações Contextualizadas Expansíveis (Redução de Densidade Visual) -->
        <div class="section-block">
          <details class="collapsible-block">
            <summary class="collapsible-trigger">
              <span>📖 Ver Fundamentação Teórica e Boas Práticas do Manual (${activeMod.explanations.length} tópicos explicativos)</span>
            </summary>
            <div class="collapsible-content">
              ${activeMod.explanations.map(exp => `
                <div class="callout" style="background:var(--bg-surface);margin-bottom:0.75rem;">
                  <div class="callout-title" style="color:var(--text-primary);font-size:0.96rem;">${exp.heading}</div>
                  <p style="font-size:0.91rem;margin:0;line-height:1.55;">${exp.body}</p>
                </div>
              `).join('')}
            </div>
          </details>
        </div>

        <!-- Atividade Interativa do Módulo -->
        <div class="section-block">
          <h2 class="section-heading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="color:var(--writer-accent);"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Atividade Prática Interativa
          </h2>
          <div id="module-activity-container">
            ${renderModuleSpecificActivity(activeMod.id)}
          </div>
        </div>

        <!-- Roteiro Passo a Passo no LibreOffice Writer -->
        <div class="section-block">
          <div class="callout writer-guide">
            <div class="callout-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              Como Configurar Diretamente no LibreOffice Writer
            </div>
            <p style="font-size:0.9rem;margin-bottom:0.6rem;">Siga o procedimento passo a passo no seu editor:</p>
            <ol class="writer-steps">
              ${activeMod.writerSteps.map((step, idx) => `
                <li class="writer-step-item">
                  <span class="step-index">${idx + 1}</span>
                  <div class="step-body">${step}</div>
                </li>
              `).join('')}
            </ol>
          </div>
        </div>

        <!-- Paginação Anterior / Próximo -->
        <div class="module-pager">
          ${prevMod ? `
            <button class="btn btn-secondary" id="btn-prev-mod" data-nav-num="${prevMod.num}">
              &larr; Módulo ${prevMod.num}: ${prevMod.shortTitle}
            </button>
          ` : `<span></span>`}
          ${nextMod ? `
            <button class="btn btn-primary" id="btn-next-mod" data-nav-num="${nextMod.num}">
              Módulo ${nextMod.num}: ${nextMod.shortTitle} &rarr;
            </button>
          ` : `
            <button class="btn btn-writer" id="btn-go-review">
              Ir para a Atividade Principal: Revisão de Documento &rarr;
            </button>
          `}
        </div>
      </section>
    `;
  }

  function bindModulesEvents() {
    document.querySelectorAll('[data-select-mod]').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo('modulos', btn.dataset.selectMod);
      });
    });

    document.getElementById('btn-prev-mod')?.addEventListener('click', e => {
      navigateTo('modulos', e.currentTarget.dataset.navNum);
    });

    document.getElementById('btn-next-mod')?.addEventListener('click', e => {
      navigateTo('modulos', e.currentTarget.dataset.navNum);
    });

    document.getElementById('btn-go-review')?.addEventListener('click', () => {
      navigateTo('revisao');
    });

    bindModuleSpecificActivityEvents(state.currentModuleId);
  }

  /* --------------------------------------------------------------------------
     Atividades Interativas Específicas dos Módulos 1 a 6
     -------------------------------------------------------------------------- */
  function renderModuleSpecificActivity(modId) {
    switch (modId) {
      case 'mod1':
        return renderMod1MarginActivity();
      case 'mod2':
        return renderMod2ParagraphActivity();
      case 'mod3':
        return renderMod3HeadingsActivity();
      case 'mod4':
        return renderMod4PaginationActivity();
      case 'mod5':
        return renderMod5CitationsActivity();
      case 'mod6':
        return renderMod6ReferencesActivity();
      default:
        return '';
    }
  }

  // Módulo 1: Simulador de Margens da Folha A4
  function renderMod1MarginActivity() {
    const isAnverso = state.margins.mode === 'anverso';
    const isValid = isAnverso
      ? state.margins.left === 3 && state.margins.top === 3 && state.margins.right === 2 && state.margins.bottom === 2
      : state.margins.left === 2 && state.margins.top === 3 && state.margins.right === 3 && state.margins.bottom === 2;

    const leftPct = (state.margins.left / 21) * 100;
    const rightPct = (state.margins.right / 21) * 100;
    const topPct = (state.margins.top / 29.7) * 100;
    const bottomPct = (state.margins.bottom / 29.7) * 100;

    const widthCm = (21 - state.margins.left - state.margins.right).toFixed(1);
    const heightCm = (29.7 - state.margins.top - state.margins.bottom).toFixed(1);

    return `
      <div class="lab-split">
        <div class="controls-panel">
          <div class="control-group">
            <label class="control-label">Face da Folha de Papel:</label>
            <div class="segmented-group">
              <button class="seg-btn ${isAnverso ? 'active' : ''}" id="m1-mode-anverso">Anverso (Frente / Ímpar)</button>
              <button class="seg-btn ${!isAnverso ? 'active' : ''}" id="m1-mode-verso">Verso (Costas / Par)</button>
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">Predefinições Rápidas de Configuração:</label>
            <div class="segmented-group">
              <button class="seg-btn" id="m1-preset-err">Incorreta (1,5 cm simétrica)</button>
              <button class="seg-btn" id="m1-preset-abnt">Padrão ABNT / IFCE (3/3/2/2)</button>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.65rem;">
            <div class="control-group">
              <label class="control-label" for="m1-top">Superior (cm):</label>
              <select class="control-select" id="m1-top">
                <option value="1.5" ${state.margins.top === 1.5 ? 'selected' : ''}>1,5 cm</option>
                <option value="2.0" ${state.margins.top === 2.0 ? 'selected' : ''}>2,0 cm</option>
                <option value="2.5" ${state.margins.top === 2.5 ? 'selected' : ''}>2,5 cm</option>
                <option value="3.0" ${state.margins.top === 3.0 ? 'selected' : ''}>3,0 cm (Manual)</option>
              </select>
            </div>
            <div class="control-group">
              <label class="control-label" for="m1-bottom">Inferior (cm):</label>
              <select class="control-select" id="m1-bottom">
                <option value="1.5" ${state.margins.bottom === 1.5 ? 'selected' : ''}>1,5 cm</option>
                <option value="2.0" ${state.margins.bottom === 2.0 ? 'selected' : ''}>2,0 cm (Manual)</option>
                <option value="2.5" ${state.margins.bottom === 2.5 ? 'selected' : ''}>2,5 cm</option>
                <option value="3.0" ${state.margins.bottom === 3.0 ? 'selected' : ''}>3,0 cm</option>
              </select>
            </div>
            <div class="control-group">
              <label class="control-label" for="m1-left">Esquerda (cm):</label>
              <select class="control-select" id="m1-left">
                <option value="1.5" ${state.margins.left === 1.5 ? 'selected' : ''}>1,5 cm</option>
                <option value="2.0" ${state.margins.left === 2.0 ? 'selected' : ''}>2,0 cm</option>
                <option value="2.5" ${state.margins.left === 2.5 ? 'selected' : ''}>2,5 cm</option>
                <option value="3.0" ${state.margins.left === 3.0 ? 'selected' : ''}>3,0 cm</option>
              </select>
            </div>
            <div class="control-group">
              <label class="control-label" for="m1-right">Direita (cm):</label>
              <select class="control-select" id="m1-right">
                <option value="1.5" ${state.margins.right === 1.5 ? 'selected' : ''}>1,5 cm</option>
                <option value="2.0" ${state.margins.right === 2.0 ? 'selected' : ''}>2,0 cm</option>
                <option value="2.5" ${state.margins.right === 2.5 ? 'selected' : ''}>2,5 cm</option>
                <option value="3.0" ${state.margins.right === 3.0 ? 'selected' : ''}>3,0 cm</option>
              </select>
            </div>
          </div>

          <div class="diagnostic-box">
            <div style="font-weight:700;font-size:0.88rem;margin-bottom:0.35rem;">Diagnóstico da Mancha Gráfica:</div>
            <div class="diag-item">
              <span class="diag-badge ${isValid ? 'ok' : 'err'}">${isValid ? 'Conforme Manual' : 'Inadequada'}</span>
              <span>Área de texto: <strong>${widthCm} cm</strong> × <strong>${heightCm} cm</strong></span>
            </div>
            <div style="font-size:0.83rem;color:var(--text-secondary);margin-top:0.4rem;">
              ${isValid
                ? `<span style="color:var(--status-ok);font-weight:600;">Excelente.</span> As medidas atendem fielmente à Seção 9.2 do Manual do IFCE (${isAnverso ? 'E: 3cm, S: 3cm, D: 2cm, I: 2cm' : 'D: 3cm, S: 3cm, E: 2cm, I: 2cm'}).`
                : `<span style="color:var(--status-err);font-weight:600;">Atenção:</span> Para o ${isAnverso ? 'Anverso' : 'Verso'}, configure ${isAnverso ? 'Esquerda 3 cm, Superior 3 cm, Direita 2 cm e Inferior 2 cm' : 'Direita 3 cm, Superior 3 cm, Esquerda 2 cm e Inferior 2 cm'}.`}
            </div>
          </div>
        </div>

        <div class="a4-proportional-stage">
          <div style="font-size:0.78rem;font-weight:700;margin-bottom:0.6rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;">
            Representação Proporcional da Folha A4 (${isAnverso ? 'Anverso / Ímpar' : 'Verso / Par'})
          </div>

          <div class="a4-proportional-sheet" style="--m-top-pct:${topPct}%;--m-right-pct:${rightPct}%;--m-bottom-pct:${bottomPct}%;--m-left-pct:${leftPct}%;">
            <!-- Badges de cota em cada margem -->
            <span class="margin-pill pos-top ${state.margins.top === 3.0 ? 'ok' : 'err'}">S: ${state.margins.top.toFixed(1)} cm</span>
            <span class="margin-pill pos-bottom ${state.margins.bottom === 2.0 ? 'ok' : 'err'}">I: ${state.margins.bottom.toFixed(1)} cm</span>
            <span class="margin-pill pos-left ${isAnverso ? (state.margins.left === 3.0 ? 'ok' : 'err') : (state.margins.left === 2.0 ? 'ok' : 'err')}">E: ${state.margins.left.toFixed(1)} cm</span>
            <span class="margin-pill pos-right ${isAnverso ? (state.margins.right === 2.0 ? 'ok' : 'err') : (state.margins.right === 3.0 ? 'ok' : 'err')}">D: ${state.margins.right.toFixed(1)} cm</span>

            <!-- Indicador do número da página textual -->
            <div class="a4-pagenum-indicator ${isAnverso ? 'anverso' : 'verso'}">
              ${isAnverso ? '3' : '4'}
            </div>

            <!-- Mancha Gráfica Útil -->
            <div class="a4-mancha-box ${isValid ? 'is-valid' : ''}">
              <div class="a4-mancha-heading">${isAnverso ? '1 INTRODUÇÃO' : '1.1 Contextualização'}</div>
              <div class="a4-mancha-line indent"></div>
              <div class="a4-mancha-line"></div>
              <div class="a4-mancha-line short"></div>
              <div class="a4-mancha-line indent" style="margin-top:4px;"></div>
              <div class="a4-mancha-line"></div>
              <div class="a4-mancha-quote">
                <div class="a4-mancha-line"></div>
                <div class="a4-mancha-line"></div>
              </div>
              <div class="a4-mancha-line indent"></div>
              <div class="a4-mancha-line short"></div>
            </div>
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.75rem;text-align:center;">
            Linha pontilhada: limite da mancha gráfica resultante (${widthCm} cm × ${heightCm} cm).
          </div>
        </div>
      </div>
    `;
  }

  // Módulo 2: Comparação de Parágrafos em 3 Estados + Anatomia
  function renderMod2ParagraphActivity() {
    return `
      <div>
        <div style="margin-bottom:1rem;">
          <label class="control-label">Alternar Estado de Formatação do Texto:</label>
          <div class="segmented-group">
            <button class="seg-btn" id="m2-tab-raw">1. Sem Formatação</button>
            <button class="seg-btn" id="m2-tab-bad">2. Formatação Inadequada</button>
            <button class="seg-btn active" id="m2-tab-good">3. Conforme Manual IFCE</button>
          </div>
        </div>

        <div class="writer-window" style="max-width:720px;margin:0 auto 1.5rem auto;">
          <div class="writer-titlebar">
            <span class="writer-titlebar-file">
              <span class="writer-file-badge">ODT</span>
              amostra_formatacao_paragrafos.odt
            </span>
            <span style="font-size:0.72rem;color:#94a3b8;">Visualização no Editor</span>
          </div>
          <div class="writer-ruler">
            <span>| 0 cm</span>
            <span>| 1,25 cm</span>
            <span>| 4 cm</span>
            <span>| 8 cm</span>
            <span>| 16 cm |</span>
          </div>
          <div class="writer-desk">
            <div id="m2-preview-paper" class="a4-sheet font-arial">
              <!-- Conteúdo injetado via JS -->
            </div>
          </div>
        </div>

        <!-- Diagrama: Margem vs Recuo vs Entrelinha -->
        <div class="callout" style="background:var(--bg-surface);">
          <div class="callout-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Anatomia: Diferença entre Margem, Recuo e Espaçamento
          </div>
          <div class="anatomy-diagram">
            <div class="anatomy-margin-zone">
              <span style="font-size:0.74rem;font-weight:700;color:#64748b;">MARGEM DA PÁGINA (3 cm na borda esquerda): definida no Estilo da Página</span>
              <div class="anatomy-text-zone" style="margin-top:0.5rem;">
                <p style="font-size:0.9rem;margin:0;line-height:1.6;">
                  <span class="anatomy-indent-bar"></span>
                  <span style="font-weight:700;color:#16a34a;">RECUO DE 1ª LINHA (1,25 cm):</span> deslocamento interno configurado no estilo de parágrafo.
                </p>
                <p style="font-size:0.86rem;margin-top:0.4rem;line-height:1.5;color:#334155;">
                  A <strong style="color:#2563eb;">ENTRELINHA (1,5 linha)</strong> controla o respiro vertical entre cada linha do mesmo bloco, sem abrir espaços entre parágrafos distintos.
                </p>
              </div>
            </div>
            <div class="anatomy-legend">
              <span class="anatomy-legend-item"><span class="legend-swatch" style="background:#94a3b8;"></span> Margem (Área de encadernação)</span>
              <span class="anatomy-legend-item"><span class="legend-swatch" style="background:#16a34a;"></span> Recuo de 1ª linha (1,25 cm)</span>
              <span class="anatomy-legend-item"><span class="legend-swatch" style="background:#2563eb;"></span> Mancha gráfica útil</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Módulo 3: Organizador e Classificador de Estilos com Sumário
  function renderMod3HeadingsActivity() {
    return `
      <div class="lab-split">
        <div class="controls-panel">
          <div style="font-weight:700;font-size:0.92rem;margin-bottom:0.6rem;">
            Associe cada Seção ao seu Estilo e Nível Hierárquico:
          </div>
          <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:0.9rem;">
            Selecione o estilo correto do LibreOffice Writer para cada item estrutural do trabalho.
          </p>

          <div style="display:flex;flex-direction:column;gap:0.75rem;" id="m3-selectors-list">
            <div class="card" style="padding:0.75rem;">
              <span style="font-size:0.82rem;font-weight:700;display:block;margin-bottom:0.25rem;">Introdução</span>
              <select class="control-select m3-select" data-expected="Título 1">
                <option value="Corpo de texto">Corpo de texto (manual)</option>
                <option value="Título 1" selected>Título 1 (Seção Primária)</option>
                <option value="Título 2">Título 2 (Seção Secundária)</option>
                <option value="Título 3">Título 3 (Seção Terciária)</option>
              </select>
            </div>

            <div class="card" style="padding:0.75rem;">
              <span style="font-size:0.82rem;font-weight:700;display:block;margin-bottom:0.25rem;">Fundamentação Teórica</span>
              <select class="control-select m3-select" data-expected="Título 1">
                <option value="Corpo de texto">Corpo de texto (manual)</option>
                <option value="Título 1" selected>Título 1 (Seção Primária)</option>
                <option value="Título 2">Título 2 (Seção Secundária)</option>
                <option value="Título 3">Título 3 (Seção Terciária)</option>
              </select>
            </div>

            <div class="card" style="padding:0.75rem;">
              <span style="font-size:0.82rem;font-weight:700;display:block;margin-bottom:0.25rem;">O Formato OpenDocument (ODF)</span>
              <select class="control-select m3-select" data-expected="Título 2">
                <option value="Corpo de texto">Corpo de texto (manual)</option>
                <option value="Título 1">Título 1 (Seção Primária)</option>
                <option value="Título 2" selected>Título 2 (Seção Secundária)</option>
                <option value="Título 3">Título 3 (Seção Terciária)</option>
              </select>
            </div>

            <div class="card" style="padding:0.75rem;">
              <span style="font-size:0.82rem;font-weight:700;display:block;margin-bottom:0.25rem;">Aplicações no Ensino Superior</span>
              <select class="control-select m3-select" data-expected="Título 3">
                <option value="Corpo de texto">Corpo de texto (manual)</option>
                <option value="Título 1">Título 1 (Seção Primária)</option>
                <option value="Título 2">Título 2 (Seção Secundária)</option>
                <option value="Título 3" selected>Título 3 (Seção Terciária)</option>
              </select>
            </div>

            <div class="card" style="padding:0.75rem;">
              <span style="font-size:0.82rem;font-weight:700;display:block;margin-bottom:0.25rem;">Considerações Finais</span>
              <select class="control-select m3-select" data-expected="Título 1">
                <option value="Corpo de texto">Corpo de texto (manual)</option>
                <option value="Título 1" selected>Título 1 (Seção Primária)</option>
                <option value="Título 2">Título 2 (Seção Secundária)</option>
                <option value="Título 3">Título 3 (Seção Terciária)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div style="font-weight:700;font-size:0.92rem;margin-bottom:0.6rem;">
            Resultado Gerado no Sumário Automático do Writer:
          </div>
          <div class="a4-sheet font-arial" style="max-width:100%;min-height:360px;">
            <div class="doc-title-centered" style="margin-bottom:1.5rem;">SUMÁRIO</div>
            <ul class="toc-list" id="m3-toc-preview">
              <li class="toc-row">
                <span class="toc-num"><strong>1</strong></span>
                <span class="toc-title"><strong>INTRODUÇÃO</strong></span>
                <span class="toc-dots"></span>
                <span class="toc-page"><strong>3</strong></span>
              </li>
              <li class="toc-row">
                <span class="toc-num"><strong>2</strong></span>
                <span class="toc-title"><strong>FUNDAMENTAÇÃO TEÓRICA</strong></span>
                <span class="toc-dots"></span>
                <span class="toc-page"><strong>4</strong></span>
              </li>
              <li class="toc-row">
                <span class="toc-num"><strong>2.1</strong></span>
                <span class="toc-title"><strong>O formato OpenDocument (ODF)</strong></span>
                <span class="toc-dots"></span>
                <span class="toc-page">4</span>
              </li>
              <li class="toc-row">
                <span class="toc-num"><strong>2.1.1</strong></span>
                <span class="toc-title"><em><strong>Aplicações no ensino superior</strong></em></span>
                <span class="toc-dots"></span>
                <span class="toc-page">5</span>
              </li>
              <li class="toc-row">
                <span class="toc-num"><strong>3</strong></span>
                <span class="toc-title"><strong>CONSIDERAÇÕES FINAIS</strong></span>
                <span class="toc-dots"></span>
                <span class="toc-page"><strong>6</strong></span>
              </li>
              <li class="toc-row">
                <span class="toc-num"></span>
                <span class="toc-title"><strong>REFERÊNCIAS</strong></span>
                <span class="toc-dots"></span>
                <span class="toc-page"><strong>7</strong></span>
              </li>
            </ul>
          </div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.5rem;">
            Nota: Conforme a Figura 20 (p. 54), seções primárias usam MAIÚSCULAS e negrito; secundárias usam inicial maiúscula e negrito; terciárias usam negrito e itálico; e elementos pós-textuais (REFERÊNCIAS) não possuem número.
          </div>
        </div>
      </div>
    `;
  }

  // Módulo 4: Esquema Visual de Páginas Contadas vs. Páginas Numeradas
  function renderMod4PaginationActivity() {
    return `
      <div>
        <div class="callout manual-ref" style="margin-bottom:1.25rem;">
          <div class="callout-title">Regra de Ouro da Paginação (Seção 9.4, p. 117)</div>
          <p style="font-size:0.92rem;margin:0;">
            <strong>A Capa NÃO é contada.</strong> A contagem sequencial inicia na <strong>Folha de Rosto (Folha 1)</strong>. 
            Todas as folhas pré-textuais são contadas, mas <strong>o número só aparece visível a partir da primeira folha textual (1 INTRODUÇÃO)</strong>, 
            no canto superior direito (anverso), em algarismos arábicos e fonte tamanho 10.
          </p>
        </div>

        <div style="margin-bottom:0.75rem;font-weight:700;font-size:0.95rem;">
          Sequência Estrutural de um Trabalho Acadêmico no IFCE:
        </div>

        <div class="page-flow-grid">
          <div class="mini-page-card is-cover">
            <span class="a4-page-tag">Parte Externa</span>
            <div class="mini-page-num-corner hidden-num">Não numerada</div>
            <div class="mini-page-title">CAPA</div>
            <div class="mini-page-meta" style="color:var(--status-err);font-weight:700;">NÃO CONTADA</div>
          </div>

          <div class="mini-page-card is-pretextual">
            <span class="a4-page-tag">Pré-textual</span>
            <div class="mini-page-num-corner hidden-num">[Número oculto]</div>
            <div class="mini-page-title">FOLHA DE ROSTO</div>
            <div class="mini-page-meta">Folha 1 (Contada)</div>
          </div>

          <div class="mini-page-card is-pretextual">
            <span class="a4-page-tag">Pré-textual</span>
            <div class="mini-page-num-corner hidden-num">[Número oculto]</div>
            <div class="mini-page-title">RESUMO</div>
            <div class="mini-page-meta">Folha 2 (Contada)</div>
          </div>

          <div class="mini-page-card is-pretextual">
            <span class="a4-page-tag">Pré-textual</span>
            <div class="mini-page-num-corner hidden-num">[Número oculto]</div>
            <div class="mini-page-title">SUMÁRIO</div>
            <div class="mini-page-meta">Folha 3 (Contada)</div>
          </div>
        </div>

        <div class="break-badge-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/></svg>
          <strong>Ponto Crítico no Writer:</strong> Inserir &gt; Mais quebras &gt; Quebra manual de página com mudança para o Estilo de Página <em>Textual</em> (sem reiniciar contagem).
        </div>

        <div class="page-flow-grid">
          <div class="mini-page-card is-textual">
            <span class="a4-page-tag">Textual</span>
            <div class="mini-page-num-corner visible">4 (Sup. Dir.)</div>
            <div class="mini-page-title">1 INTRODUÇÃO</div>
            <div class="mini-page-meta" style="color:var(--status-ok);font-weight:700;">NUMERAÇÃO VISÍVEL</div>
          </div>

          <div class="mini-page-card is-textual">
            <span class="a4-page-tag">Textual</span>
            <div class="mini-page-num-corner visible">5 (Sup. Dir.)</div>
            <div class="mini-page-title">2 DESENVOLVIMENTO</div>
            <div class="mini-page-meta" style="color:var(--status-ok);">Numeração contínua</div>
          </div>

          <div class="mini-page-card is-textual">
            <span class="a4-page-tag">Pós-textual</span>
            <div class="mini-page-num-corner visible">6 (Sup. Dir.)</div>
            <div class="mini-page-title">REFERÊNCIAS</div>
            <div class="mini-page-meta" style="color:var(--status-ok);">Numeração contínua</div>
          </div>
        </div>
      </div>
    `;
  }

  // Módulo 5: Clínica de Citações e Notas de Rodapé
  function renderMod5CitationsActivity() {
    return `
      <div>
        <p style="font-size:0.92rem;color:var(--text-secondary);margin-bottom:1rem;">
          Analise a demonstração visual de uma citação direta longa conforme a Seção 10.1.1.2 do Manual do IFCE:
        </p>

        <div class="writer-window" style="max-width:720px;margin:0 auto 1.5rem auto;">
          <div class="writer-titlebar">
            <span class="writer-titlebar-file"><span class="writer-file-badge">ODT</span> modelo_citacao_longa_e_nota.odt</span>
            <span>Folha 4</span>
          </div>
          <div class="writer-desk">
            <div class="a4-sheet font-arial">
              <div class="a4-page-number top-right">4</div>
              <p class="doc-p">
                A estruturação prévia dos documentos científicos garante legibilidade e previne discrepâncias formais durante a avaliação acadêmica<sup>1</sup>. Nesse sentido, destaca-se a diretriz institucional sobre formatação:
              </p>
              
              <!-- Citação Longa Demonstrativa -->
              <div class="doc-long-quote" style="background:#f8fafc;padding:0.4rem;border:1px dashed #cbd5e1;border-radius:4px;">
                <div style="font-size:0.72rem;font-weight:700;color:#1e40af;margin-bottom:2px;">[ Recuo de 4,00 cm da margem esquerda • Fonte tamanho 10 • Espaçamento simples • SEM aspas ]</div>
                As citações diretas, no texto, com mais de três linhas, devem ser destacadas com recuo de 4 cm da margem esquerda, com letra menor que a do texto utilizado e sem aspas. No caso de documentos digitados, deve-se utilizar o espaçamento simples entre as linhas (INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ, 2020, p. 127).
              </div>

              <p class="doc-p">
                Nota-se que a citação é separada do texto anterior e posterior por uma linha em branco de espaçamento 1,5, preservando o ritmo de leitura.
              </p>

              <!-- Nota de Rodapé Demonstrativa -->
              <div class="doc-footnote-area">
                <div class="doc-footnote-line"></div>
                <div style="font-size:0.7rem;color:#1e40af;margin-bottom:2px;font-weight:600;">[ Filete de 5,00 cm à esquerda (31%) • Fonte tamanho 10 • Espaçamento simples ]</div>
                <p class="doc-footnote-item">
                  <sup>1</sup> Nota explicativa referente às diretrizes de editoração eletrônica estabelecidas pelo Colegiado do Curso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Módulo 6: Clínica de Referências Bibliográficas
  function renderMod6ReferencesActivity() {
    return `
      <div>
        <p style="font-size:0.92rem;color:var(--text-secondary);margin-bottom:1rem;">
          Exemplo demonstrativo da seção REFERÊNCIAS conforme a Seção 12.3 e a Figura 40 do Manual do IFCE:
        </p>

        <div class="writer-window" style="max-width:720px;margin:0 auto 1.5rem auto;">
          <div class="writer-titlebar">
            <span class="writer-titlebar-file"><span class="writer-file-badge">ODT</span> secao_referencias_ifce.odt</span>
            <span>Folha 10</span>
          </div>
          <div class="writer-desk">
            <div class="a4-sheet font-arial">
              <div class="a4-page-number top-right">10</div>
              <div class="doc-title-centered">REFERÊNCIAS</div>
              <div style="font-size:0.72rem;color:#166534;font-weight:700;margin-bottom:0.75rem;text-align:center;">
                [ Título centralizado, em MAIÚSCULAS, negrito, tamanho 12, sem número + 1 linha em branco (1,5) ]
              </div>

              <!-- Referência 1: Livro -->
              <div class="doc-ref-item">
                <span style="font-size:0.7rem;color:#1e40af;display:block;font-weight:600;">[ Livro: Negrito apenas no título principal; subtítulo após ":" fica regular ]</span>
                CERVO, Amado Luiz; BERVIAN, Pedro Alcino; DA SILVA, Roberto. <strong>Metodologia científica</strong>: para uso dos alunos universitários. 6. ed. São Paulo: Pearson Prentice Hall, 2007.
              </div>

              <!-- Referência 2: Manual do IFCE -->
              <div class="doc-ref-item">
                <span style="font-size:0.7rem;color:#1e40af;display:block;font-weight:600;">[ Instituição com documento eletrônico: Alinhado somente à esquerda, espaço simples, 1 linha simples entre obras ]</span>
                INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ. <strong>Manual de normalização de trabalhos acadêmicos do IFCE</strong>: de acordo com as normas da ABNT. 3. ed. atual. Fortaleza: IFCE / PROEN / SiBi, 2020. Disponível em: https://ifce.edu.br. Acesso em: 15 out. 2026.
              </div>

              <!-- Referência 3: Artigo de Periódico -->
              <div class="doc-ref-item" style="margin-bottom:0;">
                <span style="font-size:0.7rem;color:#1e40af;display:block;font-weight:600;">[ Artigo de revista/periódico: Negrito no título do periódico, e não no artigo ]</span>
                SANTOS, Carlos Alberto. O papel do editor de texto livre na formação técnica. <strong>Revista Brasileira de Computação Aplicada</strong>, Passo Fundo, v. 12, n. 2, p. 45-56, maio 2021.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function bindModuleSpecificActivityEvents(modId) {
    if (modId === 'mod1') {
      const updateMarginView = () => {
        const container = document.getElementById('module-activity-container');
        if (container) {
          container.innerHTML = renderMod1MarginActivity();
          bindModuleSpecificActivityEvents('mod1');
        }
      };

      document.getElementById('m1-mode-anverso')?.addEventListener('click', () => {
        state.margins.mode = 'anverso';
        state.margins.left = 3.0;
        state.margins.right = 2.0;
        updateMarginView();
      });

      document.getElementById('m1-mode-verso')?.addEventListener('click', () => {
        state.margins.mode = 'verso';
        state.margins.left = 2.0;
        state.margins.right = 3.0;
        updateMarginView();
      });

      document.getElementById('m1-preset-err')?.addEventListener('click', () => {
        state.margins.top = 1.5;
        state.margins.bottom = 1.5;
        state.margins.left = 1.5;
        state.margins.right = 1.5;
        updateMarginView();
      });

      document.getElementById('m1-preset-abnt')?.addEventListener('click', () => {
        state.margins.top = 3.0;
        state.margins.bottom = 2.0;
        if (state.margins.mode === 'anverso') {
          state.margins.left = 3.0;
          state.margins.right = 2.0;
        } else {
          state.margins.left = 2.0;
          state.margins.right = 3.0;
        }
        updateMarginView();
      });

      ['top', 'bottom', 'left', 'right'].forEach(side => {
        const sel = document.getElementById(`m1-${side}`);
        sel?.addEventListener('change', e => {
          state.margins[side] = parseFloat(e.target.value);
          updateMarginView();
        });
      });
    } else if (modId === 'mod2') {
      const paper = document.getElementById('m2-preview-paper');
      const setParagraphState = (mode) => {
        document.querySelectorAll('#m2-tab-raw, #m2-tab-bad, #m2-tab-good').forEach(b => b.classList.remove('active'));
        if (!paper) return;

        if (mode === 'raw') {
          document.getElementById('m2-tab-raw')?.classList.add('active');
          paper.className = 'a4-sheet font-arial';
          paper.innerHTML = `
            <p style="font-size:0.95rem;line-height:1.2;text-align:left;text-indent:0;margin:0 0 0.5rem 0;">A normalização documental viabiliza a organização de dados científicos e padroniza a apresentação dos resultados da pesquisa acadêmica perante a comunidade técnica.</p>
            <p style="font-size:0.95rem;line-height:1.2;text-align:left;text-indent:0;margin:0;">Neste cenário os estilos de parágrafo automatizam tarefas repetitivas e eliminam inconsistências visuais decorrentes de ajustes manuais dispersos.</p>
          `;
        } else if (mode === 'bad') {
          document.getElementById('m2-tab-bad')?.classList.add('active');
          paper.className = 'a4-sheet font-comic';
          paper.innerHTML = `
            <p style="font-size:1.05rem;line-height:2.0;text-align:left;text-indent:0;margin:0 0 1rem 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A normalização documental viabiliza a organização de dados científicos e padroniza a apresentação dos resultados da pesquisa acadêmica perante a comunidade técnica.</p>
            <p style="font-size:1.05rem;line-height:2.0;text-align:left;text-indent:0;margin:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Neste cenário os estilos de parágrafo automatizam tarefas repetitivas e eliminam inconsistências visuais decorrentes de ajustes manuais dispersos.</p>
          `;
        } else {
          document.getElementById('m2-tab-good')?.classList.add('active');
          paper.className = 'a4-sheet font-arial';
          paper.innerHTML = `
            <p class="doc-p">A normalização documental viabiliza a organização de dados científicos e padroniza a apresentação dos resultados da pesquisa acadêmica perante a comunidade técnica.</p>
            <p class="doc-p">Neste cenário, os estilos de parágrafo automatizam tarefas repetitivas e eliminam inconsistências visuais decorrentes de ajustes manuais dispersos.</p>
          `;
        }
      };

      document.getElementById('m2-tab-raw')?.addEventListener('click', () => setParagraphState('raw'));
      document.getElementById('m2-tab-bad')?.addEventListener('click', () => setParagraphState('bad'));
      document.getElementById('m2-tab-good')?.addEventListener('click', () => setParagraphState('good'));
      setParagraphState('good');
    }
  }

  /* ==========================================================================
     VISTA: ATIVIDADE PRINCIPAL — REVISÃO DE UM DOCUMENTO ACADÊMICO
     10 problemas reais analisáveis e corrigíveis interativamente
     ========================================================================== */
  function renderReviewView() {
    const act = D.REVIEW_ACTIVITY;
    const selectedProblem = act.problems.find(p => p.id === state.selectedProblemId) || act.problems[0];
    const fixedCount = state.fixedProblems.size;

    return `
      <section class="view-section">
        <div class="hero-banner">
          <span class="eyebrow writer">Atividade Central de Diagnóstico</span>
          <h1 class="page-title">Revisão Prática de Documento Acadêmico</h1>
          <p class="page-lead">
            Você recebeu o trabalho de graduação fictício de <strong>${act.documentMeta.studentAuthor}</strong>. 
            O documento contém <strong>10 problemas de formatação</strong> comuns na produção universitária. 
            Clique ou toque nas regiões demarcadas do documento (ou nos botões da barra superior) para diagnosticar o erro, consultar a orientação do Manual do IFCE e aprender a executar o ajuste no LibreOffice Writer.
          </p>
          <div style="display:flex;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-top:1rem;">
            <span style="font-size:0.88rem;font-weight:700;color:var(--text-secondary);">
              Status da revisão: <strong>${fixedCount} de 10</strong> itens corrigidos nesta sessão
            </span>
            <button class="btn btn-sm btn-secondary" id="btn-fix-all-problems">Corrigir Todos os Problemas</button>
            <button class="btn btn-sm btn-secondary" id="btn-reset-problems">Restaurar Documento Original</button>
          </div>
        </div>

        <!-- Seletor Rápido dos 10 Problemas -->
        <div class="problem-index-bar" role="tablist" aria-label="Navegador de problemas de formatação">
          ${act.problems.map(p => {
            const isFixed = state.fixedProblems.has(p.id);
            const isSelected = p.id === selectedProblem.id;
            return `
              <button class="problem-pill-btn ${isFixed ? 'fixed' : ''} ${isSelected ? 'active' : ''}" 
                      data-problem-id="${p.id}"
                      role="tab"
                      aria-selected="${isSelected}">
                ${isFixed ? '✓' : p.num}. ${p.shortLabel}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Workspace Dividido: Documento Simulado à esquerda, Painel de Inspeção à direita -->
        <div class="review-workspace">
          <!-- Documento no Editor Writer -->
          <div class="writer-window">
            <div class="writer-titlebar">
              <span class="writer-titlebar-file">
                <span class="writer-file-badge">ODT</span>
                ${act.documentMeta.fileName}
              </span>
              <span style="font-size:0.74rem;color:#94a3b8;">LibreOffice Writer • Visualizador Interativo</span>
            </div>
            <div class="writer-toolbar">
              <span class="writer-tool-pill">Estilo: <strong>${state.fixedProblems.has('p2') ? 'Corpo de texto' : 'Padrão (Modificado)'}</strong></span>
              <span class="writer-tool-pill">Fonte: <strong>${state.fixedProblems.has('p2') ? 'Arial 12 pt' : 'Trebuchet 13.5 pt'}</strong></span>
              <span class="writer-tool-pill">Margens: <strong>${state.fixedProblems.has('p1') ? '3 / 3 / 2 / 2 cm' : '1,5 cm (Estreitas)'}</strong></span>
            </div>
            <div class="writer-ruler">
              <span>| 0 cm</span>
              <span>| 1,25 cm</span>
              <span>| 4 cm</span>
              <span>| 16 cm |</span>
            </div>
            <div class="writer-desk">
              <!-- Página 1: Sumário -->
              <div class="a4-sheet ${state.fixedProblems.has('p2') ? 'font-arial' : 'font-comic'}" 
                   style="${state.fixedProblems.has('p1') ? '' : 'padding:1.25rem;'}">
                <span class="a4-page-tag">Folha 3 — Pré-textual</span>
                
                <!-- Hotspot P7: Paginação indevida no Sumário -->
                <div class="review-hotspot ${state.fixedProblems.has('p7') ? 'is-fixed' : 'is-error'} ${selectedProblem.id === 'p7' ? 'is-selected' : ''}" data-hotspot-id="p7">
                  <span class="hotspot-chip">${state.fixedProblems.has('p7') ? '✓ Item 7 Corrigido' : '! Problema 7: Paginação'}</span>
                  ${state.fixedProblems.has('p7')
                    ? '<div style="font-size:0.76rem;color:var(--status-ok);font-style:italic;">[Numeração oculta nas folhas pré-textuais conforme Seção 9.4]</div>'
                    : '<div class="a4-page-number bottom-center-err" style="margin:0;text-align:right;">Página 3</div>'}
                </div>

                <!-- Hotspot P6: Sumário Manual com Pré-textuais -->
                <div class="review-hotspot ${state.fixedProblems.has('p6') ? 'is-fixed' : 'is-error'} ${selectedProblem.id === 'p6' ? 'is-selected' : ''}" data-hotspot-id="p6">
                  <span class="hotspot-chip">${state.fixedProblems.has('p6') ? '✓ Item 6 Corrigido' : '! Problema 6: Sumário Manual'}</span>
                  ${state.fixedProblems.has('p6')
                    ? `
                      <div class="doc-title-centered" style="margin-bottom:1rem;">SUMÁRIO</div>
                      <ul class="toc-list">
                        <li class="toc-row"><span class="toc-num"><strong>1</strong></span><span class="toc-title"><strong>INTRODUÇÃO</strong></span><span class="toc-dots"></span><span class="toc-page"><strong>4</strong></span></li>
                        <li class="toc-row"><span class="toc-num"><strong>1.1</strong></span><span class="toc-title"><strong>O formato aberto ODF</strong></span><span class="toc-dots"></span><span class="toc-page">4</span></li>
                        <li class="toc-row"><span class="toc-num"></span><span class="toc-title"><strong>REFERÊNCIAS</strong></span><span class="toc-dots"></span><span class="toc-page"><strong>5</strong></span></li>
                      </ul>
                    `
                    : `
                      <div style="font-size:1.1rem;font-weight:700;margin-bottom:0.6rem;text-align:left;">Sumário........................................................ 3</div>
                      <div style="font-size:0.86rem;line-height:1.7;">
                        <div>Folha de rosto ................................................ 1</div>
                        <div>Resumo ........................................................ 2</div>
                        <div>1. Introdução ................................................. 4</div>
                        <div>1.1 - O formato aberto ODF ............................ 4</div>
                        <div>2. Referências Bibliográficas ............................ 5</div>
                      </div>
                    `}
                </div>
              </div>

              <!-- Página 2: Texto Principal, Citação Longa e Nota -->
              <div class="a4-sheet ${state.fixedProblems.has('p2') ? 'font-arial' : 'font-comic'}"
                   style="${state.fixedProblems.has('p1') ? '' : 'padding:1.25rem;'}">
                <span class="a4-page-tag">Folha 4 — Textual</span>

                <!-- Cabeçalho de Página Textual -->
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                  <span style="font-size:0.72rem;color:var(--text-muted);">Início da numeração visível</span>
                  <span class="a4-page-number ${state.fixedProblems.has('p7') ? 'top-right' : 'bottom-center-err'}" style="margin:0;">
                    ${state.fixedProblems.has('p7') ? '4' : 'Página 4 (no rodapé)'}
                  </span>
                </div>

                <!-- Hotspot P5: Títulos e Hierarquia -->
                <div class="review-hotspot ${state.fixedProblems.has('p5') ? 'is-fixed' : 'is-error'} ${selectedProblem.id === 'p5' ? 'is-selected' : ''}" data-hotspot-id="p5">
                  <span class="hotspot-chip">${state.fixedProblems.has('p5') ? '✓ Item 5 Corrigido' : '! Problema 5: Títulos e Hierarquia'}</span>
                  ${state.fixedProblems.has('p5')
                    ? '<div class="doc-h1">1 INTRODUÇÃO</div>'
                    : '<div style="text-align:center;text-decoration:underline;font-size:1.15rem;font-weight:700;margin-bottom:0.5rem;">1. Introdução:</div>'}
                </div>

                <!-- Hotspots P2, P3 e P4: Fonte, Recuo de 1ª Linha e Espaçamento -->
                <div class="review-hotspot ${(state.fixedProblems.has('p2') && state.fixedProblems.has('p3') && state.fixedProblems.has('p4')) ? 'is-fixed' : 'is-error'} ${(selectedProblem.id === 'p2' || selectedProblem.id === 'p3' || selectedProblem.id === 'p4') ? 'is-selected' : ''}" data-hotspot-id="${selectedProblem.id === 'p3' ? 'p3' : (selectedProblem.id === 'p4' ? 'p4' : 'p2')}">
                  <span class="hotspot-chip">${(state.fixedProblems.has('p2') && state.fixedProblems.has('p3') && state.fixedProblems.has('p4')) ? '✓ Parágrafos Formatados' : '! Problemas 2, 3 e 4: Fonte, Recuo e Entrelinha'}</span>
                  <div style="
                    font-family:${state.fixedProblems.has('p2') ? 'Arial, sans-serif' : "'Trebuchet MS', cursive"};
                    font-size:${state.fixedProblems.has('p2') ? '0.95rem' : '1.08rem'};
                    line-height:${state.fixedProblems.has('p4') ? '1.5' : '2.0'};
                    text-align:${state.fixedProblems.has('p3') ? 'justify' : 'left'};
                    text-indent:${state.fixedProblems.has('p3') ? '2.15rem' : '0'};
                    color:${state.fixedProblems.has('p2') ? '#111827' : '#1e3a8a'};
                  ">
                    <p style="margin:0 0 ${state.fixedProblems.has('p4') ? '0' : '1rem'} 0;">
                      A adoção de soluções de ${state.fixedProblems.has('p2') ? '<em>software</em>' : 'software'} livre no ensino superior fortalece a autonomia tecnológica discente e fomenta a difusão do conhecimento aberto na universidade pública.
                    </p>
                    <p style="margin:0;">
                      O domínio dos estilos de formatação assegura consistência visual e atende rigorosamente aos critérios de apresentação científica estabelecidos no Instituto Federal.
                    </p>
                  </div>
                </div>

                <!-- Hotspot P8: Citação Direta Longa -->
                <div class="review-hotspot ${state.fixedProblems.has('p8') ? 'is-fixed' : 'is-error'} ${selectedProblem.id === 'p8' ? 'is-selected' : ''}" data-hotspot-id="p8" style="margin-top:0.85rem;">
                  <span class="hotspot-chip">${state.fixedProblems.has('p8') ? '✓ Item 8 Corrigido' : '! Problema 8: Citação Longa'}</span>
                  ${state.fixedProblems.has('p8')
                    ? `
                      <div class="doc-long-quote">
                        A padronização aberta dos documentos eletrônicos garante que o patrimônio científico produzido nas universidades públicas permaneça acessível independentemente de fornecedores proprietários específicos (SILVA, 2019, p. 42).
                      </div>
                    `
                    : `
                      <div style="font-size:1.05rem;line-height:1.8;padding:0.35rem;border-left:3px solid #dc2626;">
                        "A padronização aberta dos documentos eletrônicos garante que o patrimônio científico produzido nas universidades públicas permaneça acessível independentemente de fornecedores proprietários específicos." (silva, 2019)
                      </div>
                    `}
                </div>

                <!-- Hotspot P9: Nota de Rodapé -->
                <div class="review-hotspot ${state.fixedProblems.has('p9') ? 'is-fixed' : 'is-error'} ${selectedProblem.id === 'p9' ? 'is-selected' : ''}" data-hotspot-id="p9" style="margin-top:1.25rem;">
                  <span class="hotspot-chip">${state.fixedProblems.has('p9') ? '✓ Item 9 Corrigido' : '! Problema 9: Nota de Rodapé'}</span>
                  ${state.fixedProblems.has('p9')
                    ? `
                      <div class="doc-footnote-area">
                        <div class="doc-footnote-line"></div>
                        <p class="doc-footnote-item"><sup>1</sup> O formato OpenDocument (ODF) é homologado internacionalmente pela norma ISO/IEC 26300.</p>
                      </div>
                    `
                    : `
                      <div style="border-top:2px solid #b91c1c;padding-top:0.4rem;font-size:0.92rem;color:#7f1d1d;">
                        (ver nota no fim da página: O formato OpenDocument é norma ISO/IEC 26300)
                      </div>
                    `}
                </div>
              </div>

              <!-- Página 3: Referências -->
              <div class="a4-sheet ${state.fixedProblems.has('p2') ? 'font-arial' : 'font-comic'}"
                   style="${state.fixedProblems.has('p1') ? '' : 'padding:1.25rem;'}">
                <span class="a4-page-tag">Folha 5 — Pós-textual</span>

                <!-- Hotspot P10: Seção de Referências -->
                <div class="review-hotspot ${state.fixedProblems.has('p10') ? 'is-fixed' : 'is-error'} ${selectedProblem.id === 'p10' ? 'is-selected' : ''}" data-hotspot-id="p10">
                  <span class="hotspot-chip">${state.fixedProblems.has('p10') ? '✓ Item 10 Corrigido' : '! Problema 10: Seção de Referências'}</span>
                  ${state.fixedProblems.has('p10')
                    ? `
                      <div class="doc-title-centered">REFERÊNCIAS</div>
                      <div class="doc-ref-item">
                        INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO CEARÁ. <strong>Manual de normalização de trabalhos acadêmicos do IFCE</strong>: de acordo com as normas da ABNT. 3. ed. atual. Fortaleza: IFCE, 2020. Disponível em: https://ifce.edu.br. Acesso em: 10 out. 2026.
                      </div>
                      <div class="doc-ref-item">
                        MARCONI, Marina de Andrade; LAKATOS, Eva Maria. <strong>Fundamentos de metodologia científica</strong>. 5. ed. São Paulo: Atlas, 2003.
                      </div>
                      <div class="doc-ref-item" style="margin-bottom:0;">
                        SILVA, Rodrigo Martins da. <strong>Arquitetura de sistemas documentais abertos</strong>. Fortaleza: Expressão Gráfica, 2019.
                      </div>
                    `
                    : `
                      <div style="font-weight:700;font-size:1.05rem;margin-bottom:0.5rem;text-align:left;">2. Referências Bibliográficas</div>
                      <div style="font-size:0.92rem;line-height:1.5;text-align:justify;text-indent:1.8rem;">
                        SILVA, Rodrigo Martins da. <em>Arquitetura de sistemas documentais abertos</em>. Fortaleza: Expressão Gráfica, 2019.<br><br>
                        INSTITUTO FEDERAL DO CEARÁ. <strong>Manual de normalização do IFCE: de acordo com as normas da ABNT</strong>. Fortaleza, 2020. Disponível em: &lt;https://ifce.edu.br&gt;.<br><br>
                        MARCONI, Marina; LAKATOS, Eva. <em>Metodologia Científica</em>. São Paulo: Atlas, 2003.
                      </div>
                    `}
                </div>
              </div>
            </div>
            <div class="writer-statusbar">
              <span>Folha 4 de 5 • 820 palavras • Português (Brasil)</span>
              <span>Leiaute padrão • 100% de zoom</span>
            </div>
          </div>

          <!-- Painel de Inspeção Lateral (Fixo no Desktop, empilhado no mobile) -->
          <div class="inspector-sticky">
            <div class="inspector-card">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.5rem;">
                <span class="eyebrow" style="margin:0;">Item ${selectedProblem.num} de 10</span>
                <span style="font-size:0.78rem;font-weight:700;color:var(--text-muted);">${selectedProblem.pageLabel}</span>
              </div>
              <h2 style="font-size:1.15rem;margin-bottom:0.6rem;">${selectedProblem.title}</h2>

              <!-- Seção 1: O que está errado -->
              <div class="inspector-section">
                <div class="inspector-kicker err">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  1. O que está incorreto neste ponto
                </div>
                <p style="font-size:0.89rem;margin:0;">${selectedProblem.whatIsWrong}</p>
              </div>

              <!-- Seção 2: Orientação do Manual do IFCE -->
              <div class="inspector-section">
                <div class="inspector-kicker rule">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  2. Orientação do Manual do IFCE (3ª ed. 2020)
                </div>
                <p style="font-size:0.89rem;margin:0;">${selectedProblem.manualRule}</p>
              </div>

              <!-- Seção 3: Como corrigir no LibreOffice Writer -->
              <div class="inspector-section">
                <div class="inspector-kicker writer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  3. Como executar no LibreOffice Writer
                </div>
                <ol class="writer-steps" style="margin-top:0.4rem;gap:0.45rem;">
                  ${selectedProblem.writerHowTo.map((step, idx) => `
                    <li class="writer-step-item" style="padding:0.6rem 0.75rem;">
                      <span class="step-index" style="width:22px;height:22px;font-size:0.75rem;">${idx + 1}</span>
                      <div class="step-body" style="font-size:0.85rem;">${step}</div>
                    </li>
                  `).join('')}
                </ol>
              </div>

              <!-- Seção 4: Prévia visual do resultado esperado -->
              <div class="inspector-section">
                <div class="inspector-kicker preview">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  4. Prévia visual do padrão correto esperado
                </div>
                <div class="mini-preview-paper">
                  ${selectedProblem.previewHtml}
                </div>
              </div>

              <!-- Ação de Toggle no Documento -->
              <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button class="btn btn-primary" id="btn-toggle-single-fix" style="flex:1;">
                  ${state.fixedProblems.has(selectedProblem.id)
                    ? 'Reverter para o Estado Incorreto'
                    : 'Aplicar Correção no Documento'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function bindReviewEvents() {
    // Cliques nos hotspots do documento e nos botões de pílula
    document.querySelectorAll('[data-hotspot-id], [data-problem-id]').forEach(el => {
      el.addEventListener('click', () => {
        const pId = el.dataset.hotspotId || el.dataset.problemId;
        state.selectedProblemId = pId;
        renderActiveView();
      });
    });

    // Botão de alternar correção única
    document.getElementById('btn-toggle-single-fix')?.addEventListener('click', () => {
      const pId = state.selectedProblemId;
      if (state.fixedProblems.has(pId)) {
        state.fixedProblems.delete(pId);
      } else {
        state.fixedProblems.add(pId);
      }
      renderActiveView();
    });

    // Botão de corrigir todos
    document.getElementById('btn-fix-all-problems')?.addEventListener('click', () => {
      D.REVIEW_ACTIVITY.problems.forEach(p => state.fixedProblems.add(p.id));
      renderActiveView();
    });

    // Botão de restaurar original
    document.getElementById('btn-reset-problems')?.addEventListener('click', () => {
      state.fixedProblems.clear();
      renderActiveView();
    });
  }

  /* ==========================================================================
     VISTA: ATIVIDADE AVALIATIVA (PROVA PRÁTICA COM NOTA 0,0 A 10,0)
     ========================================================================== */
  function renderEvaluationView() {
    const E = D.EVALUATION_DATA;
    if (!E) return '<div class="card">Dados da avaliação não encontrados.</div>';

    const questions = E.questions;
    const totalQ = questions.length;
    const answeredCount = Object.keys(state.evalAnswers).length;

    // Se já foi finalizada/enviada, exibe o Painel de Nota e Gabarito
    if (state.evalSubmitted) {
      let correctCount = 0;
      questions.forEach(q => {
        const chosenId = state.evalAnswers[q.id];
        const correctOpt = q.options.find(o => o.isCorrect);
        if (chosenId && correctOpt && chosenId === correctOpt.id) {
          correctCount++;
        }
      });

      const score = (correctCount * E.meta.pointsPerQuestion).toFixed(1);
      const percentage = Math.round((correctCount / totalQ) * 100);
      const isApproved = score >= 6.0;
      const isExcellent = score >= 8.5;

      const studentName = state.evalStudent.name || 'Estudante Não Identificado';
      const studentReg = state.evalStudent.reg || 'Não informada';
      const studentCourse = state.evalStudent.course || 'Introdução à Computação';
      const currentDate = state.evalStudent.date || new Date().toLocaleString('pt-BR');

      return `
        <section class="view-section">
          <div class="grade-banner ${isApproved ? 'approved' : 'review-needed'}">
            <span class="grade-status-pill ${isApproved ? 'ok' : 'warn'}">
              ${isExcellent ? 'Desempenho Excelente' : (isApproved ? 'Desempenho Aprovado' : 'Necessita Revisão')}
            </span>
            <div style="font-size:0.95rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.04em;">
              Resultado da Avaliação Oficial
            </div>
            <div class="grade-display-number">${score} <span style="font-size:1.6rem;color:var(--text-muted);font-weight:600;">/ 10,0</span></div>
            <div style="font-size:1.05rem;font-weight:600;color:var(--text-primary);margin-bottom:0.75rem;">
              ${correctCount} de ${totalQ} questões corretas (${percentage}% de aproveitamento)
            </div>

            <div style="display:flex;justify-content:center;gap:0.65rem;flex-wrap:wrap;margin-top:1rem;" class="no-print">
              <button class="btn btn-primary" id="btn-print-eval-cert" style="background:#166534;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Imprimir Comprovante / Salvar em PDF
              </button>
              <button class="btn btn-secondary" id="btn-copy-eval-report">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copiar Relatório de Nota
              </button>
              <button class="btn btn-secondary" id="btn-retry-eval">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                Fazer Nova Tentativa
              </button>
            </div>
          </div>

          <!-- Comprovante Oficial Formatado para Folha A4 / Envio ao Docente -->
          <div class="certificate-print-sheet">
            <div class="cert-header">
              <div style="font-size:0.8rem;font-weight:700;text-transform:uppercase;color:#14532d;letter-spacing:0.04em;">${E.meta.institution}</div>
              <h1 style="font-size:1.15rem;margin:0.25rem 0;color:#0f172a;">${E.meta.title}</h1>
              <div style="font-size:0.82rem;color:#64748b;">${E.meta.course} • ${E.meta.manualEdition}</div>
            </div>

            <div class="cert-meta-grid">
              <div><strong>Estudante:</strong> ${studentName}</div>
              <div><strong>Matrícula/Curso:</strong> ${studentReg}</div>
              <div><strong>Data/Hora de Conclusão:</strong> ${currentDate}</div>
              <div><strong>Nota Final Obtida:</strong> <span style="font-size:1.1rem;font-weight:800;color:#15803d;">${score} / 10,0</span> (${percentage}%)</div>
            </div>

            <h2 style="font-size:1.02rem;margin:1.25rem 0 0.75rem 0;border-bottom:1px solid #cbd5e1;padding-bottom:0.35rem;">
              Gabarito Comentado e Justificativas Técnicas do Manual
            </h2>

            <div style="display:flex;flex-direction:column;gap:0.9rem;">
              ${questions.map((q, idx) => {
                const chosenId = state.evalAnswers[q.id];
                const chosenOpt = q.options.find(o => o.id === chosenId);
                const correctOpt = q.options.find(o => o.isCorrect);
                const isRight = chosenOpt && chosenOpt.isCorrect;

                return `
                  <div class="cert-q-review-item" style="background:#ffffff;border:1px solid ${isRight ? '#86efac' : '#fca5a5'};border-radius:8px;padding:0.9rem;">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.4rem;">
                      <span style="font-size:0.82rem;font-weight:700;">Questão ${idx + 1} • ${q.theme}</span>
                      <span class="diag-badge ${isRight ? 'ok' : 'err'}">${isRight ? '✓ Correto (+1,0)' : '✕ Incorreto (0,0)'}</span>
                    </div>
                    <div style="font-size:0.92rem;font-weight:600;margin-bottom:0.4rem;color:#0f172a;">${q.scenario}</div>
                    
                    <div style="font-size:0.86rem;margin-bottom:0.35rem;">
                      <strong>Sua resposta:</strong> 
                      <span style="color:${isRight ? '#15803d' : '#b91c1c'};font-weight:600;">
                        ${chosenOpt ? chosenOpt.text : 'Não respondida'}
                      </span>
                    </div>

                    ${!isRight ? `
                      <div style="font-size:0.86rem;margin-bottom:0.35rem;color:#15803d;">
                        <strong>Gabarito regulamentar:</strong> ${correctOpt.text}
                      </div>
                    ` : ''}

                    <div style="margin-top:0.45rem;padding:0.55rem 0.75rem;background:#f8fafc;border-left:3px solid #1e40af;border-radius:4px;font-size:0.82rem;line-height:1.45;color:#334155;">
                      <strong>Justificativa técnica (Manual IFCE / Writer):</strong> ${correctOpt.explanation}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </section>
      `;
    }

    // Modo Formulário: Aluno preenche e responde as questões
    return `
      <section class="view-section">
        <div class="hero-banner">
          <span class="eyebrow" style="background:#dcfce7;color:#166534;">Avaliação Formal com Nota</span>
          <h1 class="page-title">${E.meta.title}</h1>
          <p class="page-lead">
            Esta atividade avaliativa destina-se à atribuição de nota na disciplina de <strong>${E.meta.course}</strong>. 
            Responda às 10 questões práticas baseadas em situações cotidianas de editoração acadêmica com o LibreOffice Writer e o Manual do IFCE. 
            Ao concluir, sua nota (de 0,0 a 10,0) será calculada com gabarito oficial comentado.
          </p>
        </div>

        <!-- Identificação do Estudante (Obrigatória para o Comprovante) -->
        <div class="eval-student-card">
          <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.25rem;">
            Identificação Acadêmica do(a) Estudante
          </div>
          <div class="eval-inputs-grid">
            <div>
              <label class="control-label" for="eval-student-name">Nome Completo: *</label>
              <input type="text" class="control-input" id="eval-student-name" placeholder="Digite seu nome completo para o comprovante" value="${state.evalStudent.name || ''}" required>
            </div>
            <div>
              <label class="control-label" for="eval-student-reg">Matrícula ou Curso:</label>
              <input type="text" class="control-input" id="eval-student-reg" placeholder="Ex.: 2026100123 / Computação" value="${state.evalStudent.reg || ''}">
            </div>
          </div>
        </div>

        <!-- Barra de Progresso das Questões Respondidas -->
        <div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;background:var(--bg-surface);padding:0.75rem 1rem;border-radius:var(--radius-md);border:1px solid var(--border-subtle);flex-wrap:wrap;">
          <span style="font-size:0.88rem;font-weight:700;color:var(--text-primary);">
            Progresso: <span id="eval-progress-count">${answeredCount}</span> de ${totalQ} questões respondidas
          </span>
          <span style="font-size:0.8rem;color:var(--text-muted);">
            Cada questão vale 1,0 ponto (Nota máxima: 10,0)
          </span>
        </div>

        <!-- Lista das 10 Questões Práticas -->
        <form id="eval-quiz-form" onsubmit="return false;">
          <div style="display:flex;flex-direction:column;gap:1.25rem;">
            ${questions.map((q, qIdx) => {
              const selectedOptId = state.evalAnswers[q.id];
              return `
                <div class="eval-question-card ${selectedOptId ? 'answered' : ''}" id="card-q-${q.id}">
                  <div class="eval-q-header">
                    <span class="eval-q-number">Questão ${qIdx + 1} de ${totalQ}</span>
                    <span style="font-size:0.75rem;font-weight:700;color:var(--brand-primary);">${q.theme}</span>
                  </div>
                  <h3 class="eval-q-title">${q.title}</h3>
                  <div class="eval-q-scenario">${q.scenario}</div>

                  <div class="eval-options-list" role="radiogroup" aria-labelledby="card-q-${q.id}">
                    ${q.options.map((opt, oIdx) => {
                      const isChecked = selectedOptId === opt.id;
                      const letter = String.fromCharCode(65 + oIdx); // A, B, C, D
                      return `
                        <label class="eval-option-label ${isChecked ? 'selected' : ''}">
                          <input type="radio" name="q_${q.id}" value="${opt.id}" data-q-id="${q.id}" ${isChecked ? 'checked' : ''}>
                          <div class="eval-option-text">
                            <strong>${letter})</strong> ${opt.text}
                          </div>
                        </label>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top:2rem;padding:1.5rem;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:var(--radius-lg);text-align:center;">
            <p style="font-size:0.92rem;color:var(--text-secondary);margin-bottom:1rem;">
              Revise suas respostas acima antes de concluir. Ao clicar no botão abaixo, a sua nota oficial será gerada automaticamente.
            </p>
            <button class="btn btn-primary" id="btn-submit-eval" type="button" style="min-width:240px;min-height:50px;font-size:1.02rem;background:#166534;">
              Finalizar e Calcular Minha Nota &rarr;
            </button>
          </div>
        </form>
      </section>
    `;
  }

  function bindEvaluationEvents() {
    // Atualização dos dados do estudante
    document.getElementById('eval-student-name')?.addEventListener('input', e => {
      state.evalStudent.name = e.target.value.trim();
      localStorage.setItem('abnt_eval_student', JSON.stringify(state.evalStudent));
    });

    document.getElementById('eval-student-reg')?.addEventListener('input', e => {
      state.evalStudent.reg = e.target.value.trim();
      localStorage.setItem('abnt_eval_student', JSON.stringify(state.evalStudent));
    });

    // Seleção das opções de cada questão
    document.querySelectorAll('.eval-options-list input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', e => {
        const qId = e.target.dataset.qId;
        const optId = e.target.value;
        state.evalAnswers[qId] = optId;
        localStorage.setItem('abnt_eval_answers', JSON.stringify(state.evalAnswers));

        // Atualiza estilo visual do card e labels
        const card = document.getElementById(`card-q-${qId}`);
        if (card) {
          card.classList.add('answered');
          card.querySelectorAll('.eval-option-label').forEach(lbl => {
            const inp = lbl.querySelector('input');
            lbl.classList.toggle('selected', inp && inp.checked);
          });
        }

        // Atualiza contador de progresso
        const progressEl = document.getElementById('eval-progress-count');
        if (progressEl) {
          progressEl.textContent = Object.keys(state.evalAnswers).length;
        }
      });
    });

    // Finalizar e Calcular Nota
    document.getElementById('btn-submit-eval')?.addEventListener('click', () => {
      const nameInput = document.getElementById('eval-student-name');
      const name = nameInput ? nameInput.value.trim() : state.evalStudent.name;

      if (!name) {
        alert('Por favor, informe seu Nome Completo no campo de identificação antes de finalizar.');
        nameInput?.focus();
        return;
      }

      state.evalStudent.name = name;
      state.evalStudent.reg = document.getElementById('eval-student-reg')?.value.trim() || state.evalStudent.reg;
      state.evalStudent.date = new Date().toLocaleString('pt-BR');
      localStorage.setItem('abnt_eval_student', JSON.stringify(state.evalStudent));

      const totalQ = D.EVALUATION_DATA.questions.length;
      const answeredCount = Object.keys(state.evalAnswers).length;

      if (answeredCount < totalQ) {
        const confirmMsg = `Atenção: Você respondeu ${answeredCount} de ${totalQ} questões. As questões não respondidas serão computadas como incorretas.\n\nDeseja finalizar e calcular a nota agora?`;
        if (!confirm(confirmMsg)) {
          return;
        }
      }

      state.evalSubmitted = true;
      localStorage.setItem('abnt_eval_submitted', 'true');
      renderActiveView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Imprimir comprovante
    document.getElementById('btn-print-eval-cert')?.addEventListener('click', () => {
      window.print();
    });

    // Copiar relatório de nota para a área de transferência
    document.getElementById('btn-copy-eval-report')?.addEventListener('click', () => {
      const E = D.EVALUATION_DATA;
      const questions = E.questions;
      let correct = 0;
      questions.forEach(q => {
        const chosenId = state.evalAnswers[q.id];
        const correctOpt = q.options.find(o => o.isCorrect);
        if (chosenId && correctOpt && chosenId === correctOpt.id) correct++;
      });
      const score = (correct * E.meta.pointsPerQuestion).toFixed(1);

      const reportText = `[COMPROVANTE DE AVALIAÇÃO DE NORMALIZAÇÃO ABNT E LIBREOFFICE WRITER]
Instituição: ${E.meta.institution}
Disciplina: ${E.meta.course}
Referência: ${E.meta.manualEdition}
--------------------------------------------------
Estudante: ${state.evalStudent.name || 'Não identificado'}
Matrícula/Curso: ${state.evalStudent.reg || 'Não informada'}
Data e Hora: ${state.evalStudent.date || new Date().toLocaleString('pt-BR')}
--------------------------------------------------
NOTA FINAL: ${score} / 10,0 (${correct} de ${questions.length} questões corretas)
Status: ${score >= 6.0 ? 'APROVADO' : 'NECESSITA REVISÃO'}
--------------------------------------------------
Relatório gerado pela aplicação Oficina Prática de ABNT & LibreOffice Writer IFCE.`;

      navigator.clipboard.writeText(reportText).then(() => {
        alert('Relatório de nota copiado com sucesso! Você pode colar no Google Classroom, SIGAA, Moodle ou e-mail do professor.');
      });
    });

    // Refazer Avaliação
    document.getElementById('btn-retry-eval')?.addEventListener('click', () => {
      if (confirm('Deseja iniciar uma nova tentativa da avaliação? As respostas anteriores serão limpas.')) {
        state.evalAnswers = {};
        state.evalSubmitted = false;
        localStorage.removeItem('abnt_eval_answers');
        localStorage.removeItem('abnt_eval_submitted');
        renderActiveView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ==========================================================================
     VISTA: OFICINA PRÁTICA NO LIBREOFFICE WRITER (Seção 5)
     Roteiro de produção + Checklist puramente organizacional (sem recompensas)
     ========================================================================== */
  function renderWorkshopView() {
    const W = D.WORKSHOP_GUIDE;
    let totalItems = 0;
    let checkedCount = 0;

    W.checklistGroups.forEach(g => {
      g.items.forEach(it => {
        totalItems++;
        if (state.checklist[it.id]) checkedCount++;
      });
    });

    return `
      <section class="view-section">
        <div class="hero-banner">
          <span class="eyebrow writer">Produção Autônoma de Documento</span>
          <h1 class="page-title">${W.intro.title}</h1>
          <p class="page-lead">${W.intro.lead}</p>
          <div style="margin-top:0.75rem;padding:0.6rem 0.85rem;background:var(--bg-surface-alt);border-radius:var(--radius-md);font-size:0.86rem;border:1px solid var(--border-subtle);">
            <strong>Orientação temática:</strong> ${W.intro.recommendedTheme}
          </div>
        </div>

        <!-- Barra de Resumo Organizacional -->
        <div class="checklist-summary-bar">
          <div>
            <div style="font-weight:700;font-size:0.95rem;">Checklist de Conferência Técnica</div>
            <div style="font-size:0.83rem;color:var(--text-muted);">
              Organize as etapas já executadas em seu LibreOffice Writer (${checkedCount} de ${totalItems} itens verificados).
            </div>
          </div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary" id="btn-print-checklist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Imprimir Roteiro / Salvar PDF
            </button>
            <button class="btn btn-sm btn-secondary" id="btn-reset-checklist">Limpar Seleções</button>
          </div>
        </div>

        <!-- Roteiro Passo a Passo de Execução com Textos de Apoio -->
        <div class="section-block">
          <h2 class="section-heading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="color:var(--writer-accent);"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Roteiro de Produção Passo a Passo
          </h2>
          <div style="display:flex;flex-direction:column;gap:1.1rem;">
            ${W.stages.map(st => `
              <div class="card" style="border-left:4px solid var(--writer-accent);">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:0.4rem;">
                  <span class="module-num-tag" style="background:var(--writer-accent-soft);color:var(--writer-accent);border-color:var(--writer-accent-border);">Etapa ${st.stepNum}</span>
                  <span style="font-size:0.76rem;color:var(--text-muted);font-weight:600;">${st.manualRef}</span>
                </div>
                <h3 class="card-title">${st.title}</h3>
                
                <div style="margin:0.5rem 0;display:flex;flex-wrap:wrap;gap:0.35rem;">
                  ${st.menuPaths.map(p => `<span class="menu-path">${p}</span>`).join('')}
                </div>

                <ol class="writer-steps" style="margin-top:0.5rem;">
                  ${st.instructions.map((ins, i) => `
                    <li class="writer-step-item">
                      <span class="step-index">${i + 1}</span>
                      <div class="step-body">${ins}</div>
                    </li>
                  `).join('')}
                </ol>

                ${st.sampleText ? `
                  <div class="copy-sample-box">
                    <div class="copy-sample-header">
                      <span>Texto-base sugerido para cópia e prática:</span>
                      <button class="btn btn-sm btn-secondary btn-copy-sample" data-copy="${encodeURIComponent(st.sampleText)}">Copiar Texto</button>
                    </div>
                    <div style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:0.86rem;line-height:1.45;color:var(--text-primary);">${st.sampleText}</div>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Checklist de Conferência da Oficina -->
        <div class="section-block">
          <h2 class="section-heading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" style="color:var(--brand-primary);"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Checklist de Conferência Final
          </h2>
          <div style="display:flex;flex-direction:column;gap:1rem;">
            ${W.checklistGroups.map(g => `
              <div class="checklist-group">
                <div style="font-weight:700;font-size:0.96rem;margin-bottom:0.6rem;color:var(--text-primary);">${g.groupTitle}</div>
                <div>
                  ${g.items.map(it => {
                    const isChecked = !!state.checklist[it.id];
                    return `
                      <label class="checklist-item ${isChecked ? 'checked' : ''}">
                        <input type="checkbox" class="chk-box" data-chk-id="${it.id}" ${isChecked ? 'checked' : ''}>
                        <span class="checklist-text" style="font-size:0.9rem;">${it.text}</span>
                      </label>
                    `;
                  }).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <!-- Conclusão da Oficina: Convite para a Avaliação Final -->
        <div class="card" style="border:2px solid #16a34a;background:linear-gradient(180deg, var(--status-ok-bg), var(--bg-surface));margin-top:1.5rem;padding:1.5rem;text-align:center;">
          <span class="eyebrow" style="background:#dcfce7;color:#166534;margin-bottom:0.5rem;">Etapa Final do Percurso</span>
          <h3 style="font-size:1.25rem;margin-bottom:0.4rem;">Oficina Concluída! Hora de Avaliar seus Conhecimentos</h3>
          <p style="font-size:0.92rem;color:var(--text-secondary);max-width:70ch;margin:0 auto 1.25rem auto;">
            Agora que você compreendeu as regras nos 6 módulos, revisou o documento com 10 inconformidades e produziu o trabalho prático no Writer, realize a <strong>Atividade Avaliativa Final</strong> para gerar sua nota oficial (0,0 a 10,0) com gabarito e comprovante em PDF.
          </p>
          <button class="btn btn-primary" id="btn-workshop-to-eval" style="min-height:48px;font-size:1rem;background:#166534;padding:0.75rem 1.75rem;">
            Avançar para a Avaliação Final (Nota) &rarr;
          </button>
        </div>
      </section>
    `;
  }

  function bindWorkshopEvents() {
    document.getElementById('btn-workshop-to-eval')?.addEventListener('click', () => {
      navigateTo('avaliacao');
    });
    // Checkbox toggle com persistência em localStorage
    document.querySelectorAll('.chk-box').forEach(input => {
      input.addEventListener('change', e => {
        const id = e.target.dataset.chkId;
        state.checklist[id] = e.target.checked;
        localStorage.setItem('abnt_workshop_checklist', JSON.stringify(state.checklist));
        renderActiveView();
      });
    });

    // Limpar checklist
    document.getElementById('btn-reset-checklist')?.addEventListener('click', () => {
      if (confirm('Deseja desmarcar todos os itens do checklist?')) {
        state.checklist = {};
        localStorage.removeItem('abnt_workshop_checklist');
        renderActiveView();
      }
    });

    // Impressão / Salvar PDF
    document.getElementById('btn-print-checklist')?.addEventListener('click', () => {
      window.print();
    });

    // Botões de cópia de texto-base
    document.querySelectorAll('.btn-copy-sample').forEach(btn => {
      btn.addEventListener('click', () => {
        const rawText = decodeURIComponent(btn.dataset.copy);
        navigator.clipboard.writeText(rawText).then(() => {
          const original = btn.innerText;
          btn.innerText = 'Copiado!';
          setTimeout(() => { btn.innerText = original; }, 1500);
        });
      });
    });
  }

  /* ==========================================================================
     VISTA: RECURSOS INTERATIVOS ADICIONAIS & GLOSSÁRIO (Seção 6)
     ========================================================================== */
  function renderToolsView() {
    const activeTool = state.currentToolId;

    return `
      <section class="view-section">
        <!-- Navegador de Recursos -->
        <div class="pill-bar" role="tablist" aria-label="Ferramentas complementares">
          <button class="pill-btn ${activeTool === 'comparador' ? 'active' : ''}" data-tool-tab="comparador">1. Comparador de Formatação</button>
          <button class="pill-btn ${activeTool === 'laboratorio-margens' ? 'active' : ''}" data-tool-tab="laboratorio-margens">2. Laboratório de Margens</button>
          <button class="pill-btn ${activeTool === 'organizador-titulos' ? 'active' : ''}" data-tool-tab="organizador-titulos">3. Organizador de Títulos</button>
          <button class="pill-btn ${activeTool === 'identificador-problemas' ? 'active' : ''}" data-tool-tab="identificador-problemas">4. Identificador de Problemas</button>
          <button class="pill-btn ${activeTool === 'consulta-rapida' ? 'active' : ''}" data-tool-tab="consulta-rapida">5. Painel de Consulta Rápida</button>
          <button class="pill-btn ${activeTool === 'glossario' ? 'active' : ''}" data-tool-tab="glossario">6. Glossário Técnico</button>
        </div>

        <div id="tool-content-area">
          ${renderToolContent(activeTool)}
        </div>
      </section>
    `;
  }

  function renderToolContent(toolId) {
    switch (toolId) {
      case 'comparador':
        return renderComparatorTool();
      case 'laboratorio-margens':
        return renderMarginLabTool();
      case 'organizador-titulos':
        return renderOutlineOrganizerTool();
      case 'identificador-problemas':
        return renderIdentifierTool();
      case 'consulta-rapida':
        return renderQuickRefTool();
      case 'glossario':
        return renderGlossaryTool();
      default:
        return renderComparatorTool();
    }
  }

  // Ferramenta 1: Comparador de Formatação (Incorreto vs. Corrigido IFCE)
  function renderComparatorTool() {
    const cases = D.TOOLS_DATA.comparatorCases;
    return `
      <div>
        <div class="hero-banner" style="margin-bottom:1.25rem;">
          <span class="eyebrow writer">Comparador Visual</span>
          <h1 class="page-title">Comparação entre Documento Incorreto e Normalizado</h1>
          <p class="page-lead">
            Examine lado a lado (ou alternando por abas) como as más práticas de digitação comprometem a apresentação e como o documento deve figurar segundo o Manual do IFCE.
          </p>
        </div>

        <div style="display:flex;flex-direction:column;gap:2rem;">
          ${cases.map((c, i) => `
            <div class="card" style="padding:1.25rem;">
              <h3 style="font-size:1.12rem;margin-bottom:0.35rem;">Caso ${i + 1}: ${c.label}</h3>
              <p style="font-size:0.9rem;margin-bottom:0.85rem;">${c.summary}</p>
              
              <div style="margin-bottom:0.85rem;padding:0.6rem 0.85rem;background:var(--bg-surface-alt);border-radius:var(--radius-md);border:1px solid var(--border-subtle);font-size:0.83rem;">
                <strong>Principais diferenças normativas:</strong>
                <ul style="margin:0.3rem 0 0 1.1rem;padding:0;">
                  ${c.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
              </div>

              <div class="lab-split equal">
                <div>
                  <div style="font-weight:700;font-size:0.82rem;color:var(--status-err);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.4rem;">
                    ✕ Versão Incorreta (Comum em Trabalhos sem Revisão)
                  </div>
                  <div style="border:1.5px solid var(--status-err-border);border-radius:var(--radius-md);background:var(--bg-desk);padding:0.65rem;">
                    ${c.incorrectHtml}
                  </div>
                </div>

                <div>
                  <div style="font-weight:700;font-size:0.82rem;color:var(--status-ok);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.4rem;">
                    ✓ Versão Normalizada (Manual do IFCE 2020)
                  </div>
                  <div style="border:1.5px solid var(--status-ok-border);border-radius:var(--radius-md);background:var(--bg-desk);padding:0.65rem;">
                    ${c.correctedHtml}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Ferramenta 2: Laboratório Livre de Margens
  function renderMarginLabTool() {
    return `
      <div>
        <div class="hero-banner" style="margin-bottom:1.25rem;">
          <span class="eyebrow writer">Simulador Interativo</span>
          <h1 class="page-title">Laboratório de Margens e Mancha Gráfica</h1>
          <p class="page-lead">
            Altere livremente as medidas das margens para observar em tempo real o impacto visual na folha A4 e no cálculo da área útil de texto (mancha gráfica).
          </p>
        </div>
        ${renderMod1MarginActivity()}
      </div>
    `;
  }

  // Ferramenta 3: Organizador de Títulos (Arrastável no PC + Botões acessíveis no Celular)
  function renderOutlineOrganizerTool() {
    const isSortedCorrectly = state.outlineItems.every((item, idx) => item.expectedOrder === idx && item.currentLevel === item.expectedLevel);

    return `
      <div>
        <div class="hero-banner" style="margin-bottom:1.25rem;">
          <span class="eyebrow writer">Estrutura e Estilos</span>
          <h1 class="page-title">Organizador de Títulos e Hierarquia</h1>
          <p class="page-lead">
            Organize os títulos abaixo na sequência lógica recomendada e atribua a cada um o nível correto (Título 1 para seções primárias, Título 2 para secundárias, Título 3 para terciárias ou Pós-textual para Referências). 
            Em computadores, você pode <strong>arrastar</strong> os itens; em smartphones ou teclado, utilize os botões <strong>↑ Subir</strong>, <strong>↓ Descer</strong> e o seletor de nível.
          </p>
        </div>

        <div class="lab-split">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.6rem;">
              <span style="font-weight:700;font-size:0.92rem;">Itens da Estrutura Acadêmica:</span>
              <button class="btn btn-sm btn-secondary" id="btn-reset-outline">Restaurar Ordem Inicial</button>
            </div>

            <div class="outline-organizer-list" id="outline-list-container">
              ${state.outlineItems.map((item, idx) => `
                <div class="outline-item-card level-${item.currentLevel}" draggable="true" data-outline-idx="${idx}">
                  <div style="min-width:0;flex:1;">
                    <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);">Posição ${idx + 1}</div>
                    <div style="font-size:0.95rem;font-weight:600;color:var(--text-primary);">${item.title}</div>
                  </div>

                  <div class="outline-controls">
                    <select class="control-select outline-level-select" data-outline-idx="${idx}" style="min-height:36px;padding:2px 6px;font-size:0.8rem;width:auto;">
                      <option value="1" ${item.currentLevel === '1' ? 'selected' : ''}>Nível 1 (Primária)</option>
                      <option value="2" ${item.currentLevel === '2' ? 'selected' : ''}>Nível 2 (Secundária)</option>
                      <option value="3" ${item.currentLevel === '3' ? 'selected' : ''}>Nível 3 (Terciária)</option>
                      <option value="post" ${item.currentLevel === 'post' ? 'selected' : ''}>Pós-textual</option>
                    </select>
                    <button class="icon-action-btn btn-move-up" data-move-idx="${idx}" ${idx === 0 ? 'disabled' : ''} aria-label="Mover para cima">↑</button>
                    <button class="icon-action-btn btn-move-down" data-move-idx="${idx}" ${idx === state.outlineItems.length - 1 ? 'disabled' : ''} aria-label="Mover para baixo">↓</button>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="diagnostic-box" style="margin-top:1rem;">
              <div class="diag-item">
                <span class="diag-badge ${isSortedCorrectly ? 'ok' : 'pending'}">${isSortedCorrectly ? 'Estrutura Perfeita' : 'Ajustes Pendentes'}</span>
                <span>${isSortedCorrectly
                  ? 'A ordenação e os níveis hierárquicos estão rigorosamente conforme a ABNT / Manual do IFCE!'
                  : 'Ordene a sequência (Introdução → Fundamentação → Secundária/Terciária → Conclusão → Referências) e verifique os níveis.'}</span>
              </div>
            </div>
          </div>

          <div>
            <div style="font-weight:700;font-size:0.92rem;margin-bottom:0.6rem;">
              Prévia do Sumário Resultante da sua Estrutura:
            </div>
            <div class="a4-sheet font-arial" style="max-width:100%;min-height:380px;">
              <div class="doc-title-centered" style="margin-bottom:1.25rem;">SUMÁRIO</div>
              <ul class="toc-list">
                ${state.outlineItems.map(item => {
                  let numLabel = '';
                  let titleFormatted = item.title;
                  if (item.currentLevel === '1') {
                    titleFormatted = `<strong>${item.title.toUpperCase()}</strong>`;
                  } else if (item.currentLevel === '2') {
                    titleFormatted = `<strong>${item.title}</strong>`;
                  } else if (item.currentLevel === '3') {
                    titleFormatted = `<em><strong>${item.title}</strong></em>`;
                  } else {
                    titleFormatted = `<strong>${item.title.toUpperCase()}</strong>`;
                  }

                  return `
                    <li class="toc-row">
                      <span class="toc-num" style="font-size:0.85rem;color:#64748b;">[${item.currentLevel}]</span>
                      <span class="toc-title">${titleFormatted}</span>
                      <span class="toc-dots"></span>
                      <span class="toc-page">...</span>
                    </li>
                  `;
                }).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Ferramenta 4: Identificador de Problemas
  function renderIdentifierTool() {
    const cases = D.TOOLS_DATA.identifierCases;
    return `
      <div>
        <div class="hero-banner" style="margin-bottom:1.25rem;">
          <span class="eyebrow writer">Inspeção Rápida</span>
          <h1 class="page-title">Identificador Interativo de Problemas</h1>
          <p class="page-lead">
            Toque nos componentes das páginas acadêmicas abaixo para verificar se apresentam inconformidades técnicas segundo o Manual do IFCE.
          </p>
        </div>

        <div style="display:flex;flex-direction:column;gap:1.75rem;">
          ${cases.map(c => `
            <div class="card" style="padding:1.25rem;">
              <h3 style="font-size:1.15rem;margin-bottom:0.35rem;">${c.title}</h3>
              <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:1rem;">${c.instruction}</p>

              <div class="a4-sheet font-arial" style="max-width:100%;box-shadow:none;border:1px solid var(--border-strong);">
                ${c.segments.map(seg => {
                  const isInspected = state.inspectedSegments.has(seg.id);
                  return `
                    <div class="review-hotspot ${isInspected ? (seg.hasError ? 'is-error' : 'is-fixed') : ''}" 
                         data-inspect-seg="${seg.id}"
                         style="border-style:dashed;margin-bottom:0.75rem;">
                      <span class="hotspot-chip">${isInspected ? (seg.hasError ? '! Inconformidade' : '✓ Conforme') : 'Toque para Inspecionar'}</span>
                      ${seg.html}
                      ${isInspected ? `
                        <div style="margin-top:0.45rem;padding:0.5rem 0.65rem;border-radius:4px;font-size:0.83rem;background:${seg.hasError ? 'var(--status-err-bg)' : 'var(--status-ok-bg)'};color:${seg.hasError ? 'var(--status-err)' : 'var(--status-ok)'};border:1px solid ${seg.hasError ? 'var(--status-err-border)' : 'var(--status-ok-border)'};">
                          ${seg.feedback}
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Ferramenta 5: Painel de Consulta Rápida
  function renderQuickRefTool() {
    const list = D.TOOLS_DATA.quickReference;
    const categories = ['todas', ...new Set(list.map(i => i.category))];

    const filtered = list.filter(item => {
      const matchCat = state.quickRefCategory === 'todas' || item.category === state.quickRefCategory;
      const q = state.quickRefQuery.toLowerCase();
      const matchQuery = !q || item.item.toLowerCase().includes(q) || item.spec.toLowerCase().includes(q) || item.writerPath.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    return `
      <div>
        <div class="hero-banner" style="margin-bottom:1.25rem;">
          <span class="eyebrow writer">Consulta Rápida</span>
          <h1 class="page-title">Painel de Medidas do Manual & Comandos do Writer</h1>
          <p class="page-lead">
            Localize instantaneamente medidas, espaçamentos, regras de citação e caminhos nos menus do LibreOffice Writer consolidados do Manual do IFCE (2020).
          </p>
        </div>

        <div class="search-bar-wrap" style="display:flex;flex-wrap:wrap;gap:0.65rem;margin-bottom:1.25rem;">
          <input type="search" class="control-input" id="quickref-search-input" placeholder="Buscar por medida, recurso ou atalho (ex.: recuo, nota, sumário)..." value="${state.quickRefQuery}" style="flex:1;min-width:260px;">
          <select class="control-select" id="quickref-cat-select" style="width:auto;min-width:180px;">
            ${categories.map(c => `
              <option value="${c}" ${state.quickRefCategory === c ? 'selected' : ''}>${c === 'todas' ? 'Todas as Categorias' : c}</option>
            `).join('')}
          </select>
        </div>

        <div style="font-size:0.83rem;color:var(--text-muted);margin-bottom:0.75rem;">
          Exibindo <strong>${filtered.length}</strong> de <strong>${list.length}</strong> parâmetros cadastrados
        </div>

        <div class="grid-cards cols-2">
          ${filtered.map(item => `
            <div class="card">
              <div class="card-header-row">
                <span class="glossary-cat">${item.category}</span>
                <span style="font-size:0.75rem;font-weight:600;color:var(--brand-primary);">${item.manualRef}</span>
              </div>
              <h3 style="font-size:1.02rem;margin-bottom:0.35rem;">${item.item}</h3>
              <p style="font-size:0.9rem;font-weight:600;color:var(--text-primary);margin-bottom:0.6rem;">${item.spec}</p>
              <div style="margin-top:auto;padding-top:0.6rem;border-top:1px solid var(--border-subtle);">
                <span style="font-size:0.73rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:0.2rem;text-transform:uppercase;">No LibreOffice Writer:</span>
                <span class="menu-path">${item.writerPath}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Ferramenta 6: Glossário Técnico
  function renderGlossaryTool() {
    const list = D.TOOLS_DATA.glossary;
    const categories = ['todas', ...new Set(list.map(i => i.category))];

    const filtered = list.filter(item => {
      const matchCat = state.glossaryCategory === 'todas' || item.category === state.glossaryCategory;
      const q = state.glossaryQuery.toLowerCase();
      const matchQuery = !q || item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    return `
      <div>
        <div class="hero-banner" style="margin-bottom:1.25rem;">
          <span class="eyebrow writer">Vocabulário Técnico</span>
          <h1 class="page-title">Glossário de Normalização e Editoração</h1>
          <p class="page-lead">
            Compreenda os termos fundamentais da metodologia científica e da computação aplicada a documentos acadêmicos.
          </p>
        </div>

        <div class="search-bar-wrap" style="display:flex;flex-wrap:wrap;gap:0.65rem;margin-bottom:1.25rem;">
          <input type="search" class="control-input" id="glossary-search-input" placeholder="Pesquisar termo no glossário (ex.: margem, anverso, recuo)..." value="${state.glossaryQuery}" style="flex:1;min-width:260px;">
          <select class="control-select" id="glossary-cat-select" style="width:auto;min-width:180px;">
            ${categories.map(c => `
              <option value="${c}" ${state.glossaryCategory === c ? 'selected' : ''}>${c === 'todas' ? 'Todas as Áreas' : c}</option>
            `).join('')}
          </select>
        </div>

        <div style="font-size:0.83rem;color:var(--text-muted);margin-bottom:0.75rem;">
          Exibindo <strong>${filtered.length}</strong> de <strong>${list.length}</strong> termos
        </div>

        <div class="grid-cards cols-2">
          ${filtered.map(item => `
            <div class="glossary-card">
              <div class="glossary-term">
                <span>${item.term}</span>
                <span class="glossary-cat">${item.category}</span>
              </div>
              <p style="font-size:0.9rem;margin:0;line-height:1.55;">${item.definition}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function bindToolsEvents() {
    document.querySelectorAll('[data-tool-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo('ferramentas', btn.dataset.toolTab);
      });
    });

    // Organizador de Títulos (Botões e Drag/Drop)
    if (state.currentToolId === 'organizador-titulos') {
      document.querySelectorAll('.btn-move-up').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.moveIdx, 10);
          if (idx > 0) {
            const temp = state.outlineItems[idx];
            state.outlineItems[idx] = state.outlineItems[idx - 1];
            state.outlineItems[idx - 1] = temp;
            renderActiveView();
          }
        });
      });

      document.querySelectorAll('.btn-move-down').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.moveIdx, 10);
          if (idx < state.outlineItems.length - 1) {
            const temp = state.outlineItems[idx];
            state.outlineItems[idx] = state.outlineItems[idx + 1];
            state.outlineItems[idx + 1] = temp;
            renderActiveView();
          }
        });
      });

      document.querySelectorAll('.outline-level-select').forEach(sel => {
        sel.addEventListener('change', e => {
          const idx = parseInt(sel.dataset.outlineIdx, 10);
          state.outlineItems[idx].currentLevel = e.target.value;
          renderActiveView();
        });
      });

      document.getElementById('btn-reset-outline')?.addEventListener('click', () => {
        state.outlineItems = JSON.parse(JSON.stringify(D.TOOLS_DATA.outlineOrganizerInitial));
        renderActiveView();
      });

      // Drag and drop no desktop
      const cards = document.querySelectorAll('.outline-item-card[draggable="true"]');
      let draggedIdx = null;

      cards.forEach(card => {
        card.addEventListener('dragstart', e => {
          draggedIdx = parseInt(card.dataset.outlineIdx, 10);
          card.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
        });

        card.addEventListener('dragend', () => {
          card.classList.remove('dragging');
        });

        card.addEventListener('dragover', e => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        });

        card.addEventListener('drop', e => {
          e.preventDefault();
          const targetIdx = parseInt(card.dataset.outlineIdx, 10);
          if (draggedIdx !== null && draggedIdx !== targetIdx) {
            const moved = state.outlineItems.splice(draggedIdx, 1)[0];
            state.outlineItems.splice(targetIdx, 0, moved);
            renderActiveView();
          }
        });
      });
    }

    // Identificador de Problemas
    if (state.currentToolId === 'identificador-problemas') {
      document.querySelectorAll('[data-inspect-seg]').forEach(el => {
        el.addEventListener('click', () => {
          const sId = el.dataset.inspectSeg;
          if (state.inspectedSegments.has(sId)) {
            state.inspectedSegments.delete(sId);
          } else {
            state.inspectedSegments.add(sId);
          }
          renderActiveView();
        });
      });
    }

    // Consulta Rápida (Filtro e Busca)
    if (state.currentToolId === 'consulta-rapida') {
      const input = document.getElementById('quickref-search-input');
      const select = document.getElementById('quickref-cat-select');

      input?.addEventListener('input', e => {
        state.quickRefQuery = e.target.value;
        const area = document.getElementById('tool-content-area');
        if (area) {
          area.innerHTML = renderQuickRefTool();
          bindToolsEvents();
          document.getElementById('quickref-search-input')?.focus();
        }
      });

      select?.addEventListener('change', e => {
        state.quickRefCategory = e.target.value;
        const area = document.getElementById('tool-content-area');
        if (area) {
          area.innerHTML = renderQuickRefTool();
          bindToolsEvents();
        }
      });
    }

    // Glossário (Filtro e Busca)
    if (state.currentToolId === 'glossario') {
      const input = document.getElementById('glossary-search-input');
      const select = document.getElementById('glossary-cat-select');

      input?.addEventListener('input', e => {
        state.glossaryQuery = e.target.value;
        const area = document.getElementById('tool-content-area');
        if (area) {
          area.innerHTML = renderGlossaryTool();
          bindToolsEvents();
          document.getElementById('glossary-search-input')?.focus();
        }
      });

      select?.addEventListener('change', e => {
        state.glossaryCategory = e.target.value;
        const area = document.getElementById('tool-content-area');
        if (area) {
          area.innerHTML = renderGlossaryTool();
          bindToolsEvents();
        }
      });
    }
  }

  // Painel Gaveta de Consulta Rápida Global
  function initGlobalQuickRefDrawer() {
    const backdrop = document.getElementById('quickref-drawer-backdrop');
    const closeBtn = document.getElementById('btn-close-drawer');
    const openBtns = document.querySelectorAll('.btn-open-quickref');
    const drawerBody = document.getElementById('drawer-quickref-body');

    const openDrawer = () => {
      if (drawerBody) {
        drawerBody.innerHTML = `
          <div style="margin-bottom:0.75rem;">
            <input type="search" class="control-input" id="drawer-search-input" placeholder="Filtrar medidas e menus...">
          </div>
          <div id="drawer-items-list" style="display:flex;flex-direction:column;gap:0.75rem;">
            ${renderDrawerItems('')}
          </div>
        `;

        document.getElementById('drawer-search-input')?.addEventListener('input', e => {
          const listEl = document.getElementById('drawer-items-list');
          if (listEl) listEl.innerHTML = renderDrawerItems(e.target.value.toLowerCase());
        });
      }
      backdrop?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      backdrop?.classList.remove('open');
      document.body.style.overflow = '';
    };

    openBtns.forEach(b => b.addEventListener('click', openDrawer));
    closeBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', e => {
      if (e.target === backdrop) closeDrawer();
    });
  }

  function renderDrawerItems(q) {
    const list = D.TOOLS_DATA.quickReference.filter(it => {
      return !q || it.item.toLowerCase().includes(q) || it.spec.toLowerCase().includes(q) || it.writerPath.toLowerCase().includes(q);
    });

    return list.map(item => `
      <div class="card" style="padding:0.85rem;">
        <div style="display:flex;justify-content:space-between;gap:0.4rem;font-size:0.74rem;color:var(--text-muted);font-weight:700;">
          <span>${item.category}</span>
          <span style="color:var(--brand-primary);">${item.manualRef}</span>
        </div>
        <div style="font-weight:700;font-size:0.92rem;margin:0.25rem 0;">${item.item}</div>
        <div style="font-size:0.86rem;color:var(--text-primary);margin-bottom:0.45rem;">${item.spec}</div>
        <div style="font-size:0.76rem;color:var(--writer-accent);font-family:var(--font-mono);background:var(--writer-accent-soft);padding:0.2rem 0.4rem;border-radius:4px;">
          ${item.writerPath}
        </div>
      </div>
    `).join('');
  }

  // Inicialização Geral da Aplicação
  function initApp() {
    initTheme();
    initGlobalQuickRefDrawer();

    // Cliques na barra lateral e botões do shell
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo(btn.dataset.view);
      });
    });

    document.querySelectorAll('.sidebar-subbtn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.modId) {
          const num = btn.dataset.modId.replace('mod', '');
          navigateTo('modulos', num);
        }
      });
    });

    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo(btn.dataset.view);
      });
    });

    document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Monitoramento do evento de hash change
    window.addEventListener('hashchange', handleRoute);

    // Carregamento inicial da rota
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

