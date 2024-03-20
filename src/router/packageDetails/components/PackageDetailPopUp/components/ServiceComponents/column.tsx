import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";

// import { ServiceProps } from "../../types";
import { CRUDDropdownMenu } from "./CRUD";
export interface ImagesProps {
    imageUrl: string;
    width: string;
    height: string;
}
type ServiceProps = {
    id: string;
    name: string;
    price: number;
    monetaryUnit: string;
};
export const columns: ColumnDef<ServiceProps>[] = [
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
    // {
    //     accessorKey: "price",
    //     header: "Price",
    //     cell: ({ row }) => {
    //         return <h4>VNĐ {row.original.price} </h4>;
    //     },
    // },
    // {
    //     accessorKey: "monetaryUnit",
    //     header: "Monetary Unit",
    // },
    {
        header: "Action",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <CRUDDropdownMenu id={row.getValue("id")} />;
        },
    },
];
