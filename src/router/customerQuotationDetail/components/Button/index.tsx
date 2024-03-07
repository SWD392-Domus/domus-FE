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
import { editQuotation } from "../../usecase/editQuotation";
import { toast } from "@/components/ui/Toast/use-toast";
import { useNavigate } from "react-router-dom";
function onUpdate() {}

function onDelete() {}

function onCancle() {}
function onCreateNew() {}
function onSend() {}

export const UpdateButton = () => {
    return (
        <Button
            onClick={onUpdate}
            className=" text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2"
        >
            <PencilIcon className="h-3.5 pr-2 my-auto"></PencilIcon>Update
        </Button>
    );
};
export const MakeContractButton = ({ id }: { id: string }) => {
    const navigate = useNavigate(); // Initialize useHistory hook
    async function onMakeContract(id: string) {
        const token = localStorage.getItem("Token") as string;
        const data = {
            customerId: null,
            staffId: null,
            status: "Confirmed",
            expireAt: null,
            productdetails: null,
            services: null,
        };
        try {
            const res = await editQuotation(id, token, data);
            if (res.status == 200 && res.data.isSuccess) {
                toast({
                    variant: "success",
                    title: "Update successfully",
                    description: "",
                });
                navigate(`/customer/settings/quotations/${id}`, {
                    replace: true,
                });
                // Navigate back to the current page
            } else {
                toast({
                    variant: "destructive",
                    title: "Update Unsuccessfully",
                    description: "",
                });
            }
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Update Unsuccessfully",
                description: "",
            });
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className=" pl-2 bg-yellowCustom text-black hover:text-white">
                    <CheckIcon className="h-3.5 pr-2 my-auto"></CheckIcon>
                    Accept Quotation
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Quotation Confirmation</DialogTitle>
                    <DialogDescription>
                        <h1 className="mt-4 mb-4 text-black">
                            This will mean that you have accept the price of all
                            the products and services inside this
                            <strong> quotation</strong> .
                        </h1>
                        <h1 className="mt-4 mb-4 text-black">
                            All of <strong> Products</strong> will be prepared
                            for the upcoming contract out{" "}
                            <strong> Employees</strong> will send you in just a
                            short time
                        </h1>
                        <h1 className="mt-4 mb-4 text-black">
                            Remember to check your email in-order to receive our
                            newest info about this quotation from :
                            <strong className="text-blue-900">
                                {" "}
                                domus@gmail.com
                            </strong>
                        </h1>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onCancle} className="bg-zinc-500">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onMakeContract(id)}
                        className="bg-yellowCustom text-black hover:text-white"
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
                    <XIcon className="h-3.5 pr-2 my-auto"></XIcon>Cancel
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
