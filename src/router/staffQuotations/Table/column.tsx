import {
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu"
import { Button } from "@/components/ui/Button/Button"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Checkbox } from "@/components/ui/Checkbox/checkbox"
import { Badge } from "@/components/ui/Badge"


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
    status: "pending" | "processing" | "success" | "failed"
}
export const data: QuotationInfo[] = Array.from({ length: 5 }, (_, i) => ({

    id: `Q${i + 1}`,
    expiredAt: `2022-01-0${(i % 9) + 1}`,
    createdAt: `2022-01-0${(i % 9) + 1}`,
    lastUpdatedAt: `2022-01-0${(i % 9) + 1}`,
    createdBy: `Staff ${i + 1}`,
    lastUpdatedBy: `Staff ${i + 1}`,
    customer: `Customer ${i + 1}`,
    staff: `Staff ${i + 1}`,
    amount: (i + 1) * 100000,
    status: "pending",
}));
export const columns: ColumnDef<QuotationInfo>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => {
            const customer: string = row.getValue("customer");
            return <div className=" text-right font-medium">{
                <div className="flex items-center gap-1 ">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-destructive">{customer}</div>
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
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            // const quotation = row.original

            return (
                <DropdownMenu key={row.id}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        // onClick={() => delete(quotation.id)}
                        >
                            View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
