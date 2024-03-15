import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { ArticlesProps } from "../../types";
import { CRUDDropdownMenu } from "../DropdownMenu/CRUD";
// import { TooltipDes } from "../Tooltip"
import articlePlaceholder from "@/assets/image/article-placeholder.png";

export const columns: ColumnDef<ArticlesProps>[] = [
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
        accessorKey: "articleImages",
        header: "Image",
        cell: ({ row }) => {
            const images: any = row.original.articleImages;
            const image: any = images[0]
            const haveImg = image && image.imageUrl;
            return (
                <Avatar>
                    <AvatarImage
                        src={haveImg ? image.imageUrl : articlePlaceholder}
                    />
                </Avatar>
            );
        },
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <CRUDDropdownMenu id={row.getValue("id")} />;
        },
    },
];
