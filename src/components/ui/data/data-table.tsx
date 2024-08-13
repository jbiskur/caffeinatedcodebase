"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type Cell,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, ArrowUpDownIcon, Loader2Icon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useDebounce } from "use-debounce";
import { Translated } from "../translation/translated";
import { useTranslation } from "../translation/use-translation";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableHiding?: boolean;
  searchValue?: string;
  isLoading?: boolean;
  onSearchValueChange?: (value: string) => void;
  onSortChange?: (value: SortingState) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  cellNode,
  searchValue,
  isLoading,
  onSortChange,
  onSearchValueChange,
  enableHiding = true,
}: DataTableProps<TData, TValue> & { cellNode?: (row: Row<TData>, cell: Cell<TData, TValue>) => ReactNode }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchTerm, setSearchTerm] = useState(searchValue ?? "");
  const [value] = useDebounce(searchTerm, 500);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { translator } = useTranslation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (onSearchValueChange) {
      onSearchValueChange(value);
    }
  }, [value, onSearchValueChange]);

  useEffect(() => {
    if (onSortChange) {
      onSortChange(sorting);
    }
  }, [sorting, onSortChange]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex w-full items-center gap-2 py-2">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full rounded-lg border bg-accent p-2"
            ref={searchInputRef}
          />
        </div>
        {enableHiding && columns.filter((col) => col.enableHiding !== false).length > 1 && (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize cursor-pointer"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.columnDef.header as ReactNode}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className={`rounded-md border ${columns.filter((col) => col.enableHiding).length <= 1 ? "mt-2" : ""}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={twMerge(
                            "flex flex-row items-center gap-2 space-x-2",
                            header.column.getCanSort() ? "cursor-pointer select-none" : "",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? translator("dataTable.sorting.ascending")
                                : header.column.getNextSortingOrder() === "desc"
                                  ? translator("dataTable.sorting.descending")
                                  : translator("dataTable.sorting.clear")
                              : undefined
                          }
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() &&
                            ({
                              asc: <ArrowDownWideNarrowIcon className="h-4 w-4" />,
                              desc: <ArrowDownNarrowWideIcon className="h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? <ArrowUpDownIcon className="h-4 w-4" />)}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} className="align-middle">
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <Translated path="dataTable.loading" />
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {!isLoading && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cellNode ? cellNode(row, cell) : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </>
  );
}
