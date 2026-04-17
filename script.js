(function() {

  // ── Hamburger menu ──────────────────────────────
  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function() {
      var open = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Sticky header ───────────────────────────────
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── Fade-up on scroll ───────────────────────────
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function(el) { io.observe(el); });
  } else {
    // Fallback for old browsers
    fadeEls.forEach(function(el) { el.classList.add('visible'); });
  }

  // ── Highlight today in hours table ──────────────
  var dayOrder = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  var todayName = dayOrder[new Date().getDay()];
  var dayIndex = { monday:0, tuesday:1, wednesday:2, thursday:3, friday:4, saturday:5, sunday:6 };
  var rows = document.querySelectorAll('.hours-table tr');
  if (rows[dayIndex[todayName]]) {
    rows[dayIndex[todayName]].classList.add('today');
  }

})();
