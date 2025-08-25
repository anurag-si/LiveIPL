import type { TeamCode, TeamInfo, VenueInfo } from "./upcomingMatchData";

// same team helper as before
const T: Record<TeamCode, TeamInfo> = {
  MI:  { code: "MI",  name: "Mumbai Indians", shortName: "MI" },
  CSK: { code: "CSK", name: "Chennai Super Kings", shortName: "CSK" },
  RCB: { code: "RCB", name: "Royal Challengers Bengaluru", shortName: "RCB" },
  KKR: { code: "KKR", name: "Kolkata Knight Riders", shortName: "KKR" },
  SRH: { code: "SRH", name: "Sunrisers Hyderabad", shortName: "SRH" },
  DC:  { code: "DC",  name: "Delhi Capitals", shortName: "DC" },
  RR:  { code: "RR",  name: "Rajasthan Royals", shortName: "RR" },
  PBKS:{ code: "PBKS",name: "Punjab Kings", shortName: "PBKS" },
  GT:  { code: "GT",  name: "Gujarat Titans", shortName: "GT" },
  LSG: { code: "LSG", name: "Lucknow Super Giants", shortName: "LSG" },
};

export type MatchStatus = "completed" | "live" | "upcoming";

export interface MatchScheduleItem {
  id: string;
  matchNumber: string;
  competition: string;
  status: MatchStatus;
  startLocalISO: string;
  startUTC: string;
  venue: VenueInfo;
  teams: { home: TeamInfo; away: TeamInfo };
  result?: string;
  liveScore?: { overs: string; runs: number; wickets: number; batting: TeamCode };
}

