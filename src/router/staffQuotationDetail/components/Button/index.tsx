import { Button } from "@/components/ui/Button/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { CheckIcon, XIcon, PencilIcon, SendIcon } from "lucide-react";
import { useSelector } from "react-redux";
import selector from "../../slice/selector";
import { ProductDetailProps } from "../../types";
import { useParams } from "react-router-dom";

function onUpdate() {}
function onMakeContract() {}
function onDelete() {}

function onCancle() {}
function onCreateNew() {}
function onSend() {}

export const UpdateButton = () => {
    return (
        <Button
            onClick={onUpdate}
            className="bg-variant text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2"
        >
            <PencilIcon className="h-3.5 pr-2 my-auto"></PencilIcon>Update
        </Button>
    );
};
export const MakeContractButton = () => {
    return (
        <Button onClick={onMakeContract} className="bg-black pl-2">
            {" "}
            <CheckIcon className="h-3.5 pr-2 my-auto"></CheckIcon>Make Contract
        </Button>
    );
};
export const DeleteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-variant text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2">
                    <XIcon className="h-3.5 pr-2 my-auto"></XIcon>Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete?</DialogTitle>
                    <DialogDescription>
                        Are you really sure that you want to Delete? This action
                        cannot be reverted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onCancle} className="bg-zinc-500">
                        Cancle
                    </Button>
                    <Button onClick={onDelete} className="bg-red-600">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const CreateButton = () => {
    return (
        <Button onClick={onCreateNew} className="bg-green-500">
            Create New
        </Button>
    );
};
export const SendButton = () => {
    return (
        <Button onClick={onSend} className="bg-black pl-2">
            {" "}
            <SendIcon className="h-3 pr-2 my-auto"></SendIcon>Send
        </Button>
    );
};
