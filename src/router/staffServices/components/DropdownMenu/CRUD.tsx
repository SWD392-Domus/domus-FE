import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import * as Dialog from "@radix-ui/react-dialog";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import { Button } from "@/components/ui/Button/Button";
import { ConfirmDeleteButton } from "../Button/ConfirmDeleteButton";
import ServiceDetails from "../ServiceDetails";
import EditServices from "../ServiceDetails/EditServices";

interface Props {
  id: string;
}

export const CRUDDropdownMenu: React.FC<Props> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* View */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Dialog>
            <DialogTrigger>View</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <ServiceDetails id={props.id}/>

            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        {/* Edit */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Dialog>
            <DialogTrigger>Edit</DialogTrigger>
            <DialogContent>
             <EditServices  id={props.id}/>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        {/* Delete */}

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Dialog>
            <DialogTrigger>Delete</DialogTrigger>
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
                  <ConfirmDeleteButton id={props.id}></ConfirmDeleteButton>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
