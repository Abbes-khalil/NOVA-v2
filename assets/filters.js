(() => {
  const init = (root = document) => {
    for (const range of root.querySelectorAll('[data-price-range]')) {
      if (range.dataset.ready) continue;
      range.dataset.ready = 'true';
      const min = range.querySelector('[data-price-min]');
      const max = range.querySelector('[data-price-max]');
      const minSlider = range.querySelector('[data-slider-min]');
      const maxSlider = range.querySelector('[data-slider-max]');
      range.querySelector('.nova-price-sliders').hidden = false;
      const sync = () => {
        minSlider.value = min.value || '0';
        maxSlider.value = max.value || max.max;
        min.setCustomValidity(max.value && Number(min.value) > Number(max.value) ? window.Nova.strings.priceError : '');
      };
      min.addEventListener('input', sync);
      max.addEventListener('input', sync);
      minSlider.addEventListener('input', () => { min.value = Math.min(Number(minSlider.value), Number(maxSlider.value)); sync(); });
      maxSlider.addEventListener('input', () => { max.value = Math.max(Number(maxSlider.value), Number(minSlider.value)); sync(); });
    }
  };
  init();
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
