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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { pushNegotitaionService } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../slice/selector";
import { toast } from "@/components/ui/Toast/use-toast";

interface Props {
    // define your props here
    staff: any;
    negotiationLog: any;
    customer: any;
}
import { JwtPayload, jwtDecode } from "jwt-decode";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
interface customJWTPayload extends JwtPayload {
    role: string[];
    email: string;
}
const getJwtUser = (token: string): customJWTPayload => {
    return jwtDecode(token);
};

const Negotiation: React.FC<Props> = ({ staff, negotiationLog, customer }) => {
    const id = useSelector(selector.id);
    const [isAssigned, setAssigned] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("Token");
        const user = getJwtUser(token as string);

        if (user.email == staff.email) {
            setAssigned(true);
        } else {
            setAssigned(false);
        }
    }, []);
    const dispatch = useDispatch();
    const formSchema = z.object({
        message: z.string().min(10, {
            message: "Message must be at least 10 characters.",
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
                isCustomerMessage: false,
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
                    {isAssigned && (
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

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit"> Send</Button>
                            </div>
                        </div>
                    )}

                    {negotiationLog?.messages?.map((nego: any) =>
                        nego.isCustomerMessage ? (
                            <div className="flex flex-row my-5">
                                <Avatar className="mr-4">
                                    <AvatarImage
                                        src={customer.profileImage}
                                        alt=""
                                        className="h-10 w-10 bg-gray-300 mr-4"
                                    />
                                    <AvatarFallback>C</AvatarFallback>
                                </Avatar>

                                <div className="nego-detail">
                                    <span className="my-auto font-medium">
                                        {customer.userName}
                                    </span>

                                    <div className="date-info text-xs">
                                        Published on{" "}
                                        {new Date(
                                            nego.sentAt
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            nego.sentAt
                                        ).toLocaleTimeString()}
                                    </div>

                                    <div className="cmt-info text-sm">
                                        {nego.content}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row my-5">
                                <Avatar className="mr-4">
                                    <AvatarImage
                                        src={staff.profileImage}
                                        alt=""
                                        className="h-10 w-10 bg-gray-300 mr-2"
                                    />
                                </Avatar>

                                <div className="nego-detail">
                                    <span className="my-auto font-medium">
                                        {staff.userName}
                                    </span>

                                    <div className="date-info text-xs">
                                        Published on{" "}
                                        {new Date(
                                            nego.sentAt
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            nego.sentAt
                                        ).toLocaleTimeString()}
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
