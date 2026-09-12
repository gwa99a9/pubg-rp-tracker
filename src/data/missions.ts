export type Tag =
  | "Elite"
  | "Friend Boost"
  | "Team Boost"
  | "Friend Bonus"
  | "Repeatable"
  | null;

export type Track = "weekly" | "season";

/** Each RP level costs RP_PER_LEVEL, and the pass tops out at MAX_LEVEL. */
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
  /** How many times this one can be turned in. 1 for everything but the weekly grind. */
  repeats: number;
  /** Mission Cards needed to buy this one out. */
  cards?: number;
};

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
    id: "w1-mirado",
    week: 1,
    tag: "Elite",
    text: "Travel more than 2000 meters while operating a specific vehicle (Mirado (Open Top)) in Classic Mode.",
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
    id: "w1-medpack",
    week: 1,
    tag: "Friend Boost",
    text: "Use a Portable Med Pack to heal a teammate 5 times in Classic Mode.",
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
    id: "w1-midnight-3",
    week: 1,
    tag: null,
    text: "Complete 3 matches in Classic Mode – Midnight Hunters.",
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
    id: "w1-vest",
    week: 1,
    tag: "Elite",
    text: "Win a Classic match 1 time while wearing a Military Vest (Lv. 3).",
    rp: 100,
    repeats: 1,
  },
  {
    id: "w1-kar98",
    week: 1,
    tag: null,
    text: "Pick up a Kar98K 1 time in Classic Mode.",
    rp: 30,
    repeats: 1,
  },
  {
    id: "w1-stadium",
    week: 1,
    tag: null,
    text: "Land in any area of Stadium (Rondo) 1 time in Classic Mode.",
    rp: 30,
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
    id: "w2-silvermoon",
    week: 2,
    tag: null,
    text: "Use the Silvermoon Chain and Twilight Bat Wings once each in Classic Mode – Midnight Hunters.",
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
    id: "w2-tinlong",
    week: 2,
    tag: null,
    text: "Land in any area of Tin Long Garden (Rondo) 1 time in Classic Mode.",
    rp: 30,
    repeats: 1,
    cards: 1,
  },
  {
    // Appeared at the bottom of one screenshot and the top of the next.
    // Kept once here.
    id: "w2-akm",
    week: 2,
    tag: "Friend Bonus",
    text: "Eliminate 10 enemies with AKM in Classic Mode.",
    rp: 60,
    repeats: 1,
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

/**
 * Season Challenges — the second tab in game.
 *
 * Nothing here yet. To add them, paste objects in the same shape as the
 * weekly ones above, minus the `week` field:
 *
 *   {
 *     id: "s-example",          // any unique string
 *     tag: "Elite",             // or null / "Friend Boost" / "Team Boost" / ...
 *     text: "Reach Gold tier in Ranked.",
 *     rp: 60,                   // or  rp: null, item: "Crate coupon x1"
 *     repeats: 1,               // 6 for the repeatable grind missions
 *     cards: 2,                 // omit when there is no buyout option
 *   },
 */
export const seasonMissions: Mission[] = [
  {
    id: "s-01",
    tag: null,
    text: "Deal a total of 1000 damage with headshots in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-02",
    tag: null,
    text: "Climb over obstacles 50 times in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-03",
    tag: null,
    text: "Collect 5 different types of weapons in a single Classic Mode match.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-04",
    tag: null,
    text: "Follow teammates when jumping 5 times in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-05",
    tag: null,
    text: "Invite teammates to follow you when jumping 5 times in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-06",
    tag: null,
    text: "Complete 8 matches with friends in any mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-07",
    tag: null,
    text: "Eliminate 50 enemies in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-08",
    tag: null,
    text: "Survive for a total of 200 minutes in Classic Mode.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-09",
    tag: null,
    text: "Jump and land on a roof in Erangel or Livik 10 times.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-10",
    tag: null,
    text: "Add 7 friends.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-11",
    tag: null,
    text: "Give 24 LIKEs to teammates.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-12",
    tag: null,
    text: "Log into the game on a total of 20 days.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-13",
    tag: null,
    text: "Complete 10 matches in any mode from Friday to Sunday.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-14",
    tag: null,
    text: "Gift or gift back BP to 10 different friends.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-15",
    tag: null,
    text: "Swim for a total of 1000 meters in Classic Mode.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-16",
    tag: null,
    text: "Equip 2 firearms with full attachments at the same time in 5 Classic Mode matches.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-17",
    tag: null,
    text: "Spend a total of 100 minutes in the game during the season.",
    rp: 100,
    repeats: 1,
    cards: 4,
  },
  {
    id: "s-18",
    tag: null,
    text: "Spend a total of 200 minutes in the game during the season.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-19",
    tag: null,
    text: "Spend a total of 360 minutes in the game during the season.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-20",
    tag: null,
    text: "Spend a total of 480 minutes in the game during the season.",
    rp: 150,
    repeats: 1,
    cards: 6,
  },
  {
    id: "s-21",
    tag: null,
    text: "Spend a total of 600 minutes in the game during the season.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-22",
    tag: null,
    text: "Spend a total of 720 minutes in the game during the season.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-23",
    tag: null,
    text: "Spend a total of 900 minutes in the game during the season.",
    rp: 200,
    repeats: 1,
    cards: 8,
  },
  {
    id: "s-24",
    tag: null,
    text: "Eliminate 6 enemies in a single Classic Mode match.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-25",
    tag: null,
    text: "Eliminate 10 players while running in Classic Mode.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-26",
    tag: null,
    text: "Use a total of 15000 Basic Home Coins.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-27",
    tag: null,
    text: "Reach Platinum or above in Classic Mode.",
    rp: 150,
    repeats: 1,
  },
  {
    id: "s-28",
    tag: null,
    text: "Spend a total of 10 minutes in the game during the season.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-29",
    tag: null,
    text: "Spend a total of 20 minutes in the game during the season.",
    rp: 100,
    repeats: 1,
  },
  {
    id: "s-30",
    tag: null,
    text: "Spend a total of 60 minutes in the game during the season.",
    rp: 100,
    repeats: 1,
  },
];

export const allMissions = { weekly: weeklyMissions, season: seasonMissions };
