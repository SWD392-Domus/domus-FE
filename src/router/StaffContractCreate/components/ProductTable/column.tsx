import { ColumnDef } from "@tanstack/react-table";

export type QuotationDetailInfo = {
    id: string;
    productName: string;
    price: number;
    monetaryUnit: string;
    quantity: number;
    quantityType: string;
    priceSum: number;
};
export const data: QuotationDetailInfo[] = Array.from(
    { length: 5 },
    (_, i) => ({
        id: `${i + 1}`,
        productName: `Product ${i + 1}`,
        price: (i + 1),
        monetaryUnit: "VND",
        quantity: i + 2,
        quantityType: "EA",
        priceSum: (i + 1) * (i + 2),
    })
);
export const column: ColumnDef<QuotationDetailInfo>[] = [
    {
        accessorKey: "productName",
        header: "Product Name",
    },
    {
        accessorKey: "price",
        header: "Display Price",
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
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "quantityType",
        header: "Quantity Type",
    },
    {
        accessorKey: "priceSum",
        header: () => <div className="text-left">Total Price</div>,
        cell: ({ row }) => {
            const price: string = row.getValue("price");
            const quantity: string = row.getValue("quantity");
            return (
                <div className="text-left font-medium">
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "VND",
                    }).format(
                        Number.parseFloat(price) *
                        Number.parseFloat(quantity) *
                        1000
                    )}
                </div>
            );
        },
    },
];
