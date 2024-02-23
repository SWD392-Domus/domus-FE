import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    // DropdownMenuCheckboxItem,
} from "@/components/ui/Dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/Dialog";
import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/Button/Button";
import { useDispatch } from "react-redux";
import { actions } from "../../slice";
import { Link } from "react-router-dom";

interface Props {
    // define your props here
    ids: string[];
}

export const ActionsDropdownMenu: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(actions.deleteManyService(props.ids));
    };
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
                    {props.ids.length == 0 ? (
                        <div className="text-center px-2">
                            Please Select Items!
                        </div>
                    ) : (
                        <>
                            {props.ids.length == 1 && (
                                <>
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <Link
                                        to={`/staff/products/${props.ids[0]}`}
                                    >
                                        View
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <Link
                                        to={`/staff/products/${props.ids[0]}`}
                                    >
                                        Update
                                    </Link>
                                </>
                            )}
                            <DropdownMenuItem>
                                <DialogTrigger className="w-full text-left">
                                    Delete
                                </DialogTrigger>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete?</DialogTitle>
                    <DialogDescription>
                        Are you really sure that you want to Delete? This action
                        cannot be reverted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={handleDelete}>Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
