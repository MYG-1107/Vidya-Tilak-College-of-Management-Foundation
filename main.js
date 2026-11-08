(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menu-toggle');
    var mobilePanel = document.getElementById('mobile-panel');

    if (menuToggle && mobilePanel) {
      menuToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        var isOpen = mobilePanel.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        menuToggle.textContent = isOpen ? '×' : '☰';
      });
      mobilePanel.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobilePanel.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open navigation');
          menuToggle.textContent = '☰';
        });
      });
    }

    document.querySelectorAll('.nav-drop > button').forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.stopPropagation();
        var dropdown = button.parentElement;
        var wasOpen = dropdown.classList.contains('open');
        document.querySelectorAll('.nav-drop.open').forEach(function (item) {
          item.classList.remove('open');
          var trigger = item.querySelector(':scope > button');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          dropdown.classList.add('open');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.nav-drop.open').forEach(function (item) {
        item.classList.remove('open');
        var trigger = item.querySelector(':scope > button');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    });

    var currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    var currentPage = currentPath.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav]').forEach(function (link) {
      if (link.getAttribute('data-nav') === currentPage) link.classList.add('active');
    });
    if (currentPath.indexOf('/blogs/') === 0) {
      document.querySelectorAll('a[href="/blog.html"]').forEach(function (link) {
        link.classList.add('active');
      });
    }

    document.querySelectorAll('[data-year]').forEach(function (element) {
      element.textContent = String(new Date().getFullYear());
    });

    var query = new URLSearchParams(window.location.search);
    document.querySelectorAll('form input[name="page_url"]').forEach(function (input) {
      input.value = window.location.href;
    });
    document.querySelectorAll('form input[name="submitted_at"]').forEach(function (input) {
      input.value = new Date().toISOString();
    });
    document.querySelectorAll('form input[name="enquiry_source"]').forEach(function (input) {
      input.value = query.get('utm_source') || query.get('source') || document.referrer || 'Website';
    });

    var whatsappNumber = '919423573129';
    var formConfig = {
      'lead-form': { subject: 'Admission guidance enquiry', email: 'admission@vidyatilakcollege.org' },
      'contact-form': { subject: 'General enquiry', email: 'enquiry@vidyatilakcollege.org' },
      'partner-form': { subject: 'Institution / employer enquiry', email: 'service@vidyatilakcollege.org' }
    };

    function pushAnalyticsEvent(formId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'whatsapp_enquiry_open', enquiry_form: formId });
    }

    function getFormMessage(form, config) {
      var excluded = new Set(['consent', 'website', 'page_url', 'submitted_at']);
      var lines = ['Hello Vidya Tilak team,', '', 'I would like to make an enquiry: ' + config.subject, ''];
      new FormData(form).forEach(function (value, key) {
        if (excluded.has(key) || typeof value !== 'string') return;
        var cleanValue = value.trim();
        if (cleanValue) lines.push(key.replace(/[_-]/g, ' ') + ': ' + cleanValue);
      });
      lines.push('', 'Please guide me on the next steps.');
      return lines.join('\n');
    }

    Object.keys(formConfig).forEach(function (formId) {
      var form = document.getElementById(formId);
      if (!form) return;
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var status = document.getElementById(formId.replace('-form', '-status'));
        var config = formConfig[formId];
        var honeypot = form.querySelector('input[name="website"]');

        if (honeypot && honeypot.value.trim()) {
          if (status) status.textContent = 'Your enquiry could not be processed. Please contact us directly.';
          return;
        }
        if (!form.reportValidity()) return;

        var message = getFormMessage(form, config);
        var whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
        if (status) {
          status.textContent = 'Opening WhatsApp with your enquiry. Review the message and tap Send in WhatsApp; nothing is sent automatically.';
        }
        pushAnalyticsEvent(formId);

        var newWindow = window.open(whatsappUrl, '_blank');
        if (newWindow) newWindow.opener = null;
        else window.location.assign(whatsappUrl);
      });

      var emailFallback = form.querySelector('[data-email-fallback]');
      if (emailFallback) {
        emailFallback.href = 'mailto:' + config.email + '?subject=' + encodeURIComponent(config.subject);
      }
    });

    var searchInput = document.getElementById('program-search');
    var filterSelect = document.getElementById('program-filter');
    var cards = document.querySelectorAll('.catalog-card[data-search]');

    function filterPrograms() {
      var searchTerm = (searchInput ? searchInput.value : '').toLowerCase().trim();
      var selectedType = filterSelect ? filterSelect.value : 'all';
      cards.forEach(function (card) {
        var searchableText = (card.dataset.search || '').toLowerCase();
        var matchesText = !searchTerm || searchableText.indexOf(searchTerm) !== -1;
        var matchesType = selectedType === 'all' || card.dataset.type === selectedType;
        card.hidden = !(matchesText && matchesType);
      });
    }

    if (searchInput) searchInput.addEventListener('input', filterPrograms);
    if (filterSelect) filterSelect.addEventListener('change', filterPrograms);
  });
}());
