/**
 * Interactive Controller for the Central Open-Science & Clinical AI Observatory
 * Dr Prajwal Ghimire (@prazg) — https://prazg.github.io/
 *
 * Features:
 * - Seamless Dark / Light Theme Toggle (WCAG 2.1 AA high-contrast tokens)
 * - Stereotactic Neural-Mesh Canvas Observatory (honors prefers-reduced-motion)
 * - "Find the Right Tool" 6-Goal Clinical & Research Workflow Router
 * - Instant 10-App Suite Search ('/' to focus, 'Escape' to clear) + Category & Runtime Filters
 * - Radiogenomics & Glioblastoma Frameworks + Nepal Multi-Hazard Observatory Renderers
 * - 1-Click Markdown / BibTeX / Plain-Text Suite Exporter & Local File Downloader
 */

import {
  CATEGORY_FILTERS,
  DOMAIN_ICONS,
  NEPAL_PORTALS,
  NEURO_AI_APPS,
  RADIOGENOMICS_REPOS,
  RUNTIME_FILTERS,
  WORKFLOW_GOALS,
  buildBibtexCitation,
  buildMarkdownDirectory,
  buildPlainTextCitation
} from './portalData.js';

const THEME_STORAGE_KEY = 'prazg-portal-theme';

const state = {
  theme: 'dark',
  searchQuery: '',
  selectedCategory: 'all',
  selectedRuntime: 'all',
  activeWorkflowGoalId: null,
  exportFormat: 'markdown'
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getDomainIcon(iconId) {
  return DOMAIN_ICONS[iconId] || DOMAIN_ICONS['mri-calipers'];
}

function prefersReducedMotion() {
  return Boolean(
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/* ==========================================================================
   Theme Management (Default Dark #070d18 + High-Contrast Ivory-Slate Light)
   ========================================================================== */
function getInitialTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Ignore storage access restrictions in private sandboxes
  }
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function applyTheme(theme, redrawCanvasCallback) {
  state.theme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);

  const toggleBtn = document.getElementById('theme-toggle');
  const toggleLabel = document.getElementById('theme-toggle-label');
  const toggleIcon = document.getElementById('theme-toggle-icon');

  if (toggleBtn) {
    const isLight = state.theme === 'light';
    toggleBtn.setAttribute('aria-pressed', String(isLight));
    toggleBtn.setAttribute(
      'aria-label',
      isLight ? 'Switch to dark obsidian theme' : 'Switch to light ivory-slate theme'
    );
    if (toggleLabel) {
      toggleLabel.textContent = isLight ? 'Dark Theme' : 'Light Theme';
    }
    if (toggleIcon) {
      toggleIcon.innerHTML = isLight
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="4.9" y1="4.9" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19.1" y2="19.1"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.9" y1="19.1" x2="6.7" y2="17.3"/><line x1="17.3" y1="6.7" x2="19.1" y2="4.9"/></svg>`;
    }
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, state.theme);
  } catch {
    // Ignore storage write errors
  }

  if (typeof redrawCanvasCallback === 'function') {
    redrawCanvasCallback();
  }
}

/* ==========================================================================
   Workflow Goal Selector ("Find the Right Tool")
   ========================================================================== */
function renderWorkflowGoals() {
  const container = document.getElementById('workflow-grid');
  if (!container) return;

  const appById = new Map(NEURO_AI_APPS.map((app) => [app.id, app]));

  container.innerHTML = WORKFLOW_GOALS.map((goal) => {
    const isActive = state.activeWorkflowGoalId === goal.id;
    const recNames = goal.recommendedIds
      .map((id) => appById.get(id)?.name)
      .filter(Boolean)
      .join(' · ');

    return `
      <button
        type="button"
        class="workflow-card"
        data-workflow-id="${escapeHtml(goal.id)}"
        data-accent="${escapeHtml(goal.accent)}"
        aria-pressed="${String(isActive)}"
      >
        <div>
          <div class="workflow-card-top">
            <span class="workflow-icon-box">${getDomainIcon(goal.iconId)}</span>
            <span class="workflow-step">WORKFLOW ${escapeHtml(goal.step)}</span>
          </div>
          <h3 class="workflow-goal-title">${escapeHtml(goal.title)}</h3>
          <div class="workflow-domain-label">${escapeHtml(goal.domainLabel)}</div>
        </div>
        <div class="workflow-rec-footer">
          <span>${escapeHtml(recNames)}</span>
          <span aria-hidden="true">${isActive ? 'Active ✓' : 'Select →'}</span>
        </div>
      </button>
    `;
  }).join('');
}

function updateWorkflowBanner() {
  const banner = document.getElementById('workflow-recommendation-banner');
  const goalNameEl = document.getElementById('workflow-banner-goal-name');
  const tipEl = document.getElementById('workflow-banner-tip');
  const linksEl = document.getElementById('workflow-banner-links');

  if (!banner || !goalNameEl || !tipEl || !linksEl) return;

  const activeGoal = WORKFLOW_GOALS.find((g) => g.id === state.activeWorkflowGoalId);
  if (!activeGoal) {
    banner.hidden = true;
    return;
  }

  const appById = new Map(NEURO_AI_APPS.map((app) => [app.id, app]));
  goalNameEl.textContent = activeGoal.title;
  tipEl.textContent = activeGoal.workflowTip;

  linksEl.innerHTML = activeGoal.recommendedIds
    .map((id) => {
      const app = appById.get(id);
      if (!app) return '';
      return `
        <a
          href="${escapeHtml(app.liveUrl)}"
          class="btn-launch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Launch ${escapeHtml(app.name)} <span aria-hidden="true">→</span>
        </a>
      `;
    })
    .join('');

  banner.hidden = false;
}

/* ==========================================================================
   10-App Suite Explorer: Filtering, Search & Rendering
   ========================================================================== */
function getCategoryCount(categoryId) {
  if (categoryId === 'all') return NEURO_AI_APPS.length;
  return NEURO_AI_APPS.filter((app) => app.categoryId === categoryId).length;
}

function getRuntimeCount(runtimeId) {
  if (runtimeId === 'all') return NEURO_AI_APPS.length;
  return NEURO_AI_APPS.filter((app) => app.runtimeGroup === runtimeId).length;
}

function renderFilterPills() {
  const categoryGroup = document.getElementById('category-filter-group');
  const runtimeGroup = document.getElementById('runtime-filter-group');

  if (categoryGroup) {
    categoryGroup.innerHTML = CATEGORY_FILTERS.map((cat) => {
      const isSelected = state.selectedCategory === cat.id;
      const count = getCategoryCount(cat.id);
      const countBadge =
        cat.id === 'all' ? '' : `<span class="filter-count">(${count})</span>`;
      return `
        <button
          type="button"
          class="filter-pill"
          data-category-filter="${escapeHtml(cat.id)}"
          aria-pressed="${String(isSelected)}"
        >
          <span>${escapeHtml(cat.label)}</span>
          ${countBadge}
        </button>
      `;
    }).join('');
  }

  if (runtimeGroup) {
    runtimeGroup.innerHTML = RUNTIME_FILTERS.map((rt) => {
      const isSelected = state.selectedRuntime === rt.id;
      const count = getRuntimeCount(rt.id);
      return `
        <button
          type="button"
          class="filter-pill"
          data-runtime-filter="${escapeHtml(rt.id)}"
          aria-pressed="${String(isSelected)}"
        >
          <span>${escapeHtml(rt.label)}</span>
          <span class="filter-count">(${count})</span>
        </button>
      `;
    }).join('');
  }
}

function filterNeuroApps() {
  const query = state.searchQuery.trim().toLowerCase();
  const activeGoal = WORKFLOW_GOALS.find((g) => g.id === state.activeWorkflowGoalId);
  const recommendedSet = activeGoal ? new Set(activeGoal.recommendedIds) : null;

  return NEURO_AI_APPS.filter((app) => {
    if (recommendedSet && !recommendedSet.has(app.id)) {
      return false;
    }
    if (state.selectedCategory !== 'all' && app.categoryId !== state.selectedCategory) {
      return false;
    }
    if (state.selectedRuntime !== 'all' && app.runtimeGroup !== state.selectedRuntime) {
      return false;
    }
    if (query) {
      const searchable = [
        app.name,
        app.category,
        app.privacyRuntime,
        app.summary,
        ...app.capabilities
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

function hasAnyActiveFilter() {
  return (
    state.searchQuery.trim() !== '' ||
    state.selectedCategory !== 'all' ||
    state.selectedRuntime !== 'all' ||
    state.activeWorkflowGoalId !== null
  );
}

function renderAppsGrid() {
  const grid = document.getElementById('apps-grid');
  const emptyState = document.getElementById('apps-empty-state');
  const countEl = document.getElementById('suite-results-count');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const resetAllBtn = document.getElementById('reset-all-filters-btn');

  if (!grid) return;

  const filtered = filterNeuroApps();
  const activeGoal = WORKFLOW_GOALS.find((g) => g.id === state.activeWorkflowGoalId);
  const recommendedSet = activeGoal ? new Set(activeGoal.recommendedIds) : new Set();

  if (clearSearchBtn) {
    clearSearchBtn.hidden = state.searchQuery.trim().length === 0;
  }

  if (resetAllBtn) {
    resetAllBtn.hidden = !hasAnyActiveFilter();
  }

  if (countEl) {
    countEl.textContent =
      filtered.length === NEURO_AI_APPS.length
        ? `Showing all ${NEURO_AI_APPS.length} verified applications`
        : `Showing ${filtered.length} of ${NEURO_AI_APPS.length} applications`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.hidden = false;
    return;
  }

  if (emptyState) emptyState.hidden = true;

  grid.innerHTML = filtered
    .map((app) => {
      const isRecommended = recommendedSet.has(app.id);
      const orderStr = String(app.order).padStart(2, '0');
      const recommendedBadge = isRecommended
        ? `<span class="recommended-pill">★ Recommended for Selected Goal</span>`
        : '';

      return `
        <article
          class="app-card ${isRecommended ? 'app-card--recommended' : ''}"
          id="app-${escapeHtml(app.id)}"
          data-accent="${escapeHtml(app.accent)}"
        >
          <div>
            <div class="app-card-header">
              <div class="app-identity">
                <span class="app-icon-frame">${getDomainIcon(app.iconId)}</span>
                <div>
                  <span class="app-order-kicker">APP ${escapeHtml(orderStr)} / NEURO &amp; PATHOLOGY SUITE</span>
                  <h3 class="app-title">${escapeHtml(app.name)}</h3>
                </div>
              </div>
            </div>

            <div class="app-badges">
              ${recommendedBadge}
              <span class="domain-badge" data-accent="${escapeHtml(app.accent)}">${escapeHtml(app.category)}</span>
              <span class="runtime-badge">${escapeHtml(app.privacyRuntime)}</span>
            </div>

            <p class="app-summary">${escapeHtml(app.summary)}</p>

            <ul class="capability-tags" aria-label="${escapeHtml(app.name)} key capabilities">
              ${app.capabilities
                .map((cap) => `<li class="capability-tag">${escapeHtml(cap)}</li>`)
                .join('')}
            </ul>
          </div>

          <div class="card-actions">
            <a
              href="${escapeHtml(app.liveUrl)}"
              class="btn-launch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Launch Live App <span aria-hidden="true">→</span>
            </a>
            <a
              href="${escapeHtml(app.repoUrl)}"
              class="btn-repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo
            </a>
          </div>
        </article>
      `;
    })
    .join('');
}

function resetAllFilters() {
  state.searchQuery = '';
  state.selectedCategory = 'all';
  state.selectedRuntime = 'all';
  state.activeWorkflowGoalId = null;

  const searchInput = document.getElementById('app-search');
  if (searchInput) {
    searchInput.value = '';
  }

  renderWorkflowGoals();
  updateWorkflowBanner();
  renderFilterPills();
  renderAppsGrid();
}

/* ==========================================================================
   Radiogenomics & Nepal Open-Science Renderers
   ========================================================================== */
function renderRadiogenomicsGrid() {
  const grid = document.getElementById('radiogenomics-grid');
  if (!grid) return;

  grid.innerHTML = RADIOGENOMICS_REPOS.map((repo) => {
    return `
      <article class="research-card" data-accent="${escapeHtml(repo.accent)}">
        <div>
          <div class="research-card-top">
            <span class="app-icon-frame">${getDomainIcon(repo.iconId)}</span>
            <div>
              <span class="domain-badge" data-accent="${escapeHtml(repo.accent)}">${escapeHtml(repo.domain)}</span>
            </div>
          </div>
          <h3 class="research-title" style="margin-bottom: 0.55rem;">${escapeHtml(repo.name)}</h3>
          <p class="app-summary">${escapeHtml(repo.summary)}</p>
          <ul class="capability-tags" aria-label="${escapeHtml(repo.name)} research keywords">
            ${repo.tags.map((t) => `<li class="capability-tag">${escapeHtml(t)}</li>`).join('')}
          </ul>
        </div>
        <div class="card-actions">
          <a
            href="${escapeHtml(repo.repoUrl)}"
            class="btn-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    `;
  }).join('');
}

function renderNepalGrid() {
  const grid = document.getElementById('nepal-grid');
  if (!grid) return;

  grid.innerHTML = NEPAL_PORTALS.map((portal) => {
    return `
      <article class="research-card" data-accent="${escapeHtml(portal.accent)}">
        <div>
          <div class="research-card-top">
            <span class="app-icon-frame">${getDomainIcon(portal.iconId)}</span>
            <div>
              <span class="domain-badge" data-accent="${escapeHtml(portal.accent)}">${escapeHtml(portal.domain)}</span>
            </div>
          </div>
          <h3 class="research-title" style="margin-bottom: 0.55rem;">${escapeHtml(portal.name)}</h3>
          <p class="app-summary">${escapeHtml(portal.summary)}</p>
          <ul class="capability-tags" aria-label="${escapeHtml(portal.name)} highlights">
            ${portal.tags.map((t) => `<li class="capability-tag">${escapeHtml(t)}</li>`).join('')}
          </ul>
        </div>
        <div class="card-actions">
          <a
            href="${escapeHtml(portal.liveUrl)}"
            class="btn-launch"
            target="_blank"
            rel="noopener noreferrer"
          >
            Launch Live Portal <span aria-hidden="true">→</span>
          </a>
          <a
            href="${escapeHtml(portal.repoUrl)}"
            class="btn-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo
          </a>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   1-Click Suite Citation & Markdown Directory Exporter
   ========================================================================== */
function getExportPayload(format) {
  if (format === 'bibtex') {
    return {
      text: buildBibtexCitation(),
      filename: 'prazg-clinical-ai-observatory.bib',
      mime: 'application/x-bibtex;charset=utf-8'
    };
  }
  if (format === 'plain') {
    return {
      text: buildPlainTextCitation(),
      filename: 'prazg-clinical-ai-observatory-citation.txt',
      mime: 'text/plain;charset=utf-8'
    };
  }
  return {
    text: buildMarkdownDirectory(),
    filename: 'prazg-open-science-ai-directory.md',
    mime: 'text/markdown;charset=utf-8'
  };
}

function renderExporterPreview() {
  const previewEl = document.getElementById('export-code-preview');
  const tabpanelEl = document.getElementById('export-tabpanel');
  const copyBtnLabel = document.getElementById('copy-export-label');
  const payload = getExportPayload(state.exportFormat);

  if (previewEl) {
    previewEl.textContent = payload.text;
  }

  if (copyBtnLabel) {
    if (state.exportFormat === 'bibtex') {
      copyBtnLabel.textContent = 'Copy BibTeX';
    } else if (state.exportFormat === 'plain') {
      copyBtnLabel.textContent = 'Copy Reference';
    } else {
      copyBtnLabel.textContent = 'Copy Markdown Directory';
    }
  }

  const tabs = document.querySelectorAll('[data-export-format]');
  tabs.forEach((tab) => {
    const isSelected = tab.getAttribute('data-export-format') === state.exportFormat;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    if (isSelected && tabpanelEl && tab.id) {
      tabpanelEl.setAttribute('aria-labelledby', tab.id);
    }
  });
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back to textarea selection
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/* ==========================================================================
   Stereotactic Neural-Mesh Header Canvas (Honoring prefers-reduced-motion)
   ========================================================================== */
function initStereotacticCanvas() {
  const canvas = document.getElementById('stereotactic-canvas');
  const telemetryEl = document.getElementById('mni-telemetry');
  const statusEl = document.getElementById('motion-status-label');
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const nodePaletteDark = ['#38bdf8', '#10b981', '#f472b6', '#f59e0b'];
  const nodePaletteLight = ['#0369a1', '#047857', '#be185d', '#a1440b'];

  // Deterministic stereotactic seed nodes in normalized [-1, 1] space
  const nodes = Array.from({ length: 24 }, (_, idx) => {
    const goldenAngle = idx * 2.39996323;
    const radius = 0.22 + 0.66 * Math.sqrt((idx + 0.5) / 24);
    return {
      baseX: Math.cos(goldenAngle) * radius,
      baseY: Math.sin(goldenAngle) * radius * 0.78,
      phase: idx * 0.57,
      speed: 0.35 + (idx % 5) * 0.11,
      colorIndex: idx % 4,
      size: idx % 6 === 0 ? 3.4 : 2.3
    };
  });

  let width = 520;
  let height = 256;
  let pointerX = 0;
  let pointerY = 0;
  let hasPointer = false;
  let animFrameId = null;
  let isVisible = true;
  const motionMedia = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(280, Math.floor(rect.width || 520));
    height = Math.max(220, Math.floor(rect.height || 256));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawFrame(timestampMs) {
    const isLight = state.theme === 'light';
    const palette = isLight ? nodePaletteLight : nodePaletteDark;
    const ringStroke = isLight ? 'rgba(3, 105, 161, 0.20)' : 'rgba(56, 189, 248, 0.20)';
    const axisStroke = isLight ? 'rgba(71, 85, 105, 0.22)' : 'rgba(148, 163, 184, 0.16)';
    const arcStroke = isLight ? 'rgba(4, 120, 87, 0.55)' : 'rgba(16, 185, 129, 0.58)';

    ctx.clearRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.52;
    const scale = Math.min(width, height) * 0.43;
    const t = prefersReducedMotion() ? 0 : timestampMs * 0.001;

    // 1. Stereotactic MNI-152 concentric coordinate rings & crosshairs
    ctx.save();
    ctx.strokeStyle = axisStroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - scale * 1.25, cy);
    ctx.lineTo(cx + scale * 1.25, cy);
    ctx.moveTo(cx, cy - scale * 0.98);
    ctx.lineTo(cx, cy + scale * 0.98);
    ctx.stroke();

    ctx.strokeStyle = ringStroke;
    [0.45, 0.78, 1.05].forEach((factor, i) => {
      ctx.beginPath();
      if (i === 1) {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.ellipse(cx, cy, scale * factor * 1.12, scale * factor * 0.86, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // 2. Stereotactic corridor trajectory arc (entry -> deep target)
    const targetX = cx + (hasPointer ? pointerX * 22 : 14);
    const targetY = cy + (hasPointer ? pointerY * 16 : -8);
    const entryX = cx + scale * 0.84;
    const entryY = cy - scale * 0.72;

    ctx.strokeStyle = arcStroke;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(entryX, entryY);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(targetX, targetY, 6.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3. Compute node screen positions
    const projected = nodes.map((n) => {
      const driftX = Math.sin(t * n.speed + n.phase) * 0.045;
      const driftY = Math.cos(t * n.speed * 0.9 + n.phase) * 0.045;
      const parallaxX = hasPointer ? pointerX * 0.06 : 0;
      const parallaxY = hasPointer ? pointerY * 0.06 : 0;
      return {
        x: cx + (n.baseX + driftX + parallaxX) * scale * 1.15,
        y: cy + (n.baseY + driftY + parallaxY) * scale * 0.92,
        color: palette[n.colorIndex],
        size: n.size
      };
    });

    // 4. Connect nearby neural-mesh filaments
    const maxDist = scale * 0.72;
    ctx.lineWidth = 1;
    for (let i = 0; i < projected.length; i += 1) {
      for (let j = i + 1; j < projected.length; j += 1) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * (isLight ? 0.28 : 0.34);
          ctx.strokeStyle = isLight
            ? `rgba(3, 105, 161, ${alpha.toFixed(3)})`
            : `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.stroke();
        }
      }
    }

    // 5. Render stereotactic nodes
    for (const pt of projected) {
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function stopLoop() {
    if (animFrameId !== null) {
      window.cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  function tick(now) {
    if (prefersReducedMotion() || !isVisible || document.hidden) {
      animFrameId = null;
      drawFrame(0);
      return;
    }
    drawFrame(now);
    animFrameId = window.requestAnimationFrame(tick);
  }

  function syncLoopState() {
    const reduced = prefersReducedMotion();
    if (statusEl) {
      statusEl.textContent = reduced ? 'Static Stereotactic Frame' : 'MNI-152 Neural Mesh';
    }
    stopLoop();
    if (reduced || !isVisible || document.hidden) {
      drawFrame(0);
    } else {
      animFrameId = window.requestAnimationFrame(tick);
    }
  }

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    hasPointer = true;

    if (telemetryEl) {
      const mniX = (pointerX * 42).toFixed(1);
      const mniY = (-pointerY * 54 - 12).toFixed(1);
      const mniZ = (28 - pointerY * 24).toFixed(1);
      const fmt = (v) => (Number(v) >= 0 ? `+${v}` : `${v}`);
      telemetryEl.textContent = `MNI152 · X:${fmt(mniX)} Y:${fmt(mniY)} Z:${fmt(mniZ)} mm`;
    }

    if (prefersReducedMotion()) {
      drawFrame(0);
    }
  });

  canvas.addEventListener('pointerleave', () => {
    hasPointer = false;
    if (telemetryEl) {
      telemetryEl.textContent = 'MNI152 · X:+14.2 Y:-22.8 Z:+38.5 mm';
    }
    if (prefersReducedMotion()) {
      drawFrame(0);
    }
  });

  window.addEventListener('resize', () => {
    resize();
    drawFrame(performance.now());
  });

  document.addEventListener('visibilitychange', syncLoopState);

  if (motionMedia && typeof motionMedia.addEventListener === 'function') {
    motionMedia.addEventListener('change', syncLoopState);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
        }
        syncLoopState();
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
  }

  resize();
  syncLoopState();

  return () => {
    drawFrame(performance.now());
  };
}

