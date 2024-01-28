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
} from "@/components/ui/Table/table"

import { ComboBoxResponsive } from "../../ComboBox"
import { Input } from "../../Input"
// import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux";
import { counterSelector } from "./slice/selector";
import { increase } from "./slice";

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
  // const [ammount, setAmmount] = useState<number>(0);
  const { count } = useSelector(counterSelector);
  const dispatch = useDispatch();
  const handleAddProduct = () => {
    dispatch(increase());
  };
  return (
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
          {Array.from({ length: count }).map((_, index) => (
            <TableRow key={index} className="added-product-line">
              <TableCell>
                0
              </TableCell>
              <TableCell>
                <ComboBoxResponsive></ComboBoxResponsive>
              </TableCell>
              <TableCell>
                <Input></Input>
              </TableCell>
              <TableCell>
                <ComboBoxResponsive></ComboBoxResponsive>
              </TableCell>
              <TableCell>
                <Input></Input>
              </TableCell>
              <TableCell>
                <ComboBoxResponsive></ComboBoxResponsive>
              </TableCell>
              <TableCell>
                <div className="text-right font-medium">{new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "VND",
                }).format(100000)}</div>
              </TableCell>
            </TableRow>

          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <a className="text-blue-500 cursor-pointer hover:underline" onClick={handleAddProduct}>Add Product</a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div >
  )
}
