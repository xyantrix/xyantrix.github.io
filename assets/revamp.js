/* REVAMP: project visuals, stacking experience cards, live clock */
(function () {
  'use strict'; var d = document, $$ = function (s) { return Array.prototype.slice.call(d.querySelectorAll(s)); };
  try {
    var P = ['M0 180 C60 170 90 120 150 130 S250 60 320 70 S380 30 400 20', 'M0 190 L50 150 L100 160 L150 100 L210 120 L270 60 L330 80 L400 30', 'M0 150 C80 190 120 110 200 130 S320 170 400 80', 'M0 160 L80 160 L80 110 L170 110 L170 140 L260 140 L260 70 L400 70'];
    $$('.bc').forEach(function (c, i) {
      var v = d.createElement('div'); v.className = 'vis'; v.style.setProperty('--h', [225, 265, 175, 300][i % 4]);
      v.innerHTML = '<svg viewBox="0 0 400 230" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + P[i % 4] + '"/></svg><em>0' + (i + 1) + '</em>'; c.insertBefore(v, c.firstChild);
    });
  } catch (e) {}
  try {
    var jobs = $$('.xp .job'); jobs.forEach(function (j, i) { j.style.setProperty('--n', i); });
    function stack() { jobs.forEach(function (j, i) {
      var nx = jobs[i + 1]; if (!nx) return; var r = j.getBoundingClientRect(), n = nx.getBoundingClientRect(),
        p = Math.max(0, Math.min(1, 1 - (n.top - r.top - 40) / Math.max(r.height, 1)));
      j.style.transform = 'scale(' + (1 - .05 * p) + ')'; j.style.filter = 'brightness(' + (1 - .4 * p) + ')'; }); }
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) { addEventListener('scroll', stack, { passive: true }); stack(); }
  } catch (e) {}
  try {
    var c = d.getElementById('clock'); if (c) (function t() {
      c.textContent = new Intl.DateTimeFormat('en-IN', { timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date()).toUpperCase() + ' IST · LOCAL TIME'; setTimeout(t, 30000); })();
  } catch (e) {}
})();
