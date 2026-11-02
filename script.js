// ---------- Theme toggle ----------
// The initial theme is set by the small script in <head> (saved choice, else system setting).
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function updateToggleLabel() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

updateToggleLabel();

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
  updateToggleLabel();
});

// ---------- Highlight the nav link for the section on screen ----------
const navLinks = document.querySelectorAll('.nav-links a');
const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.remove('active'));
      const link = linkFor(entry.target.id);
      if (link) {
        link.classList.add('active');
        // Keep the active link visible in the scrollable mobile nav
        const bar = link.closest('nav');
        if (bar && bar.scrollWidth > bar.clientWidth) {
          bar.scrollLeft = link.offsetLeft - bar.clientWidth / 2 + link.offsetWidth / 2;
        }
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

document.querySelectorAll('section[id]').forEach((s) => navObserver.observe(s));
