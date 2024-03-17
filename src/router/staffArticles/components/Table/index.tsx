import { useNavigate, useLocation } from "react-router-dom"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { SearchField } from "../Input/SearchField"
import { PrintButton, CreateButton } from "../Button"
import { ActionsDropdownMenu } from "../DropdownMenu/Actions"
import { SortButton } from "../Button/SortButton"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setSearchField: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSortField: React.Dispatch<React.SetStateAction<string>>;
  setDescending: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSearchField,
  setSearchValue,
  setSortField,
  setDescending,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex space-x-5 justify-center mb-3">
        <div className="my-auto px-2 h-8 border-2 border-zinc-500 bg-zinc-50 rounded pointer-events-none">
          {table.getFilteredSelectedRowModel().rows.length} Selected
        </div>
        <PrintButton></PrintButton>
        <ActionsDropdownMenu ids={table.getSelectedRowModel().rows.map(item => item.getValue('id'))}></ActionsDropdownMenu>
      </div>

      <div className="flex flex-row justify-between mb-5">

        <div className="basis-1/2 flex space-x-2">
          <SearchField setSearchField={setSearchField} setSearchValue={setSearchValue}></SearchField>
        </div>

        <div className="flex justify-end">
          <CreateButton></CreateButton>
        </div>
      </div>
      <div className="rounded-md border mb-5">
        <Table>
          <TableHeader className="bg-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const headerId = header.getContext().column.id
                  return (
                    <TableHead key={header.id} className="text-neutral-700">
                      <div className="flex flex-row items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                        {["id", "title"].includes(headerId) &&
                          <SortButton sortField={headerId} setSortField={setSortField} setDescending={setDescending}></SortButton>
                        }
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    cell.id.includes("select") &&
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {row.getVisibleCells().map((cell) => (
                    !cell.id.includes("select") && !cell.id.includes("actions") &&
                    <TableCell
                      key={cell.id}
                      onClick={() => navigate(
                        `${location.pathname}/${(row.original as { id: string }).id}`
                      )}
                      className="cursor-pointer"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {row.getVisibleCells().map((cell) => (
                    cell.id.includes("actions") &&
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
