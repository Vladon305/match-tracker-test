
import { TeamInfoProps } from "./types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const TeamInfo = ({ team, className = "" }: TeamInfoProps) => {
  // Получаем инициалы из названия команды для отображения в аватарке
  const getTeamInitials = (teamName: string) => {
    return teamName
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const teamInitials = getTeamInitials(team.name);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className="w-12 h-12 bg-transparent">
        <AvatarFallback className="bg-[#EB0237] text-white">
          {teamInitials}
        </AvatarFallback>
      </Avatar>
      <div className="text-white text-base font-bold">{team.name}</div>
    </div>
  );
};
