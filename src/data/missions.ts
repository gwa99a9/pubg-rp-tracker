export type Tag =
  | "Elite"
  | "Friend Boost"
  | "Team Boost"
  | "Friend Bonus"
  | "Repeatable"
  | null;

export type Track = "weekly" | "season";

/* ------------------------------------------------------------------ */
/* the season                                                          */
/* ------------------------------------------------------------------ */

/** Name shown on the Royale Pass screen. */
export const SEASON_NAME = "Valkyrie Unbound";
/** Themed Classic Mode running this season. */
export const SEASON_MODE = "Arctic Chronicles";
/** When the pass ends, taken from the in-game countdown. ISO date. */
export const SEASON_ENDS = "2027-01-15";

/** Each RP level costs RP_PER_LEVEL. MAX_LEVEL is a milestone, not a ceiling. */
export const RP_PER_LEVEL = 100;
export const MAX_LEVEL = 100;

/** Weeks the pass runs for. Weeks past `releasedWeeks` are shown but locked. */
export const TOTAL_WEEKS = 5;
export const releasedWeeks: Week[] = [1, 2];

export type Week = 1 | 2 | 3 | 4 | 5;

export type Mission = {
  id: string;
  /** Weekly challenges carry a week. Season challenges don't. */
  week?: Week;
  tag: Tag;
  text: string;
  /** RP paid out per completion. null when the reward is an item, not RP. */
  rp: number | null;
  /** Non-RP reward label, e.g. a crate coupon. */
  item?: string;
  /** How many times this one can be turned in. 1 for all but the weekly grind. */
  repeats: number;
  /** Mission Cards needed to buy this one out. */
  cards?: number;
};

/* ------------------------------------------------------------------ */
/* weekly challenges                                                   */
/* ------------------------------------------------------------------ */

export const weeklyMissions: Mission[] = [
  // ---------- WEEK 1 ----------
  {
    id: "w1-bandages",
    week: 1,
    tag: "Elite",
    text: "Use Bandages 20 times in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "w1-dacia",
    week: 1,
    tag: "Elite",
    text: "Travel more than 2000 meters while operating a specific vehicle (Dacia) in Classic Mode.",
    rp: null,
    item: "Crate coupon ×1",
    repeats: 1,
  },
  {
    id: "w1-grind",
    week: 1,
    tag: "Repeatable",
    text: "(Week 1 only) Spend 60 minutes in matches.",
    rp: 60,
    repeats: 6,
  },
  {
    id: "w1-attachments",
    week: 1,
    tag: "Friend Boost",
    text: "Equip 2 firearms with full attachments at the same time in 3 Classic Mode matches.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "w1-friend-matches",
    week: 1,
    tag: "Friend Bonus",
    text: "Complete 5 matches with friends in Classic Mode.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w1-flaregun",
    week: 1,
    tag: "Team Boost",
    text: "Pick up the Flare Gun in 3 matches with teammates in Classic Mode.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w1-likes",
    week: 1,
    tag: null,
    text: "Give 10 LIKEs to teammates.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w1-arctic-3",
    week: 1,
    tag: null,
    text: "Complete 3 matches in Classic Mode – Arctic Chronicles.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w1-login",
    week: 1,
    tag: null,
    text: "(Week 1 only) Log into the game on a total of 3 days.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w1-homes",
    week: 1,
    tag: null,
    text: "Enter or visit 5 Homes.",
    rp: 30,
    repeats: 1,
    cards: 1,
  },
  {
    id: "w1-gifts",
    week: 1,
    tag: null,
    text: "Send Space Gifts to 1 friend.",
    rp: 30,
    repeats: 1,
    cards: 1,
  },
  {
    id: "w1-kar98",
    week: 1,
    tag: null,
    text: "Pick up a Kar98K 1 time in Classic Mode.",
    rp: 30,
    repeats: 1,
    cards: 1,
  },
  {
    id: "w1-windows",
    week: 1,
    tag: null,
    text: "Break 3 windows in Classic Mode.",
    rp: 30,
    repeats: 1,
    cards: 1,
  },
  {
    id: "w1-vest",
    week: 1,
    tag: "Elite",
    text: "Win a Classic match 1 time while wearing a Military Vest (Lv. 3).",
    rp: 100,
    repeats: 1,
  },

  // ---------- WEEK 2 ----------
  {
    id: "w2-syringe",
    week: 2,
    tag: "Elite",
    text: "Use Adrenaline Syringe 6 times in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "w2-smoke",
    week: 2,
    tag: "Elite",
    text: "Pick up Smoke Grenade in 5 matches in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "w2-survive",
    week: 2,
    tag: "Elite",
    text: "Survive for a total of 60 minutes in Classic Mode.",
    rp: null,
    item: "Crate coupon ×1",
    repeats: 1,
  },
  {
    id: "w2-grind",
    week: 2,
    tag: "Repeatable",
    text: "(Week 2 only) Spend 60 minutes in matches.",
    rp: 60,
    repeats: 6,
  },
  {
    id: "w2-pochinki",
    week: 2,
    tag: "Friend Boost",
    text: "Eliminate 10 enemies with Assault Rifles in Pochinki (Erangel) in Classic Mode.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "w2-akm",
    week: 2,
    tag: "Friend Bonus",
    text: "Eliminate 10 enemies with AKM in Classic Mode.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w2-spetsnaz",
    week: 2,
    tag: "Team Boost",
    text: "Win 3 matches while equipping Spetsnaz Helmet (Lv. 3) with teammates in Classic Mode.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w2-headshots",
    week: 2,
    tag: null,
    text: "Eliminate 5 enemies with headshots in Classic Mode.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w2-aurora",
    week: 2,
    tag: null,
    text: "Use Aurora Blink and double jump once each in Classic Mode – Arctic Chronicles.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w2-login",
    week: 2,
    tag: null,
    text: "(Week 2 only) Log into the game on a total of 3 days.",
    rp: 60,
    repeats: 1,
    cards: 2,
  },
  {
    id: "w2-friend-match",
    week: 2,
    tag: null,
    text: "Complete 1 match with friends in any mode.",
    rp: 30,
    repeats: 1,
    cards: 1,
  },
  {
    id: "w2-health",
    week: 2,
    tag: null,
    text: "Restore 50 Health in Classic Mode.",
    rp: 30,
    repeats: 1,
    cards: 1,
  },
  {
    id: "w2-scarl",
    week: 2,
    tag: null,
    text: "Eliminate 1 enemy with SCAR-L in Classic Mode.",
    rp: 30,
    repeats: 1,
  },
  {
    id: "w2-livik",
    week: 2,
    tag: null,
    text: "Finish in the Top 10 in Livik 1 time in Classic Mode.",
    rp: 30,
    repeats: 1,
  },
];

