import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  weeklyMissions,
  seasonMissions,
  releasedWeeks,
  MAX_LEVEL,
  RP_PER_LEVEL,
  TOTAL_WEEKS,
  type Mission,
  type Tag,
  type Track,
  type Week,
} from "@/data/missions";
import { clearProgress, loadProgress, saveProgress, whereItSaves } from "@/lib/store";
import { PassStatus } from "@/components/PassStatus";

/* ------------------------------------------------------------------ */

const everything = [...weeklyMissions, ...seasonMissions];
const maxRp = (m: Mission) => (m.rp === null ? 0 : m.rp * m.repeats);
const fmt = (n: number) => n.toLocaleString("en-US");
const allWeeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => (i + 1) as Week);
const isOut = (w: Week) => releasedWeeks.includes(w);

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */

function Coin({ m, dim }: { m: Mission; dim: boolean }) {
  const isItem = m.rp === null;
  return (
    <div className="shrink-0 w-[46px] text-center" style={{ opacity: dim ? 0.75 : 1 }}>
      <div
        className="coin w-[46px] h-[46px] grid place-items-center"
        style={{
          background: isItem
            ? "linear-gradient(160deg,#b06ad6 0%,#7a3fa8 55%,#5b2d80 100%)"
            : "linear-gradient(160deg,#ffd766 0%,#f2b01e 45%,#a97505 100%)",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.35)",
        }}
      >
        {isItem ? (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 8l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 16l9 4 9-4"
              fill="none"
              stroke="#fff"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <span
            className="cond tabular font-bold leading-none"
            style={{ color: "#38260a", fontSize: m.rp! >= 100 ? 17 : 19 }}
          >
            {m.rp}
          </span>
        )}
      </div>
      <div
        className="cond mt-1 leading-none"
        style={{ fontSize: 11, color: isItem ? "#a071c7" : "#9c8352" }}
      >
        {isItem ? "item" : "RP"}
      </div>
    </div>
  );
}

