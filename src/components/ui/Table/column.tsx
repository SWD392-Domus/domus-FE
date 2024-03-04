import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Badge } from "../Badge"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    date: string
    client: string
    staff: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
}
export const data: Payment[] = Array.from({ length: 20 }, (_, i) => ({

    id: `id${i + 1}`,
    date: `2022-01-0${(i % 9) + 1}`,
    client: `Client ${i + 1}`,
    staff: `Staff ${i + 1}`,
    amount: (i + 1),
    status: "success",
}));
export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "date",
        header: "Date create",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "client",
        header: "Client",
        cell: ({ row }) => {
            const client: string = row.getValue("client");
            return <div className=" text-right font-medium">{
                <div className="flex items-center gap-1 ">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-yellowCustom">{client}</div>
                </div>

            }</div>
        }
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
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value: string = (row.getValue("status") as string).toUpperCase()
            return (
                <>
                    <Badge variant="success">{value}</Badge>
                </>
            )
        },
    },
]
