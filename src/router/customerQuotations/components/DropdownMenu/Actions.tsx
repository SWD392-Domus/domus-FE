import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    // DropdownMenuItem,
    DropdownMenuLabel,
    // DropdownMenuSeparator,
    // DropdownMenuCheckboxItem,
} from "@/components/ui/Dropdown-menu"
import {
    Dialog,
    // DialogContent,
    // DialogDescription,
    // DialogFooter,
    // DialogHeader,
    // DialogTitle,
    // DialogTrigger,
    // DialogClose
} from "@/components/ui/Dialog";
import {
    GearIcon
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/Button/Button"
// import { ConfirmDeleteManyButton } from "../Button/ConfirmDeleteManyButton";
import { ViewButton } from "../Button/ViewButton";
// import { UpdateButton } from "../Button/UpdateButton";

interface Props {
    // define your props here
    ids: string[]
}

export const ActionsDropdownMenu: React.FC<Props> = (props) => {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className="bg-variant text-black h-8 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white">
                        <GearIcon className="my-auto mr-1" />
                        <span>Actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {props.ids.length == 0 ?
                        <div className="text-center px-2">Please Select Items!</div>
                        :
                        <>
                            {props.ids.length == 1 &&
                                <>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <ViewButton id={props.ids[0]}></ViewButton>
                                    {/* <DropdownMenuSeparator />
                                    <UpdateButton id={props.ids[0]}></UpdateButton> */}
                                </>
                            }
                            {/* <DropdownMenuItem>
                                <DialogTrigger className="w-full text-left">Delete</DialogTrigger>
                            </DropdownMenuItem> */}
                        </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            {/* <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete?</DialogTitle>
                    <DialogDescription>
                        Are you really sure that you want to Delete?
                        This action cannot be reverted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <ConfirmDeleteManyButton ids={props.ids}></ConfirmDeleteManyButton>
                    </DialogClose>
                </DialogFooter>
            </DialogContent> */}
        </Dialog >
    )
}