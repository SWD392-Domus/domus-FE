import { Button } from "@/components/ui/Button/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { pushNegotitaionService } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../slice/selector";
import { toast } from "@/components/ui/Toast/use-toast";
import { actions } from "../../slice";
import { useNavigate } from "react-router-dom";

interface Props {
    // define your props here
    staff: any;
    negotiationLog: any;
    customer: any;
}

const Negotiation: React.FC<Props> = ({ staff, negotiationLog, customer }) => {
    const id = useSelector(selector.id);

    const dispatch = useDispatch();
    const formSchema = z.object({
        message: z.string().min(2, {
            message: "message must be at least 2 characters.",
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const token = localStorage.getItem("Token");
        const res = await pushNegotitaionService(
            id as string,
            token as string,
            {
                content: values.message,
                isCustomerMessage: true,
            }
        );
        if ((res.status = 200)) {
            toast({
                variant: "success",
                title: "Message send Successfully",
                description: "",
            });
            window.location.reload();
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="my-3 text-2xl font-semibold">
                        Negotiation History
                    </div>
                    <div className="nego-info-body text-sm">
                        <div className="mail-info flex flex-row mb-1">
                            <ChatBubbleIcon className="my-auto mr-2" />
                            <span className="">
                                {negotiationLog?.messages?.length} negotiation
                                chats
                            </span>
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="flex flex-row mb-2">
                            <img
                                src={staff.profileImage}
                                alt=""
                                className="h-10 w-10 bg-gray-300 mr-2"
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Textarea
                                                placeholder="shadcn"
                                                {...field}
                                                className="text-black mb-4 w-full"
                                            />
                                        </FormControl>

                                        {/* <FormMessage /> */}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit"> Send</Button>
                        </div>
                    </div>

                    {negotiationLog?.messages?.map((nego: any) =>
                        nego.isCustomerMessage ? (
                            <div className="flex flex-row my-5">
                                <img
                                    src={customer.profileImage}
                                    alt=""
                                    className="h-10 w-10 bg-gray-300 mr-2"
                                />

                                <div className="nego-detail">
                                    <span className="my-auto font-medium">
                                        {customer.userName}
                                    </span>

                                    <div className="date-info text-xs">
                                        Published on {nego.sentAt}
                                    </div>

                                    <div className="cmt-info text-sm">
                                        {nego.content}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row my-5">
                                <img
                                    src={staff.profileImage}
                                    alt=""
                                    className="h-10 w-10 bg-gray-300 mr-2"
                                />

                                <div className="nego-detail">
                                    <span className="my-auto font-medium">
                                        {staff.userName}
                                    </span>

                                    <div className="date-info text-xs">
                                        Published on {nego.sentAt}
                                    </div>

                                    <div className="cmt-info text-sm">
                                        {nego.content}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </form>
            </Form>
        </div>
    );
};

export default Negotiation;
