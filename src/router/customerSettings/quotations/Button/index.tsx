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

function onAccept() {

}
function onNegotiate() {

}
function onDecline() {

}
function onCancle() {

}
function onSend() {

}

export const AcceptButton = () => {
    return (
        <Button onClick={onAccept} className="bg-green-500" >Accept & Sign</Button>
    )
}
export const NegotiateButton = () => {
    return (
        <Button onClick={onNegotiate} className="bg-zinc-500" >Negotiate</Button>
    )
}
export const DeclineButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-red-500" >Decline</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Decline?</DialogTitle>
                    <DialogDescription>
                        Are you really sure that you want to decline? This action cannot be reverted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onCancle} className="bg-zinc-500" >Cancle</Button>
                    <Button onClick={onDecline} className="bg-red-500" >Decline</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export const SendButton = () => {
    return (
        <Button onClick={onSend} className="bg-green-500" >Send</Button>
    )
}