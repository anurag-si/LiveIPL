export type TeamCode =
  | "MI" | "CSK" | "RCB" | "KKR" | "SRH" | "DC" | "RR" | "PBKS" | "GT" | "LSG";

export interface TeamInfo {
  code: TeamCode;
  name: string;
  shortName: string; // for UI badges
}

export interface VenueInfo {
  stadium: string;
  city: string;
}

export interface UpcomingMatch {
  id: string;             // unique id for routing/keys
  matchNumber: string;    // e.g., "Match 1" (kept as string for flexibility)
  competition: string;    // e.g., "TATA IPL 2025"
  status: "upcoming";
  startLocalISO: string;  // local IST time (ISO with +05:30)
  startUTC: string;       // same instant in UTC (Z)
  dayNight: "Day" | "Night" | "Day/Night";
  venue: VenueInfo;
  teams: {
    home: TeamInfo;
    away: TeamInfo;
  };
}

/**
 * Helper to quickly build team objects by code.
 */
const T: Record<TeamCode, TeamInfo> = {
  MI:  { code: "MI",  name: "Mumbai Indians",             shortName: "MI"  },
  CSK: { code: "CSK", name: "Chennai Super Kings",        shortName: "CSK" },
  RCB: { code: "RCB", name: "Royal Challengers Bengaluru",shortName: "RCB" },
  KKR: { code: "KKR", name: "Kolkata Knight Riders",      shortName: "KKR" },
  SRH: { code: "SRH", name: "Sunrisers Hyderabad",        shortName: "SRH" },
  DC:  { code: "DC",  name: "Delhi Capitals",             shortName: "DC"  },
  RR:  { code: "RR",  name: "Rajasthan Royals",           shortName: "RR"  },
  PBKS:{ code: "PBKS",name: "Punjab Kings",               shortName: "PBKS"},
  GT:  { code: "GT",  name: "Gujarat Titans",             shortName: "GT"  },
  LSG: { code: "LSG", name: "Lucknow Super Giants",       shortName: "LSG" },
};

export const upcomingMatches: UpcomingMatch[] = [
  {
    id: "ipl2025-001",
    matchNumber: "Match 1",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-08-26T19:30:00+05:30",
    startUTC: "2025-08-26T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "Wankhede Stadium", city: "Mumbai" },
    teams: { home: T.MI, away: T.CSK },
  },
  {
    id: "ipl2025-002",
    matchNumber: "Match 2",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-08-28T19:30:00+05:30",
    startUTC: "2025-08-28T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "M. Chinnaswamy Stadium", city: "Bengaluru" },
    teams: { home: T.RCB, away: T.KKR },
  },
  {
    id: "ipl2025-003",
    matchNumber: "Match 3",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-08-30T19:30:00+05:30",
    startUTC: "2025-08-30T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "Rajiv Gandhi Intl. Cricket Stadium", city: "Hyderabad" },
    teams: { home: T.SRH, away: T.DC },
  },
  {
    id: "ipl2025-004",
    matchNumber: "Match 4",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-01T19:30:00+05:30",
    startUTC: "2025-09-01T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "Sawai Mansingh Stadium", city: "Jaipur" },
    teams: { home: T.RR, away: T.PBKS },
  },
  {
    id: "ipl2025-005",
    matchNumber: "Match 5",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-03T19:30:00+05:30",
    startUTC: "2025-09-03T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "Narendra Modi Stadium", city: "Ahmedabad" },
    teams: { home: T.GT, away: T.MI },
  },
  {
    id: "ipl2025-006",
    matchNumber: "Match 6 (Day)",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-05T15:30:00+05:30",
    startUTC: "2025-09-05T10:00:00Z",
    dayNight: "Day",
    venue: { stadium: "Arun Jaitley Stadium", city: "Delhi" },
    teams: { home: T.DC, away: T.CSK },
  },
  {
    id: "ipl2025-007",
    matchNumber: "Match 7 (Night)",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-05T19:30:00+05:30",
    startUTC: "2025-09-05T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "Eden Gardens", city: "Kolkata" },
    teams: { home: T.KKR, away: T.RR },
  },
  {
    id: "ipl2025-008",
    matchNumber: "Match 8",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-07T19:30:00+05:30",
    startUTC: "2025-09-07T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "PCA IS Bindra Stadium", city: "Mohali" },
    teams: { home: T.PBKS, away: T.LSG },
  },
  {
    id: "ipl2025-009",
    matchNumber: "Match 9",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-09T19:30:00+05:30",
    startUTC: "2025-09-09T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "MA Chidambaram Stadium", city: "Chennai" },
    teams: { home: T.CSK, away: T.GT },
  },
  {
    id: "ipl2025-010",
    matchNumber: "Match 10",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-11T19:30:00+05:30",
    startUTC: "2025-09-11T14:00:00Z",
    dayNight: "Day/Night",
    venue: { stadium: "BRSABV Ekana Cricket Stadium", city: "Lucknow" },
    teams: { home: T.LSG, away: T.SRH },
  },
];
