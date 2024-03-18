import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";

import { Avatar, AvatarImage } from "@/components/ui/Avatar";

import { ProductDetailProps } from "../../types";
import { CRUDDropdownMenu } from "./CRUD";
export interface ImagesProps {
    imageUrl: string;
    width: string;
    height: string;
}
export const columns: ColumnDef<ProductDetailProps>[] = [
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
        cell: ({ row }) => {
            const id: string = row.getValue("id") as string;
            return <h4> {id.slice(0, 3)}..</h4>;
        },
    },
    {
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => {
            const images: ImagesProps[] = row.getValue("images");
            const imageUrl = images && images[0]?.imageUrl;
            return (
                <Avatar>
                    <AvatarImage
                        src={
                            imageUrl
                                ? imageUrl
                                : "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png"
                        }
                    />
                    <h1>123</h1>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "productName",
        header: "Name",
    },
    // {
    //     accessorKey: "displayPrice",
    //     header: "Display Price",
    //     cell: ({ row }) => {
    //         return <h4>đ{row.original.displayPrice} </h4>;
    //     },
    // },
    {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => {
            return <h4>{row.original.quantity} </h4>;
        },
    },

    {
        header: "Action",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <CRUDDropdownMenu id={row.getValue("id")} />;
        },
    },
];
