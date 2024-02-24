import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/Checkbox/checkbox"
import { QuotationsProps } from "../../types"
import { CRUDDropdownMenu } from "../DropdownMenu/CRUD"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"


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
                    <Avatar>
                        <AvatarImage src={row.getValue("staffAva")} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
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
                    <Avatar>
                        <AvatarImage src={row.getValue("customerAva")} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-destructive">{customerName}</div>
                </div>

            }</div>
        }
    },
    {
        accessorKey: "totalPrice",
        header: () => <div className="text-left">Total Price</div>,
        cell: ({ row }) => {
            const totalPrice = parseFloat(row.getValue("totalPrice")) * 1000
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
            }).format(totalPrice)

            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-left">Status</div>,
        cell: ({ row }) => {
            const value: string = (row.getValue("status") as string).toUpperCase()
            return (
                <div className="text-left">
                    <Badge variant="outline">{value}</Badge>
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <CRUDDropdownMenu id={row.getValue('id')} />
            )
        },
    },
]
