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
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Checkbox } from "@/components/ui/Checkbox/checkbox"
import { Badge } from "@/components/ui/Badge"
import { QuotationsProps } from "../../types"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<QuotationsProps>[] = [
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
        accessorKey: "expireAt",
        header: "Expire At",
    },
    {
        accessorKey: "staffName",
        header: "Staff",
        cell: ({ row }) => {
            const staffName: string = row.getValue("staffName");
            return <div className=" text-right font-medium">{
                <div className="flex items-center gap-1 ">
                    {/* <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                    <div className="text-destructive">{staffName}</div>
                </div>

            }</div>
        }
    },
    {
        accessorKey: "customerName",
        header: "Customer",
        cell: ({ row }) => {
            const customerName: string = row.getValue("customerName");
            return <div className=" text-right font-medium">{
                <div className="flex items-center gap-1 ">
                    {/* <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                    <div className="text-destructive">{customerName}</div>
                </div>

            }</div>
        }
    },
    {
        accessorKey: "totalPrice",
        header: () => <div className="text-right">Total Price</div>,
        cell: ({ row }) => {
            const totalPrice = parseFloat(row.getValue("totalPrice")) * 1000
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
            }).format(totalPrice)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const value: string = (row.getValue("status") as string).toUpperCase()
            return (
                <div className="text-center">
                    <Badge variant="outline">{value}</Badge>
                </div>
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
