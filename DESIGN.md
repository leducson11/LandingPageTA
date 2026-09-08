---
name: HUYWAY English
description: Học để dùng. Học để đi xa. — English to go far.
colors:
  scholar-indigo: "#2C3481"
  scholar-indigo-deep: "#242A6B"
  scholar-indigo-mid: "#4E579F"
  scholar-indigo-soft: "#737CBF"
  indigo-wash: "#F1F2FC"
  indigo-tint: "#E1E4F5"
  wayfinder-orange: "#F68C1F"
  wayfinder-orange-deep: "#D86F0C"
  orange-wash: "#FFF4E8"
  ink: "#000000"
  ink-body: "#717174"
  ink-muted: "#8A8A8D"
  surface: "#FFFFFF"
  surface-slate: "#F1F5F9"
  hairline: "#E2E8F0"
  admin-control-blue: "#2563EB"
typography:
  display:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 3vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "64px"
  gutter: "80px"
components:
  button-primary:
    backgroundColor: "{colors.wayfinder-orange}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "{colors.wayfinder-orange-deep}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "{colors.scholar-indigo}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.scholar-indigo}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 14px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-highlight:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.xl}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.indigo-wash}"
    textColor: "{colors.scholar-indigo}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
    typography: "{typography.label}"
---

# Design System: HUYWAY English

## Overview

**Creative North Star: "The Open Door"**

The HUYWAY logo is an open book that is also a doorway — two upright panels, one indigo, one orange, that read at once as pages, as the strokes of an "H", and as a threshold you can walk through. The orange panel carries two white strokes that double as the letterform "E" (for "English"), so the mark reads "H...E" — the two languages of the brand's promise — without spelling anything out literally. The whole system is built on that image: disciplined and academic on the structure side, warm and forward-leaning on the invitation side. Everything a learner sees should say "this is a serious place" and "you can start here" at the same time.

The visual language is deliberately restrained — minimalist, modern, youthful, academic (the four words the brand book uses). White space carries the page. Type is a single family in two weights. Colour is used sparingly and with intent: deep indigo for authority and calm, a single warm orange reserved for the one thing you should do next. Cards are quiet rectangles with hairline edges and soft, low shadows; nothing shouts, nothing sparkles. Motion is gentle and one-directional (things rise and settle, they do not bounce or spin).

Two surfaces share this world. The **landing page** (persuade) is spacious, image-light, and organised as a single vertical argument that always leads back to one action: check your level. The **admin dashboard** (operate) is denser and more utilitarian, but inherits the same indigo, the same Montserrat, the same hairline-card grammar; its job is legibility, not expression.

**Key Characteristics:**
- One typeface (Montserrat), two weights (400 / 600), no exceptions.
- Two brand colours only — `#2C3481` indigo and `#F68C1F` orange — plus a neutral ink/paper scale.
- Orange is an action colour, never decoration.
- Hairline-bordered cards on white; soft low shadows, never hard or coloured drop shadows.
- Generous vertical rhythm; content column capped at 1200px on desktop.
- Calm, upward, single-direction motion.

## Colors

A two-colour brand on a warm-neutral paper: indigo does the talking, orange points the way, and everything else is ink and white.

### Primary
- **Scholar's Indigo** (`#2C3481` — RGB 44/52/129, CMYK 100/96/15/4): the brand's core colour. Headlines and body emphasis, primary navigation, the secondary/solid button, footer and top-bar fields, icon chips, chart series, the "popular plan" outline, and full-bleed CTA bands. This is the default "brand" colour any time a surface needs to feel owned by HUYWAY. The brand book publishes a tint ladder at 100 / 80 / 60 / 40 / 20% — use those tints (not arbitrary opacities) when a lighter indigo is needed.
- **Wayfinder Orange** (`#F68C1F` — RGB 246/140/31, CMYK 0/55/100/0): the action colour. The primary "Kiểm tra trình độ miễn phí" button, the second half of the wordmark ("WAY" / "English"), and the rare inline emphasis that marks the next step. Same 100 / 80 / 60 / 40 / 20% tint ladder. See **The Wayfinder Rule**.

