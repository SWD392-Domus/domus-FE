import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button/Button";
import { ConfirmDeleteButton } from "../Button/ConfirmDeleteButton";
import { ViewButton } from "../Button/ViewButton";

interface Props {
  // define your props here
  id: string
}

export const CRUDDropdownMenu: React.FC<Props> = (props) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <ViewButton id={props.id}></ViewButton>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem>
            <DialogTrigger className="w-full text-left">Delete</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete?</DialogTitle>
          <DialogDescription>
            Are you really sure that you want to Delete?
            This action cannot be reverted!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <ConfirmDeleteButton id={props.id}></ConfirmDeleteButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
