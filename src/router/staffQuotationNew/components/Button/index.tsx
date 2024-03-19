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

import { useNavigate, useParams } from "react-router-dom";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Quotationstatus } from "@/router/customerQuotationDetail/constants";
import { CheckIcon, PencilIcon, SendIcon, XIcon } from "lucide-react";
function onUpdate() { }
// function onMakeContract() {}
function onDelete() { }

function onCancle() { }
function onCreateNew() { }
function onSend() { }

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
export const MakeContractButton = ({
    status,
    versions,
}: {
    status: string;
    versions: any[];
}) => {
    const navigate = useNavigate();
    let { quotationId, versionId } = useParams();
    if (!versionId) {
        versionId = versions[versions.length - 1].id;
    }
    const getToolTipMessage = () => {
        if (status == "Confirmed") {
            return "This Quotation have already been confirmed, please wait for the contract being sent to you";
        } else if (status == "Requested") {
            return "This Quotation have been sent, please wait for out staff to reply";
        } else {
            return "Click for confirming the quotation";
        }
    };
    return (
        <Dialog>
            <DialogTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                className=" pl-2 "
                                disabled={status != Quotationstatus.confirmed}
                            >
                                <CheckIcon className="h-3.5 pr-2 my-auto"></CheckIcon>
                                Make Contract
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{getToolTipMessage()}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Create Contract</DialogTitle>
                    <DialogDescription>
                        <h1 className="mt-4 mb-4 text-black">
                            Are you sure you want to change this quoation to
                            become a contract. Remember to ask the client to
                            help the signing contract happen successfully.
                        </h1>
                        <h1 className="mt-4 mb-4 text-black">
                            This will navigate you to the contract create page
                            with the{" "}
                            <strong className="text-blue-900">
                                Quotation{" "}
                            </strong>
                            selected
                        </h1>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onCancle} className="bg-zinc-500">
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(
                                `/staff/contracts/new/${quotationId}/version/${versionId}`,
                                { replace: true }
                            )
                        }
                        className="bg-black pl-2"
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
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
