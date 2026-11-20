#!/usr/bin/env python3
"""
Static & Accessibility Verification Gate for Central Open-Science & Clinical AI Observatory
Repository: https://prazg.github.io/ (Dr Prajwal Ghimire, @prazg)

Python 3.12 standard library only (zero external dependencies).
Checks:
  1. Required file manifest, LICENSE (MIT 2026), .nojekyll, .github/workflows/pages.yml
  2. HTML5 structural balance, landmarks, internal #hash targets & rel="noopener"
  3. Zero external CDN <script>/<link>/<img>/fonts/imports across HTML, CSS, and JS
  4. CSS syntax balance, theme blocks, .prazg-suite-bar, :focus-visible & reduced-motion rules
  5. JS delimiter/string/template balance & ES module export/import symbol contract
  6. Exact DOM ID contract between js/app.js getElementById(...) calls and index.html
  7. Exact URL accuracy across all 10 neuro/pathology apps, 5 GBM repos, 5 Nepal portals & profile links
  8. Mathematical WCAG 2.1 AA contrast verification (>= 4.5:1) across Dark & Light themes
"""

from __future__ import annotations

import math
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

VOID_HTML_ELEMENTS = frozenset(
    {
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
    }
)

VERIFIED_PROFILE_URLS = [
    "https://prazg.github.io/",
    "https://kclpure.kcl.ac.uk/portal/en/persons/prajwal-ghimire/",
    "https://kclpure.kcl.ac.uk/ws/portalfiles/portal/cv/b47f89d3-9947-4de3-957f-7c086e01768b?locale=en_GB",
    "https://linktr.ee/prazneuro",
    "https://github.com/prazg",
    "https://linkedin.com/in/neuroPraz",
    "https://twitter.com/prazNeuro",
    "https://youtube.com/Dr.Prajwal.Ghimire",
    "https://instagram.com/dr.praz.neuro",
]

VERIFIED_NEURO_APPS = [
    (
        "NeuroScope-RANO",
        "https://prazg.github.io/neuroscope-rano/",
        "https://github.com/prazg/neuroscope-rano",
    ),
    (
        "OpenNeuroAtlas",
        "https://prazg.github.io/openneuroatlas/",
        "https://github.com/prazg/openneuroatlas",
    ),
    (
        "CNS5-Audit",
        "https://prazg.github.io/cns5-audit/",
        "https://github.com/prazg/cns5-audit",
    ),
    (
        "NeuroCorridor-3D",
        "https://prazg.github.io/neurocorridor-3d/",
        "https://github.com/prazg/neurocorridor-3d",
    ),
    (
        "3D Neurosurgical Atlas",
        "https://prazg.github.io/3D_Neurosurgical_Atlas/",
        "https://github.com/prazg/3D_Neurosurgical_Atlas",
    ),
    (
        "Brain Trials Finder",
        "https://prazg.github.io/brain_trials_finder/",
        "https://github.com/prazg/brain_trials_finder",
    ),
    (
        "Brain Radiology FM Portal",
        "https://prazg.github.io/Brain_Radiology_FM_Portal/",
        "https://github.com/prazg/Brain_Radiology_FM_Portal",
    ),
    (
        "Histology FM Portal",
        "https://prazg.github.io/Histology_FM_Portal/",
        "https://github.com/prazg/Histology_FM_Portal",
    ),
    (
        "Animal Pathology FM Portal",
        "https://prazg.github.io/Animal_Pathology_FM_Portal/",
        "https://github.com/prazg/Animal_Pathology_FM_Portal",
    ),
    (
        "Remote DICOM Viewer",
        "https://prazg.github.io/Remote_Dicom_Viewer/",
        "https://github.com/prazg/Remote_Dicom_Viewer",
    ),
]

VERIFIED_RADIOGENOMICS_REPOS = [
    ("DECIPHER-GBM", "https://github.com/prazg/DECIPHER-GBM"),
    ("PRECISE_GBM", "https://github.com/prazg/PRECISE_GBM"),
    ("PRECISE-GAN", "https://github.com/prazg/PRECISE-GAN"),
    (
        "Deep-Features-Nifti-Network-DEN",
        "https://github.com/prazg/Deep-Features-Nifti-Network-DEN",
    ),
    ("NeuroOnc_PROMs", "https://github.com/prazg/NeuroOnc_PROMs"),
]

