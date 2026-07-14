/* =============================================================
   Summer BBQ 2026 LP — Scroll fade-in
   ============================================================= */
document.addEventListener('DOMContentLoaded', function () {
  // Add .lp-fadein to animatable sections
  var sections = document.querySelectorAll(
    '.lp-concept, .lp-place, .lp-gallery, .lp-cta'
  );
  sections.forEach(function (el) {
    el.classList.add('lp-fadein');
  });

  // IntersectionObserver
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    sections.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
});
