import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";

import { ServiceProps } from "../../types";
export interface ImagesProps {
    imageUrl: string;
    width: string;
    height: string;
}
export const serviceColums: ColumnDef<ServiceProps>[] = [
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
];