VERIFIED_NEPAL_PORTALS = [
    (
        "Nepal TRAYA",
        "https://prazg.github.io/Nepal_TRAYA/",
        "https://github.com/prazg/Nepal_TRAYA",
    ),
    (
        "Nepal Quake Watch",
        "https://prazg.github.io/Nepal_Quake_Watch/",
        "https://github.com/prazg/Nepal_Quake_Watch",
    ),
    (
        "Nepal Cryosphere Inventory",
        "https://prazg.github.io/Nepal_Cryosphere_Inventory/",
        "https://github.com/prazg/Nepal_Cryosphere_Inventory",
    ),
    (
        "Nepal Heritage Catalogue",
        "https://prazg.github.io/Nepal_Heritage_Catalogue/",
        "https://github.com/prazg/Nepal_Heritage_Catalogue",
    ),
    (
        "HMA GLOF Dashboard",
        "https://prazg.github.io/GLOF_dashboard/",
        "https://github.com/prazg/GLOF_dashboard",
    ),
]


class PortalHTMLInspector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tag_stack: list[tuple[str, int]] = []
        self.errors: list[str] = []
        self.ids: set[str] = set()
        self.classes: set[str] = set()
        self.anchors: list[dict[str, str]] = []
        self.scripts: list[dict[str, str]] = []
        self.links: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.labels_for: set[str] = set()
        self.html_attrs: dict[str, str] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {k: (v if v is not None else "") for k, v in attrs}
        line, _ = self.getpos()

        if tag == "html":
            self.html_attrs = attr_map

        el_id = attr_map.get("id", "").strip()
        if el_id:
            if el_id in self.ids:
                self.errors.append(f"Duplicate HTML id='{el_id}' at line {line}")
            self.ids.add(el_id)

        for cls in attr_map.get("class", "").split():
            self.classes.add(cls)

        if tag == "a":
            self.anchors.append(attr_map)
        elif tag == "script":
            self.scripts.append(attr_map)
        elif tag == "link":
            self.links.append(attr_map)
        elif tag in {"img", "iframe", "source", "video", "audio"}:
            self.images.append({"tag": tag, **attr_map})
        elif tag == "label" and "for" in attr_map:
            self.labels_for.add(attr_map["for"])

        if tag not in VOID_HTML_ELEMENTS:
            self.tag_stack.append((tag, line))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {k: (v if v is not None else "") for k, v in attrs}
        line, _ = self.getpos()
        el_id = attr_map.get("id", "").strip()
        if el_id:
            if el_id in self.ids:
                self.errors.append(f"Duplicate HTML id='{el_id}' at line {line}")
            self.ids.add(el_id)
        for cls in attr_map.get("class", "").split():
            self.classes.add(cls)
        if tag == "link":
            self.links.append(attr_map)
        elif tag in {"img", "iframe", "source"}:
            self.images.append({"tag": tag, **attr_map})

    def handle_endtag(self, tag: str) -> None:
        line, _ = self.getpos()
        if tag in VOID_HTML_ELEMENTS:
            return
        if not self.tag_stack:
            self.errors.append(f"Unexpected closing </{tag}> at line {line}")
            return
        open_tag, open_line = self.tag_stack.pop()
        if open_tag != tag:
            self.errors.append(
                f"Mismatched closing </{tag}> at line {line} for <{open_tag}> opened at line {open_line}"
            )


def srgb_to_linear(channel_255: int) -> float:
    c = channel_255 / 255.0
    return c / 12.92 if c <= 0.04045 else math.pow((c + 0.055) / 1.055, 2.4)


def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    cleaned = hex_color.strip().lstrip("#")
    if len(cleaned) == 3:
        cleaned = "".join(ch * 2 for ch in cleaned)
    if len(cleaned) != 6:
        raise ValueError(f"Unsupported hex color: {hex_color}")
    return int(cleaned[0:2], 16), int(cleaned[2:4], 16), int(cleaned[4:6], 16)


def relative_luminance(hex_color: str) -> float:
    r, g, b = hex_to_rgb(hex_color)
    return (
        0.2126 * srgb_to_linear(r)
        + 0.7152 * srgb_to_linear(g)
        + 0.0722 * srgb_to_linear(b)
    )


