import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { ServicesProps } from "../../types";
import { CRUDDropdownMenu } from "../DropdownMenu/CRUD";
// import { TooltipDes } from "../Tooltip"
// import servicePlaceholder from "@/assets/image/package-placeholder.png";

export const columns: ColumnDef<ServicesProps>[] = [
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
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const value: string = row.getValue("price");
            return (
                <div className="text-left font-medium">
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "VND",
                    }).format(Number.parseFloat(value))}
                </div>
            );
        },
    },
    {
        accessorKey: "monetaryUnit",
        header: "Monetary Unit",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <CRUDDropdownMenu id={row.getValue("id")} />;
        },
    },
    // {
    //     id: "details",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         return <ServiceDetails id={row.getValue("id")} />;
    //     },
    // },
];
