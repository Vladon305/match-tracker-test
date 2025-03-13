
import { MatchCardProps } from "./types";
import { TeamInfo } from "./TeamInfo";
import { StatusBadge } from "./StatusBadge";

export const MatchCard = ({ match }: MatchCardProps) => {
  return (
    <div className="flex justify-between items-center rounded bg-[#13161E] p-5 max-sm:flex-col max-sm:gap-3">
      <div className="flex justify-between items-center flex-1 max-sm:flex-col max-sm:gap-3">
        <TeamInfo
          team={match.homeTeam}
          className="max-sm:w-full max-sm:justify-between"
        />
        <div className="flex flex-col items-center mx-4">
          <div className="text-white text-2xl font-bold my-2 tracking-wider">
            {match.homeScore} : {match.awayScore}
          </div>
          <StatusBadge status={match.status} />
        </div>
        <TeamInfo
          team={match.awayTeam}
          className="max-sm:w-full max-sm:justify-between"
        />
      </div>
    </div>
  );
};