export const matchSchedule: MatchScheduleItem[] = [
  // Completed
  {
    id: "ipl2025-001",
    matchNumber: "Match 1",
    competition: "TATA IPL 2025",
    status: "completed",
    startLocalISO: "2025-08-15T19:30:00+05:30",
    startUTC: "2025-08-15T14:00:00Z",
    venue: { stadium: "Wankhede Stadium", city: "Mumbai" },
    teams: { home: T.MI, away: T.CSK },
    result: "MI won by 5 wickets",
  },
  {
    id: "ipl2025-002",
    matchNumber: "Match 2",
    competition: "TATA IPL 2025",
    status: "completed",
    startLocalISO: "2025-08-16T19:30:00+05:30",
    startUTC: "2025-08-16T14:00:00Z",
    venue: { stadium: "M. Chinnaswamy Stadium", city: "Bengaluru" },
    teams: { home: T.RCB, away: T.KKR },
    result: "RCB won by 18 runs",
  },
  {
    id: "ipl2025-003",
    matchNumber: "Match 3",
    competition: "TATA IPL 2025",
    status: "completed",
    startLocalISO: "2025-08-17T19:30:00+05:30",
    startUTC: "2025-08-17T14:00:00Z",
    venue: { stadium: "Eden Gardens", city: "Kolkata" },
    teams: { home: T.KKR, away: T.SRH },
    result: "SRH won by 7 wickets",
  },

  // Live
  {
    id: "ipl2025-004",
    matchNumber: "Match 4",
    competition: "TATA IPL 2025",
    status: "live",
    startLocalISO: "2025-08-24T19:30:00+05:30",
    startUTC: "2025-08-24T14:00:00Z",
    venue: { stadium: "Rajiv Gandhi Intl. Stadium", city: "Hyderabad" },
    teams: { home: T.SRH, away: T.DC },
    liveScore: { overs: "12.3", runs: 97, wickets: 2, batting: "SRH" },
  },

  // Upcoming
  {
    id: "ipl2025-005",
    matchNumber: "Match 5",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-08-26T19:30:00+05:30",
    startUTC: "2025-08-26T14:00:00Z",
    venue: { stadium: "Sawai Mansingh Stadium", city: "Jaipur" },
    teams: { home: T.RR, away: T.PBKS },
  },
  {
    id: "ipl2025-006",
    matchNumber: "Match 6",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-08-27T19:30:00+05:30",
    startUTC: "2025-08-27T14:00:00Z",
    venue: { stadium: "Narendra Modi Stadium", city: "Ahmedabad" },
    teams: { home: T.GT, away: T.MI },
  },
  {
    id: "ipl2025-007",
    matchNumber: "Match 7",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-08-28T19:30:00+05:30",
    startUTC: "2025-08-28T14:00:00Z",
    venue: { stadium: "Arun Jaitley Stadium", city: "Delhi" },
    teams: { home: T.DC, away: T.CSK },
  },
  {
    id: "ipl2025-008",
    matchNumber: "Match 8",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-08-29T19:30:00+05:30",
    startUTC: "2025-08-29T14:00:00Z",
    venue: { stadium: "Eden Gardens", city: "Kolkata" },
    teams: { home: T.KKR, away: T.RR },
  },
  {
    id: "ipl2025-009",
    matchNumber: "Match 9",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-08-30T15:30:00+05:30",
    startUTC: "2025-08-30T10:00:00Z",
    venue: { stadium: "M. Chinnaswamy Stadium", city: "Bengaluru" },
    teams: { home: T.RCB, away: T.LSG },
  },
  {
    id: "ipl2025-010",
    matchNumber: "Match 10",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-01T19:30:00+05:30",
    startUTC: "2025-09-01T14:00:00Z",
    venue: { stadium: "MA Chidambaram Stadium", city: "Chennai" },
    teams: { home: T.CSK, away: T.GT },
  },
  {
    id: "ipl2025-011",
    matchNumber: "Match 11",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-02T19:30:00+05:30",
    startUTC: "2025-09-02T14:00:00Z",
    venue: { stadium: "BRSABV Ekana Stadium", city: "Lucknow" },
    teams: { home: T.LSG, away: T.SRH },
  },
  {
    id: "ipl2025-012",
    matchNumber: "Match 12",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-03T19:30:00+05:30",
    startUTC: "2025-09-03T14:00:00Z",
    venue: { stadium: "PCA IS Bindra Stadium", city: "Mohali" },
    teams: { home: T.PBKS, away: T.DC },
  },
  {
    id: "ipl2025-013",
    matchNumber: "Match 13",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-04T19:30:00+05:30",
    startUTC: "2025-09-04T14:00:00Z",
    venue: { stadium: "Rajiv Gandhi Intl. Stadium", city: "Hyderabad" },
    teams: { home: T.SRH, away: T.MI },
  },
  {
    id: "ipl2025-014",
    matchNumber: "Match 14",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-05T15:30:00+05:30",
    startUTC: "2025-09-05T10:00:00Z",
    venue: { stadium: "Sawai Mansingh Stadium", city: "Jaipur" },
    teams: { home: T.RR, away: T.GT },
  },
  {
    id: "ipl2025-015",
    matchNumber: "Match 15",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-06T19:30:00+05:30",
    startUTC: "2025-09-06T14:00:00Z",
    venue: { stadium: "Wankhede Stadium", city: "Mumbai" },
    teams: { home: T.MI, away: T.RCB },
  },
  {
    id: "ipl2025-016",
    matchNumber: "Match 16",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-07T19:30:00+05:30",
    startUTC: "2025-09-07T14:00:00Z",
    venue: { stadium: "Eden Gardens", city: "Kolkata" },
    teams: { home: T.KKR, away: T.CSK },
  },
  {
    id: "ipl2025-017",
    matchNumber: "Match 17",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-08T19:30:00+05:30",
    startUTC: "2025-09-08T14:00:00Z",
    venue: { stadium: "Arun Jaitley Stadium", city: "Delhi" },
    teams: { home: T.DC, away: T.PBKS },
  },
  {
    id: "ipl2025-018",
    matchNumber: "Match 18",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-09T19:30:00+05:30",
    startUTC: "2025-09-09T14:00:00Z",
    venue: { stadium: "M. Chinnaswamy Stadium", city: "Bengaluru" },
    teams: { home: T.RCB, away: T.SRH },
  },
  {
    id: "ipl2025-019",
    matchNumber: "Match 19",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-10T19:30:00+05:30",
    startUTC: "2025-09-10T14:00:00Z",
    venue: { stadium: "MA Chidambaram Stadium", city: "Chennai" },
    teams: { home: T.CSK, away: T.RR },
  },
  {
    id: "ipl2025-020",
    matchNumber: "Match 20",
    competition: "TATA IPL 2025",
    status: "upcoming",
    startLocalISO: "2025-09-11T19:30:00+05:30",
    startUTC: "2025-09-11T14:00:00Z",
    venue: { stadium: "Narendra Modi Stadium", city: "Ahmedabad" },
    teams: { home: T.GT, away: T.LSG },
  },
];
