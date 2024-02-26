import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table/table";
import { Input } from "../Input";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { ProductProps } from "@/router/products/type";
import { getAllProducts } from "../../usecase";
import { ComboBoxResponsive } from "../ComboBox";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}
interface CellValues {
    [key: string]: {
        [key: string]: string;
    };
}
export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [cellValues, setCellValues] = useState<CellValues>({});

    const handleChange = (rowId: string, columnId: string, value: string) => {
        const newCellValues = {
            ...cellValues,
            [rowId]: {
                ...(cellValues[rowId] || {}),
                [columnId]: value,
            },
        };
        setCellValues(newCellValues);
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

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
                                                  header.column.columnDef
                                                      .header,
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
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const cellValue =
                                        cellValues[row.id] &&
                                        cellValues[row.id][cell.column.id];

                                    return (
                                        <TableCell key={cell.id}>
                                            {!(cell.column.id == "id") ? (
                                                <Input
                                                    value={cellValue || ""}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            row.id,
                                                            cell.column.id,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <ComboBoxResponsive />
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
