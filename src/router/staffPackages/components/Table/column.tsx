import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { PackagesProps } from "../../types";
import { CRUDDropdownMenu } from "../DropdownMenu/CRUD";
// import { TooltipDes } from "../Tooltip"
import packagePlaceholder from "@/assets/image/package-placeholder.png";

export const columns: ColumnDef<PackagesProps>[] = [
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
    // {
    //     accessorKey: "id",
    //     header: "Id",
    // },
    // {
    //     accessorKey: "packageId",
    //     header: "Package",
    //     cell: ({ row }) => {
    //         return <h4> Package {row.index + 1}</h4>;
    //     },
    // },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const images: any = row.original.image;
            const haveImg = images && images.imageUrl;
            return (
                <Avatar>
                    <AvatarImage
                        src={haveImg ? images.imageUrl : packagePlaceholder}
                    />
                </Avatar>
            );
        },
    },
    // {
    //     accessorKey: "discount",
    //     header: "Discount",
    //     cell: ({ row }) => {
    //         return (
    //             <div className="text-center">{row.getValue("discount")}%</div>
    //         );
    //     },
    // },
    {
        accessorKey: "serviceName",
        header: "Service",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <CRUDDropdownMenu id={row.getValue("id")} />;
        },
    },
];
