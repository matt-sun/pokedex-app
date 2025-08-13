import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { getSortedRowModel } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function MovesTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [animatingRows, setAnimatingRows] = useState<Set<string>>(new Set());
  const [sorting, setSorting] = useState<SortingState>([]);

  const toggleRow = (rowId: string) => {
    const newExpandedRows = new Set(expandedRows);
    const newAnimatingRows = new Set(animatingRows);

    if (newExpandedRows.has(rowId)) {
      // Start closing animation - remove from expanded but keep in animating
      newExpandedRows.delete(rowId);
      newAnimatingRows.add(rowId);
      setExpandedRows(newExpandedRows);
      setAnimatingRows(newAnimatingRows);

      // Remove from animating after animation completes
      setTimeout(() => {
        setAnimatingRows((prev) => {
          const updated = new Set(prev);
          updated.delete(rowId);
          return updated;
        });
      }, 400);
    } else {
      // Opening animation
      newExpandedRows.add(rowId);
      newAnimatingRows.add(rowId);
      setExpandedRows(newExpandedRows);
      setAnimatingRows(newAnimatingRows);

      // Clear animating state after animation
      setTimeout(() => {
        setAnimatingRows((prev) => {
          const updated = new Set(prev);
          updated.delete(rowId);
          return updated;
        });
      }, 400);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      expandedRows,
      toggleRow,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <Table className="w-full table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const getColumnWidth = (columnIndex: number) => {
                  switch (columnIndex) {
                    case 0:
                      return "min-w-[16%]"; // Name column - 20%
                    case 1:
                      return "min-w-[13%]"; // Type column - 12%
                    default:
                      return "min-w-[9%] w-[10%]"; // Remaining 5 columns split evenly: 45% / 5 = 9%
                  }
                };

                return (
                  <TableHead
                    key={header.id}
                    className={`p-0 text-center ${getColumnWidth(index)}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => toggleRow(row.id)}
                  className="cursor-pointer transition-colors hover:bg-gray-300/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {(expandedRows.has(row.id) || animatingRows.has(row.id)) && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className={`pl-1 pr-2 ${
                        expandedRows.has(row.id)
                          ? "animate-description-in"
                          : "animate-description-out"
                      }`}
                    >
                      <div className="text-sm text-gray-500 text-wrap">
                        {row.getValue("description")}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default MovesTable;
