<!--
For you, the human (some tools show this comment to the agent too):
- Save this as AGENTS.md in the trestleboard-app folder, and add a CLAUDE.md there containing only the line `@AGENTS.md`, so every tool reads the same rules.
- That folder is published as-is on GitHub Pages, so anyone can read this file at your site's address + /AGENTS.md. Keep it free of anything private.
- When the agent repeats a mistake, add a line for it, and add a task for it to the dry run in `Agent instructions/review-kit.md`. Remove lines that never seem to change anything.
-->

# Agent instructions: The Trestleboard

If something I ask conflicts with this file, do what I asked and mention the conflict. If it would lose content or saved data, or cost money, check with me first.

## Project
- What this is: the Trestleboard, a phone app of 24 practices drawn mainly from Freemasonry, Kabbalah, Hermeticism, alchemy, and Christian mysticism, used as psychological tools, plus 18 small practices for steady moments, the Watch (a screen meant to run in the background all day like a video: a background sound, including generated soft music, pauses for a minute of breathing, a small practice, or a check-in, and short readings in between), *A Field Guide to the Western Mysteries*, and a personal log. Mainly for my own use, but kept shareable.
- Platform: an offline-capable web app on my iPhone home screen, hosted on GitHub Pages. I edit it on a Windows PC.
- Location: this folder is the whole site and the git repository, and it is public on the web. Never put secrets or anything private in it; save notes, reports, and drafts in the parent Trestleboard folder instead.
- Layout:
  - `index.html` is the whole app, in three parts: styles, then a JSON block (`id="book"`) holding all the book text, then the script. Edit it directly. There is no build step, and the old build scripts are gone; don't look for them or recreate them.
  - The 24 practices' wording (method, why, and the rest) is in the book block under `entries`, by number. In the script, `E` holds each practice's situation label, tool, and a copy of its name. The small practices are `EVERY` (by text id, such as `attention`), with all their text in the script; `WATCH_SAYS` holds how the Watch words each one on its own. The day correspondences are `DAYS` (with `dayAbout` explaining them), the Watch is `watchView`, and its soft music is `startMusic`.
  - `sw.js` is the service worker (the background script that keeps a copy of the app on the phone for offline use).
  - `voices/` holds the two built-in voice recordings (Heart, Michael). `manifest.webmanifest` and `icons/` set the home-screen name and icon. `README.md` is the repository's front page on GitHub, not part of the app.
- Preview locally: serve the folder over localhost (on Windows, `py -m http.server 8000`, then open http://localhost:8000). Opening index.html directly turns off the offline features and the built-in voices.
- Git: I commit and publish with GitHub Desktop myself. Don't commit, push, or publish.

## Don't break these
- Saved data: everything I save lives on my phone in localStorage under `tb:` keys, read and written only through `store.get`/`store.set` (they add the prefix). The one exception is the backup and restore code, which copies every `tb:` key as-is; leave it that way. Never rename, remove, or change the format of those keys. Saved items point to practices by number and to note fields by position: don't renumber practices or insert note fields in the middle; add new ones at the end. Small practices are found by their text id; don't rename those ids.
- Offline updates: when you change any file the app loads (not README.md or this file), update `CACHE` in `sw.js` before previewing: add 1 to the number and use today's date (e.g. `trestleboard-v10-2026-10-19` → `trestleboard-v11-<today>`). Keep the `trestleboard-` start, because old copies are deleted by that name.
- `FILES` in `sw.js`: every path must exist and look like `icons/x.png` (no leading slash), apart from `./`, which stands for the front page; keep it. One bad path silently stops the phone from ever updating. Never list `voices/` there.
- Voices: the built-in voices are recordings of exact lines, and the tools that made them are gone. Changing any text the app speaks (practice names and steps, routines, timer prompts, the line of the day) makes that line fall back to the phone's own voice; tell me which lines changed. Before changing any wording, check whether it's spoken: search the list that `trestleboardPhrases()` returns in the browser console. Don't change the voice files or `VOICE_CACHE` without asking. The small practices, the Watch's read-aloud, and the day correspondences were never recorded and use the device's voice on purpose; that's expected, not a bug.
- Book text: the `id="book"` block is one JSON line about 190,000 characters long. Change it only with exact find-and-replace (never by rewriting the block with a JSON tool), keep every `<\/` as written, and reload to confirm the app still opens. One stray quote or comma blanks the whole app.
- Offline use: the app loads nothing from the internet. Keep it that way: anything new (fonts, scripts, images) goes into the project. Links out to reading sources are fine.

## Content rules
- Keep the writing as it is unless I ask. Rewording also matters because spoken lines are tied to the voice recordings.
- Don't remove or shorten any content (text, practices, glossary entries, drawings, helper text) without asking; earlier versions were merged into this one. A direct request from me to shorten, reword, or remove a named item is the permission; ask only if it's unclear which item I mean or the change would reach other items. The two-week test and the calendar were dropped on purpose; don't bring them back.
- When you do write: treat the traditions as psychological tools. Don't present supernatural claims as literal, but keep the symbolism and sense of mystery; they're part of what keeps the practice motivating.
- Tone: a hybrid. Precise and slightly technical, but human and readable, never robotic or cold. Direct, with no flattery and no filler introductions.
- No evidence ratings or scores (dots, stars, grades) on practices; they imply more credibility than intended.
- Keep my personal life (family, work) out of the content.
- Sources: only free or public-domain material.

## Scope
- If a request can't be done reliably in a static web page (it would need a server, a paid service, data leaving the phone, or a trick you can't test here), say so plainly, explain what it would take, and ask before building anything.
- If a request is unclear and the change is large or hard to undo, ask one question first. If it's small and easy to redo, make a sensible choice and say which one you made. If you can't reproduce a problem I describe, make your best reading of it, still finish the rest of my list, and ask afterward.
- Change only what the task needs. If a fix would also affect things I didn't name (every table, every page), limit it to what I named, or say clearly that it spreads. Don't fix unrelated problems you notice; list them in your summary. Surprise changes are hard to review.
- Match the existing code's style (`var`, `function`, `h()` to build elements) and naming, even if you'd write it differently, unless the pattern is itself a bug; then say so.
- Keep the app as plain files GitHub Pages can serve as-is: no build step, framework, or package manager.
- Don't add abstractions, settings, or error handling for situations that can't happen.
- Ask before adding any outside library, font, or asset, even a free one, and tell me its license and whether it allows copying into a public site. If anything would cost money, ask first; suggest a one-time purchase only if it would greatly improve the app, and name the free alternative.
- Don't leave commented-out code, debug prints, or unused files behind.

