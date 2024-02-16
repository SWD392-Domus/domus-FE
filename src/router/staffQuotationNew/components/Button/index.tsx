import { Button } from "@/components/ui/Button/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"

function onUpdate() {

}
function onMakeContract() {

}
function onDelete() {

}

function onCancle() {

}
function onCreateNew() {

}
function onSend() {

}

export const UpdateButton = () => {
    return (
        <Button onClick={onUpdate} className="bg-green-600 min-w-1" >Update</Button>
    )
}
export const MakeContractButton = () => {
    return (
        <Button onClick={onMakeContract} className="bg-black" >Make Contract</Button>
    )
}
export const DeleteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-red-600" >Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete?</DialogTitle>
                    <DialogDescription>
                        Are you really sure that you want to Delete? This action cannot be reverted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onCancle} className="bg-zinc-500" >Cancle</Button>
                    <Button onClick={onDelete} className="bg-red-600" >Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const CreateButton = () => {
    return (
        <Button onClick={onCreateNew} className="bg-green-500" >Create New</Button>
    )
}
export const SendButton = () => {
    return (
        <Button onClick={onSend} className="bg-green-500" >Send</Button>
    )
}