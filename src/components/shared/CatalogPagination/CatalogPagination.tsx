'use client';

import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface CatalogPaginationProps {
  currentPage: number;
  numberOfPages: number;
  sectionId?: string;
}

export default function CatalogPagination({
  currentPage,
  numberOfPages,
  sectionId,
}: CatalogPaginationProps) {
  const router = useRouter();

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    newPage: number
  ) => {
    e.preventDefault(); 
    if (newPage === currentPage || newPage < 1 || newPage > numberOfPages) return;

    
    router.push(`?page=${newPage}`);

    
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  
  const generatePagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (numberOfPages <= maxVisiblePages) {
      
      for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i);
      }
    } else {
      
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', numberOfPages);
      } else if (currentPage >= numberOfPages - 2) {
        pages.push(1, 'ellipsis', numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages);
      } else {
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', numberOfPages);
      }
    }
    return pages;
  };

  if (numberOfPages <= 1) return null;

  return (
    <div className="flex justify-center w-full py-8">
      
      <div className="bg-white dark:bg-slate-900 px-2 py-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <Pagination>
          <PaginationContent className="gap-1">
            
            
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => handlePageChange(e, currentPage - 1)}
                className={cn(
                  "rounded-xl transition-all duration-300",
                  currentPage === 1 
                    ? "pointer-events-none opacity-50" 
                    : "hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400"
                )}
              />
            </PaginationItem>

            
            {generatePagination().map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis className="text-slate-400" />
                  </PaginationItem>
                );
              }

              const pageNum = page as number;
              const isActive = currentPage === pageNum;

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => handlePageChange(e, pageNum)}
                    isActive={isActive}
                    className={cn(
                      "rounded-xl font-semibold transition-all duration-300 h-9 w-9",
                      isActive
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white border-none shadow-md shadow-emerald-500/20"
                        : "hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border-transparent"
                    )}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => handlePageChange(e, currentPage + 1)}
                className={cn(
                  "rounded-xl transition-all duration-300",
                  currentPage === numberOfPages 
                    ? "pointer-events-none opacity-50" 
                    : "hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400"
                )}
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}