import { useNavigate, useLocation } from "react-router-dom"

import {
  ChevronDownIcon,
  GearIcon
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/Dropdown-menu"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button/Button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row justify-between mb-5">
        <Button className="bg-green-600">Create New</Button>


        {table.getFilteredSelectedRowModel().rows.length == 0
          ? <div className="basis-1/3">
            <Input
              placeholder="Search by ..."
              value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("id")?.setFilterValue(event.target.value)
              }
            />
          </div>
          : <div className="flex space-x-5">
            <div className="my-auto px-2 h-8 border-2 border-zinc-500 bg-zinc-50 rounded pointer-events-none">
              {table.getFilteredSelectedRowModel().rows.length} selected
              {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
               {table.getFilteredRowModel().rows.length} row(s) selected. */}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="h-8 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50">
                  <GearIcon className="mr-1" />
                  <span>Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                // onClick={() => delete(quotation.id)}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Update</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }

        <div className="sort-part flex justify-end">
          <DropdownMenu>
            <div className="my-auto mx-2">Sort By:</div>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Select <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={() =>
                        console.log("Sort by " + column.id)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                    !cell.id.includes("select") &&
                    <TableCell
                      key={cell.id}
                      onClick={() => navigate(`${location.pathname}/${row.getUniqueValues('id')}`)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}
