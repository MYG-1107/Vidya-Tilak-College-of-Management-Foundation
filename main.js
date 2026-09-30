document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
  }

  document.querySelectorAll('.nav-drop > button').forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const parent = btn.closest('.nav-drop');
      const wasOpen = parent.classList.contains('open');
      document.querySelectorAll('.nav-drop.open').forEach(el => {
        el.classList.remove('open');
        const b = el.querySelector(':scope > button');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-drop.open').forEach(el => {
      el.classList.remove('open');
      const b = el.querySelector(':scope > button');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  const path = window.location.pathname.replace(/\\/+$/, '');
  const current = path.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.getAttribute('data-nav') === current) a.classList.add('active');
  });
  if (path.includes('/blogs/')) {
    const blog = document.querySelector('a[href="/blog.html"]');
    if (blog) blog.classList.add('active');
  }

  document.querySelectorAll('[data-year]').forEach(x => x.textContent = new Date().getFullYear());

  function wireForm(id, statusId) {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [];
      for (const [key, value] of data.entries()) lines.push(`${key}: ${value}`);
      const subject = form.dataset.subject || 'Admission enquiry — Vidya Tilak College of Management Foundation';
      const status = document.getElementById(statusId);
      if (status) status.textContent = 'Opening your email client with the enquiry details…';
      window.location.href = `mailto:vidyatilakcollege@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\\n'))}`;
    });
  }
  wireForm('lead-form', 'lead-status');
  wireForm('contact-form', 'contact-status');
  wireForm('partner-form', 'partner-status');
});
