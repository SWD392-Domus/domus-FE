import { ColumnDef } from "@tanstack/react-table"

export type QuotationDetailInfo = {
    id: string
    productName: string
    price: number
    monetaryUnit: string
    quantity: number
    quantityType: string
    priceSum: number
}
export const data: QuotationDetailInfo[] = Array.from({ length: 5 }, (_, i) => ({

    id: `${i + 1}`,
    productName: `Product ${i + 1}`,
    price: (i + 1) * 100000,
    monetaryUnit: "VND",
    quantity: i + 2,
    quantityType: "EA",
    priceSum: (i + 1) * 100000 * (i + 2),
}));
export const columns: ColumnDef<QuotationDetailInfo>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "productName",
        header: "Product Name",
    },
    {
        accessorKey: "price",
        header: "Price",
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
        header: () => <div className="text-right">Sum Price</div>,
        cell: ({ row }) => {
            const priceSum = parseFloat(row.getValue("priceSum"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
            }).format(priceSum)

            return <div className="text-right font-medium">{formatted}</div>
        },
    }
]
