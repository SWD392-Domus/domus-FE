import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { notificationApi } from "@/utils/api/notificationApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <div className="flex flex-col items-center ">
            <h1 className="font-medium text-3xl  uppercase  mb-8">
                Notification List
            </h1>
            <div className="flex flex-col items-center w-full">
                {notifcations.map((item) => {
                    return (
                        <Link
                            replace
                            to={"/" + item.redirectString}
                            key={item.sentAt}
                            className="h-[80px] w-[80%] flex justify-between hover:bg-slate-100 rounded cursor-pointer items-center"
                        >
                            <Avatar className="h-[80px] w-[80px] mr-2">
                                <AvatarImage src={item.image} />
                            </Avatar>
                            <h1 className="font-medium text-xl">
                                {item.content}
                            </h1>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Notification;
