const API_BASE_URL = 'http://localhost:5001/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface TeamStanding {
  pos: number;
  team: string;
  matches: number;
  wins: number;
  losses: number;
  nr: number;
  nrr: number;
  for: string;
  against: string;
  points: number;
  recentForm: ("W" | "L" | "N")[];
}

export interface MatchScheduleItem {
  id: string;
  matchNumber: string;
  competition: string;
  status: "completed" | "live" | "upcoming";
  startLocalISO: string;
  startUTC: string;
  venue: {
    stadium: string;
    city: string;
  };
  teams: {
    home: { code: string; name: string; shortName: string };
    away: { code: string; name: string; shortName: string };
  };
  result?: string;
  liveScore?: { overs: string; runs: number; wickets: number; batting: string };
}

export interface UpcomingMatch {
  id: string;
  matchNumber: string;
  competition: string;
  status: "upcoming";
  startLocalISO: string;
  startUTC: string;
  dayNight: "Day" | "Night" | "Day/Night";
  venue: {
    stadium: string;
    city: string;
  };
  teams: {
    home: { code: string; name: string; shortName: string };
    away: { code: string; name: string; shortName: string };
  };
}

export interface SeasonOption {
  value: string;
  label: string;
}

// Points Table API
export const getPointsTable = async (season: string = '2025'): Promise<TeamStanding[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/points-table?season=${season}`);
    const result: ApiResponse<{ season: string; pointsTable: TeamStanding[] }> = await response.json();
    
    if (result.success) {
      return result.data.pointsTable;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching points table:', error);
    throw error;
  }
};

export const getAvailableSeasons = async (): Promise<SeasonOption[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/points-table/seasons`);
    const result: ApiResponse<SeasonOption[]> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching seasons:', error);
    throw error;
  }
};

// Match Schedule API
export const getMatchSchedule = async (): Promise<MatchScheduleItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/match-schedule`);
    const result: ApiResponse<{ totalMatches: number; matches: MatchScheduleItem[] }> = await response.json();
    
    if (result.success) {
      return result.data.matches;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching match schedule:', error);
    throw error;
  }
};

export const getLiveMatch = async (): Promise<MatchScheduleItem | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/live-match`);
    const result: ApiResponse<MatchScheduleItem | null> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching live match:', error);
    throw error;
  }
};

export const getUpcomingMatches = async (): Promise<UpcomingMatch[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/upcoming-matches`);
    const result: ApiResponse<{ totalUpcoming: number; matches: UpcomingMatch[] }> = await response.json();
    
    if (result.success) {
      return result.data.matches;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw error;
  }
};

export const getUpcomingMatchesByTeam = async (teamCode: string): Promise<UpcomingMatch[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/upcoming-matches/team/${teamCode}`);
    const result: ApiResponse<{ teamCode: string; totalMatches: number; matches: UpcomingMatch[] }> = await response.json();
    
    if (result.success) {
      return result.data.matches;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching team matches:', error);
    throw error;
  }
};

// Live Match API
export const getLiveMatchStatus = async (): Promise<{ isLive: boolean; matchId?: string; matchNumber?: string; teams?: any; venue?: any; liveScore?: any }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/live-match/status`);
    const result: ApiResponse<{ isLive: boolean; matchId?: string; matchNumber?: string; teams?: any; venue?: any; liveScore?: any }> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching live match status:', error);
    throw error;
  }
};

export const getLiveMatchScore = async (): Promise<{ matchId: string; matchNumber: string; teams: any; liveScore: any; timestamp: string } | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/live-match/score`);
    const result: ApiResponse<{ matchId: string; matchNumber: string; teams: any; liveScore: any; timestamp: string } | null> = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error fetching live match score:', error);
    throw error;
  }
};

// Health check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await response.json();
    return result.status === 'OK';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
