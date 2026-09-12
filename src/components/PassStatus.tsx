import { useEffect, useState } from "react";
import { MAX_LEVEL, RP_PER_LEVEL } from "@/data/missions";

const fmt = (n: number) => n.toLocaleString("en-US");
const RP_CAP = MAX_LEVEL * RP_PER_LEVEL;

export type StatusFigures = {
  /** RP the player holds from everything except the missions in the lists. */
  baseRp: number;
  bankedRp: number;
  remainingRp: number;
  weeklyLeft: number;
  seasonLeft: number;
  poolRp: number;
  cardsLeft: number;
  couponsLeft: number;
  missionsLeft: number;
};

function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: string;
}) {
  return (
    <div className="min-w-0">
      <p className="cond m-0" style={{ fontSize: 13.5, color: "var(--muted)" }}>
        {label}
      </p>
      <p
        className="cond tabular m-0 leading-tight"
        style={{ fontSize: 23, fontWeight: 600, color: tone ?? "#e8e4dd" }}
      >
        {value}
      </p>
      {sub && (
        <p className="cond tabular m-0" style={{ fontSize: 13, color: "#5f6369" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/** Number box that lets you clear it while typing without snapping to 0. */
function NumberField({
  id,
  value,
  max,
  step,
  width,
  onCommit,
}: {
  id: string;
  value: number;
  max: number;
  step: number;
  width: number;
  onCommit: (n: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  return (
    <input
      id={id}
      type="number"
      inputMode="numeric"
      min={0}
      max={max}
      step={step}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value);
        if (e.target.value === "") return;
        const n = Number(e.target.value);
        if (Number.isFinite(n)) onCommit(Math.max(0, Math.min(max, Math.floor(n))));
      }}
      onBlur={() => {
        if (draft === "") {
          setDraft("0");
          onCommit(0);
        }
      }}
      className="cond tabular h-8 px-2"
      style={{
        fontSize: 15,
        width,
        color: "#e8e4dd",
        background: "#16181b",
        border: "1px solid var(--line)",
      }}
    />
  );
}

export function PassStatus({
  f,
  onBaseRpChange,
}: {
  f: StatusFigures;
  onBaseRpChange: (n: number) => void;
}) {
  const heldRp = Math.min(RP_CAP, f.baseRp + f.bankedRp);
  const level = Math.min(MAX_LEVEL, Math.floor(heldRp / RP_PER_LEVEL));
  const intoLevel = level >= MAX_LEVEL ? RP_PER_LEVEL : heldRp % RP_PER_LEVEL;
  const toNext = level >= MAX_LEVEL ? 0 : RP_PER_LEVEL - intoLevel;

  const finishAll = Math.min(MAX_LEVEL, Math.floor((heldRp + f.remainingRp) / RP_PER_LEVEL));
  const shortfall = Math.max(0, RP_CAP - heldRp - f.remainingRp);
  const levelPct = level / MAX_LEVEL;

  const nudge = (d: number) => onBaseRpChange(Math.max(0, Math.min(RP_CAP, f.baseRp + d)));

  return (
    <section
      className="mt-8"
      style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
      aria-label="Royale Pass level"
    >
      <div className="px-5 sm:px-6 pt-5 pb-5">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
          <div>
            <p className="cond m-0" style={{ fontSize: 13.5, color: "var(--muted)" }}>
              Royale Pass level
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className="cond tabular"
                style={{ fontSize: 72, lineHeight: 0.85, fontWeight: 700, color: "var(--gold)" }}
              >
                {level}
              </span>
              <span className="cond" style={{ fontSize: 21, color: "var(--gold-deep)" }}>
                of {MAX_LEVEL}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-[220px] pb-1">
            <div className="h-[10px] w-full" style={{ background: "#24262a" }}>
              <div
                className="h-full"
                style={{
                  width: `${(intoLevel / RP_PER_LEVEL) * 100}%`,
                  background: "linear-gradient(90deg,#a97505,#ffd766)",
                  transition: "width .35s cubic-bezier(.16,1,.3,1)",
                }}
              />
            </div>
            <p className="cond tabular m-0 mt-2" style={{ fontSize: 14.5, color: "#e8e4dd" }}>
              {level >= MAX_LEVEL
                ? "Pass maxed out."
                : `${intoLevel} of ${RP_PER_LEVEL} RP into this level — ${toNext} more reaches level ${level + 1}.`}
            </p>
          </div>
        </div>

        {/* whole-pass ruler */}
        <div className="mt-5">
          <div className="relative h-[6px] w-full" style={{ background: "#24262a" }}>
            <div
              className="h-full"
              style={{
                width: `${levelPct * 100}%`,
                background: "var(--gold-deep)",
                transition: "width .35s cubic-bezier(.16,1,.3,1)",
              }}
            />
            <div
              className="absolute top-0 h-full"
              style={{
                left: `${levelPct * 100}%`,
                width: `${Math.max(0, (finishAll - level) / MAX_LEVEL) * 100}%`,
                background: "repeating-linear-gradient(90deg,#5c4a1f 0 6px,transparent 6px 11px)",
              }}
            />
          </div>
          <p className="cond tabular m-0 mt-2" style={{ fontSize: 13.5, color: "var(--muted)" }}>
            Solid is where you are. Hatched is where every remaining mission would carry
            you — level {finishAll}.
          </p>
        </div>
      </div>

      {/* ---------- the adjustable total ---------- */}
      <div
        className="px-5 sm:px-6 py-4"
        style={{ borderTop: "1px solid var(--line)", background: "rgba(0,0,0,.18)" }}
      >
        <label className="cond block" htmlFor="base-rp" style={{ fontSize: 14, color: "var(--muted)" }}>
          RP you hold outside these missions
        </label>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-2">
            <NumberField
              id="base-rp"
              value={f.baseRp}
              max={RP_CAP}
              step={10}
              width={92}
              onCommit={onBaseRpChange}
            />
            <span className="cond" style={{ fontSize: 14, color: "var(--muted)" }}>
              RP
            </span>
          </div>

          <div className="flex" style={{ border: "1px solid var(--line)" }}>
            {[-100, -10, 10, 100].map((d, i) => (
              <button
                key={d}
                onClick={() => nudge(d)}
                aria-label={`${d > 0 ? "Add" : "Subtract"} ${Math.abs(d)} RP`}
                className="cond tabular px-2.5 h-8"
                style={{
                  fontSize: 14,
                  color: "var(--bone)",
                  borderLeft: i ? "1px solid var(--line)" : "none",
                }}
              >
                {d > 0 ? `+${d}` : d}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="cond" htmlFor="base-level" style={{ fontSize: 14, color: "var(--muted)" }}>
              or set by level
            </label>
            <NumberField
              id="base-level"
              value={Math.floor(f.baseRp / RP_PER_LEVEL)}
              max={MAX_LEVEL}
              step={1}
              width={64}
              onCommit={(n) => onBaseRpChange(n * RP_PER_LEVEL)}
            />
          </div>
        </div>

        <p className="cond tabular m-0 mt-3" style={{ fontSize: 14, color: "#e8e4dd" }}>
          {fmt(f.baseRp)} + {fmt(f.bankedRp)} from ticked missions ={" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>{fmt(heldRp)} RP</span> so
          far.
        </p>
        <p className="cond m-0 mt-1" style={{ fontSize: 13, color: "#5f6369" }}>
          Bump this figure whenever RP arrives from somewhere else — matches, BP, events,
          rank rewards. Keep the missions below as ticks so they aren't counted twice.
        </p>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-5 px-5 sm:px-6 py-5"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <Stat
          label="RP so far"
          value={fmt(heldRp)}
          sub={`${level} ${level === 1 ? "level" : "levels"} banked`}
          tone="var(--gold)"
        />
        <Stat
          label="Still to claim"
          value={`${fmt(f.remainingRp)} RP`}
          sub={`weekly ${fmt(f.weeklyLeft)} · season ${fmt(f.seasonLeft)}`}
        />
        <Stat
          label="Missions left"
          value={fmt(f.missionsLeft)}
          sub={`${fmt(f.cardsLeft)} mission cards to buy out`}
        />
        <Stat
          label={shortfall > 0 ? "Short of level 100" : "Spare RP over level 100"}
          value={`${fmt(shortfall > 0 ? shortfall : heldRp + f.remainingRp - RP_CAP)} RP`}
          sub={shortfall > 0 ? "must come from matches and BP" : "missions alone cover it"}
          tone={shortfall > 0 ? "#d98a5a" : "#7fb069"}
        />
      </div>
    </section>
  );
}
