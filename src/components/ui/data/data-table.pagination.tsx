import React, {type FC, useMemo} from "react";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {type PageControls} from "@/hooks/use-pagination";
import {Translated} from "@/components/ui/translation/translated";

export const DataTablePagination: FC<{
  itemCount: number;
  pager: PageControls;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}> = ({
  itemCount,
  pager,
  pageSize,
  setPageSize,
                                        }) => {
  const pageNumbers = useMemo(() => {
    if (!itemCount) {
      return {
        hasPrevious: false,
        pages: [],
        hasNext: false,
      }
    }

    const previousPages = [pager.page - 4,pager.page - 3,pager.page - 2, pager.page - 1].filter(
      (page) => page > 0,
    )
    const nextPages = [pager.page + 1, pager.page + 2, pager.page + 3, pager.page + 4].filter(
      (page) => page <= Math.ceil(itemCount / pageSize),
    )

    return {
      hasPrevious: pager.page > 1,
      pages: [...previousPages.slice(-2), pager.page, ...nextPages.slice(0,2)],
      hasNext: pager.page < itemCount / pageSize,
    };
  }, [itemCount, pager.page, pageSize])

  return (
    <div className={"flex mt-2 justify-items-center"}>
      <div className={"flex justify-items-start"}>
      <Pagination>
        <PaginationContent>
          {pageNumbers.hasPrevious && (
            <PaginationItem>
              <PaginationFirst
                text={"dataTable.pagination.first"}
                className={"cursor-pointer"} onClick={() => pager.setPage(1)}/>
            </PaginationItem>
          )}
          {pageNumbers.hasPrevious && (
            <PaginationItem>
              <PaginationPrevious
                text={"dataTable.pagination.previous"}
                className={"cursor-pointer"} onClick={() => pager.setPage(pager.page - 1)}/>
            </PaginationItem>
          )}
          {pageNumbers.pages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                className={"cursor-pointer"} onClick={() => pager.setPage(pageNumber)}
                              isActive={pager.page === pageNumber}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pageNumbers.hasNext && (
            <PaginationItem>
              <PaginationNext
                text={"dataTable.pagination.next"}
                className={"cursor-pointer"} onClick={() => pager.setPage(pager.page + 1)}/>
            </PaginationItem>
          )}
          {pageNumbers.hasNext && (
            <PaginationItem>
              <PaginationLast className={"cursor-pointer"}
                              text={"dataTable.pagination.last"}
                              onClick={() => pager.setPage(Math.ceil((itemCount || 0) / pageSize))}/>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      </div>
      <div className={"flex flex-grow justify-items-end"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Translated path={"dataTable.pagination.pageSize"}/> <ChevronDownIcon className="ml-2 h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[10, 20, 30, 40, 50].map((pageCount) => {
              return (
                <DropdownMenuCheckboxItem
                  key={pageCount}
                  className="capitalize"
                  checked={pageSize === pageCount}
                  onCheckedChange={() => {
                    setPageSize(pageCount);
                    pager.setPage(1);
                  }}
                >
                  {pageCount}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