## Interface and design
- Navigation (the bottom bar, moving between pages) should feel smooth and fluid. When working on it, short transitions like the existing ones and icons that match the tab icons are fine. Put any new animation inside the existing `@media (prefers-reduced-motion: no-preference)` block, even though older animations are switched off in a separate `reduce` block instead (leave those as they are), and make scripted motion (such as smooth scrolling) respect the existing `reduce` variable.
- Pages should be calm: nothing overwhelming or distracting. No decorative animation, stacked menus, extra tabs, or crowded layouts on reading and practice pages.
- Don't add taglines, helper text, or extra labels to explain a confusing screen; fix the layout instead. Leave existing helper text as it is.
- New drawings and icons should match the existing line style: outline only (`fill="none" stroke="currentColor"`), apart from small solid dots and the solid star that marks a pinned practice; rounded corners, `aria-hidden="true"`, and the same size and stroke width as their neighbours.
- Design for iPhone first: about 390 pixels wide, in both light and dark mode (dark mode follows the phone). Nothing may make the page slide sideways. Tables on the Read pages already stack into cards on narrow screens; a new table there needs a `<thead>` row and the same `<div class="table"><div class="tablewrap">` wrapper the book's tables use.
- Every control needs a label VoiceOver (the iPhone screen reader) can announce.
- The Watch should work the same on a computer and a phone. Its bells and drift run on clock time (`Date.now()`), not counted ticks, because browsers slow timers in background tabs; keep it that way. Don't spend effort on iPhone-only workarounds; if I ask for one, explain what it would take and ask before building it.

## Checking your work
- There are no automated tests. Before saying you're done:
  1. Preview at 390 pixels wide, in light and dark mode, and click through everything you changed.
  2. Check the browser console (its error log) for new errors.
  3. Run `caches.keys()` in the console and confirm it lists the new `CACHE` name. (An offline reload alone can look fine even when the update failed to install.)
  4. Stop the local server and reload, to confirm the app still opens offline.
- Only say something works if you checked it in this session. In your summary, say for each of the four steps above whether you did it. If you couldn't check part of it, say which part, and remind me to check it on my iPhone after publishing; GitHub Pages can take a few minutes to update.

## Review
- The review kit is in the parent Trestleboard folder, at `Agent instructions/review-kit.md` (outside this public folder). Size the review to the change:
  - Small fix (wording, spacing, one bug): your own checks above are enough.
  - New feature, or any change that touches saved data, `sw.js`, the book block, spoken text, or several areas at once: also run one red-team review of the finished change.
  - A change to a rule in this file: propose it and wait for my yes before applying it. If I asked for the change directly, that request is the yes. Either way, run a red-team review, plus the dry-run tasks the edited rule touches and Task 5, on the proposed wording before applying it, and show me the results.
  - A new or largely rewritten AGENTS.md or review kit: two competing reviewers and the full dry run. If you can't run two reviewers, say so and ask me how to proceed.
- A reviewer is a fresh agent that sees only my request, this file, and the finished change, never your reasoning or summary. When your tool lets you choose, run it on a different model from your own, not a smaller one.
- If you can't start a separate reviewer or can't open the kit, answer these yourself as a separate step after finishing: (1) the strongest honest case against this change, in 200 words or fewer; (2) the two or three likeliest ways it causes trouble within a month; (3) does any new wording conflict with another rule or read two ways? Say in your summary that the review wasn't independent. A rule change that couldn't be dry-run isn't applied: show me the proposed wording and say the dry run was skipped.
- In your summary, list what the review found and what you did about each point.

## Safety
- Ask before deleting any file.

## When you finish
- When I send a list, fix it all in one pass with one `CACHE` update. Then tell me in plain words, in a few lines, what changed, anything you couldn't check, and problems you noticed but left alone.
- If a change makes the app nicer to use but the code harder to maintain (or the reverse), name the tradeoff instead of choosing silently.
- If a change makes README.md's "What's in it" list wrong, update it. If it makes facts in this file wrong (what's in the app, where things live in the code), update them in the same pass and say what you changed. Changes to rules follow the Review section. Facts are descriptions: counts, file names, where things live. Any line that says must, never, don't, keep, or ask is a rule, even in the Project section. If unsure, treat it as a rule.
- Whenever files changed, end your summary with plain, numbered steps for committing and publishing in GitHub Desktop (if nothing changed, say so): which files changed, a suggested commit message, and each click. Write them for someone who rarely uses Git. (You still don't commit or push yourself.)
