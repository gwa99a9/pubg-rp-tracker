import { MAX_LEVEL, RP_PER_LEVEL } from "@/data/missions";

const fmt = (n: number) => n.toLocaleString("en-US");

export type StatusFigures = {
  baseLevel: number;
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

export function PassStatus({
  f,
  onLevelChange,
}: {
  f: StatusFigures;
  onLevelChange: (n: number) => void;
}) {
  const heldRp = f.baseLevel * RP_PER_LEVEL + f.bankedRp;
  const level = Math.min(MAX_LEVEL, Math.floor(heldRp / RP_PER_LEVEL));
  const intoLevel = level >= MAX_LEVEL ? RP_PER_LEVEL : heldRp % RP_PER_LEVEL;
  const toNext = level >= MAX_LEVEL ? 0 : RP_PER_LEVEL - intoLevel;

  const finishAll = Math.min(MAX_LEVEL, Math.floor((heldRp + f.remainingRp) / RP_PER_LEVEL));
  const capRp = MAX_LEVEL * RP_PER_LEVEL;
  const shortfall = Math.max(0, capRp - heldRp - f.remainingRp);
  const levelPct = level / MAX_LEVEL;

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

      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-5 px-5 sm:px-6 py-5"
        style={{ borderTop: "1px solid var(--line)", background: "rgba(0,0,0,.18)" }}
      >
        <Stat
          label="Banked from missions"
          value={`${fmt(f.bankedRp)} RP`}
          sub={(() => {
            const lv = Math.floor(f.bankedRp / RP_PER_LEVEL);
            return lv === 1 ? "1 level so far" : `${lv} levels so far`;
          })()}
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
          value={`${fmt(shortfall > 0 ? shortfall : heldRp + f.remainingRp - capRp)} RP`}
          sub={shortfall > 0 ? "must come from matches and BP" : "missions alone cover it"}
          tone={shortfall > 0 ? "#d98a5a" : "#7fb069"}
        />
      </div>

      <div
        className="px-5 sm:px-6 py-3 flex flex-wrap items-center gap-x-3 gap-y-2"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <label className="cond" htmlFor="base-level" style={{ fontSize: 14, color: "var(--muted)" }}>
          Level you're already at in game
        </label>
        <input
          id="base-level"
          type="number"
          min={0}
          max={MAX_LEVEL}
          value={f.baseLevel}
          onChange={(e) => {
            const n = Number(e.target.value);
            onLevelChange(Number.isFinite(n) ? Math.max(0, Math.min(MAX_LEVEL, Math.floor(n))) : 0);
          }}
          className="cond tabular w-[72px] h-8 px-2"
          style={{
            fontSize: 15,
            color: "#e8e4dd",
            background: "#16181b",
            border: "1px solid var(--line)",
          }}
        />
        <span className="cond" style={{ fontSize: 13.5, color: "#5f6369" }}>
          Ticked missions stack on top of this, so set it before you start ticking.
        </span>
      </div>
    </section>
  );
}
