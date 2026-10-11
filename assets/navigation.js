/* Native details menus work without JavaScript; enhance dismissal and resize behavior. */
if (!customElements.get('nova-navigation')) {
  customElements.define('nova-navigation', class extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const options = { signal: this.controller.signal };
      this.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        const focused = event.target.closest('details[open]');
        const opened = focused || this.querySelector('details[open]');
        if (!opened) return;
        event.preventDefault();
        this.close(opened);
        opened.querySelector(':scope > summary')?.focus();
      }, options);
      this.addEventListener('toggle', (event) => {
        const opened = event.target;
        if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
        const list = opened.closest('ul');
        if (!list) return;
        for (const sibling of list.querySelectorAll(':scope > li > details[open]')) {
          if (sibling !== opened) this.close(sibling);
        }
      }, { ...options, capture: true });
      document.addEventListener('click', (event) => {
        if (!this.contains(event.target)) this.closeAll();
      }, options);
      this.addEventListener('focusout', (event) => {
        if (event.relatedTarget && !this.contains(event.relatedTarget)) this.closeAll();
      }, options);
      this.breakpoint = window.matchMedia('(min-width: 990px)');
      this.breakpoint.addEventListener('change', () => {
        const active = document.activeElement;
        const hiddenNav = this.breakpoint.matches
          ? active?.closest('.nova-header__mobile')
          : active?.closest('.nova-header__desktop');
        if (hiddenNav) this.querySelector('.nova-header__brand')?.focus();
        this.closeAll();
      }, options);
    }
    close(details) {
      for (const nested of details.querySelectorAll('details[open]')) nested.open = false;
      details.open = false;
    }
    closeAll() {
      for (const details of this.querySelectorAll('details[open]')) details.open = false;
    }
    disconnectedCallback() {
      this.controller?.abort();
    }
  });
}
