# Vidya Tilak College of Management Foundation — Refined Website v2

## What changed
- Rebuilt the static site so the header and footer are part of every page (no runtime `fetch()` dependency).
- Added a responsive navigation model inspired by the supplied Univista EdTech screenshots: About, Engage, Programs, Institutional Connect, Featured and Contact.
- Added dedicated pages for engagement process, eligibility, documentation, application/enquiry, industry/employers, students/researchers, founder, leadership/governance, programs, program detail, conferences, events, research and contact.
- Preserved documented organisational information supplied for Vidya Tilak College of Management Foundation.
- Added responsive mobile navigation, sticky enquiry/conference actions, forms, tables, timelines and reusable cards.
- No Univista branding, logo, fees, testimonials or degree claims are copied.

## Header/footer fix
The previous site loaded `includes/header.html` and `includes/footer.html` using JavaScript `fetch()`. This can fail on static hosting in some deployment/browser conditions and leaves the page without navigation/footer. This version renders the shared header/footer directly into each HTML document, making GitHub Pages/custom-domain rendering independent of that fetch.

## Source-backed organisational details used
- Incorporated 28 November 2022; limited by guarantee.
- CIN: U80900PN2022NPL216442
- PAN: AAJCV1024D
- TAN: PNEV21653C
- NGO Darpan ID: MH/2022/0332187
- Registered address: PL NO RH C2, FL NO 02, MIDC G Block, Chinchwad East S.O, Bhosari, Pune, Maharashtra, India 411019
- Contact email/phone: vidyatilakcollege@gmail.com / +91 95455 53130
- Leadership names/roles are based on the supplied NGO Darpan record.
- Conference portfolio content is based on the supplied updated GRCF profile.

## Local test
python -m http.server 8000

Then open http://localhost:8000/