def contrast_ratio(fg_hex: str, bg_hex: str) -> float:
    l1 = relative_luminance(fg_hex)
    l2 = relative_luminance(bg_hex)
    bright, dark = (l1, l2) if l1 >= l2 else (l2, l1)
    return (bright + 0.05) / (dark + 0.05)


def extract_css_variables(css_text: str, selector_marker: str) -> dict[str, str]:
    idx = css_text.find(selector_marker)
    if idx < 0:
        return {}
    brace_open = css_text.find("{", idx)
    if brace_open < 0:
        return {}
    depth = 0
    block = []
    for ch in css_text[brace_open:]:
        if ch == "{":
            depth += 1
            if depth == 1:
                continue
        elif ch == "}":
            depth -= 1
            if depth == 0:
                break
        if depth >= 1:
            block.append(ch)
    body = "".join(block)
    return {
        m.group(1): m.group(2).strip()
        for m in re.finditer(r"(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);", body)
    }


def check_js_balanced_syntax(source: str, label: str) -> list[str]:
    """Scans JS module source to verify balanced brackets, strings, regexes & nested template literals."""
    errors: list[str] = []
    # Stack items: (opener, line, resumes_template)
    stack: list[tuple[str, int, bool]] = []
    pairs = {"(": ")", "[": "]", "{": "}"}
    closers = {")": "(", "]": "[", "}": "{"}

    mode = "CODE"  # "CODE" or "TEMPLATE"
    template_lines: list[int] = []
    prev_sig = "("

    i = 0
    n = len(source)
    line = 1

    while i < n:
        ch = source[i]
        nxt = source[i + 1] if i + 1 < n else ""

        if mode == "TEMPLATE":
            if ch == "\n":
                line += 1
                i += 1
                continue
            if ch == "\\":
                if nxt == "\n":
                    line += 1
                i += 2
                continue
            if ch == "`":
                template_lines.pop()
                mode = "CODE"
                prev_sig = "`"
                i += 1
                continue
            if ch == "$" and nxt == "{":
                stack.append(("{", line, True))
                mode = "CODE"
                prev_sig = "{"
                i += 2
                continue
            i += 1
            continue

        # mode == "CODE"
        if ch == "\n":
            line += 1
            i += 1
            continue

        if ch.isspace():
            i += 1
            continue

        # Line comment
        if ch == "/" and nxt == "/":
            while i < n and source[i] != "\n":
                i += 1
            continue

        # Block comment
        if ch == "/" and nxt == "*":
            i += 2
            while i + 1 < n and not (source[i] == "*" and source[i + 1] == "/"):
                if source[i] == "\n":
                    line += 1
                i += 1
            i += 2
            continue

        # Single or double quoted string
        if ch in {"'", '"'}:
            quote = ch
            start_line = line
            i += 1
            while i < n and source[i] != quote:
                if source[i] == "\\":
                    i += 2
                    continue
                if source[i] == "\n":
                    errors.append(f"{label}: Unterminated {quote} string at line {start_line}")
                    break
                i += 1
            prev_sig = quote
            i += 1
            continue

        # Template literal start
        if ch == "`":
            template_lines.append(line)
            mode = "TEMPLATE"
            i += 1
            continue

        # RegExp literal (when '/' follows an operator / delimiter)
        if ch == "/" and prev_sig in {"(", ",", "=", ":", "[", "!", "&", "|", "?", "{", "}", ";"}:
            start_line = line
            i += 1
            in_char_class = False
            while i < n:
                rc = source[i]
                if rc == "\\":
                    i += 2
                    continue
                if rc == "[":
                    in_char_class = True
                elif rc == "]":
                    in_char_class = False
                elif rc == "/" and not in_char_class:
                    i += 1
                    while i < n and source[i].isalpha():
                        i += 1
                    break
                elif rc == "\n":
                    errors.append(f"{label}: Unterminated regex literal at line {start_line}")
                    break
                i += 1
            prev_sig = "/"
            continue

        if ch in pairs:
            stack.append((ch, line, False))
            prev_sig = ch
        elif ch in closers:
            if not stack:
                errors.append(f"{label}: Unexpected '{ch}' at line {line}")
            else:
                open_ch, open_line, resumes_tpl = stack.pop()
                if open_ch != closers[ch]:
                    errors.append(
                        f"{label}: Mismatched '{ch}' at line {line} for '{open_ch}' opened at line {open_line}"
                    )
                elif resumes_tpl:
                    mode = "TEMPLATE"
                    i += 1
                    continue
            prev_sig = ch
        else:
            prev_sig = ch

        i += 1

    for tpl_line in template_lines:
        errors.append(f"{label}: Unterminated template literal opened at line {tpl_line}")

    for open_ch, open_line, _ in stack:
        errors.append(f"{label}: Unclosed '{open_ch}' opened at line {open_line}")

    return errors


