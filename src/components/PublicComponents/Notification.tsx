import React, { useEffect, useState } from "react";
import { BellIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button/Button";
import { notificationApi } from "@/utils/api/notificationApi";
import { useNavigate } from "react-router-dom";

interface Props {
    // define your props here
}
export type NotificationType = {
    content: string;
    image: string;
    recipientId: string;
    redirectString: string;
    sentAt: string;
    status: number;
};

const Notification: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [notifcations, setNotifications] = useState<NotificationType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const token = `Bearer ${localStorage.getItem("Token")}`;
            const res = await notificationApi.getNotification(token);
            setNotifications(res.data.data);
        };
        fetchData();
    }, []);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="w-12 h-12 flex items-center justify-center relative">
                    <BellIcon
                        width={30}
                        height={30}
                        className="text-yellowCustom"
                    />

                    <div className="bg-yellowCustom text-black w-6 h-6 rounded-full text-center items-center absolute -right-1 -top-1">
                        {0}
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[350px]   text-black border-none">
                <DropdownMenuGroup>
                    {notifcations.map((item) => {
                        // Define the maximum length of content you want to display
                        const maxLength = 60; // Adjust the value as per your preference
                        // Shorten the content and add "..." if it exceeds maxLength
                        const shortenedContent =
                            item.content.length > maxLength
                                ? `${item.content.slice(0, maxLength)}...`
                                : item.content;

                        return (
                            <DropdownMenuItem
                                className="h-[80px] flex justify-between p-2 items-center"
                                key={item.sentAt}
                            >
                                <Avatar className="mr-2">
                                    <AvatarImage src={item.image} />
                                    <AvatarFallback>
                                        {item.recipientId}
                                    </AvatarFallback>
                                </Avatar>
                                <h1 className="font-medium ">
                                    {shortenedContent}
                                </h1>
                            </DropdownMenuItem>
                        );
                    })}
                    <DropdownMenuItem className="h-[50px] flex justify-center p-2">
                        <Button
                            variant={"yellowCustom"}
                            onClick={() => navigate("/notification")}
                        >
                            View More
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notification;
