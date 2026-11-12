export function filterCards(cards: HTMLElement[], activeTier: string, query: string) {
  let visible = 0;

  cards.forEach((card) => {
    const tierMatches = activeTier === 'all' || card.dataset.tier === activeTier;
    const searchMatches = !query || (card.dataset.search ?? '').includes(query);
    const show = tierMatches && searchMatches;
    card.hidden = !show;
    if (show) visible += 1;
  });

  return visible;
}

export function writeStatus(scope: ParentNode, visible: number, total: number, query: string) {
  scope.querySelectorAll<HTMLElement>('[data-results]').forEach((label) => {
    label.textContent = `${visible} / ${total} contenidos`;
  });

  const empty = scope.querySelector<HTMLElement>('[data-empty]');
  const emptyQuery = scope.querySelector<HTMLElement>('[data-empty-query]');
  if (empty) {
    empty.hidden = visible !== 0;
    if (emptyQuery) emptyQuery.textContent = query || 'filtros actuales';
  }
}
