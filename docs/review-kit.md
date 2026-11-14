# Review kit: The Trestleboard (public snapshot)

> **Agents:** this is a read-only copy for people reading the repository. The working copy is `Agent instructions/review-kit.md` in the parent Trestleboard folder, outside this repository. Follow that one, not this.

**What this is.** I build the Trestleboard by directing AI coding agents; I'm not a programmer by training. AI models often can't reliably catch their own mistakes by re-checking their own work (the research is under "Why it's built this way" below), so this kit is how their work gets checked from the outside. [`AGENTS.md`](../AGENTS.md) decides *when* a change gets reviewed (only where a mistake would be costly and the builder's own checks can't catch it); this kit says *how*:

- **Red-team review** (section 1): a fresh agent sees the request and the finished change, never the builder's reasoning, and writes the strongest honest case against it, a pre-mortem, and a checklist report.
- **Newcomer test** (section 4), when I ask for one: an outside agent with no project files tries the live site as a stranger would.
- **Review log** (section 5): one line per review run, to judge which reviews are worth their cost. The log itself stays private.

The kit history at the bottom shows how it changed as agents found new ways to fail; sections 2 and 3 (two competing reviewers and a dry run) were retired on November 14, 2026. Snapshot taken November 14, 2026; the only edits are this note and one sentence about where the working copy lives.

---

This kit backs the Review section of [`AGENTS.md`](../AGENTS.md): AGENTS.md says when a review is needed, and this kit says how it's run.

Why it's built this way: in experiments with human groups, those that formally argued against a plan (devil's advocacy or dialectical inquiry) tended to reach better decisions than groups that worked toward consensus, though members of the arguing groups were often less satisfied (Schweiger, Sandberg and colleagues, 1986 and 1989). Sincere objections work better than a reviewer playing a part (Charlan Nemeth, *In Defense of Troublemakers*, 2018), so reviewers write the strongest real case against the change instead of collecting nitpicks. Imagining a failure that has already happened brings out more specific problems (Mitchell, Russo and Pennington, 1989). AI models often can't fix their own reasoning just by re-checking it without outside feedback (Huang and colleagues, 2024), and they tend to rate their own writing higher (Panickssery and colleagues, 2024). So reviewers are fresh agents, ideally on a different model. Most of this research is about people or other tasks; for AI agents it's a reasonable analogy, not proof.

## Who sees what

A reviewer gets only these: my request; AGENTS.md (before and after if the change edits it; otherwise the current one); the finished change (the changed files, or a before-and-after of the changed parts); a plain list from the builder of which files changed, with no reasoning; and any folders it needs to check paths (such as `icons/`). It never sees the builder's reasoning, notes, or summary; I check the summary myself. When the builder's tool lets it choose, the reviewer runs on a different model from the builder's, not a smaller one; if the only such model costs extra (usage credits beyond my plan), the builder uses its own model in a fresh session and says so in its summary. If a review is cut off partway (for example by usage limits), resume the same reviewer if the tool allows it, rather than starting a new one. The builder doesn't argue with the review; it fixes what holds up, reports the rest, and brings any Must fix it disagrees with to me.

Reviewers, testers, and graders don't edit anything. Say so in their prompt, and where the tool offers a read-only helper type (or a tool list without edit and write tools), use it. That isn't airtight, since read-only helpers often still have a shell, so the instruction matters as much as the type. If one edits a file anyway, the builder tells me what changed, doesn't undo it without my yes, and stops before applying or finishing until I answer.

If a reviewer says the request itself is the mistake, the builder passes that note to me word for word at the top of its summary and doesn't change what it builds because of it.

After any review, add a line to the review log (section 5).

## 1. Red-team review

Use for: whatever AGENTS.md's Review section sends here. Paste this to the reviewer along with the items above.

