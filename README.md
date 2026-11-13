# Vidya Tilak College of Management Foundation — Website

Static website for regular, online, distance, UG, PG, PhD and research admission guidance.

## Contact routing
- Admissions: admission@vidyatilakcollege.org
- Enquiries: enquiry@vidyatilakcollege.org
- Other services / institutional collaboration: service@vidyatilakcollege.org

## v6 updates
- Fixed mobile navigation JavaScript syntax and interaction.
- Improved mobile spacing and floating Call / Enquire actions so they do not cover content.
- Added Blogs to the Resources navigation and footer.
- Added Admission Checklist and Scholarships & Finance guidance pages.
- Added five detailed SEO-focused blogs.
- Refreshed page titles, meta descriptions, keywords, canonical URLs and social metadata.
- Added UGC-DEB verification guidance and DEB-ID references.
- Logo files used by university cards should remain under `/logos/`.

## November 2026 content and SEO update
- Added 15 new, search-intent-focused education and career guides in the Jekyll `_guides` collection.
- Added per-article topic tags and keywords to the shared guide metadata and BlogPosting structured data.
- Updated the public blog index and XML sitemap for all 15 new guide URLs.
- Reused the shared Google Tag Manager include (`GTM-MBR6DWLJ`) already present in page heads and the guide layout.


## AI workshop tracking and participant benefits
- The Class 12 AI workshop page includes an Event structured-data block, canonical URL, search/social metadata, and a URL listed in `sitemap.xml`.
- The site-wide Google Tag Manager container is loaded from the shared `_includes/google-tag.html` include (`GTM-MBR6DWLJ`). Individual pages and the shared guide layout reference this include; do not paste additional duplicate GTM snippets into individual pages.
- The workshop page queues `workshop_page_view`, `workshop_registration_click`, and `workshop_google_form_open` events in the GTM data layer. To see these in GA4, confirm that a Google tag using the correct GA4 Measurement ID is configured and published in the GTM container, and configure GA4 event tags/triggers as required.
- Google Search Console HTML verification file remains at the repository root. After deployment, inspect the workshop URL in Search Console and request indexing; sitemap discovery alone does not guarantee indexing.
- Workshop attendees receive a Certificate of Appreciation and can request higher-education college/university search and career-path guidance. Guidance is advisory and does not guarantee admission or placement.
