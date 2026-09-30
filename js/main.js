document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-panel');

  if (toggle && panel) {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.textContent = open ? '×' : '☰';
    });

    panel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        toggle.textContent = '☰';
      });
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

  // Correct slash normalization; the previous expression caused a mobile JS parse error.
  const path = window.location.pathname.replace(/\/+$/, '');
  const current = path.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.getAttribute('data-nav') === current) a.classList.add('active');
  });
  if (path.includes('/blogs/')) {
    document.querySelectorAll('a[href="/blog.html"]').forEach(blog => blog.classList.add('active'));
  }

  document.querySelectorAll('[data-year]').forEach(x => {
    x.textContent = new Date().getFullYear();
  });

  const formEmails = {
    'lead-form': 'admission@vidyatilakcollege.org',
    'contact-form': 'enquiry@vidyatilakcollege.org',
    'partner-form': 'service@vidyatilakcollege.org'
  };

  function wireForm(id, statusId) {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [];
      for (const [key, value] of data.entries()) lines.push(`${key}: ${value}`);
      const subject = form.dataset.subject || 'Education enquiry — Vidya Tilak College of Management Foundation';
      const recipient = form.dataset.email || formEmails[id] || 'enquiry@vidyatilakcollege.org';
      const status = document.getElementById(statusId);
      if (status) status.textContent = `Opening your email client to ${recipient}…`;
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    });
  }

  wireForm('lead-form', 'lead-status');
  wireForm('contact-form', 'contact-status');
  wireForm('partner-form', 'partner-status');
});
