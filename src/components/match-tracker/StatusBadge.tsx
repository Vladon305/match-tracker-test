
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "Scheduled" | "Ongoing" | "Finished";
  className?: string;
}

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  // Преобразование статуса на русский для отображения
  const getStatusText = (status: string) => {
    switch(status) {
      case "Ongoing": return "Live";
      case "Finished": return "Finished";
      case "Scheduled": return "Match preparing";
      default: return status;
    }
  };

  // Определение цвета бейджа в зависимости от статуса
  const getBadgeColor = (status: string) => {
    switch(status) {
      case "Ongoing": return "bg-[#70B45A] hover:bg-[#70B45A]";
      case "Finished": return "bg-[#EB0237] hover:bg-[#EB0237]";
      case "Scheduled": return "bg-[#F28D35] hover:bg-[#F28D35]";
      default: return "bg-gray-500 hover:bg-gray-500";
    }
  };

  return (
    <Badge 
      variant="default" 
      className={`${getBadgeColor(status)} border-none font-bold px-3 py-1.5 text-xs ${className}`}
    >
      {getStatusText(status)}
    </Badge>
  );
};
