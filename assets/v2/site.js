(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme toggle (persisted per visitor; page works without storage)
  var btn = document.getElementById('theme-toggle');
  function current() {
    return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function paintIcon() {
    var icon = btn && btn.querySelector('i');
    if (icon) icon.className = 'ph ' + (current() === 'dark' ? 'ph-sun' : 'ph-moon');
  }
  if (btn) {
    paintIcon();
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      paintIcon();
    });
  }

  // Reveal on scroll with a short stagger inside each section
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  document.querySelectorAll('section').forEach(function (sec) {
    sec.querySelectorAll('.reveal').forEach(function (el, i) {
      el.style.setProperty('--d', Math.min(i, 6) * 70 + 'ms');
    });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();

// Testimonials carousel buttons
(function () {
  var track = document.getElementById('quotes-track');
  if (!track) return;
  document.querySelectorAll('.carousel__nav [data-dir]').forEach(function (b) {
    b.addEventListener('click', function () {
      var card = track.querySelector('.quote');
      var step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth;
      track.scrollBy({ left: step * Number(b.dataset.dir), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
})();
