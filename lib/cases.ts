/** Portfolio case studies — shared by the home Work section and /work. */
export type CaseStudy = {
  slug: string;
  org: string;
  type: string;
  tier: "Starter" | "Growth" | "Studio";
  stat: string;
  statLabel: string;
  summary: string;
  challenge: string;
  approach: string[];
  results: { stat: string; label: string }[];
  quote: { text: string; name: string; role: string };
};

export const CASES: CaseStudy[] = [
  {
    slug: "cedar-park-little-league",
    org: "Cedar Park Little League",
    type: "Youth league",
    tier: "Growth",
    stat: "2.1×",
    statLabel: "season reach",
    summary:
      "Reach more than doubled by mid-season; spring sign-ups filled in nine days.",
    challenge:
      "Two hundred kids, eighteen teams, and a website that still listed the 2023 board. Game schedules lived in a PDF nobody could find, and the Instagram account posted whenever someone remembered — which was rarely. Families heard about rainouts in the group chat, or not at all.",
    approach: [
      "Rebuilt the site around the two things families actually check: this week's schedule and how to sign up.",
      "Set a three-posts-a-week rhythm: game recaps, volunteer calls, sponsor thank-yous.",
      "Board president approves everything from her phone in under ten minutes a week.",
      "Monthly report goes straight into the board packet, unedited.",
    ],
    results: [
      { stat: "2.1×", label: "reach by mid-season" },
      { stat: "9 days", label: "to fill spring sign-ups" },
      { stat: "+199", label: "followers in one season" },
    ],
    quote: {
      text: "I used to spend Sunday nights fighting the website. Now I tap approve twice and go watch baseball.",
      name: "Dana Whitfield",
      role: "Board President",
    },
  },
  {
    slug: "harvest-table-food-pantry",
    org: "Harvest Table Food Pantry",
    type: "Nonprofit",
    tier: "Growth",
    stat: "+64%",
    statLabel: "volunteer sign-ups",
    summary:
      "A site people trust and a December drive that outraised the last two combined.",
    challenge:
      "Harvest Table feeds four hundred households a month and looked, online, like it had closed in 2021. Grant reviewers found a dead staff page; would-be volunteers found a contact form that emailed no one. The work was real — the presence said otherwise.",
    approach: [
      "New site led with proof: households served, photos from distribution days, a working volunteer form.",
      "Weekly posts alternate needs (what's short this week) with wins (what donors made happen).",
      "Built the December drive as a four-week campaign with a shared countdown across site, feed, and email.",
      "Every post approved by the director — nothing sentimental she wouldn't say herself.",
    ],
    results: [
      { stat: "+64%", label: "volunteer sign-ups" },
      { stat: "2×", label: "December giving vs. prior two years combined" },
      { stat: "3", label: "grant applications citing the new site" },
    ],
    quote: {
      text: "A funder told us the site was why they took the meeting. The site. We'd been doing this work for nine years.",
      name: "Marcus Osei",
      role: "Executive Director",
    },
  },
  {
    slug: "northside-robotics-boosters",
    org: "Northside Robotics Boosters",
    type: "Student community",
    tier: "Starter",
    stat: "4",
    statLabel: "new sponsors",
    summary:
      "Sponsors could finally find them — four new local backers in one build season.",
    challenge:
      "A state-qualifying robotics team with a Google Doc for a website. Local businesses wanted to help — parents kept hearing it — but there was nothing to point a sponsor at: no team page, no sponsorship tiers, no proof the team existed beyond a trophy case.",
    approach: [
      "One sharp page: the robot, the record, the kids, and three sponsorship tiers with real dollar amounts.",
      "One post a week during build season — progress photos parents actually reshare.",
      "Sponsor logos went up the same week checks cleared. Businesses noticed.",
    ],
    results: [
      { stat: "4", label: "new local sponsors" },
      { stat: "$6,800", label: "raised for the build season" },
      { stat: "1 wk", label: "from handshake to logo on the site" },
    ],
    quote: {
      text: "The hardware store owner said yes before I finished the pitch. He'd already seen the page.",
      name: "Priya Raman",
      role: "Booster Club Lead",
    },
  },
];
