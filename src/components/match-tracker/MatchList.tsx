
import { useState } from "react";
import { Match } from "./types";
import { MatchCard } from "./MatchCard";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface MatchListProps {
  matches: Match[];
}

export const MatchList = ({ matches }: MatchListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of matches to display per page
  
  if (matches.length === 0) {
    return (
      <div className="text-white text-center py-8">
        Нет доступных матчей
      </div>
    );
  }
  
  // Calculate total pages
  const totalPages = Math.ceil(matches.length / itemsPerPage);
  
  // Get current page matches
  const indexOfLastMatch = currentPage * itemsPerPage;
  const indexOfFirstMatch = indexOfLastMatch - itemsPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex flex-col gap-3">
      {currentMatches.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
      
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  className="cursor-pointer text-white bg-[#13161E] hover:bg-[#2a2e3a]"
                />
              </PaginationItem>
            )}
            
            {pageNumbers.map(number => (
              <PaginationItem key={number}>
                <PaginationLink
                  onClick={() => handlePageChange(number)}
                  isActive={currentPage === number}
                  className={`cursor-pointer ${
                    currentPage === number 
                      ? "bg-[#EB0237] text-white hover:bg-[#EB0237]/90" 
                      : "text-white bg-[#13161E] hover:bg-[#2a2e3a]"
                  }`}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  className="cursor-pointer text-white bg-[#13161E] hover:bg-[#2a2e3a]"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
