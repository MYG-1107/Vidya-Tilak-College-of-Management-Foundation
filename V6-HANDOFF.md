# Vidya Tilak Website v6 Handoff

## Main fixes
- Mobile hamburger JavaScript parse error fixed (`/\/+$` regex correction).
- Mobile navigation closes after selection and remains scrollable on small screens.
- Call / Enquire floating actions are resized and the page reserves bottom space so they do not cover content.
- Admission forms route to `admission@vidyatilakcollege.org`.
- Contact/enquiry forms route to `enquiry@vidyatilakcollege.org`.
- Institutional collaboration / other service forms route to `service@vidyatilakcollege.org`.
- Blogs added to the header Resources menu and footer.
- Five new detailed SEO blog URLs added.
- Admission Checklist and Scholarships & Finance pages added.
- Sitemap expanded.
- Page titles, descriptions, canonical tags, Open Graph/Twitter metadata and structured data are maintained/expanded.

## IMPORTANT — university logos
Your GitHub repository currently contains your updated logo files under:

- `logos/dypatel.jpg`
- `logos/mangalayatan.png`
- `logos/mtsou.jpg`

Keep those files when copying this package into your repository. The package intentionally does not overwrite those current repository logo assets.

## New blog URLs
- `/blogs/online-vs-distance-education-india/`
- `/blogs/how-to-choose-online-degree-course-india/`
- `/blogs/online-mba-admission-guide-india/`
- `/blogs/bca-mca-career-path-guide/`
- `/blogs/phd-admission-process-india-guide/`

## Email behaviour
The static site uses `mailto:`. Submitting a form opens the visitor's email client with the correct recipient and enquiry details. A server-side form service would be required for silent/background sending without an email client.
