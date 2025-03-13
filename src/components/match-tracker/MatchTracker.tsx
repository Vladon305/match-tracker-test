import { useState, useEffect } from "react";
import { Match } from "./types";
import { MatchList } from "./MatchList";
import { fetchMatches } from "@/services/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MatchTracker = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadMatches = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetchMatches();
      setMatches(response.data.matches);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const handleRefresh = () => {
    loadMatches();
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] p-8 max-sm:p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 max-md:flex-col max-md:items-start max-md:gap-5">
          <h1 className="text-white text-3xl font-bold italic">
            Match Tracker
          </h1>
          <div className="flex items-center gap-3 max-md:w-full max-md:flex-col">
            {hasError && (
              <Alert
                variant="destructive"
                className="bg-[#13161E] border-none text-white p-2 max-md:w-full flex items-center gap-2.5"
              >
                <AlertTriangle className="h-5 w-5 text-[#EB0237]" />
                <AlertDescription>
                  Ошибка: не удалось загрузить информацию
                </AlertDescription>
              </Alert>
            )}
            <Button
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded text-white text-sm font-bold cursor-pointer bg-[#EB0237] hover:bg-[#EB0237]/90 border-none max-md:w-full h-auto px-4 py-2"
              disabled={isLoading}
            >
              <span>Обновить</span>
              <RefreshCcw
                className={`h-4 w-4 text-white ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
            </Button>
          </div>
        </header>
        {isLoading ? <LoadingIndicator /> : <MatchList matches={matches} />}
      </div>
    </main>
  );
};

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#EB0237] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};
