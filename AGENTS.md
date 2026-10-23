<!--
For you, the human (some tools show this comment to the agent too):
- Save this as AGENTS.md in the trestleboard-app folder, and add a CLAUDE.md there containing only the line `@AGENTS.md`, so every tool reads the same rules.
- That folder is published as-is on GitHub Pages, so anyone can read this file at your site's address + /AGENTS.md. Keep it free of anything private.
- When the agent repeats a mistake, add a line for it. Remove lines that never seem to change anything.
-->

# Agent instructions: The Trestleboard

If something I ask conflicts with this file, do what I asked and mention the conflict. If it would lose content or saved data, or cost money, check with me first.

## Project
- What this is: the Trestleboard, a phone app of 24 practices drawn mainly from Freemasonry, Kabbalah, Hermeticism, alchemy, and Christian mysticism, used as psychological tools, plus 18 small practices for steady moments, the Watch (a calm page meant to stay open all day, with bells, one small practice at a time, and a slow drift of reading), *A Field Guide to the Western Mysteries*, and a personal log. Mainly for my own use, but kept shareable.
- Platform: an offline-capable web app on my iPhone home screen, hosted on GitHub Pages. I edit it on a Windows PC.
- Location: this folder is the whole site and the git repository, and it is public on the web. Never put secrets or anything private in it; save notes, reports, and drafts in the parent Trestleboard folder instead.
- Layout:
  - `index.html` is the whole app, in three parts: styles, then a JSON block (`id="book"`) holding all the book text, then the script. Edit it directly. There is no build step, and the old build scripts are gone; don't look for them or recreate them.
  - In the script, the 24 practices are `E` (by number), the small practices are `EVERY` (by text id, such as `attention`), the day correspondences are `DAYS`, and the Watch is `watchView`. The small practices' text lives in the script, not in the `book` block.
  - `sw.js` is the service worker (the background script that keeps a copy of the app on the phone for offline use).
  - `voices/` holds the two built-in voice recordings (Heart, Michael). `manifest.webmanifest` and `icons/` set the home-screen name and icon. `README.md` is the repository's front page on GitHub, not part of the app.
- Preview locally: serve the folder over localhost (on Windows, `py -m http.server 8000`, then open http://localhost:8000). Opening index.html directly turns off the offline features and the built-in voices.
- Git: I commit and publish with GitHub Desktop myself. Don't commit, push, or publish.

## Don't break these
- Saved data: everything I save lives on my phone in localStorage under `tb:` keys, read and written only through `store.get`/`store.set` (they add the prefix). The one exception is the backup and restore code, which copies every `tb:` key as-is; leave it that way. Never rename, remove, or change the format of those keys. Saved items point to practices by number and to note fields by position: don't renumber practices or insert note fields in the middle; add new ones at the end. Small practices are found by their text id; don't rename those ids.
- Offline updates: when you change any file the app loads (not README.md or this file), update `CACHE` in `sw.js` before previewing: add 1 to the number and use today's date (e.g. `trestleboard-v10-2026-10-19` → `trestleboard-v11-<today>`). Keep the `trestleboard-` start, because old copies are deleted by that name.
- `FILES` in `sw.js`: every path must exist and look like `icons/x.png` (no leading slash), apart from `./`, which stands for the front page; keep it. One bad path silently stops the phone from ever updating. Never list `voices/` there.
- Voices: the built-in voices are recordings of exact lines, and the tools that made them are gone. Changing any text the app speaks (practice names and steps, routines, timer prompts, the line of the day) makes that line fall back to the phone's own voice; tell me which lines changed. To check whether a line is spoken, search the list that `trestleboardPhrases()` returns in the browser console. Don't change the voice files or `VOICE_CACHE` without asking. The small practices, the Watch's read-aloud, and the day correspondences were never recorded and use the device's voice on purpose; that's expected, not a bug.
- Book text: the `id="book"` block is one JSON line about 190,000 characters long. Change it only with exact find-and-replace (never by rewriting the block with a JSON tool), keep every `<\/` as written, and reload to confirm the app still opens. One stray quote or comma blanks the whole app.
- Offline use: the app loads nothing from the internet. Keep it that way: anything new (fonts, scripts, images) goes into the project. Links out to reading sources are fine.

## Content rules
- Keep the writing as it is unless I ask. Rewording also matters because spoken lines are tied to the voice recordings.
- Don't remove or shorten any content (text, practices, glossary entries, drawings, helper text) without asking; earlier versions were merged into this one. The two-week test and the calendar were dropped on purpose; don't bring them back.
- When you do write: treat the traditions as psychological tools. Don't present supernatural claims as literal, but keep the symbolism and sense of mystery; they're part of what keeps the practice motivating.
- Tone: a hybrid. Precise and slightly technical, but human and readable, never robotic or cold. Direct, with no flattery and no filler introductions.
- No evidence ratings or scores (dots, stars, grades) on practices; they imply more credibility than intended.
- Keep my personal life (family, work) out of the content.
- Sources: only free or public-domain material.

## Scope
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
- The Watch should work the same on a computer and a phone. Its bells and drift run on clock time (`Date.now()`), not counted ticks, because browsers slow timers in background tabs; keep it that way. Don't spend effort on iPhone-only workarounds.

## Checking your work
- There are no automated tests. Before saying you're done:
  1. Preview at 390 pixels wide, in light and dark mode, and click through everything you changed.
  2. Check the browser console (its error log) for new errors.
  3. Run `caches.keys()` in the console and confirm it lists the new `CACHE` name. (An offline reload alone can look fine even when the update failed to install.)
  4. Stop the local server and reload, to confirm the app still opens offline.
- Only say something works if you checked it in this session. In your summary, say for each of the four steps above whether you did it. If you couldn't check part of it, say which part, and remind me to check it on my iPhone after publishing; GitHub Pages can take a few minutes to update.

## Safety
- Ask before deleting any file.

## When you finish
- When I send a list, fix it all in one pass with one `CACHE` update. Then tell me in plain words, in a few lines, what changed, anything you couldn't check, and problems you noticed but left alone.
- If a change makes the app nicer to use but the code harder to maintain (or the reverse), name the tradeoff instead of choosing silently.
- If a change makes README.md's "What's in it" list wrong, update it. If it makes this file wrong, update this file in the same pass and say in your summary what you changed in it.
- End every summary with plain, numbered steps for committing and publishing in GitHub Desktop: which files changed, a suggested commit message, and each click. Write them for someone who rarely uses Git. (You still don't commit or push yourself.)
