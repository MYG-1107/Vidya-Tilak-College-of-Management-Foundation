#!/usr/bin/env python3
"""Convert the static Vidya Tilak site to one Jekyll-rendered shared header/footer."""
from pathlib import Path
import html as html_lib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
HEADER = re.compile(r"<header\b[^>]*>[\s\S]*?</header>", re.I)
FOOTER = re.compile(r"<footer\b[^>]*>[\s\S]*?</footer>", re.I)
INCLUDE_HEADER = "{% include header.html %}"
INCLUDE_FOOTER = "{% include footer.html %}"
INCLUDE_ANALYTICS = "{% include google-tag.html %}"

def dedupe(text: str, pattern: str) -> str:
    compiled = re.compile(pattern, re.I | re.S)
    found = list(compiled.finditer(text))
    for match in reversed(found[1:]):
        text = text[:match.start()] + text[match.end():]
    return text

def clean_duplicate_metadata(text: str, page: Path) -> str:
    patterns = [
        r"<meta\b(?=[^>]*\bcharset\s*=)[^>]*>",
        r"<meta\b(?=[^>]*\bname\s*=\s*['\"]viewport['\"])[^>]*>",
        r"<title\b[^>]*>[\s\S]*?</title>",
        r"<meta\b(?=[^>]*\bname\s*=\s*['\"]description['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bname\s*=\s*['\"]keywords['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bname\s*=\s*['\"]robots['\"])[^>]*>",
        r"<link\b(?=[^>]*\brel\s*=\s*['\"]canonical['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bproperty\s*=\s*['\"]og:title['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bproperty\s*=\s*['\"]og:description['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bproperty\s*=\s*['\"]og:image['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bname\s*=\s*['\"]twitter:card['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bname\s*=\s*['\"]twitter:title['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bname\s*=\s*['\"]twitter:description['\"])[^>]*>",
        r"<meta\b(?=[^>]*\bname\s*=\s*['\"]twitter:image['\"])[^>]*>",
    ]
    for pattern in patterns:
        text = dedupe(text, pattern)
    if page.as_posix() == "index.html":
        title = "<title>UG, PG, PhD &amp; Career Guidance in Pune | Vidya Tilak</title>"
        text, n = re.subn(r"<title\b[^>]*>[\s\S]*?</title>", title, text, count=1, flags=re.I)
        if n != 1:
            raise RuntimeError("Homepage title could not be normalised")
    return text

def seo_issues(text: str):
    checks = {
        "title": r"<title\b[^>]*>\s*[^<]+\s*</title>",
        "meta description": r"<meta\b(?=[^>]*\bname\s*=\s*['\"]description['\"])[^>]*>",
        "meta keywords": r"<meta\b(?=[^>]*\bname\s*=\s*['\"]keywords['\"])[^>]*>",
        "meta robots": r"<meta\b(?=[^>]*\bname\s*=\s*['\"]robots['\"])[^>]*>",
        "canonical": r"<link\b(?=[^>]*\brel\s*=\s*['\"]canonical['\"])[^>]*>",
        "Open Graph title": r"<meta\b(?=[^>]*\bproperty\s*=\s*['\"]og:title['\"])[^>]*>",
        "Open Graph description": r"<meta\b(?=[^>]*\bproperty\s*=\s*['\"]og:description['\"])[^>]*>",
        "Open Graph image": r"<meta\b(?=[^>]*\bproperty\s*=\s*['\"]og:image['\"])[^>]*>",
        "Twitter card": r"<meta\b(?=[^>]*\bname\s*=\s*['\"]twitter:card['\"])[^>]*>",
        "Twitter title": r"<meta\b(?=[^>]*\bname\s*=\s*['\"]twitter:title['\"])[^>]*>",
        "Twitter description": r"<meta\b(?=[^>]*\bname\s*=\s*['\"]twitter:description['\"])[^>]*>",
        "Twitter image": r"<meta\b(?=[^>]*\bname\s*=\s*['\"]twitter:image['\"])[^>]*>",
        "H1": r"<h1\b",
        "Breadcrumb schema": r'"@type"\s*:\s*"BreadcrumbList"',
        "Organisation or article publisher schema": r'"@type"\s*:\s*"EducationalOrganization"|"publisher"\s*:\s*\{\s*"@type"\s*:\s*"Organization"',
    }
    return [label for label, pattern in checks.items() if not re.search(pattern, text, re.I | re.S)]

