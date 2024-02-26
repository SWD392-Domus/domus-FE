import { useNavigate, useLocation } from "react-router-dom";

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
} from "./table";

import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/Command";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useDispatch } from "react-redux";
import { actions } from "../../slice";
import { getAllServices } from "../../usecase/getAllServices";
import { ServiceProps } from "../../types";
import { ActionsDropdownMenu } from "./Actions";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>();
    const [services, setServices] = useState<ServiceProps[]>();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const location = useLocation();
    const navigate = useNavigate();
    const fetchData = async () => {
        const res = await getAllServices();

        setServices(res);
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleAddProduct = (item: ServiceProps) => {
        dispatch(actions.addService(item as ServiceProps & void));

        setOpen(false);
    };

    return (
        <div className="">
            <div className="flex space-x-5 justify-center mb-3">
                <Button onClick={() => setOpen(true)}>Add Sevice</Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder="Search For Products..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {services &&
                            services.map((item) => {
                                return (
                                    <CommandItem
                                        key={item.id}
                                        onSelect={() => handleAddProduct(item)}
                                    >
                                        <span className="text-md">
                                            {item.name}
                                        </span>
                                    </CommandItem>
                                );
                            })}
                    </CommandList>
                </CommandDialog>
                <div className="my-auto px-2 h-8 border-2 border-zinc-500 bg-zinc-50 rounded pointer-events-none">
                    {table.getFilteredSelectedRowModel().rows.length} Selected
                </div>

                <ActionsDropdownMenu
                    ids={table
                        .getSelectedRowModel()
                        .rows.map((item) => item.getValue("id"))}
                ></ActionsDropdownMenu>
            </div>

            <div className="flex flex-row justify-between mb-5">
                <div className="basis-1/2 flex space-x-2"></div>
            </div>
            <div className="rounded-md border mb-5">
                <Table>
                    <TableHeader className="bg-slate-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const headerId =
                                        header.column.columnDef.header;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="text-neutral-700"
                                        >
                                            <div className="flex flex-row items-center gap-1">
                                                <span>
                                                    {headerId as string}
                                                </span>
                                            </div>
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
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row
                                        .getVisibleCells()
                                        .map(
                                            (cell) =>
                                                cell.id.includes("select") && (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                )
                                        )}
                                    {row.getVisibleCells().map(
                                        (cell) =>
                                            !cell.id.includes("select") &&
                                            !cell.id.includes("actions") && (
                                                <TableCell
                                                    key={cell.id}
                                                    onClick={() =>
                                                        navigate(
                                                            `${
                                                                location.pathname
                                                            }/${row.getValue(
                                                                "id"
                                                            )}`
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            )
                                    )}
                                    {row
                                        .getVisibleCells()
                                        .map(
                                            (cell) =>
                                                cell.id.includes("actions") && (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                )
                                        )}
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
        </div>
    );
}