### Secondary
- **Indigo Deep** (`#242A6B`): hover/pressed state for indigo surfaces and the dark end of indigo gradients.
- **Indigo Mid / Soft** (`#4E579F` / `#737CBF`): supporting indigo steps for gradients, secondary icons, and de-emphasised chart series. Not for text on white below ~18px (contrast).
- **Orange Deep** (`#D86F0C`): hover/pressed state for the primary button and orange text on light washes.

### Neutral
- **Ink** (`#000000`): all headings (`h1`–`h6`). Set at weight 600 with `-0.01em` tracking.
- **Ink Body** (`#717174`): default body and paragraph text on white.
- **Ink Muted** (`#8A8A8D`): captions, helper text, placeholder text, timestamps.
- **Surface** (`#FFFFFF`): the dominant background. The page is white by default.
- **Surface Slate** (`#F1F5F9`): the only alternate section background — the stat bar and the hero's upper wash. Used to separate a band without introducing colour.
- **Indigo Wash / Tint** (`#F1F2FC` / `#E1E4F5`): the fill behind indigo chips, info callouts, and icon tiles. A breath of brand, not a block of it.
- **Orange Wash** (`#FFF4E8`): the rare tinted surface behind an orange element; use even more sparingly than the indigo wash.
- **Hairline** (`#E2E8F0`): every card edge, divider, and input stroke. Delivered as a 1px `outline` in the current build (see Shapes).

### Admin-only
- **Admin Control Blue** (`#2563EB`): the dashboard's current `--color-primary` for interactive controls, active nav, KPI icons, and focus rings. **This is not a brand colour** — it is a hold-over from the imported admin template. New admin work should move toward Scholar's Indigo; see Do's and Don'ts.

### Named Rules
**The Two-Colour Rule.** The brand has exactly two colours: indigo `#2C3481` and orange `#F68C1F`. Greens, ambers, purples, teals and off-brand blues that appear in the current Tailwind config and legacy CSS are not part of the system — treat them as status utilities (success / warning / error) only, never as brand or decoration.

**The Wayfinder Rule.** Orange marks the single most important action in a viewport and almost nothing else. If two things on one screen are orange, one of them is wrong. Its scarcity is what makes it work.

## Typography