def main() -> int:
    failures: list[str] = []
    checks_passed = 0

    def record(condition: bool, success_msg: str, fail_msg: str) -> None:
        nonlocal checks_passed
        if condition:
            checks_passed += 1
            print(f"  [PASS] {success_msg}")
        else:
            failures.append(fail_msg)
            print(f"  [FAIL] {fail_msg}")

    print("=" * 76)
    print("Central Open-Science & Clinical AI Observatory — Verification Gate")
    print("=" * 76)

    # 1. File Manifest Check
    print("\n1. Checking Repository File Manifest...")
    required_non_empty = [
        "index.html",
        "css/styles.css",
        "js/portalData.js",
        "js/app.js",
        "tests/verify_portal.py",
        ".github/workflows/pages.yml",
        ".gitignore",
        "LICENSE",
        "README.md",
    ]
    for rel in required_non_empty:
        p = ROOT / rel
        record(
            p.is_file() and p.stat().st_size > 0,
            f"Present & non-empty: {rel}",
            f"Missing or empty required file: {rel}",
        )
    nojekyll_path = ROOT / ".nojekyll"
    record(
        nojekyll_path.is_file(),
        "Present: .nojekyll",
        "Missing required .nojekyll file at repository root",
    )

    license_text = (ROOT / "LICENSE").read_text(encoding="utf-8")
    record(
        "MIT License" in license_text and "2026" in license_text and "Prajwal Ghimire" in license_text,
        "LICENSE contains MIT License 2026 attribution for Dr Prajwal Ghimire",
        "LICENSE is missing MIT License 2026 attribution",
    )

    workflow_yml = (ROOT / ".github/workflows/pages.yml").read_text(encoding="utf-8")
    record(
        "python tests/verify_portal.py" in workflow_yml
        and ".nojekyll" in workflow_yml
        and "upload-pages-artifact" in workflow_yml
        and "deploy-pages" in workflow_yml,
        "GitHub Pages workflow runs verify_portal.py, touches .nojekyll, and deploys artifact",
        "GitHub Pages workflow (.github/workflows/pages.yml) is incomplete",
    )

    # 2. HTML5 Parsing, Landmarks & Zero-External-CDN Check
    print("\n2. Checking HTML5 Structure, Accessibility Landmarks & Zero-CDN Policy...")
    html_text = (ROOT / "index.html").read_text(encoding="utf-8")
    inspector = PortalHTMLInspector()
    inspector.feed(html_text)
    inspector.close()

    record(
        len(inspector.errors) == 0 and len(inspector.tag_stack) == 0,
        "index.html has 100% balanced HTML5 tags and unique IDs",
        f"index.html tag/id errors: {inspector.errors} | unclosed: {inspector.tag_stack}",
    )
    record(
        inspector.html_attrs.get("lang") == "en"
        and inspector.html_attrs.get("data-theme") == "dark",
        '<html lang="en" data-theme="dark"> configured properly',
        "<html> element missing lang='en' or default data-theme='dark'",
    )
    record(
        "prazg-suite-bar" in inspector.classes and "skip-link" in inspector.classes,
        "Top .prazg-suite-bar ribbon and .skip-link present in index.html",
        "Missing .prazg-suite-bar or .skip-link in index.html",
    )
    record(
        "app-search" in inspector.labels_for and "app-search" in inspector.ids,
        "Accessible <label for='app-search'> bound to #app-search",
        "Search input #app-search is missing an explicit <label for='app-search'>",
    )

    # Zero external CDN check on <script>, <link>, <img>/<iframe>
    external_scripts = [
        s.get("src", "")
        for s in inspector.scripts
        if re.match(r"^(https?:)?//", s.get("src", "").strip(), re.I)
    ]
    external_links = [
        l.get("href", "")
        for l in inspector.links
        if re.match(r"^(https?:)?//", l.get("href", "").strip(), re.I)
    ]
    external_media = [
        m.get("src", "")
        for m in inspector.images
        if re.match(r"^(https?:)?//", m.get("src", "").strip(), re.I)
    ]
    record(
        not external_scripts and not external_links and not external_media,
        "Zero external CDN <script>, <link>, or <img>/<iframe> tags in index.html",
        f"External tags detected! scripts={external_scripts}, links={external_links}, media={external_media}",
    )

    # Verify module script loads js/app.js and all local asset paths exist on disk
    has_module_entry = any(
        s.get("type") == "module" and s.get("src") == "js/app.js" for s in inspector.scripts
    )
    record(
        has_module_entry,
        '<script type="module" src="js/app.js"> entry point verified',
        'Missing <script type="module" src="js/app.js"> in index.html',
    )

    missing_local_assets = []
    for asset_ref in [s.get("src", "") for s in inspector.scripts] + [
        l.get("href", "") for l in inspector.links
    ]:
        ref = asset_ref.strip()
        if ref and not ref.startswith("data:") and not re.match(r"^(https?:)?//", ref, re.I):
            if not (ROOT / ref).is_file():
                missing_local_assets.append(ref)
    record(
        not missing_local_assets,
        "All local <link> and <script> asset paths resolve on disk",
        f"Missing local asset files referenced by index.html: {missing_local_assets}",
    )

    # Internal #hash anchor verification + external rel="noopener"
    broken_hashes = []
    unsafe_blank_links = []
    for a in inspector.anchors:
        href = a.get("href", "")
        if href.startswith("#") and len(href) > 1:
            target_id = href[1:]
            if target_id not in inspector.ids:
                broken_hashes.append(href)
        if a.get("target") == "_blank":
            rel_tokens = set(a.get("rel", "").split())
            if "noopener" not in rel_tokens:
                unsafe_blank_links.append(href)

    record(
        not broken_hashes,
        "All internal #hash navigation links resolve to valid DOM IDs",
        f"Broken internal #hash links in index.html: {broken_hashes}",
    )
    record(
        not unsafe_blank_links,
        'All target="_blank" links include rel="noopener"',
        f'External links missing rel="noopener": {unsafe_blank_links}',
    )

    # 3. CSS Syntax, Zero External Imports & WCAG 2.1 AA Contrast Verification
    print("\n3. Checking CSS Syntax, Zero External Fonts/URLs & WCAG 2.1 AA Contrast...")
    css_text = (ROOT / "css/styles.css").read_text(encoding="utf-8")
    css_no_comments = re.sub(r"/\*.*?\*/", "", css_text, flags=re.S)

    record(
        css_no_comments.count("{") == css_no_comments.count("}")
        and css_no_comments.count("{") > 25,
        f"css/styles.css has balanced rule blocks ({css_no_comments.count('{')} blocks)",
        "Unbalanced curly braces in css/styles.css",
    )
    external_css_urls = re.findall(
        r"(?:@import\s+[^;]*https?:|url\(\s*['\"]?(?:https?:)?//)",
        css_no_comments,
        flags=re.I,
    )
    record(
        len(external_css_urls) == 0,
        "Zero external @import or url(http...) assets in css/styles.css",
        f"External CSS URLs found: {external_css_urls}",
    )
    record(
        ".prazg-suite-bar" in css_no_comments
        and ":focus-visible" in css_no_comments
        and "prefers-reduced-motion: reduce" in css_no_comments
        and '[data-theme="light"]' in css_no_comments,
        "CSS defines .prazg-suite-bar, :focus-visible, [data-theme='light'], and prefers-reduced-motion",
        "CSS missing required observatory / accessibility selectors",
    )

    # Mathematical WCAG 2.1 AA Contrast Checks (>= 4.5:1)
    dark_vars = extract_css_variables(css_no_comments, '[data-theme="dark"]')
    light_vars = extract_css_variables(css_no_comments, '[data-theme="light"]')

    record(
        dark_vars.get("--bg-primary", "").lower() == "#070d18"
        and dark_vars.get("--accent-cyan", "").lower() == "#38bdf8"
        and dark_vars.get("--accent-emerald", "").lower() == "#10b981"
        and dark_vars.get("--accent-amber", "").lower() == "#f59e0b",
        "Dark theme palette matches exact obsidian-navy (#070d18), cyan (#38bdf8), emerald (#10b981), amber (#f59e0b)",
        f"Dark theme core palette mismatch: {dark_vars}",
    )

    contrast_pairs = [
        ("Dark primary text on bg-primary", dark_vars["--text-primary"], dark_vars["--bg-primary"]),
        ("Dark secondary text on bg-elevated", dark_vars["--text-secondary"], dark_vars["--bg-elevated"]),
        ("Dark muted text on bg-elevated", dark_vars["--text-muted"], dark_vars["--bg-elevated"]),
        ("Dark cyan accent on bg-elevated", dark_vars["--accent-cyan"], dark_vars["--bg-elevated"]),
        ("Dark emerald text on bg-elevated", dark_vars["--accent-emerald-text"], dark_vars["--bg-elevated"]),
        ("Dark amber accent on bg-elevated", dark_vars["--accent-amber"], dark_vars["--bg-elevated"]),
        ("Dark rose accent on bg-elevated", dark_vars["--accent-rose"], dark_vars["--bg-elevated"]),
        ("Dark primary CTA button text/bg", dark_vars["--btn-primary-text"], dark_vars["--btn-primary-bg"]),
        ("Light primary text on bg-primary", light_vars["--text-primary"], light_vars["--bg-primary"]),
        ("Light secondary text on bg-elevated", light_vars["--text-secondary"], light_vars["--bg-elevated"]),
        ("Light muted text on bg-elevated", light_vars["--text-muted"], light_vars["--bg-elevated"]),
        ("Light cyan accent on bg-elevated", light_vars["--accent-cyan"], light_vars["--bg-elevated"]),
        ("Light cyan accent on soft tint", light_vars["--accent-cyan"], light_vars["--accent-cyan-soft"]),
        ("Light emerald accent on soft tint", light_vars["--accent-emerald"], light_vars["--accent-emerald-soft"]),
        ("Light amber accent on soft tint", light_vars["--accent-amber"], light_vars["--accent-amber-soft"]),
        ("Light rose accent on soft tint", light_vars["--accent-rose"], light_vars["--accent-rose-soft"]),
        ("Light primary CTA button text/bg", light_vars["--btn-primary-text"], light_vars["--btn-primary-bg"]),
    ]

    low_contrast = []
    min_ratio = 999.0
    for label, fg, bg in contrast_pairs:
        ratio = contrast_ratio(fg, bg)
        min_ratio = min(min_ratio, ratio)
        if ratio < 4.5:
            low_contrast.append(f"{label} ({fg} on {bg} = {ratio:.2f}:1 < 4.5:1)")

    record(
        not low_contrast,
        f"All {len(contrast_pairs)} Dark & Light theme color pairs pass WCAG 2.1 AA >= 4.5:1 (min = {min_ratio:.2f}:1)",
        f"WCAG 2.1 AA contrast violations: {low_contrast}",
    )

    # 4. JS Syntax, ES Module Contract & DOM ID Contract
    print("\n4. Checking JavaScript Syntax, ES Module Exports/Imports & DOM IDs...")
    portal_data_js = (ROOT / "js/portalData.js").read_text(encoding="utf-8")
    app_js = (ROOT / "js/app.js").read_text(encoding="utf-8")

    data_js_errors = check_js_balanced_syntax(portal_data_js, "js/portalData.js")
    app_js_errors = check_js_balanced_syntax(app_js, "js/app.js")
    record(
        not data_js_errors and not app_js_errors,
        "js/portalData.js and js/app.js pass balanced bracket, string & template-literal syntax checks",
        f"JS syntax errors: {data_js_errors + app_js_errors}",
    )

    exported_symbols = set(
        re.findall(r"export\s+(?:const|function|let|class)\s+([A-Za-z0-9_$]+)", portal_data_js)
    )
    import_match = re.search(
        r"import\s*\{([^}]+)\}\s*from\s*['\"]\./portalData\.js['\"]",
        app_js,
        flags=re.S,
    )
    imported_symbols = set()
    if import_match:
        for tok in import_match.group(1).split(","):
            clean_tok = tok.strip().split(" as ")[0].strip()
            if clean_tok:
                imported_symbols.add(clean_tok)

    missing_exports = imported_symbols - exported_symbols
    record(
        bool(imported_symbols) and not missing_exports,
        f"All {len(imported_symbols)} ES module imports in js/app.js match exports in js/portalData.js",
        f"ES module import/export mismatch! Missing exports: {missing_exports}",
    )

    referenced_dom_ids = set(re.findall(r"getElementById\(\s*['\"]([^'\"]+)['\"]\s*\)", app_js))
    missing_dom_ids = referenced_dom_ids - inspector.ids
    record(
        bool(referenced_dom_ids) and not missing_dom_ids,
        f"All {len(referenced_dom_ids)} getElementById(...) targets in js/app.js exist in index.html",
        f"DOM IDs referenced in js/app.js but missing from index.html: {sorted(missing_dom_ids)}",
    )

    record(
        "prefers-reduced-motion: reduce" in app_js
        and "event.key === '/'" in app_js
        and "event.key === 'Escape'" in app_js
        and "Non-SaMD" in html_text,
        "Interactive motion guard, '/' & 'Escape' shortcuts, and Non-SaMD notice verified",
        "Missing prefers-reduced-motion check, keyboard shortcuts, or Non-SaMD notice",
    )

    # 5. Exact URL & Ecosystem Data Accuracy Check
    print("\n5. Verifying Exact URLs Across 10 Neuro Apps, 5 GBM Repos, 5 Nepal Portals & Profile...")
    readme_text = (ROOT / "README.md").read_text(encoding="utf-8")

    missing_profile_urls = [
        u for u in VERIFIED_PROFILE_URLS if u not in portal_data_js or u not in html_text
    ]
    record(
        not missing_profile_urls
        and "prajwal.ghimire@crick.ac.uk" in portal_data_js
        and "prajwal.ghimire@crick.ac.uk" in html_text,
        f"All {len(VERIFIED_PROFILE_URLS)} verified academic/social URLs + Crick email present in portalData.js & index.html",
        f"Missing profile URLs or email: {missing_profile_urls}",
    )

    missing_neuro = []
    for name, live_url, repo_url in VERIFIED_NEURO_APPS:
        for target_name, content in [
            ("portalData.js", portal_data_js),
            ("index.html", html_text),
            ("README.md", readme_text),
        ]:
            if name not in content or live_url not in content or repo_url not in content:
                missing_neuro.append(f"{name} in {target_name}")
    record(
        not missing_neuro,
        "All 10 Neuro, Neuroimaging & Pathology AI Web Apps (Live + Repo URLs) verified across data, HTML & README",
        f"Missing/mismatched Neuro/Pathology app entries: {missing_neuro}",
    )

    missing_gbm = []
    for name, repo_url in VERIFIED_RADIOGENOMICS_REPOS:
        for target_name, content in [
            ("portalData.js", portal_data_js),
            ("index.html", html_text),
            ("README.md", readme_text),
        ]:
            if name not in content or repo_url not in content:
                missing_gbm.append(f"{name} in {target_name}")
    record(
        not missing_gbm,
        "All 5 Radiogenomics & Glioblastoma repositories verified across data, HTML & README",
        f"Missing/mismatched Radiogenomics repo entries: {missing_gbm}",
    )

    missing_nepal = []
    for name, live_url, repo_url in VERIFIED_NEPAL_PORTALS:
        for target_name, content in [
            ("portalData.js", portal_data_js),
            ("index.html", html_text),
            ("README.md", readme_text),
        ]:
            if name not in content or live_url not in content or repo_url not in content:
                missing_nepal.append(f"{name} in {target_name}")
    record(
        not missing_nepal,
        "All 5 Independent Nepal Open-Science & Multi-Hazard portals (Live + Repo URLs) verified across data, HTML & README",
        f"Missing/mismatched Nepal portal entries: {missing_nepal}",
    )

    workflow_goal_ids = re.findall(r"id:\s*'goal-[^']+'", portal_data_js)
    record(
        len(workflow_goal_ids) == 6,
        "All 6 interactive clinical & research workflow selector goals verified in portalData.js",
        f"Expected 6 workflow goals, found {len(workflow_goal_ids)}",
    )

    print("\n" + "=" * 76)
    if failures:
        print(f"VERIFICATION FAILED: {len(failures)} check(s) failed, {checks_passed} passed.")
        for idx, msg in enumerate(failures, 1):
            print(f"  {idx}. {msg}")
        return 1

    print(f"VERIFICATION PASSED: 100% ({checks_passed}/{checks_passed} checks succeeded).")
    print("=" * 76)
    return 0


if __name__ == "__main__":
    sys.exit(main())
