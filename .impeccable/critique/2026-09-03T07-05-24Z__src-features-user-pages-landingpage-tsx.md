---
target: landing page (/) - src/features/user/pages/LandingPage.tsx
total_score: 13
max_score: 36
na_heuristics: 7
p0_count: 4
p1_count: 1
timestamp: 2026-09-03T07-05-24Z
slug: src-features-user-pages-landingpage-tsx
---
Method: dual-agent (A: Design Review sub-agent · B: Detector + Browser Evidence sub-agent)

## Design Health Score (Persuade mode)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | Nav links, mobile CTA, and mobile lead form give zero feedback when used; carousel dots are hardcoded and never track real position. |
| 2 | Match Between System and Real World | 3 | Direct Vietnamese voice matches PRODUCT.md; band/lộ trình/target terminology used correctly throughout. |
| 3 | User Control and Freedom | 2 | Commitment modal closes via backdrop/"Đã hiểu" but no Escape key; mobile hamburger gives no open/closed visual cue. |
| 4 | Consistency and Standards | 1 | Two lead forms behave differently (one silently drops data); "Tư vấn" button opens a menu instead of consulting; legacy violet shadows bleed into the indigo-orange system; an orphaned duplicate section uses a third color vocabulary. |
| 5 | Error Prevention | 1 | Phone field has no format validation despite a hard "+84" prefix implying one; validation is a single blocking `alert()`, not inline. |
| 6 | Recognition Rather Than Recall | 2 | Nav labels are text, not icon-only — good; undercut by a fake phone-status-bar strip adding a second, meaningless clock next to the user's real one. |
| 7 | Flexibility and Efficiency of Use | n/a | Single-scroll Persuade-mode marketing page; no power-user workflow expected. |
| 8 | Aesthetic and Minimalist Design | 2 | DESIGN.md's restrained two-color system is diluted by off-token violet washes/shadows (detector-confirmed, 19 instances) and a decorative amber "avatar" filler circle. |
| 9 | Error Recovery | 1 | Empty-field alert names the problem, not the fix; a known Supabase-failure path shows a false success toast even when the insert failed. |
| 10 | Help and Documentation | 0 | FAQ renders questions with a chevron implying an accordion, but there is no answer data and no click handler at all. |

**Total: 13/36 (36%) — Poor.** (Heuristic 7 marked n/a as structurally non-applicable to a single-scroll Persuade surface; band read off percentage.)

## Design Specificity Verdict

**Mixed, leaning generic.** The copy layer is genuinely authored for HuyWay — correct Vietnamese IELTS terminology, a Hero headline that nails the anxious-beginner voice, a real founder asset presented prominently. Below the copy layer, several sections read as assembled from generic templates: a literal fake phone status bar (`TopBar.tsx`) sitting in production DOM; a stock 3-tier SaaS pricing table (`Courses.tsx`) with nothing visualizing what a "band track" actually is; a coverflow carousel of six generic Pexels stock photos (`CenterCardCarousel.tsx`) with brand-agnostic mission copy; Pexels headshots on placeholder testimonials presented with a "verified" badge; and a complete second, unused implementation of the instructor section (`MentorTeam.tsx`) using different color tokens than the one that ships (`Instructor.tsx`) — a strong signal of assemble-and-abandon.

**Deterministic scan**: `detect.mjs --json src/features/user` exited 2 with 31 findings — 19 `design-system-color` (undocumented literal colors, mostly violet, in `user.css`), 4 `ai-color-palette`, 4 `overused-font`, 3 `bounce-easing`, 1 `design-system-font-size`. Two of the five rule categories are **false positives as classified but real findings against this project's own DESIGN.md**: the "ai-color-palette" headings are actually the project's configured brand indigo (`#2C3481`, confirmed live via computed style) — not generic AI purple — but DESIGN.md line 146 requires headings in ink-black, so these 4 instances are still a real consistency violation, just not the one the rule name implies. "Overused-font" (Montserrat) is DESIGN.md's explicitly documented sole typeface — a non-issue. The 19 `design-system-color` violet hits and the 3 `bounce-easing` hits are **confirmed true positives**: DESIGN.md has named rules directly contradicting both ("The No-Violet-Shadow Rule"; motion that is "calm... they do not bounce or spin").

**Visual overlays**: Browser injection genuinely succeeded (screenshots captured as proof), but the browser used was a **headless** session, not a visible tab in your actual desktop browser — there is no live overlay currently open for you to look at; the evidence exists as static screenshots and a structured scan result instead. Desktop scan: 29 elements / 39 findings (18 low-contrast, 8 line-length, 6 image-hover-transform, 3 text-occlusion, 2 body-text-viewport-edge, 1 overused-font, 1 layout-transition). Mobile (390px): 22 elements / 36 findings — notably `body-text-viewport-edge` triples on mobile (2 → 6), confirming the mobile-audience risk PRODUCT.md itself calls out.

