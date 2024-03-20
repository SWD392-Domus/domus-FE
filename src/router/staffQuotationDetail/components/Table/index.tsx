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
import { ComboBoxResponsive } from "../ComboBox";
import { Button } from "@/components/ui/Button/Button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { actions } from "../../slice";
import { toastError } from "@/components/Toast";
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
    id?: string;
    productName?: string;
    description?: string;
    details?: ProductDetails[];
    price?: string;
};
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    cellValues: CellValues;
    setCellValues: React.Dispatch<React.SetStateAction<CellValues>>;
}
interface CellValues {
    [key: string]: {
        [key: string]: string;
    };
}

export function EditDataTable<TData, TValue>({
    columns,
    data,
    cellValues,
    setCellValues,
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
                ...cellValues,
                [rowId]: value,
            };
        } else {
            newCellValues = {
                ...cellValues,
                [rowId]: {
                    ...(cellValues[rowId] || {}),
                    [columnId]: fromComboBox ? value : value?.toString(),
                },
            };
            if (columnId == "quantity" || "price") {
                newCellValues[rowId].priceSum = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "VND",
                }).format(
                    parseFloat(newCellValues[rowId].quantity as string) *
                        parseFloat(newCellValues[rowId].price as string)
                );
            }
        }

        setCellValues(newCellValues as CellValues);
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
    const handleDeleteProduct = (id: string) => {
        dispatch(actions.deleteRow(id));
        const updatedCellValues = { ...cellValues };
        delete updatedCellValues[id];
        const reindexedValues = {};
        let newIndex = 0;
        for (const key in updatedCellValues) {
            reindexedValues[newIndex++] = updatedCellValues[key];
        }

        setCellValues(reindexedValues);
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
                                        cellValues[row.id] &&
                                        cellValues[row.id][cell.column.id];

                                    return (
                                        <TableCell key={cell.id}>
                                            {cell.column.id == "delete" ? (
                                                <Button
                                                    className="flex justify-center items-center cursor-pointer"
                                                    variant={"ghost"}
                                                    onClick={() =>
                                                        handleDeleteProduct(
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
                                                cell.column.id == "price" ? (
                                                    <Input
                                                        value={cellValue || ""}
                                                        type="number"
                                                        min="0"
                                                        max="999999999999"
                                                        onChange={(e) => {
                                                            let newValue =
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                );
                                                            // Check if the entered value is within the range [0, 999]
                                                            if (
                                                                (newValue >=
                                                                    1 &&
                                                                    newValue <=
                                                                        999999999999) ||
                                                                e.target
                                                                    .value == ""
                                                            ) {
                                                                handleChange(
                                                                    row.id,
                                                                    cell.column
                                                                        .id,
                                                                    e.target
                                                                        .value
                                                                );
                                                            } else if (
                                                                newValue < 0
                                                            ) {
                                                                handleChange(
                                                                    row.id,
                                                                    cell.column
                                                                        .id,
                                                                    "0"
                                                                ); // Set to 0 if smaller than 0
                                                                toastError(
                                                                    "This must be greater then 0"
                                                                );
                                                            } else {
                                                                handleChange(
                                                                    row.id,
                                                                    cell.column
                                                                        .id,
                                                                    "999999999999"
                                                                ); // Set to 999 if larger than 999
                                                                toastError(
                                                                    "This  field must be greater then less then or equal đ999,999,999,999"
                                                                );
                                                            }
                                                        }}
                                                        readOnly={
                                                            !cellValues[row.id]
                                                        }
                                                    />
                                                ) : cell.column.id ==
                                                  "quantity" ? (
                                                    <Input
                                                        value={cellValue || ""}
                                                        type="number"
                                                        min="0"
                                                        max="999"
                                                        onChange={(e) => {
                                                            let newValue =
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                );
                                                            // Check if the entered value is within the range [0, 999]
                                                            if (
                                                                (newValue >=
                                                                    1 &&
                                                                    newValue <=
                                                                        999) ||
                                                                e.target
                                                                    .value == ""
                                                            ) {
                                                                handleChange(
                                                                    row.id,
                                                                    cell.column
                                                                        .id,
                                                                    e.target
                                                                        .value
                                                                );
                                                            } else if (
                                                                newValue < 0
                                                            ) {
                                                                handleChange(
                                                                    row.id,
                                                                    cell.column
                                                                        .id,
                                                                    "1"
                                                                ); // Set to 0 if smaller than 0
                                                                toastError(
                                                                    "This must be greater then 0"
                                                                );
                                                            } else {
                                                                handleChange(
                                                                    row.id,
                                                                    cell.column
                                                                        .id,
                                                                    "999"
                                                                ); // Set to 999 if larger than 999
                                                                toastError(
                                                                    "This  field must be greater then less then 999"
                                                                );
                                                            }
                                                        }}
                                                        readOnly={
                                                            !cellValues[row.id]
                                                        }
                                                    />
                                                ) : (
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
                                                                "priceSum" ||
                                                            !cellValues[row.id]
                                                        }
                                                    />
                                                )
                                            ) : (
                                                <ComboBoxResponsive
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
