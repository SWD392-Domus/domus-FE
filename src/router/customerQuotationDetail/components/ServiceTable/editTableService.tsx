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
import { useState } from "react";

import { Button } from "@/components/ui/Button/Button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { actions } from "../../slice";
import { ServiceComboBox } from "../ServiceComboBox";
export interface ProductDetails {
    images: {
        imageUrl: string;
    }[];
    attributes: {
        name: string;
        value: string;
    }[];
    displayPrice: number;
}
type Status = {
    value: string;
    label: string;
    id: string;
    name: string;
    price: number;
    monetaryUnit: string;
};
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    serviceCellValues: CellValues;
    setServiceCellValues: React.Dispatch<React.SetStateAction<CellValues>>;
}
interface CellValues {
    [key: string]: {
        [key: string]: string;
    };
}
export function EditTableService<TData, TValue>({
    columns,
    data,
    serviceCellValues,
    setServiceCellValues,
}: DataTableProps<TData, TValue>) {
    const dispatch = useDispatch();

    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

    const handleChange = (
        rowId: string,
        columnId: string,
        value: string | Status | null,
        fromComboBox: boolean = false
    ) => {
        let newCellValues = {};
        if (fromComboBox) {
            newCellValues = {
                ...serviceCellValues,
                [rowId]: value,
            };
        } else {
            newCellValues = {
                ...serviceCellValues,
                [rowId]: {
                    ...(serviceCellValues[rowId] || {}),
                    [columnId]: fromComboBox ? value : value?.toString(),
                },
            };
            if (columnId == "quantity" || "price") {
                newCellValues[rowId].priceSum = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                }).format(
                    parseFloat(newCellValues[rowId].quantity as string) *
                    parseFloat(newCellValues[rowId].price as string) *
                    1000
                );
            }
        }

        setServiceCellValues(newCellValues as CellValues);
    };

    const handleComboBoxChange = (
        rowId: string,
        columnId: string,
        value: Status | null
    ) => {
        handleChange(rowId, columnId, value, true);
        setSelectedStatus(value); // Set the state in the parent component
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleDeleteService = (id: string) => {
        dispatch(actions.deleteServiceRow(id));
        delete serviceCellValues[id];
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
                                        serviceCellValues[row.id] &&
                                        serviceCellValues[row.id][
                                        cell.column.id
                                        ];

                                    return (
                                        <TableCell key={cell.id}>
                                            {cell.column.id == "delete" ? (
                                                <Button
                                                    className="flex justify-center items-center cursor-pointer"
                                                    variant={"ghost"}
                                                    onClick={() =>
                                                        handleDeleteService(
                                                            row.id
                                                        )
                                                    }
                                                >
                                                    <TrashIcon
                                                        color="red"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </Button>
                                            ) : !(
                                                cell.column.id == "action"
                                            ) ? (
                                                <Input
                                                    value={cellValue || ""}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            row.id,
                                                            cell.column.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    readOnly={
                                                        cell.column.id ==
                                                        "priceSum"
                                                    }
                                                    className={
                                                        cell.column.id == "name"
                                                            ? "w-full"
                                                            : ""
                                                    }
                                                />
                                            ) : (
                                                <ServiceComboBox
                                                    selectedStatus={
                                                        selectedStatus as Status
                                                    }
                                                    setSelectedStatus={(
                                                        value: Status | null
                                                    ) =>
                                                        handleComboBoxChange(
                                                            row.id,
                                                            cell.column.id,
                                                            value
                                                        )
                                                    }
                                                    value={cellValue}
                                                />
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
