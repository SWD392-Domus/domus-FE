import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { ProductsProps } from "../../types";
import { CRUDDropdownMenu } from "../DropdownMenu/CRUD";
import { TooltipDes } from "../Tooltip";

export const columns: ColumnDef<ProductsProps>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Id",
        // header: () => {
        //     return (
        //         // <>Id</>
        //     )
        // },
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image: string = row.getValue("image");
            return (
                <Avatar>
                    <AvatarImage src={image} />
                </Avatar>
            );
        },
    },
    {
        accessorKey: "productName",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },

    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <TooltipDes
                    description={row.getValue("description")}
                ></TooltipDes>
            );
        },
    },
    {
        accessorKey: "brand",
        header: "Brand",
        cell: ({ row }) => {
            return row.getValue("brand") ? row.getValue("brand") : "No Brand";
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <CRUDDropdownMenu id={row.getValue("id")} />;
        },
    },
];
