# Vidya Tilak College of Management Foundation — Refined Website

This package is a refined static-site redesign for `vidyatilakcollege.org`.

## Pages included

- `index.html` — conversion-focused home page
- `about.html` — foundation story, vision, mission and principles
- `programs.html` — initiative catalogue
- `program-detail.html` — reusable initiative detail template
- `research.html` — research and publication support
- `conferences.html` — conference and forum model
- `partnerships.html` — institutional collaboration
- `events.html` — events and master classes
- `leadership.html` — leadership and statutory profile
- `governance.html` — governance and compliance
- `contact.html` — enquiry page
- `includes/header.html` / `includes/footer.html` — shared layout
- `js/main.js` — shared interactions and dynamic program details
- `assets/styles.css` — local responsive design system

## Important validation note

The content intentionally avoids copying the reference site's brand-specific claims, testimonials, pricing, degrees, accreditations or marketing language. The reference site was used as an information-architecture and conversion-pattern reference: clear programs, story/about, connect/contact, event/industry-style sections and strong calls to action.

Before production, verify every regulatory identifier, leadership title, address, email, phone number, accreditation and publication claim against current official documents.

## GitHub Pages

The site is plain HTML/CSS/JavaScript and can be deployed directly from the repository root using GitHub Pages. The shared header/footer use `fetch()`, so test through a local web server or GitHub Pages rather than opening the HTML files directly with `file://`.

Example local preview:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Suggested next production steps

1. Replace the VT text mark with the official logo.
2. Add verified institutional photographs and event photographs under `assets/images/`.
3. Add real event records, speaker profiles and verified partner institutions.
4. Add downloadable statutory documents only after verification.
5. Connect the contact form to a proper backend/form service if server-side lead capture is required.
6. Add analytics, Search Console, sitemap.xml and robots.txt before launch.
