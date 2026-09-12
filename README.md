# PUBG RP Tracker

A mission tracker for the PUBG Mobile Royale Pass. It lists every weekly and
season challenge, what each one pays in RP, and turns that into the only number
that matters: your pass level.

Tick missions off as you finish them. Progress is saved in your own browser, so
two people opening the same page see their own lists.

## What it shows

- **Weekly challenges** — 28 missions across weeks 1 and 2, worth 2,260 RP.
  Weeks 3 to 5 appear locked until they drop.
- **Season challenges** — 30 missions worth 4,100 RP.
- **Pass level** — your level out of 100, RP needed for the next one, and how far
  every remaining mission would carry you.

Both lists together are worth 6,360 RP. A level costs 100 RP and the pass runs
to 100, so missions alone cover 63 levels; the rest has to come from matches,
BP and events. The tracker makes that gap explicit instead of letting you
assume missions are enough.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

There is also `standalone.html` in the repo root — the whole app inlined into a
single file. Open it in a browser or drop it on any static host; no build step,
no server.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`. To switch it on: **Settings → Pages → Source → GitHub Actions**.
The site then lives at `https://<user>.github.io/pubg-rp-tracker/`.

The Vite `base` is `./`, so the same build also works in a subfolder or opened
straight off disk.

## Where the data lives

Everything is in [`src/data/missions.ts`](src/data/missions.ts). No database, no
API — edit the file, commit, done.

### Adding a new week

Add the missions with the right `week`, then widen `releasedWeeks`:

```ts
export const releasedWeeks: Week[] = [1, 2, 3];
```

The week button unlocks, a new section appears, and every total recalculates.

### Adding a mission

```ts
{
  id: "w3-headshots",     // unique; progress is saved against this
  week: 3,                // omit for season challenges
  tag: "Elite",           // or null, "Friend Boost", "Team Boost",
                          // "Friend Bonus", "Repeatable"
  text: "Eliminate 5 enemies with headshots in Classic Mode.",
  rp: 60,                 // or  rp: null, item: "Crate coupon x1"
  repeats: 1,             // 6 for the repeatable weekly grind missions
  cards: 2,               // omit when there is no buyout option
}
```

`id` is the key progress is stored under, so changing one resets that mission
for anyone who had already ticked it. Adding and removing missions is safe —
unknown ids in saved data are ignored.

### Changing the pass rules

```ts
export const RP_PER_LEVEL = 100;
export const MAX_LEVEL = 100;
export const TOTAL_WEEKS = 5;
```

## How saving works

`src/lib/store.ts` writes one JSON blob per visitor. It prefers a host-provided
`window.storage` API when one exists, and otherwise uses `localStorage`. If both
are blocked it falls back to memory and the page says so rather than pretending
to save. Nothing leaves the browser and there is no account.

## Stack

React 19, TypeScript, Vite, Tailwind CSS. Three dependencies at runtime and no
UI framework — the styling is hand-written to match the in-game panels.

## Not affiliated

A fan-made tracker. PUBG and PUBG Mobile are trademarks of KRAFTON, Inc.
Mission text is quoted from the game for reference.