/* ------------------------------------------------------------------ */
/* season challenges                                                   */
/* ------------------------------------------------------------------ */

export const seasonMissions: Mission[] = [
  {
    id: "s-headshot-dmg",
    tag: null,
    text: "Deal a total of 1000 damage with headshots in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-climb",
    tag: null,
    text: "Climb over obstacles 50 times in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-weapons",
    tag: null,
    text: "Collect 5 different types of weapons in a single Classic Mode match.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-running",
    tag: null,
    text: "Eliminate 10 players while running in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-follow",
    tag: null,
    text: "Follow teammates when jumping 5 times in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-invite-follow",
    tag: null,
    text: "Invite teammates to follow you when jumping 5 times in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-friend-8",
    tag: null,
    text: "Complete 8 matches with friends in any mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-elim-50",
    tag: null,
    text: "Eliminate 50 enemies in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-survive-200",
    tag: null,
    text: "Survive for a total of 200 minutes in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-homecoins",
    tag: null,
    text: "Use a total of 15000 Basic Home Coins.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-roof",
    tag: null,
    text: "Jump and land on a roof in Erangel or Livik 10 times.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-friends-7",
    tag: null,
    text: "Add 7 friends.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-likes-24",
    tag: null,
    text: "Give 24 LIKEs to teammates.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-login-20",
    tag: null,
    text: "Log into the game on a total of 20 days.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-weekend",
    tag: null,
    text: "Complete 10 matches in any mode from Friday to Sunday.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-giftbp",
    tag: null,
    text: "Gift or gift back BP to 10 different friends.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-swim",
    tag: null,
    text: "Swim for a total of 1000 meters in Classic Mode.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-attachments-5",
    tag: null,
    text: "Equip 2 firearms with full attachments at the same time in 5 Classic Mode matches.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },

  // --- the "minutes in the game" ladder ---
  {
    id: "s-min-10",
    tag: null,
    text: "Spend a total of 10 minutes in the game during the season.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-min-20",
    tag: null,
    text: "Spend a total of 20 minutes in the game during the season.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-min-60",
    tag: null,
    text: "Spend a total of 60 minutes in the game during the season.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-min-100",
    tag: null,
    text: "Spend a total of 100 minutes in the game during the season.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-min-200",
    tag: null,
    text: "Spend a total of 200 minutes in the game during the season.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-min-360",
    tag: null,
    text: "Spend a total of 360 minutes in the game during the season.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-min-480",
    tag: null,
    text: "Spend a total of 480 minutes in the game during the season.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-min-600",
    tag: null,
    text: "Spend a total of 600 minutes in the game during the season.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-min-720",
    tag: null,
    text: "Spend a total of 720 minutes in the game during the season.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-min-900",
    tag: null,
    text: "Spend a total of 900 minutes in the game during the season.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },

  {
    id: "s-elim-6",
    tag: null,
    text: "Eliminate 6 enemies in a single Classic Mode match.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-platinum",
    tag: null,
    text: "Reach Platinum or above in Classic Mode.",
    rp: 150,
    repeats: 1,
  },
];

export const allMissions = { weekly: weeklyMissions, season: seasonMissions };
