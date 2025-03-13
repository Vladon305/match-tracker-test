import { MatchResponse } from "@/components/match-tracker/types";

const API_BASE_URL = "https://app.ftoyd.com/fronttemp-service";

export const fetchMatches = async (): Promise<MatchResponse> => {
  const response = await fetch(`${API_BASE_URL}/fronttemp`);

  if (!response.ok) {
    throw new Error("Failed to fetch matches");
  }

  return response.json();
};
