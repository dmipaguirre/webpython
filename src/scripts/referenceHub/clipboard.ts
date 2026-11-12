const timers = new WeakMap<Element, ReturnType<typeof setTimeout>>();

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }
}

export function flash(element: Element, label: Element, message: string, restore: string) {
  element.classList.add('is-copied');
  label.textContent = message;

  const previous = timers.get(element);
  if (previous) clearTimeout(previous);

  timers.set(
    element,
    setTimeout(() => {
      element.classList.remove('is-copied');
      label.textContent = restore;
    }, 1600)
  );
}