function TagChip({ tag }: { tag: Tag }) {
  if (!tag) return null;
  return (
    <span className="cond font-semibold mr-2 align-baseline" style={{ color: "var(--flare)", fontSize: 14 }}>
      [{tag}]
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* mission row                                                         */
/* ------------------------------------------------------------------ */

function MissionRow({
  m,
  done,
  reps,
  onToggle,
  onStep,
}: {
  m: Mission;
  done: boolean;
  reps: number;
  onToggle: () => void;
  onStep: (d: number) => void;
}) {
  const elite = m.tag === "Elite";
  const repeatable = m.repeats > 1;
  const complete = repeatable ? reps >= m.repeats : done;
  const partial = repeatable && reps > 0 && reps < m.repeats;

  return (
    <div
      className="relative flex flex-wrap items-start gap-x-4 gap-y-2 px-4 py-3.5 sm:px-5 border-b"
      style={{ background: elite ? "var(--rust)" : "var(--panel)", opacity: complete ? 0.62 : 1 }}
    >
      {elite && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: "var(--gold)" }}
        />
      )}

      <Coin m={m} dim={complete} />

      <div className="min-w-0 flex-1 basis-[calc(100%-66px)] sm:basis-0 pt-0.5">
        <p
          className="cond m-0"
          style={{
            fontSize: 17,
            lineHeight: 1.3,
            color: complete ? "var(--muted)" : "#eae7e1",
            textDecoration: complete ? "line-through" : "none",
            textDecorationColor: "#6b5c3a",
          }}
        >
          <TagChip tag={m.tag} />
          {m.text}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-4">
          {repeatable && (
            <span className="cond tabular" style={{ fontSize: 13, color: "var(--muted)" }}>
              {reps} of {m.repeats} turn-ins · {fmt(m.rp! * m.repeats)} RP for all six
            </span>
          )}
          {m.cards && !complete && (
            <span className="cond tabular" style={{ fontSize: 13, color: "var(--muted)" }}>
              or {m.cards} mission {m.cards === 1 ? "card" : "cards"}
            </span>
          )}
          {m.item && (
            <span className="cond" style={{ fontSize: 13, color: "#a071c7" }}>
              {m.item}
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 order-last sm:order-none basis-full sm:basis-auto ml-[62px] sm:ml-0 pt-0.5">
        {repeatable ? (
          <div className="flex items-center" style={{ border: "1px solid var(--line)" }}>
            <button
              onClick={() => onStep(-1)}
              disabled={reps === 0}
              aria-label={`Remove a turn-in from: ${m.text}`}
              className="cond w-9 h-8 grid place-items-center disabled:opacity-30"
              style={{ color: "var(--bone)", fontSize: 18 }}
            >
              −
            </button>
            <span
              className="cond tabular w-9 text-center"
              style={{
                fontSize: 15,
                color: complete ? "var(--gold)" : partial ? "#e8e4dd" : "var(--muted)",
              }}
            >
              {reps}
            </span>
            <button
              onClick={() => onStep(1)}
              disabled={reps >= m.repeats}
              aria-label={`Add a turn-in to: ${m.text}`}
              className="cond w-9 h-8 grid place-items-center disabled:opacity-30"
              style={{ color: "var(--bone)", fontSize: 18 }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={onToggle}
            aria-pressed={done}
            aria-label={`${done ? "Mark as not done" : "Mark as done"}: ${m.text}`}
            className="cond h-8 px-3 flex items-center gap-1.5"
            style={{
              fontSize: 14,
              border: `1px solid ${done ? "transparent" : "var(--line)"}`,
              background: done ? "rgba(242,176,30,.14)" : "transparent",
              color: done ? "var(--gold)" : "var(--muted)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12.5l5.2 5.2L20 7" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
            {done ? "Done" : "Mark done"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* app                                                                 */
/* ------------------------------------------------------------------ */

type WeekSel = Week | "all";
type StatusSel = "all" | "todo" | "done";
type SortSel = "game" | "rp" | "cards";

const blankDone = () => Object.fromEntries(everything.map((m) => [m.id, false]));
const blankReps = () => Object.fromEntries(everything.map((m) => [m.id, 0]));

export default function App() {
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>(blankDone);
  const [repMap, setRepMap] = useState<Record<string, number>>(blankReps);
  const [ready, setReady] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const [confirmReset, setConfirmReset] = useState(false);
  const [baseLevel, setBaseLevel] = useState(0);

  const [track, setTrack] = useState<Track>("weekly");
  const [week, setWeek] = useState<WeekSel>("all");
  const [status, setStatus] = useState<StatusSel>("all");
  const [sort, setSort] = useState<SortSel>("game");

  /* --- read whatever this visitor saved last time --- */
  useEffect(() => {
    let alive = true;
    loadProgress().then((saved) => {
      if (!alive) return;
      if (saved) {
        const d = blankDone();
        saved.done?.forEach((id) => {
          if (id in d) d[id] = true;
        });
        const r = blankReps();
        Object.entries(saved.reps ?? {}).forEach(([id, n]) => {
          if (id in r) r[id] = n;
        });
        setDoneMap(d);
        setRepMap(r);
        if (typeof saved.level === "number") setBaseLevel(saved.level);
      }
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  /* --- write it back, debounced --- */
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!ready) return;
    setSaveState("saving");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      const ok = await saveProgress({
        v: 1,
        done: Object.keys(doneMap).filter((id) => doneMap[id]),
        reps: Object.fromEntries(Object.entries(repMap).filter(([, n]) => n > 0)),
        level: baseLevel,
      });
      setSaveState(ok ? "saved" : "failed");
    }, 500);
    return () => window.clearTimeout(timer.current);
  }, [doneMap, repMap, baseLevel, ready]);

  const pool = track === "weekly" ? weeklyMissions : seasonMissions;

  const isComplete = useCallback(
    (m: Mission) => (m.repeats > 1 ? repMap[m.id] >= m.repeats : doneMap[m.id]),
    [doneMap, repMap],
  );

  const earnedOf = useCallback(
    (m: Mission) =>
      m.rp === null ? 0 : m.repeats > 1 ? repMap[m.id] * m.rp : doneMap[m.id] ? m.rp : 0,
    [doneMap, repMap],
  );

  const tally = useCallback(
    (ms: Mission[]) => ({
      total: ms.reduce((s, m) => s + maxRp(m), 0),
      earned: ms.reduce((s, m) => s + earnedOf(m), 0),
      count: ms.length,
      done: ms.filter(isComplete).length,
      coupons: ms.filter((m) => m.rp === null).length,
      couponsGot: ms.filter((m) => m.rp === null && isComplete(m)).length,
    }),
    [earnedOf, isComplete],
  );

  const totals = useMemo(() => tally(pool), [tally, pool]);
  const byWeek = useMemo(
    () =>
      Object.fromEntries(
        releasedWeeks.map((w) => [w, tally(weeklyMissions.filter((m) => m.week === w))]),
      ) as Record<number, ReturnType<typeof tally>>,
    [tally],
  );

  const shown = useMemo(() => {
    let list = pool.filter((m) =>
      track === "weekly" && week !== "all" ? m.week === week : true,
    );
    list = list.filter((m) => {
      if (status === "all") return true;
      return status === "done" ? isComplete(m) : !isComplete(m);
    });
    if (sort === "rp") list = [...list].sort((a, b) => maxRp(b) - maxRp(a));
    else if (sort === "cards") list = [...list].sort((a, b) => (a.cards ?? 99) - (b.cards ?? 99));
    return list;
  }, [pool, track, week, status, sort, isComplete]);

  const grouped = useMemo(() => {
    if (track !== "weekly" || week !== "all" || sort !== "game")
      return [{ week: null as Week | null, list: shown }];
    return releasedWeeks
      .map((w) => ({ week: w, list: shown.filter((m) => m.week === w) }))
      .filter((g) => g.list.length);
  }, [shown, track, week, sort]);

  const left = totals.total - totals.earned;

  const figures = useMemo(() => {
    const weekly = tally(weeklyMissions);
    const season = tally(seasonMissions);
    const open = everything.filter((m) => !isComplete(m));
    return {
      baseLevel,
      bankedRp: weekly.earned + season.earned,
      remainingRp: weekly.total - weekly.earned + (season.total - season.earned),
      weeklyLeft: weekly.total - weekly.earned,
      seasonLeft: season.total - season.earned,
      poolRp: weekly.total + season.total,
      cardsLeft: open.reduce((s2, m) => s2 + (m.cards ?? 0), 0),
      couponsLeft: open.filter((m) => m.rp === null).length,
      missionsLeft: open.length,
    };
  }, [tally, isComplete, baseLevel]);

  const markWeek = (w: Week, value: boolean) => {
    const ids = weeklyMissions.filter((m) => m.week === w);
    setDoneMap((s) => {
      const n = { ...s };
      ids.filter((m) => m.repeats === 1).forEach((m) => (n[m.id] = value));
      return n;
    });
    setRepMap((s) => {
      const n = { ...s };
      ids.filter((m) => m.repeats > 1).forEach((m) => (n[m.id] = value ? m.repeats : 0));
      return n;
    });
  };

  const reset = async () => {
    setDoneMap(blankDone());
    setRepMap(blankReps());
    await clearProgress();
    setConfirmReset(false);
  };

  const backend = whereItSaves();
  const savingNote =
    saveState === "failed"
      ? "Couldn't save — your ticks will last until you close this tab."
      : backend === "memory"
        ? "Storage is blocked here, so ticks last until you close this tab."
        : "Saved in your browser. Only you see these ticks.";

  const lastOut = releasedWeeks[releasedWeeks.length - 1] ?? 0;

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6 pb-20">
        {/* ---------- page head ---------- */}
        <header className="pt-10 sm:pt-12">
          <p className="cond m-0" style={{ fontSize: 15, color: "var(--flare)" }}>
            Royale Pass · weeks 1–{lastOut} of {TOTAL_WEEKS} released ·{" "}
            {seasonMissions.length} season challenges
          </p>
          <h1
            className="cond m-0 mt-1"
            style={{ fontSize: 34, lineHeight: 1.05, fontWeight: 700, color: "#f3f0ea" }}
          >
            Every mission, and what it's worth
          </h1>
        </header>

        {/* ---------- pass level ---------- */}
        <PassStatus f={figures} onLevelChange={setBaseLevel} />

        {/* ---------- track tabs ---------- */}
        <nav className="mt-10 flex" aria-label="Challenge type">
          {([
            ["weekly", "Weekly challenges", weeklyMissions.length],
            ["season", "Season challenges", seasonMissions.length],
          ] as const).map(([id, label, n]) => {
            const on = track === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setTrack(id);
                  setWeek("all");
                }}
                aria-current={on ? "page" : undefined}
                className="cond relative px-4 sm:px-5 py-2.5 flex items-center gap-2"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: on ? "#f3f0ea" : "var(--muted)",
                  background: on ? "var(--panel-hi)" : "transparent",
                  border: "1px solid var(--line)",
                  borderBottom: "none",
                }}
              >
                {label}
                <span
                  className="cond tabular"
                  style={{ fontSize: 13, color: on ? "var(--gold)" : "#5f6369" }}
                >
                  {n}
                </span>
                {on && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 top-0 h-[2px]"
                    style={{ background: "var(--gold)" }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* ---------- track summary ---------- */}
        <div
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 sm:px-5 py-3"
          style={{ border: "1px solid var(--line)", background: "var(--panel-hi)" }}
        >
          <span className="cond tabular" style={{ fontSize: 17, color: "#e8e4dd" }}>
            {fmt(left)} RP left here
          </span>
          <span className="cond tabular" style={{ fontSize: 14.5, color: "var(--muted)" }}>
            {totals.done} of {totals.count} ticked · {fmt(totals.earned)} RP banked
            {totals.coupons > 0 &&
              ` · ${totals.couponsGot} of ${totals.coupons} crate coupons`}
          </span>
          <span
            className="cond tabular ml-auto"
            style={{ fontSize: 14.5, color: "var(--gold-deep)" }}
          >
            worth {Math.floor((totals.total - totals.earned) / RP_PER_LEVEL)} more levels
          </span>
        </div>

        {/* ---------- controls ---------- */}
        <div
          className="mt-5 flex flex-wrap items-center gap-2 py-3 static sm:sticky sm:top-0 z-10"
          style={{ background: "#0e0f11", borderBottom: "1px solid var(--line)" }}
        >
          {track === "weekly" && (
            <div className="flex" style={{ border: "1px solid var(--line)" }}>
              <SegButton on={week === "all"} onClick={() => setWeek("all")} first>
                All weeks
              </SegButton>
              {allWeeks.map((w) => (
                <SegButton
                  key={w}
                  on={week === w}
                  locked={!isOut(w)}
                  onClick={() => isOut(w) && setWeek(w)}
                >
                  {w}
                </SegButton>
              ))}
            </div>
          )}
          <Seg
            value={status}
            onChange={setStatus}
            options={[
              ["all", "All"],
              ["todo", "To do"],
              ["done", "Done"],
            ]}
          />
          <Seg
            value={sort}
            onChange={setSort}
            options={[
              ["game", "In-game order"],
              ["rp", "Biggest payout"],
              ["cards", "Cheapest buyout"],
            ]}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className="cond"
            style={{ fontSize: 13.5, color: saveState === "failed" ? "#d98a5a" : "#5f6369" }}
          >
            {savingNote}
          </span>
          {confirmReset ? (
            <span className="flex items-center gap-2">
              <button
                onClick={reset}
                className="cond px-3 h-7"
                style={{ fontSize: 13.5, color: "#1b1206", background: "var(--gold)" }}
              >
                Clear everything
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="cond px-2 h-7"
                style={{ fontSize: 13.5, color: "var(--muted)" }}
              >
                Keep it
              </button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="cond px-3 h-7"
              style={{ fontSize: 13.5, color: "var(--muted)", border: "1px solid var(--line)" }}
            >
              Start over
            </button>
          )}
        </div>

        {/* ---------- list ---------- */}
        <main className="mt-6">
          {!ready && (
            <div className="space-y-px">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[78px]"
                  style={{ background: "var(--panel)", opacity: 0.55 - i * 0.08 }}
                />
              ))}
            </div>
          )}

          {ready && shown.length === 0 && (
            <div
              className="px-5 py-12 text-center"
              style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
            >
              <p className="cond m-0" style={{ fontSize: 18, color: "#e8e4dd" }}>
                {status === "done" ? "Nothing ticked off yet." : "Every mission here is done."}
              </p>
              <p className="cond m-0 mt-1" style={{ fontSize: 15, color: "var(--muted)" }}>
                {status === "done"
                  ? "Mark a mission done and it will show up here."
                  : "Switch to All to see the full list again."}
              </p>
            </div>
          )}

          {ready &&
            grouped.map((g) => {
              const t = g.week ? byWeek[g.week] : null;
              const allDone = t ? t.done === t.count : false;
              return (
                <section key={g.week ?? "flat"} className="mb-8">
                  {g.week && t && (
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h2
                        className="cond m-0"
                        style={{ fontSize: 22, fontWeight: 600, color: "#f3f0ea" }}
                      >
                        Week {g.week}
                      </h2>
                      <span className="cond tabular" style={{ fontSize: 15, color: "var(--muted)" }}>
                        {t.done} of {t.count} done · {fmt(t.total - t.earned)} RP left
                      </span>
                      <button
                        onClick={() => markWeek(g.week!, !allDone)}
                        className="cond ml-auto px-2 h-7"
                        style={{ fontSize: 13.5, color: "var(--muted)" }}
                      >
                        {allDone ? "Untick this week" : "Tick the whole week"}
                      </button>
                    </div>
                  )}
                  <div style={{ border: "1px solid var(--line)" }}>
                    {g.list.map((m) => (
                      <MissionRow
                        key={m.id}
                        m={m}
                        done={!!doneMap[m.id]}
                        reps={repMap[m.id] ?? 0}
                        onToggle={() => setDoneMap((s) => ({ ...s, [m.id]: !s[m.id] }))}
                        onStep={(d) =>
                          setRepMap((s) => ({
                            ...s,
                            [m.id]: Math.max(0, Math.min(m.repeats, (s[m.id] ?? 0) + d)),
                          }))
                        }
                      />
                    ))}
                  </div>
                </section>
              );
            })}

          {ready && track === "weekly" && lastOut < TOTAL_WEEKS && week === "all" && (
            <div
              className="px-5 py-7 text-center"
              style={{ border: "1px dashed var(--line)", background: "rgba(26,28,31,.4)" }}
            >
              <p className="cond m-0" style={{ fontSize: 17, color: "var(--muted)" }}>
                Weeks {lastOut + 1}
                {TOTAL_WEEKS > lastOut + 1 ? `–${TOTAL_WEEKS}` : ""} haven't dropped yet.
              </p>
              <p className="cond m-0 mt-1" style={{ fontSize: 14, color: "#5f6369" }}>
                They'll unlock one week at a time and appear in this list.
              </p>
            </div>
          )}
        </main>

        {/* ---------- footnote ---------- */}
        <footer className="mt-10 pt-6" style={{ borderTop: "1px solid var(--line)" }}>
          <p className="cond m-0" style={{ fontSize: 14, color: "#5f6369", maxWidth: "72ch" }}>
            A level costs {RP_PER_LEVEL} RP and the pass runs to {MAX_LEVEL}, so maxing it
            takes {fmt(MAX_LEVEL * RP_PER_LEVEL)} RP. Every weekly and season mission
            together is worth {fmt(figures.poolRp)} RP; the rest comes from matches, BP
            and events. Repeatable missions count at all six turn-ins, and missions
            paying a crate coupon sit outside the RP figures.
          </p>
        </footer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SegButton({
  on,
  locked,
  first,
  onClick,
  children,
}: {
  on: boolean;
  locked?: boolean;
  first?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      title={locked ? "Not released yet" : undefined}
      className="cond px-3 h-8 whitespace-nowrap disabled:cursor-not-allowed"
      style={{
        fontSize: 14,
        minWidth: 34,
        color: on ? "#1b1206" : locked ? "#4a4d52" : "var(--muted)",
        background: on ? "var(--gold)" : "transparent",
        borderLeft: first ? "none" : "1px solid var(--line)",
      }}
    >
      {children}
    </button>
  );
}

function Seg<T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: readonly (readonly [T, string])[];
}) {
  return (
    <div className="flex" style={{ border: "1px solid var(--line)" }}>
      {options.map(([v, label], i) => (
        <SegButton key={String(v)} on={v === value} first={i === 0} onClick={() => onChange(v)}>
          {label}
        </SegButton>
      ))}
    </div>
  );
}