Cross-checking the contrast hits against source: most of the 18 "low-contrast" hits are a likely detector artifact (white text over a `background-image` gradient the contrast checker can't sample, falling through to a false "white-on-white" read — the live screenshot shows this text is actually legible). But one is a **real, source-confirmed bug**: `CenterCardCarousel.tsx`'s slide headline sets `text-white`, but a global `h1..h6 { color: #000000 !important; }` rule in `user.css` forces it black anyway, producing 1.4:1 contrast (black text on a dark navy photo overlay) against a 3:1 minimum — the headline is nearly invisible. The 3 `text-occlusion` hits also look self-referential (the detector's own overlay-badge text getting flagged by its own later occlusion pass); grepped the repo and none of the flagged "text" strings exist in real page copy.

## Overall Impression

The page's language and structure prove the team knows this audience — the voice, the terminology, and the guarantee are the real product. But the build has three separate ways of quietly failing the one thing PRODUCT.md defines as success (submitting the lead form): a mobile form that no-ops, a header CTA and full nav menu that point at hash targets that don't exist, and an FAQ that promises answers it never had. On top of that, the one thing that would make a skeptical parent say yes — the written tuition-back commitment — is sequenced after two unverified-stat sections instead of leading with it. The single biggest opportunity here isn't visual polish; it's that the page currently loses leads it should be converting, silently, in at least three places.

## What's Working

1. **Hero copy and voice** — "Chưa biết nên bắt đầu IELTS từ đâu?" plus the low-pressure framing ("Chỉ 60 giây", "100% miễn phí") matches PRODUCT.md's intended tone precisely.
2. **The commitment modal's progressive disclosure** (`SocialProof.tsx`) — collapsing the guarantee's fine print behind a "Xem chi tiết điều kiện áp dụng" link instead of dumping it inline is the right pattern.
3. **Montserrat actually holds at runtime** — despite stray `font-['Inter']` classes scattered through the source, a global `!important` override in `user.css` enforces Montserrat site-wide, so The One-Family Rule is satisfied in practice even though the source is inconsistent.

## Priority Issues

**[P0] Mobile lead form silently drops every submission**
- **What**: the mobile lead-form handler in `Stats.tsx` calls `preventDefault()` and does nothing else — no Supabase call, no state, no feedback. The Hero's desktop-only form is the one implementation that actually inserts into `leads`.
- **Why it matters**: PRODUCT.md names low-end Android as a large share of traffic, and success is explicitly "submitting the lead form" — the form most of that traffic sees discards every submission with no error shown.
- **Fix**: extract one shared submit path (with loading/success/error states) used by both the Hero and Stats forms.
- **Suggested command**: `/impeccable harden`

**[P0] Every primary nav link and the header CTA are dead**
- **What**: the four desktop nav hrefs point at ids that don't exist anywhere in the app (confirmed by grep); `#dang-ky`, referenced by the header CTA and mobile quick-access button, matches no element either. The smooth-scroll handler no-ops silently on a missing target.
- **Why it matters**: this is the sticky header, visible at every scroll position — its entire nav and its one CTA do nothing when clicked.
- **Fix**: correct the four hrefs to the real section ids; add `id="dang-ky"` to the canonical lead-form wrapper.
- **Suggested command**: `/impeccable harden`

**[P0] FAQ shows questions with no answers and no working accordion**
- **What**: the FAQ data model has no answer field at all, and the chevron-icon rows have no click handler or expand state.
- **Why it matters**: FAQ exists to defuse the exact hesitation that blocks a "yes" (PRODUCT.md Principle 2) — a visitor who scrolls there for reassurance gets nothing.
- **Fix**: add answer copy per question and wire real accordion state.
- **Suggested command**: `/impeccable clarify`

**[P0] Carousel headline text is nearly invisible (1.4:1 contrast)**
- **What**: `CenterCardCarousel.tsx` slide titles set `text-white`, but a global `h1–h6 { color: #000000 !important; }` rule overrides it to black on top of a dark navy photo overlay — source-confirmed and screenshot-confirmed.
- **Why it matters**: real accessibility failure (well under the 3:1 minimum for large text) on a section meant to carry brand-mission copy.
- **Fix**: scope the black heading override so it doesn't apply inside components that intentionally set white text, or give the carousel headline its own explicit color rule.
- **Suggested command**: `/impeccable audit`

**[P1] Legacy violet colors/shadows and an always-on orange band violate DESIGN.md's own named rules**
- **What**: 19 detector-confirmed literal violet/off-token colors in `user.css` (`rgba(109,41,218,…)` and friends) live in the carousel eyebrow chip, commitment-modal badges, testimonial card ring, and the unused `MentorTeam.tsx` — directly contradicting DESIGN.md's "No-Violet-Shadow Rule." Separately, the `fixed` orange `TopBar` band is visible at every scroll position alongside whatever orange CTA/score-label happens to also be on screen, breaking "The Wayfinder Rule" ("if two things on one screen are orange, one of them is wrong").
- **Why it matters**: these aren't subjective taste calls — DESIGN.md documents them as intentional constraints, and un-migrated legacy CSS is actively shipping in current sections.
- **Fix**: repoint the violet tokens to the documented indigo-wash/tint hexes and neutral shadow values; recolor the persistent TopBar toward indigo/neutral so orange stays reserved for one CTA per viewport.
- **Suggested command**: `/impeccable colorize`

**[P2] Unverified stats lead the page; the real differentiator arrives 8 sections in**
- **What**: the Hero's "10,000+ học viên" claim and the Stats block render as plain, unmarked-as-provisional fact in the first two screens, while the written tuition-back commitment — PRODUCT.md's stated real differentiator — doesn't appear until section 8 of 10. The commitment modal's 4 numbered conditions also read as a finalized policy with no marker that they're illustrative (per PRODUCT.md, they are).
- **Why it matters**: PRODUCT.md Principle 3 asks for provisional content to be visibly provisional, not decoration presented as fact — and it front-loads unverified claims ahead of the one true claim likely to convert a skeptical parent.
- **Fix**: either visibly mark stats as provisional until confirmed, or pull a compact trust signal from the guarantee up near the Hero form.
- **Suggested command**: `/impeccable audit`

## Persona Red Flags

**Jordan (Confused First-Timer)**: taps the mobile "Tư vấn" quick-access button expecting to reach consultation — it silently no-ops (target id doesn't exist), no error, no feedback. Scrolls to FAQ for her exact hesitation ("Kiểm tra trình độ có mất phí không?"), taps the row expecting an answer — nothing renders, because none exists. Sees a second fake clock/signal/battery strip pinned below her real phone's status bar with no explanation.

**Riley (Deliberate Stress Tester)**: clicks all four desktop nav items in sequence — all four are dead. Submits the mobile form, nothing happens; finds the desktop version of the "same" form actually posts to Supabase — an environment-dependent core function, exactly the kind of inconsistency this persona documents. Types letters into the phone field — nothing blocks it despite the fixed "+84" prefix implying a numeric format.

**Casey (Distracted Mobile User)**: the one persistent, thumb-reachable action in the pinned mobile chrome ("Tư vấn") is dead. The floating CTA only ever offers "back to top," never a persistent "check my level" shortcut despite its own name. Because the mobile form no-ops silently, she has no reason to believe anything failed — she assumes she registered and never returns; silent data loss on exactly the interruption-prone flow this persona represents.

**"Chị Lan" (anxious parent deciding whether to trust the center)** — derived from PRODUCT.md's audience description: asked for name + phone in the very first screen, backed by one unverified stat line, before she's seen the one thing that's actually differentiated (the written guarantee, 8 sections down). If she does reach the commitment modal, its numbered conditions read as finalized legal terms with no marker that they're illustrative. Footer contact details (hotline, email, address) — also unconfirmed per PRODUCT.md — carry the same plain, unmarked authority.

## Minor Observations

- Carousel dot indicators are hardcoded — the first dot is always "active" regardless of real scroll position.
- `PainPoints.tsx` declares `openIndex`/`toggle` state that's never wired into its JSX — an abandoned interactive-card idea.
- `index.html` loads 5 weights of Google Fonts Inter for a page whose CSS forces Montserrat almost everywhere via `!important` — unnecessary payload for the low-end-Android audience PRODUCT.md names explicitly.
- `MentorTeam.tsx` is a fully built, completely unused second "Đội ngũ giảng viên" implementation with its own divergent color tokens — either wire it in or delete it; left as-is it's a maintenance trap.
- Amber/gold filler-avatar circles in `Steps.tsx` and `Courses.tsx` mobile introduce a third color purely as placeholder decoration.
- 3 `bounce-easing` CSS animations (`animate-bounce`, `bounce-cta`) contradict DESIGN.md's "calm, one-directional... do not bounce" motion rule.
- One `text-[15px]` instance (`Testimonials.tsx`) sits off the documented type-size ramp.
- Header's mobile menu toggles via a button labeled "Tư vấn," not "Menu" or a hamburger icon — the control's true function is invisible from its label.

## Questions to Consider

- If the mobile lead form has been silently failing, how much real lead volume has already been lost on the traffic segment PRODUCT.md says is the majority?
- The written commitment is the one differentiator a competitor "could not truthfully copy" — why is it sequenced after two rounds of unverified stats instead of leading with it?
- `MentorTeam.tsx` and `Instructor.tsx` both solve the same problem with different execution — was this a deliberate in-progress decision, or an abandoned attempt worth resolving before either drifts further from DESIGN.md?
