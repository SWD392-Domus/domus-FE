import { useNavigate, useLocation } from "react-router-dom";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
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
    // CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/Command";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { getAllProducts } from "../../usecase";
import { ProductsProps } from "@/router/staffProducts/types";
import { useDispatch } from "react-redux";
import { actions } from "../../slice";
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
    const [selectedProduct, setSelectedProduct] =
        useState<ProductsProps | null>(null);
    const [quantityInput, setQuantityInput] =
        useState<number>(1);
    const [open, setOpen] = useState<boolean>();
    const [products, setProducts] = useState<ProductsProps[]>();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const location = useLocation();
    const navigate = useNavigate();
    const fetchData = async () => {
        const res = await getAllProducts();

        setProducts(res.data.data);
    };
    const placeholder =
        "https://www.distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png";
    useEffect(() => {
        fetchData();
    }, []);
    const handleAddProduct = () => {
        dispatch(actions.addProduct({ ...selectedProduct, quantity: quantityInput } as ProductsProps & void));
        setSelectedProduct(null);
        setQuantityInput(1);
        setOpen(false);
    };
    const handleSelectItem = (item: ProductsProps) => {
        setSelectedProduct(item);
    };
    return (
        <div className="">
            <div className="flex space-x-5 justify-center mb-3">
                <Button onClick={() => setOpen(true)}>Add Product</Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    {/* <CommandInput placeholder="Search For Products..." /> */}
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        {products &&
                            products.map((item) => {
                                // Check if item, item.details, item.details[0], item.details[0]?.images,
                                // and item.details[0]?.images[0] are not null or undefined before accessing imageUrl
                                const imageUrl =
                                    item.details &&
                                    item.details[0]?.images &&
                                    item.details[0]?.images[0]?.imageUrl;

                                return (
                                    <CommandItem
                                        key={item.id}
                                        onSelect={() => handleSelectItem(item)}
                                    >
                                        <Avatar className=" mr-4">
                                            <AvatarImage
                                                src={
                                                    imageUrl
                                                        ? imageUrl
                                                        : placeholder
                                                }
                                            />
                                        </Avatar>
                                        <span className="text-xl">
                                            {item.productName}
                                        </span>
                                    </CommandItem>
                                );
                            })}
                    </CommandList>
                    <Dialog open={selectedProduct != null}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Product</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <Label>
                                Input Quantity of Products add to the package
                            </Label>
                            <Input type="number" value={quantityInput} onChange={(e) => setQuantityInput(parseInt(e.target.value))} min={1} />
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    variant={"destructive"}
                                    onClick={() => setSelectedProduct(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={handleAddProduct}
                                >
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
                                                {headerId && (
                                                    <span>
                                                        {headerId as string}
                                                    </span>
                                                )}
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
                                                            `${location.pathname
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
    )
}
