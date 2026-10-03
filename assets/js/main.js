(function () {
  'use strict';
  document.body.classList.add('js');

  /* data-link 按钮：统一从 SITE_LINKS 取网盘地址 */
  try {
    var links = window.SITE_LINKS || {};
    var url = links.download;
    if (url) {
      var nodes = document.querySelectorAll('[data-link]');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var key = el.getAttribute('data-link');
        if (links[key]) {
          el.setAttribute('href', links[key]);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');
        }
      }
    }
  } catch (e) { /* 静默：不影响页面其余交互 */ }

  /* 移动端导航展开 */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* 返回顶部：下滚后出现 */
  var topBtn = document.querySelector('.fab-top');
  if (topBtn) {
    var onScroll = function () {
      if (window.scrollY > 420) { topBtn.classList.add('show'); }
      else { topBtn.classList.remove('show'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 渐显 */
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var reveals = document.querySelectorAll('.reveal');
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