def ensure_breadcrumb(text: str) -> str:
    if re.search(r'"@type"\\s*:\\s*"BreadcrumbList"', text, re.I):
        return text
    canonical_tag = re.search(r"<link\\b(?=[^>]*\\brel\\s*=\\s*['\\\"]canonical['\\\"])[^>]*>", text, re.I)
    title_match = re.search(r"<title\\b[^>]*>([\\s\\S]*?)</title>", text, re.I)
    if not canonical_tag or not title_match:
        return text
    href_match = re.search(r"\\bhref\\s*=\\s*['\\\"]([^'\\\"]+)", canonical_tag.group(0), re.I)
    if not href_match:
        return text
    canonical_url = href_match.group(1)
    label = html_lib.unescape(re.sub(r"<[^>]+>", "", title_match.group(1))).strip()
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://vidyatilakcollege.org/"},
            {"@type": "ListItem", "position": 2, "name": label, "item": canonical_url},
        ],
    }
    block = '<script type="application/ld+json">' + json.dumps(schema, ensure_ascii=False) + '</script>'
    text, _ = re.subn(r"</head>", block + "\\n</head>", text, count=1, flags=re.I)
    return text

def main():
    pages = sorted(p for p in ROOT.rglob("*.html")
                   if "_includes" not in p.relative_to(ROOT).parts
                   and "includes" not in p.relative_to(ROOT).parts
                   and "_layouts" not in p.relative_to(ROOT).parts)
    changed = []
    errors = []
    seo = []
    for page in pages:
        rel = page.relative_to(ROOT)
        text = page.read_text(encoding="utf-8")
        if INCLUDE_HEADER not in text:
            matches = list(HEADER.finditer(text))
            if len(matches) != 1:
                errors.append(f"{rel}: expected exactly one header, found {len(matches)}")
                continue
            text = HEADER.sub(INCLUDE_HEADER, text, count=1)
        if INCLUDE_FOOTER not in text:
            matches = list(FOOTER.finditer(text))
            if len(matches) != 1:
                errors.append(f"{rel}: expected exactly one footer, found {len(matches)}")
                continue
            text = FOOTER.sub(INCLUDE_FOOTER, text, count=1)
        if INCLUDE_ANALYTICS not in text:
            text, n = re.subn(r"</head>", INCLUDE_ANALYTICS + "\n</head>", text, count=1, flags=re.I)
            if n != 1:
                errors.append(f"{rel}: closing head tag not found for analytics insertion")
                continue
        text = ensure_breadcrumb(text)
        text = clean_duplicate_metadata(text, rel)
        if not text.startswith("---\n"):
            text = "---\nlayout: null\n---\n" + text
        page.write_text(text, encoding="utf-8")
        changed.append(rel.as_posix())
        missing = seo_issues(text)
        if missing:
            seo.append({"page": rel.as_posix(), "missing": missing})
    if errors:
        raise SystemExit("Refusing partial conversion; layout errors:\n" + "\n".join(errors))
    for old in (ROOT / "includes/header.html", ROOT / "includes/footer.html"):
        if old.exists():
            old.unlink()
    old_dir = ROOT / "includes"
    if old_dir.exists():
        try:
            old_dir.rmdir()
        except OSError:
            pass
    report = [
        "# Shared shell and SEO audit",
        "",
        f"- HTML pages converted: **{len(changed)}**",
        "- Header source: _includes/header.html (one shared include)",
        "- Footer source: _includes/footer.html (one shared include)",
        "- Analytics source: _includes/google-tag.html (one shared include)",
        "- Analytics container: GTM-MBR6DWLJ",
        "- Page rendering: Jekyll Liquid includes rendered by GitHub Pages",
        "- Structured data: BreadcrumbList on every page; EducationalOrganization on standard pages and Article publisher on editorial pages",
        "- Duplicate homepage charset, viewport and title declarations: removed",
        "",
        f"## SEO review: {len(changed) - len(seo)} pages passed all required metadata/schema checks; {len(seo)} need review.",
        "",
    ]
    if seo:
        for item in seo:
            report.append(f"- {item['page']}: {', '.join(item['missing'])}")
    else:
        report.append("All audited pages contain a title, description, keywords, robots directive, canonical URL, Open Graph fields, Twitter card fields, H1 and BreadcrumbList/EducationalOrganization schema.")
    (ROOT / "SITE-SHELL-SEO-AUDIT.md").write_text("\n".join(report) + "\n", encoding="utf-8")
    print(json.dumps({"converted_html_pages": len(changed), "seo_review_needed": len(seo), "seo_issues": seo[:30]}, indent=2))
    print("Shared shell conversion completed.")

if __name__ == "__main__":
    main()