> You didn't make this change, and your job is to find what's wrong with it. Be sincere: argue only points you actually believe matter, and skip cosmetic nitpicks. Don't edit any files; report only.
>
> If you think the request itself is the mistake (not just how it was carried out), say so first, in a short note for the owner, then review the change as built anyway.
>
> For the level wanted (examples, not a list to check): after a feature (the Log) was removed, text elsewhere still pointed to it, so a reader would look for something that no longer exists. That's a Must fix. So is a renamed `tb:` key, which would strand saved data on every phone. A variable name you'd have chosen differently, or a comment you'd word better, isn't worth reporting.
>
> **Contra-memo.** In 200 words or fewer, write the strongest honest case that this change is a mistake or will cause trouble.
>
> **Pre-mortem.** It's a month from now and this change has caused a problem, either on the phone or for a later agent. Write the two or three most likely stories of what went wrong, each with the earliest sign someone would notice.
>
> **Checklist.** Go through each line and report only real problems:
> - Saved data: any `tb:` key renamed, removed, or changed in format? Any practice number changed? A retired option's saved value rewritten or deleted?
> - Offline: `CACHE` in `sw.js` updated if a loaded file changed? Every `FILES` path real? Anything new loaded from the internet?
> - Sound cues: anything added that speaks (a voice or read-aloud)? Could two breath cues now sound at once (a practice's tones and the Watch's)? Do practice tones still follow the music's chord while it plays?
> - Book block: edited only by exact find-and-replace, still valid?
> - Content: anything removed or shortened without being asked? Tone: precise but human, no flattery, no filler? Evidence described honestly (in changed text, at the same strength as before unless a fact-check found it wrong), with no ratings, dots, or scores? Supernatural claims set aside, neither affirmed nor attacked, with the symbols kept? Only free or public-domain sources? Nothing about my family or job?
> - Design: still calm? New helper text explaining a confusing screen? Icons in the existing line style? Works at 390 pixels wide and at desktop width (plus about 700 pixels and a phone turned sideways if layout changed), in light and dark mode, with no sideways sliding? Layout based on window size and pointer type, never a guess at the device? Every action has a visible control usable by tap, mouse, or keyboard, with nothing depending only on hover, a keyboard shortcut, or a touch gesture? Every control labeled for VoiceOver? New animation only inside the reduced-motion `no-preference` block? Anything on screen that flashes or pulses faster than about 3 times a second? New or changed colors checked in every color theme, light and dark, by both contrast measures? Helper text that belonged to a moved or removed control moved or removed with it, and said so?
> - Scope: anything changed that wasn't asked for and isn't in the builder's list? Does the list match the actual change? Was every part of my request done? Name any part you can't find in the change (it may have been held on purpose; I check that against the builder's summary). If a bug fix changed a shared helper, were its other callers checked for the same bug, and does the changed helper still work for each of them?
> - Removed or renamed features, changed facts: does anything still point to the old name or the missing feature, or state the old fact (a date, a label, a name) (code, book text, README, AGENTS.md)? Lines that record a removal on purpose ("don't bring them back", "no longer read") are meant to stay.
> - Many-item edits: if the request needed judgment on many items, does each changed item show its own edit, rather than one pattern applied across all of them?
> - Public folder: anything private or draft-like added to `trestleboard-app`?
> - Claims: does the change's own text (code comments, README, AGENTS.md edits) claim something the change doesn't support?
> - For rule changes: does the new wording conflict with another rule in AGENTS.md, or with something I asked for earlier? Could an agent read it two ways?
>
> **Report format.** For each problem: what it is, where (file and line or section), why it matters, and a suggested fix. Mark each one **Must fix**, **Should fix**, or **Note**. End with anything you couldn't check.

## 4. Newcomer test

Use for: when I ask, usually before I share a version with someone.

A fresh agent with no project files and no AGENTS.md gets only the site link (or a local preview address), one persona with its device and window size, and the prompt below. Rotate the personas, and keep each on its device, so the visits cover different screen sizes. The helper sets its browser window to that size before it starts. Personas so far (the letters match the Nov 6, 2026 review's reports, which had no D):
- A: a viewer of scholarly esotericism channels who knows the history (a phone, about 390 by 844 pixels)
- B: someone who has never meditated and distrusts anything mystical (a work desktop, about 1280 by 800)
- C: an adult with ADHD who wants something to leave on all day (one visit: starts on an iPad turned sideways, about 1180 by 820, and later moves to a desktop, about 1280 by 800)
- E: a Master Mason active in a lodge (an iPad held upright, about 820 by 1180)

Helpers may load my saved memory or past chats, so they aren't blind by default (a Nov 6 visitor used a detail from my profile). Where the tool offers it, start the helper without memory or past-chat tools, as with read-only helpers; either way, the prompt tells it not to use them. Before using a report, the builder scans it for anything a visitor couldn't have learned from the site (my name, job, family, where I live, my other projects). If it finds any, it marks that report "partly blind" wherever the report is used and says what leaked. The builder also starts the helper's browser with sound muted (as in AGENTS.md's Checking, step 1), or tells me first that it may play out loud.

> You've just been sent this link by a friend. You are [persona], on [device] (set your browser window to [size]). Spend about ten minutes with it as that person would. Use only what a visitor sees: don't open AGENTS.md, README.md, or the page source. Don't search or read memory or past conversations, and set aside anything you already know about the site's owner, since this visitor doesn't know them. Then report: what you thought it was in the first minute; where you got confused or nearly left; anything that reads as wrong, overclaimed, or contradicts itself (quote it and say where); and what would bring you back. Keep the report to what you saw. After it, you may add a short, separate section headed "What I'd want more of": what this visitor would want added or expanded. Keep it apart from the report, and skip it if nothing comes to mind.

Run it on the published site, so it's offered after I publish (a local preview address works only if the helper can reach it). The helper needs a real browser; if it can only fetch page text, label the result "not independent". Findings go on the Later list, dated, with the persona named; ideas from "What I'd want more of" go there too, marked as ideas, and nothing is built from them without my yes. Skip ideas that are under the Later list's Dropped heading or that AGENTS.md rules out (such as ratings, speech, or the two-week test); if a visitor wanted one, note that as a finding instead. A newcomer test isn't a review: nothing waits on it, and it doesn't replace the red team.

## 5. Review log

After each review you actually run (not ones you skip), add one line to `Agent instructions/review-log.md`: the date, what was reviewed, whether it found a Must fix that would otherwise have shipped, how many helper agents ran, and a rough cost as a share of a typical session. A review you did yourself because no helper could start gets a line too, marked "not independent". Adding a line isn't a kit change and needs no review.

## Kit history

- 2026-10-23: first version, five dry-run tasks. Revised the same day after its own first red-team review and dry run (clearer grading, fallback steps, fixed expected answers that didn't follow from AGENTS.md).
- 2026-10-26: added Task 6 and updated the design checklist for the responsive (phone first, then wider screens) rule.
- 2026-10-26 (later): reviewers also get the builder's plain list of changed files and spoken lines; limits on re-review and dry-run attempts; updated the expected answers for Tasks 1 to 4 and 6 to match AGENTS.md.
- 2026-10-27: reviews became the agent's call (the sizes in AGENTS.md are a guide, and the agent says what it ran or skipped and why); rule changes still need my yes. Updated the expected answers for Tasks 1, 2, 3, 5 and 6 to match.
- 2026-10-27 (later): the app no longer speaks, so the voice checks are gone: the checklist asks about sound cues instead, and Tasks 1 and 2 no longer expect spoken-line checks. The small practices were removed, so Task 1 now adds a routine instead.
- 2026-10-29: added the Oct 27 rulings: reviewers also get AGENTS.md before and after plus folders for checking paths, and resume after a cut-off; the tester saves its answers before grading, and the grader is neither tester nor editor; clearer steps when a task fails; tasks that should not set off a rule. Added examples of the level wanted to the red-team prompt, checklist lines for removed features and many-item edits, and Tasks 7 to 9 (item-by-item work, a mechanical rename, and planning a mixed list). Task 1 now also expects no planning step.
- 2026-10-29 (later): AGENTS.md now points to two passages as tone examples; a request that makes a rule line wrong is the yes for rewording only that line (one-time instructions change no rule), applied after review without a second yes unless a stop applies; rule edits list what they drop or loosen; changed text keeps every claim's strength unless a fact-check finds it wrong. Tasks 3, 5 and 7 and the red-team checklist check most of these.
- 2026-10-30: instruction-edits batch. AGENTS.md now says when a review is needed and this kit says how (the reviewer's model choice moved here). Rule-file changes always get their review. Added the Newcomer test (section 4) and Task 10; checklist lines for retired options, changed facts, color contrast, and helper text that follows its control; dropped the stale small-practice check. Updated the expected answers for Tasks 1, 3, 5, 7 and 8. Reviewed by two competing reviewers (two rounds).
- 2026-11-05: rule-edits batch. Reviewers, testers and graders don't edit (told so, read-only helpers where offered); the tester returns its answers for the builder to save unchanged; a re-run of a Partial reports both results. Red-team prompt: escalation note if the request itself looks like the mistake; the Scope line now also checks that every part of the request was done; the content line matches AGENTS.md's reworded supernatural-claims rule; a reviewer's "the request is the mistake" note goes to me word for word. Added the review log (section 5, with countable columns beside the cost estimate) and Task 11 (request checkoff on two bug fixes); Tasks 1 and 9 check the checkoff; tightened Tasks 5, 6 and 7.
- 2026-11-07: rule-and-kit batch (PM cycle 3, from the Nov 6 UX review and cycle 2's look-back). Newcomer test: helpers don't use memory or past chats (started without those tools where offered), the builder scans reports for leaks and marks them "partly blind", the helper's browser starts muted, an optional "What I'd want more of" section replaces the ban on ideas (ideas AGENTS.md rules out or the Later list dropped are noted as findings instead), and personas C and E join A and B, each with its device and window size. Red-team checklist: flashing, and a shared helper's other callers (same bug, and still working). Added Tasks 12 (no fast flashing) and 13 (a bug in a shared helper); updated Tasks 3, 5, 6 and 11 for AGENTS.md's new lines (muted previews, the flashing rule, the bug-fix test) and tidied two expected points in Tasks 1 and 9 that didn't follow from AGENTS.md.
- 2026-11-14: cut down after the review log reached ten lines. The two competing reviewers (not run since the review log began; last used Oct 30) and the dry run (three logged runs, none of which led to a rule-wording fix; the Nov 13 run was never graded) moved to review-kit-archive.md. AGENTS.md now calls for a red team only where a mistake would be costly and can't be caught otherwise.
