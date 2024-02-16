import { Button } from "@/components/ui/Button/Button"
import { Link } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
} from "@/components/ui/Dropdown-menu"
import {
    ChevronDownIcon,
} from "@radix-ui/react-icons"

import {
    ClipboardIcon, GearIcon, PlusCircledIcon
} from "@radix-ui/react-icons"



function onPrint() {

}

export const ActionButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className="bg-variant text-black h-8 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white">
                    <GearIcon className="my-auto mr-1" />
                    <span>Actions</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Update</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const CreateButton = () => {
    return (
        <Link to="/staff/quotations/newQuotation">
            <Button className="bg-variant text-black hover:text-white">
                <PlusCircledIcon className="my-auto mr-2" />
                Product
            </Button>
        </Link>
    )
}

export const PrintButton = () => {
    return (
        <Button onClick={onPrint} className="h-8" >
            <ClipboardIcon className="my-auto mr-1" /> Print
        </Button>
    )
}

export const SortButton = () => {
    const sortFields: string[] = ["ExpiredDate", "Customer"]
    return (
        <DropdownMenu>
            <div className="my-auto mx-2">Sort By:</div>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    Select <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {sortFields
                    .map((field) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={field}
                                className="capitalize"
                            >
                                {field}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}