**Display / Body / Label Font:** Montserrat (fallback: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`)

**Character:** One geometric humanist sans, carrying the entire system. Montserrat's round, even letterforms keep the brand young and approachable; the tight `-0.01em` heading tracking and consistent weight-600 give headlines a compact, confident, "textbook cover" feel. There is no serif, no display face, no mono.

**Weights:** Only **400 (Regular)** and **600 (SemiBold)** exist. Both stylesheets load exactly these two weights. Heavier Tailwind utilities (`font-bold`, `font-extrabold`) that appear in component markup are inert — the base layer pins headings to 600 — so do not rely on an 800; if you need more emphasis, use colour or size, not weight.

### Hierarchy
- **Display** (600, `clamp(1.875rem, 4vw, 2.25rem)` ≈ 30–36px, line-height ~1.1, `-0.01em`): one per page — the hero H1 ("Chưa biết nên bắt đầu IELTS từ đâu?").
- **Headline** (600, `clamp(1.25rem, 3vw, 1.875rem)` ≈ 20–30px, `-0.01em`): section titles ("Lộ trình phù hợp mọi trình độ").
- **Title** (600, 1.25rem / 20px): card headings, form headings, CTA-band copy.
- **Body** (400, 1rem / 16px, line-height 1.5): paragraphs, list items, form labels. Colour Ink Body `#717174`.
- **Label** (600, 0.75–0.875rem / 12–14px): chips, badges, nav links, helper lines, table headers. Admin KPI titles are `UPPERCASE` with slight positive tracking; landing labels are sentence case.

### Named Rules
**The One-Family Rule.** Every character on every surface is Montserrat 400 or 600. Introducing a second family — including a "friendlier" display face for marketing or a mono for the dashboard — breaks the brand.

## Layout

**Landing page** is a single scrolling column. Desktop content sits in a centred track capped at **1200px** (`max-w-[1200px]`, and in several older sections a hard `w-[1200px]`); section gutters are **80px** left/right (`px-20`) and vertical padding is **64px** (`py-16`), tightening to **16px / 24px** on mobile. Cards and stats lay out as equal-width flex rows on desktop and stack (or become a horizontal scroll strip) on mobile. Fixed chrome stacks from the top: a utility TopBar (44px mobile / 56px desktop, orange on desktop), then a white sticky Header (80px desktop). `scroll-padding-top` is 4.5rem / 5.5rem so in-page anchors clear the fixed header.

**Breakpoint model** is a hard single break at `md` (768px). Many sections ship **two separate markup trees** — `hidden md:block` for desktop and `md:hidden` for mobile — rather than one fluid layout. Treat the two as the same design at two sizes; when you edit one, edit the other.

**Admin dashboard** is a fixed left sidebar (240px, collapses to 76px; off-canvas under `lg`) plus a fluid content area capped at **1600px**, on the `#F5F7FA` app background. Content is a 12-column-feel grid expressed through Tailwind `grid` utilities: KPI row of 4, then a 2/3 + 1/3 chart split, then a 1/2 + 1/2 row, collapsing to single column under `xl`. Internal card padding is **20px** (`p-5`).

**Spacing rhythm:** multiples of 4, with 8 / 12 / 16 / 24 doing most of the work and 24px (`gap-6`) as the default gap between sibling cards.

## Elevation & Depth

Low and soft. The system is almost flat: depth comes from a **1px hairline outline** first, and a shadow only where something is genuinely lifted (a floating form card, a hover state, the floating "back to top" button). Shadows are large-radius, low-opacity, and near-neutral — a diffuse lift, never a hard edge. Full-bleed indigo CTA bands and the dark footer provide depth by colour block, not shadow.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 1px 3px rgba(17,24,39,0.03), 0 1px 2px rgba(17,24,39,0.04)`): admin cards at rest; most landing cards use no shadow at all, only the hairline.
- **Card float** (`box-shadow: 0 12px 24px -8px rgba(15,23,42,0.08)`): the hero lead-form card and other elements that sit above the page.
- **Card hover** (`box-shadow: 0 4px 12px -2px rgba(17,24,39,0.08), 0 2px 4px -2px rgba(17,24,39,0.04)`): admin card hover; landing cards lift `-translate-y-1` with a slightly stronger version of the float shadow.
- **Primary button glow** (`box-shadow: 0 8px 16px rgba(246,140,31,0.25)`): the one place a coloured shadow is allowed — under the orange primary button, echoing the action colour.

### Named Rules
**The Hairline-First Rule.** Separation is a 1px `#E2E8F0` line. Reach for a shadow only when an element is meant to read as physically above the page; if it just needs to be distinct from its neighbour, the hairline is the answer.

**The No-Violet-Shadow Rule.** Legacy CSS carries purple drop shadows (`rgba(109,41,218,…)`, a left-over "LadiPage violet"). Do not propagate them. Shadows are neutral grey; the only tinted shadow is the orange button glow.

## Shapes

Soft rectangles, one consistent corner family. Radii climb with the size of the object:

- **8px** (`sm`) — buttons, small controls.
- **12px** (`md`) — inputs, admin cards, small tiles.
- **16px** (`lg`) — standard content cards.
- **20px** (`xl`) — feature cards, plan cards, the hero form, CTA panels.
- **Pill** (`9999px`) — chips, badges, icon rings, the circular floating button.

Borders are always **1px** and always the hairline colour. Note an implementation quirk: the landing build draws card edges with `outline outline-1 outline-offset-[-1px]` rather than `border`; keep that pattern when matching existing sections, but a normal `border` is acceptable for new work. Icons sit inside rounded tiles — a `rounded-2xl` / `rounded-3xl` square filled with indigo (`#2C3481`) or an indigo wash. No hard 90° corners anywhere in content; no fully circular cards.

## Components

### Buttons
- **Shape:** 8px radius (`rounded-sm`/`rounded-lg` in markup), never pill, never square.
- **Primary (action):** solid Wayfinder Orange `#F68C1F`, white text, weight 600, ~`14px 24px` padding, with the orange glow shadow. Exactly one per viewport (**The Wayfinder Rule**). Label is a verb phrase ("Kiểm tra trình độ miễn phí").
- **Secondary (brand):** solid Scholar's Indigo `#2C3481`, white text, ~`10px 20px` padding, no glow. Used for lower-stakes navigation actions ("Đăng ký tư vấn" in the header).
- **Outline / ghost:** white fill, indigo text, 1–2px indigo border at reduced opacity; border darkens to full indigo on hover.
- **Hover / Focus:** primary → deepen to `#D86F0C` and/or lift shadow; indigo → `#242A6B` or `opacity: 0.85`; transitions ~200–250ms ease. Focus-visible is a 2px indigo (`#2563EB` in admin) outline at 2px offset.
- **Disabled:** `opacity: 0.7`, `cursor: not-allowed`.

### Chips / Pills
- **Style:** indigo-wash `#F1F2FC` fill, indigo `#2C3481` text, weight 600, pill radius; or white fill with a faint 1px border for section eyebrows ("Kết quả thực tế").
- **State:** mostly static labels. The "Phổ biến nhất" plan badge inverts — solid indigo fill, white text — and pairs with a 2px indigo card outline.

### Cards / Containers
- **Corner:** 16–20px.
- **Background:** white; the highlighted variant stays white but gains a 2px `#2C3481` outline (and optionally a soft indigo-tinted shadow).
- **Shadow:** none at rest for landing cards (hairline only); admin cards take *Card rest*. Hover lifts `-translate-y-1` with *Card hover*.
- **Border:** 1px hairline `#E2E8F0`.
- **Padding:** 20px (admin) to 32px (hero form); 24px is the common case.

### Inputs / Fields
- **Style:** white fill, 1px hairline stroke, 12px radius, fixed **48px** height, `0 14px` padding, a leading lucide icon in Ink Muted, then the field. Phone fields prepend a bold `+84`.
- **Placeholder:** Ink Muted `#8A8A8D`, same size as the value.
- **Focus:** 2px indigo outline, 2px offset (global `:focus-visible`). No glow, no colour-fill shift.
- **Error:** currently `alert()`-based, not inline — a real inline treatment (hairline → `#EF4444`, helper text below) is open work.

### Navigation
- **Landing header:** fixed, white, 80px tall on desktop, 1px hairline bottom, gains a soft shadow after 20px of scroll. Links are Montserrat 600, ~16px; the active/first link is indigo `#2C3481`, the rest Ink Body `#717174`. Mobile collapses to a disclosure menu. Logo lockup at left (see below).
- **Admin sidebar:** 240px white panel, 1px hairline right edge; nav rows are 13px weight-500, 8px radius; the active row gets an indigo-wash fill with indigo text and icon; collapse control at the bottom reduces it to a 76px icon rail.

### Logo Lockup (signature)
The logo is a fixed-proportion lockup of the book/door symbol above the "HUYWAY ENGLISH" wordmark ("HUY" indigo, "WAY" orange; "ENGLISH" letter-spaced indigo beneath). Its geometry is **locked** by the brand book and must not be re-drawn:

- **Clear space:** a minimum margin of `x` on all four sides, where `x` is the lockup's base module (≈ the wordmark unit). Nothing — text, image edge, other logos — enters that zone.
- **Internal proportions (do not alter):** symbol height `2.64x`; gap between the two symbol halves `0.67x`; gap between symbol and wordmark `0.64x`; "HUYWAY" wordmark height `0.8x`.
- **On backgrounds:** on light backgrounds use the full-colour logo; on dark or busy backgrounds use the 100%-white logo. A single-colour (grayscale) variant exists for print/one-colour reproduction, but it visibly loses definition when printed small or at low resolution — reserve it for contexts that genuinely can't carry colour, not as a casual dark-mode substitute. On complex photography, darken or blur the area behind it first; the brand book's only approved solid grounds are white, Scholar's Indigo `#2C3481`, and Wayfinder Orange `#F68C1F`.
- **Avoid on image backgrounds:** busy, high-detail imagery behind the logo; any composition where the logo overlaps or collides with other layout elements; an image whose dominant tone matches the logo's own colour (kills contrast); printing the grayscale variant small enough that it reads as a faded smear.
- **Avoid on colour backgrounds:** any background hue that doesn't clear a real contrast step against the brand colours, or that shares the same hue family as the logo itself.
- **The 8 misuse cases the brand book names explicitly** — none of these are ever acceptable, on any surface: (1) recolouring the logo outside its defined colourways, (2) rearranging its layout/composition, (3) distorting its proportions (stretching, squashing), (4) adding effects that interfere with how it displays (drop shadows, glows, blurs on the mark itself), (5) altering its general form/silhouette, (6) swapping its typeface, (7) adding a colour gradient to it, (8) using an outline/stroke-only version of it.
- In the current React build the header/footer render a simplified text lockup (`HuyWay` + `English`), not the SVG symbol. When the real asset is available, replace those with the official lockup and honour the clear-space rule.

## Do's and Don'ts

### Do:
- **Do** use exactly two brand colours: Scholar's Indigo `#2C3481` and Wayfinder Orange `#F68C1F`. Pull lighter values from the official 100 / 80 / 60 / 40 / 20% tint ladder.
- **Do** set every piece of text in Montserrat at weight 400 or 600. Headings: weight 600, colour `#000000`, `-0.01em` tracking.
- **Do** reserve orange for the single primary action in view; make everything else indigo, ink, or white.
- **Do** separate content with a 1px `#E2E8F0` hairline first; add a shadow only for genuinely floating elements, and keep it large-radius, low-opacity, neutral.
- **Do** keep the desktop content column at 1200px, 80px side gutters, ~64px section rhythm; edit the mobile and desktop markup trees together.
- **Do** treat the logo lockup as fixed geometry — honour the `x` clear space and the `2.64x / 0.8x / 0.67x / 0.64x` proportions; recolour only to all-white on dark grounds.
- **Do** migrate new admin work toward Scholar's Indigo and the shared card grammar.

### Don't:
- **Don't** introduce a third colour as brand or decoration. The greens, teals, purples, and the `#2563EB` admin blue in the codebase are status/legacy utilities, not the palette.
- **Don't** add a second typeface or rely on font weights above 600 — they aren't loaded and the base layer overrides them.
- **Don't** use hard, high-opacity, or coloured drop shadows. The purple `rgba(109,41,218,…)` shadows in legacy CSS are a mistake; the only tinted shadow is the orange primary-button glow.
- **Don't** make cards loud — no heavy borders, no gradient fills, no glow. White rectangle, hairline edge, 16–20px corners.
- **Don't** put two orange elements in one viewport.
- **Don't** touch the logo outside its defined uses — see the brand book's 8 named misuse cases under **Logo Lockup** (no recolouring, layout changes, distortion, display effects, form changes, font swaps, gradients, or outline versions); don't place it on a low-contrast, busy, or overlapping background without a scrim.
- **Don't** let the `font-['Inter']` utility classes scattered through landing components mislead you — the running brand font on the landing page is Montserrat; Inter is the admin-only face.

---

*Colours, tint ladders, Montserrat typography, and logo geometry/misuse rules in this document are sourced directly from `HUYWAY_Logo guidelines_A4_100826.pdf` (brand book, dated 10.08.2026). The rest — component specs, layout measurements, elevation, and admin-specific guidance — is derived from the current codebase and is not part of the official brand book.*