/* ==========================================================================
   Event Wiring & Initialization
   ========================================================================== */
function initPortal() {
  renderWorkflowGoals();
  updateWorkflowBanner();
  renderFilterPills();
  renderAppsGrid();
  renderRadiogenomicsGrid();
  renderNepalGrid();
  renderExporterPreview();

  const redrawCanvas = initStereotacticCanvas();
  applyTheme(getInitialTheme(), redrawCanvas);

  // Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme, redrawCanvas);
    });
  }

  // Workflow Goal Click Delegation
  const workflowGrid = document.getElementById('workflow-grid');
  if (workflowGrid) {
    workflowGrid.addEventListener('click', (event) => {
      const card = event.target.closest('[data-workflow-id]');
      if (!card) return;
      const goalId = card.getAttribute('data-workflow-id');

      if (state.activeWorkflowGoalId === goalId) {
        state.activeWorkflowGoalId = null;
      } else {
        state.activeWorkflowGoalId = goalId;
        state.selectedCategory = 'all';
        state.selectedRuntime = 'all';
      }

      renderWorkflowGoals();
      updateWorkflowBanner();
      renderFilterPills();
      renderAppsGrid();

      if (state.activeWorkflowGoalId) {
        const suiteSection = document.getElementById('neuro-suite');
        if (suiteSection) {
          suiteSection.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  // Clear Workflow Recommendation Button
  const clearWorkflowBtn = document.getElementById('clear-workflow-btn');
  if (clearWorkflowBtn) {
    clearWorkflowBtn.addEventListener('click', () => {
      state.activeWorkflowGoalId = null;
      renderWorkflowGoals();
      updateWorkflowBanner();
      renderAppsGrid();
    });
  }

  // Search Input
  const searchInput = document.getElementById('app-search');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      state.searchQuery = event.target.value || '';
      renderAppsGrid();
    });
  }

  // Clear Search Button
  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      state.searchQuery = '';
      searchInput.value = '';
      renderAppsGrid();
      searchInput.focus();
    });
  }

  // Global Keyboard Shortcuts ('/' to focus search, 'Escape' to clear/close)
  const suiteDropdown = document.getElementById('suite-apps-dropdown');
  if (suiteDropdown) {
    document.addEventListener('click', (event) => {
      if (suiteDropdown.open && !suiteDropdown.contains(event.target)) {
        suiteDropdown.open = false;
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    const activeTag = document.activeElement?.tagName;
    const isEditable =
      activeTag === 'INPUT' ||
      activeTag === 'TEXTAREA' ||
      activeTag === 'SELECT' ||
      document.activeElement?.isContentEditable;

    if (
      event.key === '/' &&
      !isEditable &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      if (searchInput) {
        event.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
      return;
    }

    if (event.key === 'Escape') {
      if (suiteDropdown && suiteDropdown.open) {
        suiteDropdown.open = false;
        return;
      }
      if (searchInput && state.searchQuery !== '') {
        event.preventDefault();
        state.searchQuery = '';
        searchInput.value = '';
        renderAppsGrid();
      } else if (document.activeElement === searchInput) {
        searchInput.blur();
      }
    }
  });

  // Category Filter Pills
  const categoryGroup = document.getElementById('category-filter-group');
  if (categoryGroup) {
    categoryGroup.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-category-filter]');
      if (!btn) return;
      const catId = btn.getAttribute('data-category-filter') || 'all';
      state.selectedCategory =
        state.selectedCategory === catId && catId !== 'all' ? 'all' : catId;
      state.activeWorkflowGoalId = null;
      renderWorkflowGoals();
      updateWorkflowBanner();
      renderFilterPills();
      renderAppsGrid();
    });
  }

  // Runtime Filter Pills
  const runtimeGroup = document.getElementById('runtime-filter-group');
  if (runtimeGroup) {
    runtimeGroup.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-runtime-filter]');
      if (!btn) return;
      const rtId = btn.getAttribute('data-runtime-filter') || 'all';
      state.selectedRuntime =
        state.selectedRuntime === rtId && rtId !== 'all' ? 'all' : rtId;
      state.activeWorkflowGoalId = null;
      renderWorkflowGoals();
      updateWorkflowBanner();
      renderFilterPills();
      renderAppsGrid();
    });
  }

  // Reset All Filters Buttons
  const resetAllBtn = document.getElementById('reset-all-filters-btn');
  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', resetAllFilters);
  }
  const emptyResetBtn = document.getElementById('empty-reset-btn');
  if (emptyResetBtn) {
    emptyResetBtn.addEventListener('click', resetAllFilters);
  }

  // Exporter Format Tabs (Click + Left/Right Arrow Key Navigation)
  const exportTabsContainer = document.getElementById('export-tabs');
  if (exportTabsContainer) {
    exportTabsContainer.addEventListener('click', (event) => {
      const tab = event.target.closest('[data-export-format]');
      if (!tab) return;
      state.exportFormat = tab.getAttribute('data-export-format') || 'markdown';
      const statusEl = document.getElementById('copy-status');
      if (statusEl) statusEl.textContent = '';
      renderExporterPreview();
    });

    exportTabsContainer.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const tabs = Array.from(exportTabsContainer.querySelectorAll('[data-export-format]'));
      if (tabs.length === 0) return;
      const currentIndex = tabs.findIndex(
        (t) => t.getAttribute('data-export-format') === state.exportFormat
      );
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + delta + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      if (nextTab) {
        event.preventDefault();
        state.exportFormat = nextTab.getAttribute('data-export-format') || 'markdown';
        const statusEl = document.getElementById('copy-status');
        if (statusEl) statusEl.textContent = '';
        renderExporterPreview();
        nextTab.focus();
      }
    });
  }

  // 1-Click Copy Button
  const copyBtn = document.getElementById('copy-export-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const payload = getExportPayload(state.exportFormat);
      const ok = await copyTextToClipboard(payload.text);
      const statusEl = document.getElementById('copy-status');
      if (statusEl) {
        statusEl.textContent = ok
          ? '✓ Copied to clipboard'
          : 'Select code below and press Ctrl+C / Cmd+C';
      }
    });
  }

  // Download Directory Button
  const downloadBtn = document.getElementById('download-export-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const payload = getExportPayload(state.exportFormat);
      const blob = new Blob([payload.text], { type: payload.mime });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = payload.filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);

      const statusEl = document.getElementById('copy-status');
      if (statusEl) {
        statusEl.textContent = `✓ Downloaded ${payload.filename}`;
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortal);
} else {
  initPortal();
}
