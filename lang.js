// Shows one language at a time: ?lang=vi or ?lang=en wins, then the saved choice, then the browser.
(function () {
  var langs = ['en', 'vi'];
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (langs.indexOf(q) >= 0) return q;
    try { var s = localStorage.getItem('lang'); if (langs.indexOf(s) >= 0) return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('vi') === 0 ? 'vi' : 'en';
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === lang));
    });
    var t = document.querySelector('[data-lang="' + lang + '"] h1');
    if (t) document.title = t.textContent + ' · ColorSumi';
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', function () {
    apply(pick());
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-set')); });
    });
  });
})();
