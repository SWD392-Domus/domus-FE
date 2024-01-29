import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
// import { Badge } from "../Badge"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type QuotationInfo = {
    id: string
    expiredAt: string
    createdAt: string
    lastUpdatedAt: string
    createdBy: string
    lastUpdatedBy: string
    staff: string
    amount: number
}
export const data: QuotationInfo[] = Array.from({ length: 5 }, (_, i) => ({

    id: `Q${i + 1}`,
    expiredAt: `2022-01-0${(i % 9) + 1}`,
    createdAt: `2022-01-0${(i % 9) + 1}`,
    lastUpdatedAt: `2022-01-0${(i % 9) + 1}`,
    createdBy: `Staff ${i + 1}`,
    lastUpdatedBy: `Staff ${i + 1}`,
    staff: `Staff ${i + 1}`,
    amount: (i + 1) * 100000,
}));
export const columns: ColumnDef<QuotationInfo>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "expiredAt",
        header: "Expired At",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "lastUpdatedAt",
        header: "Last Updated At",
    },
    {
        accessorKey: "createdBy",
        header: "Last Updated By",
    },
    {
        accessorKey: "lastUpdatedBy",
        header: "Last Updated By",
    },
    {
        accessorKey: "staff",
        header: "Staff",
        cell: ({ row }) => {
            const staff: string = row.getValue("staff");
            return <div className=" text-right font-medium">{
                <div className="flex items-center gap-1 ">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-destructive">{staff}</div>
                </div>

            }</div>
        }
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    }
]
