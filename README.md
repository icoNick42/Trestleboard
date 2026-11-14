# Trestleboard

Twenty-four practices borrowed from Western esoteric traditions, a breathing companion called the Watch, and *A Field Guide to the Western Mysteries*, in one app for your phone or computer.

Everything in it comes from free or public-domain sources.

## Putting it on an iPhone

1. Open this app's GitHub Pages link in **Safari**.
2. Tap the **Share** button (the square with the arrow pointing up).
3. Tap **Add to Home Screen**, then **Add**.

Open it once with internet so the phone saves its copy. After that it opens with no signal.

## What's in it

- **Welcome**: a short welcome each time you open or come back to the app (with a tour of the tabs the first time), in the color theme you picked.
- **Watch**: the first tab, and the page the app opens on. A breathing companion to leave running in the background like a video. Tap a mix to start: Slow (slow breathing only, in 8-minute sets), Settle (mostly slow breathing, now and then a sigh or a box), Reset (mostly the sigh and box breathing), or Drive, for driving (about two minutes of slow breathing by ear, then four of quiet; breath tones come on, thunder stays off, and the screen goes dark). Or open Custom to pick one or more of the four breathing patterns from the practices (slow breathing, a long exhale, box breathing, or the double-inhale sigh) and how long each set runs. It breathes with you set after set, with rests between, until you pause or stop it. While each pattern runs, it shows where the pattern's image comes from and why it might help. Underneath, it can play any blend of soft music (in four moods: Warm, Dusk, Open, and Piano), breath tones, a low drone, a soft tone pulsed 40 times a second, rain, ocean, wind, fire, a thunderstorm, crickets, brown noise, and pink noise, each with its own volume (the background sounds matched so they sound about equally loud), and all made by the app itself. The music can also flutter (its volume pulsed 16 times a second), switched on or off; the names of the drone, the 40 Hz pulse and the flutter open their glossary entries. Four ready-made scenes (Rain study, Hearth, Night porch, Shoreline) set a blend in one tap, and you can save your own. While the Watch runs, the music's tone opens and closes a little with your breath, and its bells wait for the rests, so they never ring over a breath tone (the Piano mood's slow broken chords keep playing). It's the same mix as the background sound in the top bar's sound settings, so changing one changes the other. Its sound and screen settings sit beside it on a wide screen, or open from a button below the mixes on a narrower one. It can keep the screen on while it runs, and dim it (the breathing shape stays easy to see), or turn the lights out: a dark screen with only the breathing shape and what to do now. It keeps running while you move to other pages, with a slim bar above the tabs that shows a small breathing shape, what to do now, and its own pause button (breathing waits while a practice's own tool is running, or while a routine or the timer is on screen; the app has to stay open, and on a phone the screen has to stay on).
- **Practices**: "When something snags" with eight groups (Inertia, Low energy, Overload, Reactivity, Rumination, Indecision, Friction, Transitions), each opening a page with its three practices, one marked "Start here"; pinned practices; three routines (Settle in, Reset, Close out) and a quiet timer; and a closing note, The Perfect Ashlar. All 24 practices come with their tools (breathing guides, timers, practice tones (turned on with the Tones button in each tool) that match the soft music's chord while it plays, background sounds and soft music, and Lights out, a dark screen for eyes-closed or bedtime use that shows the breathing shape). The evening review (Raising the Sparks) also shows what you saved that day.
- **Read**: About (the preface, "Where the Threads Cross," and "Reading the Fine Print"); the Field Guide (all of *A Field Guide to the Western Mysteries*); and Extras (one combined glossary, where each word lists the pages that use it, and the Free Shelf). Glossary words are underlined in the reading and the practices; tap one for its definition. Each reading page remembers where you left off, and the Read tab links back to the last one. The sound settings are there too, so music or rain can play while you read.
- **Aa**: on every page, text size (for the whole app), light or dark (or match the device), three color themes (the warm Linen, the default; Slate; and the green Moss), and a font for everything but the titles: the device's own, Atkinson Hyperlegible Next, or Hanken Grotesk. Titles and section heads are set in Cormorant Garamond.
- **On a wider screen**, the tabs move to a rail on the left (an iPad held upright, for example). On a wide one (an iPad turned sideways, or a computer), a pane on the right also holds the Watch, the sections of the reading page you're on, and glossary definitions.

Your notes, pins, and settings are saved only on the device you use them on. They are never uploaded here.

## Files

- `index.html`: the whole app
- `sw.js`: lets the phone keep a copy so it works offline
- `fonts/`: the two optional fonts and the title font (Cormorant Garamond), all under the SIL Open Font License (license files included)
- `manifest.webmanifest` and `icons/`: the home-screen name and icon
- `docs/`: read-only copies of the agent review kit and starter file (see below)

## How it's built

I build the Trestleboard by directing AI coding agents. The rules they follow are in [AGENTS.md](AGENTS.md). How their work gets checked (red-team reviews, competing reviewers, and blind dry-run tests) is in [docs/review-kit.md](docs/review-kit.md). A version of the rules for other projects is in [docs/starter-agents.md](docs/starter-agents.md).
