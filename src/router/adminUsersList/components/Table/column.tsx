import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { UsersProps } from "../../types";
import { CRUDDropdownMenu } from "../DropdownMenu/CRUD";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export const columns: ColumnDef<UsersProps>[] = [
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
        accessorKey: "userName",
        header: "User Name",
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => {
            const customerName: string =
                (row.getValue("fullName") as { fullName?: string })
                    ?.fullName || "";
            const customerAva: string =
                (row.getValue("fullName") as { profileImage?: string })
                    ?.profileImage || "";
            return (
                <div className=" text-right font-medium">
                    {
                        <div className="flex items-center gap-1 ">
                            <Avatar>
                                <AvatarImage src={customerAva} />
                                <AvatarFallback>C</AvatarFallback>
                            </Avatar>
                            <div className="text-black">{customerName}</div>
                        </div>
                    }
                </div>
            );
        },
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <CRUDDropdownMenu id={row.getValue("id")} />;
        },
    },
];
