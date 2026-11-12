  import Prism from 'prismjs';
  import 'prismjs/components/prism-python';
  import 'prismjs/themes/prism-tomorrow.css';
  import { copyText, flash } from './referenceHub/clipboard';
  import { filterCards, writeStatus } from './referenceHub/filters';

  const searchInput = document.getElementById('hub-search') as HTMLInputElement | null;
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-category-panel]'));
  const categoryButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-category-btn]'));
  const navGroupToggles = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-nav-group-toggle]'));
  const navGroupPanels = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-group-panel]'));
  const tocGroups = Array.from(document.querySelectorAll<HTMLElement>('[data-toc-group]'));
  const tierButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-tier-filter]'));
  const resultsView = document.querySelector<HTMLElement>('[data-results-view]');
  const resultsTimeline = document.querySelector<HTMLElement>('[data-results-timeline]');

  let activeCategory = 'listas';
  let activeTier = 'all';
  let query = '';
  let isSearching = false;

  const activePanel = () => panels.find((panel) => panel.dataset.categoryPanel === activeCategory);

  function syncNavGroups() {
    const activeGroup = activeCategory === 'for' ? 'bucles' : 'estructuras';
    navGroupToggles.forEach((button) => {
      const isOpen = button.dataset.navGroupToggle === activeGroup || button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(isOpen));
      button.classList.toggle('is-open', isOpen);
    });
    navGroupPanels.forEach((panel) => {
      const group = panel.dataset.navGroupPanel;
      const toggle = navGroupToggles.find((button) => button.dataset.navGroupToggle === group);
      panel.hidden = toggle?.getAttribute('aria-expanded') !== 'true';
    });
  }

  function syncTierButtons() {
    tierButtons.forEach((button) => {
      const isActive = button.dataset.tierFilter === activeTier;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function syncPanels() {
    panels.forEach((panel) => {
      panel.hidden = isSearching || panel.dataset.categoryPanel !== activeCategory;
    });
    if (resultsView) resultsView.hidden = !isSearching;
    document.querySelector<HTMLElement>('.hub')?.classList.toggle('is-searching', isSearching);
  }

  function syncToc() {
    tocGroups.forEach((group) => {
      let visible = 0;
      group.querySelectorAll<HTMLElement>('li').forEach((item) => {
        const link = item.querySelector<HTMLElement>('[data-toc-link]');
        const card = link ? document.getElementById(link.dataset.tocLink ?? '') : null;
        item.hidden = card ? card.hidden : false;
        if (!item.hidden) visible += 1;
      });
      group.hidden = isSearching ? visible === 0 : group.dataset.tocGroup !== activeCategory;
    });
  }

  function renderResults() {
    if (!resultsTimeline) return;
    resultsTimeline.replaceChildren();

    panels.forEach((panel) => {
      const key = panel.dataset.categoryPanel ?? '';
      const source = document.querySelector<HTMLTemplateElement>(`template[data-cards="${key}"]`);
      if (!source) return;

      const cards = Array.from(source.content.querySelectorAll('[data-method-card]'), (card) =>
        card.cloneNode(true)
      );
      const title = document.createElement('h2');
      title.className = 'category__title results__title';
      title.textContent = panel.querySelector('.category__title')?.textContent ?? '';

      const timeline = document.createElement('div');
      timeline.className = 'timeline';
      timeline.append(...cards);

      const group = document.createElement('section');
      group.className = 'results__group';
      group.append(title, timeline);
      resultsTimeline.append(group);
    });

    Prism.highlightAllUnder(resultsTimeline);
  }

  function enterSearch() {
    isSearching = true;
    panels.forEach((panel) => stashTimeline(panel));
    renderResults();
  }

  function leaveSearch() {
    isSearching = false;
    resultsTimeline?.replaceChildren();
    const panel = activePanel();
    if (panel) hydrateTimeline(panel, activeCategory);
  }

  function applyFilters() {
    const searching = query !== '';
    if (searching && !isSearching) enterSearch();
    if (!searching && isSearching) leaveSearch();
    syncPanels();

    if (isSearching) {
      const cards = Array.from(resultsTimeline?.querySelectorAll<HTMLElement>('[data-method-card]') ?? []);
      const visible = filterCards(cards, activeTier, query);

      resultsTimeline?.querySelectorAll<HTMLElement>('.results__group').forEach((group) => {
        group.hidden = !group.querySelector('[data-method-card]:not([hidden])');
      });

      if (resultsView) {
        const queryLabel = resultsView.querySelector<HTMLElement>('[data-query-label]');
        if (queryLabel) queryLabel.textContent = query;
        writeStatus(resultsView, visible, cards.length, query);
      }
    } else {
      const panel = activePanel();
      if (panel) {
        const cards = Array.from(panel.querySelectorAll<HTMLElement>('[data-method-card]'));
        writeStatus(panel, filterCards(cards, activeTier, query), cards.length, query);
      }
    }

    syncToc();
  }

  function stashTimeline(panel: HTMLElement) {
    const timeline = panel.querySelector<HTMLElement>('[data-timeline]');
    if (!timeline || timeline.childElementCount === 0) return;

    const key = panel.dataset.categoryPanel ?? '';
    let source = document.querySelector<HTMLTemplateElement>(`template[data-cards="${key}"]`);

    if (!source) {
      source = document.createElement('template');
      source.dataset.cards = key;
      panel.appendChild(source);
    }

    source.content.append(...Array.from(timeline.childNodes));
  }

  function hydrateTimeline(panel: HTMLElement, key: string) {
    const timeline = panel.querySelector<HTMLElement>('[data-timeline]');
    if (!timeline || timeline.childElementCount > 0) return;

    const source = document.querySelector<HTMLTemplateElement>(`template[data-cards="${key}"]`);
    if (!source || source.content.childElementCount === 0) return;

    timeline.appendChild(source.content);
    Prism.highlightAllUnder(timeline);
  }

  function setCategory(key: string) {
    activeCategory = key;
    activeTier = 'all';
    query = '';
    if (searchInput) searchInput.value = '';

    const panel = activePanel();

    panels.forEach((item) => {
      const isActive = item.dataset.categoryPanel === key;
      item.hidden = !isActive;
      if (!isActive) stashTimeline(item);
    });

    if (panel) hydrateTimeline(panel, key);

    categoryButtons.forEach((button) => {
      const isActive = button.dataset.categoryBtn === key;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    syncNavGroups();
    syncTierButtons();
    applyFilters();
    window.scrollTo({ top: 0 });
  }

  navGroupToggles.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      button.classList.toggle('is-open', !isOpen);
      const panel = document.getElementById(button.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = isOpen;
    });
  });

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => setCategory(button.dataset.categoryBtn ?? 'listas'));
  });

  tierButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeTier = button.dataset.tierFilter ?? 'all';
      syncTierButtons();
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', () => {
    query = searchInput.value.toLowerCase().trim();
    applyFilters();
  });

  document.addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const copyButton = target.closest<HTMLElement>('[data-copy]');
    if (copyButton) {
      const code = copyButton.closest('.codebox')?.querySelector('code');
      const label = copyButton.querySelector('.copy-btn__label');
      if (code && label) {
        await copyText(code.textContent ?? '');
        flash(copyButton, label, '¡Copiado!', 'Copiar');
      }
      return;
    }

    const anchor = target.closest<HTMLAnchorElement>('[data-copy-link]');
    if (anchor) {
      event.preventDefault();
      const hash = anchor.getAttribute('href') ?? '';
      await copyText(`${window.location.origin}${window.location.pathname}${hash}`);
      const toast = anchor.querySelector('.anchor__toast');
      if (toast) flash(anchor, toast, '¡Copiado!', '¡Copiado!');
      window.history.replaceState(null, '', hash);
    }
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const typing =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLElement && target.isContentEditable);

    if (event.key === '/' && !typing && searchInput) {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }

    if (event.key === 'Escape' && searchInput && document.activeElement === searchInput && searchInput.value) {
      searchInput.value = '';
      query = '';
      applyFilters();
    }
  });

  applyFilters();
  syncNavGroups();
  Prism.highlightAll();

  const initialHash = window.location.hash.slice(1);
  if (initialHash) {
    const dashIndex = initialHash.indexOf('-');
    const hashCategory = initialHash.startsWith('bucles-') ? 'for' : dashIndex > 0 ? initialHash.slice(0, dashIndex) : '';
    const isKnownCategory = panels.some(
      (panel) => panel.dataset.categoryPanel === hashCategory
    );
    if (isKnownCategory && hashCategory !== activeCategory) setCategory(hashCategory);
    if (isKnownCategory) {
      requestAnimationFrame(() => {
        document.getElementById(initialHash)?.scrollIntoView({ block: 'start' });
      });
    }
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    searchInput?.focus({ preventScroll: true });
  }
