import { ColumnDef } from "@tanstack/react-table";

interface ServiceData {
    id: string;
    name: string;
    price: number;
    monetaryUnit: string;
    serviceId: string;
}

export const editServiceColumns: ColumnDef<ServiceData>[] = [
    {
        accessorKey: "action",
        header: "Action",
    },
    {
        accessorKey: "serviceId",
        header: "Service Id",
        accessorFn: (row) => row.serviceId,
    },

    {
        accessorKey: "name",
        header: "Name",
        accessorFn: (row) => row.name,
    },
    {
        accessorKey: "price",
        header: "Price",
        accessorFn: (row) => row.price,
        cell: ({ row }) => {
            const value: number = row.getValue("price");
            return (
                <div className="text-left font-medium">
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "VND",
                    }).format(value * 1000)}
                </div>
            );
        },
    },
    // {
    //     accessorKey: "monetaryUnit",
    //     header: "Monetary Unit",
    //     accessorFn: (row) => row.monetaryUnit,
    // },
    {
        accessorKey: "delete",
        header: () => <div className="text-left">Delete</div>,
    },
];
